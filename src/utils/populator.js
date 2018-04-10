import axios from 'axios'
import Vue from 'vue'
import anchorToEmbed from '~/utils/anchor-to-embed'
import EmbedItem from '~/components/EmbedItem.vue'
Vue.component(EmbedItem)

class Populator {
  constructor (metaApi) {
    this.metaApi = metaApi
  }
  async populate (node) {
    let content = node.innerHTML
    console.log('before anchorToEmbed', content)
    content = anchorToEmbed(content)
    console.log('after anchorToEmbed', content)
    node.innerHTML = content
    console.log('after reassigned innerHTML', node.innerHTML)
    const embeds = node.querySelectorAll('div[data-url-embed]')
    if (!embeds || !embeds.length) {
      return
    }
    await embeds.forEach(async embed => {
      // already has embed component
      if (embed.children && embed.children.length) {
        return
      }
      const url = embed.dataset.urlEmbed
      const { data } = await this.getMetaInfo(url)
      const embedDiv = document.createElement('div')
      embed.innerHTML = ''
      embed.appendChild(embedDiv)
      // eslint-disable-next-line
      const embedComponent = new Vue({
        el: embedDiv,
        render (createElement) {
          return createElement(EmbedItem, {
            props: {
              url,
              meta: data
            }
          })
        }
      })
    })
    console.log('after populate', node.innerHTML)
  }
  async getMetaInfo (url) {
    url = encodeURIComponent(url)
    const requestUrl = `${this.metaApi}/embeds?url=${url}`
    const response = await axios.get(requestUrl)
    return response
  }
}

export default Populator
