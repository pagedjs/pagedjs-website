---
title: "Kickstarting the next iteration of Paged.js "
date: 2025-09-16
draft: true
author: "@julientaq"
class:
intro: "If you told me 10 years ago that we would restart paged.js from the office of Open Source Publishing in Brussels, I wouldn’t have believed it :)"
---

Last week, the paged.js core team kickstarted the work on the next version of paged.js.

While Fred stayed in California, Gijs and I were in the office of Open Source Publishing (OSP) in Brussels, where we did quite a lot of things around the future of paged.js. 


![We did meet!](/images/25-09-brussels.jpg)

For those who are discovering the world of CSS Print, a couple words about OSP. They are a collective who have been making books and printed stuff using the technologies of the web for a very long time. Such a long time that they even knew CSS-Regions, and even have their own web-kit implementation to support their practices and work.

Each member of OSP has been an inspiration and Paged.js wouldn’t be what it is today, if it weren’t for the love and energy they’ve put in the craft. If you don’t know what i’m talking about, a simple glance at the [osp.kitchen](https://osp.kitchen) website will give you a good example of where you could find inspiration.

I really like the symbol that paged.js *neue* starts there. Thank you for sharing your office with us. 


So let’s not spend more time, and let’s get into it.


### A quick recap of what’s on the road map.

As you may remember, Chrome is now supporting a subset of paged media specifications, most importantly margin-boxes. Unfortunately the browser only supports few of the possibilities described in the specifications: if you want to add running headers, they need to be made by hand, there is no `string-set` nor `position: running`, paged.js is still necessary for most of the book design tools we need.

When we did our proposal to NLnet to modernize paged.js, here is the list of tasks we put on ourselves.

The full roadmap will be soon available on the website.

### Use web components for reusable page elements 

Paged.js is a big application that has small functions to do a lot of things in many places, and it may be hard for folks to start contributing back. One of the best examples of this is the template which is used when creating a page: it is a very long [html string](https://github.com/pagedjs/pagedjs/blob/703297df075c6f3ba717e04c1de5315d31c3bd60/src/chunker/chunker.js#L14) that contains everything: margin boxes, content-area, footnote area, etc. 

So we decided to look at [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) to make parts of the library easier to reuse.
The first element we made is the `paged-page` component that works as a custom print preview html element. It only takes a `width` and a `height` attribute and under the hood comes with all the required css to show a preview on screen, and it generates an `@page` block to instruct the browser on how the document should be printed. In Chrome you can now have multiple page sizes within the same PDF as each page has its own size properties. 

It’s still undocumented because we’re exploring its API design: should the pages be separate components or `slots` to fill? Should we have `bleed` and `cropmarks` as custom component or are they set through an attribute?  

But we wanted to share the progress with you, so here we are: you can check the code at the component on the [github](https://github.com/pagedjs/paged-page). We’re halfway through it, and we’ll eventually have a npm package.

It has become my main setup to build cssPrint preview, and I hope you’ll enjoy playing with it.


### Use CSSOM for CSS parsing and manipulation.

As you might know paged.js relies on [css-tree](https://github.com/csstree/csstree) to convert the CSS as it is described in the standard, and as we write, into CSS supported by browsers. Browsers provide more and more API's for manipulating CSS, mosty notably the CSS Object Model, also known as CSS OM. CSS OM is like the DOM for CSS. It allows for quick CSS inspection and manipulation.

We started to explore what is possible with CSS OM by writing the CSS we'd use when making a book. Going through the CSS rules and adding, removing or changing them is so easy that it becomes fun to write CSS with javascript. (note that it’s not CSS in JS, but CSS with JS, we still want to write CSS, not adding another layer of abstraction. TLDR: it’s amazing for things too complex to write in CSS, like generative stuff, but absolutely useless to write your daily CSS). 

One of the limitations of CSS OM is that you can only access the rendered stylesheet the browser will use to draw things on the page. CSS OM seems to provide access to the styleMap the browser has constructed based on the CSS it has parsed. The browser discards or ignores declarations, selectors and syntax it doesn't support, subsequently they are not accessible through CSS OM. So for example, there is no way to access comments written in the orignal stylesheet. If a CSS declaration has an unknown or unsupported property or value the declaration does not exist in the rendered stylesheet. The browser only manages the properties, values and selectors it knows. In the case of CSSPrint, we work with features that arent’t supported by browsers yet, exactly because paged.js wants to polyfill them. `string-set`? gone. `target-counter`? nada `@footnote`? lol. Until they get included in the list of features the browser support, we can’t have access to it.

I believe that manipulating CSS in browsers is better than any preprocessing. To do so, we need to make a conversion layer that will transform a stylesheet into something the browser will understand. Which is exactly what a polyfill is, this is exactly what paged.js is doing.

This layer will be a converter that will do a good amount of work:
- convert unknown values and properties into CSS custom properties (that we often too quickly call css variables);
- replace unknown selectors into usable selectors before they get parsed by the browser.

With the possibility of having nested CSS and CSS custom properties, the amount of work is not that big, as we don’t have to rewrite everything from scratch. 


> **A word about browsers**
> As you may have seen, we’re mostly talking about Chrom(e/ium) and derivatives, and that really hurt. Because we believe that paged.js should work in any browser. To do so, we’ll first make it work in Chrome, because that’s where we have fewer features to rebuild, since we can use a lot of what’s already inside. But right after that, we’re moving toward Firefox and Safari and whatever else may appear. It’s a question of energy and *folkpower* that we can’t really go against right now. 
> But mark those words, we refuse to be one of those Chromium only tool.



### WPT Printing test

The amazing people at Weasyprint built [a tool](https://github.com/CourtBouillon/wptprint) to run the [Web Platform Test suite](https://web-platform-tests.org/) (WPT) on various tools aimed at making CSS Print. This is an amazing effort that will help all of us, so we want to take part of it. The same way we help writing new specifications we want to support the tooling that allows for better printing.

We looked at it with Guillaume from Weasyprint last week, and we’ll participate by using our knowledge to look how we can push it forward. We’ll most likely make some design work, to have improve the UX and UI, and we’ll make sure that the different version of paged.js work fine in there.


### Pagedjs.org website updates

We’re almost done with this one. You may not have seen it, but we transformed the whole setup for the website by updating to the latest [Eleventy](https://11ty.dev), and we added a multilingual system. We can now write the same post in different languages, and, if you want to participate, you can make a translation of any post (it’s a simple markdown file) and make a Github issue for it. And boom, new language added. 

We’ll be happy to see you contribute for any language. And if it’s not part of the website, you can contact us, we’ll make it happen :)

We still need to have a proper JSdoc export from paged.js repo, for developer’s documentation, <del>and we need to add RSS</del>. (done, I was tired of not having RSS, so I decided to do it before publishing the article 😄 )


### A quick look at the other tasks

#### Split out content fragmentation to its own library

The goal of this task is to get the chunker out of paged.js. The chunker is the part of the program that finds page breaks and handles the recreation of the HTML tree. Right now, it’s so intertwined with paged.js that it’s hard to reuse it without the paged.js page preview HTML structure. Our idea is that, when the chunker can chunk arbritary content into an arbitrary set of HTML elements, building tools with fragmented content in the browser becomes trivial. (For example chained blocks as we had back in the old days of CSS regions, but with a modern twist in how it would work with CSS). 

And then, we will update paged.js to use that new library. 

#### Update the fragmentation method to handle multiple break tokens

Following the previous point, we think it should be possible to have multiple content flows on the same page, with multiple break tokens this becomes much more easy than the demo we made for the EPE project (https://github.com/pagedjs/pagedjs-experiments/tree/main/--paged-parallel-flows). 



#### Tagged PDF support 

Yeah, that’s one of the hardest, but we want to provide some tagged pdf with paged.js. It’s a long term work, but we have that in mind on every step to make sure everything can work as expected.


So that’s what we did.

---

Starting in a couple of weeks, we’ll provide more frequent but smaller updates on what we’re doing and where we are, as we’re starting to look at options to support the effort on the long run. 

---

Have a great couple of weeks






