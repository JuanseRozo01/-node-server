const express = require('express');
const viewRouter = express.Router();
const tareas = require('./taskCompleted');

viewRouter.get('/tareas-completadas', (req, res) => {
    const tarea = tareas.filter(tarea => tarea.estado);
    res.status(200).send({message: 'tareas completadas', tarea})
});

viewRouter.get('/tareas-incompletas', (req, res) => {
    const tarea = tareas.filter(tarea => !tarea.estado)
    res.status(200).send({message: 'tareas incompletas', tarea})
});

module.exports = viewRouter;