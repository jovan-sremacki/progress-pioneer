import User from "../domain/entities/User"
import UserRepository from "../infrastructure/repository/UserRepository"
import { BCryptEncryptionService } from "../infrastructure/encryption/BCryptEncryptionService"
// import { JwtTokenService } from "../infrastructure/token/JwtTokenService"
import { Status } from "../domain/enums/status.enum"
import { UserRole } from "../domain/enums/userRole.enum"
import { RegisterValidator } from "../api/validators/RegisterValidator"
import { validate } from "class-validator"
import ValidationException from "../domain/exceptions/ValidationException"

class RegisterUserService {
  private userRepository: UserRepository
  private registerValidator: RegisterValidator

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
    this.registerValidator = new RegisterValidator()
  }

  async call(userData: any): Promise<{ user: User; token: string; } | {}> {
    return this.validateUserData(userData)
      .then(() => BCryptEncryptionService.encryptedPassword(userData.password))
      .then(encryptedPassword => this.addUser({ ...userData, password: encryptedPassword }))
      .then(savedUser => { return { user: savedUser, token: 'token' } })
      .catch(error => {
        throw error
      })
  }

  private async addUser(userData: any): Promise<User> {
    const newUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      verified: false,
      status: Status.INACTIVE,
      role: UserRole.MEMBER,
    }

    return this.userRepository.save(newUser)
  }

  private async validateUserData(userData: any): Promise<void> {
    Object.assign(this.registerValidator, userData)
    const errors = await validate(this.registerValidator)

    if (errors.length > 1) {
      const constraints = errors.map(({ constraints }) => constraints)
      throw new ValidationException(JSON.stringify(constraints))
    }
  }
}

export default RegisterUserService
