import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: '用户名不能为空' })
    username: string;

    @IsNotEmpty({ message: '密码不能为空' })
    @MaxLength(6)
    password: string;
}
