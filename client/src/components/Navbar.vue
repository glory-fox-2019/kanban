<template>
  <nav class="p-2">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="logo">
        <h1 class="m-0">Kemben</h1>
      </div>
      <div>
        <b-button class="addbtn" v-b-modal.modal-center>New Task</b-button>
        <b-modal
          id="modal-center"
          centered
          title="Add New Task"
          ok-only
          ok-variant="secondary"
          ok-title="Cancel"
        >
          <form
            class="d-flex flex-column justify-content-center align-items-center"
            @submit.prevent="saveTask()"
          >
            <div>
              <label>Title</label>
              <input
                v-model="title"
                class="form-control"
                type="text"
                placeholder="Input your title"
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                v-model="description"
                class="form-control"
                type="text"
                placeholder="Input your description"
              />
            </div>
            <div class="mt-3    ">
              <button type="submit" block @click="$bvModal.hide('modal-center')" class="btn">Save Task</button>
            </div>
          </form>
        </b-modal>
      </div>
    </div>
  </nav>
</template>

<script>
import db from "../../api/firebase";
import firebase from 'firebase';
export default {
  data: () => {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    saveTask() {
      db.collection("List")
        .add({
          title: this.title,
          description: this.description,
          status: "Backlog",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          console.log("Document successfully written!");
          this.title = "";
          this.description = "";
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Barriecito|Walter+Turncoat&display=swap");
/* font-family: 'Barriecito', cursive;
font-family: 'Walter Turncoat', cursive; */
nav {
  z-index: 10;
  background-color: rgb(90, 0, 90);
}
.logo {
  color: gold;
  font-family: "Walter Turncoat", cursive;
}
.addbtn {
  background-color: rgb(90, 0, 90);
  color: gold;
  border: 2px solid gold;
  font-weight: bold;
}
.addbtn:hover {
  color: black;
  background-color: gold;
  font-weight: bold;
}
label {
  font-family: "Walter Turncoat", cursive;
  font-weight: bolder;
}
.btn {
  background-color: rgb(90, 0, 90);
  color: gold;
  border: 2px solid gold;
  font-weight: bold;
}
.btn:hover {
  color: black;
  background-color: gold;
  font-weight: bold;
}
</style>