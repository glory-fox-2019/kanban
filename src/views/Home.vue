<template>
<div>
    <Navbar />
    <b-container class="bv-example-row">
      <b-row>
        <KanbanBoard
          v-for="(board, index) in boards"
          :key="index"
          :board="board"
        />
      </b-row>
  </b-container>
</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';
import KanbanBoard from '@/components/KanbanBoard.vue';
import db from '../../apis/firebase.js';

export default {
  name: 'home',
  data() {
    return {
      boards: [
        { name: 'Back-Log', color: 'danger', type: 'backlog' },
        { name: 'To-Do', color: 'primary', type: 'todo' },
        { name: 'Doing', color: 'warning', type: 'doing' },
        { name: 'Done', color: 'success', type: 'done' },
      ],
    };
  },
  components: {
    Navbar,
    KanbanBoard,
  },
};
</script>
