---
title: "Uke and inks"
date: 2021-06-18
draft: false
type: post
url: ../posts/2021-06-uke-partOne/
id:
class: cookbook
author: Julien Taquet
intro: Last month, I was asked by Adam to summarise the new options offered by Coko's Editoria export-to-PDF feature. It's rare to get to choose the subject you want to talk about, so as I'm in the middle of building my home studio, I'll also talk about my ukulele.

tags:
  - hooks
  - custom js
---

## Editoria, the Book Production Center

Editoria is a platform to collaboratively produce books, offering spaces for writers, editors, designers, etc. at the same time the content is being added.

We've been talking Editoria quite a lot in these pages. Firstly because Paged.js was implemented in Editoria before any other tool, after years of trying out other tools to make books out of HTML.

Editoria has been used for quite a while by Book Sprints and other friendly folks. It's a pretty amazing tool for creating books collaboratively by a team. But one of the limitations from the designer's perspective was that we were stuck with what CSS allowed us to do. It took quite a while to figure out the best option to have custom javascript hooks without compromising the security of the whole platform. 

Well, that solution exists now:)

To show what you can do with Editoria nowadays, I have produced a small demo book, with some paged.js hooks that I explain in this post.

Before jumping into hooks, let's briefly explain how paged.js does what it does.

### Paged.js: hooks and order

Fred Chasen made paged.js around a clever idea: instead of defining the order of events that paged.js needed, he defined the moments where you would need to do something on the content, and set those as hooks to which you can bind your scripts.

All the modules use those entry points to do different things at different moments.

1.  when it's about to parse the HTML, CSS and JS.

2.  when all the content has been parsed.

3.  when you create a new page

4.  when you put one element on the page

5.  when the page is filled and there is no more space left on the page

6.  when you define the exact location your content is split

7.  when you finish the layout of the page (go back to 3)

8.  when you zend the signal that all pages are generated if there is no
    content left.

