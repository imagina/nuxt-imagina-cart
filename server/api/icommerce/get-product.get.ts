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

    console.log(api)
    
    const data = await $fetch(`${api}`, {
        params: params
    }).then(response => {
        console.log(response?.data)
        return response?.data || null
    })    
    return data;
  }, {
    name: 'products',
    maxAge: 360 * 12,  //minimun time,
    //staleMaxAge: -1, // sent to the client while the cache updates in the background.
    //swr: false
    getKey: (event) =>  `${getQuery(event)?.pid}`
  });
