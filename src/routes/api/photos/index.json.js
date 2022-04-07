/**
 * Get the list of all photos sorted by date with metadata and content
 */
export async function get() {
	try {
		const photos = await Promise.all(
			Object.entries(import.meta.glob('../../../content/photos/*.md')).map(
				async ([path, resolver]) => {
					const photo = await resolver();
					const metadata = photo.metadata;
					const content = photo.default.render().html;
					const slug = path.split('/').pop().slice(0, -3);

					return { ...metadata, slug, content };
				}
			)
		);

		const sortedPhotos = photos.sort((a, b) => new Date(b.date) - new Date(a.date));

		return {
			status: 200,
			body: {
				photos: sortedPhotos
			}
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: `❌ Could not fetch photos: ${error}`
			}
		};
	}
}
