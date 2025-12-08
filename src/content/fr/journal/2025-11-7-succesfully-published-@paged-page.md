---
title: "<paged-page> la preview des pages, avec ou sans paged.js"
date: 2025-11-07
draft: false
author: "@julientaq"
class:
intro: "Successfully published @pagedjs/paged-page" 
# id: webcomponent01
lang: fr
---

> Well, you know November has come
When it's gone away
- Gorillaz, *November has come*

Bonjour tout le monde, j’espère que vous allez bien.

Pardon pour le silence, novembre est là et avec lui la lenteur de l’hiver, qui, cette année, a pris la forme d’un covid assez costaud. La bonne nouvelle, c’est que j’en ai fini avec lui pour cette année, on reprend le travail et c’est le moment parfait pour annoncer une chouette avancée dans notre travail de reconstruction de paged.js. Mais avant de plonger dedans, un petit peu de pourquoi.

## Les bénéfices d’une prévisualisation cssPrint

Je suis un chanceux, par ce que j’ai toujours utilisé le navigateur pour générer des livres avec CSSPrint. Je n’ai jamais connu l’expérience laborieuse de générer un PDF en ligne de commande, de vérifier le résultat, de retoucher pour régénérer, encore et encore.

J’ai eu le luxe d’aborder cssPrint via `book.js`, un projet fondé par Adam Hyde (comme paged.js) qui utilisait les CSS Regions pour générer les pages. Vous faisiez un changement à la page 2, et tout le livre se reconstruisait à partir de là. Et on pouvait tester rapidement toute nouvelle idée improbable grâce à l’inspecteur, tout était visible à l’écran. Mais les CSS Regions ont été abandonnées par l’équipe de Chromium, puis WebKit a suivi, et tout ce qui concernait les CSS Regions a disparu.

J’ai dû utiliser une version très précise de Chromium, qui tournait sous une version très particulière d’Ubuntu dans une machine virtuelle sur un mac en galère pendant (trop) longtemps (et à l’époque, nous n’avions pas de SSD, tout était tellement lent). 

Et j’étais pas le seul à galérer : même l’équipe d’Open Source Publishing a fini par créer leur propre fork de WebKit pour soutenir leur travail de design graphique.

Nous, designers, aimons expérimenter avec nos outils, et le navigateur est l’un des environnements les plus accessibles pour ça. Besoin de faire une affiche ? On va construire notre propre système de prévisualisation à l’écran pour s’assurer que le print corresponde à ce qu’on a en tête. Et pour y parvenir, on passe beaucoup de temps à reproduire une page à l’écran (et prête à être imprimée).

Mais la plupart du temps, cet HTML et ce CSS sont littéralement une version simplifiée de ce que paged.js génère pour l’affichage à l’écran: on crée un `<div>` qui représente la page, avec du CSS pour gérer la prévisualisation : on donne à ce `<div>` la taille définie dans le @page, on règle l’*overflow*, et si on veut vraiment réutiliser le système, on définit une grille CSS précise (mais qu’on ne réutilise jamais vraiment).

Et à force de copier/coller, on reconstruit la même chose à chaque fois qu’on en a besoin, et c’est pas très marrant, parce qu’on oublie toujours une ligne ou on tombe sur un nouveau bug et on passe du temps à gérer des galères d’oubli là ou on devrait apprécier un moment de design.

Quand on a décidé de mettre à jour paged.js, il était évident que chaque morceau du programme pouvant être réutilisé à l’extérieur serait rendu disponible tel quel. Aujourd’hui, nous publions le premier bloc : le composant web <paged-page>.


## Mais au fait, c’est quoi un web-component ?

HTML est fait de balises standards que l’on partage tous d’une page web à l’autre, comme un langage commun. `<h1>` est un titre de niveau 1, `<p>` un paragraphe, et `<figure>` un élément qui sera compris par les lecteurs d’écran comme une figure. Ces balises ont des attributs (par exemple `id` ou `class`, les plus connus) et un comportement défini par le W3C et implémenté de façon similaire dans les navigateurs. Par exemple : une balise `<img>` possède un attribut `alt`. Cet attribut permet à l’auteur de fournir une description de l’image, qui sera lue par un lecteur d’écran à une personne malvoyante. Ce comportement est décrit dans les spécifications, avec des règles sur la manière dont l’élément doit fonctionner.

Un web-component est un ensemble de technologies permettant aux auteurs d’écrire leurs propres element HTML.

