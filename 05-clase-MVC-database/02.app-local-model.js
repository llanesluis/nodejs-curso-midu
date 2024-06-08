import { createApp } from './01.app.js'
import { MovieModel } from './models/file-system/movie.js'

createApp({ movieModel: MovieModel })
console.log('>>>Running local server')
