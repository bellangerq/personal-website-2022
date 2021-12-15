<script context="module">
	export async function load({ page, fetch }) {
		const id = page.params.id;
		const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
		const res = await fetch(url);

		if (res.ok) {
			const article = await res.json();
			return {
				props: {
					article
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load article with id: ${url}`)
		};
	}
</script>

<script>
	export let article;
</script>

<h1>{article.title}</h1>
<p>{@html article.body}</p>
