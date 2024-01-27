import { createApp } from './01.app.js'
import { MovieModel } from './models/mysql/movie.js'

createApp({ movieModel: MovieModel })
console.log('>>>Running mysql server')
