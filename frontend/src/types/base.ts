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

<<<<<<< HEAD
export interface UserStorage {
    username: string,
    id: string,
}

export interface UserInfo {
    username: string,
    id: string
}
=======
export default interface UserInfo {
    username: string,
    id: string
}

>>>>>>> feat/rebuild
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
    order: string,
    version: number
}
export enum TaskState {
    Wait = '0',
    Doing = '1',
    Done = '2',
}

export interface UpdateTaskStatus {
    id: string,
    status: string,
    version: number
}

export interface UpdateTaskDescription {
    id: string,
    description: string,
}