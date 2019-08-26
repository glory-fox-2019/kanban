<template>
  <b-modal :id="'modal-edit-' + task.id" ref="modal-edit" title="Edit Task" size="sm" header-bg-variant="light" body-bg-variant="light" footer-bg-variant="light">
    <b-form id="form-edit" @submit.prevent="editTask">
      <label>Task</label>
      <b-form-input v-model="edit.title" size="sm" type="text" :placeholder="task.title"></b-form-input>
      <label class="mt-2 mb-0">Assigned To</label>
      <b-form-input v-model="edit.assignedTo" size="sm" type="text" :placeholder="task.assignedTo"></b-form-input>
      <label class="mt-2 mb-0">Due Date</label>
      <b-form-input v-model="edit.dueDate" size="sm" type="date" :placeholder="task.dueDate"></b-form-input>
    </b-form>
      <div slot="modal-footer">
        <b-button size="sm" form="form-edit" type="submit" variant="primary" class="mt-2 mr-2">Edit Task</b-button>
        <b-button size="sm" @click="deleteTask" variant="danger" class="mt-2">Delete Task</b-button>
      </div>
  </b-modal>
</template>

<script>
import db from '../main';
export default {
    props: ['task'],
    data() {
      return {
          edit: {
              title: '',
              dueDate: '',
              assignedTo: ''
          }
      }
    },
    methods: {
      deleteTask () {
        db.collection('tasks')
          .doc(this.task.id)
          .delete()
      },
      editTask () {
        let input = {}
        
        this.edit.title &&  (input.title = this.edit.title)
        this.edit.dueDate && (input.due_date = this.edit.dueDate)
        this.edit.assignedTo && (input.assignedTo = this.edit.assignedTo)

        db.collection('tasks')
          .doc(this.task.id)
          .set(input, { merge: true })
          .then(() => {
            this.$refs['modal-edit'].hide()
          })
      },
    }
}
</script>

<style>

</style>
