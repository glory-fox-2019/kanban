<template>
  <div id="app">
    <NavBar></NavBar>
    <b-container fluid>
      <b-row>
        <CardHolder class="mt-5" v-for="(data, i) in datas" :key="i" :setting="data"></CardHolder>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import NavBar from './components/NavBar.vue';
import CardHolder from './components/CardHolder.vue';
import db from '../api/config';

const Tasks = db.collection('tasks');

export default {
  data() {
    return {
      datas: [
        {
          name: 'Backlog',
          variant: 'danger',
          tasks: [],
          steps: {
            isBacklog: false,
            isTodo: true,
            isDoing: false,
            isDone: false,
          },
        },
        {
          name: 'To-do',
          variant: 'warning',
          tasks: [],
          steps: {
            isBacklog: true,
            isTodo: false,
            isDoing: true,
            isDone: false,
          },
        },
        {
          name: 'Doing',
          variant: 'primary',
          tasks: [],
          steps: {
            isBacklog: false,
            isTodo: true,
            isDoing: false,
            isDone: true,
          },
        },
        {
          name: 'Done',
          variant: 'success',
          tasks: [],
          steps: {
            isBacklog: false,
            isTodo: false,
            isDoing: true,
            isDone: false,
          },
        },
      ],
      backLog: [],
      todo: [],
      doing: [],
      done: [],
    };
  },
  components: {
    NavBar,
    CardHolder,
  },
  created() {
    for (let i = 0; i < this.datas.length; i++) {
      Tasks.where('status', '==', i + 1).onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        this.datas[i].tasks = data;
      });
    }
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
