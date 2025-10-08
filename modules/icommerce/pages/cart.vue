<template>
	<div
		class="
			lg:tw-flex
			tw-justify-center
			tw-p-4
			tw-h-fit
			tw-bg-[#f4f5ff]
		"
	>

		<!--cart and products --->
		<div
			class="
				lg:tw-mb-4
				lg:tw-flex
				tw-align-middle
			">

				<div
					class="tw-mb-[40px]"
				>
				<emptyCart
					v-if="(!product && !showCart)"
				/>

				<!--title -->
				<div
					v-if="product || showCart"
					class="tw-flex tw-justify-between  tw-align-middle tw-items-center">
						<div >
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
			</div>

			<!-- cart-->
			<div
				v-if="showCart"
				class="
				tw-w-full
				md:tw-my-[20px]
				lg:tw-w-[800px]
				lg:tw-mt-[114px]
				xl:tw-w-[400px]
				xl:tw-mt-[114px]
				xl:tw-ml-8
				"
			>
				<div class="
					tw-bg-white
					tw-border-[1px]
					tw-border-[#d8dae0]
					tw-rounded-[20px]
					tw-w-full
					tw-sticky
					tw-p-6
					"
				>
					<!-- subtotal -->
					<SummaryComponent
						:cartState="cartState"
					>
						<template #action>
							<q-btn
								:label="$t('icommerce.cart.continue')"
								text-color="white"
								color="primary"
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
						</template>
					</SummaryComponent>
				</div>
			</div>
	</div>

</template>
<script setup>
import { useStorage } from '@vueuse/core'
import ProductsComponent from '../components/cart/products.vue'
import SummaryComponent from '../components/cart/summary.vue'
import CurrencySelector from '../components/currencySelector'
import emptyCart from '../components/cart/emptyCart.vue';


const { t } = useI18n()
const router = useRouter()
const route = useRoute()

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

const showCart = computed(() => cartState?.value?.products?.length || false )

const disableContinue = computed(() => {
	if(!showCart.value) return false
	return cartState.value?.products?.every((product) => {
	if(!product?.domain) return false   //not a domain product
	return product?.domain?.domainName == null || product?.domain.domainName == '' ? true : false
	})
})

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
		path: checkoutPath, 
		query: route.query
	})
}


</script>
