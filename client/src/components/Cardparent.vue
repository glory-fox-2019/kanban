<template>
<b-col cols="3">
  <b-card-group deck style="display: flex; flex-direction: column; padding: 0; ">
    <b-card :header="status" style="padding: 0; min-height: 200px;" :header-bg-variant="color">
      <draggable v-model="arrayOfJob" @start="drag=true" @end="drag=false" group="job" :emptyInsertThreshold="200">
        <transition-group>
        <Card v-for="job in arrayOfJob" :key="job.id" :list="job"></Card>
        </transition-group>
      </draggable>
    </b-card>
  </b-card-group>
</b-col>
</template>

<script>
import Card from './Card.vue'
import db from '../apis/firebase'
import draggable from 'vuedraggable'
import Swal from 'sweetalert2'
export default {
  props: {
    status: String
  },
  components: {
    Card,
    draggable
  },
  data() {
    return {
      color: '',
      arrayOfJob: []
    }
  },
  methods: {
    generateParent () {
      if (this.status == 'Back-log') {
        this.color = 'danger';
      }
      else if (this.status == 'To-do') {
        this.color = 'warning';
      }
      else if (this.status == 'Doing') {
        this.color = "primary";
      }
      else {
        this.color = 'success';
      }
    },
    fetchTask () {
      Swal.fire({
        title: 'please wait...'
      })
      Swal.showLoading()
      db.collection('Kanban').where('status' , "==", this.status)
      .onSnapshot(snapshot => {
        Swal.close()
        this.arrayOfJob = []
        snapshot.forEach(doc => {
          const data = doc.data();
          const id = doc.id;
          this.arrayOfJob.push({
            id,
            ...data
          })
        })
      })
    }
  },
  created() {
    this.generateParent()
    this.fetchTask()
  },
  watch: {
    arrayOfJob() {
      const arrayOfUpdate = this.arrayOfJob.filter((el) => { return el.status !== this.status})
      arrayOfUpdate.forEach((el) => {
        db.collection('Kanban').doc(el.id)
        .update({
          status: this.status
        })
        .then(() => {
          console.log('succesfully update')
        })
        .catch(console.log)
      })
    }
  }
}
</script>

<style>

</style>