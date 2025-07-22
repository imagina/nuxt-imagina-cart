export default defineCachedEventHandler(async (event) => {
	const apiRoute = 'https://clientes.imaginacolombia.com/getdata.php?type=domainpricing&imflushcache=1'
	
	const data = await $fetch(`${apiRoute}`).then(response => {
		const pricingList =  JSON.parse(response)
		if(pricingList) return Object.keys(pricingList).map(x => { return { ext: x, ...pricingList[x] } })
		return []
	})
	return data;
  }, 
  {
	group: 'icommerce',
	name: 'domain_pricing',
	maxAge: 10,  //minimun time,
	//staleMaxAge: -1, // sent to the client while the cache updates in the background.
	//swr: false
	getKey: (event) =>  'domains'
  });
