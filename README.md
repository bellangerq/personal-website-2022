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

- Add a `syndicate` property on content to tweet it or not.
- Resize photos with [Netlify Large Media](https://docs.netlify.com/large-media/overview/).
- Handle above the fold photos and `loading="lazy"` attribute.
- Connect Netlify CMS to publish content.

### Syndicate notes on Twitter

1. Create a notes collection (`/notes` and `/notes/:slug`).
2. On every push, if a new note is added and set as `syndicate: true`, create a new tweet with a Netlify function containing note content and note URL.
