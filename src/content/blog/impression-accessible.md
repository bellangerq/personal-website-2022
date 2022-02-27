---
title: 'Dégradation gracieuse et impression web'
description: "Quelques considérations d'accessibilité à prendre pour imprimer ou télécharger un fichier sur le web."
date: 2022-02-28
---

J'ai ajouté [mon CV](/cv) sur ce site et je voulais faire en sorte qu'il soit imprimable. Par "imprimer", je comprends aussi la fonction "Enregistrer en PDF". Du coup le réflexe c'était d'utiliser `window.print()`.

Mais pour imprimer sur le web, il faut prendre en compte quelques considérations :

- Tester si la fonction est supportée en JavaScript avec `typeof window.print === 'function'`. Si elle ne l'est pas ou si JavaScript est désactivé, une version textuelle simple est téléchargeable avec un lien et l'attribut `download`.
- Utiliser la media query `@media print {}` en CSS pour filtrer et adapter le contenu à l'impression : cacher la navigation, ajuster les marges, afficher la destination des liens...
- Vérifier que le mode sombre ne s'applique pas (pour éviter la consommation d'encre inutile).
  ```css
  @media not print {
  	html.dark {
  		/* Variables CSS du mode sombre */
  		--c-background: #121212;
  	}
  }
  ```

La version alternative lorsque l'impression n'est pas disponible est un simple fichier `.txt` certes pas très sexy mais accessibles à tout le monde. Un bon exemple de [dégradation gracieuse](https://developer.mozilla.org/fr/docs/Glossary/Graceful_degradation) !
