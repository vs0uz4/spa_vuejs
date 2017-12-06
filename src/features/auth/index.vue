<script>
  import axios from 'axios'
  import localforage from 'localforage'

  export default {
    name: 'Authentication',
    data () {
      return {
        email: '',
        password: ''
      }
    },

    methods: {
      async singin () {
        try {
          const { email, password } = this
          const payload = { email, password }
          const url = 'http://localhost:3456/autenticacao'
          const response = await axios.post(url, payload)
          const { token } = response.data

          localforage.setItem('token', token).then(() => {
            this.$router.push({ name: 'index' })
          })
        } catch (error) {
          console.log(error, error.message)
        }
      }
    }
  }
</script>

<template>
  <div>
    <div class="row top-30">
      <div class="col-md-4 col-md-offset-4">
        <form class="well" @submit.prevent="singin">
          <div class="form-group">
            <label class="control-label">E-mail</label>
            <input type="email" class="form-control" v-model="email">
          </div>

          <div class="form-group">
            <label class="control-label">Password</label>
            <input type="password" class="form-control" v-model="password">
          </div>

          <div class="text-right">
            <button class="btn btn-primary btn-sm" type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-30 {
  margin-top: 30px;
}
</style>
