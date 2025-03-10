<template>
  <el-popover :visible="visible" placement="top" :width="100">
    <div style="text-align: center;" class="container">
      <el-button 
        tag="div"
        size="small" 
        type="primary" 
        @click="toDone"
        class="btn btn-1"
    >
        已完成
      </el-button>
      <el-button 
        tag="div"
        size="small" 
        type="warning" 
        @click="toDoing"
        class="btn"        
    >
        进行中
      </el-button>
      <el-button 
        tag="div"
        size="small" 
        type="danger"
        @click="toStart"  
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
import { computed, reactive, ref, watch,defineProps } from 'vue'

const visible = ref(false)
const popoverData = reactive({
    state: '进行中',
    style: [] as any,
})
const props = defineProps({
  status: {
    type: Number,
    required: true
  }
})

const stylesNow = watch(
  () => props.status,
  (newValue, oldValue) => {
    switch (newValue) {
      case 0: 
        popoverData.style = [{ start: true }];  
        break;
      case 1:
        popoverData.style = [{ doing: true }];
        break;
      case 2:
        popoverData.style = [{ done: true }];
        break;
      default:
        popoverData.style = []; 
        break;
    }
  })
const isDone = computed(() => {
    return popoverData.state === '已完成'
})
const isDoing = computed(() => {
    return popoverData.state === '进行中'
})
const isStart = computed(() => {
  return popoverData.state === '待开始'
})
const toDone = () => {
    visible.value = false;
    popoverData.state = '已完成';
}
const toDoing = () => {
    visible.value = false;
    popoverData.state = '进行中';
}
const toStart = () => {
  visible.value = false;
  popoverData.state = '待开始'
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
