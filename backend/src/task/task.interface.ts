export enum TaskStatus {
    Wait = '0',
    Doing = '1',
    Done = '2',
}

export interface TaskData {
    title: string,
    status: TaskStatus,
    due_date: Date
}

export interface TaskRo {
    task: TaskData
}

export interface TaskParseData {
    dueDate: string;       // 任务截止时间
    title: string;         // 任务标题
    description: string;   // 任务描述
    status: string;        // 任务状态（如 "todo", "inProgress", "done"）
}

export interface TaskParseRo {
    success: boolean,
    data: TaskParseData
}