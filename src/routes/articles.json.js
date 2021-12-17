/**
 * Fetch and return every Markdown file with frontmatter
 */
export async function get() {
	const imports = import.meta.glob('../content/articles/*.{md,svx}');
	const body = [];
	Object.entries(imports).forEach(([key, value]) => {
		body.push(
			value().then(({ metadata }) => {
				const regex = new RegExp(/\.\.\/content\/articles\/(?<slug>.+)\.md/);
				const slug = key.match(regex).groups.slug;

				return {
					metadata: {
						...metadata,
						slug
					},
					key
				};
			})
		);
	});

	const articles = await Promise.all(body);

	return {
		body: JSON.stringify(articles)
	};
}
