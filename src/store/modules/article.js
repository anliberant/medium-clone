import articleApi from './../../api/article';

const state = {
	data: null,
	isLoading: false,
	error: null,
};

export const mutationsTypes = {
	getArticleStart: '[artile] getArticleStart',
	getArticleSuccess: '[artile] getArticleSuccess',
	getArticleFailure: '[artile] getArticleFailure',

	deleteArticleStart: '[artile] deleteArticleStart',
	deleteArticleSuccess: '[artile] deleteArticleSuccess',
	deleteArticleFailure: '[artile] deleteArticleFailure',
};
export const actionTypes = {
	getArticle: '[artile] getArticle',
	deleteArticle: '[artile] deleteArticle',
};

const mutations = {
	[mutationsTypes.getArticleStart](state) {
		state.isLoading = true;
		state.data = null;
	},
	[mutationsTypes.getArticleSuccess](state, payload) {
		state.isLoading = false;
		state.data = payload;
	},
	[mutationsTypes.getArticleFailure](state) {
		state.isLoading = false;
	},
	[mutationsTypes.deleteArticleStart]() {},
	[mutationsTypes.deleteArticleSuccess]() {},
	[mutationsTypes.deleteArticleFailure]() {},
};
const actions = {
	[actionTypes.getArticle](context, { slug }) {
		return new Promise((resolve) => {
			context.commit(mutationsTypes.getArticleStart, slug);
			articleApi
				.getArticle(slug)
				.then((article) => {
					context.commit(mutationsTypes.getArticleSuccess, article);
					resolve(article);
				})
				.catch(() => {
					context.commit(mutationsTypes.getArticleFailure);
				});
		});
	},
	[actionTypes.deleteArticle](context, { slug }) {
		return new Promise((resolve) => {
			context.commit(mutationsTypes.deleteArticleStart, slug);
			articleApi
				.deleteArticle(slug)
				.then(() => {
					context.commit(mutationsTypes.deleteArticleSuccess);
					resolve();
				})
				.catch(() => {
					context.commit(mutationsTypes.deleteArticleFailure);
				});
		});
	},
};

export default {
	state,
	actions,
	mutations,
};
