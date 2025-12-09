import jwt, { JwtPayload } from 'jsonwebtoken';
import { promisify } from 'util';

export class JwtConfigurer {
  public verifier: (token: string) => Promise<JwtPayload | string>;

  constructor(publicKey: string) {
    // Clean up the public key string
    const publicKeyContent = publicKey
      .replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', '')
      .replace(/\n/g, '')
      .replace(/\s+/g, '');
    // Reconstruct PEM format
    const pem = `-----BEGIN PUBLIC KEY-----\n${publicKeyContent.match(/.{1,64}/g)?.join('\n')}\n-----END PUBLIC KEY-----`;
    // Create a verify function using jsonwebtoken
    this.verifier = async (token: string) => {
      return new Promise<JwtPayload | string>((resolve, reject) => {
        jwt.verify(token, pem, { algorithms: ['RS256'] }, (err, decoded) => {
          if (err) return reject(err);
          resolve(decoded as JwtPayload | string);
        });
      });
    };
  }
}
