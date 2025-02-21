import { createRouter, createMemoryHistory } from "vue-router";
import Signboard from "../views/signboard.vue";
import Report from "../views/report.vue";
import Task from "../views/task.vue";
import Home from "../views/home.vue";
import Login from "../views/login.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true },// 标记需要认证的页面
        children: [
            {
                path: 'task',
                name: 'task',
                component: Task,
                meta: { requiresAuth: true },// 标记需要认证的页面
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
    history: createMemoryHistory(),
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