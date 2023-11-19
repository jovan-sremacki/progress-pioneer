class PasswordTooWeakException extends Error {
  constructor(email: string) {
    super(`Password does not meet complexity requirements`)
  }
}

export default PasswordTooWeakException
