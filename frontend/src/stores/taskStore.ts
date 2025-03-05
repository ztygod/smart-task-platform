import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import task from "../apis/task";
import { HTTPMethod } from "../types/base";

export const useTaskStore = defineStore('taskStore', () => {
    const tasks = reactive([]);

    //获取所有任务
    function fetchTask() {
        task.getAllTasks('/task/get', HTTPMethod.GET)
            .then((val) => {
                tasks.push(val.data)
            })
            .catch((err) => {

            })
    }
})