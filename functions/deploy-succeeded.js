import { TwitterApi, EUploadMimeType } from 'twitter-api-v2';
import fetch from 'node-fetch';

const TWITTER_HANDLE = 'bellanger_q';
const client = new TwitterApi({
	appKey: process.env.TWITTER_CONSUMER_KEY,
	appSecret: process.env.TWITTER_CONSUMER_SECRET,
	accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
	accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

/**
 * Retrieve latest published resource.
 */
async function getLatestResource() {
	const postsResponse = await fetch(`${process.env.URL}/api/posts.json`);
	const { posts } = await postsResponse.json();

	const photosResponse = await fetch(`${process.env.URL}/api/photos.json`);
	const { photos } = await photosResponse.json();

	const resources = [
		...posts.filter((post) => post.syndicate).map((post) => ({ ...post, type: 'post' })),
		...photos.filter((photo) => photo.syndicate).map((photo) => ({ ...photo, type: 'photo' }))
	].sort((a, b) => new Date(b.date) - new Date(a.date));

	return resources[0];
}

/**
 * Search for tweets containing resource URL.
 * If none is found, publish a new tweet.
 * @param {object} resource
 */
async function handleResource(resource) {
	if (!resource) {
		return statusCode(400, '⚠️ Nothing to tweet.');
	}
	const searchRequest = `from:${TWITTER_HANDLE}"${buildResourceUrl(resource)}"`;
	const res = await client.v2.search(searchRequest);

	if (res.meta.result_count === 0) {
		return sendTweet(resource);
	} else {
		return statusCode(
			400,
			`⚠️ The latest resource has already been syndicated on Twitter: ${getTweetUrl(
				res.data.data[0].id
			)}`
		);
	}
}

/**
 * Make a post request to publish a new tweet.
 * @param {object} resource
 */
async function sendTweet(resource) {
	const payload = {
		text:
			resource.type === 'post'
				? `📢 Nouvel article : "${resource.title}"\n\n${buildResourceUrl(resource)}`
				: `${stripHtml(resource.content)} ${buildResourceUrl(resource)}`
	};

	if (resource.type === 'photo') {
		try {
			const url = `${process.env.BASE_URL}/photos/${resource.slug}.jpg`;
			const response = await fetch(url);
			const arrayBuffer = await response.arrayBuffer();
			const mediaId = await client.v1.uploadMedia(Buffer.from(arrayBuffer), {
				mimeType: EUploadMimeType.Jpeg
			});

			await client.v1.createMediaMetadata(mediaId, {
				alt_text: { text: resource.alt }
			});

			payload.media = {
				media_ids: [mediaId]
			};
		} catch (error) {
			console.log(error);
			return statusCode(400, `❌ Error while uploading media to Twitter: ${error}`);
		}
	}

	try {
		const tweet = await client.v2.tweet(payload);

		return statusCode(
			200,
			`✅ The latest ${resource.type} has successfully been tweeted: ${getTweetUrl(tweet.data.id)}`
		);
	} catch (err) {
		console.log(err);
		return statusCode(400, `❌ Error while sending tweet: ${err}`);
	}
}

/**
 * Build the full URL of a blog post
 * @param {string} slug Blog post slug
 */
function buildResourceUrl(resource) {
	return `${process.env.BASE_URL}/${resource.type === 'post' ? 'blog' : 'photos'}/${resource.slug
		}/`;
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

/**
 * Remove HTML tags from a string
 * @param {string} string
 * @returns string
 */
function stripHtml(string) {
	return string.trim().replace(/<[^>]+>/g, '');
}

/**
 * Return the URL of a tweet with its id
 * @param {string} tweetId
 */
function getTweetUrl(tweetId) {
	return `https://twitter.com/${TWITTER_HANDLE}/status/${tweetId}`;
}

/**
 * Netlify lambda handler
 */
exports.handler = async () => {
	console.log(process.env);
	// TODO: handle deploy preview branches
	// if (process.env.CONTEXT !== 'production') {
	// 	return statusCode(400, '⚠️ Not on main branch, abort.');
	// }
	return getLatestResource()
		.then(handleResource)
		.catch((error) => {
			return statusCode(400, `❌ Error while tweeting latest resource: "${error}"`);
		});
};
