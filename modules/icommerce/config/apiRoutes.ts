/* icommerce/v3/products?page=1&take=20 */
const moduleName = 'icommerce';
const moduleVersion = 'v3';
const urlBase = `/${moduleName}/${moduleVersion}`

const apiRoutes = {
	products: `${urlBase}/products`,
	categories: `${urlBase}/categories`,
}

export default apiRoutes