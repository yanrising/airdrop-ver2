import AccessControl from 'accesscontrol';
import { isEmpty, isEqual, cloneDeep, includes } from 'lodash';

import Enum from '~/helpers/enum';
const ROLE_PERMISSION = Enum.ROLE_PERMISSION();

const defineModules = [
	{
		name: ROLE_PERMISSION.ADMIN,
		create: false,
		read: false,
		update: false,
		delete: false,
		blockouts: {},
	},
	{
		name: ROLE_PERMISSION.PERMISSION,
		create: false,
		read: false,
		update: false,
		delete: false,
		blockouts: {},
	},
	{
		name: ROLE_PERMISSION.USER,
		create: false,
		read: false,
		update: false,
		delete: false,
		blockouts: {},
	},
	{
		name: ROLE_PERMISSION.EMAIL,
		create: false,
		read: false,
		update: false,
		delete: false,
		blockouts: {},
	},
	{
		name: ROLE_PERMISSION.LOCALIZATION,
		create: false,
		read: false,
		update: false,
		delete: false,
		blockouts: {},
	},
	{
		name: ROLE_PERMISSION.SETTING,
		create: false,
		read: false,
		update: false,
		delete: false,
		blockouts: { delete: true },
	},
	{
		name: ROLE_PERMISSION.BRAND,
		create: false,
		read: false,
		update: false,
		delete: false,
		blockouts: {},
	},
	{
		name: ROLE_PERMISSION.BANNER,
		create: false,
		read: false,
		update: false,
		delete: false,
		blockouts: {},
	},
	{
		name: ROLE_PERMISSION.ARTICLE,
		create: false,
		read: false,
		update: false,
		delete: false,
		blockouts: {},
	},
	{
		name: ROLE_PERMISSION.CONTACTUS,
		create: false,
		read: false,
		update: false,
		delete: false,
		blockouts: {
			create: true,
			update: true,
			delete: true,
		},
	},
];

export const getAclModules = () => {
	return defineModules;
};

export const getAclGrantsObject = (role, modules) => {
	const grantsObject = {
		name: role,
		data: {},
	};
	const roleObject = {};

	for (let i = 0; i < modules.length; i++) {
		const moduleObject = {};

		Object.keys(modules[i]).forEach((o) => {
			if (includes(['create', 'read', 'update', 'delete'], o)) {
				if (modules[i][o]) {
					moduleObject[`${o}:any`] = ['*'];
				}
			}
		});

		if (!isEmpty(moduleObject)) {
			roleObject[modules[i].name] = cloneDeep(moduleObject);
		}
	}
	grantsObject.data[role] = roleObject;

	return grantsObject;
};

export const parseAclModules = (roleObject) => {
	if (typeof roleObject == 'undefined') return [];

	let modules = [];

	Object.keys(roleObject).forEach((o) => {
		const defineModule = defineModules.find((m) => m.name === o);
		const moduleObject = {
			name: o,
			create: isEqual(roleObject[o][`create:any`], ['*']) ? true : false,
			read: isEqual(roleObject[o][`read:any`], ['*']) ? true : false,
			update: isEqual(roleObject[o][`update:any`], ['*']) ? true : false,
			delete: isEqual(roleObject[o][`delete:any`], ['*']) ? true : false,
			blockouts: defineModule ? defineModule.blockouts : {},
		};
		modules.push(moduleObject);
	});

	return modules;
};

export const checkPermission = (permission, action, module) => {
	const acl = new AccessControl(permission.data);
	const roleAcl = acl.can().role(permission.name).resource(module);

	let result = false;

	switch (action) {
		case 'create':
			result = roleAcl.createAny().granted;
			break;
		case 'read':
			result = roleAcl.readAny().granted;
			break;
		case 'update':
			result = roleAcl.updateAny().granted;
			break;
		case 'delete':
			result = roleAcl.deleteAny().granted;
			break;
	}

	return result;
};
