<template>
  <b-card no-body class="mx-2 mb-2">
    <b-card-text v-if="!addingTask" class="mx-2 my-1" @click="addingTask = true">
      <i class="material-icons mr-1 add-button">add_circle_outline</i>Add task...
    </b-card-text>
    <b-form v-if="addingTask"  @submit.prevent="addTask()" style="background-color: #dfe1e6;">
      <label>Task</label>
        <b-form-input v-model="input.title" size="sm" type="text" placeholder="Task"></b-form-input>
      <label class="mt-2 mb-0">Assigned To</label>
        <b-form-input v-model="input.assignedTo" size="sm" type="text"></b-form-input>
      <label class="mt-2 mb-0">Due Date</label>
      <b-form-input v-model="input.dueDate" size="sm" type="date" placeholder="Due Date"></b-form-input>
        <b-button size="sm" type="submit" variant="primary" class="mt-2 mr-2">Add Task</b-button>
        <b-button size="sm" @click="addingTask = false" variant="danger" class="mt-2">Cancel</b-button>
      </b-form>
  </b-card>
</template>

<script>
import db from '../main'
export default {
  data () {
    return {
      addingTask: false,
      input: {
        title: '',
        dueDate: '',
        assignedTo: ''
      }
    }
  },
  props: ['board'],
  methods: {
    addTask () {
      let input = {}

      input.title = this.input.title
      input.assignedTo = this.input.assignedTo
      input.status = this.board

      this.input.dueDate && (input.due_date = this.input.dueDate)

      this.addingTask = false
      db.collection('tasks').add(input)
    }
  }
}
</script>

<style>
.add-card {
    color: #8b8b8b;
    border: 0;
}
.add-button {
    font-size: 16px;
    vertical-align: middle;
}
</style>
