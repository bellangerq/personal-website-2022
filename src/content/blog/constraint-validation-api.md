---
title: 'Playing with the Constraint Validation API'
description: 'Discovering the native HTML5 validation API to handle form validation. Is it really reliable?'
date: 2020-07-08
---

I'm a huge advocate of using the native features of <abbr title="Hypertext Markup Language 5">HTML5</abbr>. A lot of people don't know what this language is really capable of. Amongs all of these features, there are a lot of built-in <abbr title="Application Programming Interface">API</abbr> like the [**Constraint Validation API**](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation).

⚠️ This post will be talking about client-side validation. **It should never replace server-side validation** as it's mostly used to improve the user experience.

## HTML5 validation API

People are probably familiar with the default tooltip messages that may appear when filling form fields. This is what we're talking about. If we go deeper in details, this API offers some nice methods and properties to play with validation states of inputs and forms.

### Getting the validation state

This native API first allows us to get information about the validation state of form fields: the `checkValidity()` method can be called on form elements (`<input>`, `<select>`, `<textarea>`, `<fieldset>`). It returns a boolean (`true` is the field is valid, `false` otherwise):

```javascript
const field = document.querySelector('input');
const isFieldValid = field.checkValidity();

// 'true' or 'false'
console.log(isFieldValid);
```

This method fires an `invalid` event (which is also fired when the form is submitted). This event can then be used to perform some actions like displaying an errors summary:

```javascript
form.addEventListener('invalid', displayErrors);
```

### Setting a custom validation message

By default, the browser handles fields with errors by displaying a tooltip with an error message according to the field validation constraints (required or not, format, length...). These error messages are fully customizable with the `setCustomValidity()` method. Messages can then be retrieved with the `validationMessage` input property.

```javascript
const field = document.querySelector('input');

field.setCustomValidity('The value must contain at least one number.');

// 'The value must contain at least one number.'
console.log(field.validationMessage);
```

## A real form example

I made a real world example of a form using the Constraint Validation API. <abbr title="too long; didn’t read">TL;DR</abbr>: see [the demo](https://constraint-validation-api.netlify.app/) and [the code](https://github.com/bellangerq/constraint-validation-api).

The HTML code is pretty straightforward:

- I created a payment form with 3 fields: "card number", "expiration date" and "security code".
- Each field is validated against 3 rules: format, length and requirement (`pattern`, `maxlength` and `required` attributes). It also has an associated label and error message slot.
- The fields are wrapped inside a `<form>` container which has a submit button at its end.

The JavaScript file defines a main function which takes an form element (can be an `<input>`, `<select>`, `<textarea>`) as a parameter. Depending on the element state (empty, valid or invalid), it:

- Defines a custom validation message (with `setCustomValidity()`).
- Fills the error slot with the message.
- Sets an `aria-describedby` attribute to link the error and the field.

To insure a proper user experience, the validation is triggered once the user clicks the submit button or on every field's `change` event. As the native validation tooltip is only showing up on form submission, it is safe to also trigger validation on `input` event.

⚠️ The `submit` event can not be used here because it is only called when all fields are valid.

## Can we safely rely on this?

The browser support is really good: all modern browsers and Internet Explorer supports the Constraint Validation API (see on [Can I Use](https://caniuse.com/#feat=constraint-validation)).

The experience is optimized (error messages set with `setCustomValidity()` are correctly announced when focusing a field) on some screen readers / browsers combinations. Here is my tests suite:

- VoiceOver + Safari: ✅
- VoiceOver + Chrome: ✅
- VoiceOver + Firefox: ❌
- NVDA + Firefox: ✅
- NVDA + Chrome: ✅
- Talkback: ✅

As a security net, I added a visually hidden error message near each input which is filled when the field is invalid. The field's input is then properly described with the error message (`aria-describedby` attribute).

So my answer is: **yes**, it is safe to use it. Thanks for reading!
