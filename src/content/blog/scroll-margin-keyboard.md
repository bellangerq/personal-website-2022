---
title: 'scroll-margin et la navigation au clavier'
description: "La propriété CSS scroll-margin permet d'améliorer la navigation au clavier en ajoutant une marge de sécurité."
date: 2022-02-22
lang: 'fr'
syndicate: false
---

Parmi les choses que j'ai redécouvert en mettant à jour mon site, il y a la propriété CSS `scroll-margin` ([scroll-margin sur MDN](https://developer.mozilla.org/fr/docs/Web/CSS/scroll-margin)). Elle permet d'appliquer un décalage sur le container de défilement de l'élément ciblé. C'est souvent utilisé avec l'API `scroll-snap`.

```css
/* Applique une marge en haut et en bas de 1.5rem */
a {
  scroll-margin: 1.5rem 0;
}
```

J'y ai trouvé 2 cas d'usage pour améliorer la navigation au clavier lorsqu'on utilise les touches `TAB` et `SHIFT` + `TAB` pour aller d'un élément focusable à un autre :

- Appliquer un `scroll-margin-bottom` et `scroll-margin-top` permet de mieux visualiser les éléments qui recoivent le focus. Plutôt qu'ils soient collés en bas ou en haut de la fenêtre, il y aura une marge.
- Lorsque le site possède un en-tête fixe (qui reste visible au scroll), les éléments qui recoivent le focus peuvent être positionnés derrière l'en-tête. En leur ajoutant une valeur de `scroll-margin-top` supérieure à la hauteur de l'en-tête, le scroll va se décaler d'autant pour rendre l'élément focus visible.

C'est pas grand chose, mais ça améliore l'expérience de navigation au clavier.
