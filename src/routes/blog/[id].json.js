/**
 * Fetch and return matching Markdown file with frontmatter
 */
export async function get({ params }) {
	const id = params.id;
	console.log(id);
	return {
		id
	};
}
