<template>
	<ClientOnly>		
		<div class="
			lg:tw-flex
			tw-flex-wrap
			tw-justify-center
			tw-p-4
			tw-h-full
		"
		style="background-color:  #FAFAFA;"
		>

		<q-inner-loading
			:showing="loading"
			color="primary"
		/>

			<!--cart and products --->
			<div 
			v-if="!loading"
			class="
				tw-w-full
				lg:tw-w-[800px]
				lg:tw-mb-4	
				tw-flex
				tw-align-middle	
			">
				<div v-if="showCart" class="tw-mb-[40px]">
					<!--title -->
					<div class="tw-flex tw-justify-between  tw-align-middle tw-items-center">
						<div>
							<h1 
								class="
									tw-text-[20px] 
									sm:tw-text-[24px] 
									md:tw-text-[35px] 
									tw-font-[700]
								"
							>
								{{ $t('icommerce.cart.yourCart') }}
							</h1>
						</div>
						
						<!-- currency -->
						<div>
							<CurrencySelector />
						</div>
					</div>
					<!-- products -->
					<ProductsComponent/>
					
				</div>
				<!-- empty cart -->
				<div v-else 
					class="tw-min-h-[50vh]"
				>
					<h1 class="tw-text-[35px] tw-font-[700]">Tu Carrito</h1>
					<div class="tw-my-4 tw-text-[14px] tw-font-[400]">
						<p>
							{{ $t('icommerce.cart.emptyCart') }}
						</p>
					</div>
					<q-btn
						:label="$t('icommerce.goToStore')"
						text-color="black"
						color="amber"
						no-caps
						unelevated
						class="
							tw-w-2/4
							tw-justify-center
							tw-font-bold
							tw-rounded-lg
							tw-mt-4
							tw-my-8
						"
						@click="() => { router.push({ path: getPath('icommerce.products') })}"
					/>
				</div>
			</div>

			<!-- cart-->
			<div
				v-if="showCart"
				class="
				tw-w-full				
				md:tw-my-[20px]
				lg:tw-w-[800px]
				lg:tw-mt-0
				xl:tw-w-[400px]
				xl:tw-mt-[114px]
				xl:tw-ml-8
				"
			>
				<div class="
					card
					tw-shadow-xl
					tw-bg-white
					tw-rounded-[20px]
					tw-w-full
					tw-sticky
					tw-top-[220px]
					tw-p-6
					"
				>
					
					<!-- subtotal -->
					<SubtotalComponent />					

					<!--coupon -->
					<div v-if="false">
						<div>
							<q-btn 
								:label="$t('icommerce.cart.coupon')"
								class="q-p-0 tw-text-[14px] tw-font-[600] tw-text-[#03A9F4]"
								flat
								no-caps
								dense
								@click="showCouponInput = !showCouponInput" 
							/>
						</div>
						<div v-if="showCouponInput || form.coupon" class="tw-py-4">
							<q-input v-model="form.coupon" dense outlined />
						</div>
					</div>
					<div class="tw-mt-6">
						<q-btn
							:label="$t('icommerce.cart.continue')"
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
							@click="redirectCheckout()"	
							:disable="disableContinue"
						/>
					</div>
					<div 
						v-if="showTaxesWarning"
						class="tw-pt-4 tw-text-[12px] tw-font-[400] tw-text-[#818181]"
					>
						<p>Los precios indicados no incluyen IVA, si tu dirección de facturación está <strong>en Colombia nuestro sistema agregará el 19% del IVA.</strong></p>
					</div>
				</div>
			</div>
		
	</div>
	</ClientOnly>
</template>
<script setup>
import { useStorage } from '@vueuse/core'
import ProductsComponent from '../components/cart/products.vue'
import SubtotalComponent from '../components/cart/subtotal.vue'
import productsHelper from '../helpers/products'
import CurrencySelector from '../components/currencySelector'
import apiRoutes from '../config/apiRoutes'



const userStore = useAuthStore()


definePageMeta({
  middleware: 'auth',
})

const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
})
const form = useStorage('shoppingCheckoutForm', {
	coupon: null,
	email: null,
	firstName: null,
	lastName: null,
	identification: null,
	mobilePhone: null,
	country: null,
	address: null,
	city: null,
	zipCode: null
})

const { t } = useI18n()
const router = useRouter()
const route = useRoute()    

const loading = ref(false)

const showCouponInput = ref(false)
const showCart = computed(() => cartState.value?.products?.length || false)

const disableContinue = computed(() => cartState.value.products.every((product) => {
	if(!product?.domain) return false   //not a domain product 
	return product?.domain?.domainName == null || product?.domain.domainName == '' ? true : false	
}))

const showTaxesWarning = computed(() => cartState.value.products.some((product) => product?.domain || false ))

const checkoutPath = getPath('icommerce.checkout')


onMounted(async () => {
	init();
})

async function init(){
	await userStore.getUsdRates()    
	await checkUrlParams()
}

async function  checkUrlParams(){	
	const query = route?.query || {}	 

	const options = {
		action: query?.a || null,
		pid: query?.pid || null,
		billingcycle: query?.billingcycle || null, 
		promocode: query?.promocode || null
	}
	
	if(options.action && options.pid){		
		getProduct(options.pid, options)
	}
}

async function getProduct(id, urlOptions){
	loading.value = true
	cartState.value.products = []
	const params = {			
		include: 'relatedProducts,categories,category,parent,manufacturer,optionsPivot.option,optionsPivot.productOptionValues', 
		filter: {
			field: 'external_id'
		}
	}
	
	await baseService.show(apiRoutes.products, id,  params).then(response => {		
		if(response?.data) {
			const product = response.data
			
			/* translate the  product options and set one if there is in url params  */
			if(productsHelper.hasFrencuency(product)){
				let billingcycle = 0
				const options = productsHelper.getFrecuencyOptions(product).map((element, index) => {
					if(urlOptions?.billingcycle){
						if(urlOptions?.billingcycle.toLowerCase() == element.label.toLowerCase()){
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
			cartState.value.products.push(product);
		}

	})
	loading.value = false
}


function redirectCheckout() {
	router.push({
		path: checkoutPath
	})
}


</script>
