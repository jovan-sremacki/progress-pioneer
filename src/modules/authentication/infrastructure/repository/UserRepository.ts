import { Knex } from "knex"
import User from "@modules/authentication/domain/entities/User"
import EmailAlreadyExistsException from "@modules/authentication/domain/exceptions/EmailAlreadyExistsException"

class UserRepository {
  constructor(private knex: Knex) { }

  async save(user: any): Promise<User | null> {
    try {
      const [savedUser] = await this.knex('users').insert(user).returning('*')
      return User.create(savedUser)
    } catch (error) {
      if (error.constraint == 'users_email_unique') {        
        throw new EmailAlreadyExistsException(user.email)
      }
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.knex<User>('users').where('email', email).first()
    return user ? User.create(user) : null
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.knex<User>('users').where('id', id).first()
    return user ? User.create(user) : null
  }
}

export default UserRepository
