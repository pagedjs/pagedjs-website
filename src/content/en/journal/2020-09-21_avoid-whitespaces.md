---
title: "Avoid whitespaces on pages"
date: 2020-09-21T11:58:02+02:00
draft: false
type: post
permalink: /posts/avoid-whitespaces/
class: cookbook
author: Julie Blanc
intro: A little script to float elements and avoid large whitespaces at the end of pages.
tags:
  - page-floats
  - guide
---

A long time ago, I wrote an article about [page floats](https://www.pagedjs.org/page-floats/). Since then, we've had a lot of feedback about these CSS features that are crucial for paginated layout. We haven't yet implemented them in paged.js – because it's difficult and we need to take the time to ponder how to do. However, we are facing a recurring and urgent request regarding a specific aspect of page floats. I'm writing today to answer it :)

I'm sure you already know what I'm talking about. You know, this figure or this table that didn't fit at the end of your page? Because of how pagined medias works, if an element ends up at the bottom of a page but is too big to fit within the page height, the element is automatically pushed to the next page with a forced page break. This produces a gap, a white space, at the end of the previous page. It’s unsightly and, moreover, the reader might think that it means the end of a section.

The float properties can fix this problem, just by adding `float: top` and ` float-reference: page` on the problematic element. The following figure illustrates what this should look like:
<img src="/images/whitespace-script.png">

However, we can't use it today. I personally encounter this problem in some book design I make. So, based on a script made by [Julien](https://gitlab.coko.foundation/julientaq) I share with you a little script to make floating-like elements in paged.js to avoid large chunks of whitespace at the end of pages. For this, we add a custom module to Paged.js using [handlers and hooks](https://www.pagedjs.org/documentation/11-hooks/).

As you can see, the script is not very long. You just have to add it in your HTML document (after the paged.js script), add the class `elem-float-top` to the elements where you want it to apply, and watch the magic happen.

```javascript
let classElemFloat = "elem-float-top"; // ← class of floated elements

class elemFloatTop extends Paged.Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
    this.floatPageEls = [];
    this.token;
  }

  layoutNode(node) {
    // If you find a float page element, move it in the array,
    if (node.nodeType == 1 && node.classList.contains(classElemFloat)) {
      let clone = node.cloneNode(true);
      this.floatPageEls.push(clone);
      // Remove the element from the flow by hiding it.
      node.style.display = "none";
    }
  }

  beforePageLayout(page, content, breakToken) {
    // If there is an element in the floatPageEls array,
    if (this.floatPageEls.length >= 1) {
      // Put the first element on the page.
      page.element
        .querySelector(".pagedjs_page_content")
        .insertAdjacentElement("afterbegin", this.floatPageEls[0]);
      this.floatPageEls.shift();
    }
  }
}
Paged.registerHandlers(elemFloatTop);
```

**Note**: It's not exactly how the float page specifications work, but it's currently the easiest way to do it with Paged.js. A real `float: top` on an element should move the element to the top of the page where it is anchored. However, this would mean that the text already rendered in the page by paged.js (which is before the element) would have to be pushed to the next page, causing the text to be split again. There is currently no simple way in paged.js to re-render the page if an element in the layout is moved. For the moment, this script is the easiest way to do it.
