---
title: "Paged.js next chapter"
date: 2025-05-17
draft: false
author: "Julien Taquet"
class:
intro: "Features, people and grants, an introduction to the next chapter of paged.js"
---


I can still picture the room where Adam Hyde put Fred Chasen and myself around the table, looking at options for making pdf from html, and, while we couldn’t find a way that was satisfying enough, he looked at us, and said: “let’s just make it”. 

And then we started, and very early in the process, Julie Blanc joined, and in a couple of months we had a working proof of concept, and in not so much more, a full fledge library. All that was possible thanks to all the energy and ressources that Adam and Coko put into the project.

At that time, paged.js was all about showing how CSSPrint could make single source publishing a reality since we would take care of the PDF/print world. Most of our work was about helping folks who wanted to implement paged.js in their workflows, or build use case around it and we were spending a lot of energy on workshops, book fair, user support and demo projects. Plus, with the hook systems, people would run their own javascripts and manage to do amazing publications, from vote ballots, to complex (almost) automatic layouts: we were mostly helping folks implementing complex algorythm for print or even implementing some of it ourselves. 

At some point, we were doing more work to help users with paged.js than we spent updating paged.js core code, features or documentation nor keep the community in the loop of what’s what happening.

So let’s change that, welcome to paged.js 2.0


## Didn’t you skip a number? Where is 1.0? 

The idea we had with paged.js was that, at some point, the browser would do the work of supporting paged media specs and folks could get rid of paged.js and simply use the browser for all their pdf needs, and we could stop working on it. But what we discovered on the path is that paged.js is more than a polyfill for the future features, it’s also a gateway to css print because of the preview you get on the screen.

In short, when you use paged.js, the library will take your html and css, find all the properties used for print (@page, margin-boxes, target-counter, etc.), and replace them with html and css to have, on screen, what will appear on paper. This allows you to inspect your pages, look at the css, test changes in the context and run paged.js again. And print from the browser, which doesn’t use the css for print, but the converted css you have on the screen. 

And then, Chromium team did what we wanted them to do before paged.js: they started to implement print features, [starting with the margin-boxes](https://developer.chrome.com/blog/new-in-chrome-131). Hopefully, it will push the other engines to do their work. But, in the meantime, things get tricky for paged.js. 

Supporting chromium updates would mean transforming paged.js in such a way that firefox or other browsers would be left behind, which goes against our goals. Yes, we did repeat that chromium was better because it allows for custom page sizes and manage widows and orphans better, but Firefox, or Safari, or any other browser would still be a valid option. 

Therefore paged.js need to change a bit to support more context of use and more engines and this is such a breaking changes that we’ll jump on paged.js 2.0 very quickly.


## So long paged.js, hello paged.js neue


First, paged.js members are part of a NGIzero supported project, [Pushing forward for CSS Print](https://nlnet.nl/project/CSS-Print/), for which we’re joining force with the lovely Lucie and Guillaume of Weasyprint (a python based engine to make PDF out of HTML and CSS) to push #CSSprint forward. We’ll write down new specifications to print with CSS and implement them in weasyprint and paged.js, in order to push the conversation forward with the W3C folks. (You can check our [Notes on notes](link) to see some examples of what we could do).

Second, Paged.js has also been accepted for a NGIzero grant to support the important structural update of paged.js and its dependencies. This plan of update includes a lot of breaking changes: removing CSSTree to replace it with cssOM, use web-components for pages, and document, transform the chunker into its own library, change the algorythm that find breaktoken, allows for multiple break tokens, etc. We’ll cover more of that in the future updates on the blog, as soon as we have a proper calendar to share. The grant is only available for a year so that’s already a nice information. 


### Meet the team


First, Gjis de Heis is joining the team as a core maintainer. While Fred is working a fulltime position at Mozilla, we decided to redraw a bit how the team work around paged.js. Instead of putting everything of Fred’s shoulders, we’re moving toward a team of core developpers, as Gijs and myself will be more involved into paged.js development by contributing codes, features and managing user support.

Let’s introduce ourselve:

i’ll start, as i have the microphone: i’m julien taquet and I’ve been working for Coko since the beginning, and on paged.js since its debut. I’m now focussing my effort on paged.js (and only paged.js after years of doing too many different things). I’m in charge of making things run smoothly, developping paged.js features, writing specs, organizing things, welcoming folks and reducing the frustration around paged.js when some appears. Nice to meet ya if we’ve never met, happy to see you again if we did :)

Fred Chasen:


Gjis de Heis:

Julie Blanc officially stopped working on paged.js when she started working on her thesis [ “Composer avec les technologies du web ” ](http://phd.julie-blanc.fr/) (*Composing with web technologies. Collective instrumental genesis for the development of a community of practice of graphic designers*). The thesis observes how paged.js was used by graphic designers to share knowledge and build communities, and she defended it with talent, and she’s now Julie Blanc, PhD. If you need to hire someone who could help you make amazing publications (printed or not), you can check [https://studio-cascade.fr/](). She’s still around paged.js quite a lot, and part of the Weasyprint × Paged.js project.

Coko’s been supporting paged.js for all of us for a long time, and we wouldn’t be where we are now if it wasn’t for Adam Hyde’s time, energy, trust and generosity. I don’t think i’ll ever thank him enough for all the support he gave each one of us. Coko is not financially supporting paged.js anymore, but Adam is still around to help, all is good.


that it’s nice that we can actually share the burden a bi


### on paged.js future

We’re also looking at how we can welcome more users to share knowledge and support each others. Over the last years, we’ve tried the gitlab issues and conversations, Coko’s mattermost, forums, and wikis but somehow this never worked out, and a lot of knowledge about paged.js are put in different places on the web, either as part of other project that use paged.js or simply as blog articles. We’re also looking at how we can manage translations of the documentation, writing it together. 




