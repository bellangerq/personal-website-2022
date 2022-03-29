import { TwitterApi } from 'twitter-api-v2';
import fetch from 'node-fetch';

const TWITTER_HANDLE = 'bellanger_q';
const client = new TwitterApi({
	appKey: process.env.TWITTER_CONSUMER_KEY,
	appSecret: process.env.TWITTER_CONSUMER_SECRET,
	accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
	accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

/**
 * Retrieve latest published blog post.
 */
async function getLatestPost() {
	const response = await fetch(`${process.env.URL}/api/posts.json`);
	const { posts } = await response.json();

	return posts[0];
}

/**
 * Search for tweets containing post URL.
 * If none is found, publish a new tweet.
 * @param {object} post
 */
async function handlePost(post) {
	const res = await client.v2.search(`from:${TWITTER_HANDLE}"${buildPostUrl(post.slug)}"`);

	if (res.meta.result_count === 0) {
		return sendTweet(post);
	} else {
		return statusCode(400, '⚠️ The latest blog post has already been syndicated on Twitter.');
	}
}

/**
 * Make a post request to publish a new tweet.
 * @param {object} post Blog post
 */
async function sendTweet(post) {
	const tweetContent = `📢 Nouvel article : "${post.title}"\n\n${buildPostUrl(post.slug)}`;

	try {
		await client.v2.tweet(tweetContent);

		return statusCode(200, '✅ The latest blog post has successfully been tweeted.');
	} catch (err) {
		throw new Error(err);
	}
}

/**
 * Build the full URL of a blog post
 * @param {string} slug Blog post slug
 */
function buildPostUrl(slug) {
	return `${process.env.BASE_URL}/blog/${slug}`;
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
 * Netlify lambda handler
 */
exports.handler = async () => {
	return getLatestPost()
		.then(handlePost)
		.catch((error) => {
			return statusCode(400, `❌ Error while tweeting latest blog post: "${error}"`);
		});
};
