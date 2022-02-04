import { createRouter, createWebHistory } from 'vue-router';
import AppGlobalFeed from '../views/GlobalFeed.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import AppYourFeed from '../views/YourFeed.vue';
import AppTagFeed from '../views/TagFeed.vue';
import AppArticle from '../views/Article.vue';
import AppCreateArticle from '../views/CreateArticle.vue';
import AppEditArticle from '../views/EditArticle.vue';
import AppSettings from '../views/Settings.vue';
import AppUserProfile from '../views/UserProfile.vue';

const routes = [
	{
		path: '/register',
		name: 'register',
		component: Register,
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
	},
	{
		path: '/',
		name: 'globalFeed',
		component: AppGlobalFeed,
	},
	{
		path: '/feed',
		name: 'yourFeed',
		component: AppYourFeed,
	},
	{
		path: '/tags/:slug',
		name: 'tag',
		component: AppTagFeed,
	},
	{
		path: '/articles/new',
		name: 'createArticle',
		component: AppCreateArticle,
	},
	{
		path: '/article/:slug',
		name: 'article',
		component: AppArticle,
	},
	{
		path: '/articles/:slug/edit',
		name: 'editArticle',
		component: AppEditArticle,
	},
	{
		path: '/settings',
		name: 'settings',
		component: AppSettings,
	},
	{
		path: '/profiles/:slug',
		name: 'userProfile',
		component: AppUserProfile,
	},
	{
		path: '/profiles/:slug/favorites',
		name: 'userProfileFavorites',
		component: AppUserProfile,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
