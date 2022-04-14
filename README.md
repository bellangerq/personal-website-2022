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

- Create a generator for content (post and photo)
- Resize photos with [Netlify Large Media](https://docs.netlify.com/large-media/overview/) or [Cloudinary](https://github.com/cloudinary/cloudinary-svelte). Width = 300px on `/photos/`.
- Handle above the fold photos and `loading="lazy"` attribute.
- Syndicate notes (`/notes` and `/notes/[id]`).
- Connect Netlify CMS to publish content.
