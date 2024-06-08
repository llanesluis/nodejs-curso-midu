const express = require('express')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./lib/validators/movies')

const app = express()

// Desactivar el header x-powered-by > que da info de la tecnologia usada
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.use(express.json())

app.use('/', (req, res, next) => {
  console.log(`Request from: ${req.url}`)
  res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Methods', 'DELETE, POST, PATCH, GET')

  next()
})

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((item) => item.toLowerCase() === genre.toLowerCase())
    )

    return res.json(filteredMovies)
  }

  res.json(movies)
})

app.post('/movies', (req, res) => {
  const body = req.body

  body.id = crypto.randomUUID()

  const result = validateMovie(body)

  // status 422, no se puede procesar
  if (result.error) return res.status(422).json(result.error)

  const movie = result.data

  // Validar que no exista esta pelicula
  const movieExists = movies.find((storedMovie) => storedMovie.title === movie.title)
  if (movieExists) {
    return res.status(409).json({ message: 'Movie already exists' })
  }

  // >>> Pasar a una BBDD
  movies.push(movie)
  res.status(201).json(movie)
})

// Alternativa, declarando una sola ruta pata evitar redundancia
// app
//   .route('/movies')
//   .get((req, res) => {})
//   .post((req, res) => {})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.patch('/movies/:id', (req, res) => {
  const body = req.body
  const result = validatePartialMovie(body)

  if (result.error) return res.status(422).json(result.error)

  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex < 0) return res.status(404).json({ message: 'Movie not found' })

  const updatedFields = result.data
  const updatedMovie = { ...movies[movieIndex], ...updatedFields }

  // >>> Pasar a una BBDD
  movies[movieIndex] = updatedMovie
  res.json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params

  const movieIndex = movies.findIndex((movie) => movie.id === id)
  const movie = movies[movieIndex]
  if (movieIndex < 0) return res.status(404).json({ message: 'Movie does not exist' })

  // Hacer el DELETE en la BBDD
  movies.splice(movieIndex, 1)

  res.json({ message: `Movie "${movie.title}" was deleted` })
})

app.options('/movies/:id', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'DELETE, POST, PATCH, GET')
  res.send(200)
})

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})
