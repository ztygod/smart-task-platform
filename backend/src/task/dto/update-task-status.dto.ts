import { IsInt, IsString } from "class-validator";
import { TaskStatus } from "../task.interface"

export class UpdateTaskStatusDto {
    @IsInt()
    id: number;

    @IsString()
    status: TaskStatus;

    @IsInt()
    version: number;  // 新增版本号字段
}
