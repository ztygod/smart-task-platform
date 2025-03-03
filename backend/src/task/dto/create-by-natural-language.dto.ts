import { IsNotEmpty, IsString } from "class-validator";

export class createByNaturalLanguageDto {
    @IsNotEmpty({ message: '自然语言解析模块不能为空' })
    @IsString()
    text: string
}