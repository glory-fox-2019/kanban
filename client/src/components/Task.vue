<template>
  <div class="card mb-4" style="width: 16rem;">
    <h5 class="card-header">{{theTask.title}}</h5>
    <div class="card-body">
      <p class="card-text" style="font-size:15px">{{theTask.description}}</p>
      <small class="card-text">Assigned To : {{theTask.assigned}}</small>
      <br>
      <br>
      <div class="card-footer" style="display:flex;justify-content:space-around;">
        <button v-if="theTask.status!=0" @click="previousTask(theTask)" class="btn btn-primary btn-sm">previous</button>
        <button class="btn btn-primary btn-sm" @click=deleteTask(theTask.id)>delete</button>
        <button v-if="theTask.status!=3" @click="nextTask(theTask)" class="btn btn-primary btn-sm">next</button>
      </div>
        
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import db from '../api/firestore'
export default {
  name: 'Task',
  props: {
    theTask: Object
  },
  methods: {
    deleteTask (id) {
      

      Vue.swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result=>{

        if(result.value){
        db.collection('task').doc(id).delete()
        .then(success => {
          console.log(success)
        })
        .catch(err => {
          console.log(err)
        })
        }
      })
    
      // console.log(id)
    },
    nextTask(task){
      let id = task.id
      let status = task.status
      
      if(status<=4){
        status+=1
      }

      db.collection('task').doc(id)
      .update({status})
    },

    previousTask(task){
      let id = task.id
      let status = task.status
      
      if(status>0){
        status-=1
      }

      db.collection('task').doc(id)
      .update({status})

    }
  }
}
</script>

<style>
</style>
