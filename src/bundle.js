import Quill from 'quill'
import Parchment from 'parchment'
import { urlEmbed, urlEmbedModule } from './index'
Quill.register({
  'blots/urlEmbed': urlEmbed,
  'modules/urlEmbeds': urlEmbedModule
})
Parchment.register(urlEmbed)

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
