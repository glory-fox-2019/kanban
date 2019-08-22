<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="New Task"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
    <template slot="modal-ok"> Submit</template>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Title" label-for="title-input" invalid-feedback="Name is required">
          <b-form-input id="title-input" type="text" v-model="title" required></b-form-input>
        </b-form-group>
        <b-form-group label="point" label-for="point-input" invalid-feedback="Name is required">
          <b-form-input id="point-input" type="number" v-model="point" required></b-form-input>
        </b-form-group>
        <b-form-group label="Assignto" label-for="Assignto-input" invalid-feedback="Name is required">
          <b-form-input id="Assignto-input" type="text" v-model="assign_to" required></b-form-input>
        </b-form-group>
        <b-form-group label="Description" label-for="Description-input" invalid-feedback="Name is required">
          <b-form-textarea id="Description-input" type="text" v-model="description" required></b-form-textarea>
        </b-form-group>
        
      </form>
    </b-modal>
  </div>
</template>

<script>
import db from '../../api/config';
const Tasks = db.collection('tasks');

export default {
  data() {
    return {
      title: '',
      point : 0,
      assign_to: '',
      description: '',
    };
  },
  methods: {
    resetModal() {
      this.title = "";
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    showModal() {
      this.$refs.modal.show();
    },
    handleSubmit() {
      Tasks.add({
          status : 1,
          point : this.point,
          assign_to : this.assign_to,
          title : this.title,
          description : this.description
      })
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    }
  }
};
</script>

<style>
</style>