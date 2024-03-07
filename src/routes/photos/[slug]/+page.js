import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const photo = await import(`../../../content/photos/${params.slug}.md`);

    return {
      content: photo.default,
      slug: params.slug,
      ...photo.metadata
    };
  } catch (e) {
    error(404, `Could not find ${params.slug}: ${e}`);
  }
}
