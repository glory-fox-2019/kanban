<template>
  <v-card  class="text-xs-center ma-3 pa-2" :min-height="300">
       <v-toolbar :color="topCard.color">
           <v-toolbar-title>{{topCard.name}}</v-toolbar-title>
       </v-toolbar>
      <Card v-for="(body, index) in topCard.kanbans" :key="index" :bodyCard="body"/>
   </v-card>
</template>

<script>
import Card from '../components/Card'
export default {
  props: ['topCard'],
  components: {
    Card
  }
}
</script>

