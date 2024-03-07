<script>
  import { onMount } from 'svelte';

  import Sun from '../assets/icons/sun.svelte';
  import Moon from '../assets/icons/moon.svelte';

  const STORAGE_KEY = 'color-scheme';
  const THEMES = {
    light: 'light',
    dark: 'dark',
    auto: 'auto'
  };

  let currentTheme;

  onMount(() => {
    // Get and apply initial theme
    currentTheme = getTheme();
    setPreference();

    // Listen to system theme changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches: isDark }) => {
        currentTheme = isDark ? 'dark' : 'light';
        setPreference();
      });
  });

  /**
   * Retrieve theme in localStorage first, then in user settings.
   */
  function getTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme) {
      return savedTheme;
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.dark : THEMES.light;
    }
  }

  function toggleTheme() {
    currentTheme = currentTheme === THEMES.light ? THEMES.dark : THEMES.light;

    setPreference();
  }

  /**
   * Apply theme changes to <html>
   */
  function setPreference() {
    localStorage.setItem(STORAGE_KEY, currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }

  function hello() {
    return {
      duration: 200,
      css: (t, u) => `opacity: ${t}; transform: scale(${t})`
    };
  }

  function goodbye() {
    return {
      duration: 0,
      css: (t, u) => `opacity: ${u}`
    };
  }
</script>

<button
  class="toggle"
  on:click={toggleTheme}
  aria-label={`Passer en thème ${currentTheme === THEMES.light ? 'sombre' : 'clair'}`}
>
  {#if currentTheme === THEMES.dark}
    <div in:hello|global out:goodbye|global>
      <Sun />
    </div>
  {:else}
    <div in:hello|global out:goodbye|global>
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
