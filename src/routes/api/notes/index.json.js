/**
 * Get the list of all notes sorted by date with metadata and content
 */
export async function get() {
	try {
		const notes = await Promise.all(
			Object.entries(import.meta.glob('../../../content/notes/*.md')).map(
				async ([path, resolver]) => {
					const note = await resolver();
					const metadata = note.metadata;
					const content = note.default.render().html;
					const id = path.split('/').pop().slice(0, -3);

					return { ...metadata, id, content };
				}
			)
		);

		const sortedNotes = notes.sort((a, b) => new Date(b.date) - new Date(a.date));

		return {
			status: 200,
			body: {
				notes: sortedNotes
			}
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: `❌ Could not fetch notes: ${error}`
			}
		};
	}
}
