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
			<!--cart and products --->
			<div class="
			tw-w-full
			lg:tw-w-[800px]
			lg:tw-mb-4
			">
				<div v-if="showCart" class="tw-mb-[40px]">
					<!--title -->
					<div class="tw-flex tw-justify-between tw-items-center">
						<div>
							<h1 class="tw-text-[35px] tw-font-[700]">{{ $t('icommerce.cart.yourCart') }}</h1>
						</div>
						
						<!-- currency -->
						<div>
							<CurrencySelector />
						</div>
					</div>
					<!-- products -->
					<ProductsComponent
						@subtotal="(val) => subtotal = val"
					/>
					
				</div>
				<!-- empty cart -->
				<div v-else >
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
					<div class="tw-flex tw-justify-between tw-items-center">
						<span class="
							tw-font-semibold
							tw-text-[22px]
							tw-m-0
							tw-p-0
							tw-leading-5
						">
							{{ $t('icommerce.cart.subtotal') }}
						</span>
						<span class="
							tw-font-[600]
							tw-text-[20px]
							tw-m-0
							tw-p-0
							tw-leading-5
						">
							{{ productsHelper.valueWithSymbol(subtotal, cartState.currency) }}
						</span>
					</div>

					<div class="tw-flex tw-justify-between tw-items-center tw-my-2">
						<span class="tw-text-[12px] tw-font-[400] tw-text-[#818181]">
							{{ $t('icommerce.cart.subtotalNoTaxes') }}
						</span>
						<span class="tw-text-[18px] tw-font-[600]">
							{{ productsHelper.valueWithSymbol(0, cartState.currency) }}
						</span>
					</div>

					<!-- discount -->
					<div class="tw-flex tw-justify-between tw-items-center tw-my-2">
						<span class="tw-text-[14px] tw-font-[500] tw-text-[#818181]">
							{{ $t('icommerce.cart.discount') }} 00%
						</span>
						<span class="tw-text-[14px] tw-font-[600] tw-text-[#66BB6A]">
							{{ productsHelper.valueWithSymbol(0, cartState.currency) }}
						</span>
					</div>

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
					<div class="tw-mt-4">
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
				</div>
			</div>
		</div>
	</ClientOnly>
</template>
<script setup>
import { useStorage } from '@vueuse/core'
import ProductsComponent from '../components/cart/products.vue'
import productsHelper from '../helpers/products'
import CurrencySelector from '../components/currencySelector'
import apiRoutes from '../config/apiRoutes'

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
	region: null,
	zipCode: null
})

const { t } = useI18n()
const router = useRouter()
const route = useRoute()    

const subtotal = ref(0)

const showCouponInput = ref(false)
const showCart = computed(() => cartState.value?.products?.length || false)

const disableContinue = computed(() => cartState.value.products.every((product) => {
	if(!product?.domain) return false   //not a domain product 
	return product?.domain?.domainName == null || product?.domain.domainName == '' ? true : false	
}))


const checkoutPath = getPath('icommerce.checkout')


onMounted(async () => {
	init();
})

async function init(){
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
					element.label =  t(productsHelper.translateFrecuencyOptionLabel(element.label))					
					return element
       			});
				if(options.length) product.frecuency = options[billingcycle]
    		}
			/*
			const index = cartState.value.products.findIndex((obj) => obj.externalId == id);
			if (index === -1) {
				cartState.value.products.push(product);
			} else {
				cartState.value.products[index] = product;
			}
			*/

			cartState.value.products = []
			cartState.value.products.push(product);
		}

	})
	//loading.value = false
}


function redirectCheckout() {
	router.push({
		path: checkoutPath
	})
}

</script>
