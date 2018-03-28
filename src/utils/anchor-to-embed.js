import cheerio from 'cheerio'

const anchorToEmbed = (content) => {
  const $ = cheerio.load(content)
  $('a[data-url-embed]').each((i, el) => {
    let url = el.attribs['href']
    let tag = $(`<div data-url-embed="${url}" class="url-embed" contenteditable="false">${url}</div>\n`)
    $(el).replaceWith(tag)
  })
  return $('body').html()
}

export default anchorToEmbed
