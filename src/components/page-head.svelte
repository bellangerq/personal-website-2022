<script>
	export let title = '';
	export let description = '';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="og:title" property="og:title" content={title} />
	<meta name="description" property="description" content={description} />
	<meta name="og:description" property="og:description" content={description} />
	<meta name="twitter:title" property="twitter:title" content={title} />
	<meta name="twitter:description" property="twitter:description" content={description} />
</svelte:head>
