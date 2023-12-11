const fs = require('node:fs/promises')
const path = require('node:path')
const picocolors = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls(folder) {
  let files

  try {
    files = await fs.readdir(folder)
  } catch (e) {
    console.error(picocolors.red(`No se puede leer el directorio "${folder}"`))
    process.exit(1)
  }

  const filesPromises = files.map(async (file) => {
    const filePath = await path.join(folder, file)
    let fileStats

    try {
      fileStats = await fs.stat(filePath)
    } catch (e) {
      console.error(picocolors.red(`No se puede leer el archivo "${filePath}"`))
      process.exit(1)
    }

    const isDirectory = fileStats.isDirectory()

    const fileType = isDirectory ? picocolors.yellow('d') : picocolors.magenta('f')
    const fileSize = fileStats.size.toString() + ' bytes'
    const lastModified = picocolors.green(fileStats.mtime.toLocaleString())

    return `${fileType} ${file.padEnd(35)} ${fileSize.padStart(10)} ${lastModified}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach((fileInfo) => console.log(fileInfo))
}

ls(folder)
