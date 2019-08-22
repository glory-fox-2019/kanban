<template>
  <div class="card p-0 shadow bg-white rounded m-1">
    <div class="card-title d-flex justify-content-center align-items-center m-0" :class="kotak.bg">
      <h3 class="m-0 p-2">{{kotak.name}}</h3>
    </div>
    <div class="card-body p-3">
        <ToDoBoxList v-for="task in kotak.tasks" :key="task.id" :list="task" :boxName="kotak.name"></ToDoBoxList>
    </div>
  </div>
</template>

<script>
import ToDoBoxList from "./ToDoBoxList";
export default {
    props:['kotak'],
    components:{
        ToDoBoxList
    }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Barriecito|Walter+Turncoat&display=swap");
/* font-family: 'Barriecito', cursive;
font-family: 'Walter Turncoat', cursive; */
.card {
  box-shadow: 10, 10, 10, black;
  height: 100%;
  width: 20%;
}
h3 {
  font-weight: bolder;
  font-family: "Walter Turncoat", cursive;
}
</style>