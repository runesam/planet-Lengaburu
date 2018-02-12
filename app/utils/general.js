module.exports = {
	scrollDown: () => {
		const target = document.getElementsByTagName('body')[0].scrollHeight;
		window.scrollBy({
			top: target,
			left: 0,
			behavior: 'smooth',
		});
	},
	toCamelCase: str => str.split(' ').map((word, index) => {
		if (index === 0) {
			return word.toLowerCase();
		}
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}).join(''),
	getData: async (uri, data) => {
		const URL = `https://findfalcone.herokuapp.com/${uri}`;
		try {
			const promise = await fetch(URL, data || null);
			return await promise.json();
		} catch (reason) {
			return reason;
		}
	},
	postData: async (uri, data) => {
		const URL = `https://findfalcone.herokuapp.com/${uri}`;
		try {
			const promise = await fetch(URL, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			return await promise.json();
		} catch (reason) {
			return reason;
		}
	},
};
