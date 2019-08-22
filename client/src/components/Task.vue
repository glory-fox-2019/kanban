<template>
  <div class="mt-2 border">
    <div class="card border">
      <div class="d-flex justify-content-between card-header card-title">
        <div class="title">{{value.title}} </div>
        <div @click.prevent="deleteTask(value.id)" class="delete">	&#9587; </div>
      </div>
      <div class="card-body text-primary">
        <h5 class="font card-title">Assigned to: {{value.assigned}}</h5>
        <p class="font card-text">{{value.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../apis/firebase'

export default {
  name: 'BoardStatus',
  props: {
    value: Object
  },
  methods: {
    deleteTask(id){
      console.log('masuk delete task', id)
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          db.collection('Task').doc(`${id}`).delete();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      
    }
  }

}
</script>

<style scoped>
  /* 
  font-family: 'Anton', sans-serif;
  font-family: 'Roboto Condensed', sans-serif;
  font-family: 'Oswald', sans-serif;
  font-family: 'Monoton', cursive; 
  */
  .title{
    font-family: 'Oswald', sans-serif;
    text-align: center
  }
  .font{
    font-family: 'Roboto Condensed', sans-serif;
  }
  .border{
    border-radius: 25px;
  }
  .delete{
    color: red;
    font-weight: bold;
    transition: 0.2s;
  }
  .delete:hover{
    font-size: 120%;
    cursor: pointer;

  }
</style>