<template>
    <div class="login-container">
        <div class="login-box">
            <h2 class="login-title">登录</h2>
            <form @submit.prevent="handleLogin">
                <div class="login-input">
                    <label>用户名</label>
                    <input 
                        v-model="pageData.username"
                        type="text"
                        id="username"
                        placeholder="请输入用户名"
                        required
                    >
                </div>
                <div class="login-input">
                    <label for="密码">密码</label>
                    <input 
                        v-model="pageData.password"
                        type="password"
                        id="password"
                        placeholder="请输入密码"
                        required
                    >
                </div>
                <el-button type="primary" round>登录</el-button>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const pageData = reactive({
    username:'',
    password:''

})
const handleLogin = () => {

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
  100% { opacity: 1; }
}

.login-container{
    /* width: 100vw; */
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #6a11cb, #2575fc);
}
.login-box{
    background-color: white;
    border-radius: 10px;
    width: 450px;
    height: 300px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3); /* 阴影：向右下方偏移10px，模糊20px，颜色为半透明黑 */
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
    animation-delay: 0.5s; /* 延迟0.5秒后开始动画 */
}
</style>