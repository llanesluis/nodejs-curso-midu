import express from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

const app = express()
// Desactivar header x-powered-by > da info de la tecnologia usada
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.use(express.json())
app.use(corsMiddleware)

app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})
