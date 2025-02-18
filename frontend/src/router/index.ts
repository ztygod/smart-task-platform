import { createRouter, createMemoryHistory } from "vue-router";
import home from "../views/home.vue";
import login from "../views/login.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
        meta: { requiresAuth: true } // 标记需要认证的页面
    },
    {
        path: '/home',
        name: 'login',
        component: login,
    }
];

//创建路由实例
const router = createRouter({
    history: createMemoryHistory(),
    routes
});

//创建路由守卫，检查是否登录
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('authToekn');
    if (!isAuthenticated && to.meta.requiresAuth) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;