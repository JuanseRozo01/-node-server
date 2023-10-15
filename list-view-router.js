const express = require('express');
const viewRouter = express.Router();
const tareas = require('./taskCompleted');

viewRouter.get('/tareas-completadas', (req, res) => {
    const tarea = tareas.filter(tarea => tarea.estado);
    res.status(200).send({message: 'tareas completadas', tarea});
});

viewRouter.get('/tareas-incompletas', (req, res) => {
    const tarea = tareas.filter(tarea => !tarea.estado);
    res.status(200).send({message: 'tareas incompletas', tarea});
});

viewRouter.use((req, res, next) => {
    const tarea = req.query;
    if (!Number.isInteger(parseInt(tarea.id)) || parseInt(tarea.id) <= 0) {
        return res.status(400).json({ message: 'El id debe ser un número entero positivo.' });
    }
    if (typeof tarea.descripcion !== 'string') {
        return res.status(400).json({ message: 'La descripción debe ser una cadena de texto.' });
    }
    if (tarea.estado !== 'true' && tarea.estado !== 'false') {
        return res.status(400).json({ message: 'El parámetro estado debe ser "true" o "false".' });
    }
    next();
});

module.exports = viewRouter;