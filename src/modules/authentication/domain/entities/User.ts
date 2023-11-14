const typeorm = require("typeorm");
const UserRole = require("../enums/userRole.enum").UserRole;
const Status = require("../enums/status.enum").Status;

const Entity = typeorm.Entity;
const Column = typeorm.Column;
const PrimaryGeneratedColumn = typeorm.PrimaryGeneratedColumn;
const CreateDateColumn = typeorm.CreateDateColumn;
const UpdateDateColumn = typeorm.UpdateDateColumn;

@Entity('users')
class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column('varchar', { nullable: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.INACTIVE
  })
  status: typeof Status;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER
  })
  role: typeof UserRole

  @Column({ type: 'varchar' })
  verified: string;

  @Column({ type: 'varchar', nullable: true })
  timezone: string;

  @Column({ type: 'varchar', nullable: true })
  language_preference: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

module.exports = {
  User
};
