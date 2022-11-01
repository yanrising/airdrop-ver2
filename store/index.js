import Vue from 'vue';
import Vuex from 'vuex';
import {
	toggleSearchHeader,
	toggleMenu,
	lockMenu,
	searchChange,
} from './mutation-types';

import Auth from './modules/auth';

Vue.use(Vuex);

export const state = () => ({
	querySearch: '',
	isShowSearchHeader: true,
	isShowLeftMenu: false,
	isLockedLeftMenu: false,
});

export const mutations = {
	[toggleSearchHeader](state, value) {
		state.isShowSearchHeader = value;
	},
	[toggleMenu](state, value) {
		state.isShowLeftMenu = value;
	},
	[lockMenu](state, value) {
		state.isLockedLeftMenu = value;
	},
	[searchChange](state, value) {
		state.querySearch = value;
	},
};

export const modules = {
	Auth
};

export const actions = {};

export const getters = {};
