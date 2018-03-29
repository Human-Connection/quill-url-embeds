import Delta from 'quill-delta'
import Populator from '~/utils/populator'

const defaults = {
  // Only match single line urls
  urlRegex: /^https?:\/\/[\S]+$/gm
}

class UrlEmbeds {
  constructor (quill, options) {
    this.quill = quill
    options = options || {}
    this.options = {...defaults, ...options}
    this.populator = new Populator(options.metaApi)
    this.registerTypeListener()
    this.registerPasteListener()
    this.registerInitListener()
  }
  registerPasteListener () {
    this.quill.clipboard.addMatcher(Node.TEXT_NODE, (node, delta) => {
      if (typeof node.data !== 'string') {
        return
      }
      const matches = node.data.match(this.options.urlRegex)
      if (matches && matches.length > 0) {
        const newDelta = new Delta()
        let str = node.data
        matches.forEach(url => {
          const split = str.split(url)
          const beforeLink = split.shift()
          const urlEmbed = this.buildUrlEmbed(url)
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
    this.quill.on('text-change', (delta, oldContents, source) => {
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
  registerInitListener () {
    this.quill.once('editor-change', () => {
      setTimeout(() => {
        this.populator.populate(this.quill.container.firstChild)
      }, 1)
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
  buildUrlEmbed (url) {
    const embed = {
      urlEmbed: {
        url: url,
        html: url
      }
    }
    setTimeout(() => {
      this.populator.populate(this.quill.container.firstChild)
    }, 1)
    return embed
  }
}

export default UrlEmbeds
