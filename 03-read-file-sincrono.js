const fs = require('node:fs')

const text1 = fs.readFileSync('./nodejs.txt', 'utf-8')
console.log(text1)

const text2 = fs.readFileSync('./archivo.txt', 'utf-8')
console.log(text2)

console.log('|||HACIENDO OTRA TAREA MIENTRAS SE LEEN LOS ARCHIVOS|||')
