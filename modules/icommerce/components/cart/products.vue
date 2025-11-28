<template>
  <div
    class="
      xl:tw-w-[800px]
      lg:tw-w-[600px]
      lg:tw-mx-4
      tw-w-auto
      lg:tw-min-h-[70vh]
    "
  >
    <div v-for="(product, index) in cartState.products" :key="product.name"
      class="
        tw-bg-white
        tw-border-[1px]
        tw-border-[#d8dae0]
        tw-rounded-[20px]
        tw-px-5
        tw-pb-5
        tw-my-5

      "
    >
      <!-- PRODUCT TITLE -->
      <div
        class="
          tw-flex
          tw-justify-between
          tw-items-center
        "
      >
        <!--- domain name -->
        <div
          v-if="product?.domain?.domainName"
          class="tw-mt-4"
        >
          <span
            class="
              tw-font-semibold
              tw-text-[22px]
              tw-w-full
            "
            >
            <span style="word-break: break-word;">
              {{  product?.domain?.domainName }}
            </span>
          </span>
        </div>

        <!-- delete button -->
        <q-btn
          v-if="!product?.category"
          icon="fa-regular fa-trash-can"
          text-color="primary"
          size="sm"
          round
          flat
          @click="removeProduct(product)"
        />
      </div>
      <!-- product name -->
      <div
        :class="
          product?.domain?.domainName ?
          'tw-text-[18px] tw-text-[#818181]' :
          'tw-font-semibold tw-text-[22px] tw-mt-4'
        "
      >
        <span>
          {{ product.name}}
        </span>

      </div>
      <!-- category -->
      <div
        v-if="product?.category"
        class="
          tw-flex
          tw-justify-between
          tw-items-center
        "
      >
        <span class="tw-text-[18px] tw-text-[#818181]">
          {{ product.category.title}}
        </span>
      </div>
      <q-separator
       class="tw-my-2"
      />

      <!-- frecuency -->
      <div
        class="
          tw-my-4
          md:tw-flex
          md:tw-justify-between
          md:tw-gap-5
        "
      >
        <div>

          <q-select
            v-if="productsHelper.hasFrencuency(product) || product?.frecuency"
            v-model="product.frecuency"
            :disable="index == 1"
            :options="getFrecuencyOptions(product)"
            @update:model-value="updateDomainPrice()"
            option-value="value"
            option-label="label"
            outlined
            class="tw-w-52 tw-mb-2 tw-rounded-lg"
            input-class="tw-w-52 tw-mb-1 tw-rounded-lg"
            label="Periodo"
          />

          <span
            v-if="productsHelper.hasFrencuency(product) || product?.frecuency"
            class="
              tw-text-xs
              tw-text-[#818181]
            "
          >
            {{ getRenewLabel(product) }}
          </span>

        </div>
        <div
          class="
            md:tw-flex
            md:tw-items-start
            md:tw-gap-[30px]
            tw-text-[#444444]
          "
        >


          <div
            v-if="!isMainDomainFree(index)"
            class="
              md:tw-flex
              md:tw-flex-col
              md:tw-pr-0
              tw-pr-4
              tw-flex
              tw-align-middle
              tw-justify-between
              tw-py-1.5
            "
          >
            <span class="tw-text-[13px]">
              Tarifa de configuración:&nbsp;
            </span>
            <span class="tw-text-lg tw-font-semibold">
              {{ productsHelper.priceWithSymbol(0, cartState.currency) }}
            </span>
          </div>


          <div
            class="
              tw-flex
              tw-align-middle
              tw-justify-end
              tw-items-center
              tw-p-2
            "
          >
            <div
              class="
                tw-px-4
                tw-py-1.5
                tw-rounded-full
                tw-border
              "
              :class="isMainDomainFree(index) ? 'tw-border-green-400' : 'tw-border-[#00000033]'"
            >
              <span
                v-if="isMainDomainFree(index) && getFrecuencyFromLabel(mainProduct?.frecuency.label) == 12"
                class="tw-mx-2 tw-text-[15px] tw-font-[600]"
              >
                ¡Obtienes 1 año gratis!
              </span>

              <span
                v-if="isMainDomainFree(index) && getFrecuencyFromLabel(mainProduct?.frecuency.label) > 12"
                class="tw-mx-2 tw-text-[15px] tw-font-[600]"
              >
                ¡Obtienes {{ mainProduct?.frecuency.label }} gratis!
                <i class="fa-regular fa-circle-question tw-text-[16px]">
                  <q-tooltip class="bg-red" :offset="[10, 10]">
                    <div class="tw-w-[240px] tw-text-[14px] tw-p-[2px]">
                      Después del primer año, tu dominio se renovará totalmente gratis mientras mantengas activo el plan de hosting.
                    </div>
                  </q-tooltip>
                </i>
              </span>

              <span
                class="tw-text-lg tw-font-semibold"
                :class="isMainDomainFree(index) ? 'tw-line-through tw-text-primary' : '' "
              >
                {{ productsHelper.priceWithSymbol(product.price, cartState.currency) }}
              </span>
            </div>
          </div>
        </div>

      </div>
      <!-- free domain -->
      <div
        v-if="isDomainNameFree(product)"
        class="tw-mt-5"
      >        
        <div
          class="
            tw-py-2.5
            tw-px-3.5
            tw-rounded-md
            tw-w-full
            tw-text-[13px]
          "
          :class="isTweelveMonths() ? 'tw-bg-[#def4f0]' : 'tw-bg-[#FFAB404D]' "
        >
          <span class="tw-text-[#444444] tw-font-[700]">
            {{ freeDomainLabel(index) }}
            <i class="fa-regular fa-circle-question tw-text-[16px]">
              <q-tooltip class="bg-red" :offset="[10, 10]">
                <div class="tw-w-[240px] tw-text-[14px] tw-p-[2px]">
                  Obtén un dominio gratis al contratar un plan de 1 año o más. Elige entre .{{ constants.freeExtensions.join(', .') }}.
                  Después del primer año, tu dominio se renovará totalmente gratis mientras mantengas activo el plan de hosting.
                </div>
              </q-tooltip>
            </i>
          </span>
        </div>
      </div>
    </div>

    <!-- domain check -->
    <div
      v-if="isDomainNameRequired(mainProduct) && showDomainSearch"
      class="
      tw-bg-white
        tw-border-[1px]
        tw-border-[#d8dae0]
        tw-rounded-[20px]
        tw-p-2
      "
    >
      <div class="tw-p-4">
        <div>
          <span class="tw-text-[20px] tw-font-[700]">
            <i class="fa fa-globe tw-text-primary"/> &nbsp;Todo sitio web necesita un dominio
          </span>
        </div>
        <div class="tw-py-2">
          <p>Obtén tu dominio ya mismo y publica tu sitio web más rápidamente</p>
        </div>
        <div
          class="
            md:tw-flex
            tw-justify-center
            tw-w-full
          "
        >
          <!-- input for register domain -->
          <q-input
            v-model="mainProduct.domainCheck.domainName"
            @update:model-value="(val) => {
              mainProduct.domainCheck.domainName = val.replace(/[^a-zA-Z0-9.-]/g, '') // remove invalid chars
              updateDomainName(mainProduct, mainProduct.domainCheck.domainName)
            }"
            debounce="600"
            :placeholder="mainProduct.domainCheck.action.placeholder"
            :rules="[
              //(val) => (val === null || val === undefined || val === '') || val.length > 2 || 'El dominio debe de tener 3 o más caracteres',
              (val) => !/\s/.test(val) || 'El dominio no debe contener espacios',
              (val) => isSupportedDomain(product, val)
            ]"
            class="tw-w-full"
            color="light-blue-7"
            outlined
            autofocus
            no-error-icon
            hide-bottom-space
           @focus="showResults = true"
           :loading="domainSearchLoading"

          >
            <template v-slot:prepend>
              <q-icon
                name="search"
              />
            </template>
          </q-input>
        </div>
        <!-- results --->
        <div
          v-if="showResults && results.length"
          class="
            tw-mt-[4px]
            tw-bg-white
            tw-border-[1px]
            tw-border-[#d8dae0]
            tw-rounded-[8px]
          "
        >
          <q-virtual-scroll
            style="max-height: 200px;"
            :items="results"
            v-slot="{ item, index }"
            class="scrollable"
          >
            <!--- isAvailable --->
            <q-item
              v-if="item.isAvailable"
              :key="index.ext"
              clickable
              v-ripple
              class="hover:tw-bg-sky-100 tw-transition-colors tw-duration-200"
              @click="() => {
                showDomainSearch = false
                addDomainExtension(item)
              }"
            >
              <q-item-section>
                <div class="tw-justify-between tw-align-middle tw-w-full"
                  :class="mainProduct.domainCheck.domainName.length >= 30 ? 'tw-flex-col-1 xl:tw-flex' : 'md:tw-flex'"
                >
                  <div class="tw-break-words tw-flex tw-items-center">
                    <span class="tw-text-[17px] tw-font-[500]">
                      {{ item.name }} 
                    </span>
                  </div>
                  <div v-if="isAfreeResult(item.ext)"
                    :class="mainProduct.domainCheck.domainName.length >= 30 ? 'tw-flex-col-1 xl:tw-flex' : 'md:tw-flex'"
                    class="tw-align-middle tw-items-center"
                  >

                      <div class="tw-bg-[#def4f0] tw-px-2 tw-py-1 tw-my-2 tw-rounded-xl">                   
                        <span class="tw-text-[16px] tw-font-[600]">
                          Gratis
                        </span>

                        <span class="tw-text-[16px] tw-font-[500] tw-mx-1">
                          {{ productsHelper.priceWithSymbol(0, cartState.currency) }}/primer año
                        </span>
                      </div>

                      <span class="tw-line-through tw-text-[15px] tw-font-[400] tw-text-[#818181] tw-mx-1">
                        {{  productsHelper.priceWithSymbol(getExtPrice(item.ext).domainregister, cartState.currency) }}
                      </span>

                  </div>
                  <div v-else>
                    <span class="tw-text-[17px] tw-font-[500]">
                        {{  productsHelper.priceWithSymbol(getExtPrice(item.ext).domainregister, cartState.currency) }}/primer año
                    </span>
                  </div>
                </div>
              </q-item-section>
            </q-item>

            <q-item
              v-else
              :key="index.name"
            >
              <q-item-section>
                <div class="tw-flex tw-justify-between">
                  <div class="tw-break-words">
                    <span class="tw-text-[18px] tw-font-[500] tw-text-[#818181]">
                        {{ item.name }}
                    </span>
                  </div>
                  <div>
                    <span class="tw-text-[15px] tw-font-[600] tw-text-[#818181]">
                        NO DISPONIBLE
                    </span>
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <q-separator
              class="tw-my-2 sm:tw-hidden" 
            />
          </q-virtual-scroll>
        </div>
      </div>
      <!-- captcha -->
      <div
        class="tw-my-2 tw-px-4"
      >
        <captchaComponent
          ref="captchaRef"
        />
      </div>
    </div>




   <!--extension cards -->
    <div
      v-if="results.length != 0 && showSuggestions"
      class="
        tw-my-8
        tw-w-full
        xl:tw-w-[800px]
        lg:tw-w-[600px]
        md:tw-w-full
      "
    >
      <span class="tw-text-[20px] tw-font-bold">Protege tu marca:&nbsp;</span>
      <p>Proteja estas extensiones de dominio populares para mantener a los competidores alejados de su nombre</p>

      <q-scroll-area
        visible
        class="
          tw-my-4
          tw-h-[160px]
          tw-w-auto
        "
      >
        <div
          class="
            tw-flex
            tw-gap-x-4
            tw-justify-center
            lg:tw-justify-start
            tw-items-center
            "
          >
          <template v-for="result in results">
            <div
              v-if="result.isAvailable"
              class="
                tw-w-[168px]
                tw-rounded-[10px]
                tw-border-[1px]
                tw-border-[#d5dfff]
                tw-bg-white
                tw-p-4
                tw-cursor-pointer
                my-hover-card
              "
            >
              <div>
                <span class="tw-text-[20px] tw-font-[600] tw-text-primary">
                    .{{ result.ext }}
                </span>
              </div>
              <div>
                <span class="tw-text-[16px] tw-font-[600]">
                    {{  productsHelper.priceWithSymbol(getExtPrice(result.ext).domainregister, cartState.currency) }}
                </span>
              </div>
              <q-btn
                label="Añadir"
                color="primary"
                rounded
                outline
                no-caps
                unelevated
                class="
                  tw-w-full
                  tw-justify-center
                  tw-font-bold
                  tw-rounded-lg
                  tw-my-2
                "
                @click="addDomainExtension(result)"
              />
          </div>
          </template>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import productsHelper from '../../helpers/products';
import apiRoutes from '../../config/apiRoutes.js';
import moment from 'moment';
import _ from 'lodash';
import captchaComponent from '../../../iauth/components/captcha.vue'
import adminRules from '~/plugins/adminRules';

const constants = adminRules()

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
const cartState = useState('icommerce.cart', () => {
	return {
		products: [],
		currency: 'COP'
	}
})

const cartStateStorage = useStorage('icommerce.cart', {
	products: [],
	currency: 'COP'
})


const emits = defineEmits(['subtotal', 'discount', 'emptyCart'])

const domainPricing = ref(props.domainPricing)
const mainProduct = computed(() =>  cartState.value?.products[0] || cartStateStorage.value?.products[0] || null)
const mainDomain = computed(() =>  cartState.value?.products[1] || cartStateStorage.value?.products[1] || null)


const results = ref([])
const bkResults = ref([])
const showResults = ref(false)
const showDomainSearch = ref(false)
const domainSearchLoading = ref(false)
const suggestions = ref([])
const showSuggestions = ref(false)

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

const urlOptions =  {
  action: route?.query?.a || null,
  pid: route?.query?.pid || null,
  billingcycle: route?.query?.billingcycle || null,
  promocode: route?.query?.promocode || null
}

init()


onMounted(() => {
})

async function init() {
  if(urlOptions.pid && urlOptions.action == 'add'){
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
  await configProducts()
}

async function loadDomainSearch(){
  if(mainDomain.value){
    if(mainDomain.value.domain.domainName){
      showDomainSearch.value = false
    }
  } else {
    showDomainSearch.value = true
  }
}

function disableSearch(product){
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

function isSupportedDomain(product, value){
  if(!value) return
  if(!value?.includes('.')) return true
  const domains = props.domainPricing.map((domain) => domain.ext )
  const result = domains.some(ext => value.endsWith(ext));
  return result || 'dominio no soportado'
}

/*keys: ext , domainregister , domaintransfer, domainrenew */
function getExtPrice(ext){
  return domainPricing?.value.find(x => x.ext ==  `.${ext}`) || 0
}

async function configProducts() {
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

        }

        product.domain.action = product.domainCheck.action
      }
      getDiscount(product)
    })
    await loadDomainSearch()
    await updateDomainPrice()
  } catch (error){
    cartState.value.products = []
    console.error(error)
  }
}


