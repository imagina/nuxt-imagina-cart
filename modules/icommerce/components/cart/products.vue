<template>
  <div>  
    <ClientOnly>
      <AlertModal 
        v-if="cartState.products"
        ref="alertRef"
        :params="alertParams"
      />
    </ClientOnly>    
    
    <div v-for="product in cartState.products" :key="product.name"
      class="
          card
          tw-shadow-xl
          tw-bg-white
          tw-rounded-[20px]
          tw-px-5
          tw-pb-5
          tw-my-5
          "
      >
      <!-- PRODUCT TITLE -->
      <div class="tw-flex tw-justify-between tw-items-center tw-py-6">
        <div class="">
            <span class="
                tw-text-[18px]
                sm:tw-text-[20px]
                md:tw-text-[22px]
                tw-font-[600]
                tw-m-0
                tw-p-0
                tw-leading-5
                tw-break-all
                md:tw-break-normal


              ">
          {{ product.name}}
            </span>
            <span
              v-if="product?.domain?.domainName"
              class="
                  tw-rounded-[10px]
                  tw-border-[2px]
                tw-border-[#5cb85c]
                tw-bg-[#5cb85c]
                tw-text-white
                  tw-font-semibold
                  tw-text-[22px]
                  tw-py-1
                  tw-px-2
                  sm:tw-ml-2
                  tw-w-full
              ">
              <span style="word-break: break-word;">
                {{  product?.domain?.domainName }}
              </span>
            </span>
        </div>
        <q-btn
            icon="fa-solid fa-trash"
            text-color="primary"
            size="sm"
            round
            flat
            @click="removeProduct(product)"
        />
      </div>
      <div class="tw-flex tw-justify-between tw-items-center tw-pb-2" v-if="product?.category">
        <div class="tw-py-1">
            <span class="
                tw-text-[18px]
                tw-text-[#818181]
              ">
            {{ product.category.title}}
            </span>
        </div>
      </div>




      <!-- domain check-->
      <div v-if="isDomainNameRequired(product) && product?.domain" class="tw-py-2">

        <div class="md:tw-flex tw-justify-center tw-gap-4">

          <div>
              <q-select
                label="configura tu dominio"
                v-model="product.domainCheck.action"
                @update:model-value="() => {
                  product.domain.action = product.domainCheck.action
                  product.domain.ext = null
                  product.domain.price = null
                  product.domain.domainName = null
                  product.domainCheck.domainName = null
                  updateDomainPrice(product)
                }"
                :options="domainActions"
                option-value="value"
                option-label="label"
                outlined
                class="tw-w-[240px] tw-mb-4 tw-rounded-lg"
                input-class="tw-w-52 tw-mb-4 tw-rounded-lg"
              />
          </div>

          <!-- input for register domain-->
          <q-input            
              v-model="product.domainCheck.domainName"
              :placeholder="product.domainCheck.action.placeholder"
              class="tw-w-full"
              outlined
              autofocus
              no-error-icon
              :rules="[
                  (val) => !!val || 'Este campo es requerido.',
                  (val) => val.length >= 3 || 'El dominio debe de tener 3 o más caracteres',
                  (val) => !/\s/.test(val) || 'El dominio no debe contener espacios',
                  (val) => isSupportedDomain(product, val)
                ]"
                @update:model-value="(val) => {
                  product.domainCheck.domainName = val.replace(/[^a-zA-Z0-9.-]/g, '') // remove invalid chars
                  //product.domainCheck.domainName = product.domainCheck.domainName.replace(/\.{2,}/g, '.'); // collapse multiple dots into one
                  updateDomainPrice(product)
                }"
                @keydown="(event) => checkDomainKeyDown(event, product)"
              >
            <template v-slot:prepend>
              <q-icon
                v-if="product.domainCheck.action.value == domainActions[0].value"
                name="search"
              />
            </template>
            <template v-slot:append>
              <q-btn
                  v-if="product.domainCheck.action.value == domainActions[0].value"
                  @click="checkDomain(product)"
                  label="Buscar"
                  color="amber"
                  debounce="500"
                  class="
                    cursor-pointer
                    md:tw-w-[140px]
                    tw-rounded-md
                    tw-text-base
                  "
                  rounded
                  no-caps
                  unelevated
                  :disable="disableCheckButton(product)"

              />
            </template>
          </q-input>

          <!-- transfer code -->
          <q-input
              v-if="product.domainCheck.action.value == domainActions[1].value"
              v-model="product.domain.transferCode"
              placeholder="Codigo de transferencia"
              class="tw-w-full"
              outlined
              no-error-icon
              :rules="[
                  ]"
          />


        </div>
        <!-- results -->

        <q-dialog
          v-if="isDomainNameRequired(product)"
          v-model="product.domainCheck.modal"
        >
          <!--loading --->
          <div
              v-if="product.domainCheck.loading"
              class="tw-w-[100px] tw-h-[100px] tw-bg-white"
              style="position: relative;"
          >
            <q-inner-loading :showing="product.domainCheck.loading" color="primary"  />
          </div>



          <q-card
            v-if="product.domainCheck.action.value == domainActions[0].value && !product.domainCheck.loading"
            class="tw-w-[600px] md:tw-w-[900px]"
          >
            <q-card-section class="row items-center q-pb-none tw-sticky tw-top-0 tw-bg-white tw-z-40">
                <span class="tw-text-[20px] tw-font-[600]">
                {{ product.name }}
                </span>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <div
                  v-if="product.domainCheck?.exactMatch?.isAvailable"
                  class="
                  tw-flex-col
                  tw-bg-[#fafbff]
                    tw-rounded-[10px]
                    tw-border-[1px]
                    tw-w-full
                    tw-h-full
                    tw-border-[#d5dfff]
                    tw-py-4
                    tw-px-6
                    my-hover-card
                  "
                >

                  <div class="tw-flex-col tw-items-around">
                          <div class="tw-my-2">
                            <span class="
                              tw-rounded-[10px]
                              tw-border-[2px]
                              tw-border-[#5cb85c]
                              tw-bg-[#5cb85c]
                              tw-text-white
                              tw-font-[600]
                              tw-p-1
                              ">
                              <span>COINCIDENCIA EXACTA</span><br>
                            </span>

                            </div>
                            <div class="tw-my-4">
                              <span class="tw-text-[28px] tw-font-[700] tw-line-clamp-4 tw-break-all"> {{ product.domainCheck.exactMatch.name }}
                              </span>
                            </div>
                          <div class="tw-my-2">
                            <span class="tw-text-[20px] tw-font-[600]">
                            {{  productsHelper.priceWithSymbol(getExtPrice(product.domainCheck.exactMatch.ext).domainregister, cartState.currency) }}
                          </span>
                          </div>
                          <div>
                            <q-btn
                              :label="product.domainCheck.exactMatch.disableButton ? 'Agregado al carrito' : 'Compralo ya'"
                              color="amber"
                              no-caps
                              unelevated
                              class="tw-font-bold tw-rounded-lg tw-w-2/4"
                              :disable="product.domainCheck.exactMatch.disableButton"
                              @click="() => {
                                product.domainCheck.exactMatch.disableButton = true
                                selectDomain(product, product.domainCheck.exactMatch)
                                }"
                            />
                          </div>
                  </div>

                </div>
            </q-card-section>

            <!--results -->
            <q-card-section>

              <!-- zero results -->
              <div
                v-if="product?.domainCheck.results.length == 0 && !product.domainCheck?.exactMatch"
                class="
                  tw-flex-col
                  tw-justify-center
                  tw-align-middle
                  tw-place-items-center
                tw-bg-[#fafbff]
                  tw-rounded-[10px]
                  tw-border-[1px]
                  tw-w-full
                  tw-h-full
                tw-border-[#d5dfff]
                  tw-py-4
                  tw-px-6
                "
              >
                <div>
                  <span class="tw-text-[18px] tw-font-[600] ">Sin resultados disponibles para:</span><br>
                </div>
                <div>
                  <span class="tw-text-[20px] tw-font-[700] tw-line-clamp-4 tw-break-all">{{ product.domainCheck.domainName }}</span>
                </div>
              </div>


              <!-- result found -->
              <div class="tw-mb-5" v-if="product?.domainCheck.results.length != 0">
                <span class="tw-text-lg tw-font-bold">Protege tu marca:&nbsp;</span>
                <p>Proteja estas extensiones de dominio populares para mantener a los competidores alejados de su nombre</p>
              </div>
              <div
                v-if="product?.domainCheck.results.length"
                class="tw-grid tw-grid-cols-2 tw-gap-4"
                :class="product?.domainCheck.results.length > 4 ? 'md:tw-grid-cols-2' : 'md:tw-grid-cols-3'"
              >
                <!--extension cards -->
                <template v-for="result in product?.domainCheck.results">
                  <div
                    v-if="result.isAvailable"
                    class="
                    tw-rounded-[10px]
                    tw-border-[1px]
                    tw-w-full
                    tw-h-full
                    tw-border-[#d5dfff]
                    tw-bg-[#fafbff]
                    tw-p-4
                    my-hover-card"
                  >


                  <div>
                      <span class="tw-text-[20px] tw-font-[600]">
                          .{{ result.ext }}
                      </span>
                      <br>
                      <span class="tw-text-[16px] tw-font-[600] tw-line-clamp-4 tw-break-all">
                          {{ result.name }}
                      </span>
                      <br>
                      <span class="tw-text-[16px] tw-font-[500]">
                          {{  productsHelper.priceWithSymbol(getExtPrice(result.ext).domainregister, cartState.currency) }}
                      </span>

                  </div>
                  <div class="tw-flex tw-justify-center tw-my-2">
                      <q-btn
                          :label="result?.disableButton ? 'Agregado' :selectDomainLabel(product)"
                          text-color="white"
                          color="amber"
                          no-caps
                          unelevated
                          class="
                              tw-w-full
                              tw-justify-center
                              tw-font-bold
                              tw-rounded-lg
                          "
                          :disabled="result.disableButton"
                          @click="() => {
                            result.disableButton = true
                            addDomainExtension(product, result)
                          }"
                      />
                  </div>
                </div>

                </template>

              </div>

            </q-card-section>

            <!-- suggestions -->
            <q-card-section v-if="product?.domainCheck?.suggestions.length">
              <div class="tw-grid tw-grid-cols  tw-px-4 tw-h-full">
                <div>
                  <span class="tw-text-[16px] tw-font-[600]">Más opciones:</span>
                </div>

                <div>
                  <!--<q-scroll-area style="height: 400px; max-width: 2000px;">-->
                    <template v-for="suggestion in product?.domainCheck.suggestions">
                      <div class="my-hover-card tw-px-1 tw-my-4 tw-rounded-[10px]">
                      <div class="tw-grid  md:tw-flex md:tw-justify-between tw-items-center tw-gap-2 tw-p-2 tw-border-b-2" >
                          <span class="tw-text-[14px] tw-font-[600] tw-line-clamp-4 tw-break-all">
                              {{ suggestion.name }}
                          </span>
                          <div class="tw-flex tw-items-center tw-justify-between tw-gap-4">
                            <div>
                              <span class="tw-text-[16px] tw-font-[500]">
                              {{  productsHelper.priceWithSymbol(getExtPrice(suggestion.ext).domainregister, cartState.currency) }}
                            </span>
                            </div>
                            <div>
                              <q-btn
                                :label="suggestion.disableButton ? 'Agregado' : selectDomainLabel(product)"
                                color="amber"
                                no-caps
                                unelevated
                                :outline="suggestion.disableButton"
                                class="tw-font-bold tw-rounded-lg"
                                :disable="suggestion.disableButton"
                                @click="() => {
                                  suggestion.disableButton = true
                                  addDomainExtension(product, suggestion)
                                }"
                              />
                            </div>
                          </div>
                        </div>
                        </div>
                    </template>
                  <!--</q-scroll-area>-->
                </div>

              </div>
            </q-card-section>
          </q-card>

        </q-dialog>


      </div>


      <!-- domain check-->
      <div class="
          md:tw-flex
          md:tw-justify-between
          md:tw-gap-5">
        <div>
          <!-- frecuency -->
          <q-select
            v-if="productsHelper.hasFrencuency(product) || product?.frecuency"
            v-model="product.frecuency"
            :options="getFrecuencyOptions(product)"
            @update:model-value="updateDomainPrice(product)"
            option-value="value"
            option-label="label"
            outlined
            class="tw-w-52 tw-mb-1 tw-rounded-lg"
            input-class="tw-w-52 tw-mb-1 tw-rounded-lg"
            label="Periodo"
          />

          <span
            v-if="productsHelper.hasFrencuency(product) || product?.frecuency"
            class="tw-text-xs tw-text-[#818181]"
            >
            {{ getRenewLabel(product) }}
          </span>
          <!-- free domain -->
          <div class="tw-mt-5" v-if="isDomainNameFree(product)">
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
        <div
          class="
            md:tw-flex
            md:tw-items-start
            md:tw-gap-[30px]
            tw-text-[#444444]"

        >
          <div
            class="
              md:tw-flex
              md:tw-flex-col
              md:tw-pr-0
              tw-pr-4
              tw-flex
              tw-align-middle
              tw-justify-between
              tw-py-1.5
              ">
            <span class="tw-text-[13px]">Tarifa de configuración:&nbsp;</span>
            <span class="tw-text-lg tw-font-semibold"> {{ productsHelper.priceWithSymbol(0, cartState.currency) }}</span>
          </div>

          <div class="
              tw-flex
              tw-align-middle
              tw-justify-end
              tw-items-center
              tw-p-2

            ">
            <div class="
                tw-px-4
                tw-py-1.5
                tw-rounded-full
                tw-border
                tw-border-[#00000033]
                ">
              <span class="tw-text-lg tw-font-semibold">{{ productsHelper.priceWithSymbol(product.price, cartState.currency) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  <!-- captcha -->
    <ClientOnly>
      <div v-if="showCaptcha" >
        <captchaComponent
          ref="captchaRef"
        />
      </div>
    </ClientOnly>
  </div>
  

</template>


<script lang="ts" setup>

import productsHelper from '../../helpers/products';
import apiRoutes from '../../config/apiRoutes.js';
import constants from '../../config/constants.js';
import { useStorage, useCloned  } from '@vueuse/core'
import moment from 'moment';
import _ from 'lodash';
import captchaComponent from '../../../iauth/components/captcha.vue'

const route = useRoute()

const token = ref(null)

const captchaRef = ref('captchaRef')

const props = defineProps({
  product: {
    type: Object,
    required: false
  }, 
  domainPricing: {
    type: Array,
    required: false
  }
  
})


const { locale, locales, setLocale, t } = useI18n()


const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
})

  
 /*
 const cartState = useState('icommerce.shoppingCart', () => {
  return {
    products: [],
	  currency: 'COP'
  }
 })
  */
 



/*
const cartState = ref({
	products: [],
	currency: 'COP'
})
  */





const emits = defineEmits(['subtotal', 'discount', 'emptyCart'])

const domainPricing = ref(props.domainPricing)
const alertRef = ref('alertRef')
const alertParams = ref({})
//captcha could not be validated with computed due call overflow
const showCaptcha = ref(null)
///const someIsDomainNameRequired = computed(() => cartState.value.products.some((product) => isDomainNameRequired(product)) || false )


const domainActions =  [
	{
		label: 'Registrar un nuevo dominio',
    placeholder: 'Encuentra tu dominio',
		value: 'register'
	},

	{
		label: 'Transferir mi dominio ',
		placeholder: 'www.tudominio.com',
		value: 'transfer'
	},

	{
		label: 'Ya tengo dominio',
		placeholder: 'www.tudominio.com',
		value: 'owndomain'
	},
]

//onBeforeMount( () => init() )

/*
onMounted(() => {
  init()
})
  */
/*
watch(
  () => cartState.value.products,
  (newQuery, oldQuery) => {
    //configProducts()
  },
)*/
/*
watch(
  () => cartState.value.currency,
  (newQuery, oldQuery) => {
    init()
  },
)
  */

  init()





async function init() {
  const urlOptions =  {
		action: route?.query?.a || null,
		pid: route?.query?.pid || null,
		billingcycle: route?.query?.billingcycle || null,
		promocode: route?.query?.promocode || null
	}
  
  if(urlOptions.pid && urlOptions.action ){
    const product  = props.product  
  

    if(productsHelper.hasFrencuency(product)){
				let billingcycle = 0
  
				const options = productsHelper.getFrecuencyOptions(product).map((element, index) => {          
					if(urlOptions?.billingcycle){
						const tempBillingcycle = Array.isArray(urlOptions.billingcycle) ? urlOptions.billingcycle[urlOptions.billingcycle.length-1 ] : urlOptions.billingcycle
						if(tempBillingcycle.toLowerCase() == element.label.toLowerCase()){
							billingcycle = index
						}
					}
					element.frecuency = element.label
					element.label =  t(productsHelper.translateFrecuencyOptionLabel(element.label))
					return element
       			});
				if(options.length) product.frecuency = options[billingcycle]
    }
    cartState.value.products = []
    cartState.value.products.push(product)
  } 
    configProducts()
    loadCaptcha()
    
}


function loadCaptcha(){       
  showCaptcha.value = cartState.value.products.length ? (cartState.value.products.some((product) => isDomainNameRequired(product)) || false ) : false
}

function disableCheckButton(product){
  const regex = /^[a-zA-Z0-9.-]+$/;
  const domainName = product.domainCheck.domainName
  let result = false

  if(domainName == '' || domainName == null) return true
  if(domainName.includes('.')){
    const domains = props.domainPricing.map((domain) => domain.ext )
    result = !domains.some(ext => domainName.endsWith(ext));
  }
  return !regex.test(domainName) || result
}

async function getDomainPricing(){
    await $fetch(apiRoutes.domainPricing).then((response) => {
        const pricingList =  JSON.parse(response)
        props.domainPricing = Object.keys(pricingList).map(x => { return { ext: x, ...pricingList[x] } })
    })
}



function isSupportedDomain(product, value){
  if(!value.includes('.')) return true
  const domains = props.domainPricing.map((domain) => domain.ext )
  const result = domains.some(ext => value.endsWith(ext));

  if(product.domainCheck.action.value != domainActions[0].value){
    product.domain.domainName = result ? value : null
  }
  return result || 'dominio no soportado'
}


/*keys: ext , domainregister , domaintransfer, domainrenew */
function getExtPrice(ext){
    return domainPricing?.value.find(x => x.ext ==  `.${ext}`) || 0
}




function configProducts() {
  try {
    cartState.value.products.forEach((product) => {

    product.price = product?.price || productsHelper.getPrice(product, cartState.value.currency)
    if (productsHelper.hasFrencuency(product)) {
      const options = productsHelper.getFrecuencyOptions(product)

      if (options.length && !product?.frecuency) {
        product.frecuency = options[0]
      }

    }
    if (isDomainNameRequired(product)) {

      if(!product?.domain?.domainName) {
        product.domain = {
          domainName: null,
          action: null,
					transferCode: null,
          price: 0,
          ext: null
        }
      }

      product.domainCheck = {
        action:  product.domain.action ||  domainActions[0], // register, trasfer
        domainName: product.domain.domainName,
        exactMatch: null,
        results: [],
        suggestions: [],
        loading: false,
				modal: false,
      }

      product.domain.action = product.domainCheck.action
    }
    getDiscount(product)
    updateDomainPrice(product)
    
  })

    //calcSubtotal()
  } catch (error){    
      cartState.value.products = []
      console.error(error

    )
  }
}

function removeProduct(product) {

  const message =  product?.category ? `¿Eliminar ${product.name} - ${product.category.title || '' }?` :  `¿Eliminar ${product.name} ${product.domain?.domainName || '' }?`

  alertParams.value = {
    //icon: 'fas fa-cloud-download-alt',
    title: `Eliminar del carrito`,
    message,
    color: 'white',
    actions: [
      {
        label: 'Cancelar',
        icon: '',
        handler: () => {
          alertParams.value = {}
          alertRef.value.hide()
        }        
      },
      {
        label: 'Eliminar',
        icon: '',
        color: 'red',        
        handler: () => {
          const toDelete = cartState.value.products.find(obj => obj.id == product.id);
          let products = []
          
          if(!toDelete?.category){ //if is a aditional domain
            products = cartState.value.products.filter(obj => obj.id != product.id);    
          }
          
          cartState.value = { products: products, currency: cartState.value.currency }
          if (cartState.value.products.length == 0) {
            loadCaptcha()
            emits('emptyCart', null)
            // router.push({ path: getPath('icommerce.products') })
          }
        }        
      },
    ],
  };
  alertRef.value.show()
}

function updateDomainPrice(product){

  product.price = product.frecuency.value //update with frecuency

  let domainPrice = {
    domainrenew: 0,
    domainregister: 0,
    domaintransfer: 0
  }

  if(isDomainNameRequired(product)){

  //register
  if(product.domainCheck.action.value == domainActions[0].value){
    if(product.domain.ext) domainPrice = getExtPrice(product.domain.ext) //get price from selected domain
  } else {
    if(product.domainCheck.domainName){
      if(product.domainCheck.domainName.includes('.')) domainPrice = getExtPrice(extractDomainExtension(product.domainCheck.domainName)) //get ext price  from transfer input
    }
  }

  //default configuracion price is $0
  let actionPrice = 0
  if(product.domainCheck.action.value == domainActions[0].value && domainPrice) actionPrice = domainPrice.domainregister //register price
  if(product.domainCheck.action.value == domainActions[1].value && domainPrice) actionPrice = domainPrice.domaintransfer  //transfer price


  if(isDomainNameRequired(product)){
    const frecuency = getFrecuencyFromLabel(product.frecuency.label)

    //free domain afther 12 months
    if(frecuency >= 12 && isDomainNameFree(product)){
      product.price = product.frecuency.value
    } else {
      let renewPrice = 0
      //aplly renew
      if(frecuency > 12){ //renew cost every year
        const years = ( frecuency / 12) - 1 //renovation per year - first year
        if(domainPrice.domainrenew){
          renewPrice = domainPrice.domainrenew * years
        }
      }

      product.price = product.price + actionPrice + renewPrice
    }

  }
  }
  getDiscount(product)


  //calcSubtotal()
}

function extractDomainExtension(url) {
  const match = url.match(/^(?:https?:\/\/)?(?:www\.)?(?:[\w-]+\.)+((?:[\w-]+\.)?[\w-]+)(?:[\/?#:]|$)/i);
  return match ? match[1].toLowerCase() : null;
}

function isDomainNameRequired(product) {
  const domainCategories = constants.cagtegories.domainNameRequired
  return domainCategories.includes(product?.category?.id) || false
}

function isDomainNameFree(product) {
  const domainCategories = constants.cagtegories.dominNameFree
  return domainCategories.includes(product?.category?.id) || false
}

function checkDomainKeyDown(event, product){

  if(!product.domainCheck.domainName) return
  if(product.domainCheck.action.value == domainActions[0].value) {
    if(event.key == 'Enter'){
      checkDomain(product)
    }
  }
}

async function checkDomain(product) {    
  product.domainCheck.loading = true
    product.domainCheck.exactMatch = false
    product.domainCheck.results =  []
    product.domainCheck.suggestions = []

    await getCaptcha()    
    if(token.value && product.domainCheck.domainName ){
      product.domainCheck.modal = true
      const lang = locale.value == 'es' ? 'esp' : 'eng'
		  const domain = product.domainCheck.domainName.trim()

      const body = {
        token: token.value.token,
        domain,
        lang,
        ext: ''
      }
      
      await $fetch(apiRoutes.domainCheck, {
        method: 'POST',
        body
      }).then(response => {
          product.domainCheck.exactMatch = response?.exactMatch || false
          if(product.domainCheck.exactMatch){
            product.domainCheck.exactMatch.disableButton = false
          }

          product.domainCheck.results = response?.results?.filter(x => x.isAvailable == true) || []
          product.domainCheck.results.map(element => {
            return {...element, disableButton: false }
          });

          product.domainCheck.suggestions = response?.suggestions || []
          product.domainCheck.suggestion.map(element => {
            return {...element, disableButton: false }
          });
      }).catch(e => {});
    }
    
    token.value = null
    product.domainCheck.loading = false
}


function getFrecuencyOptions(product){
    if(product?.frecuencyOptions?.length) return product?.frecuencyOptions

    const options = productsHelper.getFrecuencyOptions(product).map(element => {
        element.frecuency = element.label
        element.label = t(productsHelper.translateFrecuencyOptionLabel(element.label))
        return element
    });

    /*sort the options by number of months */
    const sorted = options.sort((a, b) => {
      const numA = parseInt(a.label.match(/\d+/)[0], 10);
      const numB = parseInt(b.label.match(/\d+/)[0], 10);
      return numA - numB;
    });

  return sorted
}

function getFrecuencyFromLabel(label){
  return parseInt(label.match(/\d+/)[0], 10)
}

function calcRenovationDate(label){
  const months = getFrecuencyFromLabel(label)
  return moment().add(months, 'months').format('DD/MM/YYYY')
}

function getDiscount(product){

  product.discount  = {
    percent: 0,
    priceByMonths: 0,
    value: 0
  }

 

    const months = getFrecuencyFromLabel(product.frecuency.label)
    const monthlyPrice = getFrecuencyOptions(product).find(x => x.frecuency == 'Monthly') ||  getFrecuencyOptions(product)[0]

 
    const priceByMonths = product?.category ? monthlyPrice.value * months : monthlyPrice.value
    const value = product?.category ? (priceByMonths - product.frecuency.value) : 0
    const percent = product?.category ?  Math.round((value / priceByMonths) * 100) : 0; 

    product.discount  = {
      percent,
      priceByMonths,
      value
    }
  //}
  return product.discount
}

function selectDomain(product, selectedDomain){
    product.domain.domainName = selectedDomain.name
    product.domain.ext = selectedDomain.ext

    const domainPrice = getExtPrice(selectedDomain.ext)?.domainregister || 0

    if(domainPrice) product.domain.price = domainPrice
    updateDomainPrice(product)

    Notify.create({
			message: `Seleccionaste ${selectedDomain.name} `,
			type: 'positive',
      timeout: 2000
		})
    //calcSubtotal()
}

function selectDomainLabel(product){
  return product?.domain?.domainName ? 'Agregar' : 'Seleccionar'
}


function addDomainExtension(product, extension){
  if(!product?.domain?.domainName){
    selectDomain(product, extension)
		//calcSubtotal()
    return
  }

    const cloned = {}// _.clone(product)
    cloned.optionsPivot = _.clone(product.optionsPivot)
    cloned.frecuency = _.clone(product.frecuency)

    cloned.id = extension.name
    cloned.name = 'Dominio adicional'
    cloned.category = null


    cloned.domain = {
      domainName: null,
      action: domainActions[0],
      transferCode: null,
      price: 0,
      ext: null
    }

    cloned.domainCheck = {
        action:  domainActions[0], // register,
        domainName: null,
        exactMatch: null,
        results: [],
        suggestions: [],
        loading: false,
				modal: false,
    }

    cloned.domain.domainName = `${extension.name}`
    cloned.domain.price = getExtPrice(extension.ext)?.domainregister || 0
    cloned.domain.ext = extension.ext

    cloned.frecuencyOptions = null
    const frecuencyOptions = _.clone(getFrecuencyOptions(product));
    //map new frecuency values for aditional domain
    cloned.frecuencyOptions = frecuencyOptions.map(element => {
      const frecuency = getFrecuencyFromLabel(element.label)
      let renewPrice = 0
      if(frecuency > 12){
          const years = ( frecuency / 12) - 1 //renovation per year - first year
          renewPrice = getExtPrice(extension.ext)?.domainrenew * years
      }
        return {
          enable: (frecuency >= 12),
          //id: frecuency,
          label: element.label,
          frecuency: element.frecuency,
          value: cloned.domain.price + renewPrice
        }
    })

    cloned.frecuencyOptions = cloned.frecuencyOptions.filter(x => x.enable) //remove options lower than 12 months

    let selectedFrecuency = cloned.frecuencyOptions.find(x => x.frecuency == cloned.frecuency.frecuency) || cloned.frecuencyOptions[0]
    cloned.frecuency = selectedFrecuency
    cloned.price = selectedFrecuency.value
    getDiscount(cloned)

    cartState.value.products.push(cloned)

    Notify.create({
			message: `Agregaste ${extension.name} al carrito!`,
			type: 'positive',
		})

    //calcSubtotal()
}

async function getCaptcha() {
  try {
    await captchaRef.value.getToken().then((response) => {
      token.value = response
    })
  } catch (error) {
    console.error(error)
  }
}


function getRenewLabel(product){
  
  const prices = {
    '523': '139000',
    '524': '189000',
    '525': '239000'
  }

  const price = prices[product.id] || product.price
  return `Renuevas a ${productsHelper.valueWithSymbol(price, cartState.currency)} el  ${ calcRenovationDate(product.frecuency.label) } ¡Cancela cuando quieras!`

}

</script>

<style>
.my-hover-card:hover {
  box-shadow: 0 4px 20px #d5dfff;
  transition: box-shadow 0.3s ease;
}

.q-dialog__inner--minimized > div {
  max-width: 100vw !important;
}


</style>