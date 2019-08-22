<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color:white">
    <a class="navbar-brand" href="#">Kamban</a>
    <div class="collapse navbar-collapse  justify-content-end" id="navbarSupportedContent">
        <div>
            <!-- Using modifiers -->
            <b-button v-b-modal.my-modal class="btn btn-primary" style="background-color:blue">New Task</b-button>

            <!-- The modal -->
            <b-modal id="my-modal" hide-footer>
                <h6>New Task</h6>
                <form>
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" id="title" placeholder="Task Title" v-model="title">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" placeholder="Task Short Description" v-model="description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="point">Point</label>
                        <input type="number" class="form-control" id="point" placeholder="Task Point" v-model="point">
                    </div>
                    <div class="form-group">
                        <label for="assgin">Assigned To</label>
                        <input type="text" class="form-control" id="assign" placeholder="Assigned To" v-model="Assign_To">
                    </div>
                    <b-button class="mt-3" block @click="$bvModal.hide('my-modal')">Cancel</b-button>
                    <b-button class="mt-3" block @click="newTask()" style="background-color:green">Save</b-button>

                </form>

            </b-modal>
        </div>

    </div>
</nav>
</template>

<script>
import db from '../apis/firebase'
export default {
  methods: {
    newTask () {
      db.collection('kamban').add({
        Title: this.title,
        Status: 'Back-Log',
        Point: this.point,
        Desription: this.description,
        Assigned_To: this.Assign_To
      }).then(ref => {
        this.$swal.fire({
          type: 'success',
          title: 'Success!',
          text: 'Event is created!',
          showConfirmButton: false,
          timer: 1500
        })
        console.log('Added document with ID: ', ref.id)
      })

      this.title = ''
      this.description = ''
      this.point = ''
      this.Assign_To = ''
      this.$root.$emit('bv::hide::modal', 'my-modal')
    }
  },
  data () {
    return ({
      title: '',
      description: '',
      point: '',
      Assign_To: ''

    })
  }
}
</script>

<style>

</style>
