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
  private createdAt: Date
  private updatedAt: Date

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    status: Status = Status.INACTIVE,
    role: UserRole = UserRole.MEMBER,
    username?: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.username = username || null
    this.email = new Email(email)
    this.password = new Password(password)
    this.status = status
    this.role = role
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  public getId(): number {
    return this.id
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

  public getStatus(): string {
    return this.status
  }

  public getRole(): UserRole {
    return this.role
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  changePassword(newPassword: string) {
    this.password = new Password(newPassword)
  }

  changeEmail(newEmail: string) {
    this.email = new Email(newEmail)
  }
}

export default User
