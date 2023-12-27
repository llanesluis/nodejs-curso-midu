const http = require('node:http')
const dittoJson = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  const { method, url } = req

  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (method === 'GET') {
    switch (url) {
      case '/': {
        return res.end('02.routing.js')
      }
      case '/pokemon/ditto': {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        return res.end(JSON.stringify(dittoJson))
      }
      case '/about': {
        return res.end('<h1>About page xd</h1>')
      }
      default: {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.statusCode = 404
        res.end('<h1>Not found</h1>')
      }
    }
  } else if (method === 'POST') {
    switch (url) {
      case '/pokemon': {
        let body = ''

        // La data viene por partes, por eso debemos escuchar el evento data
        req.on('data', (chunk) => (body += chunk.toString()))

        req.on('end', () => {
          const data = JSON.parse(body)

          // Procesar la info...
          res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
          res.end(JSON.stringify(data))
        })

        break
      }
      default: {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.statusCode = 404
        res.end('Not found')
      }
    }
  }
}

const server = http.createServer(processRequest)

server.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})
