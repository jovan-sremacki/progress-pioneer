import { Knex } from "knex"
import { IUserRepository } from "./IUserRepository"
import User from "@modules/authentication/domain/entities/User"

class UserRepository implements IUserRepository {
  constructor(private knex: Knex) {}

  async save(user: User): Promise<User> {
    const [savedUser] = await this.knex<User>('users').insert(user).returning('*')
    return savedUser
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.knex<User>('users').where('email', email).first()
  }

  async findById(id: number): Promise<User | null> {
    return this.knex<User>('users').where('id', id).first()
  }
}

export default UserRepository
