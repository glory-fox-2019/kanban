<template>
  <div class="card">
    <div class="card-header" :style="styleColor">
        {{text}}
    </div>

    <div class="card-body">
        <cardkambanContent v-bind:kambans="kambans" class="pb-4"></cardkambanContent>

    </div>
</div>
</template>

<script>

import cardkambanContent from './cardkambanContent'
import db from '../apis/firebase'

export default {
  props: ['color', 'text'],
  data () {
    return {
      styleColor: {
        backgroundColor: this.color,
        color: 'white'
      },
      kambans: []
    }
  },
  created () {
    db.collection('kamban').where('Status', '==', this.text)
      .onSnapshot((snapshot) => {
        this.kambans = []
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data())
          let obj = { id: doc.id, ...doc.data() }
          this.kambans.push(obj)
        })
      }, (err) => {
        console.log('Error getting documents', err)
      })
  },
  components: {
    cardkambanContent
  }

}
</script>
