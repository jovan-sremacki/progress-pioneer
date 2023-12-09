import knex from "knex"
import knexfile from "../../../../../knexfile"
import UserRepository from "@modules/authentication/infrastructure/repository/UserRepository"
import { Status } from "@modules/authentication/domain/enums/status.enum"
import { UserRole } from "@modules/authentication/domain/enums/userRole.enum"

let userRepository: UserRepository
let db;

beforeAll(async () => {
  db = knex(knexfile.test)
  userRepository = new UserRepository(db)
})

afterAll(async () => {
  await db('users').del()
})

describe('save', () => {
  const userObject = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'Te$t123!',
    verified: false,
    status: Status.INACTIVE,
    role: UserRole.MEMBER,
  }

  it('should save a user', async () => {        
    const savedUser = await userRepository.save(userObject)

    const result = await userRepository.findByEmail('test@example.com')
    expect(result).toEqual(savedUser)
  })

  it('should raise an error when trying to use existing email', async () => {
    try {
      await userRepository.save(userObject)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})

describe('findByEmail', () => {
  it('should return a user by email', async () => {
    const user = await userRepository.findByEmail('test@example.com')
    expect(user.getFullName()).toEqual('Test User')
  })
})
