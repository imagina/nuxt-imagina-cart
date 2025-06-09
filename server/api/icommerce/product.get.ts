import apiRoutes from "~/modules/icommerce/config/apiRoutes";

export default defineCachedEventHandler(async (event) => {
    const queries = getQuery(event)    
    if(!queries?.pid) return null

    const config = useRuntimeConfig()
    const apiRoute = `${config.public.apiRoute}/api`    

    let api = `${apiRoute}${apiRoutes.products}/${queries.pid}`   
    const params = {
		include: 'relatedProducts,categories,category,parent,manufacturer,optionsPivot.option,optionsPivot.productOptionValues',
		filter: {
			field: 'external_id'
		}		
	}
    
    
    const data = await $fetch(`${api}`, {
        params: params
    }).then(response => {
        return response?.data || null
    })    
    return data;
  }, {
    group: 'icommerce',
    name: 'product',    
    maxAge: 360 * 12,  //minimun time,
    //staleMaxAge: -1, // sent to the client while the cache updates in the background.
    //swr: false
    getKey: (event) =>  `${getQuery(event)?.pid}`
  });
