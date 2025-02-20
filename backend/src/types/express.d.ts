import { UserData } from "src/user/user.interface";
declare global {
    namespace Express {
        interface Request {
            user: UserData;  // 在 Request 类型上添加 user 属性，类型为 User
        }
    }
}
