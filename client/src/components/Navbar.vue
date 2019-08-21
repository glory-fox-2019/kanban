<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand>Kanban</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-button variant="light" v-b-modal.modal-task>Add Task</b-button>
      </b-navbar-nav>
      <b-modal id="modal-task">
        <b-form @submit.prevent="addTask" id="formTask">
          <b-form-group label="Enter title: " label-for="title">
            <b-form-input type="text" v-model="form.title" placeholder="Enter title" id="title" required></b-form-input>
          </b-form-group>
          <b-form-group label="Assign to: " label-for="person">
            <b-form-input type="text" v-model="form.assignTo" placeholder="Enter person" id="person"></b-form-input>
          </b-form-group>
          <b-form-group label="Description: " label-for="description">
            <b-form-textarea v-model="form.description" placeholder="Write description" rows="3" max-rows="6"></b-form-textarea>
          </b-form-group>
          <b-form-group label="Status: " label-for="status">
            <b-form-select
              id="status"
              v-model="form.status"
              :options="state"
              required
            ></b-form-select>
          </b-form-group>
        </b-form>
        <div slot="modal-footer">
          <b-button variant="primary" type="submit" form="formTask">Confirm</b-button>
        </div>
      </b-modal>
  </b-navbar>
</template>

<script>
import db from '../apis/firebase.js'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        assignTo: '',
        status: 'Back-log'
      },
      state: ['Back-log', 'To-do', 'Doing', 'Done'],
    }
  },
  methods: {
    addTask () {
      Swal.fire({
        title: 'please wait..'
      })
      Swal.showLoading()
      db.collection('Kanban').add({
        description: this.form.description,
        title: this.form.title,
        assignTo: this.form.assignTo,
        status: this.form.status
      })
      .then(ref => {
        Swal.close()
        Swal.fire({
          title: 'Successfully Create',
            text: 'Your task has been created',
            type: 'success',
            timer: 1500,
            showConfirmButton: false
          }
        )
        this.$bvModal.hide('modal-task')
        this.form.title = '';
        this.form.assignTo = '';
        this.form.description = '';
        this.form.status = '';
      })
      .catch(console.log)
    }
  }
}
</script>

<style scoped>

</style>