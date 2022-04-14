---
title: 'Keeping a clean markup in Vue'
description: 'Leverage the power of the template tag.'
date: 2019-10-01
lang: 'en'
syndicate: false
---

As a developer who attach a lot of importance to markup and HTML, I make sure that components I create in Vue have the minimal amount of tags and are not a big `div` soup.

Vue components rely a lot on a native tag called `template`. Every component is wrapped under this tag. The content of this tag is not rendered on page load but aims to be rendered with JavaScript during runtime (and Vue automatically handles this process). This mechanism is used a lot with web components. You can [learn more about the template tag on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template).

But this `template` thing can also be used **inside** Vue components. It saves us from creating useless rendered tags which are only here to wrap content. Let's browse some use cases.

## Conditional string content

Let's say we want to display a string inside a paragraph. A part of that string is shown only under a condition with a `v-if` directive. Instead of creating a `span` wrapper (which will be rendered in the final markup), we can replace it with a `template`.

```html
<!-- DON'T -->
<p>{{ data }} <span v-if="condition">{{ moreData }}</span></p>

<!-- DO -->
<p>{{ data }} <template v-if="condition">{{ moreData }}</template></p>
```

The final markup will only be a simple `p` tag with no children. No extra `span`. No invalid markup. Pure HTML!

## Better list rendering

Imagine we want to render a list of definitions inside a `dl` with a `v-for`. How do we group each definition term and description? Certainly not with a `div`! Apply the directive on the `template` tag.

```html
<!-- DON'T -->
<dl>
	<div v-for="def in definitions">
		<dt>{{ def.title }}</dt>
		<dd>{{ def.description }}</dd>
	</div>
</dl>

<!-- DO -->
<dl>
	<template v-for="def in definitions">
		<dt>{{ def.title }}</dt>
		<dd>{{ def.description }}</dd>
	</template>
</dl>
```

It results with a cleaner HTML. Again, no extra `div`. No polluted markup.

## Named slots wrappers

One awesome feature of Vue are [slots](https://vuejs.org/v2/guide/components-slots.html). They can have a `name` attribute so they can be called from the parent by their name. Here is our example component with named slots:

```html
<template>
	<div>
		<p><slot name="title"></slot></p>
		<!-- Some markup... -->
		<div><slot name="body"></slot></div>
	</div>
</template>
```

Slots are often wrapped inside a tag when you define them (here the `p` and the nested `div`). Don't even try to re-wrap them inside another `div` in the parent component! Or it will end up with a rain of `div`. Call the slot directly on a `template` tag:

```html
<!-- DON'T -->
<div slot="title">Keeping a clean markup in Vue</div>

<!-- DO -->
<template slot="title"> Keeping a clean markup in Vue </template>
```

## Clean markup FTW!

I'm sure there are a lot of additional use cases but these ones are from my personal experience. A good point to make sure your HTML is clean and valid is to always question the usefulness of a tag, especially non-semantic ones like `div` or `span`.
