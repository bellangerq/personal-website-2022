<script context="module">
	export async function load({ params }) {
		const note = await import(`../../content/notes/${params.id}.md`);

		return {
			props: {
				noteContent: note.default,
				meta: { ...note.metadata, id: params.id }
			}
		};
	}
</script>

<script>
	import Calendar from '../../assets/icons/calendar.svelte';
	import PageHead from '../../components/page-head.svelte';
	import { readableDate } from '$lib/date';

	export let noteContent;
	export let meta;
</script>

<PageHead title={`Notes - #${meta.id} - Quentin Bellanger`} description={'pouet'} />

<article class="note h-entry" lang={meta.lang === 'en' ? meta.lang : null}>
	<h1 class="p-name">Note #{meta.id}</h1>

	<div class="date">
		<Calendar class="calendar" />
		<span
			>Publié le <time datetime={meta.date} class="dt-published">{readableDate(meta.date)}</time
			></span
		>
	</div>

	<svelte:component this={noteContent} />
</article>

<style lang="scss">
	.note {
		max-width: toRem(600);
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
