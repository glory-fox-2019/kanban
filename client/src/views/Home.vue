<template>
  <div class="home">
    <b-container fluid >
      <b-row class="justify-content-around">
        
        <BoardStatus class="col-sm-3" v-for="(val, i) in arr" :key="i"  :data="val"></BoardStatus>

      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import db from '../apis/firebase'
import BoardStatus from '../components/BoardStatus'

export default {
  name: 'home',
  components: {
    BoardStatus
  },
  data(){
    return {
      arr: []
    }
  },
  created(){
    let arr = [
      {header:'Back-Log', name: 'backLog', color:'#39366C', body:'#544F9A'},
      {header:'Todo', name: 'todo', color:'#F36C3F', body:'#EB823F'},
      {header:'Doing', name: 'doing',color:'#39366C', body:'#544F9A'},
      {header:'Done', name: 'done', color:'#F36C3F', body:'#EB823F'},
    ]
    this.arr = arr
   
  }
}
</script>

<style scoped>
  * {
    background-color: #F5F5F0
  }
</style>
