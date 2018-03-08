<template>
    <div class="form-container">
        <form>
            <div class="form-group">
                <img src="./../assets/logo.png" class="logo">
                <h4><center>CONNEXION</center></h4>
                <input v-model="logUser.email" class="form-control" type="email" placeholder="Email"><br>
                <input v-model="logUser.password" class="form-control" type="password" placeholder="Mot de passe"><br>
                <button class="btn btn-sucess btn-block" v-on:click="login">Se Connecter</button><br>
                <p id="param">Vous n'avez pas de compte ?
                <router-link to="/register">Inscrivez-vous</router-link>
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
      logUser: {}
    }
  },
  methods: {
      login: function(e) {
        e.preventDefault();
        let data = {
            email: this.logUser.email,
            password: this.logUser.password
        };
        this.$http.post('http://localhost:1407/auth/login', data)
            .then(
                res => {
                    console.log(res.data)
                },
                res => {
                    console.log(res.data)
                }
            )
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
