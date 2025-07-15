---
title: Les questions les plus fréquentes autour de paged.js
menu: FAQ
---

## Quelles différences y a-t-il entre `paged.js` et `paged.polyfill.js`?


Paged.js est délivré sous deux formats :

1. `paged.js` qui permet à l’utilisateur de définir le contenu, les styles utilisés et l’élément HTML dans lequel paged.js produira la pagination. Il s’utilise comme suit :


```javascript
let paged = new Previewer();
let flow = paged.preview(DOMContent, ["path/to/css/file.css"], document.body).then((flow) => {
	console.log("Rendered", flow.total, "pages.");
})
```

2. `paged.polyfill.js` qui lui, est un script qui lance paged.js dès que le navigateur a chargé la page. Il prend tout le contenu du `<body>`, toutes les feuilles de styles appelées dans le `<head>`, et le HTML produit remplace l’intégralité du `<body>`.


Paged.js fonctionne de la même manière quelque soit le script.

