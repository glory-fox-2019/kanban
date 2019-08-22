<template>
  <v-card width="344" min-height="200" class="ma-5">
    <v-toolbar flat
    class="d-flex justify-center align-center" id="title" min-height="80" :color="warna">
      <v-toolbar-title class="white--text font-weight-bold">{{ text }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <Card v-for="data in arrData" :key="data.id" :data="data" :actions="actions"></Card>
    </v-card-text>
  </v-card>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  props: ['warna', 'text', 'arrData', 'actions'],
  components: {
    Card,
  },
  mounted() {
    console.log(this.arrData);
  },
};
</script>

<style>
  #container {
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }

  #title {
    letter-spacing: 2px;
  }
</style>
