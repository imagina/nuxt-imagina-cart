<template>
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
					<ProductsComponent
						v-if="product"
						:product="product"
					/>

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
	
</template>
<script setup>
import { useStorage } from '@vueuse/core'
import ProductsComponent from '../modules/icommerce/components/cart/products.vue'
import SubtotalComponent from '../modules/icommerce/components/cart/subtotal.vue'
import productsHelper from '../modules/icommerce/helpers/products'
import CurrencySelector from '../modules/icommerce/components/currencySelector'
import apiRoutes from '../modules/icommerce/config/apiRoutes'



const userStore = useAuthStore()



definePageMeta({
  middleware: 'auth',
  layout: 'icommerce'
})

const { t } = useI18n()
const router = useRouter()


/*
const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
})
	*/


let products = []
const route = useRoute()
const { data: product } = await useAsyncData( 'product', 
	() => $fetch(`/api/icommerce/product?pid=${route.query?.pid}`)
)


const loading = ref(false)


const showCart = computed(() => product || false)

const disableContinue = computed(() => products.every((product) => {
	if(!product?.domain) return false   //not a domain product
	return product?.domain?.domainName == null || product?.domain.domainName == '' ? true : false
}))

const showTaxesWarning = computed(() => products.some((product) => product?.domain || false ))

const checkoutPath = getPath('icommerce.checkout')


onMounted(async () => {
	init();
})

async function init(){
	await userStore.getUsdRates()
}




	
			/* translate the  product options and set one if there is in url params  */









function redirectCheckout() {
	router.push({
		path: checkoutPath
	})
}


</script>
