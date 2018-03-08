<template>
    <div class="form-container">
        <div v-for="message in messages">
          {{message.message}}
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Register',
  data () {
    return {
      messages: []
    }
  },
  methods: {
      getMessages: function() {
        let _token = localStorage.getItem('token');
        this.$http.get('http://localhost:1407/messages/user', { headers: { Authorization: _token } })
            .then(
                res => {
                    this.messages = res.data.content
                },
                res => {
                    console.log(res.data)
                }
            )
      }
  },
  beforeMount(){
    this.getMessages()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>