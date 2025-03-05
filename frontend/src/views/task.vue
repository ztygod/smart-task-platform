<template>
    <header>
        <h1>今日任务</h1>
    </header>

    <main>
        <drag></drag>
        <div class="ceate-task">
            <create class="create-btn"></create>
        </div>
        <div class="chat-input-container">
            <input type="text" class="chat-input" placeholder="利用自然语言添加任务,如：下周一完成代码编写">
            <button class="send-button">发送</button>
        </div>
    </main>
</template>

<script lang="ts" setup>
import drag from '../components/drag.vue';
import create from '../components/create.vue';
</script>

<style scoped>
.create-task{
    position: relative;
}
.create-btn{
}
.chat-input-container {
  position: fixed; /* 固定定位 */
  bottom: 70px;
  left: 600px;
  width: 600px;
  height: 100px;
  background: #fff;
  padding: 12px 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2); /* 顶部阴影 */
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  box-sizing: border-box;
}

.chat-input {
  flex: 1; /* 让输入框填充剩余空间 */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease-in-out;
}

.chat-input:focus {
  border-color: #007bff;
}

.send-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}

.send-button:hover {
  background: #0056b3;
}

</style>