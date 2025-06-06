import apiRoutes from "~/modules/icommerce/config/apiRoutes";

export default defineCachedEventHandler(async (event) => {

    
    


    const config = useRuntimeConfig()
    const apiRoute = `${config.public.apiRoute}/api`
    const params = getQuery(event)
    console.log('hey', event)
    console.log('hey2', params)

    return []

    let api = `${apiRoute}${apiRoutes.products}/${params.id}`

    delete params.api
    delete params.maxAge

    const data = await $fetch(`${api}`, {
        params: params
    }).then(response => {
        return response
    })
    return data;
  }, {
      maxAge: 360 * 12,  //minimun time,
      //staleMaxAge: -1, // sent to the client while the cache updates in the background.
        //swr: false
      //getKey: () => cacheName
  });
