---
title: Convertir les diacritiques en 1 ligne
description: Une fonction utilitaire pour faciliter la comparaison de strings avec ou sans diacritiques
date: 2022-05-19
syndiacte: true
---

Il m'est arrivé récemment de devoir faire de la recherche et de la comparaison sur du texte. En général c'est en français et donc avec des caractères spéciaux comme les accents et les cédilles.

Pour la recherche, c'est bien d'ignorer ces caractères et de les remplacer par leurs homologues classiques, sans fioriture. Sinon une recherche accentuée ne renverra pas de résultats sans accents et inversement.

Et donc on peut convertir ça en une ligne en JavaScript : avec la [fonction `normalize()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) (que j'ai découvert) et la fonction `replace()`, ça donne cette petite fonction utilitaire :

```javascript
removeDiacritics(string) {
  return string.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
},

removeDiacritics('àéèçùñ') // Retourne "aeecun"
```

L'explication est très bien détaillé sur [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize#description) mais de ce que j'ai compris :
- `normalize()` prend chaque caractère de la string et le remplace par sa bonne version selon le référentiel défini.
- Le référentiel "NFD" décompose les caractères en plusieurs *code points*. Par exemple la lettre suivi de l'accent pour `é` : `\u0065` + `\u0301`.
- La fonction `replace()` se charge de supprimer les caractères qui correspondent aux diacritiques.