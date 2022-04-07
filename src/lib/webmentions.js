/**
 * Fetch all webmentions for a given resource.
 * @param {string} path `/blog/some-slug`
 * @returns Array of webmentions
 */
export async function fetchWebmentions(path) {
	const resourceUrl = `https://quentin-bellanger.com/${path}/`;
	const wmUrl = `https://webmention.io/api/mentions.jf2?target=${resourceUrl}`;
	const wm = await fetch(wmUrl);
	const res = await wm.json();

	return res.children;
}
