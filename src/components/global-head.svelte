<script>
	import { page } from '$app/stores';
	import { variables } from '$lib/variables';

	const url = variables.baseUrl + $page.url.pathname;
	const ogImageUrl = `${variables.baseUrl}/og.png`;
</script>

<svelte:head>
	<meta name="og:url" property="og:url" content={url} />
	<meta name="og:image" property="og:image" content={ogImageUrl} />
	<meta name="og:type" property="og:type" content="website" />
	<meta name="twitter:card" property="twitter:card" content="summary_large_image" />
	<meta name="twitter:card" property="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" property="twitter:image" content={ogImageUrl} />
	<link rel="webmention" href="https://webmention.io/quentin-bellanger.com/webmention" />
	<link rel="pingback" href="https://webmention.io/quentin-bellanger.com/xmlrpc" />
</svelte:head>
