<template>
  <nav>
    <v-toolbar color="elevation-0">
      <div id="box-img">
        <v-img src="../assets/icon.png"></v-img>
      </div>
      <v-toolbar-title id="title-navbar" class="ml-2">
        <span class="font-weight-light mr-1">Kan</span>
        <span class="font-weight-bold">Ban</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn depressed color="primary" @click.stop="dialog = true">
        <v-icon left>playlist_add</v-icon>
        Add Task
      </v-btn>
    </v-toolbar>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Create New Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Task*" required v-model="taskName"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Description" v-model="description"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Assign to" v-model="assign_to"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="emitCreateData">Add Task</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </nav>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    taskName: '',
    description: '',
    assign_to: '',
  }),
  methods: {
    emitCreateData() {
      let obj = {
        name: this.taskName,
        description: this.description,
        assign_to: this.assign_to,
        status: 'backlog',
      }
      this.$emit('newData', obj);
      this.dialog = false;
      this.description = '';
      this.taskName = '';
      this.assign_to = '';
    }
  }
};
</script>

<style scoped>
#box-img {
  width: 40px;
  height: 40px;
  overflow: hidden;
  margin: 0 10px 0 50px;
}
#title-navbar {
  letter-spacing: 1px;
}
</style>
