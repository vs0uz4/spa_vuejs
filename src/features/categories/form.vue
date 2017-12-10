<script>
  import http from '@/service/http'

  export default {
    name: 'Form',
    data () {
      return {
        category: {
          id: 0,
          name: ''
        }
      }
    },

    mounted () {
      this.fetch()
    },

    watch: {
      '$route' () {
        if (this.$route.params.id != null) {
          this.fetch()
        }
      }
    },

    methods: {
      async fetch () {
        const { id } = this.$route.params

        if (id != null) {
          const response = await http.get(`/categoria/${id}`)
          this.category = response.data.category
        }
      },
      async submit () {
        const verb = this.isNew ? 'post' : 'put'
        const { category } = this
        const response = await http[verb]('/categoria', category)
        if (response != null) {
          this.category.id = response.data.category.id
          const category = { ...this.category }

          this.$emit('update-category-list', { category })
          this.$bus.$emit('display-alert', {
            type: 'success',
            message: 'Categoria Salva com Sucesso!'
          })
        }
      }
    },

    computed: {
      isNew () {
        return this.category.id === 0
      }
    }
  }
</script>

<template>
  <form @submit.prevent="submit" class="well">
    <div class="form-group">
      <label class="control-label">Nome</label>
      <input v-model="category.name" class="form-control" type="text">
    </div>
    <div class="text-right">
      <button class="btn btn-primary btn-xs" type="submit"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Salvar</button>
    </div>
  </form>
</template>
