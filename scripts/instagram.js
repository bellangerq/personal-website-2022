/**
 * The goal of this script is to move all my Instagram
 * content to my site from the exported data. #OwnYourContent
 * TODO:
 * 	- Filter photos
 * 	- Design index page
 * 	- Design [id] page
 * 	- Run script on sample
 * 	- Run final script
 * 	- Clean and push on GitHub
 * 	- Plug to Twitter
 */
import fs from 'fs';

const raw = fs.readFileSync('./instagram_data/posts_1.json');
// const photos = JSON.parse(raw);
const photos = JSON.parse(raw).slice(340, 350);

function run() {
	photos.forEach((photo) => {
		// Create slug
		const fileSlug = generatePhotoSlug(photo.media[0].creation_timestamp);
		const metaDate = generatePhotoSlug(photo.media[0].creation_timestamp, true);

		// Create Markdown file
		fs.writeFile(
			`./src/content/photos/${fileSlug}.md`,
			`---\nlang: fr\ndate: ${metaDate}\n---\n\n![](/photos/${fileSlug}.jpg)\n\n${photo.media[0].title}`,
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
