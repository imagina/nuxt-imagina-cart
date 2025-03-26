<template>
	<ClientOnly>
		<div
			class="tw-flex tw-gap-16 tw-flex-col tw-items-center tw-pt-6 md:tw-pt-10 lg:tw-pt-16 tw-pb-8 md:tw-pb-16 lg:tw-pb-24">
			<div class="tw-container !tw-px-4 lg:pb-1">
				<div class="tw-flex tw-justify-between tw-mb-5 md:tw-mb-8">
					<q-btn label="Back" icon="chevron_left" flat rounded color="#101923"
						class="tw-font-bold tw-text-[16px] md:tw-text-[20px]" no-caps @click="redirectToCart()" />
				</div>

				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-12 max-md:tw-place-items-center" v-if="products">
					<div
						class="md:tw-col-span-8 md:!tw-pr-2 lg:tw-pr-5 tw-pb-8 sm:tw-pb-16 md:tw-pb-0 max-sm:tw-w-[95vw] max-md:tw-w-[85vw]">
						<!-- user data -->
						<div class="shadow-card tw-rounded-3xl md:!tw-pt-8 tw-p-5">

							<h2
								class="tw-leading-none tw-flex tw-items-center tw-gap-3 tw-text-[17px] md:tw-text-[22px] tw-font-bold tw-mb-5 lg:tw-mb-8">
								<span
									class="tw-rounded-full tw-border tw-border-gray-600 tw-h-7 tw-w-7 md:tw-h-10 md:tw-w-10 tw-flex tw-items-center tw-justify-center">1</span>
									Dirección de facturación
							</h2>
							<!-- logging -->
							<div class="tw-flex tw-justify-center tw-align-middle tw-p-4">
								<SocialAuthGoogle/>

								<div v-if="!authStore.isLogged()">
									<q-btn 
										@click="redirectToLogin()"										
										label="Iniciar sesion" 										
										icon="person"
										color="primary"
										unelevated
										rounded
										no-caps
									/>
								</div>
							</div>

							<q-form @submit.prevent.stop="goToPayment" ref="refForm" >								
								<div class="tw-my-4 tw-grid lg:tw-grid-cols-2 tw-gap-y-5 lg:tw-gap-y-8 tw-gap-x-5">
									<q-input v-model="form.email" label="Email" dense outlined />
									<q-input v-model="form.firstName" label="Nombres" dense outlined />
									<q-input  v-model="form.lastName" label="Apellidos" dense outlined />


									<q-select
										v-model="form.identificationType"
										:options="[{value: 'cedula', label: 'Cedula de ciudadania'}]"
										option-value="value"
										option-label="label"
										outlined
										dense
										label="Tipo de identificacion"
									/>
									
									<q-input  v-model="form.identification" label="Identificacion" dense outlined />
									<q-input  v-model="form.mobilePhone" label="Phone" type="tel" dense outlined />
									
									<q-input  v-model="form.country" label="Pais de residencia" dense outlined />
									<q-input  v-model="form.address" label="Direccion" dense outlined />
									<q-input  v-model="form.city" label="Ciudad" dense outlined />
									<q-input  v-model="form.region" label="Region" dense outlined />
									<q-input  v-model="form.zipCode" label="Codigo postal" dense outlined />																	

								</div>
								<div class="tw-my-4 ">															
									<q-btn no-caps label="Continuar" type="submit" text-color="black" color="amber"
									unelevated
									class="tw-font-bold tw-rounded-lg tw-capitalize tw-max-w-[160px] tw-text-[16px] lg:tw-text-[20px] tw-p-[8px 20px] lg:tw-p-[13px 30px]" />
								</div>	
								
							</q-form>
						</div>

					</div>
					<div class="md:tw-col-span-4 tw-pr-2 lg:tw-pl-5 max-sm:tw-w-[95vw] max-md:tw-w-[85vw]">
						<div class="shadow-card tw-rounded-3xl !tw-pt-8 tw-p-5">
							<div class="tw-my-2">
								<h2 class="tw-leading-normal tw-font-semibold tw-text-md md:tw-text-base xl:tw-text-lg">
									Resumen del pedido
								</h2>
							</div>
							<div class="tw-my-2">
								<q-expansion-item
									class="shadow-1 overflow-hidden"
									style="border-radius: 8px; background-color: #eceded;"
									:label="`${products.length} artículos`"
									header-class="tw-leading-normal tw-font-semibold tw-text-md md:tw-text-base xl:tw-text-lg tw-px-4"
									expand-icon-class=""
								>
								<template v-for="product in products" class="tw-my-4">
									<q-card>										
										<q-card-section>
											<span class="tw-leading-normal tw-font-semibold tw-text-md md:tw-text-base xl:tw-text-lg">
												{{ product.name }}
											</span>
											<div class="tw-flex tw-justify-between">
												<div>
													<span v-if="productsHelper.hasFrencuency(product)"
														class="tw-leading-normal tw-font-[500] tw-mb-1 tw-text-sm md:tw-text-md">
														{{ product.frecuency?.label }}
													</span>

												</div>
												<div>
													<span class="tw-leading-normal tw-font-light tw-text-sm md:tw-text-md !text-[#333]">
														usd {{ productsHelper.getPrice(product, cartState.currency) }}
													</span>
												</div>
											</div>
											
										</q-card-section>
									</q-card>
									</template>
								</q-expansion-item>	
							</div>
							<hr class="tw-my-4"/>
							<div class="tw-my-2">
								<strong class="tw-text-base lg:tw-text-lg !tw-text-[#444]">
									Subtotal ${{ subTotal }}
								</strong> 
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</ClientOnly>
</template>
<script setup>
import { useStorage } from '@vueuse/core'
import { useQuasar } from 'quasar'
import productsHelper from '../helpers/products'


