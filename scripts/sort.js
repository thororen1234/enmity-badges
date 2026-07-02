const fs = require('fs');

const users = fs.readdirSync('.').filter(e => e.endsWith('.json'));
const order = ['dev', 'staff', 'contributor', 'supporter'];

for (const user of users) {
	const content = fs.readFileSync(user, 'utf-8');
	const badges = JSON.parse(content);

	const sorted = badges.sort((a, b) => {
		if (/\d/.test(a)) {
			return 1;
		} else if (/\d/.test(b)) {
			return -1;
		}

		return order.indexOf(a) - order.indexOf(b);
	});

	fs.writeFileSync(user, stringify(sorted), 'utf-8');
	console.log(`Sorted ${user}`);
}

function stringify(obj) {
	let result = JSON.stringify(obj, null, 2);

	result = result.replace(/^ +/gm, ' ');
	result = result.replace(/\n/g, '');
	result = result.replace(/{ /g, '{').replace(/ }/g, '}');
	result = result.replace(/\[ /g, '[').replace(/ \]/g, ']');

	return result;
}