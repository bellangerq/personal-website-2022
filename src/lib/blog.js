export async function fetchPosts() {
	const posts = await Promise.all(
		Object.entries(import.meta.glob('../content/blog/*.md')).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const slug = path.split('/').pop().slice(0, -3);
			return { ...metadata, slug };
		})
	);

	let sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

	sortedPosts = sortedPosts.map((post) => ({
		slug: post.slug,
		title: post.title,
		description: post.description,
		date: post.date
	}));

	return {
		posts: sortedPosts
	};
}
