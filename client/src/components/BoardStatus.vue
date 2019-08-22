<template>
  <div>
    <div>
      <div class="card border">
        <div class="d-flex justify-content-between card-header card-title" :style="style">
          <h6 slot="header" class="headerFont">{{data.header}}</h6>
          <div class="delete"> </div>
        </div>
        <div class="card-body text-primary" :style="styleBody">
          <draggable v-model="tasks" group="people" @start="drag=true" @end="drag=false">
            <Task v-for="task in tasks" :key="task.id" :value="task"></Task>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from './Task'
import draggable from 'vuedraggable'
import db from '../apis/firebase'

export default {
  name: 'BoardStatus',
  props:{
    data: Object
  },
  components: {
    Task, draggable
  },
  data(){
    return {
      tasks: [],
      style: {
        'background-color': this.data.color,
  
      },
      styleBody: {
        'background-color': this.data.body
      }
    }
  },
  watch : {
    tasks: function (newVal, oldVal){
      for (let i=0; i<this.tasks.length; i++){
        if (this.data.name !== this.tasks[i].status){
          db.collection('Task')
            .doc(this.tasks[i].id).update({status : this.data.name})
        }
      }
      console.log('ini data task', this.tasks)
    }
  },
  created(){
    let query = db.collection('Task').where('status', '==', `${this.data.name}`)
    let observer = query.onSnapshot(querySnapshot => {
      
      

      let arr = []
      console.log(`Received query snapshot of size ${querySnapshot.size}`)
      querySnapshot.forEach(function(doc){
        // console.log('ini query snapshot', doc.data())
        arr.push({
          id: doc.id,
          ...doc.data()
          })
      })
      this.tasks = arr

    }, err => {
      console.log(`Encountered error: ${err}`);
    });
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
  .headerFont{
    color: white;
    font-family: 'Anton', sans-serif;
    text-align: center
  }
  .border{
    border-radius: 25px;
  }
</style>