<template>
    <div style="display: inline-block;">
      <b-card no-body id="task-list">
        <b-card-text class="ml-2 my-1">
          <b>{{ board }}</b>
        </b-card-text>
        
        <draggable v-model="cards" group="board">
          <Card v-for="card in cards" :key="card.id" :task="card" :board="board"></Card>
        </draggable>

        <AddCard :board="board"></AddCard>
      </b-card>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import AddCard from './AddCard.vue'
import Card from './Card.vue'
import db from '../main'
export default {
  name: 'CardList',
  data () {
    return {
      cards: []
    }
  },
  components: {
    Card,
    AddCard,
    draggable
  },
  props: ['board'],
  watch: {
    cards: function(val){
      for(let i = 0; i < val.length; i++){
        if(val[i].status !== this.board){
          let status = this.board
          db.collection('tasks')
            .doc(val[i].id)
            .set({ status }, { merge: true })
          }
        }
    }
  },
  created () {
    db.collection('tasks').where('status', '==', this.board)
      .onSnapshot(snapshot => {
        let tasks = []
        snapshot.forEach(doc => {
          tasks.push({ ...doc.data(), id: doc.id })
        })
        this.cards = tasks
      })
  }
}
</script>

<style>
#task-list {
  width: 20rem;
  background-color:#dfe1e6;
  margin: 0.4rem 0.2rem;
}
</style>
