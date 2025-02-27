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
        Done
      </el-button>
      <el-button 
        tag="div"
        size="small" 
        type="warning" 
        @click="toDoing"
        class="btn"        
    >
        Working
      </el-button>
      <el-button 
        tag="div"
        size="small" 
        type="danger"
        @click="visible = false"  
        class="btn"  
    >
        cancel
      </el-button>
    </div>
    <template #reference>
      <el-button @click="visible = true" :class="[{done: isDone},{doing:isDoing}]">
        {{ popoverData.state === 'doing' ? 'Doing' : 'Done' }}
    </el-button>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'

const visible = ref(false)
const popoverData = reactive({
    state: 'doing',
})

const isDone = computed(() => {
    return popoverData.state === 'done'
})
const isDoing = computed(() => {
    return popoverData.state === 'doing'
})
const toDone = () => {
    visible.value = false;
    popoverData.state = 'done';
}
const toDoing = () => {
    visible.value = false;
    popoverData.state = 'doing';
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
</style>
