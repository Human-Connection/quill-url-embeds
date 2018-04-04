import Quill from 'quill'
import { urlEmbed, urlEmbedModule } from '~/index'
const metaApi = 'http://localhost:3050'

Quill.register({
  'blots/urlEmbed': urlEmbed,
  'modules/urlEmbeds': urlEmbedModule({
    metaApi
  })
})

// eslint-disable-next-line
let quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    urlEmbeds: {}
  },
  placeholder: 'Paste or type a url ...'
})
