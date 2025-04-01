<template>
  <div class="row">
    <div class="col-4">
      <h3>First draggable with footer</h3>

      <draggable
        id="first"
        data-source="juju"
        :list="list"
        class="list-group"
        group="a"
        item-key="name"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            {{ element.name }}
          </div>
        </template>

        <template #footer>
          <div class="btn-group list-group-item" role="group">
            <button class="btn btn-secondary" @click="add">Add</button>
            <button class="btn btn-secondary" @click="replace">Replace</button>
          </div>
        </template>
      </draggable>
    </div>

    <div class="col-4">
      <h3>Second draggable with header</h3>

      <draggable :list="list2" class="list-group" group="a" item-key="name">
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

    <rawDisplayer class="col-2" :value="list" title="List" />

    <rawDisplayer class="col-2" :value="list2" title="List2" />
  </div>
</template>

<script>
import draggable from "vuedraggable";
let id = 1;
export default {
  name: "two-list-headerslots",
  display: "Two list header slot",
  order: 14,
  components: {
    draggable
  },
  data() {
    return {
      list: [
        { name: "John 1", id: 0 },
        { name: "Joao 2", id: 1 },
        { name: "Jean 3", id: 2 }
      ],
      list2: [
        { name: "Jonny 4", id: 3 },
        { name: "Guisepe 5", id: 4 }
      ]
    };
  },
  methods: {
    add: function() {
      this.list.push({ name: "Juan " + id, id: id++ });
    },
    replace: function() {
      this.list = [{ name: "Edgard", id: id++ }];
    },
    add2: function() {
      this.list2.push({ name: "Juan " + id, id: id++ });
    },
    replace2: function() {
      this.list2 = [{ name: "Edgard", id: id++ }];
    }
  }
};
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
  box-shadow: inset 10px 0 0 rgba(255, 0, 0, 0.5);
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
</style>