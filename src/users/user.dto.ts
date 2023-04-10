import { IsEmail, IsEnum, IsStrongPassword } from "class-validator";
import { Role } from "../common/enum/role.enum";

export class UserDTO {
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsEnum(Role)
    role: Role;
}