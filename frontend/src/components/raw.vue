<template>
  <div>
    <h3>{{ props.title }}</h3>
    <pre class="bg-gray-300 rounded-lg p-5">{{ props.value }}</pre>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    title:{
        type: String,
        default:'',
        required: true
    },
    value:{
        required:true
    }
});

</script>
<style scoped>
pre {
  font-size: 10px;
  text-align: start;
  background-color: #d1d5db; 
  border-radius: 0.5rem; 
  padding: 1.25rem; 
}
</style>