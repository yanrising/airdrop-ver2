export const toggleSearchHeader = 'toggleSearchHeader';
export const toggleMenu = 'toggleMenu';
export const lockMenu = 'lockMenu';
export const searchChange = 'searchChange';

const mutations = {
	auth: {
		setAuthentication: 'setAuthentication',
		setAuthoriser: 'setAuthoriser',
		clearAuthoriser: 'clearAuthoriser',
	},
};

export const getTypes = (name) => {
	return mutations[name];
};
