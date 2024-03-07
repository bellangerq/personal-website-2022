import { json } from '@sveltejs/kit';

/**
 * Get the list of all photos sorted by date with metadata and content
 */
async function fetchPhotos() {
  let photos = [];

  const paths = import.meta.glob('/src/content/photos/*.md', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').at(-1)?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata;
      const photo = { ...metadata, slug };
      photos.push(photo);
    }
  }

  photos = photos.sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
  );

  return photos;
}

export async function GET() {
  try {
    const posts = await fetchPhotos();
    return json(posts);
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'Could not fetch photos: ' + error
      }
    };
  }
}
