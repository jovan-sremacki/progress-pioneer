class InvalidEmailException extends Error {
  constructor(email: string) {
    super(`The email '${email} is invalid.`)
  }
}

export default InvalidEmailException
