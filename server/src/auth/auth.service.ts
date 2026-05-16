import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from './utilities/hash.util';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService

  ) { }

  async register(registerAuthDto: RegisterAuthDto) {
    const { email, password, name } = registerAuthDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new ConflictException('User with this email already exist');
    }

    const hashedPassword = await hashPassword(password);
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

    const payload = { email: newUser.email, sub: newUser.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return { ...newUser, accessToken };

  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new NotFoundException("User does not exist with this email");
    }

    const isMatched = await comparePassword(password as string, user.password);
    if (!isMatched) throw new UnauthorizedException("Invalid password")

    const payload = { email: user.email, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken, user: { id: user?.id, email: user?.email, name: user?.name } }
  }
}

