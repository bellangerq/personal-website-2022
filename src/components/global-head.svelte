<script>
	import { page } from '$app/stores';
	import { variables } from '$lib/variables';

	const url = variables.baseUrl + $page.url.pathname;

	const ogImageUrl = `${variables.baseUrl}/og.png`;
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
	<link
		type="application/atom+xml"
		rel="alternate"
		href={`${variables.baseUrl}/feed.xml`}
		title="Quentin Bellanger"
	/>
	<link rel="webmention" href="https://webmention.io/quentin-bellanger.com/webmention" />
	<link rel="pingback" href="https://webmention.io/quentin-bellanger.com/xmlrpc" />
</svelte:head>
