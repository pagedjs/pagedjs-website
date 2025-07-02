---
title: "change or add lang"
pagedjsversion: "0.4.0 and up"
intro: Add a lang attribute to the html if it’s not available in the HTML. 
plugin: 
  name: pagedjs-plugin-lang.js
  filename: "pagedjs-plugin-lang.js"
dependencies:
  - csstree 
---

To be able to have a proper hyphenation in your content, your html file needs
to provide the attribute `lang`. Sometimes, you’d like to provide a lang but you
can’t change the HTML. In paged.js can look at the css properties and create
custom ones to change the html This script offers the possibility to add lang
attribute using CSS.

## How to use it

Add the script to your head after pagedjs has been called

```html
<script src="https://unpkg.com/css-tree@1.1.2/dist/csstree.min.js"></script>
<script src="{{ "https://pagedjs.org/plugins/" | url }}{{plugin.filename}}"></script>
```

For example, consider this html 

```html
  <section class="french">
    <h2> Qu'est-ce que le Lorem Ipsum? </h2>
    <p> Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker. </p>
</section>
<section class="english">
    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
</section>
```

In the CSS, you can move things using this custom property: 

`--experimental-pagedjs-lang`.


```css
    .french {
      --experimental-pagedjs-lang: fr;
    }
    .english {
      --experimental-pagedjs-lang: en;
    }
```



