<template>
    <div :class="['sidebar',{collapsed:homeDate.isCollapsed}]">
        <header class="sidebar-header">
            <h3 
                v-if="!homeDate.isCollapsed"
            >
                tianyi task
            </h3>
            <button 
                 v-if="homeDate.isCollapsed" 
                class="sidebar-button-1"
                @click="collapsedSidebar"
            >
                <span class="button-icon-1">▶</span>
            </button>
            <button
                v-if="!homeDate.isCollapsed"
                class="sidebar-button-2"
                @click="collapsedSidebar"
            >
                <span>◁</span>
            </button>
        </header>
    </div>    
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const homeDate = reactive({
    isCollapsed:false,

})

const collapsedSidebar = () => {
    homeDate.isCollapsed = !homeDate.isCollapsed;
}
</script>

<style scoped>
.sidebar{
    width: 250px;
    height: 100vh;
    background-color: #2c3e50;
    color: white;
    transition: width 0.3s ease;
    display: flex;
    flex-direction: column;
}
.sidebar.collapsed {
  width: 80px;
}
.sidebar-header{
    height: 100px;
    display: flex;
    flex-direction: row;
    gap: 80px;
    padding-left: 15px;
}
.sidebar-button-1{
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-top: 10px;
}
.sidebar-button-2{
    width: 50px;
    height: 50px;
    margin: 10px 0 0 0;
    border-radius: 25px;
}
</style>