import { ArrayMinSize, IsArray, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

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
  scheduledAt?: Date;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  groupIds!: string[];
}
