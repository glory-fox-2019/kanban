<template>
<div>
  <draggable v-model="detailArray" @change="getChange(detailArray)" :emptyInsertThreshold="50" group="status" @start="drag=true" @end="drag=false">
    <div v-for="todo in detailArray" :key="todo.id">
        <b-card
            :title="todo.name"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
        >
            <b-row>
                <b-button v-b-modal="todo.id" class="m-2" lg="2" size="sm" variant="primary" :id="todo.id">Detail</b-button>
                <b-button class="m-2" lg="2" size="sm" variant="danger" :id="todo.id" @click="removeKanban(todo.id)">Remove</b-button>
            </b-row>
            <b-modal :id="todo.id" centered :title="todo.name">
                <h5>Description:</h5>
                <p class="my-4">{{todo.description}}</p>
            </b-modal>
        </b-card>

    </div>
  </draggable>
</div>
</template>

<script>
import draggable from 'vuedraggable';
import db from '../../apis/firebase.js';
import Swal from 'sweetalert2'

export default {
  name: 'KanbanTodo',
  data() {
    return {
      detailArray: this.detail,
    };
  },
  components: {
    draggable,
  },
  props: ['detail', 'type'],
  methods: {
    getChange(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].status !== this.type) {
          db.collection('kanban').doc(arr[i].id)
            .update({ status: this.type })
            .catch(console.log);

          // break;
        }
      }
      this.$emit('updateKanban');
    },
    removeKanban(id) {
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
                return db.collection('kanban').doc(id).delete()
            }
        })
        .then(() => {
            this.detailArray = this.detailArray.filter(el => el.id !== id)
            // Swal.fire(
            //     'Deleted!',
            //     'Your kanban has been removed.',
            //     'success'
            // )
        })
        .catch(console.log)
      
    },
  },
};
</script>

<style>

</style>
