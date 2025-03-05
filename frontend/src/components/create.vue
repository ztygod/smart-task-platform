<template>
  <el-button plain class="btn btn-blue create-btn" @click="dialogFormVisible = true">
    创建任务
  </el-button>

  <el-dialog v-model="dialogFormVisible" title="创建任务" width="500">
    <el-form :model="form">
      <el-form-item label="任务名称" :label-width="formLabelWidth">
        <el-input 
            v-model="form.name" 
            autocomplete="off"
            placeholder="请输入任务名称"
        />
      </el-form-item>
      <el-form-item label="任务状态" :label-width="formLabelWidth">
        <el-select v-model="form.state" placeholder="请选择一个任务状态">
          <el-option label="已完成" value="shanghai" />
          <el-option label="进行中" value="beijing" />
          <el-option label="待开始" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="任务描述" :label-width="formLabelWidth">
        <el-input
            v-model="form.desc"
            autosize
            type="textarea"
            autocomplete="off"
            placeholder="请输入任务描述"
        />
      </el-form-item>
      <el-form-item label="截止时间" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.due_date"
          type="date"
          placeholder="选择截止日期"
          :size="size"
      />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const size = ref<'default' | 'large' | 'small'>('default')

const form = reactive({
  name: '',
  state:'',
  desc: '',
  due_date:''
})



</script>

<style lang="css" scoped>
.create-btn{
    position: absolute;
    right: 30px;
    padding: 10px 20px;
}
.btn {
    width: 200px;
    height: 50px;
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