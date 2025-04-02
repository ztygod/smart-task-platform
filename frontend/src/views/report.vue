<template>
  <div class="row">
    <div class="col-4">
      <h3>First draggable with footer</h3>

      <draggable
        id="first"
        data-source="juju"
        :list="pageData.list"
        class="list-group"
        group="a"
        item-key="name"
        :style="paddingStyleOne"
      >
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
            <div class="task-name">{{ element.name }}</div>
            <div class="task-status">Status</div>
            <div class="task-create-date">
              <Date class="date"></Date>
            </div>
            <div class="task-due-date">Due Date</div>
            <div class="task-desc">Text</div>
          </div>
        </template>
      </draggable>
    </div>

    <div class="col-4">
      <h3>Second draggable with header</h3>

      <draggable 
        :list="pageData.list2" 
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
            <div class="task-name">{{ element.name }}</div>
            <div class="task-status">Status</div>
            <div class="task-create-date">Cerate Date</div>
            <div class="task-due-date">Due Date</div>
            <div class="task-desc">Text</div>
          </div>
        </template>
      </draggable>
    </div>

    <div class="col-4">
      <h3>Second draggable with header</h3>

      <draggable 
        :list="pageData.list3" 
        class="list-group" 
        group="a" 
        item-key="name"
        :style="paddingStyleThree">
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
            <div class="task-name">{{ element.name }}</div>
            <div class="task-status">Status</div>
            <div class="task-create-date">Cerate Date</div>
            <div class="task-due-date">Due Date</div>
            <div class="task-desc">Text</div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import draggable from "vuedraggable";
import Date from "../components/date.vue";
let id = 1;
const pageData = reactive({
      list: [
        { name: "John 1", id: 0 },
        { name: "Joao 2", id: 1 },
        { name: "Jean 3", id: 2 }
      ],
      list2: [
        { name: "Jonny 4", id: 3 },
        { name: "Guisepe 5", id: 4 }
      ],
      list3:[
        { name: "Jonny 4", id: 3 },
        { name: "Guisepe 5", id: 4 }
      ]
    })

const paddingStyleOne = computed(() => ({
  boxShadow: 'inset 10px 0 0 rgba(255, 0, 0, 0.5)'
}));

const paddingStyleTwo = computed(() => ({
  boxShadow: 'inset 10px 0 0 rgba(51, 255, 0, 0.5)'
}))

const paddingStyleThree = computed(() => ({
  boxShadow: 'inset 10px 0 0 rgba(0, 47, 255, 0.5)'
}))
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
</style>