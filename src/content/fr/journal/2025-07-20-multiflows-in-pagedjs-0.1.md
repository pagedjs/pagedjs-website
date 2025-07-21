---
title: "Multiflwo in paged.js"
date: 2025-07-26
draft: true
author: "@julientaq"
class:
intro: Il est difficile de penser le web autrement que son long flux vertical, héritage de la roue crantée de la souris. Mais avec l’apparition des grilles CSS et de flex, il est intéressant de se poser la question de ce que ça signifie pour l’imprimé
lang: fr
---

S’il est facile d’imaginer un livre multilingue qui partagerait ses pages pour y accueillir les contenus dans deux langues, il a toujours été difficile d’imaginer le web autrement que ce long flux vertical, héritier de la molette. Le contenu d’une page démarre en haut, et se termine, lorsqu’il n’y a plus de contenu à poser sur la page, bien en-desssous de ce que l’écran laisse entrevoir, donnant à chacune l’illusion de l’infini, ce que les économistes de l’attention ont bien intégré à leurs outils.

En réalité, nous avons bien imaginé des subterfuges pour proposer un semblant de flux parallèle, de la mise en page grâce aux `table` jusqu’à l’apparition des grilles CSS ou de Flex, mais il s’agit toujours de ce même mouvement descendant, et même si le tour de magine est invisible, par ce que remarquablement réalisé, il saute aux yeux dès lors qu’on souhaite le traduire sur un média paginé.

La promesse non tenue des régions CSS
-------------------------------------

Quand les éditeurs du w3c travaillent sur les spécifications pour l’imprimé, le web n’est pas encore un monde de web app, de CSS surpuissant et d’automatisations de mise en page. On sort à peine des layouts de `<table>` et on découvre le monde merveilleux des *floats* (de l’habillage de texte, très conditionnel). C’est encore le web du document pour lequel une page a un début (en haut) et une fin (en bas). Autant dire que quand on pense l’imprimé, on ne cherche pas beaucoup plus loin que de découper ce flux en une suite de pages jusqu’à former, pour les esprits les plus fous, un livre.

Bon, en vrai, y a eu des tentatives, dont une assez poussée, qu’on appelait les régions CSS, et qui permettaient de définir des espaces dans lesquels faire couler des flux de contenu auparavant dissociés dans le code HTML. Et c’était tout sauf simple: l’HTML était divisé en deux: d’une part le contenu, et d’autre part le contenant. Et un CSS complexe qui définissait les positionnements des boites, et la forme de leur contenu. Je ne reviendrai pas ici sur les raisons qui ont poussé les gens de Chromium à abandonner l’idée, par ce que ce serait trop long et sujet à tellement de controverses qu’on y perdrait la journée (et un peu de santé mentale). Sachez simplement que, l’espace de quelques années, nous avions des régions CSS dans Chrome et que nous avions su nous en servir.

