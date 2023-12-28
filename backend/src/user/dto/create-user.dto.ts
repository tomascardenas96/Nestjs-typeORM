import { IsString, IsDateString, IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsDateString()
    createdAt: Date;

    @IsBoolean()
    @IsOptional()
    isLoggedIn: boolean;
}
