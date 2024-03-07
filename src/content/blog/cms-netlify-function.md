---
title: 'Un CMS maison à base de fonctions Netlify'
description: 'Des fonctions et un formulire Netlify pour un CMS léger et suffisant.'
date: 2022-05-10
lang: 'fr'
syndicate: true
---

Après avoir téléchargé l'ensemble du contenu de mon compte Instagram pour le mettre sur mon site, je souhaitais pouvoir également _créer_ du contenu. C'est un peu la partie 2 de mon précédent article : [Adieu Instagram](/blog/adieu-instagram). D'ailleurs, mon compte est officiellement supprimé demain ! 🎉

J'ai donc réfléchi à comment, techniquement, je pouvais et voulais faire ça avec quelques conditions :

- Avoir une expérience mobile idéale.
- Utiliser un outil simple sans trop de configuration.
- Automatiser le partage sur les réseaux sociaux de mon choix.

## Un méthode lambda

Après avoir joué avec Netlify CMS, j'ai tenté une approche à base de fonctions Netlify et de formulaire Netlify (oui j'aime beaucoup l'outil) dont voici le process :

1. Je remplis et soumets un formulaire Netlify sur une page de mon site.
2. Cela va déclencher la fonction Netlify `submission-created` qui va récupérer les données, créer un commit et pusher sur [le dépôt git du site](https://github.com/bellangerq/personal-website-2022).
3. Une fois le `git push` fait, Netlify va builder et redéployer le site, ce qui va déclencher la fonction `deploy-succeeded`.
4. Cette dernière va lire le contenu récent et, s'il le faut, va le partager sur Twitter.

## Plus en détails

Quelques détails techniques sur ce système.

- Un formulaire Netlify, c'est simplement un formulaire HTML avec un attribut `netlify` sur la balise `<form>`. Une fois soumis, les données sont accessibles depuis le dashboard Netlify. Un extrait de mon formulaire :

  ```html
  <form
    class="form"
    name="photo"
    method="post"
    enctype="multipart/form-data"
    netlify
    netlify-honeypot="bot-field"
  >
    <div class="field">
      <label for="image">
        Image
        <small class="hint">Format carré ou paysage avec une largeur maximum de 1000 pixels.</small>
      </label>
      <input class="image-field" required accept="image/*" type="file" id="image" name="image" />
    </div>

    <!-- Reste du formulaire -->
  </form>
  ```

- Netlify offre la possibilité de se brancher à des événements via des fonctions lambda (voir [Trigger functions on events](https://docs.netlify.com/functions/trigger-on-events/#available-triggers)). C'est pratique pour exécuter du code au moment opportun. Parmis ceux que j'utilise :
  - `deploy-succeeded` : se lance quand le site est build avec succès.
  - `submission-created` : se lance quand une soumission à un formulaire est faite.
- J'utilise la librairie [`@octokit/rest`](https://octokit.github.io/rest.js) pour jouer avec l'API de GitHub et pouvoir créer des commits et pusher du contenu. Tout est disponile dans le [code de la fonction `submission-created`](https://github.com/bellangerq/personal-website-2022/blob/main/functions/submission-created.js). Mais brièvement ça ressemble à ça :

  ```javascript
  // Récupère les derniers commits
  const commits = await octokit.repos.listCommits({
    owner: GITHUB_USERNAME,
    repo: GITHUB_REPOSITORY,
    per_page: 1,
    sha: GITHUB_BRANCH
  });

  // Crée un commit à partir du dernier commit et des fichiers
  const {
    data: { sha: newCommitSHA }
  } = await octokit.git.createCommit({
    owner: GITHUB_USERNAME,
    repo: GITHUB_REPOSITORY,
    tree: treeSHA,
    message: `Add new photo: ${slug}`,
    parents: [latestCommitSHA]
  });

  // Push du contenu
  const response = await octokit.git.updateRef({
    owner: GITHUB_USERNAME,
    repo: GITHUB_REPOSITORY,
    ref: `heads/${GITHUB_BRANCH}`,
    sha: newCommitSHA
  });
  ```

- L'étape finale est la fonction `deploy-succeeded` qui va récupérer la dernière photo publiée et déterminer si elle a déjà été partagée sur Twitter ou non. Si ce n'est pas le cas, elle est tweetée grâce au package [twitter-api-v2](https://github.com/plhery/node-twitter-api-v2). J'ai grandement suivi l'exemple de l'article de Max Böck "[Syndicating Content to Twitter](https://mxb.dev/blog/syndicating-content-to-twitter-with-netlify-functions/)" que je vous conseille de lire pour plus de détails.

---

Résultat : je suis bien content de ce système, c'est simple, léger, robuste (je crois) et bien suffisant pour [publier mes photos](/photos) depuis n'importe où tout en [possédant mon contenu](https://indieweb.org/POSSE).

À bientôt, prenez soin de vous ! 👋🏼
