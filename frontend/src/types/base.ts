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

export enum TaskState {
    Wait = '0',
    Doing = '1',
    Done = '2',
}