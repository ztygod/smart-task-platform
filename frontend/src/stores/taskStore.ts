import { defineStore } from "pinia";
import task from "../apis/task";
import { HTTPMethod, type TaskData } from "../types/base";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [] as TaskData[],   // 存储任务数据
        ids: [] as number[],       // 存储任务 ID，避免重复
    }),
    actions: {
        // 加载任务数据
        async fetchTask() {
            //下面注释代码逻辑错误，导致前端后端任务状态变化无法同步
            // 尝试从 localStorage 加载已存储的任务
            // const storedTasks = localStorage.getItem('tasks');
            // if (storedTasks) {
            //     // 如果有存储的任务，直接恢复到 state
            //     this.tasks = JSON.parse(storedTasks);
            //     // 恢复任务 IDs
            //     this.ids = this.tasks.map(task => task.id);
            // }

            try {
                // 获取最新任务数据
                const res = await task.getAllTasks('/task/get', HTTPMethod.GET);
                res.data.forEach((item: TaskData) => {
                    // 如果任务 ID 不在已有的 IDs 中，进行处理
                    if (!this.ids.includes(+item.id)) {
                        item.due_date = this.toLocalDate(item.due_date);
                        item.created_at = this.toLocalDate(item.created_at);
                        item.updated_at = this.toLocalDate(item.updated_at);

                        // 添加任务到响应式数组
                        this.tasks.push(item);
                        // 添加任务 ID 到去重数组
                        this.ids.push(+item.id);
                    }
                });

                // 将更新后的任务数据存入 localStorage，以便持久化
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            } catch (error) {
                console.error("获取任务数据失败:", error);
                throw error; // 抛出错误，方便外部捕获
            }
        },

        // 日期转换函数，ISO 格式转本地日期
        toLocalDate(ISODate: string) {
            let date = new Date(ISODate);
            return date.toLocaleDateString('en-CA');
        },
    },
    persist: {
        enabled: true,  // 开启持久化存储
        strategies: [
            { storage: localStorage, paths: ['tasks'] },  // 仅持久化 tasks 数据
        ],
    },
});
// export const useTaskStore = defineStore('taskStore', () => {
//     const tasks = reactive<TaskData[]>([]);  // 任务数据
//     const ids = reactive<number[]>([]);      // 用于去重的任务 ID

//     // 获取所有任务
//     function fetchTask() {
//         task.getAllTasks('/task/get', HTTPMethod.GET)
//             .then((res) => {
//                 res.data.forEach((item: TaskData) => {
//                     if (!ids.includes(+item.id)) {
//                         item.due_date = toLocalDate(item.due_date);
//                         item.created_at = toLocalDate(item.created_at);
//                         item.updated_at = toLocalDate(item.updated_at);

//                         tasks.push(item);  // 添加任务到响应式数组
//                         ids.push(+item.id); // 添加任务 ID 到去重数组
//                     }
//                 })
//             })
//             .catch((err) => {
//                 console.error('error', err);
//             })
//     }

//     // 日期类型转换, 2025-03-10T12:00:00.000Z => 2025-03-10
//     function toLocalDate(ISODate: string) {
//         let date = new Date(ISODate);
//         return date.toLocaleDateString('en-CA')
//     }

//     // 启用持久化
//     return { tasks, ids, fetchTask, toLocalDate }
// }, {
//     persist: true
// })
