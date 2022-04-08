<script context="module">
	export async function load({ params }) {
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
	import Calendar from '../../assets/icons/calendar.svelte';
	import PageHead from '../../components/page-head.svelte';
	import Webmentions from '../../components/webmentions.svelte';
	import { formatDate } from '$lib/date';
	import { fetchWebmentions } from '$lib/webmentions';
	import { onMount } from 'svelte';

	export let webmentions = [];
	export let postContent;
	export let meta;

	const { title, description, date, lang, slug } = meta;

	onMount(async () => {
		try {
			const path = `blog/${slug}`;
			webmentions = await fetchWebmentions(path);
		} catch (error) {
			console.log(`Error while fetching "${path}" webmentions.`);
		}
	});
</script>

<PageHead title={`${title} - Quentin Bellanger`} {description} />

<article class="post h-entry" lang={lang === 'en' ? lang : null}>
	<h1 class="p-name">{title}</h1>

	<p class="intro p-summary">{description}</p>

	<div class="date">
		<Calendar class="calendar" />
		<span>Publié le <time datetime={date} class="dt-published">{formatDate(date)}</time></span>
	</div>

	<div class="markdown-content e-content">
		<svelte:component this={postContent} />
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
		font-size: toRem(16);
		margin-bottom: toRem(64);
		padding-bottom: toRem(32);
		border-bottom: toRem(1) solid var(--c-lightgray);
	}

	:global(.calendar) {
		height: toRem(20);
		width: toRem(20);
	}
</style>