Et d’ailleurs, Open Source Publishing, à qui le CSS Print doit énormément, a montré plus d’une fois l’intérêt d’une telle pratique, même si je crois que le meilleur exemple vient de [*The Riddle*](https://osp.kitchen/work/the-riddle/).

![Une reproduction du livre The Riddle conçu par Open Source Publishing, en web2print, qui montre deux flux de texte indépendants qui partagent la page.](/images/theriddle.png)

Et CSS Grid fut.
----------------

Si on regarde les vidéos de présentations des grilles CSS, celles produites pour pousser à leur adoption, on retrouve toujours mentionnée l’idée qu’il s’agit de retrouver des artifices de mises en page qui viennent du livre. Et en particulier des expérimentations graphiques qui viennent tout droit de la presse magazine.

La grille CSS est l’étape totale de la séparation entre le contenu et sa forme. Si avant ces propriétés, le HTML se devait de donner l’ordre selon lequel devaient s’afficher des éléments sur la page, ce n’est plus forcément le cas aujourd’hui, puisque le CSS offre la possibilité aux auteurs de définir, en plus de leur forme, le positionnement et l’ordre de ces contenus.

La façon la plus simple de regarder une grille CSS, c’est de voir un plateau de touché-coulé. Pour y déposer chaque bateau, il suffit de donner ses coordonnées horizontales et verticales sur une grille en 2D. Dès lors, l’ordre de lecture n’est plus descendant, il est multiple, et dépend de l’organisation de la page induite par le CSS.

Pour autant, la grille CSS a une limitation fondamentale : aucun élément ne peux être séparé en deux blocs de cette grille. L’image suivante démontre quelque chose d’impossible en CSS :

![Un contenu textuel séparé entre deux blocs de texte](/images/blocalautre.jpg)

Le print comme cheval de Troie
------------------------------

Le bon côté du CSS print, c’est que contrairement au web, on travaille sur une page dont les dimensions sont limitées, et qu’il nous appartient de prendre les décisions graphiques et typographiques qui autorisent la coupe d’un long texte en une infinité de plus petits. Même si les spécifications du W3C montrent que des questions se sont posées et que des réponses ont pu apparaître, il est certain que la traduction en imprimé est un impensé des évolutions du web. 

D’abord parce que l’imprimé ne représente qu’un usage limité de notre vie numérique et ensuite par ce que cela viendrait poser une question épineuse : si on le fait pour un média paginé, pourquoi est-ce qu’on ne le ferait pas pour le web ? Si une grille CSS imprimée doit permettre la coupe d’un contenu sur plusieurs cellules, alors pourquoi est-ce qu’on ne peut pas se le permettre à l’écran ?

Une chose intéressante à faire lorsque qu’une pratique n’a pas l’air d’exister sur le web, c’est d’investir le champ et de commencer à réfléchir à des solutions, suffisamment abstraites pour être réutilisables et assez claires pour être expliquées, commentées et analysées. 

La question du multiflux est difficile quelque soit le média, mais c’est le média paginé qui semble avoir le plus besoin de réponses, puisque contrairement à l’écran, le papier n’est pas infini. Dès lors, voici un retour d’expérience sur le multiflux dans paged.js, organisé autour du projet Écran Papier Éditer, (EPE), mené par l’Ésad Grenoble / Valence.



Dans le cadre du projet, les designers ont eu besoin d’une solution pour mettre en page des textes en plusieurs langues, de les traiter avec les mêmes égards, en évitant d’en placer un avant l’autre. Parfait point de départ pour remettre la question des régions CSS sur la table, maintenant que les grilles CSS sont devenues un outil central dans les habitudes de web design.

pagedjs-multi-flow.0.1b.js
--------------------------

Pagedjs multi flow est un plugin paged.js qui permet de définir des flux dit parallèles (à défaut d’un meilleur nom). L’idée est d’utiliser le CSS pour définir des flux qui partageront un espace, que ce soit une page (plusieurs langues sur la même page), soit une double page (où chaque langue a sa propre page).

Pour se faire, nous utilisons une propriété CSS inventé pour l’occasion, que nous appellerons `--parallel-flow`. Cette propriété attend pour valeur le nom d’un flux qui servira d’identifiant. Tous les éléments qui possèdent la même valeur pour cette propriété feront donc parti du même flux parallèle.

Prenons par exemple ce HTML :

```html    
<section id="alpha">contenu</section>
<section id="beta">contenu</section>
<section id="delta">contenu</section>
<section id="epsilon">contenu</section>
```

et ce CSS :

```css

#alpha {
  --parallel-flow: main;
  width: 30%;
}

#beta {
  --parallel-flow: main;
  width: 65%;
  margin-left: auto;
}

#epsilon {
  --parallel-flow: else;
  width: 45%;

}

#delta {
  --parallel-flow: else;
  width: 45%;
  margin-left: auto;
}
```

Notez que chaque élément possède déjà les proprités de placement : `#alpha` a une largeur de 30% de son partent, `#beta` de 65% et sera placé à droite, grâce à l’utilisation de `margin-left: auto`. Les blocs définis ici sont donc les emplacements des contenants.

`#alpha` et `#beta` devront être traités en même temps et partager un espace, `#epsilon` et `#delta` en partagent un autre.



### La config du javascript

Le javascript attend une configuration spécifique qui informe sur le type de contenu et surtout les choix de sa mise en place

Le type de flux:

* `samepage` : les flux partagent les mêmes pages
* `samespread` : les flux partagent la même double page 

```javascript 
this.flowLocation = "samespread";
```

ou
```javascript
this.flowLocation = "samepage";
```
    

Dans le cas de flux qui seraient configuré pour utiliser le `samespread`, on peut automatiquement ajouter une page blanche si les flux ne sont pas de même longueur.

```js 
this.flowSpreadAddWhite = true;
```

### Ce qui se passe.

1. Paged.js trouve le point de départ de chaque flux et en marque le premier élément comme le point de départ du flux parallèle.
    
2. Paged.js dessine les deux éléments en suivant les règles de css, pour trouver le plus long qui devient le flux principal de ce flux, et il est déplacé avant le premier élément du flux. Les flux secondaires sont envoyés tout à la fin du contenu pour être traités dans un second temps.
    
3. Une fois la totalité du contenu mis en page, Paged.js retrouve chaque flux principal et ramène les éléments des flux secondaires sur les mêmes pages (ou sur les pages adjacentes dans le cas d’un `samespread`), avant de supprimer les pages qui sont maintenant vides. Note: s’il s’agit d’un `samespread`, les pages sont directement déplacées.
    

![](/images/flows.jpg)

### Bonus, une expérimentation.

Il arrive que le flux principal contienne des images. Et il n’est pas rare de vouloir ces images dépasser de la largeur de texte, sans forcément empiéter sur l’espace nécessaire à un autre flux. Pour cela, on utilise `--parallel-impact: all`. Cette fonctionnalité expérimentale permet d’autoriser les éléments du flux principal à impacter la mise en forme des flux secondaires. Un cas d’usage : une image du premier flux, en habillage, pourrait, en plus d’habiller le premier flux, habiller le second : d’un point de vue technique, un élément invisible flottant est rajouté au début de ce flux secondaire, sur la page ou l’élément A existe. Ce nouvel élément peut être sélectionné en CSS

Il est possible que le positionnement de l’élément rajouté ne soit pas positionné correctement, c’est pourquoi il est possible de rajouter dans le css les changements nécessaire. Pour cela, il faut retrouver l’identifiant de l’élément et rajouter `-overlap` dans son id.



Par exemple:

```css   
#porco {
    --parallel-impact: all;
}
```


Pour modifier l’élément overlap fabriqué, par exemple dans la secion #alpha

```css
#alpha #porco-overlap {
   width: 350px !important;
}
```


* `--parallel impact` ne marche qu’à condition que l’image soit dans le flux principal. Puisque c’est le flux qui est mis en page avant les autres, et qui ne peux donc pas prendre la main sur la suite. Le flux principal est automatiquement détecté, il s’agit du flux le plus 
long (en prenant en compte les objets et images. Pour se faire, le script fait une première passe de mise en page avant de couler le contenu pour de bon) 
    
### Dernière remarque 

*   Les versions futures permettront de définir, pour chaque flux le type, s’il s’agit d’un `same-page` ou d’un `same-spread` à l’aide d’un `--parallel-flow-policy: [same-page | same-spread]` ainsi que d’un `--parallel-flow-fill: [balance|auto]` ou `balance ajoute une page blanche et `auto` laisse le flux couler automatiquement.

