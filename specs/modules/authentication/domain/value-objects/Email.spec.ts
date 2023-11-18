import Email from '../../../../../src/modules/authentication/domain/value-objects/Email'

describe('Email', () => {
  it('should create an email for a valid email address', () => {
    const email = 'test@example.com'
    expect(() => new Email(email)).not.toThrow()
  })

  it('shouldn\'t create an email for an invalid email address', () => {
    const email = 'test@'
    expect(() => new Email(email)).toThrow()
  })
})
