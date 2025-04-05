<template>
  <div class="container">
    <div class="main">
      <button class="btn btn-blue" >To original order</button>
      <div class="header">
        <div class="text text1">
          Task
        </div>
        <div class="vertical-line"></div>
        <div class="text text2">
          状态
        </div>
        <div class="vertical-line"></div>
        <div class="text text3">
          截止日期
        </div>
        <div class="vertical-line"></div>
        <div class="text text4">
          创建日期
        </div>
        <div class="vertical-line"></div>
        <div class="text text5">
          更新日期
        </div>
        <div class="vertical-line"></div>
        <div class="text text6">
          任务描述
        </div>
      </div>
      <VueDraggableNext
        class="list-group"
        tag="ul"
        :list="dragData.list"
        v-bind="dragOptions"
        @change="onDragChange"
        :animation="200"
      >
        <transition-group type="transition" name="flip-list">
          <li
            class="list-group-item"
            v-for="element in dragData.list"
            :key="element.item.order"
          >
        <div class="text-content text-content-1">
          {{element.item.title}}
        </div>
        <div class="vertical-line-1"></div>
        <div class="text-content text-content-2">
          <popover class="popover" v-model="element.item">
          </popover>
        </div>
        <div class="vertical-line-1"></div>
        <div class="text-content text-content-3">
          {{ element.item.due_date }}
        </div>
        <div class="vertical-line-1"></div>
        <div class="text-content text-content-4">
          {{element.item.created_at}}
        </div>
        <div class="vertical-line-1"></div>
        <div class="text-content text-content-5">
          {{element.item.updated_at}}
        </div>
        <div class="vertical-line-1"></div>
        <div class="text-content text-content-6">
          <write v-model="element.item"></write>
        </div>
          </li>
        </transition-group>
      </VueDraggableNext>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VueDraggableNext } from 'vue-draggable-next';
import popover from './popover.vue';
import write from './write.vue';
import { computed, nextTick, onMounted, reactive } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import type { TaskData } from '../types/base';
import { useSocket } from '../composables/useSocket';

const {on,emit} = useSocket();
const taskStore = useTaskStore();
const dragData = reactive({
  list: taskStore.tasks
    .map((item:TaskData) => {
        return { item }
      })
    .sort((a,b) =>  +a.item.order - +b.item.order)
})

const dragOptions = computed(() => {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
})

//实时同步拖拽给所有用户
const onDragChange = () => {
  const deepCopiedList: { item: TaskData }[] = JSON.parse(JSON.stringify(dragData.list));
  const payload = deepCopiedList.map(({ item }, index) => ({
  id: String(item.id),
  order: String(index + 1),
}));
  console.log(payload)
  if(payload){
    emit('taskDragUpdate',payload);
  }
}

onMounted(() => {
  on('taskDragUpdate',async () => {
    console.log('taskDragUpdate')
    await taskStore.fetchTask()
    window.location.reload()

  })
});

</script>

<style scoped>
.container{
  display: flex; /* 设置为 Flexbox 布局 */

}
.main{
  width:100%; 
  border-radius: 0.375rem; 
  overflow: hidden; 
  padding: 1.25rem; 
}
.header{
  background-color: #3b82f6;
  height: 30px;
  margin: 0.25rem; 
  border-radius: 0.375rem; 
  display: flex;  /* 使用 flexbox 布局 */
  column-gap: 20px;
  border: 1px solid black;
}
.vertical-line {
  width: 2px;          
  height: 100%;        
  background-color: black; 
}
.vertical-line-1{
  width: 2px;          
  height: 100%;
  background-color: white;
}
.text{
  color: white;
  line-height: 30px;
}
.text1{
  margin-left: 50px;
  margin-right: 40px;
}
.text2{
  margin-left: 20px;
  margin-right: 50px;
}
.text6{
  margin-left: 200px;
}
.list-group {
  min-height: 20px;
  list-style-type: none; 
  padding-left: 0; 
}
.list-group-item {
  display: flex;
  height: 30px;
  cursor: move;
  background-color: #e5e7eb;
  margin: 0.25rem; 
  border-radius: 0.375rem; 
}
.list-group-item i {
  cursor: pointer;
}
.text-content{
  color: black;
  line-height: 30px;
}
.text-content-1{
  width: 140px;
}
.text-content-2{
  display: flex;
  width: 145px;
}
.text-content-3{
  width: 105px;
}
.text-content-4{
  width: 105px;
}
.text-content-5{
  width: 105px;
}
.text-content-6{
  flex: 1;
  display: flex;
}
.raw{
   width: 16rem; 
}
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
/* 基础按钮样式 */
.btn {
  font-weight: 700; 
  padding-top: 0.5rem; 
  padding-bottom: 0.5rem; 
  padding-left: 1rem; 
  padding-right: 1rem; 
  border-radius: 0.375rem; 
}

/* 蓝色按钮样式 */
.btn-blue {
  background-color: #3b82f6; 
  color: white; 
}

/* 蓝色按钮悬停样式 */
.btn-blue:hover {
  background-color: #1d4ed8; 
}
</style>