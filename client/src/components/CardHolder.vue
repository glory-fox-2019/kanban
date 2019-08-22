<template>
  <b-col cols="12" md="6" lg="3" style="text-align:left;">
      <b-card
      :header="setting.name"
      :header-bg-variant="setting.variant"
      header-text-variant="white">
        <CardTask v-for="task in setting.tasks" :key="task.id" :task="task" :step="setting.steps"></CardTask>
      </b-card>
  </b-col>
</template>

<script>
import CardTask from './CardTask';
export default {
    props : ['setting'],
    components: {
        CardTask,
    },
    created(){
        console.log('dari card')
        console.log(this.setting)
    }
}


</script>

<style>

</style>
