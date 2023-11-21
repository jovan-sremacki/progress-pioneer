import User from "@modules/authentication/domain/entities/User"
import UserRepository from "@modules/authentication/infrastructure/repository/UserRepository"

const mockReturnedUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  password: 'Te$t123!'
}

let userRepository: UserRepository
let simulateInsertError = false

const mockQueryBuilder = {
  insert: jest.fn().mockImplementation(() => {
    if (simulateInsertError) {
      throw new Error('Duplicate entry')
    }
    return mockQueryBuilder
  }),
  where: jest.fn().mockReturnThis(),
  returning: jest.fn().mockImplementation(() => Promise.resolve([mockReturnedUser])),
  first: jest.fn().mockResolvedValue(mockReturnedUser),
}

jest.mock('knex', () => {
  return () => mockQueryBuilder
})

describe('save', () => {
  beforeEach(() => {
    userRepository = new UserRepository(require('knex'))
    simulateInsertError = false
  })

  it('should save a user', async () => {
    const user = new User('Test', 'User', 'test@example.com', 'Te$t123!')
    const savedUser = await userRepository.save(user)

    expect(mockQueryBuilder.insert).toHaveBeenCalledWith(user)
    expect(savedUser).toEqual(mockReturnedUser)
  })

  it('should throw an error when trying to insert a user that already exists', async () => {
    const user = new User('Test', 'User', 'test@example.com', 'Te$t123!')
    simulateInsertError = true
  
    expect(userRepository.save(user)).rejects.toThrow('Duplicate entry')
    expect(mockQueryBuilder.insert).toHaveBeenCalledWith(user)
  })
})

describe('findByEmail', () => {
  beforeEach(() => {
    userRepository = new UserRepository(require('knex'))
  })

  it('should return a user by email', async () => {
    const user = await userRepository.findByEmail('test@example.com')
    expect(user).toEqual(mockReturnedUser)
  })
})
