export interface UserData {
    username: string;
    token: string;
    image?: string;
}

export interface UserRO {
    user: UserData;
}