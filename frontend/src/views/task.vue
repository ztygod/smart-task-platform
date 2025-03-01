<template>
    <header>
        <h1>今日任务</h1>
    </header>

    <main>
        <drag></drag>
        <div class="ceate-task">
            <create class="create-btn"></create>
        </div>
    </main>
</template>

<script lang="ts" setup>
import drag from '../components/drag.vue';
import create from '../components/create.vue';
</script>

<style scoped>
.create-task{
    position: relative;
}
.create-btn{
}
</style>