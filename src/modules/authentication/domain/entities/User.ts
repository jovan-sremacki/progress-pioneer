import Email from '../value-objects/Email'
import Password from '../value-objects/Password'
import { UserRole } from "../enums/userRole.enum"
import { Status } from "../enums/status.enum"

class User {
  private id: number
  private firstName: string
  private lastName: string
  private username: string
  private email: Email
  private password: Password
  private status: Status
  private role: UserRole
  private verified: boolean
  private timezone: string
  private languagePreference: string
  private createdAt: Date
  private updatedAt: Date

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    status: Status = Status.INACTIVE,
    role: UserRole = UserRole.MEMBER,
    verified: boolean = false,
    timezone?: string,
    languagePreference?: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.username = username
    this.email = new Email(email)
    this.password = new Password(password)
    this.status = status
    this.role = role
    this.verified = verified
    this.timezone = timezone || ''
    this.languagePreference = languagePreference || ''
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  public getUsername(): string {
    return this.username
  }

  public getEmail(): string {
    return this.email.getValue()
  }

  public getPassword(): string {
    return this.password.getValue()
  }

  changePassword(newPassword: string) {
    this.password = new Password(newPassword)
  }

  changeEmail(newEmail: string) {
    this.email = new Email(newEmail)
  }
}

export default User
