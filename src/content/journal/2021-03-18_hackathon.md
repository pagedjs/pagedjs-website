---
title: "A paged.js hackathon at EnsadLab"
date: 2021-03-18T12:00:02+02:00
draft: false
type: post
permalink: /posts/2021-03-hackathon/
id: hackathon-ensadlab
# class: cookbook
author: Julie Blanc
intro: The the 1st and 2nd of March 2021, some graphic designers got together for a Paged.js hackathon in Paris.
tags:
  - hackathon
  - workshop
  - baseline
  - float notes
  - canvas
  - imposition
  - layout
---

On the 1st and 2nd of March 2021, a group graphic designers went together in Paris for a Paged.js hackathon. The goal was to bring together people who already had an experience with Pagedjs to discover how they worked, how they come to layout their content, and to think together about pushing the boundaries further. The hackathon, organised by Julie Blanc and Lucile Haute welcomed Julien Taquet, Manu Vazquez, Louis Éveillard, Sarah Garcin, Robin de Mourat and Quentin Juhel.

![](/images/9J1A5482_retouch.jpg)
![](/images/9J1A5333_retouch.jpg)

Despite the context of that global pandemic, we were able to meet at EnsadLab and we got lucky to have the pleasure of spending two days together.

The idea was to go deeply into how Paged.js works, to work on scripts to improve and extend Paged.js and to discuss what #CSSPrint change in terms of page layouts and new workflows for graphic designers.

We started the workshop looking at projects made by the participants. During the first morning, they showed the specific improvements they had already made to Paged.js and the difficulties they encountered in the layout rendering or in the workflows with their co-workers (authors, editors, print shops, etc.). From there, we worked on different ideas that were raised along that talk.

