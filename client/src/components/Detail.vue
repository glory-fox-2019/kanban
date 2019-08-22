<template>
   <b-modal ref="detail" id="modal-center" centered :title="task.title">
    <p class="my-4">Point : {{task.point}} </p>
    <p class="my-4">Assign to : {{task.assign_to}} </p>
    <p class="my-4">Description : {{task.description}} </p>
    <template slot="modal-footer">
        <b-button variant="danger" v-if="step.isBacklog" @click.prevent="backlog(task.id)">BackLog</b-button>
        <b-button variant="warning" v-if="step.isTodo" @click.prevent="todo(task.id)">Todo</b-button>
        <b-button variant="secondary" @click.prevent="hapus(task.id)">Delete</b-button>
        <b-button variant="primary" v-if="step.isDoing" @click.prevent="doing(task.id)">Doing</b-button>
        <b-button variant="success" v-if="step.isDone" @click.prevent="done(task.id)">Done</b-button>
    </template>
  </b-modal>
</template>

<script>
const db = require('../../api/config');
const Task = db.collection('tasks')
export default {
    props : ['task','step'],
    methods : {
        tampil(){
            this.$refs.detail.show()
        },
        backlog(id){
            Task.doc(id).update({
                status : 1
            })
        },
        todo(id){
            Task.doc(id).update({
                status : 2
            })
        },
        doing(id){
            Task.doc(id).update({
                status : 3
            })
        },
        done(id){
            Task.doc(id).update({
                status : 4
            })
        },
        hapus(id){
            Task.doc(id).delete()
        }
    }
}
</script>

<style>

</style>