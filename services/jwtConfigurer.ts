import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { promisify } from "util";
import { createPublicKey } from "crypto";

export class JwtConfigurer {
  public verifier: (token: string) => Promise<JwtPayload | string>;

  constructor(publicKey: string) {
    this.verifier = async (token: string) => {
      const pem = publicKey.trim();
      return jwt.verify(token, pem, {
        algorithms: ["RS256"],
      }) as JwtPayload | string;
    };
  }
}