Generally, we have discussed and worked with [handlers and hooks](https://www.pagedjs.org/documentation/11-hooks/). The source code of Paged.js is organised in such a way in order to facilitate the addition of functionalities through the handlers and hooks. The hooks are a kind of specific breakpoint in the execution of the script that give the possibility to add your own script at different moments of the document pagination and rendering (for example before the css is parsed, and after, before the pagination of the document, before or after the fragmentation of a specific page, before and after the addition of elements in the page, etc.).

![](/images/9J1A5203_retouch.jpg)
![](/images/9J1A5476_retouch.jpg)

The results of the workshops are not usable as working bit directly. Some of them can be adapted to your use if you are comfortable with the use of paged.js, others still require a bit of development. All the source codes are available in [a dedicated repo on our gitlab instance](https://gitlab.coko.foundation/pagedjs/hackathon-mars-2021). In this article, we offer you a summary of the discussions and the work done.

## Documentation

Sarah worked around baselines. She wrote the [beginning of a documentation](https://gitlab.coko.foundation/pagedjs/hackathon-mars-2021/blob/master/baseline-experiment_sarah/baseline-documentation.md) about it (in French): how to uses variables to fit a baseline grid, why using pixel values and instead of pt value, how to add visual guideline, etc. She also developped some [scripts](https://gitlab.coko.foundation/pagedjs/hackathon-mars-2021/tree/master/baseline-experiment_sarah) to automatically align elements (even images) on the baseline grid with the use of `offsetTop`. She went further in the experimentation by positioning the elements randomly in the page and keeping the elements aligned on the baseline.

![](/images/9J1A5322_retouch.jpg)
![](/images/baseline.png)

Manu took advantage of the hackathon to document the ["experiments" repo](https://gitlab.coko.foundation/tools/experiments) available on the gitlab. This repo contains various experimental scripts tried in the last years. Some of them are still under development and can be used for your projects with some adaptations but nobody had taken the time to document them yet. Based on his experience with BookSprints, he also works with Julie on a [little script](https://gitlab.coko.foundation/pagedjs/hackathon-mars-2021/tree/master/delete-margin-content_manu) to delete content of margin boxes when an element appears on the page.

## Canvas HTML for images and for drawing

Following stories of problems with offset printers with the use of CSS mix-blend-mode on some images, Robin and Louis came with the idea of using canvas [to recreate the image and its effects](https://gitlab.coko.foundation/pagedjs/hackathon-mars-2021/tree/master/blend-modes). Beyond CSS `mix-blend-mode`, the use of canvas for images is a real positive point that allows a better optimization of images for printing.

![](/images/9J1A5636_retouch.jpg)

Louis also worked [with canvas](https://gitlab.coko.foundation/pagedjs/hackathon-mars-2021/tree/master/canvas_embedding-louis). He made a system to inject external javascript into canevas and drawing things or downloading API. A script can be added on the fly with the `data-script` attribute in the canvas and the size of the canvas must be given in advance to avoid overflow problems.

## Float notes

Robin and Julie works on an old script written 2 years earlier to create [float notes](https://gitlab.coko.foundation/pagedjs/hackathon-mars-2021/tree/master/notes-float). The script has been improved and optimized because the old version had serious problems with the fragmentation of the text content when notes was moved into floated areas. The idea is to be able to have a first implementation of a part of the [draft specifications for notes](https://github.com/w3c/css-print/issues/3) proposed by the Paged.js team. These are the first foundations but there is still a lot of work to be done to achieve a solid result (so be careful if you want to use the script).

![](/images/9J1A5473_retouch.jpg)
![](/images/float-notes.png)

## Imposition

Quentin, a fanzine lover, makes a lot of Paged.js workshops with students. Most of the time, they print their own productions and therefore need a way to impose the sheets after the paged.js rendering. With Julien’s help, [he made a script](https://gitlab.coko.foundation/pagedjs/hackathon-mars-2021/tree/master/imposition_quentin_juhel) to re-organize the dispositions of the pages, automaticly add pages to have a multiple of 4 and change the size of the spread after the rendering of the document. The script is only a first step and they want to develop it further to make more complex spreads (this whole idea was based on a script Julien Bidoret made).

![](/images/9J1A5506_retouch.jpg)

## Automatic grid layout

Louis used [Potpack](https://mapbox.github.io/potpack/), a “tiny and fast JavaScript library for packing boxes of varying size into a near-square container“, to distribute image elements on the page according to their number and ratio. The [script available on the repo](https://gitlab.coko.foundation/pagedjs/hackathon-mars-2021/tree/master/auto_layout_images-louis) is a good example of how automatic grid layout algorithms (for example [Masonry](https://masonry.desandro.com/), [Packery](https://packery.metafizzy.co/)) can be easily added to Paged.js. The idea is to start preparing javascript modules, usable with the addition of some classes in the HTML. That could be used by people who are not developers or graphic designers who do not code.

![](/images/9J1A5002_retouch.jpg)

## Create a link between content and pagination

During the first morning, Sarah and Julie told about the time-consuming last step of the composition of books: typographic corrections and flag management. The desynchronization of writing (on the HTML source code) and rendering (in the web browser) can make the work fastidious.

![](/images/paged-editor.png)

So Louis looked for a way to create a better link between the two. [He imagined an interface](https://gitlab.coko.foundation/pagedjs/hackathon-mars-2021/tree/master/paged_editor-louis) in the browser with, on the left, the editable content as a single flow and on the right, the paginated render in a page-by-page display. The two area are linked and clicking on an item will display it in both areas synchronously. It's also possible to modify the content on the left and have it update on the right paginated rendering. This is a very good start to imagine more advanced interfaces integrating Paged.js as a tool.

![](/images/montage-1.png)

Hackathon is a very interesting way of working to quickly come up with design ideas and see how to add them in paged.js. These two days were a success and we hope to find the opportunity to do other events.

_Thanks to EnsadLab for the financial and logistic support, Lucile Haute for the great help about the organization, Agathe Charrel for photos and all the participants for this two wonderful days._

<hr>

![](/images/9J1A5546_retouch.jpg)
![](/images/9J1A5566_retouch.jpg)
![](/images/9J1A5614_retouch.jpg)
![](/images/9J1A5465_retouch.jpg)
![](/images/9J1A5511_retouch.jpg)
![](/images/9J1A5115_retouch.jpg)
![](/images/9J1A5299_retouch.jpg)
![](/images/9J1A5370_retouch.jpg)
![](/images/9J1A5382_retouch.jpg)
![](/images/9J1A5157_retouch.jpg)
![](/images/9J1A5257_retouch.jpg)
![](/images/9J1A5303_retouch.jpg)
![](/images/9J1A5390_retouch.jpg)
![](/images/9J1A5419_retouch.jpg)
![](/images/9J1A5430_retouch.jpg)
![](/images/9J1A5537_retouch.jpg)
![](/images/9J1A5539_retouch.jpg)
![](/images/9J1A5716_retouch.jpg)
