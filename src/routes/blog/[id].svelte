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
	import Calendar from '../../assets/icons/calendar.svelte';
	import PageHead from '../../components/page-head.svelte';
	import { formatDate } from '$lib/date';

	export let postContent;
	export let meta;

	const { title, description, date } = meta;
</script>

<PageHead title={`${title} - Quentin Bellanger`} {description} />

<article class="post">
	<h1>{title}</h1>

	<p class="intro">{description}</p>

	<div class="date">
		<Calendar class="calendar" />
		<span>Publié le <time>{formatDate(date)}</time></span>
	</div>

	<svelte:component this={postContent} />
</article>

<style lang="scss">
	.intro {
		margin-bottom: toRem(8);
	}

	.date {
		display: flex;
		align-items: center;
		gap: toRem(8);
		font-size: toRem(16);
		margin-bottom: toRem(144);
	}

	:global(.calendar) {
		height: toRem(20);
		width: toRem(20);
	}
</style>
