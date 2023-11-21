import User from "@modules/authentication/domain/entities/User"

export interface IUserRepository {
  save(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: number): Promise<User | null>
}