import { IsNotEmpty } from "class-validator";
import { TaskStatus } from "../task.interface";

export class CreateTaskDto {
    @IsNotEmpty({ message: '名称不能为空' })
    title: string

    @IsNotEmpty({ message: '描述不能为空' })
    description: string

    @IsNotEmpty({ message: '状态不能为空' })
    status: TaskStatus

    @IsNotEmpty({ message: '预期完成时间不能为空' })
    due_date: Date
}
