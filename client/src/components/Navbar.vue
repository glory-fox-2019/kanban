<template>
<nav class="navbar navbar-light bg-light justify-content-between">
  <a class="navbar-brand ml-3">Kanban ku</a>
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Add Task
  </button>
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createKanban">
            <div class="form-group">
              <label>Title :</label>
              <input type="text" class="form-control" v-model="create.title" placeholder="title...">
            </div>
            <div class="form-group">
              <label>Description :</label>
              <textarea class="form-control" v-model="create.description" placeholder="type your description..."></textarea>
            </div>
            <div class="form-group">
              <label>Point :</label>
              <input type="number" class="form-control" v-model="create.point" placeholder="0">
            </div>
            <div class="form-group">
              <label>Assigment :</label>
              <input type="text" class="form-control" v-model="create.assign">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" data-dismiss="modal">Cancle</button>
              <button  type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>

import db from '@/apis/firebase.js'
import firebase from 'firebase/app'

export default {
  name: 'navbar',
  data () {
    return {
      create: {
        title: '',
        description: '',
        point: 0,
        assign: '',
        status: 'Backlog'
      }
    }
  },
  methods: {
    createKanban () {

      $('#exampleModal').modal('hide');
      db.collection('kanban').add({
        title: this.create.title,
        description: this.create.description,
        point: this.create.point,
        assign: this.create.assign,
        status: this.create.status
      })
        .then(function (docRef) {
          this.create.title = ''
          this.create.description = ''
          this.create.point = 0
          this.create.assign = ''
          // console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          // console.error('Error adding document: ', error)
        })
    }
  }
}
</script>

<style scoped>
  .navbar-brand {
    font-family: 'Lexend Deca', sans-serif;
    font-size: 30px;
  }
  .navbar {
    box-shadow: 0 0 10px gray;
  }
  .form-group {
    text-align: left!important;
  }
</style>
