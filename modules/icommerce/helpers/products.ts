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
	getPrice: (product, currencyValue = 'COP') => {
	 let price = helper.hasFrencuency(product) && product?.frecuency ? product.frecuency.value : (product?.price || 0)
	 if(price > 0 && currencyValue != 'COP'){
		//Dolar 
		const trm = helper.getTrm()		
	 	price = (price / trm)
		price = Number.isInteger(price) ? price : price.toFixed(2)
	 }
	 
	 return price 
	},

	getSubtotal(products, currencyValue){		
		let subtotal = Number(0);
		products.forEach(product => {    
			const price = helper.getPrice(product, currencyValue)    			
			subtotal  = Number(subtotal) + Number(price)			
		});
		return Number.isInteger(subtotal) ? subtotal : subtotal.toFixed(2)
	},

	getCurrencies(){
		return [
			{ value:'COP',  label:'Peso', symbol: '$'}, 
			{ value: 'USD', label: 'Dollar', symbol: '$'}
		];
	},

	getTrm(){
		const trm = Number('4107')
		return trm.toFixed(2)
	},
	
}


export default helper