import { validateMovie, validatePartialMovie } from '../lib/validators/movies.js'
import { MovieModel } from '../models/movie.js'

// Las validaciones del CONTROLADOR
// - Verificar el input del usuario
// - Correos, numeros, cadenas en formato y rango correcto
// - Hacer maps, filtros, etc

export class MovieController {
  static async getAllMovies (req, res) {
    try {
      const { genre } = req.query
      const movies = await MovieModel.getAllMovies({ genre })

      res.json(movies)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async createMovie (req, res) {
    const body = req.body

    const result = validateMovie(body)
    if (result.error) {
      return res.status(422).json(result.error)
    }

    const newMovie = await MovieModel.createMovie({ input: body })
    if (!newMovie) res.status(400).json({ message: 'Could not create the movie' })

    res.status(201).json(newMovie)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })

    if (!movie) res.status(404).json({ message: 'Movie not found' })

    return res.json(movie)
  }

  static async updateMovie (req, res) {
    const body = req.body
    const result = validatePartialMovie(body)

    if (result.error) return res.status(422).json(result.error)

    const { id } = req.params
    const input = result.data

    const updatedMovie = await MovieModel.updateMovie({ id, input })

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    res.json(updatedMovie)
  }

  static async deleteMovie (req, res) {
    const { id } = req.params

    const deletedMovie = await MovieModel.deleteMovie({ id })

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie does not exist' })
    }

    res.json({ message: `Movie "${deletedMovie.title}" was deleted` })
  }
}
