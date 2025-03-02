import type { HTTPMethod, TaskCreate } from "../types/base";
import instance from "./axios";

class Task {
    create(url: string, method: HTTPMethod, data: TaskCreate) {
        return instance({
            url,
            method,
            data
        })
    }
}

const task = new Task();

export default task;