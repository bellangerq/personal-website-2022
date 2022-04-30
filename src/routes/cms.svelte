<script context="module">
	export const prerender = true;
</script>

<h1>Créer une nouvelle photo</h1>

<form name="photo" method="post" enctype="multipart/form-data" netlify>
	<input type="hidden" name="form-name" value="photo" />

	<fieldset>
		<legend>Langue</legend>
		<label for="lang-fr">Français</label>
		<input type="radio" id="lang-fr" name="lang" value="fr" checked />

		<label for="lang-en">Anglais</label>
		<input type="radio" id="lang-en" name="lang" value="en" />
	</fieldset>

	<label for="description">Description</label>
	<textarea id="description" name="description" />

	<label for="image">Image</label>
	<input type="file" id="image" name="image" />

	<label for="alt">Text alternatif</label>
	<input type="text" id="alt" name="alt" />

	<label for="syndicate">Syndiquer</label>
	<input type="checkbox" id="syndicate" name="syndicate" checked />

	<label for="password">Mot de passe</label>
	<input type="password" id="password" name="password" />

	<button type="submit">Envoyer</button>
</form>
