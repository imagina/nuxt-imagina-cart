import config from "~/composables/config";

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
      maxAge: config.cacheMaxAge,  //minimun time, 
      //staleMaxAge: 1, // sent to the client while the cache updates in the background.
      //getKey: () => cacheName
  });
