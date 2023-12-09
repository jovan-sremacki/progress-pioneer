import { UserRole } from "../enums/userRole.enum"
import { Status } from "../enums/status.enum"

class User {
  private id: number
  private firstName: string
  private lastName: string
  private username: string
  private email: string
  private password: string
  private verified: boolean
  private status: Status
  private role: UserRole
  private created_at: string
  private updated_at: string

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    verified: boolean = false,
    status: Status = Status.INACTIVE,
    role: UserRole = UserRole.MEMBER,
    username?: string
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.username = username || null
    this.email = email
    this.password = password
    this.verified = verified
    this.status = status
    this.role = role
    this.created_at = new Date().toISOString().split('T')[0]
    this.updated_at = new Date().toISOString().split('T')[0]
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
    return this.email
  }

  public getPassword(): string {
    return this.password
  }

  public getStatus(): string {
    return this.status
  }

  public getVerified(): boolean {
    return this.verified
  }

  public getRole(): UserRole {
    return this.role
  }

  public getCreatedAt(): string {
    return this.created_at
  }

  public getUpdatedAt(): string {
    return this.updated_at
  }

  static create(object: any): User {    
    return new User(
      object.id,
      object.firstName,
      object.lastName,
      object.email,
      object.password,
      object.verified,
      object.status,
      object.role,
      object.username,
    )
  }
}

export default User
