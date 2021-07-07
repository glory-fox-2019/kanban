<template>
  <div id="app">
    <Navbar></Navbar>
    <Home></Home>
  </div>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
import Home from "@/views/Home.vue";

export default {
  data() {
    return {};
  },
  components: {
    Navbar,
    Home
  }
};
</script>
<style scoped>
#app {
  background-image: url("./assets/email-pattern.png");
  height: 100vh;
}
</style>
