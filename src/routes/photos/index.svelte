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
	import PageHead from '../../components/page-head.svelte';
	import Date from '../../components/date.svelte';
	import { formatDate } from '$lib/date';

	export let photos;
</script>

<PageHead
	title="Photos - Quentin Bellanger"
	description="Loin d'être un professionnel de la photo, il m'arrive parfois d'en prendre avec mon smartphone."
/>

<h1>Photos</h1>

<p class="intro">
	Loin d'être un professionnel de la photo, il m'arrive parfois d'en prendre avec mon smartphone.
</p>

<ul class="photo-list">
	{#each photos as photo}
		<li class="photo-item">
			<a href={`/photos/${photo.slug}`}>
				<span class="visually-hidden">Photo du {formatDate(photo.date)}</span>
				<img
					width="250"
					height="250"
					loading="lazy"
					class="photo-img"
					src={`/photos/${photo.slug}.jpg`}
					alt=""
				/>
			</a>
			<Date date={photo.date} isFeminine />
		</li>
	{/each}
</ul>

<style lang="scss">
	.photo-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(toRem(250), 100%), 1fr));
		grid-gap: toRem(32);
	}

	.photo-item {
		aspect-ratio: 1;
	}

	.photo-img {
		border: toRem(3) solid;
		border-radius: toRem(4);
		height: 100%;
		width: 100%;
		margin-bottom: toRem(8);
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.6;
		}
	}
</style>
