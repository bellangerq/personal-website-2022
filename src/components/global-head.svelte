<script>
	import { onMount } from 'svelte';

	let url;
	let ogImageUrl;

	onMount(() => {
		url = window.location.href;
		ogImageUrl = `${window.location.origin}/og.png`;
	});
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" href="/favicon.png" />
	<meta property="og:url" name="og:url" content={url} />
	<meta property="og:image" name="og:image" content={ogImageUrl} />
	<meta property="og:type" name="og:type" content="website" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:image" content={ogImageUrl} />
</svelte:head>
