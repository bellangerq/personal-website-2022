<script>
	import Calendar from '../../../assets/icons/calendar.svelte';
	import PageHead from '../../../components/page-head.svelte';
	import Webmentions from '../../../components/webmentions.svelte';
	import { formatDate } from '$lib/date';
	import { fetchWebmentions } from '$lib/webmentions';
	import { onMount } from 'svelte';

	
	onMount(async () => {
		const path = `blog/${data.slug}`;
		try {
			webmentions = await fetchWebmentions(path);
		} catch (error) {
			console.error(`Error while fetching "${path}" webmentions.`);
		}
	});
	
	export let data
	export let webmentions = [];
</script>

<PageHead title={`${data.title} - Quentin Bellanger`} description={data.description} />

<article class="post h-entry" lang={data.lang === 'en' ? data.lang : null}>
	<h1 class="p-name">{data.title}</h1>

	<p class="intro p-summary">{data.description}</p>

	<div class="date">
		<Calendar class="calendar" />
		<span>Publié le <time datetime={data.date} class="dt-published">{formatDate(data.date)}</time></span>
	</div>

	<div class="markdown-content e-content">
		<svelte:component this={data.content} />
	</div>

	{#if webmentions.length}
		<Webmentions {webmentions} />
	{/if}
</article>

<style lang="scss">
	.intro {
		margin-bottom: toRem(8);
	}

	.post {
		max-width: toRem(800);
	}

	.date {
		display: flex;
		align-items: center;
		gap: toRem(8);
		font-size: var(--t-s);
		margin-bottom: toRem(64);
		padding-bottom: toRem(32);
		border-bottom: toRem(1) solid var(--c-lightgray);
	}

	:global(.calendar) {
		height: toRem(20);
		width: toRem(20);
	}
</style>
