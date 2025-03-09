import { defineStore } from "pinia";
import { reactive } from "vue";
import task from "../apis/task";
import { HTTPMethod, type TaskData } from "../types/base";

export const useTaskStore = defineStore('taskStore', () => {
    const tasks = reactive<TaskData[]>([]);  // 任务数据
    const ids = reactive<number[]>([]);      // 用于去重的任务 ID

    // 获取所有任务
    function fetchTask() {
        task.getAllTasks('/task/get', HTTPMethod.GET)
            .then((res) => {
                res.data.forEach((item: TaskData) => {
                    if (!ids.includes(+item.id)) {
                        item.due_date = toLocalDate(item.due_date);
                        item.created_at = toLocalDate(item.created_at);
                        item.updated_at = toLocalDate(item.updated_at);

                        tasks.push(item);  // 添加任务到响应式数组
                        ids.push(+item.id); // 添加任务 ID 到去重数组
                    }
                })
                console.log(tasks)
            })
            .catch((err) => {
                console.error('error', err);
            })
    }

    // 日期类型转换, 2025-03-10T12:00:00.000Z => 2025-03-10
    function toLocalDate(ISODate: string) {
        let date = new Date(ISODate);
        return date.toLocaleDateString('en-CA')
    }

    // 启用持久化
    return { tasks, ids, fetchTask }
}, {
    persist: true,
}
);