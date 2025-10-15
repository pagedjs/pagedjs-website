---
title: "Travelling in cascading style sheet"
date: 2025-10-15
draft: true
author: "@julientaq"
class:
intro: "If CSS was a game, it would be the game of Go: as simple as it needs to be and as poweful as it can be. We love CSS. And we want to make a lot with it, and to do so, we need to be able to expand it a little" 
---

The work of pagedjs as a polyfill is simple, it needs to read the css and transform it to show on screen a preview of what you’ll print, and actually print the preview, chuncking the content into pages.

Seems pretty easy, but like always, the devil, the details and all that. 

So the first decision Fred made at the beginning was to use a preprocessing tool to read, transform and update the CSS. At that time, it wasn’t a bad idea. CSSTree is after all a great tool to parse and manipulate CSS and get what we need from it. 

The real issue came when browsers started to support CSS they didn’t before, like the `@margin` or using css `custom-properties` (that we wrongfully name `css-variable`) for printing value, like the size of the printed page.

To support that, we need to update the way we parse the CSS, and this can be done in two ways.

The first path, is to update our implementation of CSS Tree to support more features, and fix some of the issues, and stabilize the code.

The second path is to look at this new standard sets of API named CSS Object Model, *aka* CSS OM. 

So let’s not haste the decision too much, and let’s have a look at CSSOM.

## An object Model for CSS 

The CSSOM is a set of APIs that gives us some ways to manipulate CSS with javascript (the real `css-in-js`). For the CSS model, a `style` or a `link` element is a `stylesheet`, a specific js object with instances and properties, that contains `cssRule` that haves `selectors` and `styleMap` which contains the properties and values of the CSS declaration.

And since it’s available in the browser, we get a CSS parser for free, with a model that feels like home for someone who knows CSS.

Feels like magic and perfect, therefore there must be a catch, and there is one indeed.

One of the most amazing things with the browsers is that if you’re writing some bad CSS or some bad CSS, it will find a way to show what it understands on screen. To do that, the browser simply drops the CSS it doesn’t know about. 

Until a couple of months ago, when Chrome was parsing this:

```css
@page {
    @bottom-right {
        content: page;
    }
}
```

it was reading that:

```css
@page { }
```

Yes, that’s right, all the CSS the browser doesn’t know about gets removed. As if it never was.

But there has been an update to chrome that makes it understand the `@marginRules`, which means that this example is now working in Chrome. 

What about footnote?

```css
@page {
    @footnote {
        float: footnote;
    }
}
```

It just gets removed. And don’t try to do something the browser won’t find out, you will just lose every line of code, until the browser gets updated to include that new feature.

We could go back to simply use cssTree again, but let’s not kill the idea too fast, CSS changed quite a lot, and if we mix `nested CSS` with `custom-properties`, we have almost everything to reduce the needs for preprocessing the CSS.

## The simplest solution

When paged.js has finished its job, the Css must be rid off anything that could impact the printing action from the browser. We need to remove any `@page`, `@margin-boxes` and others. 

Let’s get back to the previous example of the CSS:

```css
@page {
    @footnote {
        float: footnote;
    }
}
```

And let’s imagine how it would look like to be used in the browser today if we were to have a preview on the screen.

```css
.pagedjs-page {
  .pagedjs-footnote {
    float: var(--footnote) ;
  }
}
```

That’s it. No need for complex rewriting, or parsing impossible CSS. 

`@page` becomes `.pagedjs-page`, `@footnote` becomes `.pagedjs-footnotes`, `@bottom-right` becomes `.paged-margin-right`. And this would become available to the browser, ready to be manipulated using CSS OM: in short, if paged.js can read the stylesheet for any object at any moment in the code. 

For a very long time, i was telling everyone “Grep is life”, as i just discovered the power of regex in inDesign, and somehow, it was, but let’s be honest, the amount of possible options in a css file is so enormous, that we feel safer using a tokenizer to transform the css in a manipulable object (we’re using this one: https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/css-tokenizer). 

i started a small repo with my experiments: [https://github.com/pagedjs/pagedjs-cssom](), feel free to look at those files, but let’s be honest, it’s a bunch of undocumented experiments for now, but we’re getting somewhere.

I hope to have some things to show very quickly.

Talk very soon with hopefully happy news :) 

Oh, and i almost forgot: we’re releasing the multi-flows script we made for the EPE project that i talked about here: [https://pagedjs.org/posts/en/parallel-flows-within-paged.js/]()


i’ll talk to you in 2 weeks :)
