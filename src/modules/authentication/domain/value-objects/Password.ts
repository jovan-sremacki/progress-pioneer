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