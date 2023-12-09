import bcrypt from 'bcrypt'

const saltRounds = 10

export class BCryptEncryptionService {
  async encryptedPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(saltRounds)
      const hashedPassword = await bcrypt.hash(password, salt)
      return hashedPassword
    } catch (error) {
      throw new Error('Error encrypting password')
    }
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hash)
      return isMatch
    } catch (error) {
      throw new Error('Error comparing password and hash')
    }
  }
}
