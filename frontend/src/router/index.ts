import { createRouter, createWebHistory } from "vue-router";
import Signboard from "../views/signboard.vue";
import Report from "../views/report.vue";
import Task from "../views/task.vue";
import Home from "../views/home.vue";
import Login from "../views/login.vue";
import { useTaskStore } from "../stores/taskStore";
import Error from "../views/error.vue";

const routes = [
    {
        path: '/',  // 根路径
        redirect: '/home/report',  // 默认重定向到 /home
    },
    {
        path: '/home',
        redirect: '/home/report'
    },
    {
        path: '/error',
        name: 'error',
        component: Error,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true },// 标记需要认证的页面
        children: [
            {
                path: 'task',
                name: 'task',
                component: Task,
                meta: { requiresAuth: true },// 标记需要认证的页面
                beforeEnter: async (to: any, from: any, next: any) => {
                    const taskStore = useTaskStore();
                    try {
                        await taskStore.fetchTask()//预加载数据
                        next()
                    } catch (error) {
                        console.error("用户数据加载失败", error);
                        next("/error"); // 失败时跳转错误页
                    }
                }
            },
            {
                path: 'report',
                name: "report",
                component: Report,
                meta: { requiresAuth: true },// 标记需要认证的页面
            },
            {
                path: 'signboard',
                name: 'signboard',
                component: Signboard,
                meta: { requiresAuth: true },// 标记需要认证的页面
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    }
];

//创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
});

//创建路由守卫，检查是否登录
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('authToken');
    if (!isAuthenticated && to.meta.requiresAuth) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;