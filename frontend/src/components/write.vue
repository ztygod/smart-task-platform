<template>
  <el-input
    class="input"
    v-model="props.value"
    style="width: 650px"
    :disabled
    placeholder=""
  />
  <el-button @click="changeState" class="btn">
    {{ disabled ? '编辑' : '完成' }}
  </el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  value:{
    type:String,
    default:''
  }
})
const disabled = ref(true);
const changeState = () => {
  disabled.value = !disabled.value;
}
</script>

<style scoped>
.input{

}
.btn{
  flex: 1;
}
</style>
