const fs = require('node:fs/promises')

//Version Callback
// fs.readdir('.', (err, files) => {
//   if (err) {
//     console.error('No se puede leer el directorio: ', error)
//     return
//   }

//   files.forEach((file) => console.log(file))
// })

//Version promesas
fs.readdir('.')
  .then((files) => {
    files.forEach((file) => console.log(file))
  })
  .catch((e) => console.err(e))
