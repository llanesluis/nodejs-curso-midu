const fs = require('node:fs')

const file = './nodejs.txt'
const stats = fs.statSync(file)

console.log(`Archivo: ${file}`)
console.log('¿Es un directorio? ', stats.isDirectory())
console.log('¿Es un directorio? ', stats.isFile())
console.log('Tamaño en bytes:  ', stats.size)
