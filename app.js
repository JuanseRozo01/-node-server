const express = require('express');
const editRouter = require('./list-edit-router.js');
const tareas = require('./taskCompleted.js');
const viewRouter = require('./list-view-router.js');
const app = express();
const port = 5000;

app.use(express.json())
app.use('/list-view', viewRouter);
app.use( '/list-edit', editRouter)

app.get('/', (req, res) => {
   res.send({tareas})
    
});

app.listen(port, () =>{
    console.log(`estoy escuchando el puerto ${port}`);
});