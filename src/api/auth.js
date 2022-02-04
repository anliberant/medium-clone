import axios from './axios';

const register = (credentions) => {
	return axios.post('/users', { user: credentions });
};

const login = (credentions) => {
	return axios.post('/users/login', { user: credentions });
};

const getCurrentUser = () => {
	return axios.get('/user');
};
const updateCurrentUser = (currentUserInput) => {
	return axios
		.put('/user', { user: currentUserInput })
		.then((response) => response.data.user);
};

export default {
	register,
	login,
	getCurrentUser,
	updateCurrentUser,
};
