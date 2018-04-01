# quill-url-embeds

**Important: This is a WIP, do not use it in production**

Checks for URLs during typing and pasting and automatically converts them to embeds.

## Prerequisites
 

Setup an instance of [embed-api](https://github.com/Human-Connection/Embed-API) to provide a REST endpoint for local development or on your production server.

## Install

```bash
npm install quill-url-embeds --save
```

## Usage

```javascript
import Quill from 'quill'
import { urlEmbed, urlEmbedModule } from 'quill-url-embeds'
Quill.register({
  'blots/urlEmbed': urlEmbed,
  'modules/urlEmbeds': urlEmbedModule
})

const quill = new Quill(editor, {
  modules: {
    urlEmbeds: {
      metaApi: 'http://your.metainfo.rest.service'
    }
  }
});
```

## Behaviour

### 1. Check for URLs

This module checks for URLs that are inserted on single lines.

**Examples that *will* trigger embeds:**

```html
Check this out:
https://vimeo.com/70591644
```

```html
https://vimeo.com/70591644
This is awesome.
```

**Examples that *will not* trigger embeds:**
```html
Check this out: https://vimeo.com/70591644
```
```html
https://vimeo.com/70591644 is awesome.
```

### 2. Fetch Meta Infos

After triggering, meta info for the given URL is fetched from the provided REST endpoint.

### 3. Render Embed Code

After successfully fetching the meta info, an embed is rendered.

**Example Output:**
```html
<div data-url-embed="https://vimeo.com/70591644" contenteditable="false">
  <iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://player.vimeo.com/video/70591644/"></iframe>
</div>
```

## Utility functions

### utils.embedToAnchor

Converts embeds to a-tags.

**Client Usage:**

```javascript
import { utils } from 'quill-url-embeds'
utils.embedToAnchor(content)
```

**Server Usage:**

```javascript
import embedToAnchor from 'quill-url-embeds/dist/embed-to-anchor'
embedToAnchor(content)
```

**Example:**
```html
<div data-url-embed="https://vimeo.com/70591644" contenteditable="false">
  <iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://player.vimeo.com/video/70591644/"></iframe>
</div>
```
is converted to:
```html
<a target="_blank" href="https://vimeo.com/70591644" data-url-embed="">https://vimeo.com/70591644</a>
```

### utils.populator

Converts all single line a-tags inside a DOM node to embeds.

**Usage:**

```javascript
import { utils } from 'quill-url-embeds'
const populator = new utils.populator(metaApi)
populator.populate(node)
```

**Example:**
```html
<a target="_blank" href="https://vimeo.com/70591644" data-url-embed="">https://vimeo.com/70591644</a>
```
is converted to:
```html
<div data-url-embed="https://vimeo.com/70591644" contenteditable="false">
  <iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://player.vimeo.com/video/70591644/"></iframe>
</div>
```

##Security

In order to secure your application against XSS attacks it is necessary to sanitize the editor content before saving it. To achieve this we need a few extra steps in managing the data.

This module provides some utility functions to help making the process as smooth as possible.

### 1. Sanitize editor content

Content sanitizing needs to be handled in your backend.

**Example:**

This example uses [sanitize-html](https://www.npmjs.com/package/sanitize-html), so be sure to install it first:
```bash
npm install sanitize-html --save
```

```javascript
import sanitizeHtml from 'sanitize-html'
import embedToAnchor from 'quill-url-embeds/dist/embed-to-anchor'

const sanitizeContent = (content) => {
  // Convert embeds to a-tags
  content = embedToAnchor(content);

  // Sanitize content
  content = sanitizeHtml(content, {
    allowedTags: ['img', 'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'pre', 'ul', 'li', 'ol', 'span'],
    allowedAttributes: {
      a: ['href', 'target', 'data-*'],
      img: [ 'src' ]
    },
    parser: {
      lowerCaseTags: true
    },
    transformTags: {
      i: 'em',
      b: 'strong'
    }
  });
  
  return content;
}
```

### 2. Render sanitized content

In your frontend you need to populate the sanitized content with embed code. (Note: Quill will do this for it's own content after initialization)

**Example:**

```javascript
import { utils } from 'quill-url-embeds'

const metaApi = 'http://your.metainfo.rest.service'
const populator = new utils.populator(metaApi)

// Convert a-tags in #editor-content to embeds
const node = document.getElementById('editor-content')
populator.populate(node)

```

## Development

Setup a standalone version of this module + quill for local development:

1. Make sure you have [yarn](https://yarnpkg.com) installed.

2. Clone this repo
   ``` bash
   $ git clone https://github.com/Human-Connection/quill-url-embeds
   ```

3. Install your dependencies
   ``` bash
   $ cd ./quill-url-embeds
   $ yarn
   ```
   
4. Start development
   ``` bash
   $ yarn dev
   ```




