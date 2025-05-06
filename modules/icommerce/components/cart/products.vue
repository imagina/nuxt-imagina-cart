<template>
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
    <div class="tw-flex tw-justify-between tw-items-center tw-py-6">
      <h2 class="
            tw-font-semibold
            tw-text-[22px]
            tw-m-0
            tw-p-0
            tw-leading-5
          ">
        {{ product.name }}

        <span
          v-if="product?.domain?.domainName"
          class="
              tw-rounded-[10px]
              tw-border-[2px]
            tw-border-[#5cb85c]
            tw-bg-[#5cb85c]
            tw-text-white
              tw-font-[600]
              tw-py-1
              tw-px-2
              tw-ml-2
          ">
          <span>
            {{  product?.domain?.domainName }}
          </span>
        </span>
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
    <div v-if="isDomainNameRequired(product) && product?.domain" class="tw-py-6">

      <div class="md:tw-flex tw-justify-center tw-gap-4">

        <div>
						<q-select
							label="configura tu dominio"
							v-model="product.domainCheck.action"
              @update:model-value="() => {

                product.domain.action = product.domainCheck.action
                if(product.domainCheck.action.value != domainActions[0].value){
                  //product.domain.domainName = null
                  product.domainCheck.domainName = null
                }
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
            no-error-icon
            :rules="[
                (val) => !!val || 'Este campo es requerido.',
                (val) => val.length >= 3 || 'El dominio debe de tener 3 o más caracteres',
								(val) => !/\s/.test(val) || 'El dominio no debe contener espacios',
                (val) => isSupportedDomain(product, val)
              ]"
              @update:model-value="val => product.domainCheck.domainName = val.replace(/[^a-zA-Z0-9.-]/g, '').toLowerCase()"
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
          class="tw-w-[600px]"
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
                ">

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
                            <span class="tw-text-[28px] tw-font-[700]"> {{ product.domainCheck.exactMatch.name }}
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
              v-if="product?.domainCheck.results.length == 0"
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
                <span class="tw-text-[20px] tw-font-[700] ">{{ product.domainCheck.domainName }}</span>
              </div>




        		</div>


						<!-- result found -->
						<div class="tw-my-5" v-if="product?.domainCheck.results.length != 0">
          		<span class="tw-text-lg tw-font-bold">Protege tu marca:&nbsp;</span>
          		<p>Proteja estas extensiones de dominio populares para mantener a los competidores alejados de su nombre</p>
        		</div>



						<div class="tw-grid md:tw-grid-cols-3  tw-gap-4">
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
									tw-p-4"

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
						<div class="tw-grid tw-grid-cols  tw-gap-4 tw-p-4 tw-h-full">
							<div>
								<span class="tw-text-[16px] tw-font-[600]">More options</span>
							</div>

							<div>
								<!--<q-scroll-area style="height: 400px; max-width: 2000px;">-->
									<template v-for="suggestion in product?.domainCheck.suggestions">
										<div class="tw-grid  md:tw-flex md:tw-justify-between tw-items-center tw-gap-4 tw-m-4">
												<span class="tw-text-[14px] tw-font-[600] tw-line-clamp-3 tw-break-all">
														{{ suggestion.name }}
												</span>
												<div class="tw-flex tw-items-center tw-gap-4">
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
										<hr>
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
          @update:model-value="calcSubtotal()"
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
          Renuevas a {{ productsHelper.getPriceWithSymbol(product, cartState.currency) }} el  {{ calcRenovationDate(product.frecuency.label) }} ¡Cancela cuando quieras!
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
import constants from '../../config/constants.js';
import { useStorage, useCloned  } from '@vueuse/core'
import moment from 'moment';


const regex = /^[a-zA-Z0-9.-]+$/;

const { locale, locales, setLocale, t } = useI18n()

const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
})

const emits = defineEmits(['subtotal'])

const domainPricing = ref([])


