import userProfileApi from '../../api/userProfile';

const state = {
	data: null,
	isLoading: false,
	error: null,
};

export const mutationsTypes = {
	getUserProfileStart: '[userProfile] getUserProfileStart',
	getUserProfileSuccess: '[userProfile] getUserProfileSuccess',
	getUserProfileFailure: '[userProfile] getUserProfileFailure',
};
export const actionTypes = {
	getUserProfile: '[userProfile] getUserProfile',
};

const mutations = {
	[mutationsTypes.getUserProfileStart](state) {
		state.isLoading = true;
		state.data = null;
	},
	[mutationsTypes.getUserProfileSuccess](state, payload) {
		state.isLoading = false;
		state.data = payload;
	},
	[mutationsTypes.getUserProfileFailure](state) {
		state.isLoading = false;
	},
};
const actions = {
	[actionTypes.getUserProfile](context, { slug }) {
		return new Promise((resolve) => {
			context.commit(mutationsTypes.getUserProfileStart);
			userProfileApi
				.getUserProfile(slug)
				.then((userProfile) => {
					context.commit(
						mutationsTypes.getUserProfileSuccess,
						userProfile,
					);
					resolve(userProfile);
				})
				.catch(() => {
					context.commit(mutationsTypes.getUserProfileFailure);
				});
		});
	},
};

export default {
	state,
	actions,
	mutations,
};
