const os = require('node:os')

console.log('Información del sistema: ')
console.log('-----------------------------------------------------------')

console.log('Sistema operativo: ', os.platform(), os.arch())
console.log('Nombre del dispositivo: ', os.hostname())
console.log('Información del usuario: ', os.userInfo())
console.log('Memoria RAM total: ', os.totalmem() / 1024 / 1024 / 1024, 'gb')
console.log('Memoria RAM disponible: ', os.freemem() / 1024 / 1024 / 1024, 'gb')
console.log('Cantidad de procesadores: ', os.cpus())
console.log('Tiempo que lleva el equipo encendido: ', os.uptime() / 60 / 60, 'horas')
