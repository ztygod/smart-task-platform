<template>
    <div class="col-4">
      <h3>draggable with header</h3>
      <draggable 
        :list="pageData.list" 
        class="list-group" 
        group="a" 
        item-key="name"
        :style="paddingStyleTwo">
        <template #header>
          <div
            class="list-group-title"
            role="group"
            aria-label="Basic example"
          >
            <div class="task-index"></div>
            <div class="task-name">Task</div>
            <div class="task-status">Status</div>
            <div class="task-create-date">Cerate Date</div>
            <div class="task-due-date">Due Date</div>
            <div class="task-desc">Text</div>
          </div>
        </template>
        <template #item="{ element }">
          <div class="list-group-item item">
            <div class="task-index"></div>
            <div class="task-name">{{ element.item.title }}</div>
            <div class="task-status">Status</div>
            <div class="task-create-date">Cerate Date</div>
            <div class="task-due-date">Due Date</div>
            <div class="task-desc">
                <textarea 
                    class="text" 
                    onkeydown="return event.key !== 'Enter';"
                    v-model="element.item.description"
                    @input="handleInput(element.item.id,element.item.description)"
                ></textarea>
            </div>
          </div>
        </template>
      </draggable>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive } from "vue";
import draggable from "vuedraggable";
import { useTaskStore } from "../stores/taskStore";
import type { TaskData } from "../types/base";
import { useSocket } from "../composables/useSocket";
import { debounce } from "../utils.ts";

const taskStore = useTaskStore()
const {socket} = useSocket()
const pageData = reactive({
    list: taskStore.tasks
        .map((item:TaskData) => {
            return { item }
        })
        .sort((a,b) =>  +a.item.order - +b.item.order),
    list2: [
        { name: "Jonny 4", id: 3 },
        { name: "Guisepe 5", id: 4 }
    ],
})
const paddingStyleOne = computed(() => ({
  boxShadow: 'inset 10px 0 0 rgba(255, 0, 0, 0.5)'
}));

const paddingStyleTwo = computed(() => ({
  boxShadow: 'inset 10px 0 0 rgba(51, 255, 0, 0.5)'
}));

const paddingStyleThree = computed(() => ({
  boxShadow: 'inset 10px 0 0 rgba(0, 47, 255, 0.5)'
}));

const handleInput = debounce((taskId:string,taskDesc:string) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')!);

    console.log('userInfo',userInfo);
    console.log('taskId',taskId);
    console.log('taskDesc',taskDesc)
    
    socket.emit('docUpdate',{
        taskId:Number(taskId),
        content:taskDesc,
        userId:userInfo.id + '',
        timestamp:Date.now()
    })
    console.log('end')
},2000);

onMounted(() => {
    socket.on('docUpdate',({taskId,content,updatedAt}) => {
      taskStore.tasks.forEach((item) => {
        if(item.id === taskId){
          item.description = content
        }
      })
      console.log('实施编辑成功')
    })
})

</script>
<style scoped>
.col-4{
  margin-left: 50px;
}
.list-group{
  width: calc(100% - 50px);
  height:auto;
  border-radius: 10px;
  background-color: white;
  border: 1px solid;
  padding-left: 10px;
}
.list-group-title{
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid;
}
.task-index{
  width: 40px;
  height: 40px;
  border-left: 1px solid;
  border-right: 1px solid;
}
.task-name{
  width: 290px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-right: 1px solid;
}
.task-status{
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-right: 1px solid;
}
.task-create-date{
  width: 130px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-right: 1px solid;
}
.task-due-date{
  width: 130px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-right: 1px solid;
}
.task-desc{
  flex: 1;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.list-group-item{
  display: flex;
  flex-direction: row;
  border-bottom: 0.5px solid
}
.item{
  
}
.date{

}
.text{
    width: calc(100% - 5px);
    height: calc((100% - 5px));
    resize: none;
    font-size: 16px;
    line-height: 40px;
    text-align: center;        /* 水平居中 */
    white-space: nowrap;       /* 禁止换行 */
    overflow-x: auto;          /* 横向滚动 */
    overflow-y: hidden;        /* 隐藏竖直滚动条 */
}
textarea::-webkit-scrollbar {
  display: none;
}
</style>