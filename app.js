const express = require('express');
const app = express();
const port = 5000;

const listaTareas = [
    {
        id: '1',
        isCompleted: true,
        descripcion:'sacar al perro'
    },
    {
        id: '2',
        isCompleted: false,
        descripcion: 'ponerse al dia en la U'
    }
];

app.get('/', (req, res) => {
   res.json(listaTareas)
    
});

app.listen(port, () =>{
    console.log(`estoy escuchando el puerto ${port}`);
});