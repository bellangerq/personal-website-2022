import { variables } from '$lib/variables';

export const get = async () => {
	const res = await fetch(`${variables.baseUrl}/api/posts.json`);
	const data = await res.json();

	const body = render(data.posts);
	const headers = {
		'Cache-Control': `max-age=0, max-age=0, must-revalidate`,
		'Content-Type': 'application/xml'
	};

	return {
		body,
		headers
	};
};

const render = (posts) => `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>Quentin Bellanger</title>
	<subtitle>J'écris sur le développement web, l'accessibilité numérique et de manière plus générale sur le web.</subtitle>
	<link href="${variables.baseUrl}/feed.xml" rel="self" type="application/atom+xml" />
	<link href="${variables.baseUrl}" rel="alternate" type="text/html" />

	${posts
		.map(
			(post) => `<item>
				<title>${post.title}</title>
				<link href="${variables.baseUrl}/blog/${post.slug}" />
				<description>${post.description}</description>
				<updated>${new Date(post.date)}</updated>
				<id>${variables.baseUrl}/blog/${post.slug}</id>
			</item>`
		)
		.join('')}
</feed>
`;
