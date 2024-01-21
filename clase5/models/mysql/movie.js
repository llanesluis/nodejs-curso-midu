import mysql from 'mysql2/promise'
// Las validaciones del MODELO
// - Coherencia de datos
// - Integridad de los datos
// - Verificar si hay inputs que ya existen (el controlador puede mandar un input valido, pero que ya existeen la BBDD)

const config = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Llla1138*',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAllMovies ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      try {
        const [results] = await connection.query('SELECT BIN_TO_UUID(m.id) AS id, m.title, m.year, m.director, m.duration, m.poster, m.rate, g.name as genre FROM movie m INNER JOIN movie_genres mg ON mg.movie_id = m.id INNER JOIN genre g ON  g.id = mg.genre_id WHERE g.name = ?;', [lowerCaseGenre])

        // console.log(results)
        return results
      } catch (error) {
        throw new Error('Error getting the movies by genre')
      }
    }

    try {
      const [results] = await connection.query(
        'SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movie;'
      )

      // console.log(results)

      return results
    } catch (error) {
      throw new Error('Error getting all the movies')
    }
  }

  static async getById ({ id }) {
    try {
      const [results] = await connection.query(
        'SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie where id = UUID_TO_BIN(?);',
        [id]
      )

      if (results.length < 1) return null

      // console.log(results)
      return results[0]
    } catch (error) {
      throw new Error('Error finding the movie')
    }
  }

  static async createMovie ({ input }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      genre,
      rate
    } = input

    try {
      // Generar un UUID, podemos generarlo con crypto o con sql
      const [UUIDresults] = await connection.query('SELECT UUID() uuid;')
      const [{ uuid }] = UUIDresults

      const [results] = await connection.query(`
        INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES 
        (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?)
      `, [title, year, director, duration, poster, rate])

      // Si no se hizo el insert, salir
      if (results.affectedRows < 1) return null

      // Agregar en la tabal de relacion de peliculas y generos
      genre.forEach(async (g) => {
        await connection.query(
          `
        INSERT INTO movie_genres (movie_id, genre_id) VALUES
          (
            (SELECT id FROM movie where id = UUID_TO_BIN(?)), (SELECT id FROM genre where name = ?)
          )`,
          [uuid, g]
        )
      })

      const [movies] = await connection.query(
        'SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movie where id = UUID_TO_BIN(?);',
        [uuid]
      )

      return movies[0]
    } catch (error) {
      throw new Error('Error creating the movie')
    }
  }

  static async updateMovie ({ id, input }) {
    const updateQueryFields = []
    let updateQuery = ''

    for (const field in input) {
      updateQueryFields.push(`${field} = '${input[field]}'`)
      updateQuery = updateQueryFields.join(', ')
    }

    if (!updateQuery) return null

    try {
      const [results] = await connection.query(`UPDATE movie SET ${updateQuery} where id = UUID_TO_BIN(?);`, [id])

      if (results.affectedRows < 1) return null

      const movie = await this.getById({ id })
      return movie
    } catch (error) {
      throw new Error('Could not update the movie')
    }
  }

  static async deleteMovie ({ id }) {
    const movie = await this.getById({ id })
    if (!movie) return null
    // console.log(movie)

    try {
      const [results] = await connection.query(
        'DELETE FROM movie WHERE id= UUID_TO_BIN(?)',
        [id]
      )

      if (results.affectedRows < 1) return null

      // Borrar registro de tabla movie_genres
      await connection.query('DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);', [id])

      return movie
    } catch (error) {
      throw new Error('Error deleting the movie')
    }
  }
}
