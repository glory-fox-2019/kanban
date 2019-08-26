<template>
    <div>
      <b-card no-body id="task-card" class="mx-2 mb-2">
        <b-card-text class="mx-2 my-1">
            <b-row align-h="between">
              <b-col cols="9">
                <b-card-text>
                  {{ task.title }}
                  <br>
                  <span class="text-muted">Assigned To: {{ task.assignedTo }}</span>
                </b-card-text>
              </b-col>
              <b-col cols="3" class="text-right">
                <b-card-text>
                  <i @click="$bvModal.show('modal-edit-' + task.id)"
                  class="material-icons mr-1 text-muted icon">
                  edit
                  </i>
                </b-card-text>
              </b-col>
            </b-row>
          <b-btn v-if="task.due_date" id="due" size="sm">
            <i class="material-icons mr-1 icon">access_time</i>
            {{ task.due_date }}
          </b-btn>
        </b-card-text>
      </b-card>
      <ModalEdit :task="task"></ModalEdit>
    </div>
</template>

<script>
import ModalEdit from './ModalEdit.vue'
export default {
  name: 'Card',
  components: {
    ModalEdit
  },
  data () {
    return {
      status: ''
    }
  },
  props: ['task','board']
}
</script>

<style>
#task-card {
  background-color: #ffffff;
  border: 0;
  -webkit-box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
}

#due {
  padding: 0.1rem 0.2rem;
  background-color: #5aa072;
  border: 0;
}

.icon {
  font-size: 14px;
  vertical-align: middle;
}
</style>
