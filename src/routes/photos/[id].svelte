<script context="module">
	export async function load({ params }) {
		try {
			const photo = await import(`../../content/photos/${params.id}.md`);

			return {
				props: {
					photoContent: photo.default,
					meta: { ...photo.metadata }
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
	import { formatDate } from '$lib/date';

	export let photoContent;
	export let meta;

	const { date } = meta;
</script>

<PageHead title="Photo du {formatDate(date)} - Quentin Bellanger" />

<article class="photo">
	<h1><span class="visually-hidden">Photo du </span>{formatDate(date)}</h1>

	<div class="markdown-content">
		<svelte:component this={photoContent} />
	</div>
</article>

<style lang="scss">
	.photo {
		max-width: toRem(800);
	}
</style>
