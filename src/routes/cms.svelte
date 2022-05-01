<script context="module">
	export const prerender = true;
</script>

<script>
	import PageHead from '../components/page-head.svelte';

	const maxLength = 230;
	let description = '';
	$: remainingChar = maxLength - description.length;
</script>

<PageHead
	title="Publier une nouvelle photo - Quentin Bellanger"
	description="Publier une nouvelle photo qui sera disponible sur la page des photos. Et peut-être sur les réseaux."
/>

<h1>Publier une nouvelle photo</h1>

<form
	class="form"
	name="photo"
	method="post"
	enctype="multipart/form-data"
	netlify
	netlify-honeypot="bot-field"
>
	<input type="hidden" name="form-name" value="photo" />
	<input class="spam-field visually-hidden" name="bot-field" />

	<div class="field">
		<label for="image">
			Image
			<small class="hint">Idéalement une image carrée ou au format paysage.</small>
		</label>
		<input class="image-field" required accept="image/*" type="file" id="image" name="image" />
	</div>

	<fieldset>
		<legend>Langue</legend>
		<small class="hint">Idéalement une image carrée ou au format paysage.</small>
		<div class="subfield">
			<input type="radio" id="lang-fr" name="lang" value="fr" checked />
			<label for="lang-fr"> Français </label>
		</div>

		<div class="subfield">
			<input type="radio" id="lang-en" name="lang" value="en" />
			<label for="lang-en">Anglais</label>
		</div>
	</fieldset>

	<div class="field">
		<label for="description">
			Description
			<small class="hint">{remainingChar} caractères restant.</small>
		</label>
		<textarea bind:value={description} required id="description" name="description" rows="5" />
	</div>

	<div class="field">
		<label for="alt">Text alternatif</label>
		<textarea required id="alt" name="alt" rows="5" />
	</div>

	<div class="subfield">
		<input type="checkbox" id="syndicate" name="syndicate" checked />
		<label for="syndicate">Syndiquer</label>
	</div>

	<div class="field">
		<label for="password">Mot de passe</label>
		<input class="password-field" required type="password" id="password" name="password" />
	</div>

	<button class="submit" type="submit">Envoyer</button>
</form>

<style lang="scss">
	.form {
		display: grid;
		gap: 1rem;
		max-width: toRem(600);
	}

	.image-field,
	.password-field {
		width: min(100%, toRem(300));
	}

	.spam-field {
		visibility: hidden;
	}
</style>
