const CONFIG = {
	ROLE: {
		SUPERADMIN: 'superadmin',
		ADMIN: 'admin',
		TRAINER: 'trainer',
	},
	WS_EVENT: {
		ORDER_CREATED: 'order.created',
	},
	SEVER_CODE: {
		ERROR: 'error',
	},
	ROLE_PERMISSION: {
		ADMIN: 'admin',
		PERMISSION: 'permission',
		USER: 'user',
		EMAIL: 'email',
		SETTING: 'config',
		LOCALIZATION: 'localization',
		BANNER: 'banner',
		COMPETITION: 'competition',
		INVOICE: 'invoice',
		ARTICLE: 'article',
		CONTACTUS: 'contactus',
	},
};

class Enum {
	static ROLE() {
		return CONFIG.ROLE;
	}

	static WS_EVENT() {
		return CONFIG.WS_EVENT;
	}

	static SEVER_CODE() {
		return CONFIG.SEVER_CODE;
	}

	static ROLE_PERMISSION() {
		return CONFIG.ROLE_PERMISSION;
	}
}

export default Enum;
