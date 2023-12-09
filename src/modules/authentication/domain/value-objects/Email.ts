import InvalidEmailException from "../exceptions/InvalidEmailException"

class Email {
  private readonly value: string

  constructor(value: string) {
    if (!this.validateEmail(value)) {
      throw new InvalidEmailException(value)
    }
    this.value = value
  }

  private validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email.toLowerCase())
  }

  public getValue(): string {
    return this.value
  }

  public equals(other: Email): boolean {
    return this.value === other.getValue()
  }

  public toString(): string {
    return this.getValue();
  }
}

export default Email