<template>
  <b-card style="width:100%;" :header="task.title" class="mt-2">
    <b-card-text>Point : {{task.point}}</b-card-text>
    <b-card-text>Assign to : {{task.assign_to}}</b-card-text>
    <b-button href="#" variant="primary" @click.prevent="show" v-b-modal.modal-detail>Show Details</b-button>
    <Detail @click.prevent="show" ref="modalDetail" :task="task" :step="step"></Detail>
  </b-card>
</template>

<script>
import Detail from "./Detail.vue";
export default {
  props: ["task", "step"],
  components: {
    Detail,
  },
  methods : {
      show(){
         console.log(this.$refs.modalDetail.tampil())
      },
  },
  created(){
  }

};
</script>

<style>
</style>