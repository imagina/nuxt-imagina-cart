/* icommerce/v3/products?page=1&take=20 */
const moduleName = 'icommerce';
const moduleVersion = 'v3';
const urlBase = `/${moduleName}/${moduleVersion}`

const apiRoutes = {
	products: `${urlBase}/products`,
	categories: `${urlBase}/categories`,
	/* imagina customs */
	domainCheck: `https://nflow3.imaginacolombia.com/webhook/domain/search`,
	domainPricing: `https://clientes.imaginacolombia.com/getdata.php?type=domainpricing&imflushcache=1`,
}

export default apiRoutes