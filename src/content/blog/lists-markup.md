---
title: 'How to markup lists'
description: 'Lists'
date: 2020-06-16
lang: 'en'
syndicate: false
---

As shortly [defined on Wikipedia](https://en.wikipedia.org/wiki/List):

> A list is any enumeration of a set of items.

I would add to this definition the fact that **items within a list must be of the same nature**. It helps choosing if a list should be used to markup content. Indeed, if the content contains a set of items of the same nature, ordered or not, it's probably a good situation to use a list.

## <abbr title="HyperText Markup Language">HTML</abbr> lists

There are 3 types of list in HTML, each having its different use cases and a different meaning.

### Unordered lists

Probably the most used list element rendered as a bulleted list by default (can be changed with <abbr title="Cascading Style Sheets">CSS</abbr>). Children order have no importance here. To insure a valid HTML, it's important that each direct child is contained within a list item (`<li>` element).

```html
<p>Rings of power</p>
<ul>
  <li>3 for the Elves</li>
  <li>7 for the Dwarves</li>
  <li>9 for the Men</li>
  <li>1 for Sauron</li>
</ul>
```

### Ordered lists

As opposed to the previous one, this type of list ([`<ol>` element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol)) is rendered as a numbered list. The order is meaningful for the list and its children. As for the `<ul>`, direct children must be `<li>`. Here is how to markup an ordered list:

```html
<p>The Lord of the Rings movies</p>
<ol>
  <li>The fellowship of the ring</li>
  <li>The two towers</li>
  <li>The return of the king</li>
</ol>
```

To know if it's better to use a `<ul>` or `<ol>` element, try swaping the order of the children: if it's still makes sense, it should probably be an `<ul>`. Otherwise, it's an `<ol>`.

### Description lists

Lists can have both a title and a description. That's why the `<dl>` ([description list element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl)) element exists but its usage differs from `<ul>` and `<ol>` elements. It if often used for definitions list. Each list item is composed of:

- a description term (`<dt>` tag).
- followed by a description details (`<dd>` tag).

```html
<p>Hobbits</p>
<dl>
  <dt>Frodo</dt>
  <dd>The one ring wearer.</dd>

  <dt>Sam</dt>
  <dd>Definitely the true hero.</dd>

  <dt>Pippin</dt>
  <dd>Clumsy but lovely guy.</dd>
</dl>
```

---

As for many HTML elements, you can nest lists as much as you want (until you got a headache figuring which item belongs to which list!). The nested list is part of one list item of the parent list, like in this example:

```html
<p>Middle Earth movies:</p>
<ul>
  <li>
    The Lord of the Rings
    <ul>
      <li>The Fellowship of the Ring</li>
      <li>The Two Towers</li>
      <li>The Return of the King</li>
    </ul>
  </li>
  <li>
    The Hobbit
    <ul>
      <li>An Unexpected Journey</li>
      <li>The Desolation of Smaug</li>
      <li>The Battle of the Five Armies</li>
    </ul>
  </li>
</ul>
```

In the above example, each sub list is wrapped inside the main list items.

## Lists attributes

What we've seen before is the basic knowledge about HTML lists. But they allow us to go further by providing useful attributes. For each following attribute, let's consider an ordered list of 4 items (1, 2, 3, 4).

- `reversed` (`<ol>` only): reverses the order of a list. It will output: **4, 3, 2, 1**.

  ```html
  <ol reversed>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ol>
  ```

- `start` (`<ol>` only): defines the count start of a list with a number. If set to `3`, it will output: **3, 4, 5, 6**.

  ```html
  <ol start="3">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ol>
  ```

- `value` (`<li>` inside `ol` only): set the list item value with a number, ignoring the default count for the current element and the next ones. If set to `8` on the third `li`, it will output: **1, 2, 8, 9**.

  ```html
  <ol>
    <li>1</li>
    <li value="8">2</li>
    <li>3</li>
    <li>4</li>
  </ol>
  ```

⚠️ [As stated on <abbr title="Mozilla Developer Network">MDN</abbr>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol), while there is a `type` attribute, it is not recommended to use it. Use the CSS `list-style-type` property instead.

## Common use cases

"When should I use a list?" we could ask. On almost every website, there are use many cases. Here are some common patterns and content we could easily identify:

- Navigation menus.
- Tables of content.
- Comments of a blog post.
- Blog post tags.
- Steps of a tutorial.
- Articles index.
- Recipe's instructions.
- Social media links.
- Carousel's slides.
- And many more...

One thing to check: **Is there any repeated content of the same nature that would be appropriately encapsulated within a list?**

Thanks for reading!
