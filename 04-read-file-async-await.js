//El sistema de modulos clasico CommonJs no soporta await
const fs = require('node:fs/promises')

//IIFE > Inmediatly Invoked Function Expresion
void (async () => {
  try {
    const text1 = await fs.readFile('./nodejs.txt', 'utf-8')
    console.log('Primer archivo: ', text1)

    const text2 = await fs.readFile('./archivo.txt', 'utf-8')
    console.log('Segundo archivo: ', text2)
  } catch (e) {
    console.log(e)
  }
})()

console.log('|||HACIENDO OTRA TAREA MIENTRAS SE LEEN LOS ARCHIVOS|||')
