
---
title: "Breaking Pages"
date: 2026-10-05
draft: true
author: "@julientaq"
class:
intro: "Ready Set Go" 
---


Hi folks.

First, very quickly, before we get to the good news, we’d like to offer our apologies for the silence. Life has been quite complicated for us for a while, with much more doctors and hospitals involved than what we would have preferred. The results of all that is a reduction of the time we could spend on paged.js. Thus, we decided to spend as much of it as possible on paged.js more than we spent communicating about it. 

This is a good moment to try and change that equation, so let’s have a look to what’s in store, and about to be release as alpha. 

## alpha, beta, 1.0, legacy, where are things gonna be?

Paged.js 0.4.3 has been the main library for most of the users around. Most of the work you can find made with paged.js was part of this.

The main branch on the gitlab repo is the sources for Paged.js 0.5beta2, which came with a couple of breaking changes that we never really manage to work out to make the beta the new main. We really didn’t want to put you all in a world of weirdness, so we manage those two branches, even though the beta was supposed to become the new main version. So it stalled for a while, and since we used npm releases, beta was only accessible if you wanted to test it, and main was the mostly used one.


That’s where we are right now: 2 versions of paged.js, each of ’em doing some things better and other doing some things less well, and somehow, this was ok because of the decision Fred made years ago, when he thought that a library like this one would need to let folks manipulate the code without having to rewrite everything, what we ended up calling hooks, or handlers. 

This allows for pagedjs manipulation and custom scripts, and more of the amazing projects you can find out there are the results of people making their own hooks, either for making things move visually pleasing, or to be more accurate in terms of microtypography. 

That was fine of a while, but if we want to push cssPrint forward, making it a system instead of a process at the edge of publishing, we need more: we need a way to do much more than what the specs allow us to do. With the friendly folks of [weasyprint](http://weasyprint.com), we started to think of a way to incubate more options, more tools, and it’s time paged.js get to that point. 

So here we are, at the edge of what could be the next set of tools to design for print, inside browsers.

## A game of changes 


Before jumping in, there are a couple of important things to say.

Paged.js update will be transparent for people who simply used the polyfill, *ie* not making complex custom hooks and scripts to render pages differently. If you used the default, keep doing it, it should be fine.

If you’re running a previous book through a new version of paged.js you’ll get differences. Not only because paged.js changed, but also because Operating systems, browsers, even fonts and graphics libraries change once in a while. One of the problem with web2print, is that the pdf is not THE final form of a content but a picture at a very precise moment. So if you want to use a specific version of each of your dependencies, make sure you keep the right version for any of them in your source code. 

In terms of update, repos, where the things are and what changes are coming up.

Right now, the development of the new Paged.js is on a branch called `pagedNG`. This will soon get merged into the main branch. Paged.js beta will be moved to its own branch (called 0.5) from where only maintenance and merge request from the contributors will be done.  

The release will still be NPM releases, and you’ll still be able to work with all the versions of paged.js, unpkg.com will still gives you the version you need.

Now, if you made your own hooks, we’ll need you to show us what you were doing and how to find out how to make it work better with the new set of methods, and hooks and moments. please send a mail to [contact@pagedjs.org]() and let’s discuss how we can help you get have a better system. 

In the meantime, let’s go through what’s gonna change.


## Chan chan chan chan changes 


Until the upcoming version, paged.js was doing those three things in one giant script: 

1. polyfill the css properties that browsers don’t how what to do with 
2. find where and how to break the content between pages 
3. render the output as a paginated preview in the browser ready to be printed

Now, we decided to divide those in three differents modules, that you can run as part of paged.js or in your own system. Let’s go through them quickly (we have other posts explaining how they work and what you can do with it coming up)

### CSS transformers

One of the most magical thing a developper can feel when working for the web, or for a browser is how resilient that thing is. A CSS stylesheet will always be read by the browser, and it will always try to get the better out of what it can read. You made a mistake in your code? Something not expected? don’t worry, we’ll simply ignore that line, and keep working with the rest of the code. I would be quite surprise if the majority of the CSS files on the web wasn’t coming with a bunch of typos. 

To be able to do that, the stylesheet go through some kind of validation system. If the CSS property is unknown, it gets removed. If the value of a property doesn’t match the implemented specs, it’s simply removed. It’s brilliant. 

Until you want to use CSS that browser doesn’t allow yet. Like `@footnotes`. If you try to have a `@page` with footnotes inside, the `@page` will be removed from your stylesheet with everything in it. Since a couple of years, we got the luxury of having access to custom properties, that we often badly called CSS variable. They are much more than that, as they can be used as variables, but also as custom CSS properties the browser will accept in the codebase. 

`CSS Transformer` is a library that can read any CSS, and replace parts of it based on a series of method: change class names, rename properties, values, generate custom properties and so on. 

---

### Fragmentainers

Web2print has been something inside browsers for a very long time, way before paged.js was a thing. I remember my first experments were catalog for homecooking lessons and scarfs, all made in CMS, with a very simple setup of div to fake pages on screen.

The only moment paged.js was needed, was when i needed to have content flowing on more than a single page, and for which you’d need to have page break in the middle of a sentence or a paragraph. 

I’ve worked on a couple of custom hooks for paged.js to allow what i called parallel-flows (it really needs a better name though). A good example is a book with different languages on the same page: 1 column for English, 1 for French, each of them being repeated on pages till the end. The only way to do that is to use paged.js to run the English content, then the French one, and then move everything back to the pages they’re supposed to be. It ends up working fine, but this is quite a certain amount of lost energy over a sinuated path, while this should be simple.

So we decided to move things around, and instead of creating page break, to create chained blocks, that would allow content to flow from one to another, without them being pages by default. Think of it as CSS regions without the complexity of having complex html and impossible to remember css properties. 

We still need to think about what would be good specifications for this, but at least we can try things out. 

Paged.js will use that fragmentainers library to define the content of each pages.

### The paged-page web-component

I’ve already talked about it in length in previous post, but let’s say that paged.js has now make it the barebones of any page generated. 

## So now,

We’re looking for beta testers.















that line will not be read but all the rest will be perfectly ok.  

- CSS transfomrers make css changes easier
- allowing for break between blocks even if they’re not pages
- having a web component for previewing stuff.


## framgentainers


