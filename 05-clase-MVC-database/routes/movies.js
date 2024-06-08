import { Router } from 'express'
import { MovieController } from '../controllers/movie.js'

// Al final: para hacerlo mas escalable, en lugar de "hardcodear"
// el modelo, se pasa como parametro desde donde se crea la app (2)

export function createMovieRouter ({ movieModel }) {
  const moviesRouter = Router()
  const movieController = new MovieController({ movieModel })

  moviesRouter
    .route('/')
    .get(movieController.getAllMovies)
    .post(movieController.createMovie)

  moviesRouter
    .route('/:id')
    .get(movieController.getById)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie)

  // moviesRouter.get('/:id', movieController.getById)
  // moviesRouter.patch('/:id', movieController.updateMovie)
  // moviesRouter.delete('/:id', movieController.deleteMovie)

  moviesRouter.options('/:id', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PATCH, GET')
    res.send(200)
  })

  return moviesRouter
}
