<template>
    <div>
        <div class="card" v-for="kamban in kambans" :key="kamban.id">
            <div class="card-header">
                <b>{{kamban.Title}}</b>
            </div>
            <div class="card-body">
                <p class="card-text">Point: {{kamban.Point}}</p>
                <p class="card-text">Assigned to: {{kamban.Assigned_To}}</p>
                <b-button v-b-modal="'modal'+kamban.id " class="btn btn-primary" style="background-color:#2A5CCE">Show Detail</b-button>
                <b-modal :id="'modal'+kamban.id " hide-footer>
                    <center><h6>Detail Task - {{kamban.Title}}:</h6></center>
                    <br>
                    <h6>Task Description:</h6>
                    <p>{{kamban.Desription}}</p>
                    <br>
                    <h6>Point</h6>
                    <p>{{kamban.Point}}</p>
                    <br>
                    <h6>Status</h6>
                    <p>{{kamban.Status}}</p>
                    <br>

                    <div class = "container-fluid">
                        <div class = "row">
                            <div class="col-sm">
                                 <b-button href="#"  block class="mt-3" v-if ="findBefore(kamban.Status)" @click="update(kamban.id,findBefore(kamban.Status))" style="background-color:#1F385C">{{findBefore(kamban.Status)}}</b-button>

                            </div>

                            <div class="col-sm">
                                 <b-button href="#"  block class="mt-3" @click="deleteData(kamban.id)" style="background-color:red">Delete</b-button>

                            </div>

                            <div class="col-sm">
                                 <b-button href="#" class="mt-3" block v-if ="findNext(kamban.Status)" @click="update(kamban.id,findNext(kamban.Status))" style="background-color:#1F385C">{{findNext(kamban.Status)}}</b-button>

                            </div>

                            <div class = "col-sm">

                                <b-button class="mt-3" block @click="$bvModal.hide('show-modal')">Cancel</b-button>

                            </div>

                        </div>

                    </div>

                </b-modal>
            </div>
        </div>
    </div>

</template>

<script>
import db from '../apis/firebase'
export default {
  props: ['kambans'],
  data () {
    return {
      status: ['Back-Log', 'To-Do', 'Doing', 'Done']
    }
  },
  methods: {
    deleteData (id) {
      this.$swal.fire(
        { title: `Are you sure want to delete this task?`,
          type: 'question',
          showConfirmButton: true,
          showCancelButton: true
        })
        .then((isConfirm) => {
          if (isConfirm.value) {
            db.collection('kamban').doc(id).delete()
              .then(data => {
                console.log(data)
                this.$swal.fire({
                  type: 'success',
                  title: 'Success!',
                  text: `Task has been deleted!`,
                  showConfirmButton: false,
                  timer: 1500
                })
              })
              .catch(err => {
                console.log(err)
              })
          }
        })

      this.$root.$emit('bv::hide::modal', 'modal' + id)
    },
    findNext (status) {
      let index = this.status.indexOf(status)
      if (index + 1 < this.status.length) {
        return this.status[index + 1]
      } else {
        return null
      }
    },
    findBefore (status) {
      let index = this.status.indexOf(status)
      if (index - 1 >= 0) {
        return this.status[index - 1]
      } else {
        return null
      }
    },
    update (id, state) {
      this.$swal.fire(
        { title: `Are you sure want to move this task to ${state}?`,
          type: 'question',
          showConfirmButton: true,
          showCancelButton: true
        })
        .then((isConfirm) => {
          if (isConfirm.value) {
            let kambanRef = db.collection('kamban').doc(id)
            kambanRef.update({ Status: state })
            this.$root.$emit('bv::hide::modal', 'modal' + id)
            this.$swal.fire({
              type: 'success',
              title: 'Success!',
              text: `Task's status is updated to ${state}!`,
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
    }
  }
}
</script>
