<template>
    <div class="container">
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

        <main>
            <nav>
                <ul>
                    <li>
                        <router-link to="/home/signboard" active-class="active" class="router">
                            <div class="line1">
                                <el-icon size="30" color="black" class="svg"><Notification /></el-icon>
                            </div>
                            <div class="line2">
                                <span v-if="!homeDate.isCollapsed" class="link-text">看板</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/home/task" active-class="active" class="router">
                            <div class="line1">
                                <el-icon size="30" color="black" class="svg"><House /></el-icon>
                            </div>
                            <div class="line2">
                                <span v-if="!homeDate.isCollapsed" class="link-text">任务</span>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/home/report" active-class="active" class="router">
                            <div class="line1">
                                <el-icon size="30" color="black" class="svg"><DocumentRemove /></el-icon>
                            </div>
                            <div class="line2">
                                <span v-if="!homeDate.isCollapsed" class="link-text">每日汇报</span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </main>
    </div>    
    <div class="content">
        <router-view></router-view>
    </div>
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
.container{
    display: flex;
    background-color: #b6c4da;
    overflow-y: hidden;
}
.sidebar{
    width: 250px;
    height: calc(100vh - 15px);
    border-radius: 7px;
    margin: 10px 10px 5px 5px;
    background-color: white;
    color: black;
    transition: width 0.3s ease;
    display: flex;
    flex-direction: column;
}
.sidebar.collapsed {
  width: 80px;
}
.sidebar-header{
    height: 80px;
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
nav {
  flex-grow: 1;
  overflow-y: auto;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 15px;
  transition: background-color 0.2s ease;
}

li:hover {
  background-color: #bfdcf1;
}
.router-link-active, .router-link-exact-active {
  text-decoration: none;
}
.active {
  background-color: #38a6f9;
}
.router{
    text-decoration: none;
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
}
.link-text{
    font-size: 20px;
    color: black;
    display: inline-block;
    margin-bottom: 10px;
}
.svg{
    margin-top: 1px;
    margin-left: 10px;
    margin-right: 10px;
}
.line1{
    margin-top: 4px;
}
.content{
    flex: 1;
    margin-top: 10px;
    margin-bottom: 5px;
    margin-right: 10px;
    background-color: white;
    border-radius: 7px;
}
</style>