<template>
  <el-input
    class="input"
    v-model="writeModel.description"
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
import { HTTPMethod, type TaskData } from '../types/base';
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

const userInfo = computed(() => {
  localStorage.getItem('userInfo')
})
const updateDescription = () => {
  disabled.value = !disabled.value;

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
    user: userInfo
  })
}

const onDescriptionBlur = () => {
  socket.emit('onDescriptionBlur',{
    taskId: writeModel.value.id,
    user: userInfo
  })
}

onMounted(() => {
  socket.on('onDescriptionFocus',() => {

  });

  socket.on('onDescriptionBlur',() => {

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
