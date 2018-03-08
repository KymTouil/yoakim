<template>
    <div class="form-container">
        <form>
            <div class="form-group">
                <img src="./../assets/logo.png" class="logo">

                <h4><center>CONNEXION</center></h4>

                <input v-model="email" class="form-control" type="email" placeholder="Prénom"><br>
                <input v-model="password" class="form-control" type="password" placeholder="Password"><br>
                <button class="btn btn-sucess btn-block" v-on:click="login">Se Connecter</button><br>
                <p id="param">Vous n'avez pas de compte ?
                <a href="account.html">Inscrivez-vous</a>
                </p>
            </div>
        </form >
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      
    }
  },
  methods: {
      login: function() {
          
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
