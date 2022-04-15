/**
 * The goal of this script is to move all my Instagram
 * content to my site from the exported data. #OwnYourContent
 */
import fs from 'fs';

const raw = fs.readFileSync('./instagram_data/posts_1.json');
const photos = JSON.parse(raw);

function run() {
	photos.forEach((photo) => {
		// Check if photo exists
		fs.access(`./instagram_data/${photo.media[0].uri}`, fs.F_OK, (err) => {
			if (err) {
				console.log('File does not exist. Skipping: ' + photo.media[0].uri + '.');
				return;
			}

			console.log('File exists. Continue.');

			// Create slug
			const fileSlug = generatePhotoSlug(photo.media[0].creation_timestamp);
			const date = generatePhotoSlug(photo.media[0].creation_timestamp, true);
			const title = unicodeToChar(photo.media[0].title);

			// Create Markdown file
			fs.writeFile(
				`./src/content/photos/${fileSlug}.md`,
				`---\nlang: fr\ndate: ${date}\nalt: ''\n---\n\n${title}\n\n![](/photos/${fileSlug}.jpg)`,
				(err) => {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

			// Move image file to /assets
			fs.copyFile(
				`./instagram_data/${photo.media[0].uri}`,
				`./static/photos/${fileSlug}.jpg`,
				(err) => {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

			console.log(`Photo "${fileSlug}" done!`);
		});
	});
}

run();

// UTILS
function generatePhotoSlug(timestamp, dateOnly = false) {
	const date = new Date(timestamp * 1000);
	const y = date.getFullYear();
	const m = ('0' + (date.getMonth() + 1)).slice(-2);
	const d = ('0' + date.getDate()).slice(-2);
	return dateOnly ? `${y}-${m}-${d}` : `${y}-${m}-${d}-${timestamp}`;
}

/**
 * Convert unicode characters in string
 * Source: https://stackoverflow.com/a/68237082
 */
function unicodeToChar(s) {
	let d = new TextDecoder();
	let a = s.split('').map((r) => r.charCodeAt());
	return d.decode(new Uint8Array(a));
}
