¿Qué sucedio al usar async y await?
R/=Las funciones completarTask, añadirTarea, eliminarTarea, y main se declaran como funciones asíncronas utilizando la palabra clave async. Esto permitio que estas funciones utilicen await dentro de ellas para esperar la resolución de promesas antes de continuar con el siguiente paso, Dentro de las funciones marcadas como async, use el await para esperar la finalización de las operaciones asincrónicas, como cambiar el estado de una tarea, agregar una nueva tarea o eliminar una tarea Esto asegura que estas operaciones se realicen en secuencia y de manera ordenada. async y await hace que el código sea más legible y permite una ejecución más controlada y secuencial de las operaciones asincrónicas, lo que facilita la comprensión y el mantenimiento del código
¿Qué sucedio al usar el método then()?
R/=el uso de then() en las promesas creo una cadena de ejecución secuencial donde cada operación asincrónica se realizo en orden. Cuando una promesa se resuelve, se pasa al siguiente then(), lo que garantiza que las operaciones se ejecuten en el orden correcto y que se manejen los resultados de manera ordenada.
¿Qué diferencias encontraste entre async, await y el método then()?
R/=Async/Await:
Sintaxis más legible: async y await proporcionan una sintaxis más legible y similar a código síncrono. Esto facilita la comprensión del flujo de control y hace que el código sea más fácil de mantener.
Manejo de errores más similar a código síncrono: Use try-catch para manejar errores de manera similar a como lo harías en código síncrono. Esto facilita el manejo de excepciones y la identificación de problemas.
Secuencial: Cuando usas await, las operaciones se realizan de manera secuencial, lo que significa que una operación espera a que la anterior se complete antes de ejecutarse. Esto puede facilitar el razonamiento sobre el flujo de control.
Método .then():
Estilo de programación basado en promesas: El método then() es una forma de trabajar con promesas de manera más explícita. Puede ser más adecuado en situaciones donde estás trabajando con múltiples promesas en paralelo o cuando deseas un mayor control sobre el flujo de control.
Encadenamiento de promesas: Puedes encadenar múltiples then() para crear una secuencia de operaciones asincrónicas. Esto lo vi útil cuando tienes muchas operaciones que deben ocurrir en un orden específico.
Manejo de errores explícito: Con el método then(), generalmente manejas errores utilizando .catch() al final de la cadena de promesas. Esto permite un manejo más detallado y específico de errores, pero puede llevar a una estructura de código más profunda cuando se trabaja con muchas promesas.