---
title: "Successfully published @pagedjs/paged-page"
date: 2025-11-7
draft: true
author: "@julientaq"
class:
intro: "The work of chunking paged.js into part is underway, and today we got a lot of things to discuss, and it involves web-components" 
---


> Well, you know November has come
When it's gone away
- Gorillaz, *November has come*

Sorry for the silence, november came and with it, all the slowness of winter, which, this year, got the form of a quite strong covid. The good thing is that it’s now away, and i’m back up and running, and it’s the perfect moment to announce one of the great wins for paged.js rebuilding session we’re hard working for. 

## The benefits of a cssPrint preview

As far as i remember, i always used the browser to generate books using CSSPrint. I never got the hard experience of generating a pdf through the command line, to check the result and tweak the content, to do it again, and again. 
I got the luxury of getting into cssPrint using book.js, a project founded by Adam Hyde (like paged.js) that was using CSS Regions to generate page. You made a change on page 2, and all the book was rebuilding from there. And we could quickly try things using the inspector and everything was visible on screen. But CSS Regions were drop by the Chromium team and what was amazing just disappeared. So we didn’t update Chrome for quite a while. And WebKit followed, and everything about CSS regions disappeared. 

I ended up using a very precise Chromium under a very special Ubuntu version under a virtual machine for a long time (and we didn’t have SSD then, everything was so long). And i wasn’t the only one strugglin, even the folks at Open Source Publishing ended up making [their own fork on webkit to support their design work](blog.osp.kitchen/residency/from-webkit-to-ospkit.html). We, designers, love to experiment with our tools, and the browser is one of the most accessible setup for that. We need to make a poster? We’re gonna build our own system for previewing on screen what our HTML and CSS will render. And to do so, we spend quite a long time to figure out the HTML and CSS that will allows us to see what we’re gonna print.

But most of the time, this html and this css is litterally a simplest version of what paged.js generate to look at it on a screen. We have a `<div>` that will be the page, and that will have a CSS to handle the preview of the screen: setting the size of the `<div>` to be equal to what you’ll set in the `@page`, make sure to set the overflow accordingly, and, if you really want to reuse the system, you’re setting up a precise CSS grid, with margins, space for running head, etc.

And by the game of copy/pasting, we’re rebuilding the same thing every time we need, and it’s not fun, because we always forget a line, or get into a new bug, because copy and pasting is far from free of errors.

That’s why, when we decided to update paged.js, we decided that any bit of the library that could be reused outside will be made available as such. Today, we’re releasing the first block of this, the `<paged-page>` component. 

## But hey, what is a web-component?

HTML is made of standard tags that we all share from one web page to another. `<h1>` is a level one title, `<p>` is a paragraph and `<figure>` an element that will be understood by readers and computers, as a `figure`. Those tags come with attributes (like `id` or `class` for the most well known ones), and a behavior that has been defined by the W3C, and implemented in a similar way in all the browsers. A good example? an `<img>` tag has a `alt` attribute. This attribute give an opportunity to the author to add a description of the image that will be picked up by a screen reader and read aloud to, for example, a person with visibility issues. This behavior is described in the specs, and give some rules on how an element will work.

A web-component is a set of techonologies allowing author to write their own component.

Using javascript, a web-component will include the HTML structure (the template), the CSS (the default styles), and their own behavior (how the element will react to a user). And to use it, you’ll only need the javascript file that define all those, and then you can simply add the component where you need in your webpage.

One of my favorite web-component is a preview of a keybaord called [x-keyboard](https://onedeadkey.github.io/x-keyboard/) (and its [source](https://github.com/OneDeadKey/x-keyboard)). It’s the perfect tool to show a keybaord layout on the screen, and it will even be able to pick up what the visitor will type to and react accordingly. 

So `paged-page` is a web-component to show the preview of a printed page on the screen, following the W3C instructions used for printing.

You want to print a page with a huge text in the middle of your page?

This is the HTML you’ll write:

```
<paged-page><h1>The store will be closed for Christmas. See you in January!</h1></paged-page>
```

All the CSS for the preview, and for the print, comes with the component. This is already a win. 

And we’ve been a bit further, and added attributes to handle all the needed CSS directly from the HTML element: bleed, marks, margin, width and height are added as attributes and transfered to the CSS and the HTML.

A good thing with a web-component, is that it can be targetted quite easily: 

```css
paged-page#id {
    padding: 3em;
    background: green;
}
```

and done, your page as a padding of 3mm and a green background.

Pretty easy.









Those tags comes with attributes, and the most known example is the `<img>` tag


