---
title: "A collection of starter kits for Paged.js "
date: 2022-04-15
draft: false
author: "Julie Blanc"
class: cookbook
intro: "Paged.js have been used by book designers quite a lot over the past few months. And looking at code can always be a tricky thing when you’re used to look at classic design tools. So we made some starterkits"
tags:
  - starting with Paged.js
  - guide
permalink: /posts/2020-04-15-starterkits-for-pagedjs/
---

We’ve done a lot of work to bring new users to paged.js and as i’m on my way to a new workshop with graphic design students, I thought that it would be a good time to share a little bit more about the different [starter kits](https://gitlab.coko.foundation/pagedjs/starter-kits) I've build around Paged.js since a few years to help anyone to get started.
And since not everyone has the same needs, it will be four stater kits instead of one.

Depending on your needs, you can start from these ready-made folders that contain Paged.js, some CSS reset code, a bit of interfaces and sometimes JavaScript features to help your work. Choose the right one !

## The spread book template: the lightest starter-kit

This is the simplest template, which uses the polyfill in an HTML page. The folder is already structured for you:

- An HTML file where to add the structured content of your book, the file contains the links to all other files and elements;
- A CSS file that help you to see your book in spread and where you can add the visualization of a baseline (Be careful, this visualization in spread and the baseline is only for the screen. When rendering the PDF, it will be page by page again.)
- A [CSS reset file](https://github.com/necolas/normalize.css) to normalize the style of some elements;
- The folder for your assets: a `fonts`, an `images` and a `scripts` folder where you can add your custom scripts with a pre-coded [handler](https://pagedjs.org/documentation/10-handlers-hooks-and-custom-javascript/);
- And, of course, the latest version of Paged.js.

This starter-kit exist in two version: the [polyfill version](https://gitlab.coko.foundation/pagedjs/starter-kits/book-spread_polyfill) and the [esm module version](https://gitlab.coko.foundation/pagedjs/starter-kits/book-spread_esm). The difference is the way Paged.js is called on the web page. The esm version is more flexible if you want to add your custom scripts to Paged.js or integrate it with other tools.

The polyfill version contains in addition a little helpful script developed by the great Nicolas Taffin, the [reload-in-place script](https://gitlab.com/nicolastaf/pagedjs-reload-in-place): “On reload, it will make the web browser scroll to the place it was before reload.”

You can easy add it this template in an existing site, in a print folder for example. This will allow you to access a special page to print a part of your site. All the HTML content of your site must however be rewritten in this HTML page.

## The advanced interface template: to facilitate your design process

This advanced [starter-kit](https://gitlab.coko.foundation/pagedjs/starter-kits/book_avanced-interface) contains a little interface and some features to help you during your design process. It's a template that I developed during workshops for graphic design students not used to code but which can also be used for the production of books on a daily basis. All the element of the previous “spread book template“ are also in this start-kit. I also added different features that can be used with buttons always present on the web page:

- display of the baseline with modification of its values,
- display of margin boxes,
- “visualization” mode where the cut lines are hidden,
- print button
- And number of generated pages displayed.

![](/images/22-04-advanced-interface.png)

## The “print-a-webpage” template: a responsive web page that can be printed

The last start-kit I propose is the [“print-a-webpage” template](https://gitlab.coko.foundation/pagedjs/starter-kits/print-a-webpage). It offers a double view of a web page: the classic web page for the responsive screen display and a paginated display for printing. Both displays are made from the same HTML content but the CSS for each version are separated. Buttons on the side of the web page allow you to switch from one version to the other or to print.

In the printed version, all the element of the previous “spread book template“ are also in this start-kit, except the reload-in-place script.

![](/images/22-04-print-a-webpage.png)

## Don't forget your local server

Before your start, just a reminder: you need to use a local server to work on your project. Paged.js needs it to make links from one file to another and in particular to read yourCSS files. Today, all the most used text editors have extensions to launch a local server ([Visual Studio, Atom](https://www.youtube.com/watch?v=FeR_eMXzNcY), [Sublime Text](https://www.youtube.com/watch?v=oqD5C77Tk3I), [Atom](https://www.youtube.com/watch?v=f35_n9NFXSw)).

If you haven't done it yet, you just have to install one of these extensions and launch the local server from your project. Please note that the entire folder of your project must be open in your editor for the local server to work properly.

Most of the errors and difficulties come from the fact that the local server is not turned on, so I advise you to be particularly vigilant on this point.

You are now ready to get started with Paged.js! We would be very happy to see your productions, so jump on the [Coko Mattermost](https://mattermost.coko.foundation/) to say hello (~pagedjs channel) or contact us on [twitter](https://twitter.com/paged_js).
