import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsNotEmpty()
    @IsString()
    groupId!: string;
}
