---
title: "Push things"
pagedjsversion: "0.4.0 and up"
intro: Move things around before printing the book 
plugin: 
  name: pushThings
  filename: "pagedjs-pushthings.js"
dependencies:
  - csstree 
---


CSS `order` is a great property, put Paged.js doesn’t really like Flex (for now!). This script allows to move elements around.


## How to use it

Add the script to your head after pagedjs has been called

```html
<script src="https://unpkg.com/css-tree@1.1.2/dist/csstree.min.js"></script>
<script src="{{ "https://pagedjs.org/plugins/" | url }}{{plugin.filename}}"></script>
```

For example, consider this html 

```html
<p class="x">x</p>
<p class="y">y</p>
<p class="z">z</p>

```

In the CSS, you can move things using this custom property: 

`--experimental-push`.


```css
/*to move `.x` the element after `.z`*/
.x {--experimental-push: 2}
 

/*to move `.z` the element before `.x`*/
.z {--experimental-push: -2}
```



