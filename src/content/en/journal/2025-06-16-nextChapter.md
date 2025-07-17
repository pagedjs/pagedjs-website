---
title: "A new chapter in Paged.js lifePaged.js neue"
date: 2025-05-17
draft: false
author: "@julientaq"
class:
intro: "Features, people and grants, an introduction to the next chapter of paged.js"
---

I can still picture the room where Adam Hyde put Fred Chasen and myself around the table, looking at options for making pdf from html, and, while we couldn’t find a way that was satisfying enough, he looked at us, and said: “let’s just make it”. 

And then we started. Very early in the process Julie Blanc joined, and within a couple of months we had a working proof of concept. In not so much more; a full fledge library. All of this was possible thanks to all the energy and resources Adam Hyde and the Coko Foundation put into the project.

At that time the goal of paged.js was to show how CSSPrint could make single source publishing a reality. Most of our work was about helping folks who wanted to implement paged.js in their workflows, or build use cases around it and we were spending a lot of energy on workshops, book fairs, user support and demo projects. Plus, with the [hook systems](/en/documentation/10-handlers-hooks-and-custom-javascript/), people would extend the functionality of paged.js with their own scripts and manage to create amazing publications: from vote ballots, to complex (almost) automatic layouts. We were mostly helping folks implementing complex algorithms for print or even implementing some of it ourselves. 

At some point, we were doing more work to help users with paged.js than we spent updating paged.js' core code, features or documentation nor kept the community in the loop of what’s happening.

So let’s change that, welcome to paged.js 2.0


## Didn’t you skip a number? Where is 1.0? 

The idea we had with paged.js was that, at some point, the browser would do the work of supporting paged media specifications and folks could get rid of paged.js all together, simply use the browser for all their pdf needs, and we could stop working on it. The goal of the project was to render itself ultimately redundant. But what we discovered on the path is that paged.js is more than a polyfill for future features, it’s also a gateway to css print because of the preview you get on the screen.

In short, when you use paged.js, the library will take your html and css, find all the properties used for print (@page, margin-boxes, target-counter, etc.), and replace them with html and css to preview, on screen, what will appear on paper (or in the PDF). This allows you to inspect your pages, look at the css, test changes in context and run paged.js again. And print from the browser, which doesn’t use the css for print, but the converted css you have on the screen. 

And then, Chromium team did what we wanted them to do before paged.js: they started to implement print features, [starting with the margin-boxes](https://developer.chrome.com/blog/new-in-chrome-131). Hopefully, it will push other engines to do the same. But, in the meantime, things get tricky for paged.js. 

Supporting chromium updates would mean transforming paged.js in such a way that firefox or other browsers would be left behind, which goes against our goals. Yes, we did repeat that chromium was better because it allows for custom page sizes and manage widows and orphans better, but Firefox, or Safari, or any other browser would still be a valid option. 

Therefore paged.js needs to change to support more engines and more contexts of use. As this is a breaking change we’ll jump to paged.js 2.0 very quickly.


## So long paged.js, hello paged.js neue


First, paged.js members are part of a NGIzero supported project, [Pushing forward for CSS Print](https://nlnet.nl/project/CSS-Print/), for which we’re joining force with the lovely Lucie [lastname?] and Guillaume [lastname?] of Weasyprint (a python based engine to make PDF out of HTML and CSS) to push #CSSprint forward. We’ll write down new specifications to print with CSS and implement them in weasyprint and paged.js, in order to push the conversation forward with the W3C folks. (You can check our [Notes on notes](https://github.com/w3c/csswg-drafts/issues/12472) to see some examples of what we could do).

Second, Paged.js has also been accepted for a NGIzero grant to support the important structural update of paged.js and its dependencies. This plan of update includes a lot of breaking changes: removing CSSTree to replace it with cssOM, use web-components for pages, and document, transform the chunker into its own library, change the algorythm that find breaktoken, allows for multiple break tokens, etc. We’ll cover more of that in the future updates on the blog, as soon as we have a proper calendar to share. The grant is only available for a year so that’s already a nice information. 


### Meet the team


First, Gijs de Heij is joining the team as a core maintainer. While Fred is working a fulltime position at Mozilla, we decided to redraw how the team works around paged.js. Instead of putting everything of Fred’s shoulders, we’re moving toward a team of core developers, as Gijs and myself will be more involved into paged.js development by contributing codes, features and managing user support.

Gijs is an amazing designer / developer and a member of the collective Open Source Publishing, he’s been a long time user of paged.js and experienced first hand what works, what doesn’t, and what needs a work around.

As Fred’s time is reduced, his work on paged.js will be less visible, and though Julie officially stopped working on paged.js when she started working on her thesis she’s still around paged.js and part of the Weasyprint × Paged.js project. By now she's Julie Blanc, PhD, afters she defended her thesis [“Composer avec les technologies du web ”](http://phd.julie-blanc.fr/) (*Composing with web technologies. Collective instrumental genesis for the development of a community of practice of graphic designers*), it observes how paged.js was used by graphic designers to share knowledge and build communities.

The Coko Foundation has been supporting paged.js for all of us for a long time, and we wouldn’t be where we are now if it wasn’t for Adam Hyde’s time, energy, trust and generosity. I don’t think I’ll ever be able to thank him enough for all the support he gave to each one of us. And even though Coko is not financially supporting paged.js anymore, Adam is still around to help, and we wouldn’t like it any other way.


### on paged.js future

This post is already too long. So, to not take too much of your time, some final practical updates:

- Paged.js now has a mastodon account on fosstodon: https://fosstodon.org/@pagedjs, we won’t be using twitter anymore. 
- Paged.js code (and submited issues) are now on github, as well as the sources for this website, and we’re slowly bringing back some of the plugins and snippets we developed here and there. (<https://github.com/pagedjs/>)
- You can reach us by email at pagedjs dot org
- Paged.js now has a Matrix channel. Come to chat and discuss the futur with us: <https://matrix.to/#/#pagedjs:matrix.org>
- The website is now fully internationalized. Thanks for the amazing amazing (not a typo, i wrote it twice) [Eleventy](https://11ty.dev). You can now join the translation effort if you feel like it :D. 

There are a bunch of other things to share in the coming weeks, from pagedjs structural changes to documentation update/rewriting (for devs & users), and other things we want to bring back (plugins, templates, etc.)

With the hope that you’ll want to take part in Paged.js future, as you may have done before. 

See yall very soon.

<p class="signature">
julientaq 
</p>





