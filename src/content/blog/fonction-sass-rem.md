---
title: 'Convertir des pixels en rem avec une fonction Sass'
description: "Une courte fonction Sass utilitaire pour convertir des pixels en rem et faciliter l'utilisation d'unités relatives."
date: 2022-03-11
lang: 'fr'
syndicate: false
---

Il n'y a plus vraiment de débat quant à l'utilisation d'unités relatives en CSS (par rapport au pixel). Mais c'est souvent pénible de passer du pixel au `rem` manuellement puisqu'il faut diviser la valeur par 16 (selon la taille de police par défaut) et se souvenir des correspondances de valeurs abstraites comme `3.375rem`.

Voici une courte fonction Sass pour avoir les avantages des deux solutions :

```scss
// Convertit une valeur en pixel en rem.
@function toRem($px) {
  @if not $px {
    @error 'Missing argument: `$px`.';
  }
  @return math.div($px, 16) + rem;
}
```

Si aucune valeur n'est fournie, la fonction renvoie une erreur. Sinon, elle renvoie la valeur divisée par 16 accompagnée de l'unité (ici, `rem`).

Voici un exemple d'utilisation où on voit que la taille de police du `h1` sera de 44 pixels, mais rendue en rem : `2.75rem`.

```scss
h1 {
  font-size: toRem(44); // Retourne `2.75rem`
}
```
