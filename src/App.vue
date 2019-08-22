<template>
  <v-app>
    <Navbar @newData="createTask"/>
    <v-content class="pa-12">
      <v-layout row>
        <v-flex xs12 sm12 md6 lg3
        class="d-flex justify-center"
        v-for="value in myContainers" :key="value.color">
          <Container :warna="value.color"
          :text="value.text"
          :arrData="value.datas"
          :actions="value.actions"
          ></Container>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Container from '@/components/Container.vue';
import db from '@/api/firestore';

export default {
  name: 'App',
  components: {
    Navbar, Container,
  },
  data: () => ({
    myContainers: {
      backlog: {
        color: 'yellow darken-3',
        text: 'Back-Log',
        actions: [
          {
            text: 'delete',
            color: '#D32F2F',
          },
          {
            text: 'todo',
            color: '#455A64',
          },
        ],
        datas: [],
      },
      todo: {
        color: 'blue-grey darken-2',
        text: 'To Do',
        actions: [
          {
            text: 'backlog',
            color: '#F9A825',
          },
          {
            text: 'delete',
            color: '#D32F2F',
          },
          {
            text: 'doing',
            color: '#5C6BC0',
          },
        ],
        datas: [],
      },
      doing: {
        color: 'indigo lighten-1',
        text: 'Doing',
        actions: [
          {
            text: 'todo',
            color: '#455A64',
          },
          {
            text: 'delete',
            color: '#D32F2F',
          },
          {
            text: 'done',
            color: '#00C853',
          },
        ],
        datas: [],
      },
      done: {
        color: 'green accent-4',
        text: 'Done',
        actions: [
          {
            text: 'doing',
            color: '#5C6BC0',
          },
          {
            text: 'delete',
            color: '#D32F2F',
          },
        ],
        datas: [],
      },
    },
  }),
  mounted() {
    db.collection('kanban')
      .onSnapshot((querySnapshot) => {
        // for (const key in this.myContainers) {...}
        // for..in loops iterate over the entire prototype chain,
        // which is virtually never what you want.
        // Use Object.{keys,values,entries},
        // and iterate over the resulting array (no-restricted-syntax)
        Object.keys(this.myContainers).forEach((key) => {
          this.myContainers[key].datas = [];
        });
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          switch (data.status) {
            case 'backlog':
              // console.log(data);
              this.myContainers.backlog.datas.push(data);
              break;
            case 'todo':
              this.myContainers.todo.datas.push(data);
              break;
            case 'doing':
              this.myContainers.doing.datas.push(data);
              break;
            case 'done':
              this.myContainers.done.datas.push(data);
              break;
            default:
              break;
          }
        });
      });
  },
  methods: {
    createTask(val) {
      db.collection('kanban').add(val)
        .then(() => {
          this.$swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
          })
            .fire({
              type: 'success',
              title: 'Task created!',
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
  * {
    font-family: 'Livvic', sans-serif;
  }
</style>
