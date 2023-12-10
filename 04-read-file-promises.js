const fs = require('node:fs/promises')

fs.readFile('./nodejs.txt', 'utf-8')
  .then((text) => console.log('Primer archivo: ', text))
  .catch(console.log)

fs.readFile('./archivo.txt', 'utf-8')
  .then((text) => console.log('Segundo archivo: ', text))
  .catch(console.log)

console.log('|||HACIENDO OTRA TAREA MIENTRAS SE LEEN LOS ARCHIVOS|||')
