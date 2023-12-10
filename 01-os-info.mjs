import {
  platform,
  arch,
  hostname,
  userInfo,
  totalmem,
  freemem,
  cpus,
  uptime,
} from 'node:os'

console.log('Información del sistema: ')
console.log('-----------------------------------------------------------')

console.log('Sistema operativo: ', platform(), arch())
console.log('Nombre del dispositivo: ', hostname())
console.log('Información del usuario: ', userInfo())
console.log('Memoria RAM total: ', totalmem() / 1024 / 1024 / 1024, 'gb')
console.log('Memoria RAM disponible: ', freemem() / 1024 / 1024 / 1024, 'gb')
console.log('Cantidad de procesadores: ', cpus())
console.log('Tiempo que lleva el equipo encendido: ', uptime() / 60 / 60, 'horas')
