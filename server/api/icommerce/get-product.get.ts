import apiRoutes from "~/modules/icommerce/config/apiRoutes";

export default defineCachedEventHandler(async (event) => {
    const params = getQuery(event)
    
    if(!params?.pid) return null

    const config = useRuntimeConfig()
    const apiRoute = `${config.public.apiRoute}/api`    

    let api = `${apiRoute}${apiRoutes.products}/${params.pid}`   
    
    const data = await $fetch(`${api}`, {
        params: params
    }).then(response => {
        return response
    })    
    return data;
  }, {
    name: 'products',
    maxAge: 360 * 12,  //minimun time,
    //staleMaxAge: -1, // sent to the client while the cache updates in the background.
    //swr: false
    getKey: (event) =>  `${getQuery(event)?.pid}`
  });
