import User from "@modules/authentication/domain/entities/User"
import UserRepository from "@modules/authentication/infrastructure/repository/UserRepository"
import knex from "knex"

let userRepository: UserRepository
let db: any

beforeAll(async () => {
  // Set up an in-memory SQLite database for testing
  db = knex({
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true
  })

  await db.schema.createTable('users', (table: any) => {
    table.increments('id')
    table.string('firstname')
    table.string('lastname')
    table.string('email').unique()
    table.string('password')
    table.string('role')
    table.string('status')
    table.string('username')
    table.timestamp('createdAt').defaultTo(db.fn.now())
    table.timestamp('updatedAt').defaultTo(db.fn.now())
  })

  userRepository = new UserRepository(db)
})

afterAll(() => {
  db.destroy()
})

describe('save', () => {
  it('should save a user', async () => {
    const user = new User('Test', 'User', 'test@example.com', 'Te$t123!')
    const savedUser = await userRepository.save(user)
    
    const expectedResponse = {
      id: savedUser.getId(),
      name: savedUser.getFullName(),
      email: savedUser.getEmail(),
      password: savedUser.getPassword()
    }

    const result = await db('users').where('email', 'test@example.com')

    expect(result).toEqual(expectedResponse)
  })
})

// describe('findByEmail', () => {
//   it('should return a user by email', async () => {
//     const user = await userRepository.findByEmail('test@example.com')
//     expect(user).toEqual(mockReturnedUser)
//   })
// })
