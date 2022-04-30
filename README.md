# personal-website-2022

This is the code of my personal website: [https://quentin-bellanger.com](https://quentin-bellanger.com).

## Development

Install dependencies:

```bash
yarn
```

Start a development server:

```bash
yarn dev
```

Build website:

```bash
yarn build
```

Preview build:

```bash
yarn preview
```

## Deployment

Every push on `main` branch will trigger a deploy on Netlify.

## To do

- Font size scale (with clamp + `vw`)
- Connect Netlify CMS to publish content.
- Resize photos with [Netlify Large Media](https://docs.netlify.com/large-media/overview/) or [Cloudinary](https://github.com/cloudinary/cloudinary-svelte). Width = 300px on `/photos/`.
- Syndicate notes (`/notes` and `/notes/[id]`) ?

## Flow

**Objectif** : créer des nouvelles photos via une page avec un formulaire Netlify :

- Sans CMS.
- Sans avoir à renommer manuellement des fichiers.
- Sans avoir à build le site manuellement.

1. Remplir un formulaire Netlify sur une page (exemple : `/admin`). La page est désindexée et il y a un champs "password" sécurisé via une variable d'environnement.
2. Si c'est validé, ça va trigger la fonction Netlify `submission-created` qui va avec les données :
   - Créer `src/content/photos/XXXXX.md`.
   - Créer `static/photos/XXXXX.jpg`.
   - Faire un commit avec octokit/rest.
   - Faire une requête POST vers une `BUILD_HOOK_URL`.
3. Ça va trigger un nouveau build et lancer `deploy-succeeded` pour partager la photo.
