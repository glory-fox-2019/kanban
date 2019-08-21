<template>
  <div class="col">
    <div class="card">
      <div class="card--title" :style="'background-color:'+color+';color:'+colorText">{{title}}</div>
      <div class="card--action">
        <div class="card--action--add--trigger" @click="addButton = !addButton">
          <button>{{addButtonValue}}</button>
        </div>
        <div class="card--action--add" v-if="addButton">
          <form @submit.prevent="addTask()">
            <input type="text" v-model="task.name" placeholder="Name">
            <textarea type="text" placeholder="Description" v-model="task.description"></textarea>
            <input type="text" v-model="task.assign_to" placeholder="Assign To">
            <input type="submit" value="Send">
          </form>
        </div>
      </div>
      <div class="card--content">
        <draggable v-model="tasks" group="todo" @start="drag=true" @end="drag=false">
          <Task v-for="element in tasks" :key="element.id" :task="element"></Task>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import Task from './Task'
import draggable from 'vuedraggable'
import db from '@/apis/firestore'

Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};

export default {
  props: ['title','name','color','colorText','tasks'],
  components: {Task,draggable},
  data(){
    return {
      task: {
        name: '',
        description: '',
        assign_to: '',
      },
      addButton: false,
      addButtonValue: 'add',
    }
  },
  watch:{
    tasks(newVal,oldVal){
      let diff = newVal.diff( oldVal );
      if(diff.length > 0 && diff[0].id){
        db.collection("task").doc(diff[0].id)
          .update({
            status: this.name
          })
          .then((data) => {
            console.log('Success');
          })
          .catch(console.log);
      }

    },
    addButton(val){
      val ? this.addButtonValue = 'Cancel' : this.addButtonValue = 'Add'
    }
  },
  methods:{
    addTask(){
      db.collection("task").add({
        name: this.task.name,
        description: this.task.description,
        assign_to: this.task.assign_to,
        status: this.name,
      })
      .then(() => {
        this.task = {
          name: '',
          description: '',
          assign_to: '',
        }
        this.addButton = false;
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    }
  }
}
</script>

<style>

</style>