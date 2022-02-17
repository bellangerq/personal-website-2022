<script>
	import PageHead from '../components/page-head.svelte';
	import Merge from '../assets/icons/merge.svelte';
	import Briefcase from '../assets/icons/briefcase.svelte';
	import Book from '../assets/icons/book.svelte';
</script>

<PageHead title="Bonjour - Quentin Bellanger" description="" />

<h1>Quentin Bellanger</h1>

<p class="intro">
	I am a front-end developer based in Bordeaux, France. The main focus of my work is to build
	accessible, inclusive and user-friendly web interfaces. Since April 2021, I co-founded /tmp, a
	company specialized in web accessibility and web development.
</p>

<ul class="blocks">
	<li class="block">
		<Merge class="icon" />
		<h2>
			<a href="https://slash-tmp.dev">/tmp</a>
		</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus id pariatur facilis
			perspiciatis adipisci minus inventore sint iure aperiam illo mollitia, quam libero soluta
			voluptas? Beatae quisquam et excepturi enim.
		</p>
	</li>

	<li class="block">
		<Briefcase class="icon" />
		<h2>
			<a href="/cv">Curriculum vitæ</a>
		</h2>
		<p>
			Un résumé de mes différentes expériences, mes études ainsi que mes motivations et envies
			professionnelles. Et non, je n'ai plus LinkedIn.
		</p>
	</li>

	<li class="block">
		<Book class="icon" />
		<h2 class="temp">Blog (bientôt)</h2>
		<p>
			Un blog sur lequel j'écris occasionnellement des articles sur le développement,
			l'accessibilité numérique et le web en général.
		</p>
	</li>
</ul>

<style lang="scss">
	.blocks {
		display: flex;
		flex-wrap: wrap;
		gap: toRem(80) toRem(48);

		@include small {
			gap: toRem(48);
		}
	}

	.block {
		opacity: 0;
		border-radius: toRem(10);
		flex-grow: 1;
		flex-basis: calc((toRem(800) - 100%) * 999);
		animation: fadeIn 0.8s;
		animation-fill-mode: forwards;

		&:nth-child(2) {
			animation-delay: 0.3s;
		}

		&:nth-child(3) {
			animation-delay: 0.6s;
		}

		:global(.icon) {
			margin-bottom: toRem(16);
			height: toRem(48);
			width: toRem(48);
		}

		h2 {
			display: inline-block;
			margin-bottom: toRem(8);

			&.temp {
				font-style: italic;
			}
		}

		p {
			color: var(--c-lightgray);
			font-size: toRem(16);
		}

		a {
			border-radius: toRem(2);
			display: flex;
			align-items: baseline;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	@keyframes fadeIn {
		from {
			transform: translateY(toRem(16));
			opacity: 0;
		}
		to {
			transform: none;
			opacity: 1;
		}
	}
</style>
