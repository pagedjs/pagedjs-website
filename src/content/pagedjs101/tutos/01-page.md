---
title: The @page
intro: exploring the @page  
draft: false
# permalink: /pagedjs101/at-page/
layout: singlepage.njk
order: 1
---

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

 By default,  pagedjs will use a `letter` format as the default viewport. So if you define no size, you.


`margin` are like all other css margins and define the margin between the content area and the boundaries of the page. They’re set like any other css margin, on a clockwise basis:  Top, Right, Bottom, Left. **in the future, we’ll have inner/outer margins for facing pages content** (check this future implementation) [pagedjs-extension-custom-margins]() 

`padding` is basically the same has padding in the css world. It’s the space between the border and the content.




If you need to have custom styled based on the page itself, you need to look at [pagedjs-extension-custom-styles-per-page] ()



w3c specs:  https://drafts.csswg.org/css-page/#at-page-rule

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
page border  the page boundaries
margin  where you can add things
padding  the inside margins of your page
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
    color: blue
  }
}
```

