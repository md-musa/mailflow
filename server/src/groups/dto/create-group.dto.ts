import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name!: string;

  @IsString()
  @IsOptional()
  @Length(0, 500)
  description?: string;
}
