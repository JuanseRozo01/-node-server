const express = require('express');
const editRouter = require('./list-edit-router.js');
const tareas = require('./taskCompleted.js');
const viewRouter = require('./list-view-router.js');
const app = express();
const port = 5000;

// app.use(express.json());
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

app.get('/', (req, res) => {
   res.send({tareas});
});

app.listen(port, () =>{
    console.log(`estoy escuchando el puerto ${port}`);
});