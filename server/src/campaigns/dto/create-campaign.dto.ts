import { ArrayMinSize, IsArray, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCampaignDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  subject!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  body!: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  scheduledAt?: Date;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsOptional()
  additionalEmails?: string

  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @IsString({ each: true })
  groupIds!: string[];
}
