import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        jwksUri: `https://dev-11plaq96.us.auth0.com/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'tyo4Jc50UH3GEQI4cne5XugBiL8SjWqd',
      // @WARNING: won't work if trailing slash is missing
      issuer: 'https://dev-11plaq96.us.auth0.com/',
      algorithms: ['RS256'],
    });
  }

  validate(payload: unknown): unknown {
    console.log({ payload });
    return payload;
  }
}
