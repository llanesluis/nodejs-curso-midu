const path = require('node:path')

//Unir rutas con path.join
//Las rutas se muestan separadas por "/" (macOS) o "\" (windows)

console.log(path.sep) //Para ver la barra que utiliza el S.O.

const filePath = path.join('users', 'luife', 'programacion', 'web', 'ejemplo.html')
console.log(filePath)

const base = path.basename(filePath) //Obtener el nombre del archivo / ultimo segmento
console.log(base)

const fileName = path.basename(filePath, '.html') //El nombre sin la extension
console.log(fileName)

const extension = path.extname('types.d.ts') //La extension del final
console.log(extension)
