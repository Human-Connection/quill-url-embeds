import cheerio from 'cheerio'

const anchorToEmbed = (content) => {
  const $ = cheerio.load(content)
  $('body > a, body > p > a:only-child').each((i, el) => {
    let url = el.attribs['href']
    let tag = $(`<div data-url-embed="${url}" class="url-embed" contenteditable="false">${url}</div>`)
    $(el).replaceWith(tag)
  })
  return $('body').html()
}

export default anchorToEmbed
