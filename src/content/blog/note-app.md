---
title: 'Create a simple note-taking app'
description: 'Learn by doing a note-taking app with this beginners-oriented tutorial.'
date: 2017-08-02
lang: 'en'
syndicate: false
---

I love to write. Either it's for me or for people, to share things here, about code or random things: it helps me to empty my mind and to write down what I'm thinking about. As I'm always looking for new projects to improve my coding skills, I wanted to make something related with writing: a note-taking app.

Something where you could write, style and save your notes.

- **Write**: type what you're thinking about.
- **Style**: like in Medium, add some style to your text (_bold, italic..._)
- **Save**: auto-save your work so you can't lose it.

## Create the main structure

This is the easiest and shortest part: it consists in building the main HTML structure of your web page. At least everything that comes after `!DOCTYPE`, head and body tags, CSS and JavaScript links (_for later_) and meta tags (_basically like in every new projet_).

To create our editor, we will only need two divs, the title and the content. Give them text inside so you can see in your browser two lines of text. HTML5 is great because with only one attribute, it can make any tag editable. Pass each of your div the attribute `contenteditable` with the value true and refresh your browser. If you click into one of your divs, you can now edit their content!

![](https://cdn-images-1.medium.com/max/2000/1*ITjhODaIOX4rJ8qLw30sIw.gif)

At this moment, your code should look like the one below and is enough if you want to have a very basic text editor. We could stop now as we have what we want but I think we could improve it with more features!

```html
<!-- ... -->
<div contenteditable>What I'm thinking about</div>
<div contenteditable>Your deep thoughts...</div>
<!-- ... -->
```

## Save your work

Whether you are writing blog posts, random thoughts or listing your projects ideas, you want to keep it safe! I even think you should never delete what you are writing. We need our app to save automatically our content.

Let's tell the browser to save your writings thanks to the power of JavaScript and `localStorage`. It is a feature of the [Web storage API](https://www.w3schools.com/html/html5_webstorage.asp) which allows you to store data locally on your browser for an unlimited duration. It means that even if you close your tab or your browser's window, your data will remain safe and stored. Step by step, here is how to do it:

1. Target your two `div`s (_from part 1_) in your `.js` file (with `querySelector`) and store their `innerHTML` in a new `localStorage` instance.
2. Create a `save()` function that updates the content stored in every `localStorage` instance. This content will be equal to the new `innerHTML` of each `div`.
3. Create an event on your divs which will launch the saving function. I chose `onkeyup` to save the content everytime you're typing a new character. Add it after your function declaration. Or directly in the HTML file by adding a new attribute to your `div`s: `onkeyup="save()"`.

So here is the final code for the whole saving part:

```javascript
// Set variables
const editorTitle = document.querySelector('.title');
const editorContent = document.querySelector('.content');
const defaultTitle = 'What are you thinking about?';
const defaultContent = "Let's write your deepest thoughts...";

// Attribute localStorage values
editorTitle.innerHTML = localStorage['title'] || defaultTitle;
editorContent.innerHTML = localStorage['content'] || defaultContent;

// Define the saving function
let save = () => {
  localStorage['title'] = editorTitle.innerHTML;
  localStorage['content'] = editorContent.innerHTML;
};

// Launch the function
editorTitle.onkeyup = () => save();
editorContent.onkeyup = () => save();
```

> I took advantage of this project to learn and get used to new ES6 features like `const` and `let` or `=>` functions (you can learn a lot about this in [this great post](https://zellwk.com/blog/es6/) by Zell Liew). Let me know if some part of my code must be improved!

## Add styling features

The basic editor that we have now is working but you will admit that it is still very simple and can be improved with new features. Why not adding styling features? Bold, italic, underline seem nice and could give your writings a better look!

The first step to do that is to create a menu with buttons (_as many as styling features we have, three in our case_). Once clicked, they will apply style on selected text in your content. I'm not talking about CSS now. First make it work, then make it beautiful.

I was surprised how easy it was to implement these options. JavaScript has native features that makes it very easy and quick. You basically need just one function: `execCommand()`. With this function, you can pass a parameters (_[the full list is here](https://developer.mozilla.org/en/docs/Web/API/Document/execCommand)_) like `bold`, `copy`, `createLink`... Once called, this function will apply the passed parameter to selected text (_you don't even need to store this text as it is automatically detected_). If no text is selected, nothing happens. Here is the full but very short code of these styling features:

```javascript
// Define your styling function
let addStyle = (style) => {
  document.execCommand(style);
};

// Call the function on click
boldButton.onclick = () => addStyle('bold');
italicButton.onclick = () => addStyle('italic');
underlineButton.onclick = () => addStyle('underline');
```

Like before, you can also call the functions directly in the HTML tag: `onclick="addStyle('bold')`.

> Given that main browsers have their own built-in keyboard shortcuts, it is not necessary a good idea to create JavaScript keyboard to override those shortcuts (<kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>B</kbd> / <kbd>U</kbd> / <kbd>I</kbd>).

## Make it nice

For this part you're free: do whatever you want to style your app and make it look nice! My inspiration comes from other notes taking apps likes [Papier](http://getpapier.com/), [Bear](http://www.bear-writer.com/), [Squarespace mobile apps](https://www.squarespace.com/apps) and [Simplenote](https://simplenote.com/). When I designed the app, I was focused on these essential points:

- I made it **responsive** so I can have the same app on desktop, tablet and mobile with the same ease.
- I wanted something very **simple** and **minimalist**. I like to stay focused on my writings: no distraction allowed.

![](https://cdn-images-1.medium.com/max/3200/1*iaV0z8aPvLGmlfQ_TZK_Ow.png)

## The result

You can try the demo here: [https://notes.quentin-bellanger.com](https://notes.quentin-bellanger.com). So now, you have something that:

- Allows you to type your notes with `contenteditable`, to style them with execCommand and to save them locally thanks to `localStorage`. These are the main features of a simple text editor.
- Renders well in every main browsers (_except IE_). As you can see [here](https://caniuse.com/#feat=contenteditable), [here](https://caniuse.com/#feat=namevalue-storage) and [here](https://caniuse.com/#feat=document-execcommand), every features (_`contenteditable`, `localStorage`, `execCommand`_) of this project are supported by most used browsers so there are no big compatibility issues.
- Works on every device, from desktop to smartphone. The screen size isn't a problem and the app is responsive.
- Teaches a lot. Making this project taught me many things, mostly in JavaScript. If you take time to do it, I hope you'll also learn new things. If you're stuck, check the full code on the [Github repository](https://github.com/bellangerq/wysiwyg-editor).

It's a simple text editor, built as a personal project to learn and improve my coding skills. I know there are possible improvements (_for example, as told in [this post](https://medium.com/content-uneditable/contenteditable-the-good-the-bad-and-the-ugly-261a38555e9c), there are probably better and more optimized solutions to create a proper editor_) and new features like new editor options (_link, titles, lists..._), the possibility to download notes, a night or/and fullscreen mode...

A nice inspiration for this project comes from Samay Shamdasani and his editor project on [enlight.ml](https://enlight.ml/). It's a great help for beginners. Check it out if you're looking for small projects to start.
