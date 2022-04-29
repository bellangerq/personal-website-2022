import fs from 'fs';
import fetch from 'node-fetch';
// const body = {
// 	payload: {
// 		number: 3,
// 		title: '2 un paquet de chips poulet braisé',
// 		email: null,
// 		name: null,
// 		first_name: null,
// 		last_name: null,
// 		company: null,
// 		summary: '\\u003cstrong\\u003e2 un paquet de chips poulet braisé\\u003c/strong\\u003e ',
// 		body: null,
// 		data: {
// 			alt: '2 un paquet de chips poulet braisé',
// 			image: null,
// 			ip: '2001:861:41c2:7620:8086:16da:7f2a:65c2',
// 			user_agent:
// 				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0',
// 			referrer: 'https://deploy-preview-4--quentin-bellanger.netlify.app/cms/'
// 		},
// 		created_at: '2022-04-29T19:04:20.113Z',
// 		human_fields: { 'Text alternatif': '2 un paquet de chips poulet braisé', Image: '' },
// 		ordered_human_fields: [
// 			{ title: 'Text alternatif', name: 'alt', value: '2 un paquet de chips poulet braisé' },
// 			{ title: 'Image', name: 'image', value: '' }
// 		],
// 		id: '626c36b4c652e10059581d19',
// 		form_id: '626c34a97d3457000814b036',
// 		site_url: 'https://quentin-bellanger.com',
// 		form_name: 'photo'
// 	},

// {
//   filename: '[removal.ai]_tmp-62665971c1bee.png',
//   type: 'file',
//   size: 58350,
//   url: 'https://d33wubrfki0l68.cloudfront.net/69780775-db5b-4ed9-b887-73492899468a/%5Bremoval.ai%5D_tmp-62665971c1bee.png'
// }

exports.handler = async (event, context) => {
	console.log(event);
	console.log('---------');

	// Extract form data
	const data = JSON.parse(event.body);
	const { lang, description, alt, syndicate } = data.payload.data;

	const date = new Date(data.created_at);
	// const date s= new Date('2022-04-29T19:04:20.113Z');
	const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
		'0' + date.getDate()
	).slice(-2)}`;
	// Pog: https://stackoverflow.com/a/221297
	const timestamp = Math.floor(+date / 1000);

	// Create Markdown file
	const slug = `${formattedDate}-${timestamp}`;
	const markdown = `---\nlang: ${lang}\ndate: ${date}\nsyndicate: ${alt}\nsyndicate: ${syndicate}\n---\n\n${description}`;
	// const markdown = `---\nlang: ${'fr'}\ndate: ${formattedDate}\nalt: ${'pouet'}\nsyndicate: ${true}\n---\n\n${'frheh, rnrnreoneor eroeigoe'}`;

	fs.writeFile(`src/content/photos/${slug}.md`, markdown, (err) => {
		if (err) {
			return {
				statusCode: 400,
				body: `❌ Error while creating Markdown file: "${error}"`
			};
		}
		console.log('Markdown file successfully created.');
	});

	try {
		const file = fs.createWriteStream(`static/photos/${slug}.jpg`);
		const url = data.payload.data.image.url;
		// const url =
		// 	'https://d33wubrfki0l68.cloudfront.net/69780775-db5b-4ed9-b887-73492899468a/%5Bremoval.ai%5D_tmp-62665971c1bee.png';
		const response = await fetch(url);
		response.body.pipe(file);
		console.log('Image file successfully created.');
	} catch (error) {
		return {
			statusCode: 400,
			body: `❌ Error while creating image file: "${error}"`
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify({
			pouet: 'pouet'
		})
	};
};
