<script context="module">
  import GlobalHead from '../components/global-head.svelte';
  import '../assets/style/main.scss';
</script>

<script>
  import { page } from '$app/stores';
  import ThemeToggle from '../components/theme-toggle.svelte';

  export let links = [
    { title: 'Accueil', href: '/' },
    { title: 'CV', href: '/cv' },
    { title: 'Blog', href: '/blog' },
    { title: 'Photos', href: '/photos' }
  ];
</script>

<GlobalHead />

<a class="skip" href="#main">Aller au contenu principal</a>

<header class="header">
  <nav>
    <ul class="menu">
      {#each links as link}
        <li>
          <a class="item" aria-current={$page.url.pathname === link.href} href={link.href}>
            {link.title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
  <ThemeToggle />
</header>

<main id="main" class="h-card">
  <slot />
</main>

<footer class="footer">
  <p>
    Ailleurs sur le web : <a href="https://twitter.com/bellanger_q" rel="me">Twitter</a>,
    <a href="https://bsky.app/profile/quentin-bellanger.com" rel="me">Bluesky</a> et
    <a href="https://github.com/bellangerq" rel="me">GitHub</a>.
  </p>
  <p>
    Crédits : ce site utilise les icônes de <a target="_blank" href="https://feathericons.com/"
      >Feather</a
    >
    et la famille de police
    <a target="_blank" href="https://rsms.me/inter/">Inter</a>.
  </p>
</footer>

<style lang="scss">
  .skip {
    background: var(--c-background);
    color: var(--c-content);
    font-size: var(--t-s);
    font-weight: 600;
    border: toRem(2) solid;
    border-radius: toRem(4);
    padding: toRem(2) toRem(8);
    position: absolute;
    left: toRem(-100);
    top: toRem(-100);
    z-index: 1;

    &:focus {
      left: toRem(16);
      top: toRem(32);
    }
  }

  .header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto toRem(64);
    padding: toRem(16) 0;
    gap: toRem(16);
  }

  .menu {
    display: flex;
    gap: toRem(32);
  }

  .item {
    border-radius: toRem(2);
    font-size: var(--t-s);
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
    font-size: var(--t-xs);

    p + p {
      margin-top: toRem(4);
    }

    a {
      border-radius: toRem(2);
      text-decoration: underline;
      transition: color 0.2s ease;

      &:hover {
        color: var(--c-content);
      }
    }
  }
</style>
