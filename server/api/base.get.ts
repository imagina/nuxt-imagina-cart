export default defineCachedEventHandler(async (event) => {
    const params = getQuery(event)
    let api = params.api
    delete params.api
    delete params.maxAge

    const data = await $fetch(`${api}`, {
        params: params
    }).then(response => {
        return response
    })
    return data;
  }, {
      maxAge: 1,  //minimun time, 
      //staleMaxAge: 60, // sent to the client while the cache updates in the background.
      //getKey: () => cacheName
  });
