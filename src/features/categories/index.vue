<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Categories',

    mounted () {
      this.fetch()
    },

    methods: {
      ...mapActions('categories', ['fetch', 'update', 'remove']),
      navigation (route) {
        this.$router.push({ name: route })
      },
      updateList (obj) {
        this.update(obj.category)
      },
      askRemove (category) {
        const msg = `Tem Certeza que Deseja Remover ${category.name}?`
        const confirm = window.confirm(msg)

        if (confirm) {
          this.doRemove(category.id)
        }
      },
      async doRemove (id) {
        this.remove({ id }).then((message) => {
          this.$bus.$emit('display-alert', {
            type: 'success',
            message
          })
        })
      }
    },

    computed: {
      ...mapState('categories', ['list']),
      hasCategories () {
        return this.list.length > 0
      },
      shouldDisplayNew () {
        return this.$route.name === 'categories.index'
      },
      shouldDisplayBack () {
        return this.$route.name === 'categories.form'
      }
    }
  }
</script>

<template>
  <div>
    <h2>
      <div class="row">
        <div class="col-md-6"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Categorias</div>
        <div class="col-md-6 text-right">
          <button v-show="shouldDisplayNew" @click="navigation('categories.form')" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Nova</button>
          <button v-show="shouldDisplayBack" @click="navigation('categories.index')" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Voltar</button>
        </div>
      </div>
    </h2>

    <transition name="slide-fade">
      <router-view @update-category-list="updateList"></router-view>
    </transition>

    <div class="no-categories" v-show="!hasCategories">
      <h4>Não Existem Categorias a Serem Exibidas</h4>
    </div>

    <div class="row" v-show="hasCategories">
      <div class="col-sm-6 col-md-4" v-for="category in list" :key="category.id">
        <div class="thumbnail">
          <div class="caption">
            <h3>{{ category.name }}</h3>
            <p class="text-right">
              <router-link :to="{ name: 'categories.form', params: { id: category.id } }" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</router-link>
              <a @click.prevent="askRemove(category)" href="#" class="btn btn-default btn-xs" role="button"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Excluir</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-categories {
  padding: 35px 0 35px 0;
}

.slide-fade-enter-active {
  transition: all .2s ease;
}

.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter {
  transform: translateY(10px);
  opacity: 0;
}

.slide-fade-leave-to {
  opacity: 0;
}
</style>
