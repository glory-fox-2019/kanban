<template>
    <div>
        <div class="tile is-ancestor" style="margin: 5%; margin-top: -2%;">
            <article class="tile is-child box is-10" style="padding: 5%;">
                <p style="font-size: 25px; font-weight: bold;"> {{data.title}} </p>
                <p style="font-size: 14px;"> {{data.description}} </p>
                <p style="font-size: 14px;" v-show="data.assign"> assign: {{data.assign}} </p>
            </article>
            <article class="tile is-child is-1" style="padding: 2%;">
                <a class="button is-danger is-outlined">
                    <span class="icon is-small">
                        <i class="fas fa-trash" @click="deleteTask(data.id)"></i>
                    </span>
                </a>
                <a class="button is-info is-outlined">
                    <span class="icon is-small">
                        <i class="fas fa-chevron-left" @click="updatePrev({data})"></i>
                    </span>
                </a>
                <a class="button is-success is-outlined">
                    <span class="icon is-small">
                        <i class="fas fa-chevron-right" @click="updateNext({data})"></i>
                    </span>
                </a>                
            </article>
        </div>
            <b-field v-if="data.status==2" label="Progress">
                    <b-slider :min="0" :max="4" ticks :tooltip="false"></b-slider>                
            </b-field>
            <b-loading :is-full-page="true" :active.sync="$store.state.isLoading" :can-cancel="true"></b-loading>
    </div>
</template>

<script>
    import db from '../config/firebase'
    export default {
        props: ['data'],
        data() {
            return {
                value: 0,
            }
        },
        methods: {
            deleteTask(id) {
                db.collection("tasks").doc(`${id}`).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            },
            updatePrev(data) {
                this.isLoading = true
                if (data.data.status !== 0) {
                    let current = data.data.status - 1
                    var ref = db.collection("tasks").doc(data.data.id);
                    return ref.update({
                        status: current
                    })
                    .then(function() {
                        console.log("Document successfully updated!");
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                }
                this.isLoading = false
            },
            updateNext(data) {
                this.isLoading = true
                if (data.data.status !== 3) {
                    let current = data.data.status + 1
                    var ref = db.collection("tasks").doc(`${data.data.id}`);
                    // Set the "capital" field of the city 'DC'
                    return ref.update({
                        status: current
                    })
                    .then(function() {
                        console.log("Document successfully updated!");
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                }
                this.isLoading = false
            },
        },
        watch:{
            value(newVal, oldVal){
                console.log(newVal)
            }
        }
    }
</script>