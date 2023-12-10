const fs = require('node:fs/promises')

Promise.all([
  fs.readFile('./nodejs.txt', 'utf-8'),
  fs.readFile('./archivo.txt', 'utf-8'),
]).then(([text1, text2]) => {
  console.log(text1)
  console.log(text2)
})

console.log('|||HACIENDO OTRA TAREA MIENTRAS SE LEEN LOS ARCHIVOS|||')
