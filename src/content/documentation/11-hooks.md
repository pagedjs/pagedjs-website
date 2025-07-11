---
title: "Handlers, Hooks and custom javascript"
date: 2020-01-28T16:16:50+01:00
draft: false
part: 10
id: doc-handlers
intro: "You’re now fluent in paged media specs, that quite awesome :). But you may want to do more with the scripts. Here is how you can update some of the script to do what you’d like to do."
---

Paged.js is built as a collection of module that run codes at different moments while creating the layout. This can be helpful if you want to transform long hyperlinks adresses to truncable ones before paged.js look at the content, or if you want to pass some script to balance the amount of lines your titles need once the title is put on the page.

To do that, we need to register a module, and define when its code should be processed.

## Modules

Modules are groups of handlers for that apply the layout and styles of a CSS module, such as Generated Content.

New handlers can be registered from `import { registerHandlers } from 'pagedjs'` or by calling `Paged.registerHandlers` on an html page.

```html
<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
<script>
  class MyHandler extends Paged.Handler {
    constructor(chunker, polisher, caller) {
      super(chunker, polisher, caller);
    }

    afterPageLayout(pageFragment, page) {
      console.log(pageFragment);
    }
  }
  Paged.registerHandlers(MyHandler);
</script>
```

Handlers have methods that correspond to the hooks for the parsing, layout and rendering of the Chunker and Polisher. Returning an promise or `async` function from a method in a handler will complete that task before continuing with the other registered methods for that hook.

```js
// Previewer
beforePreview(content, renderTo);
afterPreview(pages);

// Chunker
beforeParsed(content);
afterParsed(parsed);
beforePageLayout(page);
afterPageLayout(pageElement, page, breakToken);
afterRendered(pages);

// Polisher
beforeTreeParse(text, sheet);
beforeTreeWalk(ast);
afterTreeWalk(ast, sheet);
onUrl(urlNode);
onAtPage(atPageNode);
onRule(ruleNode);
onDeclaration(declarationNode, ruleNode);
onContent(contentNode, declarationNode, ruleNode);

// Layout
layoutNode(node);
renderNode(node, sourceNode);
onOverflow(overflow, rendered, bounds);
onBreakToken(breakToken, overflow, rendered);
```

### Some informations about the hooks

Here is some information about some hooks, the documentation remains to be completed. Their execution order is not quite the same as the one presented and corresponds rather to the different modules that constitute Paged.js

#### Previewer

