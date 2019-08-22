<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
  <!-- ===== Modal Register ===== -->
  <div>
    <b-modal size="xl" ref="modal-task" id="modal-task" centered title="Create New Task" hide-footer >
      <div class="modal-body">
        <div class="container-fluid">
          <div>
            <form @submit.prevent="newTask()" id="registerForm" class="form d-flex flex-column">
              <input v-model="task.title" class="login-register" type="text" placeholder="Input title">
              <b-form-textarea
                id="textarea"
                class="login-register"
                v-model="task.description"
                placeholder="Input description"
                rows="3"
                max-rows="6">
              </b-form-textarea>
              <input v-model="task.assigned" class="login-register" type="text" placeholder="Assigned To">
              <div class="text-center">
                <button type="submit" class="modal-button btn btn-primary">Submit</button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </b-modal>
  </div>

    <!-- ===== Navbar ===== -->
    <div style="background-color: #E8E8E4">
      <b-navbar toggleable="sm">
        <b-navbar-brand> <img class="img-fluid logo" src="./assets/progressgrid-logo.png" alt="logoPostingg"> </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <div class="d-flex justify-content-center">

            <!-- <b-navbar-nav>
              <a class="nav-link nav-font"> HOME </a>
            </b-navbar-nav> -->
            <p class="text-center"><sub>Progress Grid is an app to help you manage and prioritize your task. Just drag and drop any task accordingly</sub></p> 
          </div>
 
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <a v-b-modal.modal-task class="nav-link nav-font">Add New Task</a>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div >
      <router-view style="background-color: #DBDBD9; height: 100%"/>
    </div>
  </div>
</template>

<script>
import db from './apis/firebase'

export default {
  data(){
    return {
      task: {
        title: '',
        description: '',
        assigned: ''
      }
    }
  },
  methods: {
    newTask(){
      console.log('masuk new task', this.task)

      let addDoc = db.collection('Task').add({status:'backLog', ...this.task}).then(ref => {
        console.log('Added document with ID: ', ref.id);
      });
      
      this.$refs['modal-task'].hide()
      this.task.title = ''
      this.task.description = ''
      this.task.assigned = ''
    }
  },
}
</script>

<style>
  /* 
  font-family: 'Anton', sans-serif;
  font-family: 'Roboto Condensed', sans-serif;
  font-family: 'Oswald', sans-serif;
  font-family: 'Monoton', cursive; 
  */
  .jumbotron{
    font-family: 'Anton', sans-serif;

  }

  .logo {
    font-family: 'Pacifico', cursive;
    height: auto; 
    width: auto; 
    max-width: 75px; 
    max-height: 75px;
  }

  .nav-font {
    color: black !important;
    font-size: 130%;
    font-family: 'Oswald', sans-serif;
    transition: 0.2s;
  }

  .nav-font:hover {
    font-size: 130%;
    font-family: 'Anton', sans-serif;
    cursor: pointer;
  }

  .loading-font {
    color: black !important;
    font-size: 130%;
    font-family: 'Oswald', sans-serif;
  }

  .nav-dropdown {
    font-family: 'Oswald', sans-serif;
    cursor: pointer;
    transition: 0.2s;
  }

  .nav-dropdown:hover {
    font-family: 'Anton', sans-serif;
    color:red
  }

  h4 {
    font-family: 'Oswald', sans-serif;
  }

  h5 {
    font-family: 'Oswald', sans-serif;
    font-size: 20px
  }

  .title {
    font-family: 'Oswald', sans-serif;
    font-size: 20px;
    text-align: center
  }

  /* .article-cover {
    height: 200px;
    
  } */

  .cover-image{
    max-height: 200px;
    max-width: 200px;
  }

  .imageEdit{
    max-height: 500px;
    max-width: 500px;
  }

  .login-register{
    border: none;
    background-color: transparent;
    outline: none;
    text-align: center;
    border-bottom: 1px solid rgb(165, 165, 165);
    margin-bottom: 10px;
    font-family: 'Roboto Condensed', sans-serif;
  }
</style>