You can see all the existing hooks [on this page](https://www.pagedjs.org/documentation/11-hooks/#some-informations-about-the-hooks) if you want to go deeper.

For example, let's look at how a `break-before: left` is defined.

1.  Before the HTML, CSS and JS of the document is parsed.

_check if any element has a `break-before` property and if it’s value is `left`, add a `data-break-before: left` attribute to it._

4.  when you lay out one element on the page

_if that element has a `data-break-before: left` attribute, stop adding elements to that page and jump to 6. Then, if it’s a right page create an `blank` page and resume adding content on the following page, else (if it’s a left page), resume adding the content._

As you can see, the algorithm is crystal clear, and when the browser handles features, we'll be able to remove those that become useless over time.

Let's start strumming our ~~ukulele~~ keyboard and make some code. :)

## Where the humuhumunukunukuapuaa goes swimming by

So let's jump in, script by script and see what happens and how things work.

Here is the link to the [pdf](https://demo.flaxjs.net/output/uke.pdf) and to the [repo](https://gitlab.pagedmedia.org/pagedjs-templates/ukulele-demo) if you want to have a proper look at all those files :D).

We’re setting up a place to display the open source templates we’re making, so stay tuned to know more about it.

### Changes in the DOM

Wax, the word processor that fuels Editoria, treats the content as a
flat flow of elements. You can define the type of block from a list of
styles (including custom styles for both inline and block level
elements). The output of that is a nicely set HTML with `paragraph` with
different classes, `header`, `em`, and all the other sweets the HTML has to
offer.

If all is so great, why would we change the DOM?

For multiple reasons:

1.  You may want to bring elements together (for example, when you have
    two figures that belong together and for which you want to have a
    specific layout), or when you want to nest stuff together, something
    that your editor may not offer.

2.  To redo something the browsers used to offer (nope, not the CSS
    regions, not this time :D) such as the unknown display:
    [run-in](https://css-tricks.com/run-in/) which allowed us to
    push an element to the next as an inline block. This trick has been
    used a lot in the world of print, and it was available for the
    screen a long time ago. But it didn't survive the test of time.

3.  You may want to create, let's say, an index. To do so, you need to
    create links between the words and their counterparts in the index.
    In this book, I used a custom inline class to list everything the
    musician talked about in the first chapter to build the list in the
    end.

My first script, the `contentUkulele.js` is happening on the `beforeParsed`
hook (before any content data has been processed by paged.js). It's
removing empty elements, add id to elements that don't have ids yet,
recreate the `display: run-in` property. Nothing really fancy here, but it
let me create the DOM I want s /I can start designing the book itself.

### Page-float? Are you going to talk about page-float?

Yes.

And no.

Not in the way you're expecting it.

If you want to know what a page-float is, and what it can add to our
layout, you should have a look at the
[[demo]{.ul}](http://demos.pagedmedia.org/page-floats/) Julie Blanc
made. Be aware that this is not inside Paged.js (yet) but a good demo on
how things should work when we'll be able to follow the specs from the
W3C.

Truth is, page-floats are a pretty complex thing (check Julie's article
[[about page floats]{.ul}](https://www.pagedjs.org/page-floats/)). There
are a lot of different ways to implement page-floats, and they all come
with pros and cons. Until we find the universal way of making page-float
a thing, we can still find workarounds and ways of making it work. So
let's see how I did it for the ukulele book.

### The custom property with its custom values

This image-handling.js script has only one role: find the element that
has that property, and depending on its value, add a specific class to
that element so we can target it when it's being rendered on the page.
To do so, I created a CSS custom property that can have different values
to define where the element should float.

```css
--page-float: same-top,
              same-bottom,
              next-top,
              next-bottom,
              same-column-top,
              same-column-bottom,
              next-column-top,
              next-column-bottom,
              full-page
```

Some of those values/classes are not used, but are there for the day we
need them.

### Layout time!

Then we have a float-top.js, floatNextBis.js or fullPage.js that handles
the moving of elements on the page when they are rendered.

Let's check the easiest of those scripts: fullPage.js:

First, we define the name of the class for the image full page.

```js
const classElemFullPage = "imgFullPage";
```

Then, we create our hooks like this:

```js
class fullPage extends Paged.Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
    this.floatFullPage;
  }
}
```

Hooks are sharing the same constructor. That means that if you want to
set a variable and use it in different hooks, you need to set it in the
constructor. In this script, I'm creating a `this. floatFullPage` that we're going to use to find the elements that have the `--page-float: full-page;` custom property.

```js
onDeclaration(declaration, dItem, dList, rule) {
  if (declaration.property == "--page-float") {
    if (declaration.value.value.includes("full-page")) {
      let sel = csstree.generate(rule.ruleNode.prelude);
      sel = sel.replace('[data-id="', "#");
      sel = sel.replace('"]', "");
      this.floatFullPage = sel.split(",");
    }
  }
```

`onDeclaration` is a hook that happens every time a declaration is found.

When that happens, we check if the declaration property is `--page-float` and if the value is `full-page`. If that's the case, we get the value from of the selector (`sel`) using csstree. And we push that value to the `this.floatFullPage` array.

Then, when the content is parsed, we use the selectors from `this.floatFullPage` to add the `fullpage` class

```js
afterParsed(content) {
  if (this.floatFullPage) {
    this.floatFullPage.forEach((elNBlist) => {
      content.querySelectorAll(elNBlist).forEach((el) => {
        el.classList.add("imgFullPage");
      });
    });
  }
```

Then, the magic happens: every time a page is done, we run the following script:

```js
afterPageLayout(page) {
  if (page.querySelector(".imgFullPage")) {
    console.log(page);
    page.classList.add("fullPage");
    page.querySelector(".imgFullPage").style.display = "none";
    page.style.background = `url(${page.querySelector(".imgFullPage").src})`;
    page.style.backgroundRepeat = `no-repeat`;
    page.style.backgroundSize = `cover`;
    page
      .querySelectorAll(".pagedjs_margin-content")
      .forEach((marginContent) => marginContent.remove());
  }
}
```

When a page has a child with the class `full-page`, it will hide the image, and use the `src` attribute of the image and use it as the background for the page. We also put some css styles in there to make sure the background cover the whole page. And one last thing: we remove all the elements in the margin boxes on that page.

The page breaks that arrive before and after are set in the css for the same element.

And the last thing, we register the hook.

```js
Paged.registerHandlers(fullPage);
```

We use the exact same idea for the image to top / bottom, but we're moving them as soon as they're on the page, and we use the amazing `shape-outside` property. We'll cover that deeper in the next installment of this series.

Until then, keep practising music and book design.


The code is accessible [here](https://gitlab.pagedmedia.org/pagedjs-templates/ukulele-demo)

Have fun!
