import type { HTTPMethod, TaskCreate } from "../types/base";
import instance from "./axios";

class Task {
    //表格创建任务
    create(url: string, method: HTTPMethod, data: TaskCreate) {
        return instance({
            url,
            method,
            data
        })
    }
    //自然语言创建任务
    parse(url: string, method: HTTPMethod, data: string) {
        return instance({
            url,
            method,
            data
        })
    }
    //获取所有任务
    getAllTasks(url: string, method: HTTPMethod) {
        return instance({
            url,
            method
        })
    }
}

const task = new Task();

export default task;