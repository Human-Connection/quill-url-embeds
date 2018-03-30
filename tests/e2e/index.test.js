import { Selector } from 'testcafe';

fixture(`Index page`)
  .page('http://localhost:8080');

const editorSel = '.ql-editor'

test('editor is working', async t => {
    await t
      .typeText(editorSel, 'test');

    const editor = await Selector(editorSel);
    let editorContent = await editor.innerText;
    await t.expect(editorContent).contains('test');
});

test('a link is converted to embed', async t => {
    const url = 'https://medium.com';
    await t
      .typeText(editorSel, url)
      .pressKey('enter');

    const editor = await Selector(editorSel).addCustomDOMProperties({
        innerHTML: el => el.innerHTML
    });
    let editorContent = await editor.innerHTML;
    await t
      .expect(editorContent)
      .contains(`<div class="url-embed" data-url-embed="${url}" contenteditable="false">`);
});