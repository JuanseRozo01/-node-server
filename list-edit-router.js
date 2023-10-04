const express = require('express');
const editRouter = express.Router();
const tareas = require('./taskCompleted.js');

editRouter.use(express.json())
editRouter.use((req, res, next) => {
 if(req.method === 'POST'){
  if(Object.keys(req.body).length === 0){
    return res.status(400).json({error: 'El cuerpo de la solicitud esta vacio'});
  }
  if(!req.body.id || req.body.descripcion){
    return res.status(400).json({ error: 'Faltan atributos necesarios para crear la tarea'});
  }
 }
 next()
});

editRouter.use((req, res, next) => {
  if (req.method === 'PUT') { if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'El cuerpo de la solicitud PUT está vacío.' });
  }  
  if (!req.body.id || !req.body.descripcion) {
    return res.status(400).json({ error: 'Faltan atributos necesarios para actualizar la tarea.' });
  }
}
next()
});

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