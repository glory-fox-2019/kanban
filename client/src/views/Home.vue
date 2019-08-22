<template>
  <div class="home">

    <div style="display:flex;flex-direction:row;justify-content:space-around;">
      <TaskList :status="backlog" :taskFromParent="backlogTasks"></TaskList>
      <TaskList :status="todo" :taskFromParent="todoTasks"></TaskList>
      <TaskList :status="doing" :taskFromParent="doingTasks"></TaskList>
      <TaskList :status="done" :taskFromParent="doneTasks"></TaskList>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import db from '../api/firestore'
import TaskList from '../components/TaskList'

export default {
  name: 'home',
  components: {
    TaskList
  },
  data () {
    return {
      backlog: 'Back-log',
      todo: 'Todo',
      doing: 'Doing',
      done: 'Done',
      allTasks: [],
      message: ' ahada',
      backlogTasks: [],
      todoTasks: [],
      doingTasks: [],
      doneTasks: []
    }
  },
  methods: {
    getAll () {
      db.collection('task')
        .onSnapshot((querySnapshot) => {
          this.backlogTasks = []
          this.todoTasks = []
          this.doingTasks = []
          this.doneTasks = []
          querySnapshot.forEach((doc) => {
            let obj = {
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              assigned: doc.data().assigned,
              status: doc.data().status
            }
            if (obj.status == 0) {
              this.backlogTasks.push(obj)
            } else if (obj.status == 1) {
              this.todoTasks.push(obj)
            } else if (obj.status == 2) {
              this.doingTasks.push(obj)
            } else if (obj.status == 3) {
              this.doneTasks.push(obj)
            }
          })
        })
    }

  },
  created () {
    this.getAll()

    // console.log(this.allTask)

  // console.log('adad')
    // console.log(this.allTask[0]);
    // this.putTask()
    // console.log(this.allTask)
  }
}
</script>
