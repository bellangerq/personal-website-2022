<script>
	import Download from '../assets/icons/download.svelte';
	import Bookmark from '../assets/icons/bookmark.svelte';
	import Briefcase from '../assets/icons/briefcase.svelte';
	import PageHead from '../components/page-head.svelte';
	import Experience from '../components/experience.svelte';
	import { onMount } from 'svelte';

	function print() {
		window.print();
	}

	let experiencesEl;
	let revealExperiences = false;

	let trainingsEl;
	let revealTrainings = false;

	let canPrint;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (entry.target.classList.contains('experiences')) {
							revealExperiences = true;
						}

						if (entry.target.classList.contains('training')) {
							revealTrainings = true;
						}
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(experiencesEl);
		observer.observe(trainingsEl);

		canPrint = typeof window.print === 'function';
	});

	const experiences = [
		{
			title: 'Développeur web et fondateur - /tmp',
			start: 'Avril 2021',
			end: "Aujourd'hui",
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptate molestiae quo, quasi amet optio distinctio nulla assumenda repellendus possimus odio minus sunt? Ad perspiciatis ducimus doloremque iure, vero nemo.',
			tags: ['vue.js', 'a11y', 'design system']
		},
		{
			title: 'Développeur front-end - HelloAsso',
			start: 'Juin 2019',
			end: 'Mars 2021',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptate molestiae quo, quasi amet optio distinctio nulla assumenda repellendus possimus odio minus sunt? Ad perspiciatis ducimus doloremque iure, vero nemo.',
			tags: ['vue.js', 'a11y', 'design system']
		},
		{
			title: 'Développeur front-end - Muxu.Muxu',
			start: 'Janvier 2018',
			end: 'Février 2019',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptate molestiae quo, quasi amet optio distinctio nulla assumenda repellendus possimus odio minus sunt? Ad perspiciatis ducimus doloremque iure, vero nemo.',
			tags: ['vue.js', 'a11y', 'design system']
		},
		{
			title: 'Développeur web - Freelance',
			start: 'Septembre 2016',
			end: 'Décembre 2019',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptate molestiae quo, quasi amet optio distinctio nulla assumenda repellendus possimus odio minus sunt? Ad perspiciatis ducimus doloremque iure, vero nemo.',
			tags: ['vue.js', 'a11y', 'design system']
		},
		{
			title: 'Community Manager - Wopata',
			start: 'Avril 2015',
			end: 'Décembre 2016',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptate molestiae quo, quasi amet optio distinctio nulla assumenda repellendus possimus odio minus sunt? Ad perspiciatis ducimus doloremque iure, vero nemo.',
			tags: ['vue.js', 'a11y', 'design system']
		}
	];

	const trainings = [
		{
			title: 'Opquast',
			start: 'Octobre 2020',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptate molestiae quo, quasi amet optio distinctio nulla assumenda repellendus possimus odio minus sunt? Ad perspiciatis ducimus doloremque iure, vero nemo.'
		},
		{
			title: 'Le Wagon',
			start: 'Octobre 2017',
			end: 'Décembre 2017',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptate molestiae quo, quasi amet optio distinctio nulla assumenda repellendus possimus odio minus sunt? Ad perspiciatis ducimus doloremque iure, vero nemo.'
		},
		{
			title: 'ESCEN',
			start: 'Janvier 2018',
			end: 'Février 2019',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptate molestiae quo, quasi amet optio distinctio nulla assumenda repellendus possimus odio minus sunt? Ad perspiciatis ducimus doloremque iure, vero nemo.'
		}
	];
</script>

<PageHead title="Curriculum vitæ - Quentin Bellanger" description="" />

<h1>Curric&shy;ulum vitæ</h1>
<h1 class="print-only">Quentin Bellanger</h1>

<p class="intro">
	Introduction : ce que je fais actuellement, ce que je recherche et ce que j'aime. Lorem ipsum,
	dolor sit amet consectetur adipisicing elit. Blanditiis corporis iste cumque sunt cum, quo qui
	aliquid nisi ipsam nemo exercitationem ad alias deleniti quaerat reprehenderit vel, eius, ipsa
	optio!

	{#if canPrint}
		<button on:click={print} class="download">
			<Download class="download-icon" />
			Télécharger
		</button>
	{/if}
</p>

<Briefcase class="icon" />
<h2>Expérience professionnelle</h2>

<ul bind:this={experiencesEl} class="experiences" class:reveal={revealExperiences}>
	{#each experiences as xp}
		<Experience class="experience" {...xp} />
	{/each}
</ul>

<Bookmark class="icon" />
<h2>Études et formations</h2>

<ul bind:this={trainingsEl} class="training" class:reveal={revealTrainings}>
	{#each trainings as training}
		<Experience class="experience" {...training} />
	{/each}
</ul>

<style lang="scss">
	.download {
		border: toRem(2) solid;
		border-radius: toRem(8);
		display: flex;
		align-items: center;
		padding: toRem(4) toRem(8);
		margin-top: toRem(16);
		font-size: toRem(16);
		gap: toRem(8);
		cursor: pointer;
		transition: transform 0.3s ease;

		&:disabled {
			color: var(--c-lightgray);
			cursor: not-allowed;
		}

		@media print {
			display: none;
		}

		:global(.download-icon) {
			width: toRem(18);
		}

		&:hover:not(:disabled) {
			transform: scale(1.1);
		}
	}

	:global(.icon) {
		margin-bottom: toRem(16);
		height: toRem(48);
		width: toRem(48);
	}

	h2 {
		margin-bottom: toRem(32);
	}

	.experiences,
	.training {
		padding-left: toRem(24);
		position: relative;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			border-radius: toRem(2);
			background-image: linear-gradient(60deg, var(--c-gradient-end), var(--c-gradient-start));
			background-repeat: no-repeat;
			width: toRem(2);
			transform: scaleY(0);
			transform-origin: top;

			@media (prefers-reduced-motion: reduce) {
				transform: none;
			}
		}

		&.reveal::after {
			animation: scaleDown;
			animation-duration: 4s;
			animation-fill-mode: forwards;
			animation-timing-function: ease-in-out;
		}
	}

	.experiences {
		margin-bottom: toRem(64);
	}

	:global(.experience + .experience) {
		margin-top: toRem(48);
	}

	@keyframes scaleDown {
		from {
			transform: scaleY(0);
		}
		to {
			transform: scaleY(1);
		}
	}
</style>
