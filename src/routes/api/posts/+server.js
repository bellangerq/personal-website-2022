import { json } from '@sveltejs/kit';

async function fetchPosts() {
  let posts = [];

  const paths = import.meta.glob('/src/content/blog/*.md', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').at(-1)?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata;
      const post = { ...metadata, slug };
      posts.push(post);
    }
  }

  posts = posts.sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
  );

  return posts;
}

export async function GET() {
  try {
    const posts = await fetchPosts();
    return json(posts);
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'Could not fetch posts: ' + error
      }
    };
  }
}
