import fs from 'fs';
import fetch from 'node-fetch';
import { Octokit } from '@octokit/rest';
import { Base64 } from 'js-base64';

const octokit = new Octokit({
	auth: process.env.GITHUB_ACCESS_TOKEN
});
const GITHUB_USERNAME = 'bellangerq';
const GITHUB_REPOSITORY = 'personal-website-2022';
const GITHUB_BRANCH = 'feat/netlify-cms-photos';

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

		console.log(image);

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
	} catch (error) {
		throw new Error(error);
	}
}

exports.handler = async (event, context) => {
	console.log(event);
	console.log('---------');

	// Extract form data
	const data = JSON.parse(event.body);
	let lang = 'fr';
	let alt = 'pouet';
	let syndicate = 'true';
	let description = 'Une description chouette.';
	let date = new Date('2022-04-29T19:04:20.113Z');
	let imageUrl = 'https://quentin-bellanger.com/photos/2018-11-17-1542477368.jpg';

	if (process.env.NODE_ENV === 'production') {
		lang = data.payload.lang;
		alt = data.payload.alt;
		syndicate = data.payload.syndicate;
		description = data.payload.description;
		date = new Date(data.payload.created_at);
		imageUrl = data.payload.data.image.url;
	}

	const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
		'0' + date.getDate()
	).slice(-2)}`;
	// Pog: https://stackoverflow.com/a/221297
	const timestamp = Math.floor(+date / 1000);

	// Create Markdown file
	const slug = `${formattedDate}-${timestamp}`;
	const markdown = `---\nlang: ${lang}\ndate: ${formattedDate}\nalt: ${alt}\nsyndicate: ${syndicate}\n---\n\n${description}`;

	// fs.writeFile(`src/content/photos/${slug}.md`, markdown, (error) => {
	// 	if (error) {
	// 		return {
	// 			statusCode: 400,
	// 			body: `❌ Error while creating Markdown file: "${error}"`
	// 		};
	// 	}
	// 	console.log('Markdown file successfully created.');
	// });

	// try {
	// 	const response = await fetch(imageUrl);
	// 	const arrayBuffer = await response.arrayBuffer();
	// 	fs.writeFile(`static/photos/${slug}.jpg`, Buffer.from(arrayBuffer), (error) => {
	// 		if (error) {
	// 			console.log('writeFile error: ', error);
	// 		}
	// 	});
	// 	console.log('Image file successfully created.');
	// } catch (error) {
	// 	return {
	// 		statusCode: 400,
	// 		body: `❌ Error while creating image file: "${error}"`
	// 	};
	// }

	// try {
	// 	await octokit.repos.createOrUpdateFileContents({
	// 		owner: 'bellangerq',
	// 		repo: 'personal-website-2022',
	// 		path: 'src/content/photos/test.md',
	// 		message: `(2) New photo: ${slug}`,
	// 		branch: 'feat/netlify-cms-photos',
	// 		content: Base64.encode('pouet pouet')
	// 	});

	// 	console.log('Successfully commited!');

	// 	return {
	// 		statusCode: 200,
	// 		body: 'Successfully commited!'
	// 	};
	// } catch (error) {
	// 	console.log('Error while committing: ', error);

	// 	return {
	// 		statusCode: 400,
	// 		body: 'Error while commiting:' + error
	// 	};
	// }

	const response = await fetch(imageUrl);
	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const image = buffer.toString('base64');

	console.log(image);

	await pushPhotoToGit(slug, image, markdown);

	return {
		statusCode: 200,
		body: JSON.stringify({
			pouet: 'pouet'
		})
	};
};
