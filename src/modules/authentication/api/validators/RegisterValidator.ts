import {
  Length,
  IsEmail,
  IsOptional,
  IsStrongPassword,
  MaxLength,
} from 'class-validator'

export class RegisterValidator {
  @Length(5, 20)
  firstName: string

  @Length(5, 20)
  lastName: string

  @IsOptional()
  username: string

  @IsStrongPassword()
  password: string

  @IsEmail()
  email: string
}
