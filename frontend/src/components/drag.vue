<template>
  <div class="container">
    <div class="main">
      <button class="btn btn-blue" @click="sort">To original order</button>
      <VueDraggableNext
        class="list-group"
        tag="ul"
        :list="dragData.list"
        v-bind="dragOptions"
      >
        <transition-group type="transition" name="flip-list">
          <li
            class="list-group-item"
            v-for="element in dragData.list"
            :key="element.order"
          >
            <div> ssssss</div>
            {{ element.name }}
          </li>
        </transition-group>
      </VueDraggableNext>
    </div>
    <rawDisplay :value="dragData.list" class="raw" />
  </div>
</template>

<script lang="ts" setup>
import { VueDraggableNext } from 'vue-draggable-next';
import rawDisplay from './raw.vue';
import { computed, reactive } from 'vue';

const message = [
  'vue.js 3.0',
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'based',
  'on',
  'Sortablejs',
]
const dragData = reactive({
  list: message.map((name, index) => {
        return { name, order: index + 1 }
      })
})
const sort = () => {
      dragData.list = dragData.list.sort((a, b) => a.order - b.order)
}
const dragOptions = computed(() => {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
})
</script>

<style>
.container{
  display: flex; /* 设置为 Flexbox 布局 */
  justify-content: center; /* 水平居中对齐 */
}
.main{
  width: 33.33%; /* w-2/6 对应的宽度 */
  border-radius: 0.375rem; /* rounded 对应的圆角 */
  overflow: hidden; /* overflow-hidden 对应的样式，隐藏溢出的内容 */
  padding: 1.25rem; /* p-5 对应的内边距 */
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
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
  padding: 0.25rem; /* p-1 对应的内边距 */
  background-color: #e5e7eb; /* bg-gray-200 对应的背景色 */
  margin: 0.25rem; /* m-1 对应的外边距 */
  border-radius: 0.375rem; /* rounded-md 对应的圆角 */
}
.list-group-item i {
  cursor: pointer;
}
.raw{
   width: 16rem; /* 64 * 0.25rem = 16rem */
}
/* 基础按钮样式 */
.btn {
  font-weight: 700; /* font-bold */
  padding-top: 0.5rem; /* py-2 */
  padding-bottom: 0.5rem; /* py-2 */
  padding-left: 1rem; /* px-4 */
  padding-right: 1rem; /* px-4 */
  border-radius: 0.375rem; /* rounded */
}

/* 蓝色按钮样式 */
.btn-blue {
  background-color: #3b82f6; /* bg-blue-500 */
  color: white; /* text-white */
}

/* 蓝色按钮悬停样式 */
.btn-blue:hover {
  background-color: #1d4ed8; /* bg-blue-700 */
}
</style>