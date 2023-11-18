import PasswordTooWeakException from "../exceptions/PasswordTooWeakException";

class Password {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validatePassword(value)) {
      throw new PasswordTooWeakException(value)
    }
    this.value = value;
  }

  private validatePassword(password: string): boolean {
    // Implement password validation logic here
    // For example, a minimum of 8 characters, including at least one number and one special character
    return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Password): boolean {
    return this.value === other.getValue();
  }
}

export default Password