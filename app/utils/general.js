function scrollDown() {
	const target = document.querySelector('.container').scrollHeight;
	setTimeout(() => document.querySelector('.container').scrollBy({
		top: target,
		left: 0,
		behavior: 'smooth',
	}));
}

function toCamelCase(str) {
	return str.split(' ').map((word, index) => {
		if (index === 0) {
			return word.toLowerCase();
		}
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}).join('');
}

function adjustPlanetsName(planets) {
	return planets.map(planet => Object.assign(planet, {
		key: `${planet.name} (Distance: ${planet.distance})`,
	}));
}

function adjustVehiclesName(vehicles) {
	return vehicles.map(vehicle => Object.assign(vehicle, {
		key: `${vehicle.name} (Max Distance: ${vehicle.max_distance}) (${vehicle.total_no})`,
	}));
}

function getContent(status, images, planetName, totalTimes) {
	return ({
		h4: status === 'success' ? `👏💫⭐ ${status.toUpperCase()} ️⭐️💫👏` : `💥😡㊗️ ${status.toUpperCase()} ️㊗️️😡💥`,
		h5: status === 'success' ? 'congratulations on Finding Falcone. King Chan is mighty pleased' : 'oh ** We couldn\'t find Falcone. King Chan is very mad',
		time: status === 'success' ? `🕔 Taken: ${totalTimes}` : `🕔 Wasted: ${totalTimes}`,
		planet: status === 'success' ? images[toCamelCase(planetName)] : null,
	});
}

async function getData(uri, fetch) {
	const Fetch = fetch || window.fetch;
	const URL = `https://findfalcone.herokuapp.com/${uri}`;
	const promise = await Fetch(URL);
	const json = await promise.json();
	return json;
}

async function postData(uri, data, fetch) {
	const Fetch = fetch || window.fetch;
	const URL = `https://findfalcone.herokuapp.com/${uri}`;
	try {
		const promise = await Fetch(URL, {
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
}

const service = {
	scrollDown,
	toCamelCase,
	adjustPlanetsName,
	adjustVehiclesName,
	getContent,
	getData,
	postData,
};

module.exports = service;
