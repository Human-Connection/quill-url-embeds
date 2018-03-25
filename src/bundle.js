import Quill from 'quill'
import UrlEmbeds from './index'
Quill.register(UrlEmbeds)

let quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    urlEmbeds: {
      metaApi: 'http://localhost:8080'
    }
  },
  placeholder: 'Paste or type a url ...'
})
