import { readJSON } from '../../lib/utils.js'
import { validateMovie } from '../../lib/validators/movies.js'

const movies = readJSON('../movies.json')
/* IMPORTAR JSON
 import movies from './movies.json' with {type : "json"} <<< sera soportado en el futuro

 >> 1ra forma, fs.readFile
 import fs from 'node:fs'
 const movies = JSON.parse(fs.readFile('./movies.json', 'utf-8'))

 >> 2da forma, crear un require
 const require = createRequire(import.meta.url) // Regresa la url de este archivo
 const movies = readJSON('./movies.json')
*/

// Las validaciones del MODELO
// - Coherencia de datos
// - Integridad de los datos
// - Verificar si hay inputs que ya existen (el controlador puede mandar un input valido, pero que ya existeen la BBDD)

export class MovieModel {
  static async getAllMovies({ genre }) {
    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some((item) => item.toLowerCase() === genre.toLowerCase())
      )

      return filteredMovies
    }
    return movies
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id)

    return movie
  }

  static async createMovie({ input }) {
    const newMovie = { ...input, id: crypto.randomUUID() }
    const result = validateMovie(newMovie)
    if (result.error) return false

    const movie = result.data

    // >>> Pasar a una BBDD
    movies.push(movie)

    return movie
  }

  static async updateMovie({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex < 0) return false

    movies[movieIndex] = { ...movies[movieIndex], ...input }

    return movies[movieIndex]
  }

  static async deleteMovie({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex < 0) return false

    const movie = movies[movieIndex]

    // Hacer el DELETE en la BBDD
    movies.splice(movieIndex, 1)

    return movie
  }
}
