import { BCryptEncryptionService } from "../infrastructure/encryption/BCryptEncryptionService"
import { JwtTokenService } from "../infrastructure/token/JwtTokenService"
import User from "../domain/entities/User"
import UserRepository from "../infrastructure/repository/UserRepository"

class RegisterUserService {
  private userRepository: UserRepository
  private encryptionService: BCryptEncryptionService
  private tokenService: JwtTokenService

  async call(userData: any): Promise<{ user: User; token: string }> {
    const encryptedPassword = await this.encryptionService.encryptedPassword(userData.password)

    const newUser = new User(
      userData.firstName,
      userData.lastName,
      userData.email,
      encryptedPassword,
      userData.status,
      userData.role,
      userData?.username
    )
    const savedUser = this.userRepository.save(newUser)

    const token = this.tokenService.generateToken(savedUser)

    return { user: newUser, token: token }
  }
}

export default RegisterUserService
