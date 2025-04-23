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

    <!-- PRODUCT TITLE -->
    <div class="tw-flex tw-justify-between tw-items-center tw-p-4">
      <h2 class="
            tw-font-semibold 
            tw-text-[22px] 
            tw-m-0 
            tw-p-0
            tw-leading-5
          ">
        {{ product.name }}         
      </h2>      
      <q-btn 
					icon="fa-solid fa-trash" 
					text-color="primary" 
					size="sm"
					round 
					flat
					@click="removeProduct(product)" 
			/>      
    </div>
    <!-- domain check-->
    <div v-if="isDomainProduct(product) && product?.domain" class="tw-px-2 tw-py-6 ">
      
      <div class="tw-flex tw-justify-center">

        <div class="tw-px-2">
						<q-select 
							label="configura tu dominio"
							v-model="domainCheck.actionfrecuency"
          		:options="domainActions"
          		option-value="value" 
							option-label="label" 
							outlined 
							class="tw-w-52 tw-mb-1 tw-rounded-lg"							
          		input-class="tw-w-52 tw-mb-1 tw-rounded-lg" 							
						/>
        </div>



        <q-input 
            v-model="domainCheck.domainName"
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
                @click="checkDomain()" 
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


      <div
		v-if="loading" 
		class="tw-w-full tw-h-[400px]" 
		style="position: relative;"
	>
		<q-inner-loading
		:showing="loading"
		color="primary"      
		/>
	</div>	
       
      <div class="tw-flex-col" >
        <div
            v-if="domainCheck?.exactMatch?.isAvaliable" 
            class="
                tw-flex 
                tw-justify-center 
                tw-p-2
                tw-bg-[#fafbff]
                tw-rounded-[10px]
                tw-border-[1px]
                tw-w-full
                tw-h-full
                tw-border-[#d5dfff]
                tw-p-4
            "
        >     
            <div>
                <span class="tw-text-lg tw-font-[800] tw-text-[#5cb85c]"> {{ domainCheck.exactMatch.name }} <br> ¡está disponible!&nbsp;</span>
            </div>              
            
            <div>
                <q-btn 
                    v-if="!product?.domain?.domainName"
                    label="make it yours"
                    no-caps
                    @click="selectDomain(product, domainCheck.exactMatch.name)"
                />
            </div>
        </div>

        <div class="tw-my-5" v-if="domainCheck.results.length">
          <span class="tw-text-lg tw-font-bold">Protege tu marca:&nbsp;</span>
          <p>Proteja estas extensiones de dominio populares para mantener a los competidores alejados de su nombre</p>
        </div>

        <div class="tw-grid tw-grid-cols-4  tw-gap-4">
          <!--extension cards -->
          <template v-for="result in domainCheck.results">
            <div 
              v-if="result.isAvaliable"
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
                <span class="tw-text-[20px] tw-font-[600]">
                    .{{ result.ext }}
                </span>
                <br>
                <span class="tw-text-[14px] tw-font-[500]">
                    {{ result.name }} 
                </span>
                <br>
                <span class="tw-text-[16px] tw-font-[600]">
                    {{  productsHelper.priceWithSymbol(getExtPrice(result.ext).domainregister, cartState.currency) }}
                </span>

            </div>
            <div class
            >
                <span
                    class="tw-text-[18px] tw-font-[700]"
                >
                <!-- {{ productsHelper.valueWithSymbol(productsHelper.COPtoCurrency(productsHelper.extractPrice(result.shortestPeriod.register), cartState.currency), cartState.currency) }} /Year-->
                
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
                    @click="addDomainExtension(product, result)"
                />
            </div>
          </div>      

          </template>
              
        </div>
      </div>
    </div> 
    
    <!-- domain check-->    




    <div class="tw-flex tw-justify-between tw-items-center">
        <h2 
        v-if="product?.domain?.domainName"
            class="
            tw-font-semibold 
            tw-text-[22px] 
            tw-m-0 
            tw-p-0
            tw-leading-5
          ">
        {{ product?.domain?.domainName }}         
        </h2>
    </div>
    
    
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
import apiRoutes from '../../config/apiRoutes.js';
import { useStorage } from '@vueuse/core'


const { locale, locales, setLocale } = useI18n()

const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
})

