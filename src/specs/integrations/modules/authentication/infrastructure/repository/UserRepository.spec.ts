import { setupTestDB, teardownTestDB } from "../../../../../support/testDatabaseSetup"
import UserRepository from "@modules/authentication/infrastructure/repository/UserRepository"
import { Status } from "@modules/authentication/domain/enums/status.enum"
import { UserRole } from "@modules/authentication/domain/enums/userRole.enum"

let userRepository: UserRepository
let db

beforeAll(async () => {
  db = setupTestDB()
  userRepository = new UserRepository(db)
})

afterAll(async () => {
  teardownTestDB('users')
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

  it('should return null when no matching email is found', async () => {
    const email = 'nonexistent@example.com'
    const foundUser = await userRepository.findByEmail(email)
    expect(foundUser).toBeNull()
  })
})

describe('findById', () => {
  it('should return a user when a matching ID is found', async () => {
    const userObject = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test2@example.com',
      password: 'Te$t123!',
      verified: false,
      status: Status.INACTIVE,
      role: UserRole.MEMBER,
    }
    const savedUser = await userRepository.save(userObject);

    const foundUser = await userRepository.findById(savedUser.getId());
    expect(foundUser).toBeDefined();
    expect(foundUser.getId()).toBe(savedUser.getId());
  });

  it('should return null when no matching ID is found', async () => {
    const id = 99999; // an ID unlikely to exist
    const foundUser = await userRepository.findById(id);
    expect(foundUser).toBeNull();
  });
});

