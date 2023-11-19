import Password from "@modules/authentication/domain/value-objects/Password";
import PasswordTooWeakException from "@modules/authentication/domain/exceptions/PasswordTooWeakException";

describe('Password', () => {
  it('shouldn\'t create the password if it\'s only text', () => {
    const password = 'test'
    expect(() => new Password(password)).toThrow(PasswordTooWeakException)
  })

  it('shouldn\'t create the password if it\'s only text and numbers', () => {
    const password = 'test123'
    expect(() => new Password(password)).toThrow(PasswordTooWeakException)
  })

  it('should create the password if it\'s with all required characters', () => {
    const password = 'Te$t123@'
    expect(() => new Password(password)).not.toThrow()
  })
})
