<template>
<div class="card ">
  <div class="card-header">
    {{card.title}}
  </div>
    <!-- {{card.status}} -->
  <div class="card-body">
    <p class="card-text">{{card.description}}</p>
    <p>Point: {{card.point}}</p>
    <p>Assign to: {{card.assign}}</p>
    <a href="#" @click.prevent="deleteKanban" class="btn btn-primary">delete</a>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'
import db from '@/apis/firebase.js'

export default {
  props: ['card'],
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    deleteKanban(){
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
          return db.collection('kanban')
            .doc(this.card.id)
            .delete()
        }
      }).then(() => {
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
      })
    }
  }
}
</script>

<style>

</style>
