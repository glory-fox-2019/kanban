<template>
  <div>
    <b-card
      tag="article"
      style="width: 100%; padding: 0; margin: 0;"
      class="mb-2"
      :header="list.title"
      header-text-variant="light"
      header-bg-variant="dark"
    >
      <b-card-text style="padding: 0;">
        assignTo: {{ list.assignTo }}
      </b-card-text>
      <div style="display: flex; width: 100%; justify-content: space-between;">
        <b-button variant="danger" @click.prevent="deleteTask(list.id)" style="width: 80px; padding: 5px;">Remove</b-button>
        <b-button variant="success" v-b-modal="list.id" style="width: 80px; padding: 5px;">Detail</b-button>
      </div>
      <b-modal :id="list.id">
        <b-form @submit.prevent="updateTask(list.id)" id="formTask">
          <b-form-group label="Enter title: " label-for="title">
            <b-form-input type="text" v-model="form.title" placeholder="Enter title" id="title" required></b-form-input>
          </b-form-group>
          <b-form-group label="Assign to: " label-for="person">
            <b-form-input type="text" v-model="form.assignTo" placeholder="Enter person" id="person"></b-form-input>
          </b-form-group>
          <b-form-group label="Description: " label-for="description">
            <b-form-textarea v-model="form.description" placeholder="Write description" rows="3" max-rows="6"></b-form-textarea>
          </b-form-group>
        </b-form>
        <div slot="modal-footer">
          <b-button variant="primary" type="submit" form="formTask">Update</b-button>
        </div>
      </b-modal>
    </b-card>
</div>
</template>

<script>
import db from '../apis/firebase.js'
import Swal from 'sweetalert2'
export default {
  props: {
    list: Object
  },
  data() {
    return {
      form: {
        title: this.list.title,
        description: this.list.description,
        assignTo: this.list.assignTo
      }
    }
  },
  methods: {
    seeDetail() {
      Swal.fire({
        title: this.list.title,
        text: this.list.description,
        text: this.list.status
      })
    },
    updateTask (id) {
      Swal.fire({
        title: "Update this task ?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      })
      .then(result => {
        if (result.value) {
          Swal.fire({
            title: 'please wait..'
          })
          Swal.showLoading()
          db.collection('Kanban').doc(`${id}`)
          .update({
            title: this.form.title,
            assignTo: this.form.assignTo,
            description: this.form.description,
          })
          .then(() => {
            Swal.close()
              Swal.fire({
                title: 'Successfully Update',
                type: 'success',
                timer: 1500,
                showConfirmButton: false
              }
            )
            this.$bvModal.hide(`${id}`)
          })
        }
      })
    },
    deleteTask (id) {
      Swal.fire({
        title: "Delete this task ?",
        text: "You won't be able to revert this",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then(result => {
        Swal.fire({
          title: "please wait..",
          allowOutsideClick: () => !Swal.isLoading()
        })
        Swal.showLoading()
        db.collection('Kanban').doc(`${id}`).delete()
        .then(() => {
          if (result.value) {
              Swal.close()
              Swal.fire({
                title: 'Successfully Delete',
                text: 'Your task has been deleted',
                type: 'success',
                timer: 1500,
                showConfirmButton: false
              }
            )
          }

        })
        .catch(err => {
            Swal.fire(
              'Error!',
              'Something error with server ..',
              'error'
            )
        })
      })
    }
  }
}
</script>

<style>

</style>