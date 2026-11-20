
---
title: "Breaking Pages"
date: 2026-10-05
draft: true
author: "@julientaq"
class:
intro: "Ready Set Go" 
---



Hi folks.

First, very quickly, before we get to the good news, we’d like to offer our apologies for the silence. Life has been quite complicated for us for a while (especially for me with much more doctors and hospitals involved than what we would have preferred). The results of all that is less time to work on paged.js. Thus, we decided to spend as much of it on paged.js, leaving the communication about it a bit low. 

This is a good moment to try and change that equation, so let’s have a look to what’s in store, and about to be release as alpha. 

## alpha, beta, 1.0, legacy, where the wilds things are

Some of you have decided to put up the bravery and jump on the 0.5beta, but most of the work we've seen around use  version 0.4.3 (latest) available on npm with a simple `npm install`.

So, event though 0.4.3 is the most common version of paged.js, the `main` branch on the github repo is the source for paged.js 0.5beta2, which comes with a couple of breaking changes. Most of those came from a huge commit by @NigelCunningham, with the goal of better support for tables, and, by doing so, the possibility to have a better system for multiple break points. After testing it a bit we decided to make it the beta, and we made the mistake of making this beta the new `main` branch, rendering it quite hard to update paged.js 0.4.3. While we keep working on this beta, giving the breaking changes, we do not expect to make it the latest version.

That’s this weird state we are in right now: two versions of paged.js, each of them doing some things better than the other. And somehow this was ok, thanks to the handlers or the hooks, this decision that Fred made years ago, when he thought that a library like this one should allow arbitrary code, without having to rewrite everything. 

Many of the amazing projects you can find out there using paged.js are the result of people making their own hooks. Extending the functionality of paged.js, for example to make things more visually pleasing, or to be more accurate in terms of microtypography. 

But this situation of multiple versions of paged.js can’t last long. If we want to push #CSSPrint forward, making it a system instead of a process at the edge of publishing, we need more: we need a way to do much more than what the specs allow us to do. 

