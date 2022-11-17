---
title: "Paged Break, the long overdue update"
date: 2022-07-10
draft: false
author: "Julien Taquet"
class:
intro: "Paged.js has been through a lot of changes over  the last year or so. And those were quite interesting to navigate. Let’s see where we’re at."
tags:
  - breaking changes
  - guide
  - release notes
---

It’s been a while, hasn’t it?

That’s how it feels for us. Not that we weren’t around working, quite the opposite to be honest, but it wasn’t very visible outside of the [Coko chat](https://mattermost.coko.foundation) (You should join if you’re interested in the future of Paged.js as we try more and more to discuss things in the open out there). We also try to offer some news on [Twitter](https://twitter.com/paged_js), so make sure to follow if you want some last-minute news, or if you want to ask some questions a little bit.

Still, it feels nice to fill those pages after a year of being silent so let’s try to catch up to what happened as we’ve been a tiny bit busy.

Before we get into that, we had to move our repo from the GitLab we had at [pagedmedia.org](http://pagedmedia.org) to [https://gitlab.coko.foundation](http://localhost:8080/posts/paged-break-the-long-overdue-update/). Because Paged.js is maintained by the [Coko Foundation](https://coko.foundation) and also because we got hit quite hard by a crazy spam that literally killed the server again and again. We’re now in a much better space as the nice folks of [cloud68.co](https://cloud68.co) are now in charge of making our life easier, and they’re quite good at it. We managed to save the important repos and all the comments and conversations, thanks to Boris.

Ok, back to Paged.js

Between June last year and this month of July, we’ve been through a lot of small changes, going from 0.2.0 to 0.4.1 beta (we do have beta now!)

Before explaining the changes, a small shout-out to our friendly users who came up with fixes. So thanks to Anthony Libotte, Guillaume Grossetie, Thomas Parisot, Angela Liu to name a few (along with the amazing work from Fred Chasen).

We won’t spend too much time on the small fixes as they’re mostly updates to preexising features, including, better support for footnotes, a new div to be able to center things vertically, and those kinds of things. The release note for each merge request tells more than what I could write here.

But then, here are the breaking changes.

## Goodbye web2print, hello web+print

A reminder: Paged.js is a polyfill, a Javascript library that does what the browser should be doing by itself. That means that what you do with Paged.js today needs to be what you will be able to do in Chromium, Firefox, Edge, Vivaldi, etc in future -- one day, the browsers will have implemented the print feature and when that happens, we won’t need Paged.js anymore

To be a working polyfill, Paged.js needs to work exactly like a browser.

In a browser, when we set @media queries, we can define styles for a specific environment. We know that well because that’s how responsive design works: you define what happens when the usable surface is smaller than 800px @media (max-width: 800px) or when night mode is wanted  @media (prefers-color-scheme: dark) or simply when you want to print something with @media print.

If you don’t set any query, then your CSS will be used in all situations.

So a simple example: we have some `<h1>` and we want them to have a font-size of 2em in all situations, but we want them red on screen, black on paper. This is how it will be set.

```css
/* shared for all the context */  
h1 {  
  font-size: 2em;  
}  
  
/* only for screen */  
@media screen {  
  h1 {  
    color: red;  
  }  
}  
  
/* only for print */  
@media print {  
  h1 {  
    color: black;  
  }  
}
```

Until now, you needed to have a custom stylesheet for pagedjs to handle what happens in print and on screen. If there were some styles defined for the screen in the stylesheet, they were also rendered in the preview.

In the example above, it takes the latest value defined in the CSS cascade:  the h1 would be black on screen and on paper.

That’s the result of rendering the print preview on screen, creating the perfect paradox where eveything is used. Paged.js tricked the browser to show you the styles from the CSS for print, in a screen context, because we preview those pages, on a screen.

Now, with this new feature, Paged.js will  hide what’s for the screen and show what will be printed. Starting with version 0.4.1, Paged.js will stop parsing any css that is inside a @media screen media query. In other words:

```css  
/* This will be completely remove from the page when you run Paged.js */  
@media screen {  
  p {  
    color: red;  
  }  
}  
  
/* this will be used by Paged.js */  
@media print {  
  p {  
    color: purple;  
  }  
}  
  
/* this will be used by Paged.js as it an equivalent of @media all */  
p {  
  color: purple;  
}
```

But as we’re moving toward html AND print, we needed to change Paged.js a bit. In the previous [post from Julie](https://pagedjs.org/posts/2020-04-15-starterkits-for-pagedjs/), she showed how we could create a designer interface around the paged.js preview feature: show baseline, show margin boxes, etc. To make that work, she added content as a hook: when paged.js was done, it would show the toolbar, making it hard to work with (and absolutely not standard). This update will change that.

So now, if you want to use the polyfill and have have elements just for the screen preview, you can use one of the following ways:

Put all the interface rules in a seperate stylesheet that has a media="screen" attribute, which won’t be parsed by the polyfill and only applied to screen media:

```html
<link rel="stylesheet" type="text/css" href="screen.css" media="screen">
```
Or add a media="screen" attribute to any style tag to apply those rules to screen media and be ignored by Pagedjs:

```html
<style media="screen">  
  p {  
    color: red;  
  }  
</style>
```

Additionally, you can tell Paged.js to ignore _any_ CSS you don’t want parsed with the pagedjs-ignore attribute:

```html
<style pagedjs-ignore>add some inline styles</style>  
<link rel="stylesheet" type="text/css" href="screen.css" pagedjs-ignore>
```

This way, pagedjs will pass the stylesheet as it is, and will not update the styles. One important note: if you are ignoring screen styles, you want to make sure that you’re writing in a media screen to avoid the styles being mixed up on export.

Finally, in a parsed CSS file, adding `pagedjs-ignore` will skip a media block, passing it as it is to the browser. This is pretty useful to define how the page will look in the browser:

```css
@media screen, pagedjs-ignore {  
  .pagedjs_pages {margin-top: 20em}  
}  
  
@media pagedjs-ignore {  
  // block to pass  
}
```

One fair warning, this is a bit outside of the standard, it’s a usable workaround that we’ll support by default, but pagedjs-ignore has no intention of being a standard in the future. But it’s a way for you to build the tool you need around real media queries support.

You can test it already if you’re using Paged.js 0.4.0-beta.1, using the interface.css polyfill: [https://gitlab.coko.foundation/pagedjs/interface-polyfill](https://gitlab.coko.foundation/pagedjs/interface-polyfill)

We’ll let that work as a beta for a month before making a proper release.

The simplest way to use it is to get the file from unpkg cdn: [https://unpkg.com/browse/pagedjs@0.4.0-beta.1/dist/](https://unpkg.com/browse/pagedjs@0.4.0-beta.1/dist/) and see how things work for you.

If you find any issues, or anything, feel free to open an issue on our GitLab, or contact us on the [Mattermost](https://mattermost.coko.foundation) (again, the best way to get in touch with us.)

We’ll be back soon with some other updates, as Paged.js CLI also got pimped up! if you want to test the CLI with the aforementioned changes to Paged.js, you’ll find the files here: [https://unpkg.com/browse/pagedjs-cli@0.2.2-beta.2/](https://unpkg.com/browse/pagedjs-cli@0.2.2-beta.2/)

One last thing, 27-28 October 2022 in San Francisco will see the first _Page Break Conf_ which has been organized by some great folks of our community. We’ll be back to talk a bit more about it soonish, so don’t forget to save the date!

Have a nice printing!
