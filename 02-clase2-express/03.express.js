const express = require('express')
const dittoJson = require('./pokemon/ditto.json')

const app = express()

// Desactivar cabacera por seguridad, da info de las tecnologias
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

// MIDDLEWARE
// En el primer parametro puedes definir si quieres que solo aplique a ciertas rutas, ej. '/pokemon/*' >> Todas las rutas que empiecen por '/pokemon', el default es '/' por eso entra en todas
// app.use((req, res, next) => {
//   // Para validar que el usuario este autenticado
//   // Revisar cookies
//   // Procesar cierto tipos de datos
//   // Rechazar requests, etc
//   console.log(`request de url ${req.url} pasando por el middleware`)

//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   // En este punto solo tendremos peticiones POST y el contenido sera un JSON

//   let body = ''

//   req.on('data', (chunk) => {
//     body += chunk.toString()
//   })
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     req.body = data

//     next()
//   })
// })
// >> express ya cuenta con un middleware que hace esto por nosotros:
app.use(express.json())

// >>>>>>>>>>>>>>> GET <<<<<<<<<<<<<<<
app.get('/', (req, res) => {
  res.send('<h1>Servidor con express /</h1>')
})

app.get(
  '/apple',
  (req, res, next) => {
    console.log('pasando por la primera ruta, next("route")')
    next('route')
    // res.send('<h1>/apple</h1>')
  },
  (req, res, next) => {
    console.log('pasando por la segunda ruta')

    res.send('<h1>/apple 2 junto</h1>')
  }
)

app.get('/apple', (req, res, next) => {
  console.log('pasando por la tercera ruta')

  res.send('<h1>/apple 2 separado</h1>')
})

app.get('/apple/images', (req, res) => {
  res.send('<h1>/apple/images</h1>')
})

app.get('/apple/images/news', (req, res) => {
  res.send('/apple/images/news</h1>')
})

app.get('/pokemon/:pokemonId', (req, res) => {
  res.json(req.params)
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJson)
})
app.get('/about', (req, res) => {
  res.send('<h1>About page xdxdxd</h1>')
})

// >>>>>>>>>>>>>>> POST <<<<<<<<<<<<<<<
app.post('/pokemon', (req, res) => {
  // Procesar estos datos en una bbdd etc.
  res.status(201).json(req.body)
})

// El handler de errores toma cualquier cosa que se le mande a next(.....) que no sea next('route')
app.use((err, req, res, next) => {
  console.log('catching error from: ', err)
})
// Los metodos que no hayan hecho un match
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`express server listening on http://localhost:${PORT}`)
})
