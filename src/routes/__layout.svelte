<script context="module">
	import '../assets/style/main.scss';
</script>

<script>
	import { page } from '$app/stores';

	export let links = [
		{ title: 'Accueil', href: '/' },
		{ title: 'CV', href: '/cv' }
		// { title: 'Blog', href: '/blog' }
	];
</script>

<header class="header">
	<nav>
		<ul class="menu">
			{#each links as link}
				<li>
					<a class="item" aria-current={$page.path === link.href} href={link.href}>{link.title}</a>
				</li>
			{/each}
			<!-- <li>
				<a class="item" href="/" lang="en">English</a>
			</li> -->
		</ul>
	</nav>
</header>

<main>
	<slot />
</main>

<footer class="footer">
	<p>
		Ailleurs sur le web : <a href="https://twitter.com/bellanger_q">Twitter</a> et
		<a href="https://github.com/bellangerq">GitHub</a>.
	</p>
</footer>

<style lang="scss">
	.header {
		margin: 0 auto toRem(64);
		padding: toRem(16) 0;
	}

	.menu {
		display: flex;
		gap: toRem(32);
	}

	.item {
		border-radius: toRem(2);
		font-size: toRem(16);
		font-weight: 600;
		position: relative;
		padding-bottom: toRem(4);

		&::after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			border-radius: toRem(2);
			background-image: linear-gradient(60deg, var(--c-gradient-start), var(--c-gradient-end));
			background-position: 0 50%;
			background-size: 0 100%;
			background-repeat: no-repeat;
			height: toRem(2);
			transition: background-size 0.5s ease;
		}

		&[aria-current='true'],
		&:hover {
			&::after {
				background-size: 100% toRem(2);
			}
		}
	}

	.footer {
		color: var(--c-lightgray);
		padding: toRem(16) 0;
		margin: toRem(64) auto 0;
		max-width: toRem(1200);
		display: flex;
		gap: toRem(8);
		font-size: toRem(14);

		a {
			border-radius: toRem(2);
			text-decoration: underline;

			&:hover {
				color: var(--c-content);
			}
		}
	}
</style>
