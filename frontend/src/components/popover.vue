<template>
  <el-popover :visible="visible" placement="top" :width="100">
    <div style="text-align: center;" class="container">
      <el-button 
        tag="div"
        size="small" 
        type="primary" 
        @click="changeStatus('2')"
        class="btn btn-1"
    >
        已完成
      </el-button>
      <el-button 
        tag="div"
        size="small" 
        type="warning" 
        @click="changeStatus('1')"
        class="btn"        
    >
        进行中
      </el-button>
      <el-button 
        tag="div"
        size="small" 
        type="danger"
        @click="changeStatus('0')"  
        class="btn"  
    >
        待开始
      </el-button>
    </div>
    <template #reference>
      <el-button @click="visible = true" :class="popoverData.style">
        {{ popoverData.state }}
    </el-button>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import {reactive, ref, watch} from 'vue'
import { HTTPMethod, TaskState, type TaskData } from '../types/base'
import task from '../apis/task';

const visible = ref(false)
const popoverData = reactive({
    state: '待开始',
    style: [] as any,
})
let popoverModel = defineModel<TaskData>({
    default:() => ({
      id: '1',
      title: '默认',
      description: '默认',
      status: '0',
      due_date: '2025-3-10',
      created_at: '2025-3-10',
      updated_at: '2025-3-10',
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

  //向后端传递任务状态新值
  task.updateTaskStatus(
    '/task/update/status',
    HTTPMethod.PATCH,
    {
      id:popoverModel.value.id,
      status:popoverModel.value.status
    }
  ).then(() => {})
}
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
