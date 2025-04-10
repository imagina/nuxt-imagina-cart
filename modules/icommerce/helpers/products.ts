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
		const frecuencies = helper.getFrecuencyOptions(product)
		const defaultFrecuency = frecuencies?.length ? (frecuencies[0]?.value || 0) : (product?.price || 0)
		
		let price = product?.frecuency ? product.frecuency.value : defaultFrecuency
		if(price > 0 && currencyValue != 'COP'){
			//Dolar 
			if(currencyValue == 'USD'){
				const trm = helper.getTrm(currencyValue)
				price = (price / trm)
				price = Number.isInteger(price) ? price : price.toFixed(2)
			}
			if(currencyValue == 'EUR'){
				const trm = helper.getTrm(currencyValue)
				console.log(trm)
			}
		}
		return price 
	},

	getPriceWithSymbol(product, currency = 'COP'){
		const price = helper.getPrice(product, currency)
		return helper.currencyFormat(price, currency)
		//return `${helper.getCurrencySymbol(currency)}${helper.getPrice(product, currency)} ${currency}`
	},

	priceWithSymbol(value, currency = 'COP'){
		return helper.currencyFormat(value, currency)
		//return `${helper.getCurrencySymbol(currency)}${value} ${currency}`
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
			{ value: 'USD', label: 'Dolar', symbol: '$'},
			{ value: 'EUR', label: 'Euro', symbol: '€'}
		];
	},

	getCurrencySymbol(currencyValue = 'COP'){
		const currency = helper.getCurrencies().find(x => x.value == currencyValue)
		return currency?.symbol
	},

	getTrm(currency){
		const authStore = useAuthStore()
		let usdRates = authStore.usdRates		
		console.log(usdRates)
		const trm = Number(usdRates['USDRates'][currency])
		return trm.toFixed(2)
	},


	

	currencyFormat(value, currency){
		const currencies = {
			'USD' : new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
					}), 
			'COP': new Intl.NumberFormat('es-CO', {
				style: 'currency',
				currency: 'COP',
				maximumSignificantDigits: 2,

			}), 

			// format number to British pounds
			'GBP': Intl.NumberFormat('en-GB', {
				style: 'currency',
				currency: 'GBP',
			}),

			'EUR': Intl.NumberFormat('en-DE', {
				style: 'currency',
				currency: 'EUR',
			}),
		}
		return currencies[currency].format(value)
	}
	
}


export default helper