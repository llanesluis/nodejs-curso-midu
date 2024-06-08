import { validateMovie, validatePartialMovie } from '../lib/validators/movies.js'

// Las validaciones del CONTROLADOR
// - Verificar el input del usuario
// - Correos, numeros, cadenas en formato y rango correcto
// - Hacer maps, filtros, etc

// Al final >> convertimos los metodos de esta clase
// en metodos normales que requieren de una instancia
// al momento de instanciarla, pasaremos el modelo que
// queramos usar por medio del constructor

export class MovieController {
  // Al final: Con motivos de hacer esto mas escalable, se pasa
  // al constructor el modelo que se quiere usar (inyeccion de dependencias)
  // los metodos static ahora requieren de una instancia de clase (1)
  constructor({ movieModel }) {
    this.movieModel = movieModel
  }

  getAllMovies = async (req, res) => {
    try {
      const { genre } = req.query
      const movies = await this.movieModel.getAllMovies({ genre })

      res.json(movies)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  createMovie = async (req, res) => {
    const body = req.body

    const result = validateMovie(body)
    if (result.error) {
      return res.status(422).json(result.error)
    }

    const newMovie = await this.movieModel.createMovie({ input: body })
    if (!newMovie) res.status(400).json({ message: 'Could not create the movie' })

    res.status(201).json(newMovie)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })

    if (!movie) res.status(404).json({ message: 'Movie not found' })

    return res.json(movie)
  }

  updateMovie = async (req, res) => {
    const body = req.body
    const result = validatePartialMovie(body)

    if (result.error) return res.status(422).json(result.error)

    const { id } = req.params
    const input = result.data

    const updatedMovie = await this.movieModel.updateMovie({ id, input })

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Could not update the movie' })
    }

    res.json(updatedMovie)
  }

  deleteMovie = async (req, res) => {
    const { id } = req.params

    const deletedMovie = await this.movieModel.deleteMovie({ id })

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie does not exist' })
    }

    res.json({ message: `Movie "${deletedMovie.title}" was deleted` })
  }
}
