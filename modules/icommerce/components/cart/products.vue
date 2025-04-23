<template>
	{{ validateProducts }}
  <div v-for="product in cartState.products"
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
    <div class="tw-flex tw-justify-between tw-items-center tw-p-4">
      <h2 class="
            tw-font-semibold
            tw-text-[22px]
            tw-m-0
            tw-p-0
            tw-leading-5
          ">
        {{ product.name }} {{  product?.domain?.domainName }}
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
    <div v-if="isDomainProduct(product) && product?.domain" class="tw-py-6">

      <div class="md:tw-flex tw-justify-center tw-gap-4">

        <div>
						<q-select
							label="configura tu dominio"
							v-model="product.domainCheck.action"
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
						v-if="product.domainCheck.action.value == domainActions[0].value"
            v-model="product.domainCheck.domainName"
            placeholder="example.com"
            class="tw-w-full"
            outlined
            no-error-icon
            :rules="[
                (val) => !!val || 'Este campo es requerido.',
                (val) => val.length >= 3 || 'El dominio debe de tener 3 o más caracteres',
								(val) => !/\s/.test(val) || 'El dominio no debe contener espacios',
								//(val) => /^[A-Za-z0-9-]+$/.test(val) || 'Solo letras, números y guion medio (-)'
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
                    md:tw-w-[140px]
                    tw-rounded-md
                    tw-text-base
                "
                rounded
                no-caps
                unelevated
            />
          </template>
        </q-input>

				<!-- transfer domain -->
				<q-input
						v-if="product.domainCheck.action.value != domainActions[0].value"
            v-model="product.domain.domainName"
            :placeholder="product.domainCheck.action.placeholder"
            class="tw-w-full"
            outlined
            no-error-icon
            :rules="[
                (val) => !!val || 'Este campo es requerido.',
                (val) => val.length >= 3 || 'El dominio debe de tener 3 o más caracteres',
							]"
				/>

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
				v-model="product.domainCheck.modal"

			>
      <div
				v-if="product.domainCheck.action.value == domainActions[0].value"
				class="
				tw-bg-white
				tw-p-4
				"

				style="overflow: hidden;"
			>

				<div
					v-if="product.domainCheck.loading"
					class="tw-w-full tw-h-[100px]"
					style="position: relative;"
				>
					<q-inner-loading :showing="product.domainCheck.loading" color="primary"  />
				</div>

        <div
            v-if="product.domainCheck?.exactMatch?.isAvaliable"
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
                <span class="tw-text-lg tw-font-[800] tw-text-[#5cb85c]"> {{ product.domainCheck.exactMatch.name }} <br> ¡está disponible!&nbsp;</span>
            </div>

            <div>
                <q-btn
                    v-if="!product?.domain?.domainName"
                    label="make it yours"
                    no-caps
                    @click="selectDomain(product, product.domainCheck.exactMatch.name)"
                />
            </div>
        </div>

        <div class="tw-my-5" v-if="product?.domainCheck.results.length">
          <span class="tw-text-lg tw-font-bold">Protege tu marca:&nbsp;</span>
          <p>Proteja estas extensiones de dominio populares para mantener a los competidores alejados de su nombre</p>
        </div>

        <div class="tw-grid tw-grid-cols-3  tw-gap-4">
          <!--extension cards -->
          <template v-for="result in product?.domainCheck.results">
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
                    :label="selectDomainLabel(product)"
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


				<!-- suggestions -->
				<div class="tw-grid tw-grid-cols  tw-gap-4 tw-p-4 tw-h-full">
					<div>
						<span>More options</span>
					</div>

					<div>
						<q-scroll-area style="height: 400px; max-width: 2000px;">
							<template v-for="suggestion in product?.domainCheck.suggestions">
								<div class="tw-flex tw-justify-between tw-items-center tw-gap-4 tw-m-4">
										<span class="tw-text-[14px] tw-font-[600]">
												{{ suggestion.name }}
										</span>
										<div class="tw-flex tw-items-center tw-gap-4">
											<div>
												<span>
												{{  productsHelper.priceWithSymbol(getExtPrice(suggestion.ext).domainregister, cartState.currency) }}
											</span>
											</div>
											<div>
												<q-btn
												label="Buy now"
												color="amber"
												no-caps
												unelevated
												outline
												class="
														tw-font-bold
														tw-rounded-lg
												"
												@click="addDomainExtension(product, suggestion)"
										/>

											</div>


										</div>

								</div>
								<hr>




							</template>
						</q-scroll-area>
					</div>

        </div>
      </div>
		</q-dialog>


    </div>


    <!-- domain check-->
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
import { useStorage, useCloned  } from '@vueuse/core'


