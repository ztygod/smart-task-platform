<template>
    <div class="login-container">
        <h1 class="name">tianyi task</h1>
        <div class="login-box">
            <h2 class="login-title">登录</h2>
                <div class="login-input">
                    <label class="login-label-1">用户名</label>
                    <el-input 
                        v-model="pageData.username" 
                        style="width: 240px" 
                        placeholder="请输入用户名"
                     />
                </div>
                <div class="login-input">
                    <label class="login-label-2">密码</label>
                    <el-input
                        v-model="pageData.password"
                        style="width: 240px"
                        type="password"
                        placeholder="请输入密码"
                        show-password
                    />
                </div>
                <el-button  
                    v-if="!pageData.loading"
                    @click="handleLogin"
                    class="login-button" 
                    type="primary" 
                    round
                >
                    {{ pageData.loading ? '登陆中' : '登录'}}
                </el-button>
                <el-button 
                    v-if="pageData.loading"
                    class="login-button" 
                    type="primary" 
                    round 
                    loading
                >
                    <template #loading>
                    <div class="custom-loading">
                        <svg class="circular" viewBox="-10, -10, 50, 50">
                        <path
                            class="path"
                            d="
                            M 30 15
                            L 28 17
                            M 25.61 25.61
                            A 15 15, 0, 0, 1, 15 30
                            A 15 15, 0, 1, 1, 27.99 7.5
                            L 15 15
                        "
                            style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
                        />
                        </svg>
                    </div>
                    </template>
                    Loading
                </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { h } from 'vue';
import { ElNotification } from 'element-plus';
import user from '../apis/user';
import { HTTPMethod, type UserStorage } from '../types/base';
import { useRouter } from 'vue-router';

const router = useRouter();
const pageData = reactive({
    username:'',
    password:'',
    loading:false,

})
const handleLogin = async () => {
    pageData.loading = !pageData.loading;//开始加载状态

    try {
        const response = await user.login('user/login',HTTPMethod.POST,
            {
                name:pageData.username,
                password:pageData.password,
            }
        );
        const token = response.data.user.token;
        const username:string = response.data.user.username;
        const id:string = response.data.user.id;
        const userMessage:UserStorage = {username:username,id:id };

        localStorage.setItem('authToken', token);
        localStorage.setItem('userInfo',JSON.stringify(userMessage));

        ElNotification({
            title: '欢迎回来',
            message: h('i', { style: 'color: teal' }, '登录成功'),
        });
        //路由跳转到首页
        router.push('/');
    } catch (error) {
        //这里要分类讨论，要么是密码或用户名错误，要么网络问题
        ElNotification({
            title: 'Title',
            message: h('i', { style: 'color: teal' }, '用户名或密码错误 or 网络问题'),
        });
    } finally{
        pageData.loading = false;
    }
};
</script>

<style scoped>
@keyframes backgroundFade {
  0% {
    background: linear-gradient(to right, #ff7e5f, #feb47b);
  }
  100% {
    background: linear-gradient(to right, #6a11cb, #2575fc);
  }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  50% {opacity: 0.5;}
  100% { opacity: 1; }
}
h1 {
    font-family: 'Orbitron', sans-serif;
    font-size: 50px;
    text-align: center;
    color: black;
}
.name{
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
    animation-delay: 0.5s; /* 延迟0.5秒后开始动画 */
}
.login-container{
    /* width: 100vw; */
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #6a11cb, #2575fc);
}
.login-box{
    background-color: white;
    border-radius: 10px;
    width: 450px;
    height: 300px;
    box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.3); /* 阴影：向右下方偏移10px，模糊20px，颜色为半透明黑 */
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
    animation-delay: 0.5s; /* 延迟0.5秒后开始动画 */
}
.login-title{
    text-align: center;
}
.login-label-1{
    margin-right: 20px;
}
.login-label-2{
    margin-right: 35px;
}
.login-input{
    margin: 30px 0px 20px 50px;
}
.login-button{
    width: 300px;
    margin-top: 20px;
    margin-left: 60px;
}
.el-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}
.el-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-button-text-color);
  stroke-linecap: round;
}
</style>