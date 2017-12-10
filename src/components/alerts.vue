<script>
  export default {
    mounted () {
      this.$bus.$on('display-alert', obj => {
        const { type, message } = obj
        this.messages[type] = message
      })
      this.$bus.$on('clear-alerts', () => {
        this.messages.success = ''
        this.messages.error = ''
      })
    },
    data () {
      return {
        messages: {
          success: '',
          error: ''
        }
      }
    },
    computed: {
      shouldDisplaySuccessMessage () {
        const condicao = this.messages.success !== ''

        if (condicao) {
          setTimeout(() => {
            this.messages.success = ''
          }, 4000)
        }
        return condicao
      },
      shouldDisplayErrorMessage () {
        const condicao = this.messages.error !== ''

        if (condicao) {
          setTimeout(() => {
            this.messages.error = ''
          }, 4000)
        }

        return condicao
      }
    },
    methods: {
      close (type) {
        this.messages[type] = ''
      }
    }
  }
</script>

<template>
  <div>
    <div v-show="shouldDisplaySuccessMessage" class="alert alert-success alert-dismissible" role="alert">
      <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
      <span class="sr-only">Success:</span>
      <button @click="close('success')" class="close" type="button" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      {{ messages.success }}
    </div>

    <div v-show="shouldDisplayErrorMessage" class="alert alert-danger alert-dismissible" role="alert">
      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      <span class="sr-only">Error:</span>
      <button @click="close('error')" class="close" type="button" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      {{ messages.error }}
    </div>
  </div>
</template>
