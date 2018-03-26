<template>
  <div class="ql-video-embed">
    <div v-if="meta.embed.html" v-html="meta.embed.html"></div>
  </div>
</template>

<script>
  export default {
    name: 'ql-video-embed',
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
    }
  }
</script>

<style lang="scss">
</style>
