---
title: 'Arrêtons avec la syntaxe indentée de Sass'
description: "Quelques éléments de réponse sur la syntaxe indentée de Sass qui pose plus de problèmes qu'elle n'en résout"
date: 2022-03-16
lang: 'fr'
syndicate: false
---

Dans beaucoup de projets front j'utilise [Sass](https://sass-lang.com/) pour le style qui est un langage que j'affectionne particulièrement. Mais récemment dans un projet j'ai eu à utiliser [la syntaxe indentée `.sass`](https://sass-lang.com/documentation/syntax#the-indented-syntax) (par opposition avec la syntaxe SCSS), qui est horrible.

J'ai transité tout le style du projet de `.sass` à `.scss` (spoiler alert : c'est pas très fun, car c'est difficilement automatisable) et du coup voici quelques retours sur pourquoi la syntaxe indentée est problématique (⚠️ cela représente mon avis sur le langage, pas une vérité universelle) :

- Tout code CSS valide est du code SCSS valide. Ce n'est pas le cas pour la syntaxe indentée. Il faut retirer toutes les accolades et les points virgules (entre autres, voir dernier point).
- La syntaxe indentée n'est pas formattable avec [Prettier](https://prettier.io/), qui est installé sur beaucoup de projet front-end. Pas fou pour harmoniser le style de code.
- Du code indenté n'est pas forcément plus lisible. Je trouve même qu'il l'est moins car il faut bien repérer l'indentation pour ne pas se perdre.
- De mon expérience, beaucoup plus de personnes utilisent la syntaxe SCSS, et donc la majorité du code trouvé sur le web suit cette syntaxe.
- L'utilisation de certaines propriétés est rendue compliquée. Un exemple récent que j'ai eu a été pour la propriété [`grid-template-areas`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) qui est souvent plus lisible lorsqu'elle est écrite sur plusieurs lignes. Et avec la syntaxe indentée, ça n'est pas possible :

  ```sass
  // Code invalide
  .container
    grid-template-areas:
      "aaa bbb"
      "aaa ccc"

  // Code corrigé
  .container
    grid-template-areas: "aaa bbb" "aaa ccc"
  ```

En écrivant cet article, j'ai appris que la syntaxe indentée était la syntaxe originelle de Sass. Heureusement qu'ils ont créé la syntaxe SCSS, beaucoup plus commune, et j'espère qu'ils vont bientôt déprécier l'ancienne syntaxe qui pour moi apporte plus de problèmes que de solutions.
