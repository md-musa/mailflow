import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { compareHashedData, hashData } from './utilities/hash.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthResult, AuthTokens, AuthUser } from './interfaces/auth-response.interface';
import envConfig from 'src/config/env.config';
import { TokenType } from './enums/token-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async register(registerAuthDto: RegisterAuthDto): Promise<AuthResult> {
    const { email, password, name } = registerAuthDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new ConflictException('User with this email already exist');
    }

    const hashedPassword = await hashData(password);
    const newUser = await this.prisma.user.create({
      data: {
        password: hashedPassword,
        email,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    const { accessToken, refreshToken } = await this.generateTokens(newUser.id, newUser.email);
    await this.storeRefreshToken(newUser.id, refreshToken);

    return {
      user: newUser,
      accessToken,
      refreshToken,
    };
  }

  async login(loginAuthDto: LoginAuthDto): Promise<AuthResult> {
    const { email, password } = loginAuthDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User does not exist with this email');
    }

    const isMatched = await compareHashedData(password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const { accessToken, refreshToken } = await this.generateTokens(user.id, user.email);

    await this.storeRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: this.toAuthUser(user),
    };
  }

  async generateRefreshToken(user): Promise<AuthResult> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: user.sub },
    });

    if (!existingUser || !existingUser.refreshToken) {
      throw new UnauthorizedException('User not found');
    }

    const isRefreshTokenValid = await compareHashedData(user.refreshToken, existingUser.refreshToken);

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { accessToken, refreshToken } = await this.generateTokens(user.sub, user.email);
    await this.storeRefreshToken(existingUser.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: this.toAuthUser(existingUser),
    };
  }

  async logout(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  private async generateTokens(userId: string, email: string): Promise<AuthTokens> {
    const accessTokenPayload = {
      sub: userId,
      email,
      tokenType: TokenType.ACCESS,
    };

    const refreshTokenPayload = {
      sub: userId,
      email,
      tokenType: TokenType.REFRESH,
    };

    const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
      secret: envConfig().jwt.accessSecret,
      expiresIn: envConfig().jwt.accessExpiresIn as any,
    });

    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      secret: envConfig().jwt.refreshSecret,
      expiresIn: envConfig().jwt.refreshExpiresIn as any,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await hashData(refreshToken);

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  private toAuthUser(user: { id: string; email: string; name: string }): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
