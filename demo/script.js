var quill = new Quill('#editor', {
	theme: 'snow',
	modules: {
		urlEmbeds: {
      metaApi: 'http://localhost:8080'
    }
	},
	placeholder: 'Paste or type a url ...'
});