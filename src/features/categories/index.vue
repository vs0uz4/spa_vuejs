<script>
  import http from '@/service/http'

  export default {
    name: 'Categories',
    data () {
      return {
        list: []
      }
    },
    async mounted () {
      const response = await http.get('/categoria')

      if (response != null) {
        this.list = response.data.categories
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
