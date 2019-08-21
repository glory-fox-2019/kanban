<template>
  <div id="app">
    <Navbar></Navbar>
    <b-container fluid>
      <b-row style="margin-top: 30px;" >
        <Cardparent v-for="job in jobStatus" :key="job" :status="job"></Cardparent>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import db from '@/apis/firebase.js'
import Cardparent from '@/components/Cardparent.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'app',
  components: {
    Cardparent,
    Navbar
  },
  data() {
    return {
      status: '',
      jobStatus: ['Back-log', 'To-do', 'Doing', 'Done']
    }
  },
  methods: {

  },
  created() {

  }
}
</script>

<style scoped>

</style>
