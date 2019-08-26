<template>
  <div id="app">
    <Navbar></Navbar>
    <CardList v-for="(board, i) in boards" :key="i" :board="board" style="padding-top: 54px;"></CardList>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import CardList from './components/CardList.vue'
export default {
  data () {
    return {
      boards: ['Back-Log', 'To Do', 'Doing', 'Done']
    }
  },
  components: {
    Navbar,
    CardList,
  }
}
</script>

<style>
body, html, #app {
  margin: 0;
  padding: 0;
  background-color: #cb3833;
  font-size: 14px;
}
</style>
