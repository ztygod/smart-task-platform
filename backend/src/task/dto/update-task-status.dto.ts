import { TaskStatus } from "../task.interface"

export class UpdateTaskStatusDto {
    id: string
    status: TaskStatus
}
