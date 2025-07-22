




const helper = {

	/**/
	hasFrencuency: (product) => {
		return product?.optionsPivot?.length || false
	},

	/*
		frecuency id: 1
	*/
	getFrecuencyOptions: (product) => {
		if(!helper.hasFrencuency(product)) return []
		const frecuencyId = (product?.productOptions?.length  ? product.productOptions[0].optionId : 1) || 1

		const option = product.optionsPivot.find((item) => item.optionId == frecuencyId)
		const options = option?.productOptionValues.filter((item) => item.optionId == frecuencyId && item.price > 1).map((item) =>  {
			return { label:   item.optionValue, value: item.price, id: item.id }
		}) || []

		return options
	},

	translateFrecuencyOptionLabel(label){
		//const { t } = useI18n()
		const labels = {
			'Triennially': "icommerce.frecuencies.triennially",
			'Biennially': "icommerce.frecuencies.biennially",
			'Annually': "icommerce.frecuencies.annually",
			'Quarterly': "icommerce.frecuencies.quarterly",
			'Semiannually': "icommerce.frecuencies.semiannually",
			'Monthly': "icommerce.frecuencies.monthly",
		}

		return labels[label] || label

	},

	/**/
	getPrice: (product, currencyValue = 'COP') => {
		const frecuencies = helper.getFrecuencyOptions(product)
		//get the lowest value 
		const defaultFrecuency = frecuencies?.length ? (frecuencies.reduce((min, obj) => obj.value < min.value ? obj : min).value || 0) : (product?.price || 0)
		let price = product?.frecuency ? product.frecuency.value : defaultFrecuency

		//if(product.price) price = price + product.price
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
		if(trm){
			value = (value / trm)
			value = Number.isInteger(value) ? value : value.toFixed(2)
		}
		return value
	},

	COPtoEUR(value){
		const trm = helper.getTrm('EUR')
		if(trm){
			value = helper.COPtoUSD(value)
			value = (value * trm)
			value = Number.isInteger(value) ? value : value.toFixed(2)
		}
		return value
	},



	getPriceWithSymbol(product, currency = 'COP'){
		const price = helper.getPrice(product, currency)
		return `${helper.currencyFormat(price, currency)} ${helper.getCurrency(currency).value}`
	},

	priceWithSymbol(value, currency = 'COP'){

		return `${helper.currencyFormat(helper.COPtoCurrency(value, currency), currency)} ${helper.getCurrency(currency).value}`
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
			//let price = helper.getPrice(product, currencyValue)
			//if(product?.price) price = price + product.price
			subtotal  = Number(subtotal) + Number(product.price)
		});
		return Number.isInteger(subtotal) ? subtotal : subtotal.toFixed(2)
	},

	getCurrencies(){
		const { t } = useI18n()
		return [
			{ value: 'COP', label: `COP - ${t("icommerce.currencies.cop")}`, symbol: '$'},
			{ value: 'USD', label: `USD - ${t("icommerce.currencies.usd")}`, symbol: '$'},
			{ value: 'EUR', label: `EUR - ${t("icommerce.currencies.eur")}` , symbol: '€'}
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
		//const authStore = useAuthStore()
		//let usdRates = authStore.usdRates
		const usdRates = useState('icommerce.trm')
		if(!usdRates?.value) return false
		const trm = Number(usdRates.value['USDRates'][currency])
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
	},

	calcDiscount(products, subtotal){

		let total = Number(0)
		let totalNoDiscount = Number(0)
		let percent = 0

		products.forEach(product => {

			if(product?.category){
				totalNoDiscount = Number(totalNoDiscount) + Number(product?.discount?.priceByMonths || 0) + (product.price - product.frecuency.value)
			} else {
				totalNoDiscount = Number(totalNoDiscount) + product.price
			}
			total  = Number(total) + (Number(product?.discount?.value) || 0 )

		});


		let diff = (totalNoDiscount - subtotal) || 0;
		percent = ((diff / totalNoDiscount) * 100) || 0
		percent =  (percent > 1) || percent == 0 ? Math.round(percent) : percent.toFixed(2)

		return {
			total,
			totalNoDiscount,
			percent
		}
	}




}


export default helper