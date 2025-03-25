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
            try {
                // 获取最新任务数据（确保接口返回包含 order 字段）
                const res = await task.getAllTasks('/task/get', HTTPMethod.GET);

                // 清空当前任务列表（避免重复添加）
                this.tasks = [];
                this.ids = [];

                // 按 order 字段排序后处理数据
                res.data
                    .sort((a, b) => a.order - b.order) // 按 order 升序排序
                    .forEach((item: TaskData) => {
                        item.due_date = this.toLocalDate(item.due_date);
                        item.created_at = this.toLocalDate(item.created_at);
                        item.updated_at = this.toLocalDate(item.updated_at);

                        // 添加任务到响应式数组
                        this.tasks.push(item);
                        this.ids.push(+item.id);
                    });

                console.log('任务列表已按 order 排序更新', this.tasks);
            } catch (error) {
                console.error("获取任务数据失败:", error);
                throw error;
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
/* 下面这种方法进行持久化存储不可行
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
    return { tasks, ids, fetchTask, toLocalDate }
}, {
    persist: true
})
*/
