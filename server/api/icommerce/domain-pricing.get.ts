
export default defineCachedEventHandler(async (event) => {

    const apiRoute = 'https://clientes.imaginacolombia.com/getdata.php?type=domainpricing&imflushcache=1'

    const data = await $fetch(`${apiRoute}`).then(response => {
        return response
    })
    return data;
  }, {
      maxAge: 360 * 6,
  });
