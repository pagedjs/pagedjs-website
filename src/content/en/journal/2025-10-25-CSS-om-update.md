---
title: "Update about CSSOM"
date: 2025-10-25
draft: true
author: "@julientaq"
class:
intro: "CSS is awesome. Writing CSS is easy. Pushing CSS forward needs a bit more work" 
---


Folks,

Like we said last time, we want to have a proper set up to have a better management of the CSS.

What we want:

- no css preprocessor
- as little transformation of the css as possible (keeping the exact same css lines would be amazing for inspector dev)
- writing new css easily
- polyfill CSS.


## what the problem with CSSOM?


```css
lol {
    color: red;
}
```

So the first thing.


a css rule is made of a selector, a property and a value.

if a selector is not valid, the whole block is discarded.

if a property OR a value is not valid, the rule is discarded.

if there is an @rule in your block (like a @page) and you try to add something that the browser doesnt support, the rule is discarded.


At paged.js we need to support things that browser will support in the future. That’s what a polyfill do.

We need to find a way to make that happen and thus we need to transform the css BEFORE it gets to the browser.

---


## how to fix it


- Reduce the preprocessing to the bare minimum q:q
(basically: replace the word the browser doesn’t know)
- use the cssOM on the fixed CSS to do all the hard work


### Options

1. simple regex transformation

    - easy to setup
    - easy to update
    - dangerous: we don’t know where we are in the css.


2. Using a css tokenizer

    - simpler way to traverse, manipulate and update the css.
    - danger: impossible to find an existing tool to have a CSSOM like  












