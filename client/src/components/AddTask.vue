<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">New Task</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add New Kanban Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Title" v-model="title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Description" v-model="description" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Assign To" v-model="assign"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addData()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import db from '../api/firebase'
import firebase from 'firebase'
import Swal from 'sweetalert2'
export default {
  data: () => ({
    dialog: false,
    title: '',
    description: '',
    assign: ''
  }),
  methods: {
    addData () {
      db.collection('tasks')
        .add({
          title: this.title,
          description: this.description,
          assign: this.assign,
          status: 'Back-Log',
          createdAt: Date(firebase.database.ServerValue.TIMESTAMP)
        })
        .then(ref => {
          this.dialog = false
          this.title = ''
          this.description = ''
          this.assign = ''
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your work has been saved to Back-Log',
            showConfirmButton: false,
            timer: 1000
          })
        })
        .catch(() => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        })
    }
  }
}
</script>
