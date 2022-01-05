import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refreshtoken',
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const user = await this.usersService.getByName(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (req.body.refreshToken != (await user).refresh_token) {
      throw new UnauthorizedException();
    }
    if (new Date() > new Date((await user).refresh_token_expires)) {
      throw new UnauthorizedException();
    }

    return { userId: payload.sub, username: payload.username };
  }
}
