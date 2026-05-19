import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Request } from 'express';
import envConfig from 'src/config/env.config';
import { REFRESH_TOKEN_COOKIE } from '../constants/cookie.constant';
import { TokenType } from '../enums/token-type.enum';

@Injectable()
export class RefreshAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const refreshToken = request.cookies?.[REFRESH_TOKEN_COOKIE];

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: envConfig().jwt.refreshSecret,
      });

      if (payload.tokenType !== TokenType.REFRESH) {
        throw new UnauthorizedException();
      }

      request.user = {
        ...payload,
        refreshToken,
      };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
