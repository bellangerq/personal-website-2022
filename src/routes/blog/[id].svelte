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

	<div class="post-content e-content">
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

	:global(.post-content) {
		margin-bottom: toRem(64);
	}

	:global(.post-content * + *) {
		margin-top: toRem(20);
	}

	:global(.post-content li + li) {
		margin-top: toRem(12);
	}

	:global(.post-content a) {
		text-decoration: underline;
		transition: color 0.2s ease;

		&:hover {
			color: var(--c-lightgray);
			text-decoration: none;
		}
	}

	:global(.post-content ul, .post-content ol) {
		list-style: initial;
		padding-left: toRem(16);
	}

	:global(.post-content ol) {
		list-style: decimal;
	}

	:global(.post-content li::marker) {
		color: var(--c-gradient-start);
		font-size: toRem(16);
	}

	:global(.post-content li:nth-child(odd)::marker) {
		color: var(--c-gradient-end);
	}

	:global(.post-content blockquote) {
		font-style: italic;
		padding: toRem(4) 0 toRem(4) toRem(16);
		position: relative;

		&::before {
			content: '';
			background: linear-gradient(
				var(--gradient-angle),
				var(--c-gradient-start),
				var(--c-gradient-end)
			);
			border-radius: toRem(2);
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			width: toRem(4);
		}
	}

	:global(.post-content hr) {
		background: linear-gradient(
			var(--gradient-angle),
			var(--c-gradient-start),
			var(--c-gradient-end)
		);
		border-radius: toRem(2);
		height: toRem(2);
		border: none;
		margin: toRem(48) 0;
		width: 50%;
	}

	:global(.post-content code:not([class*='language-'])) {
		border: toRem(1) solid var(--c-lightgray);
		border-radius: toRem(4);
		color: var(--c-lightgray);
		font-size: toRem(16);
		padding: toRem(2) toRem(2);
	}

	:global(.post-content pre) {
		border: toRem(2) solid var(--c-lightgray);
		font-size: toRem(16);
		border-radius: toRem(4);
		overflow: auto;
		padding: toRem(8);
	}
</style>
