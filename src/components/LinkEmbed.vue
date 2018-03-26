<template>
  <div class="ql-link-embed">
    <a :href="meta.url" target="_blank" class="ql-embed-link">
      <span class="ql-embed-content">
        <span class="ql-embed-description">{{ description }}</span>
        <span class="ql-embed-source">
          <source-icon :icon="meta.icon.any" />
          <small class="ql-embed-publisher">{{ publisher }}</small>
        </span>
      </span>
      <span class="ql-embed-image">
        <source-image :image="meta.image.url" />
      </span>
    </a>
  </div>
</template>

<script>
  import SourceIcon from './SourceIcon.vue'
  import SourceImage from './SourceImage.vue'
  import truncate from 'lodash/truncate'

  export default {
    name: 'ql-link-embed',
    components: {
      SourceIcon,
      SourceImage
    },
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
      description () {
        return truncate(this.meta.description, { length: 256 })
      },
      publisher () {
        return this.meta.site_name || truncate(this.meta.url, { length: 64 })
      }
    }
  }
</script>

<style lang="scss">
  .ql-link-embed {
    .ql-embed-link,
    .ql-embed-link:link,
    .ql-embed-link:hover {
      color: gray;
      text-decoration: none;
    }

    .ql-embed-link {
      display: flex;
      position: relative;
      background-color: #FBFAFA;
      border: 1px solid #EEEDED;
      font-size: 0.9em;
      max-height: 200px;
    }

    .ql-embed-content {
      width: 70%;
      flex: 0 0 70%;
      padding: 15px;
      display: flex;
      flex-direction: column;
    }

    .ql-embed-description {
      flex: 1 1 0;
    }

    .ql-embed-source {
      margin-top: 15px;
      display: flex;
      align-items: center;
    }

    .ql-embed-image {
      width: 30%;
      flex: 0 0 30%;
      padding: 15px;
      background-color: #ccc;
    }
  }
</style>
