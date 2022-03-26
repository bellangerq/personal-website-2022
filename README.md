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

### Tweet blog posts

When a new blog post is added, tweet it.

### Syndicate notes on Twitter

1. Create a notes collection (`/notes` and `/notes/:slug`).
2. On every push, if a new note is added and set as `syndicate: true`, create a new tweet with a Netlify function containing note content and note URL.

### Upload Instagram content

1. Create a photos collection (`/photos` and `/photos/:slug`).
2. On every push, if a new photo is added and set as `syndicate: true`, create a new tweet with a Netlify function containing the photo image and URL.
