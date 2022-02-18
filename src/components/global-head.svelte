<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let url;
	let ogImageUrl;

	onMount(() => {
		url = `${$page.host}${$page.path}`;
		ogImageUrl = `${$page.host}/og.png`;
	});
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" href="/favicon.png" />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:type" content="website" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:image" content={ogImageUrl} />
</svelte:head>