With the friendly folks of [weasyprint](http://weasyprint.com), we started to think of a way to incubate more options, more tools, and it’s time paged.js get to that point. 

So here we are, at the edge of what could be the next set of tools to design for print, inside browsers.

## A game of changes 

Before jumping in, there are a couple of important things to say.

Paged.js update will be transparent for people who simply used the polyfill, *ie* people not making complex custom hooks and scripts to render pages how they need. If you only used CSS to make your layout, you should be fine.

If you’re running an old project through a new version of paged.js and compare the resulting PDF (or restructured HTML) you’ll spot differences. Not only because paged.js changed, but also because the underlying Operating Systems, browsers,  graphics libraries and even fonts might have changed too. One of the problem with web2print, is that the PDF (or restructured HTML) is but a snapshot made with a specific set of tools and environment. So if you want to use a specific version of paged.js and other dependencies, make sure you keep the right version for any of them in your source code. 

## About paged.js

Right now, the development of the new Paged.js is on a branch called `pagedNG`. This will soon be merged into the main branch. Paged.js beta will be moved into its own branch (called 0.5) from where only maintenance and merge request from the contributors will be done.

Releases will still be NPM releases, and you’ll still be able to work with all the versions of paged.js, unpkg.com will still give you the version you need.

## Chan chan chan chan changes 

Until now paged.js has worked as one giant script in which three major tasks can be recognized:

1. polyfill the CSS properties that browsers don’t know what to do with;
2. find where and how to break the content between pages;
3. render the output as a paginated preview in the browser, ready for print.

Now, we decided to divide those into three different modules, that you should be able to use indepently.

## API Changes, backwards compatibility

The new architecture, especially the fragmaintainers library, might introduce API changes. We'd like to understand how people have used and adjusted paged.js through the hooks and handlers. Therefor we'd like to collect projects we can use to test the new architecture.

If you've made your own handlers using paged.js'hooks, we’re eager to learn what you were doing and how to find out how to make it work better with the new set of methods, and hooks and moments. 

Please send a mail to [contact@pagedjs.org](mailto:contact@pagedjs.org) and let’s discuss how we can help you get an understanding of this new system. 

In the meantime, let’s have a look at those updates 

### CSS transformers

One of the most magical things a developer can feel when working for the web, or for a browser, is how resilient and permissive it is. A CSS stylesheet will always be read by the browser, and it will always try to make the most of what it finds. You made a mistake in your code? An expected property or value? Don’t worry, it will simply ignore that line, and keep working with the rest of the code. I would be quite surprised if the majority of CSS files on the web doesn’t come with a bunch of typos. 

To be able to do that, the browser runs the stylesheet through some kind of validation system. If a CSS property or a value doesn’t match the implemented specs, it is ignored. The browser only processes what it understands, it’s brilliant.

Until you want to use CSS that the browser doesn’t support yet. The [CSSOM Api](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model) allows to inspect and modify CSS using javascript. It gives access to the CSS that is applied on a page, but also allows to parse a string of CSS code. However, declarations or rules that have been ignored, or dropped, due to lack of support or bad syntax are not available through this API. This causes issues for Paged.js since the whole point of the library is to support unsupported specs.

Like [`@footnote`](https://www.w3.org/TR/css-gcpm-3/#footnote-area). If you try to declare a footnote area within a `@page` rule, the whole `@page` will be removed from your stylesheet. Since a couple of years, we got the luxury of having access to custom properties, that we often badly called CSS variables. They are much more than that, as they can be used as variables, but also as custom CSS properties the browser will accept in the codebase. 

Currently Paged.js uses [CSSTree](https://github.com/csstree/csstree) to parse CSS indepently from the browser. For maintainability we've been looking for ways to replace it with native API's.

`CSS Transformer` is a library that can read any CSS, and replace parts of it with supported CSS syntax using several strategies: change class names, rename properties, values, generate custom properties and so on. Within paged.js it will act as a preprocessor transforming unsupported syntax into CSS which can be accessed later in the process through CSSOM.

We’re making it available as a standalone library. For now it is the last place where CSSTree will be used in paged.js, as we’re working now with the CSSStylesheets objects from the browser.

Check the code here: <https://github.com/pagedjs/css-transformer>

---

### Fragmentainers

Web2print has been something inside browsers for a very long time, way before paged.js was a thing. I remember my first experiments were catalogs for home cooking lessons, and some sales catalogs for (beautiful) scarves, all made in a CMS, with a very simple setup of `<div>`'s to fake pages on screen. The only moment paged.js was needed, was when I needed to have content flowing on more than a single page, and needed a page break in the middle of a sentence or a paragraph. 

I’ve worked on a couple of custom hooks for paged.js to allow for what I call parallel-flows (it really needs a better name though). A good example is a book with different languages on the same page: one column for English, one for French, each of them being repeated on pages till the end. The only way to do that using paged.js is to run the English content, then the French one, and then move everything back to the pages they’re supposed to be. It ends up working fine, but this is quite a certain amount of lost energy over a sinuated path. As this is a common layout for paged media it should be more simple.

As mentioned before in this post the commit by @NigelCunningham introduces multiple breakpoints: It makes paged.js aware some elements are rendered next to each other rather than below each other. Put differently an element might be rendered next to an element that has been defined earlier in the HTML-file. In a `<table>` for example, but also when using CSS Grid, flexbox or `position: float`. So far, paged.js assumed a single flow content. As soon as it detected content overflowing the page boundaries it would close the page and start a new one. Yielding in broken tables and widowed `floats`.

The `fragmentainers` library is a Javascript fragmentation engine to split content across bounded containers (fragmentainers). It implements the CSS Fragmentation model and CSS Paged Media breaks, inspired by browser layout engines internal block fragmentation architecture. The library allows for different layout algorithms and comes with support for tables, flexbox and CSS Grid. 

In addition it allows users to define their own. For example to create chained blocks, that would allow content to flow from one to another, without them being pages by default. Think of it as an update of what the CSS regions could have been. This is now the library paged.js uses in the background, where each block is a page. But this can be quite more: we need to think of a way to provide options for this in CSS. We really need to think about how we could made specifications for this.

Paged.js will use that fragmentainers library to define the content of each pages.

Check the code here: <https://github.com/pagedjs/fragmentainers>


### The paged-page web-component

We already talked about it in length [in the previous post](/posts/en/successfully-published-@pagedjspaged-page/), but let’s say that paged.js has now made it the barebone of any page generated. 

You can check the code here: <https://github.com/pagedjs/css-transformer>

## So now,

We’re looking for beta testers.

If you wanna join, get on the train by sending [an email](contact@pagedjs.org) or join the matrix <https://matrix.to/#/!MXyruBjIrFRrfsyMDV:matrix.org?via=matrix.org>

Let’s get started (again)
