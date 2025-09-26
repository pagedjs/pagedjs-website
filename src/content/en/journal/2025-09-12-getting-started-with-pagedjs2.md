---
title: "Under new management"
date: 2025-09-16
draft: true
author: "@julientaq"
class:
intro: "We’re getting started on paged.js next!"
---

Hi folks!

Last week, paged.js core team kickstarted the work on the next version of paged.js.

While Fred stayed in California, Gjis and I were in the office of Open Source Publishing in Brussels, where we did quite a lot of things, around paged.js future. 

For those who are discovering the world of CSS Print, a couple words about OSP. Open Source Publishing is a collective that have been making books and printed stuff using the technologies of the web for a very long time. Such a long time that they even knew CSS-Regions, and even had their own web-kit implementation to support their practices and work.

Each member of OSP has been an inspiration and Paged.js wouldn’t be what it is today, if it weren’t for the love and energy they’ve put in the craft. If you don’t know what i’m talking about, a simple glance at the [osp.kitchen](https://osp.kitchen) website will give you a good example of where you could find inspiration.

I really like the symbol that paged.js *neue* starts there. Thank you for sharing your office with us. 


So let’s not spend more time, and let’s get into it.


### A quick recap of what’s on the road map.

As you may remember, Chrome is now supporting a subset of paged media specifications and especially margin-boxes. But the browser support very little of all the possibilities: if you want some running headers, they need to be made by hand, there is no string-set, nor position running, paged.js is still needed for most of the book design tools we need.

When we did our proposal to NLnet to modernize paged.js, here is the list of tasks we put on ourselves.

The full roadmap will be soon available on the site.

### Use web components for reusable page elements 

Paged.js is a big application that has small functions to do a lot of things in many places, and it may be hard for folks to start contributing back. One of the best example of that is the template for creating new page, that is a very long html string that contains everything: margin boxes, content-area, footnote area, etc. 

So we decided to look at web component to make reusable bit more reusable. 
And the first element we made is a `paged-page` component that work as a custom html element you can use if you want to have a proper print preview. It takes a `width` and a `height` attribute, and, it comes with all the needed css to handle print and preview. Each component has its own size: if you’re using chrome, you can now have multiple page size in the same PDF. 

It’s still undocumented because we’re looking at options to handle the properties of the pages: for example, should they be component or `slot` to fill? Should we have `bleed` and `cropmarks` as custom component?  

But we wanted to share the progress with you, so here we are: you can check the code at the component on the [github](https://github.com/pagedjs/paged-page). We’re halfway through it, and we’ll eventually have a npm package.

It has become my main setup to build cssPrint preview, and i hope you’ll enjoy playing with it.


### Use CSSOM for CSS parsing and manipulation.

As you may know, paged.js relies on css-tree for all the stylesheet manipulation. While this has been quite useful over the years, it seems that browsers have now some sort of standards tools for manipulating CSS, the CSS Object Model, also known as CSS OM. 


CSS OM is like the DOM for CSS. It comes with a good variety of functions and method that allows for quick CSS manipulation.

So we did start the work of testing what was possible with CSS OM. Going through the CSS, finding rules, adding rules is so easy that it becomes fun to write CSS with javascript. (note that it’s not CSS in js, but CSS with JS, we still want to write CSS, not adding another layer of abstraction. TLDR: it’s amazing for things to complex to write in CSS, like generative stuff, but absolutely useless to write your daily CSS). 

One of the limitation of cssOM is that you can only access the rendered stylesheet, the one the browser will use to draw things on the page. For example, there are no comments in that final CSS.

Worse, if a css line has an unknown property or value, then the line does not exist in the stylesheet, and the browser only manage the properties it knows. In the case of CSSPrint, we work with things that doesn’t exist yet in the browser, therefore, they just get removed. `string-set`? gone. `target-counter`? nada `@footnote`? lol.

Until they get included in the list of features the browser support, we can’t have access to it.

I believe that manipulating CSS in browsers is better than any preprocessing. To do so, we need to make a conversion layer that will transform a stylesheet into something the browser would understand. Which is exactly what a polyfill is, this is exactly what paged.js is doing.

This layer will be a converter that will do a good amount of work:
- convert unknown values and property into CSS custom properties(that we too quickly call css variables);
- replace unknown selector into usable selectors before it get read by the browser.

With the possibility of having nested CSS and CSS custom properties, the amount of work is not that big, as we don’t have to rewrite everything from scratch. 


> ** A word about browser**

> As you may have seen, we’re mostly talking about Chromium and derivative, and that really hurt. Because we believe that paged.js should work in any browser. To do so, we’ll first make it work in Chrome, because that’s where we have fewer features to rebuild, since we can use a lot of what’s already inside. But right after that, we’re moving toward Firefox and Safari and whatever else may appear. It’s a question of energy and *folkpower* that we can’t really go against right now. 

But mark those words, we refuse to be one of those Chromium only tool.


### WPT Printing test

The amazing people at Weasyprint started to build a tool to use the test from the web platform (the WPT) to test the different software that makes CSS Print. This is an amazing effort that will help all of us, so we want to take part of it. The same way we help writing new specifications we want to support the tooling that allow for better printing.

We looked at it with Guillaume from Weasyprint last week, and we’ll participate by using our knowledge to look how we can push it forward. We’ll most likely make some design work, to have a proper UX and UI, and we’ll make sure that the different version of paged.js work fine in there.


### Pagedjs.org website updates

We’re almost done with this one. You may not have seen it, but we transformed the whole setup for the website by updating to the latest [Eleventy](https://11ty.dev), and we added a multilingual system. We can now write the same post in different languages, and, if you want to participate, you can make a translation of any post (it’s a simple markdown file) and make a Github issue for it. And boom, new language added. 

We’ll be happy to see you contribute for any language. And if it’s not part of the website, you can contact us, we’ll make it happen :)

We still need to have a proper JSdoc export from paged.js repo, for developer’s documentation, and we need to add RSS. (done, i was tired of not having RSS, so I decided to do it before publishing that article 😄 )


### A quick look at the other tasks

#### Split out content fragmentation to its own library

The goal of this task is to get the chunker out of paged.js. The chunker is the part of the program that finds page breaks and handle the recreation of the HTML tree. Right now, it’s so much intertwined with all the other parts of paged.js, that it’s hard to reuse it for other things than page. Our idea is that,  if we could have the chunker running with any content on any HTML element, we could build some kind of chained blocks in the browser (or as we had back in the old days CSS regions, but with a modern twist in how it would work with CSS). 

And then, we will update paged.js to use that new library. 

#### Update the fragmentation method to handle multiple break tokens

Following the previous point, we could have multiple flows, with multiple break token much more easily than the demo we made for the EPE project (https://github.com/pagedjs/pagedjs-experiments/tree/main/--paged-parallel-flows). 



### Task 6: Tagged PDF support 

Yeah, that’s one of the hardest, but we want to provide some tagged pdf with paged.js. It’s a long term work, but we have that in mind on every step to make sure everything can work as expected.


So that’s what we did.

---

Starting in a couple of weeks, we’ll provide more frequent but smaller updates on what we’re doing and where we are, as we’re starting to look at options to support the effort on the long run. 

---


Have a great couple of weeks.






