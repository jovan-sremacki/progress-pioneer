import { Knex } from "knex"
import User from "@modules/authentication/domain/entities/User"
import EmailAlreadyExistsException from "@modules/authentication/domain/exceptions/EmailAlreadyExistsException"

class UserRepository {
  constructor(private knex: Knex) { }

  async save(user: object): Promise<User | null> {
    const [savedUser] = await this.knex('users').insert(user).returning('*')
    return User.create(savedUser)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.knex<User>('users').where('email', email).first()
    return User.create(user)
  }

  async findById(id: number): Promise<User | null> {
    const user = this.knex<User>('users').where('id', id).first()
    return User.create(user)
  }
}

export default UserRepository