const emits = defineEmits(['subtotal'])


const validateProducts = computed(() => cartState.value.products.every(product => (isDomainProduct(product) ?   (product?.domain?.domainName != '') : true) === true)   )
const disableContinue = useState('icommerce.cart.continue', () => false)

const domainPricing = ref(null)
const loading = ref(false)

const domainActions =  [
	{
		label: 'Registrar un nuevo dominio',
		buttonLabel: 'Verificar',
		value: 'self-register'
	}, 

	{
		label: 'Transferir mi dominio ', 
		buttonLabel: 'Transferir',
		value: 'self-transfer'
	}, 

	{
		label: 'Solo modificar los DNS de mi dominio actual', 
		buttonLabel: 'Usar',
		value: 'self-owndomain'
	}, 
]
	

const domainCheck = ref({
		action: domainActions[0], // register, trasfer
    domainName: null,
    exactMatch: null,    
    results: [], 
    suggestions: [], 

})


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
    getDomainPricing()
    configProducts()
}


async function getDomainPricing(){
    await baseService.get(apiRoutes.domainPricing).then((response) => {
        const pricingList =  JSON.parse(response)
        domainPricing.value = Object.keys(pricingList).map(x => { return { ext: x, ...pricingList[x] } })
    })
}

/*keys: ext , domainregister , domaintransfer, domainrenew */
function getExtPrice(ext){
    return domainPricing.value.find(x => x.ext ==  `.${ext}`)
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
  return domainCategories.includes(product?.category?.id) || false

}


async function checkDomain() {  
    
    loading.value = true
    
    const lang = locale.value == 'es' ? 'esp' : 'eng'

    const body = {
        domain: domainCheck.value.domainName,
        lang,
        ext: ''
    }

    domainCheck.value.exactMatch = false
    domainCheck.value.results =  []
    domainCheck.value.suggestions = null
    
    const res = await $fetch(apiRoutes.domainCheck, {
		method: 'POST',
		body: JSON.stringify(body)
	}).then((response) => {
        loading.value = false
        domainCheck.value.exactMatch = response.exactMatch || false
        domainCheck.value.results = response?.results?.filter(x => x.isAvaliable == true) || []
        domainCheck.value.suggestions = response.suggestions 
    } )
}


function getFrecuencyOptions(product){
    if(product?.frecuencyOptions?.length) return product?.frecuencyOptions
    return productsHelper.getFrecuencyOptions(product)
}

function selectDomain(product, domainName){
    //product.id = domainName
    product.domain.domainName = domainName
}

function addDomainExtension(product, extension){    

    const newProduct =  {...product}

    newProduct.id  = extension.name    
    newProduct.category = null
    newProduct.domain.domainName = extension.name
	

    
    /*
	const frecuencyOptions = Object.keys(extension.pricing).map(x =>   {

		//const label = productsHelper.valueWithSymbol(productsHelper.extractPrice(extension.pricing[x].register), cartState.value.currency)
		const label = `Register ${x}`
		const value = productsHelper.extractPrice(extension.pricing[x].register)
		
		return { label, value, id: x }
	}) || [] 
     */
    
	
	//newProduct.frecuencyOptions = frecuencyOptions
	//newProduct.frecuency = frecuencyOptions[0]
	
    
    cartState.value.products.push(newProduct)
    
}

</script>

<style>
.card {
  /*box-shadow: 0px 10px 104px rgba(0, 0, 0, 0.07), 0px 3.85185px 33.1259px rgba(0, 0, 0, 0.0425185), 0px 0.814815px 8.47407px rgba(0, 0, 0, 0.0274815);*/
}
</style>