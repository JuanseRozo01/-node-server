let listasDeTareas = [
    {
        id: '1',
        descripcion: 'sacar al perro a alas 6 AM y 8 PM se saca al perro a hacer sus necesidades',
        estado: false
    },
    {
       id: '2',
       descripcion: 'hacer los talleres dedicarle 4 horas al dia a los talleres de clase',
       estado: false
    },
    {
        id: '3',
        descripcion: 'ir al gym todos los dias a 5 toca entrenar maximo 2 horas',
        estado: false
    },
    {
        id: '4',
        descripcion: 'entrar a clases de lunes a viernes hay clases a las 8 PM',
        estado: false
    }
];

const mostrarTask = () => {
    console.log('Lista de tareas:');
    listasDeTareas.forEach((tarea) => {
        console.log(`Indicador: ${tarea.id}`);
        console.log(`Descripción: ${tarea.descripcion}`);
        console.log(`Estado: ${tarea.estado ? 'Completada' : 'Pendiente'}`);
        console.log('----------------------------------');
    });

}
const completarTask = (tarea) =>{
    tarea.estado = !tarea.estado; 
    console.log(`Estado de la tarea "${tarea.id}" cambiado a ${tarea.estado ? 'Completada' : 'Pendiente'}`);
}

completarTask(listasDeTareas[0]);
completarTask(listasDeTareas[3]);

const añadirTarea = (id, descripcion, estado) => {
    let newtask = {
        id: id,
        descripcion: descripcion,
        estado: estado
    };
    listasDeTareas.push(newtask)
    console.log('lista de tareas agrgadas', newtask)
}
añadirTarea('5', ' comer a tiempo ir a corde del plan de alimentacion', 'true')
añadirTarea('6', 'ir al trabajo levantarme a las 5 AM para ir a trabajar', 'true')
añadirTarea('7', 'ir a la universidad los viernes y sabados hay clases en la universidad', 'true')

const eliminarTarea = (id) => {
    listasDeTareas = listasDeTareas.filter(item => item.id !== id);
    console.log('tarea eliminada', id)

}
eliminarTarea(4)

const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question('elige un comando: (1)mostrar tarea, (2)añadir tarea, (3)completar tarea, (4)eliminar tarea ', (respuesta) => {
    console.log(`has elegido ${respuesta}`)
    switch (respuesta){
        case '1':
            console.log(mostrarTask())
            rl.question()
                break;
                
    
        case '2':
            rl.question('Ingrese el Indicador de la nueva tarea: ', (id) => {
                rl.question('Ingrese la descripción de la nueva tarea: ', (descripcion) => {
                    rl.question('¿La tarea está completada? (true/false): ', (estaCompletada) => {
                        añadirTarea(id, descripcion, estaCompletada === 'true');
                        console.log('Tarea agregada con éxito.');
                        rl.close();
                    });
                });
            });
                break;
    
        case '3':
            rl.question('Ingrese el id de la tarea que desea completar: ', (indice) => {
                const indiceTarea = parseInt(indice);
                if (!isNaN(indiceTarea) && indiceTarea >= 1 && indiceTarea <= listasDeTareas.length) {
                    const tareaACompletar = listasDeTareas[indiceTarea - 1];
                    completarTask(tareaACompletar);
                } else {
                    console.log('Índice no válido. Asegúrese de ingresar un número válido.');
                }
                rl.close();
            });
                break;
    
        case '4':
            rl.question('ingrese el indicador de la tarea que quiere eliminar ', (id) => {
                eliminarTarea(id);
                console.log('tarea eliminada ');
                rl.close();
            } )
                break;
    
            default:
                console.log('Comando no válido');
                break;
    }
});
