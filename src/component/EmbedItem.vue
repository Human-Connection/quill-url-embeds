<template>
  <div class="embed-item">
    {{ url }}
  </div>
</template>

<script>
  export default {
    name: 'embed-item',
    props: {
      url: {
        type: String,
        default: ''
      },
      meta: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    mounted () {
      console.log(this.meta)
    }
  }
</script>

<style scoped>
</style>
