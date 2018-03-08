<template>
    <div class="form-container">
        <form>
            <div class="form-group">
                <img src="./../assets/logo.png" class="logo">
                <h4><center>INSCRIPTION</center></h4>
                <input class="form-control" v-model="newUser.email" type="text" placeholder="Email"><br>
                <input class="form-control" v-model="newUser.password" type="password" placeholder="Mot de passe"><br>
                <input class="form-control" v-model="newUser.passwordVerif" type="password" placeholder="Confirmer mot de passe"><br>
                <button class="btn btn-sucess btn-block" v-on:click="register">S'enregister</button><br>
                <p id="param">Déjà inscrit ?
                <router-link to="/">Se connecter</router-link>
                </p>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      newUser: {}
    }
  },
  methods: {
      register: function(e) {
        e.preventDefault();
        if (this.newUser.password == this.newUser.passwordVerif) {
          let data = {
              email: this.newUser.email,
              password: this.newUser.password
          };
          this.$http.post('http://localhost:1407/auth/register', data)
              .then(
                  res => {
                      console.log(res.data)
                      this.$router.push({ path: '/' })
                  },
                  res => {
                      console.log(res.data)
                  }
              )
        } else {
          alert("Passwords don't match..")
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
