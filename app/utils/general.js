module.exports = {
	scrollDown: () => {
		const target = document.getElementsByTagName('body')[0].scrollHeight;
		window.scrollBy({
			top: target,
			left: 0,
			behavior: 'smooth',
		});
	},
	updateArray: (arr) => {
		const temp = arr.slice();
		if (arr.length === 5) {
			temp.splice(arr.length - 2, 1);
		}
		return temp;
	},
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
