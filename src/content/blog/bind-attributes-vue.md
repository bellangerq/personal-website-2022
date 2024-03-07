---
title: 'Bind parent-scope attributes to a sub node in Vue'
description: 'Overriding the default behaviour for spreading parent-scope attributes in Vue.js.'
date: 2019-11-13
lang: 'en'
syndicate: false
---

If you work with Vue.js, you probably already created (or will) your own components within your application. By component, I mean a small piece of user interface such as a button, a text input or a carousel.

I recently struggled while I was working with a custom input component. The problem was that parent-scope attributes I was adding to the component were not bound to my input. Then I learned these two Vue features:

- `$attrs`.
- `inheritAttrs`.

## Context

This is a simplified version of the component:

```html
<template>
  <div class="InputComponent">
    <input v-model="model" type="text" />
  </div>
</template>

<script>
  export default {
    name: 'InputComponent',
    data() {
      return {
        model: ''
      };
    }
  };
</script>
```

Let's say I want to import this component and add some attributes to it:

```html
<input-component data-tracking="name" id="name"></input-component>
```

By doing this, if I inspect my HTML with the devtools, I can see that the input tag didn't receive the `id` nor the `data-tracking` attributes. But the main wrapper of the component (`.InputComponent`) did.

## `Vue`, `$attrs` and `inheritAttrs`

The above behavior is the default one: Vue creates an object with the attributes (only those not linked to a prop) and then spreads it to the root element of a component.

You can choose to remove this default behavior by adding the property `inhertiAttrs: false` to the component. Doing this will give you access to a new object with all parent-scope attributes: `$attrs`.

Then you can use the `v-bind` directive to spread this object on the desired element. Here is the updated input component:

```html
<template>
  <div class="InputComponent">
    <input v-model="model" type="text" v-bind="$attrs" />
  </div>
</template>

<script>
  export default {
    name: 'InputComponent',
    inheritAttrs: false,
    data() {
      return {
        model: ''
      };
    }
  };
</script>
```

And here is the rendered component:

```html
<div class="InputComponent">
  <input type="text" data-tracking="name" id="name" />
</div>
```

## Wrapping up

- Each component has an object containing all parent-scope attributes.
- This object is spread on the root element by default.
- You can choose to spread this object to another element with `inheritAttrs`, `v-bind` and `$attrs`.

That's it. I love the flexibility Vue gives to developers. Even after almost 2 years working with this framework, I'm still learning this kind of cool features.
