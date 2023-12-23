import { IsNotEmpty, IsString } from "class-validator";

export class TuitDTO {
    @IsString()
    @IsNotEmpty()
    message: string;
}