En utilisant un simple fichier `.js`, un web-component regroupe sa structure HTML (le template), son CSS (les styles par défaut) et son comportement (s’il a des intéractions, ce qu’il doit rajouter au html ou tout autre idée encapsulable dans un élément HTML). Et pour l’utiliser, on inclut ce fichier dans une balise script dans notre HTML et voilà, on peut utiliser le web-component.

L’un de mes web-components préférés est une prévisualisation de clavier:  [x-keyboard](https://onedeadkey.github.io/x-keyboard/) ([source](https://github.com/OneDeadKey/x-keyboard)). C’est l’outil parfait pour afficher une disposition de clavier à l’écran, et il peut même réagir aux touches réellement tapées par le visiteur. 

`paged-page` est donc un web-component destiné à afficher la prévisualisation d’une page imprimée à l’écran, en suivant les instructions W3C utilisées pour l’impression.

Vous voulez imprimer une page avec un énorme texte au milieu ? Voici le HTML à écrire (je vous laisse le plaisir de choisir le CSS pour centre le texte, il y a trop de solutions possibles, on n’est plus en 2002).

```html
<paged-page><h1>Le magasin sera fermé pour Noël. À l’année prochaine !</h1></paged-page>
```

Tout le CSS nécessaire à la prévisualisation et à l’impression est inclus dans le composant. Plus besoin de passer trop de temps à retrouver la dernière bonne version.

Et nous sommes allés un peu plus loin en ajoutant des attributs pour gérer directement depuis le HTML tout le CSS nécessaire (que l’on trouverait normalement dans un `@page`) : bleed, marques, marges, largeur et hauteur sont ajoutées en attributs puis transmises au CSS et au HTML.

L’un des avantages d’un web-component, c’est qu’il peut être stylé très facilement : il suffit de faire ce que vous feriez avec une balise HTML classique :

```css
paged-page#id {
    padding: 3em;
    background: green;
}
```


…et voilà, votre page a maintenant un padding de 3 mm et un fond vert.

Plutôt facile, non ? J’espère que vous allez aimer ça, nous sommes vraiment enthousiastes quant aux possibilités que cela va offrir.

### Pages en cascade, ou comment j’ai appris à styliser le contenu à l’intérieur de la page

Conceptuellement, dans le monde du web-to-print, la feuille de papier n’impacte pas la mise en page de son contenu (à part ce que @page peut faire) : en bref, vous ne pouvez pas définir le style du contenu d’une page selon le type de page sur lequel il se trouve.

Un exemple simple : supposons que votre design impose que le texte de la treizième page soit d’une autre couleur, sans savoir à l’avance ce qui se trouvera sur cette page. Vous pourriez imaginer écrire :

```css
@page:nth(13) {
  .funny-text {
    color: green;
  }
}
```

Eh bien, vous ne pouvez pas. Parce que les spécifications n’autorisent que des propriétés liées à la page dans @page. Vous pouvez définir les marges, le bleed, les marques, la taille de la page… mais pas le style de son contenu.

Car cela créerait un problème de cascade : imaginez qu’ailleurs dans votre CSS vous écrivez :

```css
.funny-text { color: yellow }
```

De quelle couleur serait votre texte ?

Et imaginez les bizarreries possibles avec la taille du texte : si le texte doit être énorme sur la page 10, mais qu’en devenant énorme il passe à la page 11, que doit-il y avoir sur la page 10 ?

Eh bien, paged.js propose une réponse un peu étrange, liée aux transformations qu’il applique aux styles. Tout @page:nth(13) est transformé en classe : @page devient div.paged_page.paged_nth_13, qui accepte le CSS imbriqué et ne pose donc aucun problème pour styliser les éléments enfants, avec une spécificité claire.

J’appelle ça la cascade quantique : ça existe et ça n’existe pas, jusqu’au moment où ça apparaît dans la page finale.

Mais c’est parfois un jeu de hasard : parfois, vous ne voulez pas que ça arrive, et vous restez coincé avec cette fonctionnalité-qui-n’est-pas-un-bug. Heureusement, dans le monde des web-components, c’est différent. Regardez ce HTML :

```html
<paged-page
  id="page-12"
  name="id-of-the-page2"
  width="100mm"
  height="100mm"
  bleed="5mm"
  margin="8mm 14mm"
  marks="cross crop"
>
  <h2>Ceci est une page de taille normale.</h2>
  <p> il y aura un peu de contenu ici.</p>
</paged-page>
```

Si je veux changer la couleur du texte, j’ajoute ce CSS :

```css
#page-12 {
    background: green;
    h2 {
        color: blue;
    }
}
```


Comme vous le voyez, le composant est quasiment invisible : on peut styliser le contenu via la cascade classique.

Mais peut-être que je veux modifier le style de la zone de page elle-même. Dans ce cas, il faut rendre le composant visible. C’est justement le rôle du pseudo-élément ::part.

```css
#page-12::part(page-area) {
    background: yellow;
}
```


Ça peut sembler anecdotique, parce qu’ici on parle seulement de page-area, mais dès que vous avez des marges, cela devient extrêmement puissant : vous pouvez cibler très profondément dans la structure avec un simple raccourci :

```css
#page-12::part(bottom-center) { text-transform: uppercase; font-size: .8em }
#page-12::part(bottom-right)::after { content: counter(page) }
``` 

## Récapitulatif

`<paged-page>` est un composant qui attend les attributs suivants :

- `width` : largeur de la page (hors bleed)
- `height` : hauteur de la page (hors bleed)
- `bleed` : la quantité de bleed (pour le moment, pas encore de valeurs différentes par côté)
- `margin` : les marges, écrites exactement comme leur équivalent CSS
- `marks` : les marques de coupe et de repérage à ajouter

Et puisqu’il s’agit de HTML, vous pouvez ajouter n’importe quel attribut utile à votre code. Par exemple, paged.js ajoutera data-paged-ref pour gérer les sauts de page.

Le composant contient trois éléments :

les `page-marks` : pour le bleed et les marques ;

les `paged-margins` : pour accéder rapidement aux margin-boxes via le web-component `paged-margins`` ;

la `page-area` : où apparaît le contenu du composant.

Si vous avez plusieurs pages avec plusieurs tailles, l’enregistrement en PDF créera un PDF multi-format.

Notez que dans ce cadre, il n’est plus nécessaire d’ajouter le `@page` au css, puisque tout est fabriqué par le composant HTML.


## À propos des marges

Et tant qu’à avoir la page, on s’est dit, pourquoi pas ajouter les marges, et en faire des web-componants. Comme vous le savez peut-être, dans CSSPrint, il existe 17 emplacements pour intégrer des contenus dans les marges sur une page:

<figure><img src="/images/margin-boxes.png" /></figure>

Les trois quarts du temps, quand on n’utilise pas paged.js, on ne prend pas le temps d’ ajouter les *margins-boxes*. On finit par utiliser du `position: absolute` dans notre CSS, sur chaque page, pour aller au plus vite.

Mais si la prévisualisation de votre page inclut les marges par défaut, alors il devient facile de les utiliser. Et comme elles sont nécessaires pour paged.js, on les a ajouter au composants (ou plus exactement, on a fabriqué d’autres composants).

```html
<paged-page>
    <paged-margins slot="page-margins">
        <paged-margin-content slot="top-left">le texte courant en haut à gauche</paged-margin-content>
        <paged-margin-content slot="top-right">en haut à droite</paged-margin-content>
        <paged-margin-content slot="left-top">dans la zone le plus haut de la marge de droite.</paged-margin-content>
    </paged-margins>

    <h2>il y a des marges partout !</h2>
</paged-page>
```


Ici, nous avons une page contenant des marges, et le reste du contenu remplit la page-area.

Comme souvent c’est le genre d’outil qui s’apprend en essayant. (dans les semaines qui viennent on va faire pas mal d’exemples, mais tout est là pour que vous puissiez commencer à essayer).

Nous espérons que vous allez adorer jouer avec ça ! (et qu’on puisse très vite intégrer tout ce boulot à paged.js)

> Vous voulez tester rapidement ? Ajoutez simplement ce script à votre HTML et allez commencer à tester des trucs, et n’oubliez pas de venir nous dire comment ça s’est passé pour vous!

```html
<script src="https://app.unpkg.com/@pagedjs/paged-page@0.1.0/files/dist/PagedPreview.js">
```

---

Oh un truc qui n’a rien avoir, mais AntonioJesusBlanco s’est proposé pour traduire la documentation existante en espagnol, et la branche `git` est prête. https://github.com/pagedjs/pagedjs/issues/310

venez participer si vous le souhaitez!

À très vite.

