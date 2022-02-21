---
title: 'Accessibility of cookies banners'
description: 'Anatomy of an accessible and inclusive cookies banner.'
date: 2020-04-04
---

As we see a cookies banner on every website today, it's really important to make sure it is accessible and that everyone can have access to its content.

What is a cookies banner made of? It's most of the time a container with actions. It is often accompagnied with a modal where users can configure advanced settings.

<abbr title="Too long; didn't read">TL;DR</abbr>: I made a [small demo on CodePen](https://codepen.io/bellangerq/full/vYOwpvm).

<p class="codepen" data-height="500" data-theme-id="dark" data-default-tab="result" data-user="bellangerq" data-slug-hash="vYOwpvm" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Accessible cookie banner">
  <span>See the Pen <a href="https://codepen.io/bellangerq/pen/vYOwpvm">
  Accessible cookie banner</a> by Quentin Bellanger (<a href="https://codepen.io/bellangerq">@bellangerq</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## DOM order

It should be the first focusable element in the page, before the skip link and before the website's main navigation. The idea is that every visitor coming to your site must able to quickly interact with it as it's in many country a legal requirement.

It's generally a `div`, often positioned with `position: fixed` so it can immediately be seen on screen above the other elements. Here is a simplified example HTML structure:

```html
<body>
	<header>
		<!-- Cookies banner should be there -->
		<div>...</div>

		<!-- Skip to content link -->
		<a> ... </a>

		<!-- Website main navigation -->
		<nav>...</nav>
	</header>

	<!-- Main page content -->
	<main>...</main>
</body>
```

## Banner actions

In a cookies banner, there are often two actions you can do:

1. Accept everything (and close the banner).
2. Open advanced settings in a modal.

For both actions, we must use `<button type="button">` because we are **doing** something.

> As a reminder or if you struggle in differentiating a link and a button: a button **does** something while a link **goes** somewhere.

Once clicked, the first will close the banner and accept cookies. The second action will open a modal on click. Event listeners (`addEventListener()`) are our friend here to attach actions (hide banner, open modal).

## Settings modal

The hardest part of this article is to build an accessible modal. I won't go deep in the details because it's not the topic of this post. But you can refer to the [<abbr title="Web Accessibility Initiative - Accessible Rich Internet Applications">WAI-ARIA</abbr> best practices to build a modal](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html).

Every category of cookies must be identified under a specific section (tracking, user expereience...) so users know what it is all about. Then use a checkbox input (`<input type="checkbox">`) to accept or refuse each cookie.

---

Key points to remember:

- Place the banner early in the DOM.
- Use buttons for actions.
- Build an accessible modal.
- Group cookies by category.
- Use a checkbox for each cookie.

That's it. Enjoy [the demo](https://codepen.io/bellangerq/full/vYOwpvm). If you have any suggestion, please ping me on [Twitter](https://twitter.com/bellanger_q).
