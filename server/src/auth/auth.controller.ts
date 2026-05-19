import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { setTokenInCookies } from './utilities/setTokenInCookies.util';
import type { Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { AuthTokensResponse } from './interfaces/auth-response.interface';
import { REFRESH_TOKEN_COOKIE } from './constants/cookie.constant';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerAuthDto: RegisterAuthDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthTokensResponse> {
    const { accessToken, refreshToken, user } = await this.authService.register(registerAuthDto);

    setTokenInCookies(res, refreshToken);
    return { accessToken, user };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthTokensResponse> {
    const { accessToken, refreshToken, user } = await this.authService.login(loginAuthDto);

    setTokenInCookies(res, refreshToken);
    return { accessToken, user };
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  async generateRefreshToken(
    @Req() req: Request & { user: JwtPayload },
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthTokensResponse> {

    const { accessToken, refreshToken, user } = await this.authService.generateRefreshToken(req.user);

    setTokenInCookies(res, refreshToken);
    return { accessToken, user };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request & { user: JwtPayload },
    @Res({ passthrough: true }) res: Response
  ): Promise<{ message: string }> {

    await this.authService.logout(req.user.sub);
    res.clearCookie(REFRESH_TOKEN_COOKIE);

    return { message: 'Logged out successfully' };
  }
}
