
import apiRoutes from "~/modules/iauth/config/apiRoutes";
export default defineCachedEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const apiRoute = `${config.public.apiRoute}/api`
    const params = getQuery(event)

    let api = `${apiRoute}${apiRoutes.settings}`
   

    const data = await $fetch(`${api}`, {
        params: params
    }).then(response => {
        return response?.data || null
    })
    return data;
  }, {
      maxAge: 360 * 12,  //minimun time,
      group: 'app',      

      //staleMaxAge: -1, // sent to the client while the cache updates in the background.
        //swr: false
      getKey: () => 'app_settings'
  });
