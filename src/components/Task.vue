<template>
  <div class="task">
    <div class="task--title">{{ task.name }}</div>
    <div class="task--description">{{ task.description }}</div>
    <div class="task--asign-to">Assign To: {{task.assign_to}}</div>
    <div class="task--action">
      <a href="javascript:void(0)" @click="deleteTask(task.id)">Delete</a>
    </div>
  </div>
</template>

<script>
import db from '@/apis/firestore'

export default {
  props: ['task'],
  methods: {
    deleteTask(id){
      db.collection("task").doc(id).delete()
        .then(function() {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  }
}
</script>

<style>

</style>