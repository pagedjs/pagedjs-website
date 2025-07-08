# PagedJS Website

<!-- TODO: 
- new design with colors, we’re now paged.js with colors
- CSS for languages menu 
-->




Pagedjs.org website is possible thanks of all the amazing work of the people behind [Eleventy](https://11ty.dev). If you didnt send money to them, now is a good time :)

## Files organization

The content for the website is in `/src/content/`. 

Each subfolder contains a languages following the standard: "en" for english, "fr" for french, etc.

If a file with the same name and path exist in the two folders, 11ty will find them and generate the links for each of them. It will also update the url depending on the page the user will be on. In short:

```
content/fr/pages/hello.md
content/en/pages/hello.md
```

will set one page in french and one in english.

If a page only exists in one lang, the site will show a link to github to welcome contributions.

we also made a custom github issue for translation



## How to contribute 

If you want to contribute to the website by providing fixes, translations or else, feel free to [open an issue on github](https://github.com/pagedjs/pagedjs-website/issues/new).

