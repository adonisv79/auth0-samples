import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { APIConfiguration, AuthConfiguration } from 'config/configuration';
import * as jwksRsa from 'jwks-rsa'; // Import JWKS

interface JwtPayload {
  sub: string; // Auth0 user identifier
  name: string; // You can change this based on the claims from Auth0
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: `${configService.get<AuthConfiguration>('auth').domainUri}/.well-known/jwks.json`,
      }),
      audience: configService.get<APIConfiguration>('api').url,
      issuer: configService.get<AuthConfiguration>('auth').domainUri + '/', // Do not forget the trailing slash as Auth0 provides it this way
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.name }; // Attach user info to the request
  }
}
