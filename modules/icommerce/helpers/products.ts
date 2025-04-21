const helper = {

	/**/
	hasFrencuency: (product) => {
		return product?.optionsPivot?.length || false
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
			price = helper.COPtoCurrency(price, currencyValue)			
		}
		return price
	},

	COPtoCurrency(value, currency){
			if(currency == 'USD') return helper.COPtoUSD(value)
			if(currency == 'EUR') return helper.COPtoEUR(value)
			return value	
	},

	/* currency helper */

	COPtoUSD(value){
		const trm = helper.getTrm('COP')
		value = (value / trm)
		value = Number.isInteger(value) ? value : value.toFixed(2)
		return value
	},

	COPtoEUR(value){
		const trm = helper.getTrm('EUR')
		value = helper.COPtoUSD(value)
		value = (value * trm)
		value = Number.isInteger(value) ? value : value.toFixed(2)
		return value
	},



	getPriceWithSymbol(product, currency = 'COP'){
		const price = helper.getPrice(product, currency)
		return `${helper.currencyFormat(price, currency)} ${helper.getCurrency(currency).value}`
	},

	valueWithSymbol(value, currency = 'COP'){
		return `${helper.currencyFormat(value, currency)} ${helper.getCurrency(currency).value}`
	},

	/* extr*/
	extractPrice(str) {
		  // Match digits and commas, then remove commas
		  const match = str.match(/[\d,]+/);
		  if (match) {
			return parseInt(match[0].replace(/,/g, ''), 10);
		  }
		  return null; // Return null if no price found
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
			{ value: 'COP', label: 'COP - peso colombiano', symbol: '$'},
			{ value: 'USD', label: 'USD - dólar estaunidense', symbol: '$'},
			{ value: 'EUR', label: 'EUR - euro' , symbol: '€'}
		];
	},

	getCurrencySymbol(currencyValue = 'COP'){
		const currency = helper.getCurrencies().find(x => x.value == currencyValue)
		return currency?.symbol
	},

	getCurrency(currencyValue = 'COP'){
		const currency = helper.getCurrencies().find(x => x.value == currencyValue)
		return currency
	},



	getTrm(currency){
		const authStore = useAuthStore()
		let usdRates = authStore.usdRates
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
				minimumFractionDigits: 0, //removes decimal places.
				maximumFractionDigits: 0 //ensures no cents are shown.

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