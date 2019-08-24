<template>
<b-col>
    <b-card
        id="card"
        border-variant="primary"
        :header="board.name"
        :header-bg-variant="board.color"
        header-text-variant="white"
        align="center"
      >
        <KanbanTodo
            :detail="todos"
            :type="board.type"
            @updateKanban="getTodos"
        />
    </b-card>
</b-col>
</template>

<script>
import KanbanTodo from '@/components/KanbanTodo.vue';
import db from '../../apis/firebase.js';

export default {
  name: 'KanbanBoard',
  data() {
    return {
      todos: [],
    };
  },
  components: {
    KanbanTodo,
  },
  methods: {
    getTodos() {
      db.collection('kanban').onSnapshot((querySnapshot) => {
        this.todos.length = [];
        querySnapshot.forEach((doc) => {
          if (this.board.type === doc.data().status) {
            this.todos.push({ id: doc.id, ...doc.data() });
          }
        });
      });
    },
  },
  props: ['board'],
  mounted() {
    this.getTodos();
  },
};
</script>

<style scoped>
    #card {
        width: 10rem important;
    }
</style>
