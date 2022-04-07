<script context="module">
	export async function load({ fetch }) {
		const response = await fetch(`/api/photos.json`);
		const { photos } = await response.json();

		return {
			props: { photos }
		};
	}
</script>

<script>
	import Calendar from '../../assets/icons/calendar.svelte';
	import PageHead from '../../components/page-head.svelte';
	import { formatDate } from '$lib/date';

	export let photos;
	console.log(photos);
</script>

<PageHead title="Photos - Quentin Bellanger" description="Pouet" />

<h1>Blog</h1>

<p class="intro">Pouet</p>

<ul class="post-list">
	{#each photos as photo}
		<li class="h-entry">
			<h2 class="title p-name">
				<a class="link u-url" href={`/photos/${photo.slug}`}>{photo.date}</a>
			</h2>
			<div class="date">
				<Calendar class="calendar" />
				<span
					>Publiée le <time datetime={photo.date} class="dt-published"
						>{formatDate(photo.date)}</time
					></span
				>
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
			max-width: toRem(700);
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
