<script>
  import http from '@/service/http'
  import localforage from 'localforage'
  import { mapActions } from 'vuex'

  export default {
    name: 'Authentication',
    mounted () {
      if (window.location.search.indexOf('expired=true') > -1) {
        this.$bus.$emit('display-alert', {
          type: 'error',
          message: 'Token Expirado. Favor Logar Novamente !'
        })
      }
    },

    data () {
      return {
        email: '',
        password: ''
      }
    },

    methods: {
      ...mapActions(['setToken']),
      async singin () {
        try {
          const { email, password } = this
          const response = await http.post('/autenticacao', { email, password })
          const { token } = response.data

          localforage.setItem('token', token).then(() => {
            this.setToken({token})
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
            <button class="btn btn-primary btn-sm" type="submit"><span class="glyphicon glyphicon-send" aria-hidden="true"></span> Sign In</button>
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
