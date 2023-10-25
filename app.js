require('dotenv').config();
const express = require('express');
const editRouter = require('./list-edit-router.js');
const tareas = require('./taskCompleted.js');
const viewRouter = require('./list-view-router.js');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI);
const app = express();
const port = 5000;

app.use(express.json());

app.use((req, res, next) => {
const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
if(!validMethods.includes(req.method)){
    return res.status(405).json({ error: 'Método HTTP no permitido.' });
}
next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
  });

app.use('/list-view', viewRouter);
app.use( '/list-edit', editRouter);

const JWTValidation = (req, res, next) => {
    const token = req.header('autorizacion');
    if(token == undefined){
        res.status(401).send('falta datos por proscionar ');
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(decoded.rol == 'administrador'){
            req.headers = {...req.headers, rol: 'administrador'}
        }else{
            req.headers = {...req.headers, rol: 'estudiante'}
        }
        next();
    }catch(err){
        res.send(err);
    }
};

const users = [{name: 'isabel', rol: 'administrador', email: 'isabel@hotmail.com'},
{name: 'cristina', rol: 'estudiante', email: 'cristina@gmail.com'}
];

app.get('/', (req, res) => {
   res.send({tareas});
});

app.get('/deportes', async (req, res) => {
    try{
      await client.connect();
      const db = client.db('ListaDeportes');
      const nameCollection = db.collection('Deportes');
      const listaDeportes = await nameCollection.find().toArray()
      res.json(listaDeportes);
    }catch(err){
        console.log(err);
    }

});

app.post('/deportes', async(req, res) => {
    const data = req.body;
    try{
        await client.connect();
        const db = client.db('ListaDeportes');
        const nameCollection = db.collection('Deportes');
        await nameCollection.insertOne(data)
        res.send('se creo un nuevo usuario');
    }catch(err) {
        console.log(err);
    }

});

app.put('/deportes/:id', async(req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    try {
        await client.connect()
        const db = client.db('ListaDeportes');
        const nameCollection = db.collection('Deportes');
        await nameCollection.updateOne({_id: id}, {$set : updateData});
        res.send('se actualizo un deporte');
    } catch (error) {
        console.log(error);
    }
});

app.delete('/deportes/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        await client.connect();
        const db = client.db('ListaDeportes');
        const nameCollection = db.collection('Deportes');
        await nameCollection.deleteOne({_id: id});
        res.send('se elimmino un deporte')

    } catch (error) {
        console.log(error);
    }

});

app.get('/protected', JWTValidation, (req, res) => {
    const rol = req.header('rol');
    if(rol == 'administrador'){
        res.send('welcome admi');
    }
    if(rol == 'estudiante'){
        res.send('welcome guys');
    }
});

app.get('/:id', (req, res) => {
    const tareasId = req.params.id;
    const tareaEncontrada = tareas.find((tareas) => tareas.id === tareasId);
    res.send({tareaEncontrada})
  });

app.post('/login', (req, res) => {
   const userName = req.body.name;
   const userInfo = users.filter((user) => {
    if(user.name == userName){
        return true;
    }else{
        return false;
    }
   });
   if(userInfo.length == 0){
    res.status(401).send('email invalido, este usuario no esta registrado');
   }else{
    const payload = userInfo[0]
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '10d',
        algorithm: 'HS512'
    });
    res.json(token)
   }
});

app.listen(port, () =>{
    console.log(`estoy escuchando el puerto ${port}`);
});