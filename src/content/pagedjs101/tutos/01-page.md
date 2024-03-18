---
title: The @page
intro: exploring the @page
draft: false
# permalink: /pagedjs101/at-page/
layout: singlepage.njk
order: 1
---

Whereas you are dealing with a manuscript, a typescript, an hell-script from Wor… a word processor or a web document, when it goes to the printing part, the same question comes up: “What will my page be like?”, _id est_, what will be its anatomy?

- its dimensions,
- its orientation,
- its margins,
- and, for the most _print process aware_ people, what size should the bleed area be
- and what about the registration or crop marks?

<figure>
  <img src="/images/tutos-at_page-01.svg" alt="schematic view of a printed page with indications relative to its anatomy">
<figcaption><p>A classical page structure with the bleed, the inner, outer, top and bottom margins.</p></figcaption>
</figure>

While working on the _paged media module_ for Cascading Style Sheets level 3 (CSS3) draft, the Worldwide Web Consortium (W3C) took all these elements into account to define a _page model_. Accordingly, the _@page_ rule was created to give the tools to manipulate the attributes of the aforementioned model.

_pagedjs_ primary goal is to offer the support of the W3C recommendations for paged media CSS3 rules in the existing browsers and enforce the adoption of the proposed standard throughout the expending _web to print_ community. Therefore it fully supports the @page rule.

## Kneel for the @page

Like any CSS rule, the @page one consists in a selector, `@page`, and a declaration, `{ … }`, to affect a set of values to some attributes. It will be applied to all the document pages. See it as a common minimal default.

```css
@page {
  /* page attributes here */
}
```

### Diversity as a strength

Because we don’t want all the pages to look exactly the same and also because of the need to comply with implicit rules inherited from centuries of book composition, the specifications come with build-in pseudo-selectors whose names are self-explanatory.

```css
@page :first {
  /* page attributes for the first printed page of a document */
}

@page :blank {
  /* page attributes for a blank page resulting from page breaks */
}

@page :left {
  /* an educated guess maybe? */
}

@page :right {
  /* mirroring the aforementioned guess */
}
```

Some other pseudo-selectors may be added later in the CSS page module to address some needs yet to be found but your can already create your own custom selector by using named @page.

### Call me by your name

A common usage for nonfiction books is to layout each section with visual differences, thus the change of topic is more noticeable. This is totally feasible by adding a name in your @page selector, `@page pageName { … }`. It can also be completed by pseudo-selectors.

```css
@page horizontalyHeld4StringsInstruments {
  /* attributes */
}

@page verticalyHeld4StringsInstruments {
  /* attributes */
}

@page horizontalyHeld4StringsInstruments:left {
  /* attributes */
}

@page horizontalyHeld4StringsInstruments:right {
  /* attributes */
}
```

### One @page to rule them all

Sure as 1 + 1 equals 10, the C in CSS stands for Cascade, each `@page { … }` rule has its own weight (depending on the combined specificities of the parts of the selector) and when two rules are of the same weight the latest one precedes (which is kind of ironic as it comes afterward in the CSS file). The W3C details the rule’s weight calculation method on [the CSS Paged Media Module Level 3 page](https://www.w3.org/TR/css-page-3/#cascading-and-page-context). However, we could resume it as follow (in specificity growing order):

1. the minimal `@page` selector has no specificity (0,0,0),
2. the `:left` or `:right` have the lowest one (0,0,1),
3. the `:blank` or `:first` stand in the middle (0,1,0),
4. and the `@page someName { … }` named page selector is the most specific (1,0,0).

The following example may ease the cascade comprehension if you have little knowledge in CSS rules.

### Let’s get us started

Please consider the following @page rule.

```css
@page {
  size: 111mm 181mm; /* first width, then height */
  margin-top: 15mm;
  margin-bottom: 30mm;
  bleed: 4mm; /* speeking words of wisdom, let it… */
  marks: cross crop;
}
```

It defines the base layout upon which the book will be made: a page size of 111 by 118 millimeters with two values given for the top and bottom margins. A four millimeters bleed area is also specified along with the need to print both the registration (cross) and crop marks. You may wonder why there is no mention of the left and right margins. No oversight here, those additional rules complete the declaration.

```css
@page :left {
  margin-right: 9.25mm;
  margin-left: 18.5mm;
}

@page :right {
  margin-right: 18.5mm;
  margin-left: 9.25mm;
}
```

And now we are quite done, at least for a starter. We have defined a page size, some technical options and a margin system symmetrical along the binding. We may just make use of the remaining pseudo-selector to address the remaining traditional aspects of books design.

```css
@page :first {
  margin-top: 38.8mm;
  margin-bottom: 49.4mm;
  margin-right: 0mm;
  margin-left: 0mm;
}

@page :blank {
  margin: 0mm; /* yep, shorthands are bad practice but sometime suffice ^^ */
}
```

Altogether the aforementioned rules, linked to a web page, lead to… something rather disappointing. Hard to tell whether our styling is correctly interpreted or even if they are interpreted.

<figure>
  <img src="/images/tutos-at_page-02.png" alt="screenshot from a web browser window showing a blank page with only the bleed limits and the crop and registration marks">
<figcaption><p>Quite an emptiness isn’t it?</p></figcaption>
</figure>

By [summoning a passing by Great Old One](https://ephemer.kapsi.fi/FhtagnGenerator.php?count=666&format=html&fhtagn=yes) we can populate a little content to help us have a look on the document layout.

<figure>
  <img src="/images/tutos-at_page-03.png" alt="The same browser window now displays many pages filled with placeholder text based on the Chhulhu mythos from H.P. Lovecraft">
<figcaption><p>Now we can visualize our upcoming bestseller!</p></figcaption>
</figure>

Our rules’effects are more visible, our text flows through several pages which we nearly can imagine be flipped by a reader; nearly but not quite. While efficient to minimize white space, and therefore cut the overall paper cost, our current design needs some adjustments.

```css
h1 {
  break-after: page;
  text-align: center;
}

section h2:first-child {
  color: white;
  break-before: right;
  background: Rebeccapurple;
  margin-top: 0;
  padding-top: 3lh;
  padding-right: 1ch;
  padding-bottom: 0.21lh;
  margin-bottom: 0.79lh;
  text-align: end;
  font-style: italic;
}
```

By only adding a dash of _style_ to our text, we isolated the title on the first page and forced our chapters to begin on a right page while their titles are white on a purple background.

<figure>
  <img src="/images/tutos-at_page-04.png" alt="On the same document we can see that the titles stands alone on the first page and that the first chapter begins on page 3 with a chapter title laying on a purple background" >
</figure>

Nicer isn’t it? It still requires a lot of enhancements. However, before going deeper in the design process, we’ll take some time to discuss the elephant in the room, I mean, look at those margins! It would be a shame to let them untouched.
