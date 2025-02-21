import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
});

//请求拦截器
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

//响应拦截器
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 统一错误处理
        const message = error.response ? error.response.data.message : '网络错误';
        console.error(message);  // 可以在控制台输出错误信息
        return Promise.reject(error);
    }
)

export default instance;