const { locale, locales, setLocale } = useI18n()

const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
})

const emits = defineEmits(['subtotal'])


const validateProducts = computed(() => cartState.value.products.every(product => (isDomainProduct(product) ?   (product?.domain?.domainName != null && product?.domain?.domainName != '') : true) === true)  )

const disableContinue = useState('icommerce.cart.continue', () => false)

const domainPricing = ref([])


const domainActions =  [
	{
		label: 'Registrar un nuevo dominio',
		value: 'self-register'
	},

	{
		label: 'Transferir mi dominio ',
		placeholder: 'www.tudominio.com',
		value: 'self-transfer'
	},

	{
		label: 'Ya tengo dominio',
		placeholder: 'www.tudominio.com',
		value: 'self-owndomain'
	},
]


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
    return domainPricing?.value.find(x => x.ext ==  `.${ext}`) || 0
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

      if(!product?.domain?.domainName) {
        product.domain = {
          domainName: null,
					transferCode: null,
        }
      }




      product.domainCheck = {
        action: domainActions[0], // register, trasfer
        domainName: product.domain.domainName,

        exactMatch: null,
        results: [],
        suggestions: [],
        loading: false,
				modal: false,
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


async function checkDomain(product) {

  product.domainCheck.modal = true
	product.domainCheck.loading = true

    const lang = locale.value == 'es' ? 'esp' : 'eng'
		const domain = product.domainCheck.domainName.trim()

    const body = {
        domain,
        lang,
        ext: ''
    }
    product.domain.domainName = null
    product.domainCheck.exactMatch = false
    product.domainCheck.results =  []
    product.domainCheck.suggestions = null

    const res = await $fetch(apiRoutes.domainCheck, {
		method: 'POST',
		body: JSON.stringify(body)
	}).then((response) => {
        product.domainCheck.loading = false
        product.domainCheck.exactMatch = response.exactMatch || false
        product.domainCheck.results = response?.results?.filter(x => x.isAvaliable == true) || []
        product.domainCheck.suggestions = response.suggests
    } ).catch(() => {
			product.domainCheck.loading = false
		})
}


function getFrecuencyOptions(product){
    if(product?.frecuencyOptions?.length) return product?.frecuencyOptions
    return productsHelper.getFrecuencyOptions(product)
}

function selectDomain(product, domainName){
    //product.id = domainName
    product.domain.domainName = domainName
    calcSubtotal()
}

function selectDomainLabel(product){
  return product?.domain?.domainName ? 'Add' : 'Buy now'
}

function addDomainExtension(product, extension){
	console.log(extension)
  if(!product?.domain?.domainName){
    selectDomain(product, extension.name)
    return
  }


    //const newProduct = { ...product }
    const { cloned } = useCloned(product)

    cloned.value.isCloned = {
      originalId: product.id,
      originalDomainName: product.domain.domainName
    }

    cloned.value.id = extension.name
    cloned.value.category = null
    cloned.value.domain.domainName = extension.name



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


    cartState.value.products.push(cloned.value)
    calcSubtotal()

}

</script>

<style>
.card {
  /*box-shadow: 0px 10px 104px rgba(0, 0, 0, 0.07), 0px 3.85185px 33.1259px rgba(0, 0, 0, 0.0425185), 0px 0.814815px 8.47407px rgba(0, 0, 0, 0.0274815);*/
}
</style>