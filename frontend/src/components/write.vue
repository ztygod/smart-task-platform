<template>
  <el-input
    class="input"
    v-model="writeModel.description"
    style="width: 650px"
    :disabled
    placeholder=""
    @input="handleTextChange"
  />
  <el-button @click="updateDescription" class="btn">
    {{ disabled ? '编辑' : '完成' }}
  </el-button>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { HTTPMethod, type TaskData, type UserStorage } from '../types/base';
import task from '../apis/task';
import { useSocket } from '../composables/useSocket';
import { ElMessage } from 'element-plus'
import { debounce } from '../utils';

const {socket} = useSocket()
const writeModel = defineModel<TaskData>({
  default:() => ({
      id: '1',
      title: '默认',
      description: '默认',
      status: '0',
      due_date: '2025-3-10',
      created_at: '2025-3-10',
      updated_at: '2025-3-10',
      order:'9999',
<<<<<<< HEAD
      version:'9999',
=======
      version:9999
>>>>>>> feat/rebuild
    })
})
const disabled = ref(true);
const documentContent = ref(writeModel.value.description); // 手动存储文档内容

const userInfo = computed<UserStorage>(() => {
  let userMessage = localStorage.getItem('userInfo');
  if(userMessage){
    let parseUserMessage = JSON.parse(userMessage);
    return {
      username:parseUserMessage.username,
      id:parseUserMessage.id,
    }
  }
  return { username: '', id: 0 };
})

const inputText = computed(() => {
  return `${writeModel.value.description}`
})

const updateDescription = () => {
  disabled.value = !disabled.value;

  if (disabled.value){
    //disable为true时，则说明开始编辑，向后端网关发送消息
    onDescriptionFocus()
  }else {
    //disable为false时，则说明结束编辑，向后端网关发送消息
    onDescriptionBlur()
  }

  //向后端发起更新任务描述的请求
  if(disabled.value !== false){
    task.updateTaskDescription(
      '/task/update/description',
      HTTPMethod.PATCH,
      {
        id: writeModel.value.id,
        description: writeModel.value.description,
      }
    ).then(() => {})
  }
}

// 前端开始编辑时发送事件
const onDescriptionFocus = () => {
  socket.emit('onDescriptionFocus ',{
    taskTitle: writeModel.value.title,
    taskId: writeModel.value.id,
    user: userInfo.value.username,
    id: userInfo.value.id
  })
}

const onDescriptionBlur = () => {
  socket.emit('onDescriptionBlur',{
    taskTitle: writeModel.value.title,
    taskId: writeModel.value.id,
    user: userInfo.value.username,
    id: userInfo.value.id
  })
}

//计算本地变更
const handleTextChange = () => {

}

//防抖发送 OT 变更（减少 WebSocket 负载）
const emitOperation = debounce((delta) => {
  socket.emit('otOperation',{
    taskId:writeModel.value.id,
    operation: delta.toJSon()
  })
},500)

onMounted(() => {
  socket.on('onDescriptionFocus',( {taskTitle, taskId, username, id}) => {
    ElMessage({
        message:`ID:${taskId} 任务 ${taskTitle}的内容正在被用户${username}修改"`,
        type:'success',
      })
  });

  socket.on('onDescriptionBlur',( {taskTitle, taskId, username, id}) => {
    ElMessage({
        message:`用户${username}已完成 修改ID:${taskId} 任务 ${taskTitle}的描述"`, 
      })
  });

  socket.on('otOperation',(operation) => {
   
  })
})
</script>

<style scoped>
.input{

}
.btn{
  flex: 1;
}
</style>
