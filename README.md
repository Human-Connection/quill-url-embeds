# quill-url-embeds

**Important: This is a WIP, do not use it in production**

Checks for URLs during typing and pasting and automatically converts them to embeds.

Needs an REST endpoint, that provides meta infos for URLs.

## Install

```bash
npm install quill-url-embeds --save
```

## Usage

```javascript
import Quill from 'quill'
import { urlEmbed, urlEmbedModule } from './index'
Quill.register({
  'blots/urlEmbed': urlEmbed,
  'modules/urlEmbeds': urlEmbedModule
})
```

Basic usage with default configuration:

```javascript
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

After triggering meta infos for the given URL are fetched from the provided REST endpoint.

### 3. Render Embed Code

After successfully fetching the meta infos, an embed is rendered.

**Example Output:**
```html
<div data-url-embed="https://vimeo.com/70591644" contenteditable="false">
  <iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://player.vimeo.com/video/70591644/"></iframe>
</div>
```

## Utility functions

### utils.embedToAnchor

Converts embeds to a-tags.

**Usage:**

```javascript
import { utils } from 'quill-url-embeds'
utils.embedToAnchor(content)
```

**Example:**
```html
<div data-url-embed="https://vimeo.com/70591644" contenteditable="false">
  <iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://player.vimeo.com/video/70591644/"></iframe>
</div>
```
is converted to:
```html
<a target="_blank" href="https://vimeo.com/70591644">https://vimeo.com/70591644</a>
```

### utils.populator

Converts all single line a-tags of a node to embeds.

**Usage:**

```javascript
import { utils } from 'quill-url-embeds'
const populator = new utils.populator(metaApi)
populator.populate(node)
```

**Example:**
```html
<a target="_blank" href="https://vimeo.com/70591644">https://vimeo.com/70591644</a>
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
import { utils } from 'quill-url-embeds'

const sanitizeContent = (content) => {
  // Convert embeds to a-tags
  content = utils.embedToAnchor(content);

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
      a: (tagName, attribs) => {
        return {
          tagName: 'a',
          attribs: {
            href: attribs.href,
            target: '_blank'
          }
        };
      },
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

// Convert single line a-tags in #editor-content to embeds
const node = document.getElementById('editor-content')
populator.populate(node)

```




