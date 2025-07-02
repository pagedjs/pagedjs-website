---
title: "Add id to elements"
pagedjsversion: "min: 0.2.0"
intro: Add ID to all your element in html!
plugin: 
  name: addID
  filename: "pagedjs-addid.js"
---

This script add `id` to all the elements, unless it already has one.
Pretty useful to have custom or manual layout.

## Usage

Add the script to your head after pagedjs has been called

```html
<script src="{{ "https://pagedjs.org/plugins/" | url }}{{plugin.filename}}"></script>
```

