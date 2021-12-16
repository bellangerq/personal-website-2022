<script>
	import layoutContent from '../content/layout.json';

	export let content = layoutContent;
</script>

<header>
	<a href="/">{content.pageTitle}</a>
</header>

<main>
	<slot />
</main>

<footer>
	<p>{content.footerDescription}</p>
	<ul>
		{#each content.footerLinks as link}
			<li>
				<a href={link.url}>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</footer>
