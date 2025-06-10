import apiRoutes from "~/modules/icommerce/config/apiRoutes";
import constants from "~/modules/icommerce/config/constants";


export default defineCachedEventHandler(async (event) => {
    const queries = getQuery(event)

    const config = useRuntimeConfig()
    const apiRoute = `${config.public.apiRoute}/api`    

    let api = `${apiRoute}${apiRoutes.categories}`   
    
    const params = {
      take: 60,
      page: 1,
      filter : {
        parentId: constants.cagtegories.mainCategoryId,
        order: {
          field: "created_at",
          way: "desc"
        }
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
    name: 'categories',    
    maxAge: 360 * 12,  //minimun time,
    //staleMaxAge: -1, // sent to the client while the cache updates in the background.
    //swr: false
    getKey: (event) =>  'categories'
  });
