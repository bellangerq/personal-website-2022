<script>
	import PageHead from '../../../components/page-head.svelte';
	import { formatDate } from '$lib/date';

	export let data;
</script>

<PageHead title="Photo du {formatDate(data.date)} - Quentin Bellanger" />

<article class="photo">
	<h1><span class="visually-hidden">Photo du </span>{formatDate(data.date)}</h1>

	<div class="markdown-content">
		<svelte:component this={data.content} />
	</div>

	<img src={`/photos/${data.slug}.jpg`} alt={data.alt} />
</article>

<style lang="scss">
	.photo {
		max-width: toRem(800);
	}
</style>
