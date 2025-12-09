import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { promisify } from 'util';
import { createPublicKey } from 'crypto';

export class JwtConfigurer {
  public verifier: (token: string) => Promise<JwtPayload | string>;

  constructor(publicKey: string) {
    // Clean up the public key string
    const publicKeyContent = publicKey
      .replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', '')
      .replace(/\n/g, '')
      .replace(/\s+/g, '');
    // Decode base64
    const keyBytes = Buffer.from(publicKeyContent, 'base64');
    // Reconstruct PEM format
    const pem = `-----BEGIN PUBLIC KEY-----\n${publicKeyContent.match(/.{1,64}/g)?.join('\n')}\n-----END PUBLIC KEY-----`;
    // Create a verify function using jsonwebtoken
    this.verifier = async (token: string) => {
      const verifyAsync = promisify(jwt.verify);
      return verifyAsync(token, pem, { algorithms: ['RS256'] });
    };
  }
}
