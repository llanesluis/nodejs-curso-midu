import { config } from './dotenv.js'
config()

console.log(process.env.DB_SECRET)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_TOKEN)
console.log(process.env.JWT_TOKEN)
