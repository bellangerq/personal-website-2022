<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const res = await fetch('/articles.json');
		const articles = await res.json();

		return {
			props: {
				articles
			}
		};
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
				<a href="/blog/{article.metadata.slug}">{article.metadata.title}</a>
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
