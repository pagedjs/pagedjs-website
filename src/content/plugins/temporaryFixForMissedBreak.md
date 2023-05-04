---
title: "Temporary fix for break after avoid"
pagedjsversion: "Tested on 0.4.2 and up"
intro: Sometimes you have two elements that should be tied together but chrome doesnt seem to care. This will make him care a bit more 
plugin: 
  name: fix-break-after-avoid
  filename: "pagedjs-temporaryFixBreakAfterAvoid.js"
---

This script will make sure that no element on the bottom on the page has a `data-breakAfter="avoid"` attribute, to make sure things stick together.


