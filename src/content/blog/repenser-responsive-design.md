---
title: 'Si on designait des interfaces vraiment responsive ?'
description: "Quelques idées en vrac pour repenser la manière d'aborder le responsive web design."
date: 2022-04-22
lang: 'fr'
syndicate: true
---

Les maquettes UI pour intégrer des pages web sont souvent faites sur une taille d'écran standard d'ordinateur portable (quelque chose aux alentours de 1400 pixels) avec, parfois, une version dite "mobile" pour écran de smartphone (environ 400 pixels).

Alors oui ces versions sont bien réalisées, toutes propres où tout s'aligne parfaitement. Les images ont toutes bien la même taille et les paragraphes le même nombre de lignes.

Mais que se passe t-il si la personne qui visite le site n'est pas sur une de ces 2 tailles d'écran ? Ou si une personne du contenu modifie les images ou le texte ? Ou si la grille prévue pour 3 éléments en reçoit 4 ? C'est le chaos.

## Un site web n'est pas une photo

Considérer le design d'un site web par rapport à une taille fixe est un problème. Ça fonctionne pour imprimer des posters ou des flyers, mais pas pour un site web dont la taille peut varier. Sur le web, on ne connait pas les conditions de visite d'un site : taille d'écran, orientation, thème de couleur, connexion, taille de police...

Ça n'a donc pas de sens de designer avec des valeurs fixes en tête. Ce qui compte, c'est de profiter de la flexibilité des navigateurs pour créer une expérience agréable quelle que soit la situation : pas de versions "desktop" et "mobile". Andy Bell en parle mieux que moi sur sa dernière création : <span lang="en">[Be the browser’s mentor, not its micromanager](https://buildexcellentwebsit.es/)</span>.

Pour faire ça, il faut repenser la manière dont on conçoit le responsive : **on ne doit pas chercher à savoir à quoi ça ressemble, mais plutôt comment ça réagit aux contraintes**.

Ah oui, désolé mais el famoso _pixel perfect_ n'existe pas et quand bien même il peut être envisagé, il n'a aucun intérêt.

## Quelques pistes

En vrac, quelques idées pour une meilleure prise en charge du vrai responsive, côté design et développement.

### Échelles fluides

Côté design, ça commence déjà par la mise en place d'échelles d'espacements fluides pour les tailles de police et les marges. Mais attention : ces échelles ne sont pas basées sur des valeurs fixes mais sur la taille de l'écran.

Ça peut donc par exemple s'appliquer sur une échelle des tailles de police en fournissant une valeur minimum et une valeur maximum.

- Titre de niveau 1 : entre `48px` et `96px`.
- Titre de niveau 2 : entre `32px` et `64px`.
- Paragraphe : entre `16px` et `20px`.

Une fois ces valeurs en place, on a plus besoin de s'en occuper et le navigateur se chargera tout seul de rendre la taille adaptée en fonction de la largeur de l'écran.

### Communiquer, expliquer

Nous sommes des humains. Échanger reste le meilleur moyen pour transmettre une information (et tous les outils de design proposent des moyens de collaborer).

Pour donner des indications sur un design, de simples commentaires ou schémas suffisent : "_Ici, quand la fenêtre devient plus petite, les images passent à la ligne_" ou "_Cette section passe sous le formulaire_". Côté design, on s'épargne une version de plus à designer et côté développement, on est moins contraint et on sait tout de suite comment doit réagir l'interface. Tout le monde est gagnant.

### Profiter du CSS moderne

Enfin côté développement front-end, il faut pouvoir profiter du CSS moderne pour intégrer en se passant un maximum des media queries. D'abord parce qu'on gagne en maintenance et en lisibilité, pas besoin de se soucier des changements de taille. Mais surtout parce que ça signifie que peu importe la taille d'écran, le site s'adaptera quoi qu'il arrive.

Pour compléter l'exemple de l'échelle de tailles de police, la taille du titre de niveau 1 (`<h1>`) sera de `2rem + 0.8vw` mais sera toujours comprise en `2rem` et `3rem`. Simple, basique, pas de media query. Une manière fluide et transparente de gérer les tailles de police.

```css
h1 {
	font-size: clamp(2rem, 2rem + 0.8vw, 3rem);
}
```

Un autre exemple : pouvoir créer une grille avec CSS grid qui bascule sur plusieurs lignes automatiquement. [Every Layout](https://every-layout.dev/) est une excellente ressource avec beaucoup d'interfaces responsive utilisant du CSS moderne.

```css
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
	gap: 1rem;
}
```

---

L'idée c'est donc d'oublier les breakpoints et les tailles "standards" pour au contraire penser à un seul layout universel, adaptatif et flexible où on ne se soucis même pas de la taille de la fenêtre. Sortir un peu du moule et repenser ce que doit être le [responsive web design](https://alistapart.com/article/responsive-web-design/).

Au final, si c'est bien réalisé, c'est moins de travail à fournir. Ce qui nous laisse au passage plus de temps pour se consacrer aux choses réellement importantes : l'accessibilité, la performance, ~~le SEO~~...

Et le mot de la fin (à imprimer sur un t-shirt et à offrir à votre designer) est à Heyon Pickering dans sa vidéo "<span lang="en">[Is progressive enhancement dead yet?](https://www.youtube.com/watch?v=mDf7OUJobJs)</span>".

> "<span lang="en">The basic layout is not a broken layout</span>" — Heyon Pickering
