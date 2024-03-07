---
title: 'Git forget --hard'
description: Un article pour mon futur moi sur des commandes Git utiles que j’oublie tout le temps
date: 2022-07-21
lang: fr
syndicate: true
---

Bien que je sois développeur depuis maintenant environ 5 ans, je n’utilise Git que pour les actions de base : puller, pusher, commiter, créer des branches et rebaser de temps en temps. Et quand je dois faire des manipulations plus techniques et précises, soit je sais pas comment faire (et je vais Googler), soit je me rappelle jamais de la commande (et je vais Googler). Du coup cette fois, un article pour moi (en espérant que cela serve à d’autres).

## Ajouter du contenu au précédent commit

Vous venez de commiter et vous vous aperçevez que vous avez oublié de faire quelque chose. Vite, il faut ajouter ce quelque chose au précédent commit :

```sh
git add .
git commit --amend --no-edit
```

## Réinitialiser la branche en cours sur la remote

Vous êtes sur une branche, vous faites plein de trucs et vous vous rendez compte que voous êtes pas au bon endroit ou vous avez fait des bêtises. Vite, il faut revenir au même niveau que la version distante de la branche.

```sh
git reset --hard origin
```

## Annuler le dernier commit

Vous avez fait des modifications et un commit qui n’étaient pas nécessaires. Vite, il faut annuler le dernier commit.

```sh
git reset --soft HEAD~1 # Garde les changements
git reset --hard HEAD~1 # Supprimer les changements
```

## Merger une branche dans une autre en squashant

Vous avez terminé de travailler sur une branche. Vite, il faut la merger dans une autre branche et en un seul commit.

```sh
git merge --squash feat/ma-branche
git commit
```

---

J'en rajouterai sans doute plus tard.
