import type UserLogin from "../types/base";
import type { HTTPMethod } from "../types/base";
import instance from "./axios";

class User {
    //登录
    login(url: string, method: HTTPMethod, data: UserLogin) {
        return instance({
            url: url,
            method: method,
            data
        })
    }
    //注册
}

const user = new User();

export default user;