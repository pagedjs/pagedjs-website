---
title: "A pagedjs"
date: 2025-10-16
draft: false
author: "@julientaq"
class:
intro: "On n’a pas toujours été tendre avec la documentation de paged.js. Il est temps que ça change" 
lang: fr
---

Chunker => trouve les coupes 
Polisher => nettoye les feuilles de styles


The hook system

Hook

Hook.register => allow you to register the hook => it will be rendered
Hook.trigger => run the script
Hook.triggerSycn => run all function synchronously
Hook.list => retrun the hooks
Hook.clear => empty hooks


---


handler => hook? not really?

Paged.handler = pagedjs.handler

=> can only register the handler (which comes with chunker, polisher and caller) 


Pagedjs main function is the previewer that will call all the childern function

the constructor will get the settings, and then it will create a new polisher, a new chunker.

introduce Q couple of hooks before and after
