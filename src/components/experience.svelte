<script>
  let className;
  export { className as class };
  export let title;
  export let start;
  export let end = null;
  export let description;
  export let tags = [];
  export let link = null;
</script>

<li class={className}>
  <h3>{title}</h3>
  <div class="period">
    {start}
    {#if end}
      - {end}{/if}
  </div>
  <p class="description">{description}</p>
  {#if tags?.length}
    <ul class="tags" aria-label="Compétences associées">
      {#each tags as tag}
        <li class="tag">{tag}</li>
      {/each}
    </ul>
  {/if}
  {#if link}
    <a class="link" href={link.href}>{link.title}</a>
  {/if}
</li>

<style lang="scss">
  h3 {
    display: inline-block;
    margin-right: toRem(8);
  }

  .period {
    color: var(--c-lightgray);
    font-size: var(--t-s);
    margin-bottom: toRem(8);
  }

  .description {
    margin-bottom: toRem(8);
    max-width: toRem(800);
  }

  .tags {
    display: flex;
    gap: toRem(8);
    flex-wrap: wrap;
  }

  .tag {
    background: linear-gradient(
      var(--gradient-angle),
      var(--c-gradient-start),
      var(--c-gradient-end)
    );
    color: var(--c-background);
    border-radius: toRem(8);
    font-size: var(--t-xs);
    font-weight: 600;
    padding: toRem(2) toRem(8);
  }

  .link {
    font-size: var(--t-s);
    text-decoration: underline;
    transition: color 0.2s ease;

    &:hover {
      color: var(--c-lightgray);
    }
  }
</style>
