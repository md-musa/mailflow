import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
