class ValidationException extends Error {
  constructor(constraint: string) {
    super(constraint)
  }
}

export default ValidationException
