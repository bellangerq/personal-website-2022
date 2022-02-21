<script context="module">
	export async function load({ fetch }) {
		const response = await fetch(`/api/posts.json`);
		const { posts } = await response.json();

		return {
			props: { posts }
		};
	}
</script>

<script>
	import Calendar from '../../assets/icons/calendar.svelte';
	import PageHead from '../../components/page-head.svelte';
	import { formatDate } from '$lib/date';

	export let posts;
</script>

<PageHead title="Blog - Quentin Bellanger" description="" />

<h1>Blog</h1>

<p class="intro">
	Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quidem dolorem, officia, vel
	repellendus odit corrupti consequatur optio eos est quis. Modi doloribus atque ratione iusto a
	sapiente aperiam mollitia?
</p>

<ul class="post-list">
	{#each posts as post}
		<li>
			<h2 class="title">
				<a class="link" href={`/blog/${post.slug}`}>{post.title}</a>
			</h2>
			<div class="date">
				<Calendar class="calendar" />
				<span>Publié le <time>{formatDate(post.date)}</time></span>
			</div>
		</li>
	{/each}
</ul>

<style lang="scss">
	.post-list {
		display: flex;
		flex-direction: column;
		gap: toRem(48);

		.title {
			margin-bottom: toRem(8);
		}

		.link {
			border-radius: toRem(4);
			transition: color 0.2s ease;

			&:hover {
				color: var(--c-lightgray);
				text-decoration: underline;
			}
		}

		.date {
			display: flex;
			align-items: center;
			gap: toRem(8);
			font-size: toRem(16);
		}

		:global(.calendar) {
			height: toRem(20);
			width: toRem(20);
		}
	}
</style>
