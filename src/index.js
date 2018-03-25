import Quill from 'quill'
import Parchment from 'parchment'
import urlEmbed from './blot'
import urlEmbedModule from './module'

Quill.register({
  'blots/urlEmbed': urlEmbed,
  'modules/urlEmbeds': urlEmbedModule
})
Parchment.register(urlEmbed)
