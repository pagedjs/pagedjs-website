---
title: "So long @media screen!"
date: 2022-11-11
draft: false
author: "Julien Taquet"
class:
intro: "Pagedjs 0.4.0, release notes, breaking changes and what’s next"
tags:
  - breaking changes
  - guide
  - release notes
---

Hey folks.

Yesterday night, our amazing Fred Chasen jumped the gun and pushed the 0.4.0 to
npm, making it the base version for any of you who use npm without version
control, or simply call from the unpkg cdn (or any other cdn).

That means that if you opened your previous file without knowing what would
happen, you must have had a bit of a scary moment. Don’t worry too much, you
the breaking changes were not about how paged.js work, but more on how Paged.js
preview things on screen.

## I want to go back to have a preview on screen!

Yep! Absolutely, it’s (one of) the great feature of Paged.js, and we have a
couple of solutions for you.

We explained it last time ([you can read the post
here](https://pagedjs.org/posts/paged-break-the-long-overdue-update/), but we
moved forward to follow the standards about the media queries. So, from now one,
pagedjs  will ignore any rule that should not apply to a media screen. `@media
screen` being the most useful example.

The most standard change, for all of you, is the preview on screen: if you want
to use the `interface.css` we’re making, you can simply update and use the
https://gitlab.coko.foundation/pagedjs/interface-polyfill/blob/master/interface.css
for version 0.4.

Note that if you have some css for the screen that you want to force pass to the
browser (for example to allow an UI around paged.js) then you can use the
pagedjs-ignore property in the html `<link rel="stylesheet" type="text/css"
href="screen.css" pagedjs-ignore>` or in the css : `@media screen, pagedjs-ignore
{  .pagedjs_pages {margin-top: 20em}  }`  

Again, the previous post will tell you all about it. The good thing is that the
styles for the screen and the paper will stop hurting each other.


## Enough with breaking change, we want features!

And features you’ll get!

From the release notes:

### You can now have multiple nested named pages: 

Until now, you could only have one level of named page. This will fix that by
allowing nested named page. For example, if this is your html 

```
<div class="content">
	<div class="preamble">
		<p>This is a preamble.</p>
	</div>
</div>
```

and this is your css 

```
.content {
  page: contentpage;
}

.preamble {
  page: preamble;
}

```

then the Preamble will be on its own page! 


### We have an index for all the test we have in pagedjs (we call’em specs)

An image is better than a long talk right? So this is what we support. 

![An image showing the specs that pagedsjs supports as specs we can test](https://gitlab.coko.foundation/pagedjs/pagedjs/uploads/9eca40bdccceabcc39f8e17105a3a834/Screen_Shot_2022-07-13_at_12.57.16_PM.png)

Ok, so no, the image is not always better, especially as it’s an inaccessible
way to show information. So if you want to see what we support, you may want to
go there too: https://pagedjs.org/documentation/cheatsheet/ It’s needs a bit of
an update so feel free to open an issue and help us writing down the most
accurate feature list we can have. Please be in touch at
https://mattermost.coko.foundation

### Tables improvement.

Paged.js used to cut table at the first bloc of text overlapped the page height,
and this caused a column shifting beteen pages.  While this was very fun to look
at, it was a real pain for people who worked with tables. So this is now a bit
better. 

Fred also fixed an issues where multiline content would break tables after a
page break.  

Tables are still problematic when they get long and overly complex but
we’ll get there eventually.

### There is a new hook in town.

Say hello to `finalizePage`. This hook runs just before the page is considered
rendered, after page layout is completed. When paged.js is done with the
`afterPageLayout` if run `finalizePage`. This allow us to manage any changes that occurred in layout or when generated content was added. 

### Looping is gone (but being a loop, it may be back)

A looping in Paged.js world is when a code tries to do something, can’t do it and
tries again. and again. and again. The best example we have of that is when you
try to add an image on the page and there is not enough room for it. Paged,js
will create a new page, try to  put the image  on the page, and again, and
again, and starting to go into that infinite loop that never end. 

From now on, Paged.js 0.4 will gracefully stop when that happens.

### One but not least

You can now reuse attribute from your element as information for your running
headers: 

```html
<p id="funny-p" data-fun="total">this is so nice</p>
```

With that css :

```css

#funny-p {
  string-set: alphabet attr(data-fun);
  }
```

will allows you to reuse the attribute as part of your generated content:


```css
@page {
  @bottom-center {
    content: string(alphabet)
  }
}
```

this will put in the margin bottom of the page the word `total`, since it’s the
value of the `data-fun` attribute

Better, you can now  have multiple string-set, if they are separated with
commas: 

```css

h1 {
  string-set: titletext content(text) , datafun attr(data-fun)
}
```


That’s all folks!

We’ll be back soon with some nice example of Paged.js!


Take care
