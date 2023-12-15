import { RegisterValidator } from "@modules/authentication/api/validators/RegisterValidator";
import { validate } from "class-validator";

describe('RegisterValidator', () => {
  let registerValidator;

  beforeEach(() => {
    registerValidator = new RegisterValidator();
    registerValidator.firstName = 'Testt';
    registerValidator.lastName = 'Userr';
    registerValidator.password = '123';
    registerValidator.email = 'test@example.com';
    registerValidator.username = '';
  });

  async function testValidation(expectedError, expectedConstraint) {
    const errors = await validate(registerValidator);

    expect(errors.length).toEqual(1);
    expect(errors[0].constraints).toEqual(expectedConstraint);
  }

  it('should raise an error when the password is weak', async () => {
    await testValidation('password', { isStrongPassword: 'password is not strong enough' });
  });

  it('should raise an error when the email is invalid', async () => {
    registerValidator.password = 'pa$$worD123';
    registerValidator.email = 'test@';
    await testValidation('email', { isEmail: 'email must be an email' });
  });

  it('should raise an error when firstName is blank', async () => {
    registerValidator.firstName = '';
    registerValidator.password = 'pa$$worD123';
    registerValidator.email = 'test@example.com';
    await testValidation('firstName', { isLength: 'firstName must be longer than or equal to 5 characters' });
  });

  it('shouldn\'t raise an error when all params are valid', async () => {
    registerValidator.firstName = 'Testt';
    registerValidator.password = 'pa$$worD123';
    registerValidator.email = 'test@example.com';

    const errors = await validate(registerValidator);
    expect(errors.length).toEqual(0);
  });
});
