<script context="module">
	export async function load({ fetch }) {
		const response = await fetch(`/api/notes.json`);
		const { notes } = await response.json();

		return {
			props: { notes }
		};
	}
</script>

<script>
	import Calendar from '../../assets/icons/calendar.svelte';
	import PageHead from '../../components/page-head.svelte';
	import { readableDate } from '$lib/date';

	export let notes;
</script>

<PageHead title="Blog - Quentin Bellanger" description="Notes et pensées." />

<h1>Notes</h1>

<p class="intro">Notes et pensées</p>

<ul class="note-list">
	{#each notes as note}
		<li class="h-entry">
			<h2 class="title p-name">
				<a class="link u-url" href={`/notes/${note.id}`}>{readableDate(note.date)}</a>
			</h2>

			<div class="post-content e-content">
				{@html note.content}
			</div>
		</li>
	{/each}
</ul>
