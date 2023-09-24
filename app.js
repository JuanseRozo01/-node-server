const http = require('http');
const host = 'localhost'
const port = 8080

const listTask = [{
    id: '1',
    descripcion: 'sacar al perro',
    esstado: true
}, {
    id:'2',
    descripcion:'darle clases al darwin',
    estado: true
}, {
    id:'3',
    descripcion:'ir a la U',
    estado: true
}];

const server = http.createServer((req, res) => {
res.writeHead(200, {'content-type' : 'application/JSON'})
res.end(JSON.stringify(listTask)) 

});

server.listen(port, host, () => {
    console.log(`escuchando en el ${host} : ${port}`)
});