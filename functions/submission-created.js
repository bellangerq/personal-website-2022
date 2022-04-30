import fetch from 'node-fetch';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
	auth: process.env.GITHUB_ACCESS_TOKEN
});
const GITHUB_USERNAME = 'bellangerq';
const GITHUB_REPOSITORY = 'personal-website-2022';
const GITHUB_BRANCH = 'main';

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
		// Get latest commit SHA
		const commits = await octokit.repos.listCommits({
			owner: GITHUB_USERNAME,
			repo: GITHUB_REPOSITORY,
			per_page: 1,
			sha: GITHUB_BRANCH
		});

		const latestCommitSHA = commits.data[0].sha;

		console.log('[listCommits] OK');

		const {
			data: { sha: imageSHA }
		} = await octokit.rest.git.createBlob({
			owner: GITHUB_USERNAME,
			repo: GITHUB_REPOSITORY,
			content: image,
			encoding: 'base64'
		});

		console.log('[createBlob] OK');

		// Prepare files
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

		// Create tree ready to be committed
		const {
			data: { sha: treeSHA }
		} = await octokit.git.createTree({
			owner: GITHUB_USERNAME,
			repo: GITHUB_REPOSITORY,
			tree: files,
			base_tree: latestCommitSHA
		});

		console.log('[createTree] OK');

		// Create commit with files
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

		// Push content
		const response = await octokit.git.updateRef({
			owner: GITHUB_USERNAME,
			repo: GITHUB_REPOSITORY,
			ref: `heads/${GITHUB_BRANCH}`,
			sha: newCommitSHA
		});

		console.log('[updateRef] OK');
		return statusCode(200, '✅ Photo has been successfully committed.');
	} catch (error) {
		return statusCode(400, `❌ Error while publishing photo: "${error}"`);
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
	const data = JSON.parse(event.body);

	// Verify password
	const password = data.payload.data.password;

	if (password !== process.env.CMS_PASSWORD) {
		return statusCode(400, `❌ Error while publishing photo: wrong password.`);
	}

	// Extract form data
	const { lang, alt, description } = data.payload.data;
	const syndicate = data.payload.data.syndicate === 'on';
	const date = new Date(data.payload.created_at);
	const imageUrl = data.payload.data.image.url;

	const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
		'0' + date.getDate()
	).slice(-2)}`;
	// Pog: https://stackoverflow.com/a/221297
	const timestamp = Math.floor(+date / 1000);

	const slug = `${formattedDate}-${timestamp}`;
	const markdown = `---\nlang: ${lang}\ndate: ${formattedDate}\nalt: ${alt}\nsyndicate: ${syndicate}\n---\n\n${description}`;

	return getImage(imageUrl)
		.then((image) => pushPhotoToGit(slug, image, markdown))
		.catch((error) => {
			return statusCode(400, `❌ Error while publishing photo: "${error}"`);
		});
};
