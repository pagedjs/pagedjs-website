
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

If some folks decided to put the bravery up and jump on the 0.5beta, but most of the work you see around are made with the latest version available on npm with a simple `npm install`, the 0.4.3.

But the `main` branch on the github repo is the sources for Paged.js 0.5beta2, which come with a couple of breaking changes. Most of those came from a huge commit from @NigelCunningham, with the goal of better support for tables, and, by doing so, the possibility to have a better system for multiple break points. After testing it a bit we decided to make it the beta, and we made a mistake, we put the beta as the new `main` branch, making it quite hard to update paged.js 0.4.3. So we keep working on this beta, without really ever making it the new standard published version.

That’s this weird state we are in right now: 2 versions of paged.js, each of ’em doing some things better and other doing some things less well, and somehow, this was ok, thanks to the handlers or the hooks, this decision that Fred made years ago, when he thought that a library like this one should allow arbitrary code, without having to rewrite everything. 

All the amazing projects you can find out there using paged.js are the results of people making their own hooks, their own way of editing code, either for making things more visually pleasing, or to be more accurate in terms of microtypography. 

But this situation of multiple versions of paged.js can’t last long. If we want to push #CSSPrint forward, making it a system instead of a process at the edge of publishing, we need more: we need a way to do much more than what the specs allow us to do. 

With the friendly folks of [weasyprint](http://weasyprint.com), we started to think of a way to incubate more options, more tools, and it’s time paged.js get to that point. 

So here we are, at the edge of what could be the next set of tools to design for print, inside browsers.

## A game of changes 

Before jumping in, there are a couple of important things to say.

Paged.js update will be transparent for people who simply used the polyfill, *ie* people not making complex custom hooks and scripts to render pages how they need. If you only used CSS to make your layout, you should be fine.

If you’re running a previous book through a new version of paged.js you’ll get differences. Not only because paged.js changed, but also because Operating Systems, browsers, even fonts and graphics libraries may have changed too. One of the problem with web2print, is that the PDF is not the final form of a content but a picture at a very precise moment, made with very specific set of tools and environment. So if you want to use a specific version of paged.js and other dependencies, make sure you keep the right version for any of them in your source code. 

## About paged.js

Right now, the development of the new Paged.js is on a branch called `pagedNG`. This will soon get merged into the main branch. Paged.js beta will be moved to its own branch (called 0.5) from where only maintenance and merge request from the contributors will be done.

Releases will still be NPM releases, and you’ll still be able to work with all the versions of paged.js, unpkg.com will still give you the version you need.

Now, if you made your own hooks, we’ll need you to show us what you were doing and how to find out how to make it work better with the new set of methods, and hooks and moments. 

Please send a mail to [contact@pagedjs.org](mailto:contact@pagedjs.org) and let’s discuss how we can help you get an understanding of this new system. 

In the meantime, let’s have a look at those updates 


## Chan chan chan chan changes 


Until the upcoming version, paged.js was doing those three things in one giant script: 

1. polyfill the CSS properties that browsers doesn’t know what to do with;
2. find where and how to break the content between pages;
3. render the output as a paginated preview in the browser, ready for print.

Now, we decided to divide those in three different modules, that you can run as part of paged.js or in your own system:

### CSS transformers

One of the most magical thing a developer can feel when working for the web, or for a browser, is how resilient that thing is. A CSS stylesheet will always be read by the browser, and it will always try to get the better out of what it finds. You made a mistake in your code? Something not expected? Don’t worry, it will simply ignore that line, and keep working with the rest of the code. I would be quite surprise if the majority of the CSS files on the web wasn’t coming with a bunch of typos. 

To be able to do that, the browser runs the stylesheet through some kind of validation system. If the CSS property is unknown, it gets removed. If the value of a property doesn’t match the implemented specs, it’s removed. It keeps only what it understand, it’s brilliant 

Until you want to use CSS that browser doesn’t allow yet. 

Like `@footnotes`. If you try to have a `@page` with footnotes inside, the `@page` will be removed from your stylesheet along everything in it. Since a couple of years, we got the luxury of having access to custom properties, that we often badly called CSS variable. They are much more than that, as they can be used as variables, but also as custom CSS properties the browser will accept in the codebase. 

`CSS Transformer` is a library that can read any CSS, and replace parts of it based on a series of method: change class names, rename properties, values, generate custom properties and so on. 

We’re making it available as it’s own system. That’s the last place where CSSTree will be used in page.js, as we’re working now with the Stylesheets objects from the browser.

Check the code here: [https://github.com/pagedjs/css-transformer]()

---

### Fragmentainers

Web2print has been something inside browsers for a very long time, way before paged.js was a thing. I remember my first experiments were catalogs for home cooking lessons, and some sale catalogs for (beautiful) scarves, all made in CMS, with a very simple setup of `div` to fake pages on screen.

The only moment paged.js was needed, was when i needed to have content flowing on more than a single page, and for which you’d need to have page break in the middle of a sentence or a paragraph. 

I’ve worked on a couple of custom hooks for paged.js to allow what i called parallel-flows (it really needs a better name though). A good example is a book with different languages on the same page: 1 column for English, 1 for French, each of them being repeated on pages till the end. The only way to do that is to use paged.js to run the English content, then the French one, and then move everything back to the pages they’re supposed to be. It ends up working fine, but this is quite a certain amount of lost energy over a sinuated path, while this should be simple.

So we decided to move things around, and instead of creating page break, to create chained blocks, that would allow content to flow from one to another, without them being pages by default. Think of it as an update of what the CSS regions could have been. This is now the library paged.js uses in the background, where each block is a page. But this can be quite more: we need to think of a way to provide options for this in CSS. We really need to think about how we could made specifications for this.

Paged.js will use that fragmentainers library to define the content of each pages.

Check the code here: [ https://github.com/pagedjs/fragmentainers]()


### The paged-page web-component

We already talked about it in length [in the previous post](/posts/en/successfully-published-@pagedjspaged-page/), but let’s say that paged.js has now made it the barebone of any page generated. 

You can check the code here: [https://github.com/pagedjs/css-transformer]()

## So now,

We’re looking for beta testers.

If you wanna join, get on the train by sending [an email](contact@pagedjs.org) or join the matrix [https://matrix.to/#/!MXyruBjIrFRrfsyMDV:matrix.org?via=matrix.org]

Let’s get started (again)
