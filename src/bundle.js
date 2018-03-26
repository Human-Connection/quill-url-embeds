import Quill from 'quill'
import './index'

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
