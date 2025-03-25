const helper = {
	
	/**/
	hasFrencuency: (product) => {
		return product?.optionsPivot.length || false
	}, 

	/* */
	getFrecuencyOptions: (product, frecuencyId = 1) => {
		if(!helper.hasFrencuency(product)) return []
		const option = product.optionsPivot.find((item) => item.optionId == frecuencyId)

		const options = option?.productOptionValues.filter((item) => item.optionId == frecuencyId && item.price > 1).map((item) =>  {
			return { label: item.optionValue, value: item.price, id: item.id }
		}) || []

		return options
	},

	/**/
	getPrice: (product) => {
		return helper.hasFrencuency(product) && product?.frecuency ? product.frecuency.value : (product?.price || 0)
	},

	getCurrencies(){
		return [
			{ value:'COP',  label:'Colombian peso', symbol: '$' }, 
			{ value: 'USD', label: 'United States dollar', symbol: '$'}
		];
	}, 
	
}


export default helper