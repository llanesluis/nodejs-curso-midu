import { Router } from 'express'
import { MovieController } from '../controllers/movie.js'

export const moviesRouter = Router()

moviesRouter
  .route('/')
  .get(MovieController.getAllMovies)
  .post(MovieController.createMovie)

moviesRouter.get('/:id', MovieController.getById)
moviesRouter.patch('/:id', MovieController.updateMovie)
moviesRouter.delete('/:id', MovieController.deleteMovie)

moviesRouter.options('/:id', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'DELETE, POST, PATCH, GET')
  res.send(200)
})
