<template>
  <el-input
    class="input"
    v-model="inputText"
    style="width: 650px"
    :disabled
    placeholder=""
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
      version:'9999',
    })
})
const disabled = ref(true);

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
    taskId: writeModel.value.id,
    user: userInfo.value.username,
    id: userInfo.value.id
  })
}

const onDescriptionBlur = () => {
  socket.emit('onDescriptionBlur',{
    taskId: writeModel.value.id,
    user: userInfo.value.username,
    id: userInfo.value.id
  })
}

onMounted(() => {
  socket.on('onDescriptionFocus',( { taskId, username, id}) => {

  });

  socket.on('onDescriptionBlur',( { taskId, username, id}) => {

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
