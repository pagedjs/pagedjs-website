---
title: "Le prochain chapitre de Paged.js"
date: 2025-05-17
draft: false
author: "Julien Taquet"
intro: ""
---

Je me souviens précisément de la pièce où, accompagné d’Adam Hyde et de Fred Chasen, nous regardions les possibilités existantesp pour transformer du HTML en PDF, et alors qu’on ne trouvait rien de probant, Adam s’est arrêté, nous a regardé et à dit : *Let’s just make it*.

Et nous voilà partis. Julie Blanc nous a rejoint très vite, et au bout de quelques mois nous avions un preuve de concept fonctionnelles, et en moins d’un an, une bibliothèque javascript capable de produire des PDF. Rien de tout ça n’aurait pu être possible si Adam et Coko n’avaient pas autant investi de temps et de ressources dans le projet.

Les années qui ont suivi ont surtout été le moment de mettre le *CSS Print* sur le devant de la scène, comme pierre angulaire du *single source publishing*. La majorité de notre travail consistait à accompagner les utilisateurs de paged.js, que ce soit pour de accompagner des implémentations & des workflows, former des designers et des éditeurs aux concepts de `web to print`, participer à des salons du livres et évenements professionnels, et, lorsqu’il restait un peu de temps, accompagner des projets de livres numériques multi-formats.  

Avec Paged.js et son système de hooks, on a vu apparaître une quantité importante de documents produits avec Paged.js, qu’il s’agisse de rapports scientifiques, de bulletins de vote US, d’articles scientifique à la mise en page quasi automatique, et c’est avec une grande fierté que nous avons pu participer à quelques-uns de ces chantiers. 

Mais ce travail a un coût et si on a pu accompagner des projets, nous n’avons pas été des plus efficace pour tenir au courant la communauté des changements, mises à jour et autres expérimentations.  

Il est temps de changer ça et de passer à paged.js 2.0

## 2.0 ? Mais où est passé la 1.0 ?

Une idée que nous avons gardé en tête depuis le début de paged.js était que, tôt ou tard, les navigateurs allaient implémenter les fonctionnalités que nous utilisons si bien qu’à la fin, nous pourrions nous séparer de paged.js pour de bon. Mais ce que nous avons réalisé en chemin, c’est que le polyfill n’est qu’un usage restreint de Paged.js qui passe à côté de sa fonctionnalité principale: la prévisualisation à l’écran de ce que donnera le document imprimé permet d’imaginer les usages futurs du CSS Print. 

Pour faire simple, paged.js va lire votre HTML et votre CSS, va trouver les fonctionnalités utilisées pour le print (`@page`, `.footnote`, etc.), et va les convertir en HTML et CSS que le navigateur va pouvoir afficher à l’écran, rendant possible l’usage de l’inspecteur, meilleur ami de tout bon développeur web, pour imprimer la page en utilisant la fonction `save as PDF` du module d’impression. Dès lors, le navigateur n’imprime plus seulement la feuille de style pour le print, mais aussi ce que l’utilisateur voit dans sa fenêtre. Plus vraiment un *polyfill* mais un nouvel outil.

