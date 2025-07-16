---
title: Frequently Asked Questions about Paged.js
menu: FAQ
id: faq
---

## What are the differences between `paged.js` and `paged.polyfill.js`?


Paged.js comes as two different scripts

1. `paged.js`: this version of the script let the user define the
content, the styles and the output element of paged.js, as explained in Paged.js
readme. It follows those rules: 

```javascript
let paged = new Previewer();
let flow = paged.preview(DOMContent, ["path/to/css/file.css"], document.body).then((flow) => {
	console.log("Rendered", flow.total, "pages.");
})
```

2. `paged.polyfill.js`: this version of the script is the default setup for
   paged.js: it will start as soon as the page is loaded, it will use the full
   content of the webpage, and all the styles linked to the content, and the
   output will be rendered as the replacement of the full `body` element of the
   webpage. 


Paged.js will work the same way with both scripts, the first one allows for more
customized uses.
