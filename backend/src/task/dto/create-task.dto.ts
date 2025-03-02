import { IsEmpty } from "class-validator";
import { TaskStatus } from "../task.interface";

export class CreateTaskDto {
    @IsEmpty({ message: '名称不能为空' })
    title: string

    @IsEmpty({ message: '描述不能为空' })
    description: string

    @IsEmpty({ message: '状态不能为空' })
    status: TaskStatus

    @IsEmpty({ message: '预期完成时间不能为空' })
    due_date: Date
}
