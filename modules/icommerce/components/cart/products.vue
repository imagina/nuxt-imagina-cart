<template>
  <div v-for="product in cartState.products" 
    class="
        card
        tw-bg-white
        tw-rounded-[20px]
        tw-px-5        
        tw-pb-5
        tw-my-5
        "
    >

    <!-- domain check-->
    <div v-if="isDomainProduct(product) && product?.domain" class="tw-px-2 tw-py-6">
      <div class="tw-flex tw-justify-center tw-p-2">
        <span class="tw-text-lg tw-font-[600]">Search for a domain name&nbsp;</span>
      </div>
      <div class="tw-flex">
        <q-input 
            v-model="product.domain.domainName"
            placeholder="Find a domain"
            class="tw-w-full"
            outlined 
            no-error-icon 
            :rules="[
                (val) => !!val || 'Este campo es requerido.',
                (val) => val.length >= 3 || 'El dominio debe de tener 3 o más caracteres',
                ]"
            >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-btn 
                @click="checkDomain(product)" 
                label="Search" 
                color="amber"
                class="
                    cursor-pointer
                    tw-w-[140px]
                    tw-rounded-md
                    tw-text-base                    
                "
                rounded 
                no-caps
                unelevated 
            />
          </template>
        </q-input>
      </div>
      <!-- results -->
       
      <div class="tw-flex-col" v-if="product?.domain.isAvailable">
        <div class="tw-flex tw-justify-center tw-p-2" >
          <span class="
            tw-text-lg
            tw-font-[800]
            tw-text-[#5cb85c]
          ">{{ product.domain.domainName }} ¡está disponible!&nbsp;</span>
          <q-btn 
            label="make it yours"
            no-caps
          />
        </div>

        <div class="tw-my-5">
          <span class="tw-text-lg tw-font-bold">Protege tu marca:&nbsp;</span>
          <p>Proteja estas extensiones de dominio populares para mantener a los competidores alejados de su nombre</p>
        </div>

        <div class="tw-grid tw-grid-cols-4  tw-gap-4">

          <!--extension cards -->
          <template v-for="extension in product.spotlight">
            <div 
              v-if="extension.isAvailable"
              class="
              tw-bg-[#fafbff]
              tw-rounded-[10px]
              tw-border-[1px]
              tw-w-full
              tw-h-full
              tw-border-[#d5dfff]
              tw-p-4"
              
            >
            <div>
                <span
                    class="tw-text-[20px] tw-font-[600]"
                >.{{ extension.tld }}
                </span>
            </div>
            <div class
            >
                <span
                    class="tw-text-[18px] tw-font-[700]"
                >
                {{ productsHelper.valueWithSymbol(productsHelper.COPtoCurrency(productsHelper.extractPrice(extension.shortestPeriod.register), cartState.currency), cartState.currency) }} /Year
                
                </span>
            </div>
            <div class="tw-flex tw-justify-center tw-my-2">
                <q-btn
                    label="Add"
                    text-color="black"
                    color="amber"
                    no-caps                    
                    unelevated
                    class="
                        tw-w-full
                            tw-justify-center
                            tw-font-bold
                            tw-rounded-lg
                    "
										@click="addDomainExtension(extension)"
                />
            </div>
          </div>      

          </template>
              
        </div>
      </div>
    </div>    
    <div class="tw-flex tw-justify-between tw-items-center">
      <h2 class="
            tw-font-semibold 
            tw-text-[22px] 
            tw-m-0 
            tw-p-0
            tw-leading-5
          ">
        {{ product.name }} - id: {{ product.id }} {{ isDomainProduct(product) }}
      </h2>
      <q-btn icon="fa-solid fa-trash" round flat text-color="primary" size="sm"
        @click="removeProduct(product)" />
    </div>
    <hr class="tw-bg-[#E1E3E7] tw-mt-5 tw-mb-10" />
    <div class="
        md:tw-flex
        md:tw-justify-between
        md:tw-gap-5">
      <div>				
        <q-select v-if="productsHelper.hasFrencuency(product) || product?.frecuency" v-model="product.frecuency"
          :options="getFrecuencyOptions(product)" @update:model-value="calcSubtotal()"
          option-value="value" option-label="label" outlined class="tw-w-52 tw-mb-1 tw-rounded-lg"
          input-class="tw-w-52 tw-mb-1 tw-rounded-lg" label="Periodo" />
        <span class="tw-text-xs tw-text-[#818181]">
          Renuevas a $00.000/mes el 00/00/000. ¡Cancela cuando quieras!
        </span>
        <div class="tw-mt-5">
          <i class="tw-text-[#444444] tw-text-[13px]" name="" />
          <div class="
                tw-py-2.5 
                tw-px-3.5 
                tw-rounded-md 
                tw-bg-[#FFAB404D]
                tw-w-fit
                tw-text-[13px]
              ">
            <span class="tw-text-[#444444]">Adquiere el dominio gratis por planes mayores a 12 meses</span>
          </div>
        </div>
      </div>
      <div class="
          md:tw-flex
          md:tw-items-start
          md:tw-gap-[30px] 
          tw-text-[#444444]">
        <div class="
            md:tw-flex
            md:tw-flex-col
            md:tw-pr-0
            tw-pr-4
            tw-mt-4
            tw-flex
            tw-align-middle                        
            tw-justify-between 
            ">
          <span class="tw-text-[13px]">Tarifa de configuración:&nbsp;</span>
          <span class="tw-text-lg tw-font-semibold"> $0{{ cartState.currency }}</span>
        </div>

        <div class="
            tw-flex
            tw-align-middle
            tw-justify-end
            tw-items-center
            tw-p-2
            md:tw-p-4
           ">
          <div class="
              tw-px-4
              tw-py-1.5
              tw-rounded-full
              tw-border
              tw-border-[#00000033]
              ">
            <span class="tw-text-lg tw-font-semibold">{{ productsHelper.getPriceWithSymbol(product, cartState.currency) }}</span>
          </div>
        </div>
      </div>
    </div>


    
  </div>

</template>

<script lang="ts" setup>

import productsHelper from '../../helpers/products.ts';
import { useStorage } from '@vueuse/core'

const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
})

const emits = defineEmits(['subtotal'])


const validateProducts = computed(() => cartState.value.products.every(product => (isDomainProduct(product) ? product?.domain?.isAvailable : true) === true))
const disableContinue = useState('icommerce.cart.continue', () => false)


onMounted(() => {
  init()
})

watch(
  () => cartState.value.products,
  (newQuery, oldQuery) => {
    //configProducts()
  },
)

watch(
  () => validateProducts.value,
  (newQuery, oldQuery) => {
    disableContinue.value = validateProducts.value
  },
)


watch(
  () => cartState.value.currency,
  (newQuery, oldQuery) => {
    calcSubtotal()
  },
)

function init() {
  configProducts()
}

function configProducts() {
  
    cartState.value.products.forEach((product) => {
    if (productsHelper.hasFrencuency(product)) {
      const options = productsHelper.getFrecuencyOptions(product)
      if (options.length && !product?.frecuency) {
        product.frecuency = options[0]
      }
    }
    if (isDomainProduct(product)) {

      product.domain = {
        domainName: '',
        extensions: [], 
        isAvailable: false         
      }

    }
  })
  calcSubtotal()
}

function removeProduct(product) {
	const products = cartState.value.products.filter(obj => obj.id != product.id);
	cartState.value = { products: products, currency: cartState.value.currency }

	if (cartState.value.products.length == 0) {
		// router.push({ path: getPath('icommerce.products') })
	}
}

function calcSubtotal() {
  const subtotal = productsHelper.getSubtotal(cartState.value.products, cartState.value.currency)
  emits('subtotal', subtotal)
}

function isDomainProduct(product) {
  // domain categories
  const domainCategories = [1, 32, 61, 58]
  console.log(product?.category?.id)
  return domainCategories.includes(product?.category?.id) || false

}

async function checkDomain(product) {



    const postUrl = 'https://nflow3.imaginacolombia.com/webhook/domain/search'

    const body = {
        domain: product.domain.domainName,
        ext: ''
    }

    console.log(body)
    

    


    const res = await $fetch(postUrl, {
		method: 'POST',
		body: JSON.stringify(body)
	}).then((response) => {
        console.log(response)
    })
    


  /*make the api call*/
  const result = {
        "domainName": "tesingh.com",
        "idnDomainName": "tesingh.com",
        "tld": "com",
        "tldNoDots": "com",
        "sld": "tesingh",
        "idnSld": "tesingh",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$57,000 pesos",
                "transfer": "$59,100 pesos",
                "renew": "$59,100 pesos"
            },
            "2": {
                "register": "$116,100 pesos",
                "renew": "$118,200 pesos"
            },
            "3": {
                "register": "$175,200 pesos",
                "renew": "$177,300 pesos"
            },
            "4": {
                "register": "$234,200 pesos",
                "renew": "$236,400 pesos"
            },
            "5": {
                "register": "$293,300 pesos",
                "renew": "$295,500 pesos"
            },
            "6": {
                "register": "$352,400 pesos",
                "renew": "$354,600 pesos"
            },
            "7": {
                "register": "$411,500 pesos",
                "renew": "$413,700 pesos"
            },
            "8": {
                "register": "$470,600 pesos",
                "renew": "$472,800 pesos"
            },
            "9": {
                "register": "$529,700 pesos",
                "renew": "$531,900 pesos"
            },
            "10": {
                "register": "$588,800 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$57,000 pesos",
            "transfer": "$59,100 pesos",
            "renew": "$59,100 pesos"
        },
        "group": "",
        "minLength": 3,
        "maxLength": 63,
        "isPremium": false,
        "premiumCostPricing": []
    }
    

  if (result.isAvailable) {
    //product.domain.domainName = result.domainName    
    product.domain.isAvailable = true    
    getExtensions(product)
  } else {
    product.domain.isAvailable = false
  }
  getSuggestions(product)

}


function getFrecuencyOptions(product){
    if(product?.frecuencyOptions?.length) return product?.frecuencyOptions
    return productsHelper.getFrecuencyOptions(product)
}

function addDomainExtension(extension){ 


	const newProduct = {
        id: extension.domainName,
		name: extension.domainName,
		price: 0
		
	}

	const frecuencyOptions = Object.keys(extension.pricing).map(x =>   {

		//const label = productsHelper.valueWithSymbol(productsHelper.extractPrice(extension.pricing[x].register), cartState.value.currency)
		const label = `Register ${x}`
		const value = productsHelper.extractPrice(extension.pricing[x].register)
		
		return { label, value, id: x }
	}) || [] 
	console.log(frecuencyOptions)
	newProduct.frecuencyOptions = frecuencyOptions
	newProduct.frecuency = frecuencyOptions[0]
	cartState.value.products.push(newProduct)
}


function getExtensions(product){
  product.spotlight = [
    {
        "domainName": "oldrobotto.com",
        "idnDomainName": "oldrobotto.com",
        "tld": "com",
        "tldNoDots": "com",
        "sld": "oldrobotto",
        "idnSld": "oldrobotto",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$57,000 pesos",
                "transfer": "$59,100 pesos",
                "renew": "$59,100 pesos"
            },
            "2": {
                "register": "$116,100 pesos",
                "renew": "$118,200 pesos"
            },
            "3": {
                "register": "$175,200 pesos",
                "renew": "$177,300 pesos"
            },
            "4": {
                "register": "$234,200 pesos",
                "renew": "$236,400 pesos"
            },
            "5": {
                "register": "$293,300 pesos",
                "renew": "$295,500 pesos"
            },
            "6": {
                "register": "$352,400 pesos",
                "renew": "$354,600 pesos"
            },
            "7": {
                "register": "$411,500 pesos",
                "renew": "$413,700 pesos"
            },
            "8": {
                "register": "$470,600 pesos",
                "renew": "$472,800 pesos"
            },
            "9": {
                "register": "$529,700 pesos",
                "renew": "$531,900 pesos"
            },
            "10": {
                "register": "$588,800 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$57,000 pesos",
            "transfer": "$59,100 pesos",
            "renew": "$59,100 pesos"
        },
        "group": "",
        "minLength": 3,
        "maxLength": 63,
        "isPremium": false,
        "premiumCostPricing": []
    },
    {
        "domainName": "oldrobotto.net",
        "idnDomainName": "oldrobotto.net",
        "tld": "net",
        "tldNoDots": "net",
        "sld": "oldrobotto",
        "idnSld": "oldrobotto",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$63,800 pesos",
                "transfer": "$65,900 pesos",
                "renew": "$65,900 pesos"
            },
            "2": {
                "register": "$129,600 pesos",
                "renew": "$131,800 pesos"
            },
            "3": {
                "register": "$195,500 pesos",
                "renew": "$197,700 pesos"
            },
            "4": {
                "register": "$261,400 pesos",
                "renew": "$263,500 pesos"
            },
            "5": {
                "register": "$327,300 pesos",
                "renew": "$329,400 pesos"
            },
            "6": {
                "register": "$393,100 pesos",
                "renew": "$395,300 pesos"
            },
            "7": {
                "register": "$459,000 pesos",
                "renew": "$461,200 pesos"
            },
            "8": {
                "register": "$524,900 pesos",
                "renew": "$527,000 pesos"
            },
            "9": {
                "register": "$590,800 pesos",
                "renew": "$592,900 pesos"
            },
            "10": {
                "register": "$656,600 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$63,800 pesos",
            "transfer": "$65,900 pesos",
            "renew": "$65,900 pesos"
        },
        "group": "",
        "minLength": 3,
        "maxLength": 63,
        "isPremium": false,
        "premiumCostPricing": []
    },
    {
        "domainName": "oldrobotto.app",
        "idnDomainName": "oldrobotto.app",
        "tld": "app",
        "tldNoDots": "app",
        "sld": "oldrobotto",
        "idnSld": "oldrobotto",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$76,900 pesos",
                "transfer": "$76,900 pesos",
                "renew": "$76,900 pesos"
            },
            "2": {
                "register": "$153,800 pesos",
                "renew": "$153,800 pesos"
            },
            "3": {
                "register": "$230,600 pesos",
                "renew": "$230,600 pesos"
            },
            "4": {
                "register": "$307,500 pesos",
                "renew": "$307,500 pesos"
            },
            "5": {
                "register": "$384,300 pesos",
                "renew": "$384,300 pesos"
            },
            "6": {
                "register": "$461,200 pesos",
                "renew": "$461,200 pesos"
            },
            "7": {
                "register": "$538,000 pesos",
                "renew": "$538,000 pesos"
            },
            "8": {
                "register": "$614,900 pesos",
                "renew": "$614,900 pesos"
            },
            "9": {
                "register": "$691,700 pesos",
                "renew": "$691,700 pesos"
            },
            "10": {
                "register": "$768,600 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$76,900 pesos",
            "transfer": "$76,900 pesos",
            "renew": "$76,900 pesos"
        },
        "group": "",
        "minLength": 0,
        "maxLength": 0,
        "isPremium": false,
        "premiumCostPricing": []
    },
    {
        "domainName": "oldrobotto.guru",
        "idnDomainName": "oldrobotto.guru",
        "tld": "guru",
        "tldNoDots": "guru",
        "sld": "oldrobotto",
        "idnSld": "oldrobotto",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$21,700 pesos",
                "transfer": "$158,200 pesos",
                "renew": "$158,200 pesos"
            },
            "2": {
                "register": "$179,900 pesos",
                "renew": "$316,400 pesos"
            },
            "3": {
                "register": "$338,000 pesos",
                "renew": "$474,500 pesos"
            },
            "4": {
                "register": "$496,200 pesos",
                "renew": "$632,700 pesos"
            },
            "5": {
                "register": "$654,300 pesos",
                "renew": "$790,900 pesos"
            },
            "6": {
                "register": "$812,500 pesos",
                "renew": "$949,000 pesos"
            },
            "7": {
                "register": "$970,700 pesos",
                "renew": "$1,107,200 pesos"
            },
            "8": {
                "register": "$1,128,800 pesos",
                "renew": "$1,265,300 pesos"
            },
            "9": {
                "register": "$1,287,000 pesos",
                "renew": "$1,423,500 pesos"
            },
            "10": {
                "register": "$1,445,200 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$21,700 pesos",
            "transfer": "$158,200 pesos",
            "renew": "$158,200 pesos"
        },
        "group": "",
        "minLength": 0,
        "maxLength": 0,
        "isPremium": false,
        "premiumCostPricing": []
    },
    {
        "domainName": "oldrobotto.club",
        "idnDomainName": "oldrobotto.club",
        "tld": "club",
        "tldNoDots": "club",
        "sld": "oldrobotto",
        "idnSld": "oldrobotto",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$71,500 pesos",
                "transfer": "$71,500 pesos",
                "renew": "$71,500 pesos"
            },
            "2": {
                "register": "$142,900 pesos",
                "renew": "$142,900 pesos"
            },
            "3": {
                "register": "$214,300 pesos",
                "renew": "$214,300 pesos"
            },
            "4": {
                "register": "$285,700 pesos",
                "renew": "$285,700 pesos"
            },
            "5": {
                "register": "$357,100 pesos",
                "renew": "$357,100 pesos"
            },
            "6": {
                "register": "$428,500 pesos",
                "renew": "$428,500 pesos"
            },
            "7": {
                "register": "$499,900 pesos",
                "renew": "$499,900 pesos"
            },
            "8": {
                "register": "$571,300 pesos",
                "renew": "$571,300 pesos"
            },
            "9": {
                "register": "$642,700 pesos",
                "renew": "$642,700 pesos"
            },
            "10": {
                "register": "$714,100 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$71,500 pesos",
            "transfer": "$71,500 pesos",
            "renew": "$71,500 pesos"
        },
        "group": "hot",
        "minLength": 0,
        "maxLength": 0,
        "isPremium": false,
        "premiumCostPricing": []
    },
    {
        "domainName": "oldrobotto.com.co",
        "idnDomainName": "oldrobotto.com.co",
        "tld": "com.co",
        "tldNoDots": "comco",
        "sld": "oldrobotto",
        "idnSld": "oldrobotto",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$54,900 pesos",
                "transfer": "$57,000 pesos",
                "renew": "$57,000 pesos"
            },
            "2": {
                "register": "$111,800 pesos",
                "renew": "$114,000 pesos"
            },
            "3": {
                "register": "$168,800 pesos",
                "renew": "$171,000 pesos"
            },
            "4": {
                "register": "$225,800 pesos",
                "renew": "$227,900 pesos"
            },
            "5": {
                "register": "$282,700 pesos",
                "renew": "$284,900 pesos"
            },
            "6": {
                "register": "$339,700 pesos",
                "renew": "$341,900 pesos"
            },
            "7": {
                "register": "$396,700 pesos",
                "renew": "$398,800 pesos"
            },
            "8": {
                "register": "$453,700 pesos",
                "renew": "$455,800 pesos"
            },
            "9": {
                "register": "$510,600 pesos",
                "renew": "$512,800 pesos"
            },
            "10": {
                "register": "$567,600 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$54,900 pesos",
            "transfer": "$57,000 pesos",
            "renew": "$57,000 pesos"
        },
        "group": "",
        "minLength": 0,
        "maxLength": 0,
        "isPremium": false,
        "premiumCostPricing": []
    },
    {
        "domainName": "oldrobotto.co",
        "idnDomainName": "oldrobotto.co",
        "tld": "co",
        "tldNoDots": "co",
        "sld": "oldrobotto",
        "idnSld": "oldrobotto",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$132,200 pesos",
                "transfer": "$141,000 pesos",
                "renew": "$141,000 pesos"
            },
            "2": {
                "register": "$273,100 pesos",
                "renew": "$281,900 pesos"
            },
            "3": {
                "register": "$414,000 pesos",
                "renew": "$422,800 pesos"
            },
            "4": {
                "register": "$554,900 pesos",
                "renew": "$563,700 pesos"
            },
            "5": {
                "register": "$695,800 pesos",
                "renew": "$704,600 pesos"
            },
            "6": {
                "register": "$836,800 pesos",
                "renew": "$845,500 pesos"
            },
            "7": {
                "register": "$977,700 pesos",
                "renew": "$986,400 pesos"
            },
            "8": {
                "register": "$1,118,600 pesos",
                "renew": "$1,127,400 pesos"
            },
            "9": {
                "register": "$1,259,500 pesos",
                "renew": "$1,268,300 pesos"
            },
            "10": {
                "register": "$1,400,400 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$132,200 pesos",
            "transfer": "$141,000 pesos",
            "renew": "$141,000 pesos"
        },
        "group": "sale",
        "minLength": 0,
        "maxLength": 0,
        "isPremium": false,
        "premiumCostPricing": []
    },
    {
        "domainName": "oldrobotto.in",
        "idnDomainName": "oldrobotto.in",
        "tld": "in",
        "tldNoDots": "in",
        "sld": "oldrobotto",
        "idnSld": "oldrobotto",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$32,300 pesos",
                "transfer": "$32,300 pesos",
                "renew": "$32,300 pesos"
            },
            "2": {
                "register": "$64,500 pesos",
                "renew": "$64,500 pesos"
            },
            "3": {
                "register": "$96,800 pesos",
                "renew": "$96,800 pesos"
            },
            "4": {
                "register": "$129,000 pesos",
                "renew": "$129,000 pesos"
            },
            "5": {
                "register": "$161,300 pesos",
                "renew": "$161,300 pesos"
            },
            "6": {
                "register": "$193,500 pesos",
                "renew": "$193,500 pesos"
            },
            "7": {
                "register": "$225,800 pesos",
                "renew": "$225,800 pesos"
            },
            "8": {
                "register": "$258,000 pesos",
                "renew": "$258,000 pesos"
            },
            "9": {
                "register": "$290,300 pesos",
                "renew": "$290,300 pesos"
            },
            "10": {
                "register": "$322,500 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$32,300 pesos",
            "transfer": "$32,300 pesos",
            "renew": "$32,300 pesos"
        },
        "group": "",
        "minLength": 3,
        "maxLength": 63,
        "isPremium": false,
        "premiumCostPricing": []
    }
]
}

 function getSuggestions(product){
  product.domainSuggestions = [
     {
        "domainName": "old-robot-to.com",
        "idnDomainName": "old-robot-to.com",
        "tld": "com",
        "tldNoDots": "com",
        "sld": "old-robot-to",
        "idnSld": "old-robot-to",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$57,000 pesos",
                "transfer": "$59,100 pesos",
                "renew": "$59,100 pesos"
            },
            "2": {
                "register": "$116,100 pesos",
                "renew": "$118,200 pesos"
            },
            "3": {
                "register": "$175,200 pesos",
                "renew": "$177,300 pesos"
            },
            "4": {
                "register": "$234,200 pesos",
                "renew": "$236,400 pesos"
            },
            "5": {
                "register": "$293,300 pesos",
                "renew": "$295,500 pesos"
            },
            "6": {
                "register": "$352,400 pesos",
                "renew": "$354,600 pesos"
            },
            "7": {
                "register": "$411,500 pesos",
                "renew": "$413,700 pesos"
            },
            "8": {
                "register": "$470,600 pesos",
                "renew": "$472,800 pesos"
            },
            "9": {
                "register": "$529,700 pesos",
                "renew": "$531,900 pesos"
            },
            "10": {
                "register": "$588,800 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$57,000 pesos",
            "transfer": "$59,100 pesos",
            "renew": "$59,100 pesos"
        },
        "group": "",
        "minLength": 3,
        "maxLength": 63,
        "isPremium": false,
        "premiumCostPricing": []
    },
     {
        "domainName": "oldrobotto.navy",
        "idnDomainName": "oldrobotto.navy",
        "tld": "navy",
        "tldNoDots": "navy",
        "sld": "oldrobotto",
        "idnSld": "oldrobotto",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$152,800 pesos",
                "transfer": "$152,800 pesos",
                "renew": "$152,800 pesos"
            },
            "2": {
                "register": "$305,600 pesos",
                "renew": "$305,600 pesos"
            },
            "3": {
                "register": "$458,300 pesos",
                "renew": "$458,300 pesos"
            },
            "4": {
                "register": "$611,100 pesos",
                "renew": "$611,100 pesos"
            },
            "5": {
                "register": "$763,800 pesos",
                "renew": "$763,800 pesos"
            },
            "6": {
                "register": "$916,600 pesos",
                "renew": "$916,600 pesos"
            },
            "7": {
                "register": "$1,069,400 pesos",
                "renew": "$1,069,400 pesos"
            },
            "8": {
                "register": "$1,222,100 pesos",
                "renew": "$1,222,100 pesos"
            },
            "9": {
                "register": "$1,374,900 pesos",
                "renew": "$1,374,900 pesos"
            },
            "10": {
                "register": "$1,527,600 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$152,800 pesos",
            "transfer": "$152,800 pesos",
            "renew": "$152,800 pesos"
        },
        "group": "",
        "minLength": 0,
        "maxLength": 0,
        "isPremium": false,
        "premiumCostPricing": []
    },
    {
        "domainName": "oldrobot2.com",
        "idnDomainName": "oldrobot2.com",
        "tld": "com",
        "tldNoDots": "com",
        "sld": "oldrobot2",
        "idnSld": "oldrobot2",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$57,000 pesos",
                "transfer": "$59,100 pesos",
                "renew": "$59,100 pesos"
            },
            "2": {
                "register": "$116,100 pesos",
                "renew": "$118,200 pesos"
            },
            "3": {
                "register": "$175,200 pesos",
                "renew": "$177,300 pesos"
            },
            "4": {
                "register": "$234,200 pesos",
                "renew": "$236,400 pesos"
            },
            "5": {
                "register": "$293,300 pesos",
                "renew": "$295,500 pesos"
            },
            "6": {
                "register": "$352,400 pesos",
                "renew": "$354,600 pesos"
            },
            "7": {
                "register": "$411,500 pesos",
                "renew": "$413,700 pesos"
            },
            "8": {
                "register": "$470,600 pesos",
                "renew": "$472,800 pesos"
            },
            "9": {
                "register": "$529,700 pesos",
                "renew": "$531,900 pesos"
            },
            "10": {
                "register": "$588,800 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$57,000 pesos",
            "transfer": "$59,100 pesos",
            "renew": "$59,100 pesos"
        },
        "group": "",
        "minLength": 3,
        "maxLength": 63,
        "isPremium": false,
        "premiumCostPricing": []
    },
    {
        "domainName": "oldrobot2.net",
        "idnDomainName": "oldrobot2.net",
        "tld": "net",
        "tldNoDots": "net",
        "sld": "oldrobot2",
        "idnSld": "oldrobot2",
        "status": "available for registration",
        "legacyStatus": "available",
        "score": 1,
        "isRegistered": false,
        "isAvailable": true,
        "isValidDomain": true,
        "domainErrorMessage": "",
        "pricing": {
            "1": {
                "register": "$63,800 pesos",
                "transfer": "$65,900 pesos",
                "renew": "$65,900 pesos"
            },
            "2": {
                "register": "$129,600 pesos",
                "renew": "$131,800 pesos"
            },
            "3": {
                "register": "$195,500 pesos",
                "renew": "$197,700 pesos"
            },
            "4": {
                "register": "$261,400 pesos",
                "renew": "$263,500 pesos"
            },
            "5": {
                "register": "$327,300 pesos",
                "renew": "$329,400 pesos"
            },
            "6": {
                "register": "$393,100 pesos",
                "renew": "$395,300 pesos"
            },
            "7": {
                "register": "$459,000 pesos",
                "renew": "$461,200 pesos"
            },
            "8": {
                "register": "$524,900 pesos",
                "renew": "$527,000 pesos"
            },
            "9": {
                "register": "$590,800 pesos",
                "renew": "$592,900 pesos"
            },
            "10": {
                "register": "$656,600 pesos"
            }
        },
        "shortestPeriod": {
            "period": 1,
            "register": "$63,800 pesos",
            "transfer": "$65,900 pesos",
            "renew": "$65,900 pesos"
        },
        "group": "",
        "minLength": 3,
        "maxLength": 63,
        "isPremium": false,
        "premiumCostPricing": []
    }
  ]
}
 




</script>

<style>
.card {
  /*box-shadow: 0px 10px 104px rgba(0, 0, 0, 0.07), 0px 3.85185px 33.1259px rgba(0, 0, 0, 0.0425185), 0px 0.814815px 8.47407px rgba(0, 0, 0, 0.0274815);*/
}
</style>