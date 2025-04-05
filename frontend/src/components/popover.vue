<template>
  <el-popover :visible="visible" placement="top" :width="100">
    <div style="text-align: center;" class="container">
      <el-button 
        tag="div"
        size="small" 
        type="primary" 
        @click="stopStatusEditing('2')"
        class="btn btn-1"
    >
        已完成
      </el-button>
      <el-button 
        tag="div"
        size="small" 
        type="warning" 
        @click="stopStatusEditing('1')"
        class="btn"        
    >
        进行中
      </el-button>
      <el-button 
        tag="div"
        size="small" 
        type="danger"
        @click="stopStatusEditing('0')"  
        class="btn"  
    >
        待开始
      </el-button>
    </div>
    <template #reference>
      <el-button @click="startStatusEditing" :class="popoverData.style">
        {{ popoverData.state }}
    </el-button>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from 'vue'
import { HTTPMethod, TaskState, type TaskData } from '../types/base'
import task from '../apis/task';
import { useSocket } from '../composables/useSocket';
import { ElMessage } from 'element-plus';
import { AxiosError } from 'axios';
import { useTaskStore } from '../stores/taskStore';

const visible = ref(false)
const {socket} = useSocket();
const popoverData = reactive({
    state: '待开始',
    style: [] as any,
})
const status = ['未完成','代开始','已完成']
let popoverModel = defineModel<TaskData>({
    default:() => ({
      id: '1',
      title: '默认',
      description: '默认',
      status: '0',
      due_date: '2025-3-10',
      created_at: '2025-3-10',
      updated_at: '2025-3-10',
      order:'9999'
    })
});

watch(
  () => popoverModel.value?.status,
  (newValue:any, oldValue) => {
    switch (+newValue) {
      case 0: 
        popoverData.style = [{ start: true }];
        popoverData.state = '待开始';  
        break;
      case 1:
        popoverData.style = [{ doing: true }];
        popoverData.state = '进行中';
        break;
      case 2:
        popoverData.style = [{ done: true }];
        popoverData.state = '已完成';
        break;
      default:
        popoverData.style = []; 
        break;
    }
  },
  { immediate: true }
)

//改变任务状态
const changeStatus = (statusNow:String) => {
  //前端展示字段改变
  switch (statusNow){
    case TaskState.Done:
      popoverModel.value.status = TaskState.Done;
      popoverData.state = '已完成';
      break;
    case TaskState.Wait:
      popoverModel.value.status = TaskState.Wait;
      popoverData.state = '待开始';
      break;
    case TaskState.Doing:
      popoverModel.value.status = TaskState.Doing;
      popoverData.state = '进行中';
      break;
  }
  visible.value = false;
}

//开始编辑任务状态时通知其他人
const startStatusEditing = () => {
  visible.value = true;
  emit('taskStatusEditing',{
    taskId:popoverModel.value.id,
  })
  console.log("开始编辑任务状态时通知其他人")
}

//停止编辑时通知
const stopStatusEditing = async(statusNow:String) => {
  try {
    //前端按钮样式修改
    changeStatus(statusNow);

    // 获取当前版本
    const currentVersion = popoverModel.value.version || 1;

  //向后端传递任务状态新值
  task.updateTaskStatus(
    '/task/update/status',
    HTTPMethod.PATCH,
    {
      id:popoverModel.value.id,
      status:popoverModel.value.status
    }
  ).then(() => {})

    emit('taskStatusEditEnd',{
      taskId:popoverModel.value.id,
      status:statusNow
    });
    console.log("停止编辑时通知");
  } catch (error:any) {
    if (error.status === 409){
      console.log(error)
      const {latestDate} = error.response.data;
      handleConflict(latestDate)
    }
  }
}

// 冲突处理函数
const handleConflict = (latestData: TaskData) => {
  ElMessage({
    message: `任务 ${popoverModel.value.title} 状态被其他人修改为 ${status[+latestData.status]}`,
    type: 'error',
    plain: true,
  })
}
//监听他人编辑事件
onMounted(() => {
  on('taskStatusEditing',({taskId}) => {
    console.log(22222)
    if(taskId === popoverModel.value.id){
      ElMessage(`任务 ${popoverModel.value.title} 正在被修改`)
    }
  });

  socket.on('taskStatusEditEnd',({taskId,status}) => {
    if((taskId === popoverModel.value.id)){
      let taskStatus;
      switch(status){
        case '0':
          taskStatus = '待开始';
          break;
        case '1':
          taskStatus = '进行中';
          break;
        case '2':
          taskStatus = '已完成';
          break;
      }
      ElMessage({
        message:`任务 ${popoverModel.value.title} 状态被成功修改为 "${taskStatus}"`,
        type:'success',
      })
      //根据广播信息修改样式
      changeStatus(status);

      //同时获取最新task数据（更新version）
      await taskStore.fetchTask();
    }
  })
})
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
}
.btn-1{
    margin-left: 12px;
}
.btn{
    width: 100%;
    margin-bottom: 5px;
    margin-left: -1px;
    color: black;
}
.done{
    background-color: rgb(2, 239, 38);
    flex:1;
}
.doing{
    background-color: rgb(253, 199, 3);
    flex:1;
}
.start{
    background-color: rgb(211, 88, 77);
    flex:1;
}
</style>
