<template>
 <v-card
 class="text-xs-center ma-3"
 >
   <v-card-title>{{bodyCard.title}}</v-card-title>
   <v-card-text>{{bodyCard.description}}</v-card-text>
   <v-card-text>Assigned to : {{bodyCard.assign}}</v-card-text>
   <v-card-actions v-if="bodyCard.status === 'Back-Log'">
     <v-btn text @click="deleteTask(bodyCard.id)">Delete</v-btn>
     <v-btn text @click="updateTodo(bodyCard.id)">To-Do</v-btn>
   </v-card-actions>

   <v-card-actions v-if="bodyCard.status === 'To-Do'">
     <v-btn text @click="updateBackLog(bodyCard.id)">Back-Log</v-btn>
     <v-btn text @click="deleteTask(bodyCard.id)">Delete</v-btn>
     <v-btn text @click="updateDoing(bodyCard.id)">Doing</v-btn>
   </v-card-actions>

   <v-card-actions v-if="bodyCard.status === 'Doing'">
     <v-btn text @click="updateTodo(bodyCard.id)">To-Do</v-btn>
     <v-btn text @click="deleteTask(bodyCard.id)">Delete</v-btn>
     <v-btn text @click="updateDone(bodyCard.id)">Done</v-btn>
   </v-card-actions>

   <v-card-actions v-if="bodyCard.status === 'Done'">
     <v-btn text @click="updateDoing(bodyCard.id)">Doing</v-btn>
     <v-btn text @click="deleteTask(bodyCard.id)">Delete</v-btn>
   </v-card-actions>
   
 </v-card>
</template>

<script>
import db from '../api/firebase'
import Swal from 'sweetalert2'
export default {
 props: ['bodyCard'],
 methods: {
     updateBackLog(id) {
         db.collection("tasks")
         .doc(id)
         .update({
             status: 'Back-Log'
         })
         .then(() => {
             console.log('success')
         })
         .catch(console.log)
     },

     updateTodo(id) {
         db.collection("tasks")
         .doc(id)
         .update({
             status: 'To-Do'
         })
         .then(() => {
             console.log('success')
         })
         .catch(console.log)
     },

     updateDoing(id) {
         db.collection("tasks")
         .doc(id)
         .update({
             status: 'Doing'
         })
         .then(() => {
             console.log('success')
         })
         .catch(console.log)
     },

     updateDone(id) {
         db.collection("tasks")
         .doc(id)
         .update({
             status: 'Done'
         })
         .then(() => {
             console.log('success')
         })
         .catch(console.log)
     },

     deleteTask(id) {
         Swal.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
         })
         .then((result) => {
          if (result.value) {
            db.collection("tasks")
            .doc(id)
            .delete()
            .then(() => {
             Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
                )} 
            )}
         })
         .catch(console.log())
     }
 }
}
</script>