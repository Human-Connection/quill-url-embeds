import Delta from 'quill-delta'
import axios from 'axios'

const defaults = {
  // Only match single line urls
  urlRegex: /^https?:\/\/[\S]+$/gm
}

class UrlEmbeds {
  constructor (quill, options) {
    this.quill = quill
    options = options || {}
    this.options = {...defaults, ...options}
    this.registerTypeListener()
    this.registerPasteListener()
  }
  registerPasteListener () {
    this.quill.clipboard.addMatcher(Node.TEXT_NODE, async (node, delta) => {
      if (typeof node.data !== 'string') {
        return
      }
      const matches = node.data.match(this.options.urlRegex)
      if (matches && matches.length > 0) {
        const newDelta = new Delta()
        let str = node.data
        await matches.forEach(async url => {
          const split = str.split(url)
          const beforeLink = split.shift()
          const urlEmbed = await this.buildUrlEmbed(url)
          newDelta.insert(beforeLink)
          newDelta.insert(urlEmbed)
          str = split.join(url)
        })
        newDelta.insert(str)
        delta.ops = newDelta.ops
      }
      return delta
    })
  }
  registerTypeListener () {
    this.quill.on('text-change', (delta) => {
      let ops = delta.ops
      // Only return true, if last operation includes whitespace inserts
      // Equivalent to listening for enter, tab or space
      if (!ops || ops.length < 1 || ops.length > 2) {
        return
      }
      let lastOp = ops[ops.length - 1]
      if (!lastOp.insert || typeof lastOp.insert !== 'string' || !lastOp.insert.match(/\s/)) {
        return
      }
      this.checkTextForUrl()
    })
  }
  checkTextForUrl () {
    let sel = this.quill.getSelection()
    if (!sel) {
      return
    }
    let [leaf] = this.quill.getLeaf(sel.index)
    if (!leaf.text) {
      return
    }
    console.log(leaf.text)
    const matches = leaf.text.match(this.options.urlRegex)
    if (!matches || !matches.length) {
      return
    }
    let stepsBack = leaf.text.length
    let index = sel.index - stepsBack
    this.textToUrl(index, matches[0])
  }
  async textToUrl (index, url) {
    const urlEmbed = await this.buildUrlEmbed(url)
    const ops = new Delta()
      .retain(index)
      .delete(url.length)
      .insert(urlEmbed)
    this.quill.updateContents(ops)
  }
  async buildUrlEmbed (url) {
    let embed = {
      urlEmbed: {
        url: url
      }
    }
    let { data } = await this.getMetaInfo(url)
    console.log(data)
    embed.urlEmbed.html = data.embed && data.embed.html
      ? data.embed.html : '<p>no embed html found</p>'
    return embed
  }
  async getMetaInfo (url) {
    const requestUrl = `${this.options.metaApi}/embeds?url=${url}`
    const response = await axios.get(requestUrl)
    return response
  }
}

export default UrlEmbeds