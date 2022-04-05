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
	import PageHead from '../../components/page-head.svelte';

	export let noteContent;
	export let meta;
</script>

<PageHead title={`Notes - #${meta.id} - Quentin Bellanger`} description={'pouet'} />

<article>
	<h1 class="p-name">Note #{meta.id}</h1>
	<svelte:component this={noteContent} />
</article>
