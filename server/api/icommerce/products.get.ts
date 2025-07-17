import apiRoutes from "~/modules/icommerce/config/apiRoutes";

export default defineCachedEventHandler(async (event) => {
    const queries = getQuery(event)    
    
    


    const config = useRuntimeConfig()
    const apiRoute = `${config.public.apiRoute}/api`    

    let api = `${apiRoute}${apiRoutes.products}`   
    
    const params = {
        take: 10,
        page:  1,
        order: 'asc',
		include: 'relatedProducts,categories,category,parent,manufacturer,optionsPivot.option,optionsPivot.productOptionValues',
		filter: {
			categoryId: queries.categoryId
		}
	}
    
    
    const response = await $fetch(`${api}`, {
        params: params
    })
    
    return response;
  }, {
    group: 'icommerce',
    name: 'products_by_category',    
    maxAge: 360 * 12,  //minimun time,
    //staleMaxAge: -1, // sent to the client while the cache updates in the background.
    //swr: false
    getKey: (event) =>  `category_${getQuery(event)?.categoryId}`
  });
