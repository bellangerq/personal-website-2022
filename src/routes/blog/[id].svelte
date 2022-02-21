<!-- This file renders each individual blog post for reading. Be sure to update the svelte:head below -->
<script context="module">
	export async function load({ params, url }) {
		try {
			const post = await import(`../../content/blog/${params.id}.md`);

			return {
				props: {
					postContent: post.default,
					meta: { ...post.metadata, slug: params.id }
				}
			};
		} catch (error) {
			return {
				status: 404,
				error: error.message
			};
		}
	}
</script>

<script>
	import PageHead from '../../components/page-head.svelte';

	export let postContent;
	export let meta;

	const { title, description, date } = meta;
</script>

<PageHead title={`${title} - Quentin Bellanger`} {description} />

<article class="post">
	<h1>{title}</h1>
	<span>{date}</span>
	<p>{description}</p>

	<svelte:component this={postContent} />
</article>
