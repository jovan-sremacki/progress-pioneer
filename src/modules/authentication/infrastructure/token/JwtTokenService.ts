import jwt from 'jsonwebtoken'

export class JwtTokenService {
  private readonly secretKey: string
  private readonly expiresIn: string | number

  constructor(secretKey: string, expiresIn: string | number) {
    this.secretKey = secretKey
    this.expiresIn = expiresIn
  }

  public generateToken(payload: string | object | Buffer): string {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: this.expiresIn
    })
  }

  public verifyToken(token: string): jwt.JwtPayload | string {
    try {
      return jwt.verify(token, this.secretKey) as jwt.JwtPayload | string;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}