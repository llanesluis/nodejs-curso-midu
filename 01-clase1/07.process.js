//"process" es un objeto global que guarda informacion y
//permite controlar el proceso de ejecucion

console.log('Argumentos de la linea de comandos: ', process.argv)

//console.log('Entorno de ejecucion: ', process.env)

console.log('Directorio actual de trabajo: ', process.cwd()) //Proporciona desde donde se esta ejecutando el proceso, no en que carpeta esta el archivo.

console.log(process.env) //Objeto que guarda las variables de entorno
//Controlar la salida del proceso
process.on('exit', () => {
  //Limpiar recursos, cerrar archivos, etc...
})
process.exit(0) //Terminar el proceso, 0 » no errores. 1 » salir por errores
