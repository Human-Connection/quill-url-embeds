import cheerio from 'cheerio'

// Todo: find tags by class
const anchorToEmbed = (content) => {
  const $ = cheerio.load(content)
  $('body > a, body > p > a:only-child').each((i, el) => {
    let url = el.attribs['href']
    let tag = $(`<div data-url-embed="${url}" class="url-embed" contenteditable="false">${url}</div>\n`)
    let replaceEl = $(el).parents('p').length > 0 ? $(el).parents('p') : el
    $(replaceEl).replaceWith(tag)
  })
  return $('body').html()
}

export default anchorToEmbed
