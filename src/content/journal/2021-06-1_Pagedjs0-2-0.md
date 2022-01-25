---
title: "Paged.js 0.2.0 Release notes"
date: 2021-06-01
draft: false
type: post
url: ../posts/2021-06-newRelease/
id:
# class: cookbook
author: Paged.js team
intro: Being able to generate hundreds of pages from the browser that will be printed on an offset printer using copper ink is great, but did you try footnotes?
tags:
  - footnotes
  - release notes
---

## Hey yall! We have footnotes!

One day, i said on twitter that we were starting our work on the footnotes. This was the most retweeted and shared post in all the history of Paged.js. This is the most awaited feature that we’re really proud to bring into the game.

We’ve always been happy to help making hooks for footnotes, but they were mostly hacks, and would come with their share of unknown behavior, they wouldn’t be standard and would break everything on a regular basis. Not the best of the world.

Then, we wrote down some specifications about what we believe would be a [great addition to the footnotes](https://www.pagedjs.org/posts/2020-05-13-notes-about-notes/). This would allow footnote, marginnotes, different kind of notes, etc. This is a bit of how would be footnotes in the ideal world, so we could engage the conversation with the folks on the w3c github. I hope that we can be back on that conversation soon enough.

But we can’t wait for the W3C to approve those specs as they would need to go through all the steps before being a real specs, thus we ended by making a simple implementation following the existing specs ([https://www.w3.org/TR/css-gcpm-3/#footnotes](https://www.w3.org/TR/css-gcpm-3/#footnotes)), and we ended up with something we’re happy with.

Footnotes now exists in paged.js and can be easily set up this way:

```html
<p>
  This is a paragraph that contains some lorem ipsum
  <span class="footnote">Fake latin</span> content
</p>
```

i obviously named my class `footnote` but you can call that whatever you want. And better, your footnote can be anything from text to table, including images or more exotic HTML (warning though, this has been tested with text first and foremost).

Then you need to define which elements need to be set as footnote using those properties:

```css
/* define what are the footnotes elements */

.footnote {
  float: footnote;
}

/* define the position of the footnote on the page (only bottom is possible for now) */

@page {
  @footnote {
    float: bottom;
  }
}
```

And that’s it. You can then style the footnote callout to go beyond the user agent styles

Pay attention to the fact that there is no callout, they will be created automatically and you’ll be able to change their look with css without having to worry with the note numbering.

```css
::footnote-call {
  content: counter(footnote, loweralpha);
  color: red;
  font-weight: 700;
  font-size: 3em;
  line-height: 0;
}

::footnote-marker {
  content: counter(footnote, loweralpha) ". ";
  color: red;
  font-weight: 700;
  font-size: 3em;
  line-height: 0;
}
```

You can check this [codepen](https://codepen.io/julientaq/pen/dyvQaKy) to see it in action.

To be able to manage the footnotes, Fred rewrote quite an amount of code of Paged.js. He made sure that the API didn’t change, but it doesnt mean that your previous content will work by default. Please test, and tell us if something goes wrong, we’ll be happy to support you.

Welcome Paged.js 0.2.0! :)

## Release notes

- Footnotes! (from @Fred)
- Fix styles order (from @Guillaume)
- White space in `<pre>` elements are now preserved. Hello again ascii art! (from @Guillaume)
- A lot of improvement on tables from @guillaume) (Break in table with row span are now much more elegant, columns are rebuild on page breaks, etc.)
- remove page border when no borders are specified (from @guillaume)
- @Julie wanted to print page with a lot of colors, so she added box-shadows to the crop marks
- @guillaume introduced the `RenderResult` object with more data about how pagedjs handle page breaks.

## In other places

We now have a [portfolio page](http://pagedjs.org/examples/). Send us a message if you want to display your work here.

One of the great thing of using the browser is to inherit all the knowledge they have: as a result, Paged.js works pretty well with content in chinese, thanks to [huli](https://twitter.com/aszx87410).

C&F editition are working on their new collection using Paged.js but hush, it’s a surprise.

And Julien spent some time to build hooks for page float, automatic indexing, and other things we’ll be happy to show you soon. This [PDF](/images/exampleOUT.pdf) was made with [Editoria](www.editoria.pub). Video tutorials are coming!

Until next time!
