<template>
	<BreadCrumb />
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
			<div				
			class="
				tw-w-full
				lg:tw-w-[800px]
				lg:tw-mb-4
				tw-flex
				tw-align-middle
			">
				<div					
					class="tw-mb-[40px]"
					
				>
					<!--title -->
					
					<div class="tw-flex tw-justify-between  tw-align-middle tw-items-center" v-if="showCart">
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
					<ProductsComponent
						:product="product"
						:domainPricing="domainPricing"
						
					/>

				</div>
				
					<emptyCart 
						v-if="!showCart"
					/>
				
				
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
					<SubtotalComponent 
						:cartState="cartState"
					/>
					
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
								tw-text-white
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

</template>
<script setup>
import { useStorage } from '@vueuse/core'
import ProductsComponent from '../components/cart/products.vue'
import SubtotalComponent from '../components/cart/subtotal.vue'
import CurrencySelector from '../components/currencySelector'
import BreadCrumb from '../components/breadcrumb';
import emptyCart from '../components/cart/emptyCart.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'icommerce'
})

const { t } = useI18n()
const router = useRouter()

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

const route = useRoute()

const urlOptions =  {
	action: route?.query?.a || null,
	pid: route?.query?.pid || null,
	billingcycle: route?.query?.billingcycle || null,
	promocode: route?.query?.promocode || null
}
const product = ref(null)
const isAddAction = computed(() => (urlOptions.pid && urlOptions.action == 'add') || false)

const { data: domainPricing } = await useAsyncData( 'domainPricing', 
	() => $fetch('/api/icommerce/domain-pricing')
)

const productData = await useAsyncData( 'product', 
	() => isAddAction.value ? $fetch(`/api/icommerce/product?pid=${route?.query?.pid}`) : null
)
product.value = productData.data.value

const showCart = computed(() => cartState.value.products.length )

const disableContinue = computed(() => { 
	if(!showCart.value) return false
	return cartState.value?.products?.every((product) => {
	if(!product?.domain) return false   //not a domain product
	return product?.domain?.domainName == null || product?.domain.domainName == '' ? true : false
	}) 
})

const showTaxesWarning = computed(() => cartState.value.products.some((product) => product?.domain || false ))

const checkoutPath = getPath('icommerce.checkout')

onMounted(() => {
	restoreFromCheckout()
})

function restoreFromCheckout(){
	if(isAddAction.value){
		cartStateStorage.value.products = []		
	} else {
		if(cartStateStorage.value.products.length){
			//product.value = cartStateStorage.value.products[0]
			cartState.value.products = cartStateStorage.value.products
		}		
	}
}

function redirectCheckout() {
	cartStateStorage.value.products = cartState.value.products
	router.push({
		path: checkoutPath
	})
}


</script>
