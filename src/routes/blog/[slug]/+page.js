import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`../../../content/blog/${params.slug}.md`);

		return {
			content: post.default,
			...post.metadata
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}: ${e}`);
	}
}
