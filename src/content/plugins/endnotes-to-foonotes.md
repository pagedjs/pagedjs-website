---
title: "Endnotes to footnotes"
pagedjsversion: "min: 0.2.0"
intro: Move your end notes to footnotes!
plugin:
  name: endnotes to footnotes
  filename: "pagedjs-endnotesToFootnotes"
---

If you're using pandoc to produce documents, you may find it helpful to convert endnotes into footnotes. Fortunately, this script can help you do just that!

You'll need to specify the elements to look for by assigning the query to `endNoteCalloutsQuery`. Here's an example of how to do that:

```js
const endNoteCalloutsQuery = ".footnote-ref";
```

This script will then locate all the footnote links and recreate the corresponding spans, placing them in the correct location within the content.

Once the footnotes have been converted, you can use the following CSS to style them:

```css
.pagedjs-end-to-footnote {
  float: footnote;
}

/* define the position of the footnote on the page (only bottom is possible for now) */

@page {
  @footnote {
    float: bottom;
  }
}

::footnote-call {
  color: red;
  font-weight: 400;
  line-height: 0;
}

::footnote-marker {
  color: red;
  font-weight: 400;
  line-height: 0;
}
```

To use the script, simply add it to your header after pagedjs has been called:

```html
<script src="{{ "https://pagedjs.org/plugins/" | url }}{{plugin.filename}}"></script>
```

And that's it! With this script, converting endnotes to footnotes is a breeze.
