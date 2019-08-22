<template>
  <v-card class="my-3">
    <v-card-title>{{ data.name }}</v-card-title>
    <v-card-text>
      <p class="mb-0">Desc: 
        <span>{{ data.description }}</span>
      </p>
      <p class="mb-0">Assign to: 
        <span>{{ data.assign_to }}</span>
      </p>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between">
      <button class="myBtn" v-for="(action, i) in actions" 
      :key="i" 
      :style="{'background-color': action.color}"
      :target-data="data.id"
      :target-action="action.text"
      @click="masterFunc">
        {{ action.text }}
      </button>
    </v-card-actions>
  </v-card>
</template>

<script>
import db from '@/api/firestore.js';

export default {
  props: ['data', 'actions'],
  methods: {
    masterFunc(val) {
      const id = val.target.getAttribute('target-data');
      const action = val.target.getAttribute('target-action')

      if (action === 'delete') {
        this.$swal.fire({
          title: 'Are you sure?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
          if (result.value) {
            db.collection('kanban').doc(id).delete()
            .then(() => {
              this.$swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
          }
        })
      } else {
        this.$swal.fire({
          title: 'Are you sure?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        })
        .then((result) => {
          if (result.value) {
            db.collection('kanban').doc(id).update({
              status: action
            })
            .then(() => {
              this.$swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
              })
              .fire({
                type: 'success',
                title: 'Your task has been moved!'
              })
            })
          }
        })
      }
    }
  },
};
</script>

<style scoped>
  .myBtn {
    color: white;
    padding: 4px 10px;
    border-radius: 5px;
  }
</style>
