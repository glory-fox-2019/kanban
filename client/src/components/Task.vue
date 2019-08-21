<template>
  <div class="task">
    <div class="header d-flex align-items-center justify-content-between pr-2">
      <h5 class="p-2">{{task.title}}</h5>
      <a href @click.prevent="deleteTask(task.id)">
        <i class="fas fa-times-circle"></i>
      </a>
    </div>
    <div class="info p-2">
      <p>{{task.description}}</p>
      <h6>Assigned to: {{task.assignedTo}}</h6>
      <small class="text-muted">{{date}}</small>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import db from '@/apis/firebase.js'

export default {
  props: ["task"],
  methods: {
    deleteTask(id) {
      Swal.fire({
        title: "Delete this task?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          db.collection("kanban")
            .doc(id)
            .delete()
            .then(function() {
              console.log("Document Successfuly deleted!");
              Swal.fire("Deleted!", "Your task has been deleted.", "success");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  },
  computed: {
    date() {
      let newArr = [];
      let raw = this.task.due_date.toDate();
      let splitted = raw.toString().split(" ");
      for (let i = 0; i < 5; i++) {
        newArr.push(splitted[i]);
      }
      return newArr.join(" ");
    }
  }
};
</script>

<style scoped>
.task {
  margin-bottom: 10px;
  border-radius: 7px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.589);
  position: relative;
  top: 0;
  transition: 0.2s;
}

.task:hover {
  top: -3px;
}
.header {
  width: 100%;
  border-radius: 7px 7px 0 0;
  background-color: rgba(0, 0, 0, 0.63);
  width: 100%;
}

h5 {
  margin: 0;
  color: white;
  font-family: "Oswald";
  border-radius: 7px 7px 0 0;
}

.info {
  background-color: rgb(255, 255, 255);
  border-radius: 0 0 7px 7px;
  font-family: "Oswald";
}
p {
  font-size: 15px;
}

h6 {
  font-size: 13px;
}

i {
  color: rgba(0, 0, 0, 0.5);
}
</style>