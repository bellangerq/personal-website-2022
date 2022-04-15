---
title: 'Adieu Instagram'
description: "J'ai enfin supprimé mon compte Instagram et rappatrié tout le contenu sur mon site personnel."
date: 2022-04-18
lang: 'fr'
syndicate: true
---

Dans la mouvance du [POSSE (Publish on your Own Site, Syndicate Elsewhere)](https://indieweb.org/POSSE) et pour fuir Facebook / Meta, j'ai enfin supprimé mon compte Instagram pour héberger mes photos sur mon propre site.

## Récupérer le contenu

Je m'attendais à ce que ce soit plus compliqué que ça, mais il suffit d'aller dans les paramètres de son compte, de demander ses données et de confirmer sa demande par mail. Puis on peut télécharger un gros fichier `.zip` avec tout son contenu (posts, stories, commentaires, likes...). Contenu que j'ai ensuite filtré pour ne garder uniquement les photos publiées et un énorme fichier JSON avec le contenu des publications.

```
/instagram_data
  - /media/posts
    - XXXXX_XXXXX_XXXXX_XXXXX.jpg
    - XXXXX_XXXXX_XXXXX_XXXXX.jpg
    - XXXXX_XXXXX_XXXXX_XXXXX.jpg
  - posts_1.json
```

## Extraire et parser les photos

L'objectif était ensuite, via un script, de lire et de parcourir ce fichier JSON et pour chaque photo :

1. Vérifier la présence du fichier `.jpg` correspondant à la publication et lui associer un slug : `{yyyy}-{mm}-{dd}-{timestamp}`.
2. Avec ce slug, créer un fichier Markdown comportant les métadata de la publication (date, langue, text alternatif) et le contenu.
3. Déplacer et renommer le fichier `.jpg` de la publication dans le bon dossier, avec le même slug que le fichier Markdown.

## Résultat

Avec ce script, j'ai pu rappatrier l'ensemble de mes photos sur mon site dans une nouvelle collection sobrement baptisée "[Photos](/photos)".

Ça s'est donc surtout fait à base de fonctions `fs` de Node pour lire, créer et déplacer des fichiers. Le plus compliqué était finalement de gérer l'encodage du contenu des publications pour bien afficher les accents ou les émojis, qui par défaut sont affichés en unicode (_Quelle id\u00c3\u00a9e_ !) avec cette courte fonction :

```javascript
/**
 * Convert unicode characters in string
 * Source: https://stackoverflow.com/a/68237082
 */
function unicodeToChar(s) {
	let d = new TextDecoder();
	let a = s.split('').map((r) => r.charCodeAt());
	return d.decode(new Uint8Array(a));
}
```

---

Bon sinon ça fait un bien fou de quitter un réseau social et un petit plaisir de se dire que ce contenu m'appartient _réellement_. Si ça vous intéresse, l'ensemble du script est disponible ici : [instagram.js](https://github.com/bellangerq/personal-website-2022/blob/main/scripts/instagram.js).
