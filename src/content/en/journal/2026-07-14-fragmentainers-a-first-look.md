---
title: "Introducing Fragmentainers"
date: 2026-07-14
draft: true
author: "@julientaq"
class:
intro: "fragmentainers is the great wording Fred Chasen found to talk about those containers made of fragments. But let’s try to find out what he meant by that, and how they work" 
---

Hi folks.

been a while. 

Before we jump into where we are on the dev front, i’d like to apologize for the silence. I don’t want to dig to more into it, because it’s still in motions, but i’d like to address the lack of audio from us. Life has been making our life (a specialy julien’s one) a “bit” more complicated that what we would have wanted for the last year, which much more hospitals and doctors that should have been acceptable. Meaning that most of the time that was supposed to go into paged.js got swallowed by whatever life decided to throw at us, and the time we got to work on paged.js has been about shipping what we promised ourselve to ship instead of communicating about what we were doing.



But none of us like that, we’re pretty much happy working with the people instead of shipping things when they’re ready, so we’ll try to be a bit more open about this. 

This small sidenote being said, let’s dive in today’s talk, and why cssRegions are not that far from being back. 

## From a fragment to a page 

Once upon a time there was an amazing set of specifications for the web called the CSS regions. Their idea was simple, you could write some HTML to define boxes, and you would write the CSS that would allow the content to flow into those boxes. The goal was to provide a system to generate magazine looking layout. When I started to make books with HTML and CSS, we used that project called book.js that use those specifications as a foundation to make books.

Chrome and webkit did some implementations of it, and it was working quite nicely. 

And then Chrome left webkit to get into Blink, their own HTML/CSS rendering engine, and they discussed with the community how to remove this bit from the engine. There is a long conversation about the removal of those features from blink, and a long article on A list apart about why CSS regions were a bad idea (from the perspective of the author, which is quite not my own, and i wasn’t alone) 

The whole conversation is an amazing view on how specs are political considerations as much as technical ones, and why you should get involved into making them tailored to your needs.

https://groups.google.com/a/chromium.org/g/blink-dev/c/kTktlHPJn4Q/m/ex6GfHAq3WQJ 

Anyway, this ended up being removed, and I had to run a custom weird chrome under a custom weird linux virtual machine on my 2012 laptop without a SSD. And it worked for a good couple of years. That’s also why the folks at Open Source Publishing in Brussels had to make their own engine to keep using the browser as a printed book publishing machine.

(More readings on the subject if you want to know the story, and why we want those back: https://blog.osp.kitchen/residency/from-webkit-to-ospkit.html)


So regions CSS were removed because they were full of problem that would have needed work that the browsers were not ready to make. Especially one that could allow for content to move around on a page, based on what was around.

But then, the Grid CSS came up. And with it the possibility of creating rooms and a way to put content into it. Think of it as a custom Battleship grid, where, instead of throwing missile of boat, you can set the position of the content. Put the image in A3, the title on B1 to B6 and use the rest of the grid for the actual text, and you have the missing system for the css regions. 

The only missing bit, is how the overflow should behave. And the good thing is that’s what we’ve working on for almost a decade with paged.js. So we now can have a system to bring the CSS region back. We still need to spend some time to figure out how to make a readable CSS, and look into what other folks have made in the W3C toward those questions (we know it’s still in conversations here and there). But since we need something for the overflowing of the pages in paged.js we need a fragmenter engine. 

Because Paged.js has been for a long time a thing that would divide a content into pages. And the boundaries of that pages would say how much content would go into them. The funny thing is that we’re faking the page on the screen, by creating a box (a `<div>`), and we give to that box the dimensions of the page, and we push the content into it, until we find out that there is no space left, and we do it again until the book is made. 

So we have `divs` and those `divs` are simulated pages. What if those `div` were not pages, but really boxes you could write content into? Wouldn’t these be regions? 



## Fragmentainers is the new Chunker 

The fragmentainers is the implementation of the [css-break-3 specification](https://www.w3.org/TR/css-break-3/#fragmentation-model), which explains how a content should be divided into portions (fragment) to fill up the boxes (fragmentainers). Those specs also give the vocabulary to arbitrariloy define the breaks (when we need to create a new page for example, or when we want a chapter to start on the right page, etc. — all the break-inside, break-before or break-after properties we’ve been using before) and also those nice small features still not part of paged.js: the behavior of the decoration from one page to another: should my div have a border-top if it’s the middle of a new page? It’s also using the CSS [Paged Media specs](https://www.w3.org/TR/css-page-3/) especially the page property which imply page breaks.

In the previous versions of paged.js we use to walk the HTML tree, put it on the existing div, and do some math to find out which was part of the page, which wasn’t and when an element overflow, we would check its type, and use some different algorhythm to find where the break should appear, and we’d wait for the next page, and the next, *ad libitum*. And eventually it would stop (probably because there was nothing left, but maybe because there was a bug).

With the fragmentainer library, things change a little: 

The fragmentation  is a 3 phases process:

1. the layout phase: we create a custom element called `<content-measure>` offscreen (to avoid browser painting process to optimize fragmentation). It will get the content and the CSS and will do the calculation to find the possible breakpoints. The result is a list of all the existing fragments, ready to be placed. 

2. The fragmentation phase: we walk each fragment created by the layout phase, and clone the DOM element into visible ones, inside custom `<fragment-container>` elements. There is a bunch of method to keep track of the relation between the unfragmented source and the output elements.

3. The resolver pattern is what manage the behavior depending on what we’re working for. Right now, we have two existing resolvers: one for the page, when you’re making a book, and one for a region, for when you want chained blocks.


---

So let’s try to use this and see where it goes


question:

- why do the fragment container has a 8px margin on the scope? we need to remove it i think. i’m not sure why there is this.
- found a moment where the constraints are not working, let’s find out.
- 






<!-- So, in terms of a book, a *fragmentainer* is a page: a box that contains a portion (a *fragment*) of the complete content.  The book itself is called the fragmentation context (as it contains all the fragmentainer),  -->

<!-- That’s pretty much all the vocabulary we need to keep digging. -->





Fragmentainers is a HTML/CSS implementation of the CSS fragmentation module 3 (also known as CSS-break-3) which describes how a content should be fragmented if there is not enough room for it. 

The fragmentainer is the fragmentation container: a box taht contains a least a portion of a fragmented flow. 


1. what is a fragment 
2. How does it work
3. paged.js implementaion