| Hook                               |                          Hooks order                          |                                   Attributes |
| ---------------------------------- | :-----------------------------------------------------------: | -------------------------------------------: |
| `beforePreview(content, renderTo)` | Before pagedjs is launched [Warning : event does not trigger] |                                              |
| `afterPreview(pages)`              |  After PagedJS finished running (check afterRendered(pages)   | `pages` → array that contains all page nodes |
|                                    |                                                               |                                              |

#### Chuncker

| Hook                                             |                                      Hooks order                                      |                                                                                                                                                        Attributes |
| ------------------------------------------------ | :-----------------------------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `beforeParsed(content)`                          |                   runs on content before it is parsed and given IDs                   |                                                                                                          `content` → document-fragment made from the original DOM |
| `afterParsed(parsed)`                            |        runs after the content has been parsed but before rendering has started        |                                                                              `parsed` → content once parsed and given ids (data-ref and break rules from the css) |
| `beforePageLayout(page)`                         |                         runs when a new page has been created                         |                                                                                                                 `page` → node of the page that’s gonna be created |
| `afterPageLayout(pageElement, page, breakToken)` | runs after a single page has gone through layout, and allows adjusting the breakToken | `pageElement` → page element that just been rendered, <br> `page` → node of the page being rendered,<br> `breakToken` → location of the beginning of the overflow |
| `afterRendered(pages)`                           |                     runs after all pages have finished rendering                      |                                                                                                                      `pages` → array that contains all page nodes |
|                                                  |                                                                                       |                                                                                                                                                                   |
|                                                  |                                                                                       |                                                                                                                                                                   |

#### Polisher

| Hook                                                |                                        Hooks order                                         |                                                                       Attributes |
| --------------------------------------------------- | :----------------------------------------------------------------------------------------: | -------------------------------------------------------------------------------: |
| `beforeTreeParse(text, sheet)`                      | runs every time a style element or a link to a css file is called (worked also on @import) | `text` → innerText of the css, <br> `sheet` → cssTree parsed object (AST object) |
| `beforeTreeWalk(ast)`                               |                   runs before the stylesheet has been parsed by csstree                    |                                                    `ast` → csstree parsed object |
| `afterTreeWalk(ast, sheet)`                         |                    runs after the stylesheet has been parsed by csstree                    |  `ast` → csstree parsed object, <br> `sheet` → object that contains text and ast |
| `onUrl(urlNode)`                                    |                             runs any time a CSS URL is parsed                              |                                                           `urlNode` → url origin |
| `onAtPage(atPageNode)`                              |                            runs any time a CSS @page is parsed                             |                                                                                  |
| `onRule(ruleNode)`                                  |                             runs any time a CSS rule is parsed                             |                                                                                  |
| `onDeclaration(declaration, dItem, dList, rule)`    |                         runs any time a CSS declaration is parsed                          |                                                                                  |
| `onContent(contentNode, declarationNode, ruleNode)` |                       run every time a css content property is found                       |                                                                                  |
|                                                     |                                                                                            |                                                                                  |
|                                                     |                                                                                            |                                                                                  |
|                                                     |                                                                                            |                                                                                  |

#### Layout

| Hook                                           |                                         Hooks order                                         | Attributes |
| ---------------------------------------------- | :-----------------------------------------------------------------------------------------: | ---------: |
| `layoutNode(node)`                             |   When a node is layed out <br> (Tips: layoutNode is the original node from the content)    |            |
| `renderNode(node, sourceNode)`                 | When a node is rendered <br> (Tips: renderNode is the cloned node that is added to the DOM) |            |
| `onOverflow(overflow, rendered, bounds)`       |      When an element overflows: when it’s bigger than the remaining space on the page       |            |
| `onBreakToken(breakToken, overflow, rendered)` |                                When a breakToken is defined                                 |            |

## Some examples

### cleaning hyperlinks for the print

HTML5 has this unknown element called `wbr` which represents a line break opportunity, which you can translate into “I don’t have enough space to put the line of text, but thanksfully, i have those small element that i can cut!” Using this, we wouldn’t have any problem with line flowing outside of the page, or arbitrary cuts in the text that we want to avoid. Exactly what we need.

So let’s say that we have some written down hyperlinks that we want to clean and make ready for printing. Let’s create a new Paged.Handler

```js
class linkCleaning extends Paged.Handler {
  // this let us call the methods from the the chunker, the polisher and the caller for the rest of the script
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
  }

  beforeParsed(content) {
    //   Before the content is parsed by Paged.js, please do the follwing:

    // first, look for all the links <a> that are referencing a link started by http or www
    const links = content.querySelectorAll('a[href^="http"], a[href^="www"]');
    // for each of those links,
    links.forEach((link) => {
      // Break after a colon or a double slash (//) or before a single slash (/), a tilde (~), a period, a comma, a hyphen, an underline (_), a question mark, a number sign, or a percent symbol.
      const content = link.textContent;
      let printableUrl = content.replace(/\/\//g, "//\u003Cwbr\u003E");
      printableUrl = printableUrl.replace(/\,/g, ",\u003Cwbr\u003E");
      // put a <wbr> element around to define where to break the line.
      printableUrl = printableUrl.replace(
        /(\/|\~|\-|\.|\,|\_|\?|\#|\%)/g,
        "\u003Cwbr\u003E$1"
      );
      // turn hyphen in non breaking hyphen
      printableUrl = printableUrl.replace(/\-/g, "\u003Cwbr\u003E&#x2011;");
      // add a data-print-url to keep track of the previous link
      link.setAttribute("data-print-url", content);
      // modify the inner text of the link
      link.innerHTML = printableUrl;
    });
  }
}

// and we don’t forget to register the handler like this

Paged.registerHandlers(linkCleaning);
```

Calling this script right after paged.js will run it before the content is parsed.

### Adding a class to an image based on its ratio

```js
class imageRatio extends Paged.Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
  }

  afterParsed(parsed) {
    // create an array that will store the images data later on
    let imagePromises = [];
    // find all images parsed by paged.js
    let images = parsed.querySelectorAll("img");
    // for each image
    images.forEach((image) => {
      // load the image as an object
      let img = new Image();
      // test if the image is loaded
      let resolve, reject;
      let imageLoaded = new Promise(function (r, x) {
        resolve = r;
        reject = x;
      });
      // when the image loads
      img.onload = function () {
        // find its height
        let height = img.naturalHeight;

        // find its width
        let width = img.naturalWidth;

        // calculate the ratio
        let ratio = width / height;

        // if the ratio is superior than 1.4, set it as a lanscape adn add a class to the image (and to the parent figure)
        if (ratio >= 1.4) {
          image.classList.add("landscape");
          image.parentNode.classList.add("fig-landscape");
        }
        // if the ratio is inferior than 0.8, set it as a portrait adn add a class to the image (and to the parent figure)
        else if (ratio <= 0.8) {
          image.classList.add("portrait");
          image.parentNode.classList.add("fig-portrait");
        }
        // else, if it’s between 1.39 and 0.8, add a “square” class.
        else if (ratio < 1.39 || ratio > 0.8) {
          image.classList.add("square");
          image.parentNode.classList.add("fig-square");
        }
        // resolve the promise
        resolve();
      };
      // if there is an error, reject the promise
      img.onerror = function () {
        reject();
      };

      img.src = image.src;

      imagePromises.push(imageLoaded);
    });

    return Promise.all(imagePromises).catch((err) => {
      console.warn(err);
    });
  }
}

// and we register the handler

Paged.registerHandlers(imageRatio);
```

