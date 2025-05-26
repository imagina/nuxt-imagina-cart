
export default defineCachedEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const apiRoute = `${config.public.apiRoute}/api`
    const params = getQuery(event)

    let api = `${apiRoute}${params.api}`

    delete params.api
    delete params.maxAge

    const data = await $fetch(`${api}`, {
        params: params
    }).then(response => {
        return response
    })
    return data;
  }, {
      maxAge: 5,  //minimun time,
      //staleMaxAge: -1, // sent to the client while the cache updates in the background.
        //swr: false
      //getKey: () => cacheName
  });
