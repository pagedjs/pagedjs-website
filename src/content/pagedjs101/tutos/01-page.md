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
- and, for the most _print process aware_ people, what size should the bleed area and what about the registration marks placement?

While working on the _paged media module_ for Cascading Style Sheets level 3 (CSS3) draft, the Worldwide Web Consortium (W3C) took all these elements into account to define a _page model_. Accordingly, the _@page_ rule was created to give the tools to manipulate the attributes of the aforementioned model.

_pagedjs_ primary goal is to offer the support of the W3C recommendations for paged media CSS3 rules in the existing browsers and enforce the adoption of the proposed standard throughout the expending _web to print_ community. Therefore it fully supports the @page rule.

## kneel for the @page

Like any CSS rule, the @page one consists in a selector, `@page`, and a declaration, `{ … }`, to affect a set of values to some attributes. It will be applied to all the document pages. See it as a common minimal default.

```css
@page {
  /* page attributes here */
}
```

### diversity as a strength

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

### call me by your name

A common usage for nonfiction books is to layout each section with visual differences, thus the change of topic is more noticeable. This is totally feasible by adding a name in your @page selector, `@page pageName { … }`. It can also be completed by pseudo-selectors.

```css
@page horizontalyHeld4StringsInstruments {
  /* attributes */
}

@page verticalyHeld4StringsInstruments {
  /* attributes */
}
@page verticalyHeld4StringsInstruments:blank {
  /* attributes */
}

@page horizontalyHeld4StringsInstruments:left {
  /* attributes */
}

@page horizontalyHeld4StringsInstruments:right {
  /* attributes */
}
```

### one @page to rule them all

Sure as 1 + 1 equals 10, the C in CSS stands for Cascade, each rule has its own weight (depending on the combined specificities of the parts of the selector) and when two rules are of the same weight the latest one precedes (which is can or ironic as it comes after in the CSS file).

> ↓ old stuff below ↓

The viewport for print is the size of the paper you will export on.
If you hit `ctrl/cmd + P` to print, the dynamic size of the elements on the page are calculated based on the informations the printer and/or the print modal offer.

To go beyond those limitations, the rule `@page` allow to define the actual size of the document, so if you want to export a pdf, you can do any size you want.

## @page

The set of rules that you should use in a `@page` rule is pretty limited, as the properties used in that situation are only there do define the actual page and not its content. Defining the styles of the element on the page, from within the `@page` rule is not something possible.

### the @page properties and the page `box-model`

```css
@page {
  size: 150mm 200mm;
  margin: 18mm 12mm 19mm 20mm
  padding: 2mm 3mm;
  background: green;
}
```

`size` allow you to define a size for the page. It can be an industry standard (A4, A5, letter, etc.) or a custom size (6.3in, 30mm, etc.). Width is set first, Height is set second. You can also write if you want to be in `landscape` or `portrait` for a specific size.

By default, pagedjs will use a `letter` format as the default viewport. So if you define no size, you.

`margin` are like all other css margins and define the margin between the content area and the boundaries of the page. They’re set like any other css margin, on a clockwise basis: Top, Right, Bottom, Left. **in the future, we’ll have inner/outer margins for facing pages content** (check this future implementation) [pagedjs-extension-custom-margins]()

`padding` is basically the same has padding in the css world. It’s the space between the border and the content.

If you need to have custom styled based on the page itself, you need to look at [pagedjs-extension-custom-styles-per-page] ()

w3c specs: https://drafts.csswg.org/css-page/#at-page-rule

### Example

```css
@page {
  size: 150mm 200mm;
  margin: 18mm 12mm 19mm 20mm
  background: green;
}
```

## why do we have a @page

The `size` property is something that goes again the ideas

## the page box model

sheet of paper (bleed and marks)
page border the page boundaries
margin where you can add things
padding the inside margins of your page
text area the usable space for adding content

## the existing pseudo pages

the blank page

the first page

a specific page by its number

// questions and remarks!
why there is no page:last?
the impossible page: the `:last` paradox.

## the named page (also known as page master in the print world)

named page

q

## bleeds and marks!

custom bleed
custom marks
handmade booklet

// future post

// why is it not acceptable, and why is this needed.

```css
@page {
  div.content {
    color: blue;
  }
}
```
