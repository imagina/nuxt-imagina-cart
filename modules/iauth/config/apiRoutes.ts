/* icommerce/v3/products?page=1&take=20 */
const moduleName = 'profile';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`

const apiRoutes = {
	products: `${urlBase}/products`,
	categories: `${urlBase}/categories`,

	authLogin: '/profile/v1/auth/login',
	authLogout: '/profile/v1/auth/logout',
	authMe: '/profile/v1/auth/me',
	authRegister: '/profile/v1/users/register',
	authLoginSocialNetwork: '/profile/v1/auth/social',
	authReset: '/profile/v1/auth/reset',
	authResetComplete: '/profile/v1/auth/reset-complete',
	changePassword: `/profile/v1/users/change-password`,
	
	/* settings */
	settings: '/isite/v1/site/settings',
	profileUsers: '/profile/v1/users',
	profileSkills: '/profile/v1/skills',
	profileInformation: '/profile/v1/information',



}

export default apiRoutes