function resetDomainSearch(products){
  //restore the search
  if(products.length <= 1 ){
    mainProduct.value.domainCheck.domainName = null
    results.value =[]
    showDomainSearch.value = true
  }
}

function removeProduct(product) {

  const toDelete = cartState.value.products.find(obj => obj.id == product.id);
  let products = []

  if(!toDelete?.category){ //if is a aditional domain
    products = cartState.value.products.filter(obj => obj.id != product.id);
    const itemToRestore = bkResults.value.find(x =>  x.name == product.domain.domainName) || false
    if(itemToRestore){
      results.value.unshift(itemToRestore)
    }

    resetDomainSearch(products)

    cartState.value = { products: products, currency: cartState.value.currency }
    cartStateStorage.value.products = cartState.value.products

    if (cartState.value.products.length == 0) {
      loadDomainSearch()
      emits('emptyCart', null)
      // router.push({ path: getPath('icommerce.products') })
    }
  }
  updateDomainPrice()
}


async function updateDomainPrice(){

  cartState.value.products.forEach((product) => {

    if(mainDomain.value){
      const tempfrecuency = getFrecuencyOptions(mainDomain.value).find(x => x.frecuency == mainProduct.value.frecuency.frecuency) || false
      if(tempfrecuency){
        if(getFrecuencyFromLabel(tempfrecuency.label) >= 12 ){
          mainDomain.value.frecuency = tempfrecuency
        }
      } else {
        mainDomain.value.frecuency = getFrecuencyOptions(mainDomain.value)[0]
      }
    }

    if(isFreeExtension() && isDomainNameFree(mainProduct.value)) {
      mainDomain.value.price = 0
      if(product.domain.domainName == mainDomain.value.domain.domainName){
        return false
      }
    }

    product.price = product.frecuency.value //update with frecuency

    let domainPrice = {
      domainrenew: 0,
      domainregister: 0,
      domaintransfer: 0
    }

    if(isDomainNameRequired(mainProduct.value)){
      //register
      if(mainProduct.value.domainCheck.action.value == domainActions[0].value){
        if(product.domain.ext) domainPrice = getExtPrice(product.domain.ext) //get price from selected domain
      } else {
        if(product.domainCheck.domainName){
          if(product.domainCheck.domainName.includes('.')) domainPrice = getExtPrice(extractDomainExtension(product.domainCheck.domainName)) //get ext price  from transfer input
        }
      }

      //default configuracion price is $0
      let actionPrice = 0
      if(mainProduct.value.domainCheck.action.value == domainActions[0].value && domainPrice) actionPrice = domainPrice.domainregister //register price
      if(mainProduct.value.domainCheck.action.value == domainActions[1].value && domainPrice) actionPrice = domainPrice.domaintransfer  //transfer price


      if(isDomainNameRequired(product)){
        const frecuency = getFrecuencyFromLabel(product.frecuency.label)

        //free domain afther 12 months
        if(isDomainNameFree(mainProduct) ){
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
  })
}

function extractDomainExtension(url) {
  const match = url.match(/^(?:https?:\/\/)?(?:www\.)?(?:[\w-]+\.)+((?:[\w-]+\.)?[\w-]+)(?:[\/?#:]|$)/i);
  return match ? match[1].toLowerCase() : null;
}

function isDomainNameRequired(product) {
  const domainCategories = constants.categories.domainNameRequired
  return domainCategories.includes(product?.category?.id) || false
}

function isDomainNameFree(product) {
  const domainCategories = constants.categories.domainNameFree
  return domainCategories.includes(product?.category?.id) || false
}

function freeDomainLabel(idx){
 return isTweelveMonths() ? 'Buenas noticias. Obtén (1) dominio GRATIS con este pedido.' : '¿Quieres un dominio gratis? Elige un plan de 12 meses o más.'
}

function isFreeExtension(){

  if(!isDomainNameFree(mainProduct.value))  return false
  if(!mainProduct.value?.frecuency) return false
  const frecuency = getFrecuencyFromLabel(mainProduct.value?.frecuency.label) >= 12 || false
  return constants.freeExtensions.includes(mainDomain.value?.domain.ext) && frecuency || false
}

function isMainDomainFree(idx){
  return idx == 1 && isFreeExtension()
}

function isTweelveMonths(){
  if(!mainProduct.value?.frecuency) return false
  return getFrecuencyFromLabel(mainProduct.value?.frecuency.label) >= 12 || false
}

function isAfreeResult(ext){
  return (constants.freeExtensions.includes(ext) && isTweelveMonths() )|| false
}


function updateDomainName(product, val ){
  let newValue = val.replace(/\s+/g, "")

  if(!newValue){
    results.value = []
    return
  }

  if(newValue.length > 3){
    if(!disableSearch(product)){
      product.domainCheck.domainName = newValue
      checkDomain(product)
      updateDomainPrice()
    }
  }
}

async function checkDomain(product) {

  results.value = []
  suggestions.value = []

  await getCaptcha()

  if(token.value && product.domainCheck.domainName ){

    domainSearchLoading.value = true
    const lang = locale.value == 'es' ? 'esp' : 'eng'
    const domain = product.domainCheck.domainName.trim()

    try {
      gtag('event', 'view_search_results', {
        search_term: domain
      });
    } catch (e) {
      console.log(e)
    }

    


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
      domainSearchLoading.value = false

      let tempResults = []
      if(response?.exactMatch){
        tempResults.push(response.exactMatch)
      }

      tempResults = [...tempResults, ...response?.results]

      results.value = []
      //results.value = tempResults.filter(x => x.isAvailable == true)
      results.value = tempResults.map(element => {
            element.name = element.name.toLowerCase()
            return element
      }) || [];

      bkResults.value = results.value

    }).catch(e => {});
  }
  token.value = null
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

  product.discount = {
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
  return product.discount
}

async function verifySuggestion(domainName){
  return true
  await getCaptcha()
  if(token.value){
    const lang = locale.value == 'es' ? 'esp' : 'eng'
    const domain = domainName

    const body = {
      token: token.value.token,
      domain,
      lang,
      ext: ''
    }

    const response = await $fetch(apiRoutes.verifySuggestion, {
      method: 'POST',
      body
    })

    if(!response) {
      //removes from suggestion list if isn't available
      cartState.value.products.forEach(product => {
        results.value = results.value.filter(x => x.name != domainName)
        suggestions.value = suggestions.value.filter(x => x.name != domainName)
      });

    }
    return response
  }
}

async function addDomainExtension(extension){

  const isAvailable = await verifySuggestion(extension.name)

  if(isAvailable){
    const cloned = {}// _.clone(product)
    cloned.optionsPivot = _.clone(mainProduct.value.optionsPivot)
    cloned.frecuency = _.clone(mainProduct.value.frecuency)

    cloned.id = extension.name
    cloned.name = `Registro de dominio ${extension.ext}`
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
      domainName: null
    }

    cloned.domain.domainName = `${extension.name}`
    cloned.domain.price = getExtPrice(extension.ext)?.domainregister || 0
    cloned.domain.ext = extension.ext

    cloned.frecuencyOptions = null
    const frecuencyOptions = _.clone(getFrecuencyOptions(mainProduct.value));

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

    showSuggestions.value = true

    results.value = results.value.filter(x => x.name != extension.name)

    const items = [{
      item_id: `${mainProduct.value.id}`,

      item_name: `Registro de dominio ${extension.ext}`,
      item_category: mainProduct.value.category.title,
      item_brand: mainProduct.value.name,
      domain: `.${extension.name}`,
      ext: extension.ext,
      frecuency: mainProduct.value.frecuency.label,

      price: cloned.price,
      quantity: 1
    }]

    try {
      gtag('event', 'add_to_cart', {
        currency: cartState.value.currency,
        value: cloned.price,
        items: items
      })
    } catch (e) {
      console.log(e)
    }


    await updateDomainPrice()
    //showResults.value = false
    return true
  }

  return false
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

/* Works in WebKit browsers (Chrome, Edge, Safari) */
.scrollable::-webkit-scrollbar {
  width: 8px;
}

.scrollable::-webkit-scrollbar-track {
  background: transparent; /* or use var(--q-color-grey-2) */
}

.scrollable::-webkit-scrollbar-thumb {
  background-color: #d5dfff;
  border-radius: 4px;
}

.scrollable::-webkit-scrollbar-thumb:hover {
  background-color: #d5dfff;
}

/* Firefox */
.scrollable {
  scrollbar-width: thin;
  scrollbar-color: #d5dfff transparent;
  margin-right: 2px;
}





</style>