export enum TaskStatus {
    Wait = '0',
    Doing = '1',
    Done = '2',
}

export interface TaskDate {
    title: string,
    status: TaskStatus,
    due_date,
}

export interface TaskRo {
    task: TaskDate
}