La deuxième chose importante date de fin 2024, quand l’équipe derrière Chrome décide d’augmenter la voilure sur l’implémentation des features de print, [en commençant avec les `margin-boxes`](https://developer.chrome.com/blog/new-in-chrome-131). Bonne nouvelle, CSSPrint avance, autre bonne nouvelle, mais plus technique, paged.js doit évoluer. 

Si l’on transforme paged.js pour suivre les mises à jour de chromium, alors paged.js devra tellement changer que les autres navigateurs risqueraient d’être abandonné. Même si chromium a une petite longueur d’avance sur quelque fonctionnalité que nous utilisons déjà (en particulier les veuves et les orphelines, ou la possibilité d’imprimer d’autres formats que les standards), nous continuons de penser que chaque navigateur est une option solide pour imprimer.

Alors il faut changer la façon dont paged.js fonctionne pour être plus stable avec plus de moteur de rendu, et comme il va y avoir un nombre de changement important, passer à paged.js 2.0 nous semble être la meilleure solution. 



## *Paged.js neue*

D’abord, les bonnes nouvelles.

NLNet, par le biais de NGI 0 accompagne cette transformation de paged.js sur plusieurs  projets.

Le premier, [Pushing forward for CSS Print](https://nlnet.nl/project/CSS-Print/) est une mission partagée entre l’équipe de WeasyPrint (les fantastiques Lucie et Guillaume) et Julie Blanc et Julien Taquet (moi-même), contributeurs de Paged.js. Ce projet finance l’écriture de spécifications pour le CSS Print pour aller plus loin que ce que nous pouvons faire aujourd’hui. La pemière de ces spécifications est la continuité du travail que nous avons commencé sur les notes. La spécification est en cours de discussion et va intégrer les conversations avec les W3C (vous pouvez la lire et la commenter ici : [https://css-print-lab.github.io/specs/notes-in-css-print/]()).  

NlNet finance aussi un second projet, autour de la mise à jour de paged.js vers le 2.0. Parmi les changements qui arrivent on trouve le remplacement de cssTree par CSSOM, l’utilisation de web-components pour la partie dev, sortir le chunker de paged.js pour en faire une dépendance et permettre l’utilisations de plusiers breakTokens. Nous reviendrons là-dessus plus en détail dans les semaines qui arrivent avec un calendrier plus clair. Le financement ne peux durer qu’un an, ça donne une petite idée de la vitesse avec laquelle nous devons avancer. 




### La nouvelle équipe. 

Depuis que Fred a intégré Mozilla à temps plein, le temps qu’il peut fournir à paged.js s’est sensiblement réduit. Nous avons décidé de lui alléger un peu les épaules en transformant un peu l’équipe autour de paged.js  

Le premier changement est l’arrivée de Gijs de Heij dans la *core team*. Gijs est un designer/developer, membre du collectif Open Source Publishing et manipule paged.js depuis suffisament longtemps pour savoir ce qui marche et ce qui va poser problème :) 

Le second changement est mon implication dans le code de paged.js. Jusqu’à présent, il s’agissait d’accompagner Fred et de tester les changements pour en rendre compte à la communauté ou proposer des plugins. Je serai beaucoup plus partie prenante dans la mise à jour du code, l’implémentation de features et l’écriture de spécifications, en plus de m’assurer que tout le monde soit ravi, que les frustrations soient réduites et que les contributeurs se sentent à l’aise.

Sur le reste de l’équipe, Fred est toujours là, mais son temps sera forcément moindre, et si Julie ne fait plus partie officiellement de l’équipe depuis qu’elle a commencé à écrire sa thèse (dont le sujet ne peux être plus dans le mille: [ “Composer avec les technologies du web ” ](http://phd.julie-blanc.fr/), et qu’elle a soutenu avec la plus jolie des réussites), elle n’est jamais vraiment loin de l’équipe, ni des questions qui nous concernent.

Coko a été un super espace dans lequel dévlopper paged.js et nous ne serions pas là où on en est sans le temps, l’énergie, la confiance et la générosité d’Adam Hyde, et si Coko ne participe plus au financement de paged.js, Adam n’est jamais loin pour nous aider.  


## À propos du futur de paged.js

Ce poste de blog est déjà trop long, alors je ne vais pas vous prendre plus de temps, mais je dois dire en quelques mots:

- Paged.js a un compte [mastodon](https://fosstodon.org/@pagedjs) :)
- Le code de paged.js et son site internet sont maintenant hébergés sur Github (https://github.com/pagedjs/), et nous sommes en train de rapatrier ce qui traîne sur des repos ici et là sur les différents serveurs git que nous avons pu utiliser. 
- Nous sommes joignables par mail contact at pagedjs dot org
- Pagedjs a maintenant un channel Matrix pour discuter du futur du projet https://matrix.to/#/#pagedjs:matrix.org
- Le site de paged.js a subi la mise à jour du fantasique [Eleventy](https://11ty.dev) et permet donc l’internationalisation de tous ses contenus. Sérieusement je crois pas qu’il y ait meilleur générateur de site statique. 

Nous avons pas mal de choses dans les cartons, en particulier sur la partie réécriture de la documentation (de développement ET pour les utilisateurs) avec l’espoir de trouver la bonne solution pour que, si vous souhaitiez participer à son élaboration, nous puissions vous accueuillir du mieux possible.


On se retrouve très vite.

<p class="signature">
julientaq 
</p>
