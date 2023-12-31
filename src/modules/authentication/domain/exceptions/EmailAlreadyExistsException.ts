class EmailAlreadyExistsException extends Error {
  constructor(email: string) {
    super(`The email '${email} already exists.`)
  }
}

export default EmailAlreadyExistsException
