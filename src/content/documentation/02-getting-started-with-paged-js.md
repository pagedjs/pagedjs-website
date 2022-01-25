---
title: "Getting Started with Paged.js"
date: 2019-09-03T18:23:22+02:00
draft: false
part: 2
intro: "The basics to run Paged.js"
cover: "/images/chuncker-1.png"
class: documentation
symbolContent: "𝄢"
symbolText: "The Musical Symbols block covers characters used by basic Western musical notation and its antecedents (mensural notation and plainsong - or Gregorian - notation). [Read More](https://decodeunicode.org/en/scripts/musical_symbols#musical_symbols)"
---

## Starting Paged.js

Paged.js comes in two flavours: a polyfill that will automatically run when you starts the browser, a npm module that you can run or a command line that uses a headless browser. All can be adapted to your need pretty easily, but feel free to use what’s the more convenient for you.

### Using Paged.js as a polyfill in web browsers

To be able to run Paged.js on your document, you will need the following:

- The html and css files you want to transform into a book;
- Paged.js script (either locally, or using our CDN link);
- A web server to let the polyfill access your CSS file;
- a web browser to see the magic in the screen.

#### Getting the script

To download the polyfill, go to the [releases & downloads](https://www.pagedjs.org/documentation/releases/) page. You can choose the latest or older versions of `paged.polyfill.js`.

Copy the script in a file and call it from the head of your HTML file:

```html
<script src="js/paged.polyfill.js"></script>
```

If you prefer, ou can use the hosted version of the script on [unpkg.com/pagedjs](https://unpkg.com/pagedjs) by copying the line of code below in the `head` of your document. If you need a previous version of Paged.js you can check the releases on [unpgk.com/browse/pagedjs](https://unpkg.com/browse/pagedjs/). Please notice the button top right to get to older versions.

```html
<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
```

As soon as your browser has loaded everything your HTML needs to be shown on screen (including images, font files, etc.), the script will start paginating the content and pages will appear on your screen.

#### Preview your work (interface)

Paged.js will manipulate the DOM so the browser can understand the css rules you wrote. On screen, pages will be shown from top to bottom on the left side of the page. To have a better understanding of what’s happening on the page, we made a small CSS file call interface that defines the layout to show your book on screen. Since we’re using `@media screen`, page borders and shadow won’t appear on paper when printed. To download the file of the interface go to the [repo on gitlab](https://gitlab.coko.foundation/tools/interface-polyfill), download the `interface.css` file and link it to your document in the `<head>`. Please check the file, as it already offers options to show facing pages, recto/verso, baseline, etc.

```html
<link href="path/to/file/interface.css" rel="stylesheet" type="text/css" />
```

#### Generate your first PDF from the browser

Once Paged.js has done its work, you can generate the PDF using the Save as PDF function your browser is using.

1. Click on the “Print” button of your browser. (It will most likely be in `File > Print` or, on your keyboard, `CTRL/CMD + P`)

2. Change the _Destination_ to "Save as a PDF file”.

3. In the advanced settings, as Paged.js is not using any of those options, you need to be sure the that the following statements are right:
   - _Margins_ are set to “none”,
   - “Headers and footers” is unchecked or set to none,
   - “Background graphics” is checked.

You can then open your PDF in your favorite PDF reading tool.

### Command line version

The command line version of Paged.js uses a headless browser (a browser without any graphical interface) to generate a PDF. It can be run on the server to launch a headless Chromium in fully automated workflows. With the command line version, you don't need to call the Paged.js script in your document: it will be done automatically.

First, download and install `pagedjs-cli` with your terminal (you need to have `git`, `node` and `npm` installed):

```bash
$ npm install -g pagedjs-cli pagedjs
```

Then, in a new terminal window, go to the folder where the code of your document is located (use the `cd` command) and generate your PDF with the following command:

```bash
$ pagedjs-cli index.html -o result.pdf
```

Some options to generate the PDF:

```bash
-h, --help                  output usage information
-V, --version               output the version number
-i, --inputs [inputs]       Inputs
-o, --output [output]       Output
-d, --debug                 Show Electron Window to Debug
-l, --landscape             Landscape printing
-s, --page-size [size]      Print to Page Size [size]
-w, --width [size]          Print to Page Width [width]
-h --height [size]          Print to Page Height [weight]
-m, --page-margin [margin]  Print with margin [margin]
-n, --hyphenate [lang]      Hyphenate with language [language], defaults to "en-us"
-hi, --hypher_ignore [str]  Ignore passed element selectors, such as ".class_to_ignore, h1"
-ho, --hypher_only [str]    Only hyphenate passed elements selector, such as ".hyphenate, aside"
-e, --encoding [type]       Set the encoding of the input html, defaults to "utf-8"
-t, --timeout [ms]          Set a max timeout of [ms]
```
