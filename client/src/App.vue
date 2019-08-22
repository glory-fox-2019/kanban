<template>
  <div>
    <div>
      <navbar></navbar>
    </div>
    <div class = "container-fluid">
      <div class = "row mt-4">
        <div class = "col-sm">
          <cardKamban v-bind:color="'red'" v-bind:text="'Back-Log'"></cardKamban>
        </div>
        <div class = "col-sm">
          <cardKamban v-bind:color="'orange'" v-bind:text="'To-Do'"></cardKamban>
        </div>
        <div class = "col-sm">
          <cardKamban v-bind:color="'blue'" v-bind:text="'Doing'"></cardKamban>
        </div>
        <div class = "col-sm">
          <cardKamban v-bind:color="'green'" v-bind:text="'Done'"></cardKamban>
        </div>
      </div>
    </div>
    <footer class="mt-5">
      <div class="footer-copyright text-center py-3">© 2019 Copyright:
          <p> M Romi Ario</p>
      </div>
    </footer>
  </div>
</template>

<script>
import navbar from './components/navbar'
import cardKamban from './components/cardKamban'

export default {
  components: {
    navbar,
    cardKamban

  }

}
</script>

<style>

</style>
