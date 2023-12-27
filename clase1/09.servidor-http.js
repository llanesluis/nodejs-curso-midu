const http = require('node:http')
const { findAvailablePort } = require('./10.free-port.js')

const desiredPort = process.env.PORT ?? 3000

//Crear el servidor
const server = http.createServer((req, res) => {
  console.log('Request received')

  res.end('Hola mundo xd')
})

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`server listenig on http://localhost:${port}`)
  })
})
