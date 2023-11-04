// User.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { UserRole } from "../enums/userRole.enum"
import { Status } from "../enums/status.enum"


@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  firstName: string

  @Column({ type: 'varchar' })
  lastName: string

  @Column('varchar', { nullable: true })
  username?: string

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'varchar' })
  email: string

  // @Column('text', { nullable: true })
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.INACTIVE
  })
  status: Status // You might use 'enum' here

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER
  })
  role: UserRole

  @Column({ type: 'varchar' })
  verified: boolean

  @Column({ type: 'varchar', nullable: true })
  timezone: string

  @Column({ type: 'varchar', nullable: true })
  language_preference: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
