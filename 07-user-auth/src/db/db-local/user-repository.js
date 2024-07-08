import DBLocal from 'db-local'
import crypto from 'node:crypto'
import { encryptPassword, comparePassword } from '../../utils/encryption.ts'

const { Schema } = new DBLocal({ path: './src/db/db-local/data' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
})

export class UserRepository {
  static async createUser ({ username, password, email, role }) {
    const user = User.findOne({ username })
    if (user) {
      throw new Error('User already exists')
    }

    const id = crypto.randomUUID()
    const hashedPassword = await encryptPassword({ password })

    User.create({ _id: id, username, password: hashedPassword, email, role }).save()

    return { id, username, email, role }
  }

  static async login ({ username, password }) {
    const user = User.findOne({ username })
    if (!user) {
      throw new Error('User not found')
    }

    const isValidPassword = await comparePassword({
      password,
      hashedPassword: user.password
    })
    if (!isValidPassword) {
      throw new Error('Invalid password')
    }

    const { password: _, ...publicUser } = user

    return {
      id: publicUser._id,
      username: publicUser.username,
      email: publicUser.email,
      role: publicUser.role
    }
  }

  static getAllUsers () {
    const users = User.find()
    return users.map(({ password, ...user }) => user)
  }

  static getUserByUsername (username) {
    const users = User.find(user => user.username === username)
    return users.map(({ password, ...user }) => user)
  }
}
