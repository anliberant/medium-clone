import popularTagsApi from './../../api/popularTags';

const state = {
	data: null,
	isLoading: false,
	error: null,
};

export const mutationsTypes = {
	getPopularTagsStart: '[popularTags] getPopularTagsStart',
	getPopularTagsSuccess: '[popularTags] getPopularTagsSuccess',
	getPopularTagsFailure: '[popularTags] getPopularTagsFailure',
};
export const actionTypes = {
	getPopularTags: '[popularTags] getPopularTags',
};

const mutations = {
	[mutationsTypes.getPopularTagsStart](state) {
		state.isLoading = true;
		state.data = null;
	},
	[mutationsTypes.getPopularTagsSuccess](state, payload) {
		state.isLoading = false;
		state.data = payload;
	},
	[mutationsTypes.getPopularTagsFailure](state) {
		state.isLoading = false;
	},
};
const actions = {
	[actionTypes.getPopularTags](context) {
		return new Promise((resolve) => {
			context.commit(mutationsTypes.getPopularTagsStart);
			popularTagsApi
				.getPopularTags()
				.then((tags) => {
					const newTags = tags.filter((tag) => tag);
					context.commit(
						mutationsTypes.getPopularTagsSuccess,
						newTags,
					);
					resolve(newTags);
				})
				.catch(() => {
					context.commit(mutationsTypes.getPopularTagsFailure);
				});
		});
	},
};

export default {
	state,
	actions,
	mutations,
};