const quasar = useQuasar()
const authStore = useAuthStore()
const cartState = useStorage('shoppingCart', {
	products: [],
	currency: {}
})

const form = useStorage('shoppingCheckoutForm', {
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
const router = useRouter()

const refForm = ref(null)

const user = computed(() => authStore.user)
const products = computed(() => cartState.value.products)

const subTotal = computed(() => {
	let value = 0;
	if (!cartState?.value?.products.length) return value
	value = productsHelper.getSubtotal(cartState?.value?.products, cartState.value.currency)  
	return value
})

watch(
	() => cartState.value.products,
	(newValue, oldValue) => {
		if (!newValue.length) redirectToCart()
	},
)

onBeforeMount(() => {
	if (!cartState.value.products.length) redirectToCart() //empty cart 
})


onMounted(() => {
	init()
})

function init() {
	setFormData()
}

function setFormData() {
	if (authStore.isLogged()) {
		form.value = {
			email: user.value.email,
			firstName: user.value.firstName,
			lastName: user.value.lastName,
			identification: getField('identification'),
			mobilePhone: getField('cellularPhone')
		}
	}
}

function getField(name) {
	const field = user.value.fields.find((field) => field.name == name)
	if (field) return field.value
	return false
}

function redirectToCart() {
	router.push({
		path: getPath('icommerce.cart')
	})
}

function redirectToLogin() {
	const path = getPath('iauth.login')
	router.push({
		path,
		query: {
			redirectTo: 'icommerce.checkout',
		}
	})
}

function redirectToLogout() {
	const path = getPath('iauth.logout')
	router.push({
		path,
		query: {
			redirectTo: 'icommerce.checkout',
		}
	})
}


async function goToPayment() {
	const postUrl = 'https://clientes.imaginacolombia.com/newcartorder.php'

	const validateRegister = await refForm.value.validate()
	if (!validateRegister) return


	quasar.loading.show({
		message: 'We are procresing your order',
		//messageColor: 'black',
		//backgroundColor: 'primary',
	})

	const order = {
		user: { ...form.value },
		total: subTotal.value,

		products: products.value.map((product) => {
			return {
				id: product.id,
				//description: product.description,
				name: product.name,
				url: product.url,
				discount: product.discount,
				frecuency: productsHelper.hasFrencuency(product) ? product.frecuency : null,
				price: productsHelper.getPrice(product, cartState.currency)
			}
		})
	}

	console.log(JSON.stringify(order))

	const res = await $fetch(postUrl, {
		method: 'POST',
		body: JSON.stringify(order)
	}).then((response) => {
		console.log(response)
		//WIP
		window.location.replace('https://clientes.imaginacolombia.com');
		cartState.value = { products: [] }
	})





}

</script>
<style>
.shadow-card {
	box-shadow: 0px 10px 104px rgba(0, 0, 0, 0.08), 0px 3.8px 33px rgba(0, 0, 0, 0.04), 0px 0.8px 8.4px rgba(0, 0, 0, 0.02);
}






  
</style>