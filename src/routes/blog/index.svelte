<script context="module">
	export async function load({ fetch }) {
		const response = await fetch(`/api/posts.json`);
		const { posts } = await response.json();

		return {
			props: { posts }
		};
	}
</script>

<script>
	export let posts;
</script>

<h1>Blog</h1>

<p class="intro">
	Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quidem dolorem, officia, vel
	repellendus odit corrupti consequatur optio eos est quis. Modi doloribus atque ratione iusto a
	sapiente aperiam mollitia?
</p>

<ul>
	{#each posts as post}
		<li><a href={`/blog/${post.slug}`}>{post.title}</a></li>
	{/each}
</ul>
