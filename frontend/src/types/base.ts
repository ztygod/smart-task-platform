export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

export default interface UserLogin {
    name: string,
    password: string,
}

export interface TaskCreate {
    title: string,
    state: string,
    desc: string
}

export interface TaskData {
    id: string,
    title: string,
    description: string,
    status: string,
    due_date: string,
    created_at: string,
    updated_at: string,
}
export enum TaskState {
    Wait = '0',
    Doing = '1',
    Done = '2',
}

export interface UpdateTaskStatus {
    id: string,
    status: string,
}

export interface UpdateTaskDescription {
    id: string,
    description: string,
}