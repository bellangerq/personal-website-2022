<script>
	import Chevron from '../assets/icons/chevron.svelte';

	let isOpen;

	function toggle() {
		isOpen = !isOpen;
	}

	export let webmentions;
</script>

<details on:toggle={toggle} open={isOpen} class="webmentions">
	<summary class="title">
		<Chevron class="icon-chevron" />
		<h2>
			<span class="visually-hidden">{isOpen ? 'Cacher' : 'Afficher'} </span>{webmentions.length} webmentions
		</h2>
	</summary>

	<ul class="list">
		{#each webmentions as webmention}
			<li class="item">
				<a class="link" target="_blank" href={webmention['wm-source']}>{webmention['wm-source']}</a>
			</li>
		{/each}
	</ul>
</details>

<style lang="scss">
	.webmentions {
		border-top: toRem(1) solid var(--c-lightgray);
		border-bottom: toRem(1) solid var(--c-lightgray);
		padding: toRem(32) 0;

		&[open] :global(.icon-chevron) {
			transform: none;
		}
	}

	.title {
		align-items: baseline;
		display: flex;
		gap: toRem(8);
	}

	:global(.icon-chevron) {
		transform: rotate(-90deg);
		width: toRem(24);
		transition: transform 0.2s ease;
	}

	.list {
		list-style: initial;
		padding-left: toRem(16);
		margin-top: toRem(16);
	}

	.item + .item {
		margin-top: toRem(12);
	}

	.item {
		word-wrap: break-word;
	}

	.item::marker {
		color: var(--c-gradient-start);
		font-size: 0.8em;
	}

	.item:nth-child(odd)::marker {
		color: var(--c-gradient-end);
	}

	.link {
		text-decoration: underline;
	}
</style>
