const express = require('express');
const editRouter = express.Router();
const tareas = require('./taskCompleted.js');

editRouter.post('/agregar', (req, res) => {
    const newTask = req.body;
    tareas.push(newTask);
    res.send({massage:'se agrego la tarea'});
});

editRouter.delete( '/delete/:id', (req, res) => {
  const tareasid = req.params.id;
  const tareasUpdade = tareas.filter((tarea) => tarea.id != tareasid);
  res.send({tareasUpdade});
});

editRouter.put('/put/:id', (req, res) => {
  const tareasId = req.params.id;
  const tareasUpdate = req.body;
  const tareaExistente = tareas.find((tareas) => tareas.id === tareasId);

  if (!tareaExistente) {
  return res.status(404).send({ error: 'Tarea no encontrada' });
  }
  tareaExistente.estado = tareasUpdate.estado || tareaExistente.estado;
  tareaExistente.descripcion = tareasUpdate.descripcion || tareaExistente.descripcion;

  res.status(200).send({ message: 'Tarea actualizada', tareas });
});

module.exports = editRouter;