<template>
  <div>
    <b-navbar type="dark" variant="dark" class="d-flex align-items-center justify-content-between">
      <b-navbar-nav>
        <b-nav-item href="#">Kanbanana</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-button v-b-modal.modal-1 class="btn btn-primary">Add Task</b-button>
      </b-navbar-nav>
    </b-navbar>
    <!-- modal -->
    <b-modal id="modal-1" title="BootstrapVue">
      <div slot="modal-header">
        <h3>Add New Task</h3>
      </div>
      <form @submit.prevent="createNewTask()" id="modal-create">
        <b-form-input placeholder="Task" v-model="formCreate.title"></b-form-input>
        <b-form-input placeholder="Description" v-model="formCreate.description"></b-form-input>
        <b-form-input type="date" placeholder="Due Date" v-model="formCreate.due_date"></b-form-input>
        <b-form-input placeholder="Assigned to" v-model="formCreate.assignedTo"></b-form-input>
      </form>

      <div slot="modal-footer">
        <button type="submit" class="btn btn-primary" form="modal-create">Add</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import db from "@/apis/firebase.js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      formCreate: {
        title: "",
        description: "",
        due_date: "",
        assignedTo: "",
        status: "backlog"
      }
    };
  },
  methods: {
    createNewTask() {
      this.$bvModal.hide("modal-1");

      console.log("masuk yeeee");
      db.collection("kanban")
        .add({
          title: this.formCreate.title,
          description: this.formCreate.description,
          due_date: firebase.firestore.FieldValue.serverTimestamp(),
          assignedTo: this.formCreate.assignedTo,
          status: this.formCreate.status
        })
        .then(function(docRef) {
          this.formCreate.title = "";
          this.formCreate.description = "";
          this.formCreate.due_date = "";
          this.formCreate.assignedTo = "";
          Swal.fire({
            type: "success",
            title: "Success!",
            text: "You have created a new task!"
          });
          console.log(`new document id: ${docRef.id}`);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
</style>