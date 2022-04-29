<script context="module">
	export const prerender = true;
</script>

<h1>Créer une nouvelle photo</h1>

<form name="photo" method="post" enctype="multipart-form/data" netlify>
	<input type="hidden" name="form-name" value="photo" />

	<label for="alt" name="alt">Text alternatif</label>
	<input style="background: lightgray; color: black;" type="text" id="alt" name="alt" />

	<label for="image">Image</label>
	<input type="file" id="image" name="image" />

	<button type="submit">Envoyer</button>
</form>
