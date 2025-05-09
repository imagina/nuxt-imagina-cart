/* icommerce/v3/products?page=1&take=20 */
const moduleName = 'icommerce';
const moduleVersion = 'v3';
const urlBase = `/${moduleName}/${moduleVersion}`

const apiRoutes = {
	products: `${urlBase}/products`,
	categories: `${urlBase}/categories`,
	countries: '/v2/ilocations/countries',
	provinces: '/v2/ilocations/provinces',
	cities: '/v2/ilocations/cities',
	/* imagina customs */
	domainCheck: `/api/icommerce/verify-domain`,
	domainPricing: `/api/icommerce/domain-pricing`,
}

export default apiRoutes