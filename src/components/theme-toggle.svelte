<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import Sun from '../assets/icons/sun.svelte';
	import Moon from '../assets/icons/moon.svelte';

	const MODES = {
		light: 'light',
		dark: 'dark'
	};

	let currentTheme = MODES.light;

	onMount(() => {
		// Fetch and use theme from localStorage
		const savedTheme = localStorage.getItem('color-scheme');

		if (savedTheme) {
			currentTheme = savedTheme;
			addDocumentTheme();
			return;
		}

		// Retrieve theme from user preferences
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (prefersDark) {
			currentTheme = MODES.dark;
		}

		addDocumentTheme();
	});

	function toggleMode() {
		removeDocumentTheme();

		currentTheme = currentTheme === MODES.light ? MODES.dark : MODES.light;

		addDocumentTheme();
		localStorage.setItem('color-scheme', currentTheme);
	}

	function removeDocumentTheme() {
		document.documentElement.classList.remove(currentTheme);
	}

	function addDocumentTheme() {
		document.documentElement.classList.add(currentTheme);
	}

	function hello() {
		return {
			duration: 200,
			// css: (t, u) => `transform: scale(${t}) translateX(${u * 100}%)`
			css: (t, u) => `opacity: ${t}; transform: scale(${t})`
		};
	}

	function goodbye() {
		return {
			duration: 0,
			// css: (t, u) => `transform: scale(${t}) translateX(${u * 100}%)`
			css: (t, u) => `opacity: ${u}`
		};
	}
</script>

<button
	class="toggle"
	on:click={toggleMode}
	aria-label={`Passer en mode ${currentTheme === MODES.light ? 'sombre' : 'clair'}`}
>
	{#if currentTheme === MODES.dark}
		<div in:hello out:goodbye>
			<Sun />
		</div>
	{:else}
		<div in:hello out:goodbye>
			<Moon />
		</div>
	{/if}
</button>

<style lang="scss">
	.toggle {
		background: none;
		border: none;
		border-radius: 50%;
		height: toRem(24);
		width: toRem(24);
	}
</style>
