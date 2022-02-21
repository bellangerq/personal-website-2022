import { fetchPosts } from '$lib/blog';

export async function get() {
	try {
		const { posts } = await fetchPosts();

		return {
			status: 200,
			body: {
				posts
			}
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: 'Could not fetch posts. ' + error
			}
		};
	}
}
