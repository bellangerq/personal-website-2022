<script>
	import { onMount } from 'svelte';

	let url;
	let ogImageUrl;

	onMount(() => {
		url = window.location.href;
		ogImageUrl = `${window.location.origin}/images/og.png`;
	});
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" href="/images/favicon.png" />
	<meta name="og:url" content={url} />
	<meta name="og:image" content={ogImageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
