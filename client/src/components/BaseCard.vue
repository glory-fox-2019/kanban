<template>
<div class="base-card m-4 container" :style="'background-color:'+board.color">
    <h2 class="card-title aligh-self-center" >{{board.name}}</h2>
    <div class="card">
      <draggable v-model="currentBasecard" group="card" @start="drag=true" @end="drag=false">
        <Card v-for="card in currentBasecard" :key="card.id" :card="card" />
      </draggable>
    </div>
</div>
</template>

<script>

import Card from '@/components/Card.vue'
import draggable from 'vuedraggable'
import db from '@/apis/firebase.js'

export default {
  props: ['board'],
  data () {
    return {
      currentBasecard: []
    }
  },
  components: {
    Card,
    draggable
  },
  created () {
    db.collection('kanban')
      .where('status', '==' , this.board.name)
      .onSnapshot(query => {
        this.currentBasecard = []
        query.forEach(doc => {
          let data = {
            id: doc.id,
            ...doc.data()
          }
          this.currentBasecard.push(data)
        })
      })
  },
  watch: {
    currentBasecard() {
      for(let i=0; i<this.currentBasecard.length; i++){
        if(this.currentBasecard[i].status !== this.board.name){
          db.collection('kanban')
            .doc(this.currentBasecard[i].id)
            .update({status : this.board.name})
            .then(() => {
              console.log('success')
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    }
  }
}
</script>

<style>
.card-title {
  text-align: center;
  padding: 1rem;
  color: wheat;
}
.base-card {
  border-radius: .5rem;
  padding-bottom: 1rem;
  opacity: 0.9;
}
</style>
