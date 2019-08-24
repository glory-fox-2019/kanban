<template>
  <div class="home">
    <Navbar/>
    <div class="d-flex">
    <BaseCard v-for="board in boards" :key="board.name" :board="board" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import BaseCard from '@/components/BaseCard.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    BaseCard
  },
  data() {
    return {
      boards: [
        {name: "Backlog", color:"red"},
        {name: "Todo", color:"orange"},
        {name: "Doing", color:"blue"},
        {name: "Done", color:"green"},
      ]
    }
  }
}
</script>
