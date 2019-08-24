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
      db.collection('kanban').doc(id).delete().then(() => {
        console.log('Document successfully deleted!');
        this.detailArray = this.detailArray.filter(el => el.id !== id)
      })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },
  },
};
</script>

<style>

</style>
