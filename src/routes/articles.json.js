export async function get() {
	const imports = import.meta.glob('../content/articles/*.{md,svx}');
	let body = [];

	for (const path in imports) {
		body.push(
			imports[path]().then(({ metadata }) => {
				return {
					metadata,
					path
				};
			})
		);
	}

	const articles = await Promise.all(body);

	return {
		body: JSON.stringify(articles)
	};
}
