<template>
  <b-container fluid class="p-0">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="#"> 看板 Kanban </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button @click.prevent="showModal" variant="primary">New Task</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <newTask ref="createTask"></newTask>
  </b-container>
</template>

<script>
import NewTask from './newTask.vue';

export default {
  components: {
    NewTask,
  },
  methods: {
    showModal() {
      this.$refs.createTask.showModal();
    },
  },
};
</script>

<style>
</style>
