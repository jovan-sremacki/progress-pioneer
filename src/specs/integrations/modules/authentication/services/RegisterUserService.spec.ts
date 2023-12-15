import { setupTestDB, teardownTestDB } from "../../../../support/testDatabaseSetup"
import RegisterUserService from "@modules/authentication/services/RegisterUserService"
import UserRepository from "@modules/authentication/infrastructure/repository/UserRepository"

describe('RegisterUserService Integration', () => {
  let userRepository: UserRepository
  let registerUserService: RegisterUserService
  let db;

  beforeAll(async () => {
    db = setupTestDB()
    userRepository = new UserRepository(db)
    registerUserService = new RegisterUserService(userRepository)
  })

  afterAll(async () => {
    teardownTestDB('users')
  })

  it('should raise an error when inalid params are passed', async () => {
    const userObject = { email: 'test@example.com', password: 'hashedPassword' }
    expect(registerUserService.call(userObject)).rejects.toThrow()
  })

  it('should return a user object with token when params are valid', async () => {
    const userObject = {
      firstName: 'Testt',
      lastName: 'Userr',
      email: 'test@example.com',
      password: 'hashedPassword'
    }

    const result = await registerUserService.call(userObject)
  })
})
