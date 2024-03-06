<script>
	import PageHead from '../../components/page-head.svelte';
	import Date from '../../components/date.svelte';

	export let data
</script>

<PageHead
	title="Blog - Quentin Bellanger"
	description="J'écris sur le développement web, l'accessibilité numérique et de manière plus générale sur le
web."
/>

<h1>Blog</h1>

<p class="intro">
	J'écris sur le développement web, l'accessibilité numérique et de manière plus générale sur le
	web. Ce blog me sert aussi de <span lang="en"
		><abbr title="Today I Learned">TIL</abbr> (Today I Learned)</span
	> lorsque j'apprends de nouvelles choses.
</p>

<ul class="post-list">
	{#each data.posts as post}
		<li class="h-entry">
			<h2 class="post-title p-name">
				<a class="post-link u-url" href={`/blog/${post.slug}`}>{post.title}</a>
			</h2>
			<Date date={post.date} />
		</li>
	{/each}
</ul>

<style lang="scss">
	.post-list {
		display: flex;
		flex-direction: column;
		gap: toRem(48);

		.post-title {
			margin-bottom: toRem(8);
			max-width: toRem(700);
		}

		.post-link {
			border-radius: toRem(4);
			transition: color 0.2s ease;

			&:hover {
				color: var(--c-lightgray);
				text-decoration: underline;
			}
		}
	}
</style>
