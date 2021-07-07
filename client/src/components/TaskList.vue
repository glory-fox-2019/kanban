<template>
  <div class="task-list m-3 d-flex flex-column" :style="{backgroundColor: board.color}">
    <h2
      class="board-title align-self-center my-3"
      :style="{color: board.color}"
    >{{board.name.toUpperCase()}}</h2>
    <div class="tasks">
      <draggable v-model="currentTasks" group="tasks" @start="drag=true" @end="drag=false">
        <Task v-for="task in currentTasks" :key="task.id" :task="task"></Task>
      </draggable>
    </div>
  </div>
</template>

<script>
import Task from "@/components/Task.vue";
import draggable from "vuedraggable";
import db from "@/apis/firebase.js";

export default {
  props: ["board"],
  data() {
    return {
      currentTasks: []
    };
  },
  components: {
    Task,
    draggable
  },
  watch: {
    tasks() {
      //   console.log(this.tasks, "triggeredd <<<<<<<<<<<<<");
      //   db.collection("tasks")
      //     .doc(id)
      //     .update({
      //       status: newStatus
      //     })
      //     .then(function() {
      //       console.log(`Document Successfuly updated!`);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
    }
  },
  created() {
    db.collection("kanban")
      .where("status", "==", this.board.name)
      .onSnapshot(querySnapshot => {
        this.currentTasks = [];
        querySnapshot.forEach(doc => {
          let data = {
            id: doc.id,
            ...doc.data()
          };

          this.currentTasks.push(data);
        });
      });
  },
  watch: {
    currentTasks() {
      for (const task of this.currentTasks) {
        if (task.status != this.board.name) {

          db.collection("kanban")
            .doc(task.id)
            .update({
              status: this.board.name
            })
            .then(function() {
              console.log(`Document Successfuly updated!`);
            })
            .catch(err => {
              console.log(err);
            });
            
        }
      }
    }
  }
};
</script>

<style scoped>
.task-list {
  border-radius: 5px;
  height: 100%;
}
.board-title {
  color: rgb(32, 32, 32);
  font-family: "Oswald";
}
</style>