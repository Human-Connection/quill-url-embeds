import Quill from 'quill'
import { urlEmbed, urlEmbedModule, utils } from './index'
Quill.register({
  'blots/urlEmbed': urlEmbed,
  'modules/urlEmbeds': urlEmbedModule
})

// eslint-disable-next-line
let quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    urlEmbeds: {
      metaApi: 'http://localhost:3050'
    }
  },
  placeholder: 'Paste or type a url ...'
})

/*
quill.setContents([
  {
    insert: 'https://vimeo.com/70591644',
    attributes: {
      link: 'https://vimeo.com/70591644'
    }
  },
  { insert: '\n' }
])
*/

/*
quill.on('text-change', (delta, oldDelta, source) => {
  const el = document.getElementsByClassName('ql-editor')
  const content = el[0].innerHTML
  const sanitized = utils.embedToAnchor(content)
  console.log(sanitized)
  const rendered = utils.anchorToEmbed(sanitized)
  console.log(rendered)
})
*/
