<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Kanban    </span>
        <span class="font-weight-light body-2"> by Billy Nicholas</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text>
        <AddTask/>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid class=“my-5”>
       <v-layout row wrap>
         <v-flex xs12 sm3 v-for="(judul, index) in titles" :key="index">
           <Title :topCard="judul"/>
         </v-flex>
       </v-layout>
     </v-container>
    </v-content>

  </v-app>
</template>

<script>
import db from './api/firebase'
import Title from './components/Title'
import AddTask from './components/AddTask'

export default {
  name: 'App',
  components: {
    Title,
    AddTask
  },
  methods: {
    getData () {
      db.collection('tasks')
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          for (let i = 0; i < this.titles.length; i++) {
            this.titles[i].kanbans = []
          }
          querySnapshot.forEach((doc) => {
            if (doc.data().status === 'Back-Log') {
              this.titles[0].kanbans.push({ id: doc.id, ...doc.data() })
            } else if (doc.data().status === 'To-Do') {
              this.titles[1].kanbans.push({ id: doc.id, ...doc.data() })
            } else if (doc.data().status === 'Doing') {
              this.titles[2].kanbans.push({ id: doc.id, ...doc.data() })
            } else if (doc.data().status === 'Done') {
              this.titles[3].kanbans.push({ id: doc.id, ...doc.data() })
            }
          })
        })
    }
  },
  data: () => ({
    titles: [
      {
        name: 'Back-Log',
        color: 'red',
        kanbans: []
      },
      {
        name: 'To-Do',
        color: 'yellow',
        kanbans: []
      },
      {
        name: 'Doing',
        color: 'blue',
        kanbans: []
      },
      {
        name: 'Done',
        color: 'green',
        kanbans: []
      }
    ]
  }),
  created () {
    this.getData()
  }

}
</script>
