<template>
<div class="mb-5">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">DragBar</b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button v-b-modal.addKanban size="sm" class="my-2 my-sm-0">Add Kanban</b-button>
        </b-nav-form>
      </b-navbar-nav>
      <b-modal id="addKanban" centered title="New Kanban" ref="addForm">
        <b-form id="kanbanForm" @submit.prevent="addKanban">
          <b-form-group label="Title: " label-for="title">
            <b-form-input type="text" v-model="name" placeholder="Title" id="title" required></b-form-input>
          </b-form-group>
          <b-form-group label="Description: " label-for="description">
            <b-form-textarea v-model="description" placeholder="Description" rows="3" max-rows="6"></b-form-textarea>
          </b-form-group>
        </b-form>
        <div slot="modal-footer">
          <b-button variant="primary" type="submit" form="kanbanForm">Confirm</b-button>
        </div>
      </b-modal>
  </b-navbar>
</div>
</template>

<script>
import db from '../../apis/firebase.js';

export default {
  data() {
    return {
      name: '',
      description: '',
      status: 'backlog',
    };
  },
  methods: {
    addKanban() {
      const { name, description, status } = this;
      db.collection('kanban').add({ name, description, status })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          this.$refs.addForm.hide();
          this.name = '';
          this.description = '';
        })
        .catch(console.log);
    },
  },
};
</script>

<style>

</style>
