import { IsDate, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

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
    scheduledAt?: Date

}
