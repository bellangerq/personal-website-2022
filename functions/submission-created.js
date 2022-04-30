import fetch from 'node-fetch';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
	auth: process.env.GITHUB_ACCESS_TOKEN
});
const GITHUB_USERNAME = 'bellangerq';
const GITHUB_REPOSITORY = 'personal-website-2022';
const GITHUB_BRANCH = 'feat/netlify-cms-photos';

async function getImage(imageUrl) {
	try {
		const response = await fetch(imageUrl);
		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const image = buffer.toString('base64');

		return image;
	} catch (error) {
		return statusCode(400, `❌ Error while fetching photo image: "${error}"`);
	}
}

async function pushPhotoToGit(slug, image, markdown) {
	try {
		// get latest commit from branch
		const commits = await octokit.repos.listCommits({
			owner: GITHUB_USERNAME,
			repo: GITHUB_REPOSITORY,
			per_page: 1,
			sha: GITHUB_BRANCH
		});

		const latestCommitSHA = commits.data[0].sha;

		console.log('[listCommits] OK');

		console.log('image');
		console.log(image);
		console.log('image');

		const {
			data: { sha: imageSHA }
		} = await octokit.rest.git.createBlob({
			owner: GITHUB_USERNAME,
			repo: GITHUB_REPOSITORY,
			content: image,
			encoding: 'base64'
		});

		console.log('[createBlob] OK');

		// set files to add
		const files = [
			{
				mode: '100644',
				path: `src/content/photos/${slug}.md`,
				content: markdown
			},
			{
				mode: '100644',
				path: `static/photos/${slug}.jpg`,
				sha: imageSHA,
				type: 'blob'
			}
		];

		// create tree
		const {
			data: { sha: treeSHA }
		} = await octokit.git.createTree({
			owner: GITHUB_USERNAME,
			repo: GITHUB_REPOSITORY,
			tree: files,
			base_tree: latestCommitSHA
		});

		console.log('[createTree] OK');

		// create commit
		const {
			data: { sha: newCommitSHA }
		} = await octokit.git.createCommit({
			owner: GITHUB_USERNAME,
			repo: GITHUB_REPOSITORY,
			tree: treeSHA,
			message: `Add new photo: ${slug}`,
			parents: [latestCommitSHA]
		});

		console.log('[createCommit] OK');

		// push content (git push)
		const response = await octokit.git.updateRef({
			owner: GITHUB_USERNAME,
			repo: GITHUB_REPOSITORY,
			ref: `heads/${GITHUB_BRANCH}`,
			sha: newCommitSHA
		});

		console.log('[updateRef] OK');
		return statusCode(200, '✅ Photo has been successfully committed.');
	} catch (error) {
		return statusCode(400, `❌ Error while committing photo: "${error}"`);
	}
}

/**
 * Log and return
 * @param {number} code http status code
 * @param {string} message
 * @returns
 */
function statusCode(code, message) {
	console.log(message);

	return {
		statusCode: code,
		body: message
	};
}

exports.handler = async (event, context) => {
	console.log(event);
	console.log('---------');

	// Extract form data
	const data = JSON.parse(event.body);

	// use fake data for dev
	// const lang = 'fr';
	// const alt = 'pouet';
	// const syndicate = 'true';
	// const description = 'Une description chouette.';
	// const date = new Date('2022-04-29T19:04:20.113Z');
	// const imageUrl = 'https://quentin-bellanger.com/photos/2018-11-17-1542477368.jpg';

	// if (process.env.NODE_ENV === 'production') {
	const lang = data.payload.data.lang;
	const alt = data.payload.data.alt;
	const syndicate = data.payload.data.syndicate;
	const description = data.payload.data.description;
	const date = new Date(data.payload.created_at);
	const imageUrl = data.payload.data.image.url;
	// }

	const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
		'0' + date.getDate()
	).slice(-2)}`;
	// Pog: https://stackoverflow.com/a/221297
	const timestamp = Math.floor(+date / 1000);

	// Create Markdown file
	const slug = `${formattedDate}-${timestamp}`;
	const markdown = `---\nlang: ${lang}\ndate: ${formattedDate}\nalt: ${alt}\nsyndicate: ${syndicate}\n---\n\n${description}`;

	return getImage(imageUrl)
		.then((image) => pushPhotoToGit(slug, image, markdown))
		.catch((error) => {
			return statusCode(400, `❌ Error while committing latest photo: "${error}"`);
		});
};
