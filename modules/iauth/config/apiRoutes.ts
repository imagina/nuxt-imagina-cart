/* icommerce/v3/products?page=1&take=20 */
const moduleName = 'profile';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`

const apiRoutes = {

	authLogin: `${urlBase}/auth/login`,
	authLogout: `${urlBase}/auth/logout`,
	authMe: `${urlBase}/auth/me`,
	authRegister: `${urlBase}/users/register`,
	authLoginSocialNetwork: `${urlBase}/auth/social`,
	authReset: `${urlBase}/auth/reset`,
	authResetComplete: `${urlBase}/auth/reset-complete`,
	changePassword: `${urlBase}/users/change-password`,
	
	/* settings */
	settings: `/isite/v1/site/settings`,
	
	profileUsers: `${urlBase}/users`,
	profileSkills: `${urlBase}/skills`,
	profileInformation: `${urlBase}/information`,

}

export default apiRoutes