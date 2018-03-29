import embedToAnchor from '../src/utils/embed-to-anchor'

test('does nothing on normal string', () => {
  expect(embedToAnchor('test')).toBe('test')
})

test('does nothing on normal a tag', () => {
  const content = `<a href="https://test.com">https://test.com</a>`
  expect(embedToAnchor(content)).toBe(content)
})

test('does nothing on normal div tag', () => {
  const content = `<div>https://test.com</div>`
  expect(embedToAnchor(content)).toBe(content)
})

test('converts embed to anchor tag', () => {
  const content = `<div data-url-embed="https://vimeo.com/70591644" contenteditable="false">
      <iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://player.vimeo.com/video/70591644/"></iframe>
    </div>`
  const result = `<a href="https://vimeo.com/70591644" target="_blank" data-url-embed="">https://vimeo.com/70591644</a>`

  expect(embedToAnchor(content)).toBe(result)
})

test('converts multiple embeds to anchor tag', () => {
  const content = `<div data-url-embed="https://test.com" contenteditable="false">
      <iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://test.com"></iframe>
    </div><div data-url-embed="https://test2.com" contenteditable="false">
      <iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://test2.com"></iframe>
    </div>`
  const result = `<a href="https://test.com" target="_blank" data-url-embed="">https://test.com</a><a href="https://test2.com" target="_blank" data-url-embed="">https://test2.com</a>`

  expect(embedToAnchor(content)).toBe(result)
})

test('converts complex html correctly', () => {
  const content = `<p>testcode</p>
    <div data-url-embed="https://test.com" contenteditable="false">
      <iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://test.com"></iframe>
    </div>
    <h1>Testheader</h1>
    <a href="https://test.com">testcode</a>
    <div data-url-embed="https://test2.com" contenteditable="false">
      <iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://test2.com"></iframe>
    </div>
    <a href="https://test.com">testcode</a>`
  const result = `<p>testcode</p>
    <a href="https://test.com" target="_blank" data-url-embed="">https://test.com</a>
    <h1>Testheader</h1>
    <a href="https://test.com">testcode</a>
    <a href="https://test2.com" target="_blank" data-url-embed="">https://test2.com</a>
    <a href="https://test.com">testcode</a>`

  expect(embedToAnchor(content)).toBe(result)
})
