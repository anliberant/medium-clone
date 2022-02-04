export const getItem = (key) => {
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (err) {
		console.log('Error getting item from localStorage', err);
		return null;
	}
};

export const setItem = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (err) {
		console.log('Error setting item to localStorage', err);
	}
};
