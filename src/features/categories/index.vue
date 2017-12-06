<script>
  import axios from 'axios'
  import localforage from 'localforage'

  export default {
    name: 'Categories',
    data () {
      return {
        list: []
      }
    },
    async mounted () {
      const url = 'http://localhost:3456/categoria'
      const token = await localforage.getItem('token')

      axios.defaults.headers.common['x-access-token'] = token
      axios.get(url)
        .then(this.successHandler)
        .catch(this.errorHandler)
    },
    methods: {
      successHandler (res) {
        if (res != null) {
          this.list = res.data.categories
        }
      },
      errorHandler (error) {
        console.log(error, error.message)
      }
    }
  }
</script>

<template>
  <div>
    <h1>Sou o Componente Categories.index</h1>
    <p v-for="category in list" :key="category.id">{{ category.name }}</p>
  </div>
</template>