const domainActions =  [
	{
		label: 'Registrar un nuevo dominio',
    placeholder: 'tumarca.com',
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
  () => cartState.value.currency,
  (newQuery, oldQuery) => {
    calcSubtotal()
  },
)


function init() {
    getDomainPricing()
    configProducts()
}

function disableCheckButton(product){
  const regex = /^[a-zA-Z0-9.-]+$/;
  const domainName = product.domainCheck.domainName

  if(domainName == '' || domainName == null) return true
  return !regex.test(domainName)
}

async function getDomainPricing(){
    await baseService.get(apiRoutes.domainPricing).then((response) => {
        const pricingList =  JSON.parse(response)
        domainPricing.value = Object.keys(pricingList).map(x => { return { ext: x, ...pricingList[x] } })
    })
}



function isSupportedDomain(product, value){
  const domains = domainPricing.value.map((domain) => domain.ext )
  const result = domains.some(ext => value.includes(ext));

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
    cartState.value.products.forEach((product) => {
    if (productsHelper.hasFrencuency(product)) {
      const options = productsHelper.getFrecuencyOptions(product)

      if (options.length && !product?.frecuency) {
        product.frecuency = options[0]
      }
      product.price = product?.price || 0
    }
    if (isDomainNameRequired(product)) {

      if(!product?.domain?.domainName) {
        product.domain = {
          domainName: null,
          action: null,
					transferCode: null,
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
    }
  })
  calcSubtotal()
}

function removeProduct(product) {
  Notify.create({
			message: `¿Eliminar ${product.name} ${product.domain?.domainName || '' }?`,
			type: 'negative',
      position: 'center',
      actions: [
        {
          label: "cancelar",
          color: 'white',
        },
        {
          label: "Eliminar",
          color: 'white',
          handler: () => {
            const products = cartState.value.products.filter(obj => obj.id != product.id);
            cartState.value = { products: products, currency: cartState.value.currency }
            calcSubtotal()

            if (cartState.value.products.length == 0) {
              // router.push({ path: getPath('icommerce.products') })
            }

          }

        }
      ]
		})
}

function calcSubtotal() {
  const subtotal = productsHelper.getSubtotal(cartState.value.products, cartState.value.currency)
  emits('subtotal', subtotal)
}

function isDomainNameRequired(product) {
  const domainCategories = constants.cagtegories.domainNameRequired
  return domainCategories.includes(product?.category?.id) || false
}

function isDomainNameFree(product) {
  const domainCategories = constants.cagtegories.dominNameFree
  return domainCategories.includes(product?.category?.id) || false
}


async function checkDomain(product) {

    const lang = locale.value == 'es' ? 'esp' : 'eng'
		const domain = product.domainCheck.domainName.trim()

    const body = {
      domain,
      lang,
      ext: ''
    }

    if(product.domain.domainName != product.domainCheck.domainName) {
      //product.domain.domainName = null
    }
    product.domainCheck.exactMatch = false
    product.domainCheck.results =  []
    product.domainCheck.suggestions = []
    product.domainCheck.modal = true
	  product.domainCheck.loading = true

    const res = await $fetch(apiRoutes.domainCheck, {
		method: 'POST',
		body: JSON.stringify(body)
	}).then((response) => {
        product.domainCheck.loading = false
        product.domainCheck.exactMatch = response.exactMatch || false
        if(product.domainCheck.exactMatch){
          product.domainCheck.exactMatch.disableButton = false
        }


        product.domainCheck.results = response?.results?.filter(x => x.isAvailable == true) || []
        product.domainCheck.results.map(element => {
          return {...element, disableButton: false }
        });


        product.domainCheck.suggestions = response.suggestions || []
        product.domainCheck.suggestion.map(element => {
          return {...element, disableButton: false }
        });

    } ).catch(() => {
			product.domainCheck.loading = false
		})
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

function selectDomain(product, selectedDomain){
    //product.id = domainName
    product.domain.domainName = selectedDomain.name
    //if isn't free domain
    const domainPrice = getExtPrice(selectedDomain.ext)?.domainregister || 0

    if(domainPrice) product.price = domainPrice

    Notify.create({
			message: `Seleccionaste ${selectedDomain.name} `,
			type: 'positive',
      //position: 'center',
      timeout: 2000
		})
    calcSubtotal()
}

function selectDomainLabel(product){
  return product?.domain?.domainName ? 'Agregar' : 'Seleccionar'
}


function addDomainExtension(product, extension){
  if(!product?.domain?.domainName){
    selectDomain(product, extension)
		calcSubtotal()
    return
  }

    /*
    const { cloned } = useCloned(product)

    cloned.value.isCloned = {
      originalId: product.id,
      originalDomainName: product.domain.domainName
    }

    cloned.value.id = extension.name
    cloned.value.category = null
    cloned.value.domain.domainName = extension.name

    cartState.value.products.push(cloned.value)
    */
    const newProduct = {
      ...extension
    }
    newProduct.name = 'Dominio adicional'
    newProduct.category = null
    newProduct.id = extension.name
    newProduct.domain = { domainName: extension.name }
    newProduct.price = getExtPrice(extension.ext)?.domainregister || 0
    cartState.value.products.push(newProduct)


    Notify.create({
			message: `Agregaste ${extension.name} al carrito!`,
			type: 'positive',
    //  position: 'center'
		})
    //extension.disableButton = true
    calcSubtotal()
}

</script>

<style>
.card {
  /*box-shadow: 0px 10px 104px rgba(0, 0, 0, 0.07), 0px 3.85185px 33.1259px rgba(0, 0, 0, 0.0425185), 0px 0.814815px 8.47407px rgba(0, 0, 0, 0.0274815);*/
}
</style>