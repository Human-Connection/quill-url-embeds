<template>
  <div class="ql-video-embed">
    <iframe :src="embedUrl"
      frameborder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen></iframe>
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
    },
    computed: {
      embedUrl () {
        if (this.meta.site_name === 'Vimeo') {
          return this.meta.player.url
        }
        if (this.meta.site_name === 'YouTube') {
          const videoUrl = this.meta.url.split('watch?v=')[1]
          return `https://www.youtube.com/embed/${videoUrl}?feature=oembed`
        }
        return ''
      }
    }
  }
</script>

<style lang="scss">
  .ql-video-embed {
    position: relative;
    width: 100%;
    padding-top: 56%;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      border: 0;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
