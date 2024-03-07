---
title: "À l'écoute des media queries"
description: "Comment écouter les changements de la valeur d'une media query en JavaScript"
date: 2022-03-24
lang: 'fr'
syndicate: false
---

En intégrant le changement de thème visuel (via le petit bouton en début de page), j'ai découvert qu'il était possible d'**écouter les changements de valeur des media query**.

L'objectif ici était de pouvoir dynamiquement changer le thème du site en fonction des préférences système de l'utilisateur (tout en gardant la possibilité de changer manuellement !).

On place un `addEventListener` sur l'événement `change` de la media query. Il en retourne un objet contenant une clef `matches`, un booléen qui indique l'état actuel de la media query. Et le tour est joué !

```javascript
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    if (isDark) {
      // Toggle light mode.
    } else {
      // Toggle dark mode.
    }
  });
```

Pour en savoir plus : [MediaQueryList: change event (en)](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/change_event).
