import express from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'
import errorHanlderMiddleware from './middleware/errorHandler.js'

// Al final: para hacerlo más facil de probar y levantar servidores
// de prueba, se crea una funcion que recibe el modelo y crea la app (4)
// al pasar modelos diferentes en cada instancia de la funcion, será
//  levantado un servidor diferente con el modelo que se quiera usar
export function createApp ({ movieModel }) {
  if (!movieModel) return

  const app = express()
  // Al final: Es la app la que determina que modelo se usará
  // a partir del modelo que se pasa al crear el router,
  // o "mini app" (/movies/*) y no el router (3)
  const moviesRouter = createMovieRouter({ movieModel })

  // Desactivar header x-powered-by > da info de la tecnologia usada
  app.disable('x-powered-by')

  const PORT = process.env.PORT ?? 1234

  // General middleware
  app.use(express.json())
  app.use(corsMiddleware)

  // Routes
  app.use('/movies', moviesRouter)

  app.use(errorHanlderMiddleware)

  app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
  })
}
