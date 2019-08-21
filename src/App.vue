<template>
  <div id="app">
    <Card v-for="data in card" :key="data.name" :title="data.title" :name="data.name" :colorText="data.colorText" :color="data.color" :tasks="data.task"></Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import db from '@/apis/firestore'

export default {
  name: 'app',
  components: {Card},
  data(){
    return {
      card: [
        {
          name: 'todo',
          title:'Todo',
          colorText:'white',
          color:'#fabc3c',
          task: []
          
        },
        {
          name:'doing',
          title:'Doing',
          colorText:'white',
          color:'#ffb238',
          task: []
        },
        {
          name:'revision',
          title:'Revision',
          colorText:'white',
          color:'#ff773d',
          task: []
        },
        {
          name:'finish',
          title:'Finish',
          colorText:'white',
          color:'#f55536',
          task: []
        },
      ],
    }
  },
  mounted(){
    db.collection("task")
      .onSnapshot((querySnapshot) => {
        this.card.map((el) => {
          el.task = []
          return el;
        });
        querySnapshot.forEach((doc) => {
          const status = doc.data().status
          const index = this.card.findIndex(el => el.name === status);
          const payload = { id: doc.id , ...doc.data()}
          this.card[index].task.push(payload);
        });
      });
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/kanban.scss';
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  @import './assets/scss/style.scss';
</style>
