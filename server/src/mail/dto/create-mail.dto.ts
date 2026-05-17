import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateMailDto {
    @IsString()
    @IsNotEmpty()
    campaignId!: string;

    @IsEmail()
    @IsNotEmpty()
    recipientEmail!: string;
}
