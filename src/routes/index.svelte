<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const url = 'https://jsonplaceholder.typicode.com/posts';
		const res = await fetch(url);

		if (res.ok) {
			const articles = await res.json();
			return {
				props: {
					articles
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load articles at: ${url}`)
		};

		/**
		 * const res = await fetch('/articles.json');
		const articles = await res.json();
		console.log(articles);

		return {
			props: {
				articles
			}
		};
		*/
	}
</script>

<script>
	export let articles = [];
</script>

<h1>Articles</h1>
<ul>
	{#each articles as article}
		<li>
			<h2>
				<a href="/blog/{article.id}">{article.title}</a>
			</h2>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		border: 2px solid var(--color);

		li {
			& + li {
				margin-top: 2rem;
			}
		}
	}
</style>
