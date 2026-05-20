import { ArrayMinSize, IsArray, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

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
  @IsDate()
  scheduledAt?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  additionalEmails!: string

  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @IsString({ each: true })
  groupIds?: string[];
}
