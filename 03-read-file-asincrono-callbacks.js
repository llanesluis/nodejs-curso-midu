const fs = require('node:fs')
//Para convertir en promesas el readFile de callbacks se usa una utilidad, sin promesas nativas
// const {promisify} = require('node:util')
// const readFilePromise = promisify(fs.readFile)

fs.readFile('./nodejs.txt', 'utf-8', (err, text) => console.log(text))

fs.readFile('./archivo.txt', 'utf-8', (err, text) => console.log(text))

console.log('|||HACIENDO OTRA TAREA MIENTRAS SE LEEN LOS ARCHIVOS|||')
