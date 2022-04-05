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

<PageHead title="Notes - Quentin Bellanger" description="Notes et pensées en format court." />

<h1>Notes</h1>

<p class="intro">
	Notes et pensées en format court. Tout est également republié sur mon <a
		href="https://twitter.com/bellanger_q">profil Twitter</a
	>.
</p>

<ul class="note-list">
	{#each notes as note}
		<li class="h-entry">
			<h2 class="title p-name">
				<a class="link u-url" href={`/notes/${note.id}`}>Note #{note.id}</a>
			</h2>
			<div class="date">
				<Calendar class="calendar" />
				<span
					>Publié le <time datetime={note.date} class="dt-published">{readableDate(note.date)}</time
					></span
				>
			</div>

			<div class="post-content e-content">
				{@html note.content}
			</div>
		</li>
	{/each}
</ul>

<style lang="scss">
	.note-list {
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
			margin-bottom: toRem(16);
		}

		:global(.calendar) {
			height: toRem(20);
			width: toRem(20);
		}
	}
</style>
