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
        let config = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };
        this.$http.get('http://localhost:1407/messages/user')
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