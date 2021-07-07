<template>
  <div class="home d-flex">
    <TaskList v-for="(board, i) in boards" :key="i" :board="board" class="col"></TaskList>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import db from "@/apis/firebase.js";

export default {
  name: "home",
  data() {
    return {
      boards: [
        { name: "backlog", color: "#b64a4a79" },
        { name: "todo", color: "#b6ab4a79" },
        { name: "doing", color: "#4a5eb679" },
        { name: "done", color: "#5ab64a79" }
      ],
    };
  },
  components: {
    TaskList
  },
};
</script>
