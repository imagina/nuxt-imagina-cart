<template>
	<ClientOnly>
		<div
			v-if="products"
			class="
				tw-flex
				tw-flex-wrap
				md:tw-justify-center
				tw-p-4
		">
			<div class="
				tw-w-full
				tw-mb-4
				lg:tw-w-[800px]
			">
				<div class="tw-my-4">
					<q-btn
						:label="$t('icommerce.checkout.back')"
						icon="chevron_left"
						class="
							tw-font-[700]
							tw-text-[20px]
							q-pa-0
						"
						unelevated
						rounded
						no-caps
						@click="redirectToCart()"
					/>
				</div>

				<!-- user data -->
				<div class="shadow-card tw-rounded-3xl md:!tw-pt-8 tw-p-5">
					<h2 class="tw-leading-none tw-flex tw-items-center tw-gap-3 tw-text-[17px] md:tw-text-[22px] tw-font-bold tw-mb-5 lg:tw-mb-8">
						<span class="tw-rounded-full tw-border tw-border-gray-600 tw-h-7 tw-w-7 md:tw-h-10 md:tw-w-10 tw-flex tw-items-center tw-justify-center">1</span>
						{{ $t('icommerce.checkout.billingAddress') }}
					</h2>
					<!-- logging -->
					<q-inner-loading
						:showing="authStore.loading"
						label="Please wait..."
					> 
					<q-spinner-mat size="50px" color="primary"></q-spinner-mat>
					</q-inner-loading>
					<div 
						v-if="!authStore.isLogged()"
						class="
						tw-flex 
						tw-justify-center
						tw-align-middle
						tw-p-4
						tw-gap-4
						" 
					>
						<SocialAuthGoogle />
						<q-btn
							@click="redirectToLogin()"
							:label="$t('iauth.login.submitBtn')"
							icon="person"
							color="primary"
							unelevated
							rounded
							no-caps
						/>
					</div>

					<q-form @submit.prevent.stop="goToPayment" ref="refForm">
						<div class="tw-my-4 tw-grid lg:tw-grid-cols-2 tw-gap-y-5 lg:tw-gap-y-8 tw-gap-x-5">
							<q-input
								v-model="form.email"
								label="Email"
								:rules="[
									(val) => !!val || 'Correo es requerido.',
									(val) =>
									/.+@.+\..+/.test(val) ||
									'Por favor introduzca un correo valido',
								]"
								dense
								outlined
							/>
							<q-input
								v-model="form.firstName"
								label="Nombres"
								:rules="[
									(val) => !!val || 'Nombre es requerido.',
									(val) =>
									val.length >= 3 ||
									'El nombre debe de tener 3 o más caracteres',
								]"
								dense
								outlined
							/>
							<q-input
								v-model="form.lastName"
								label="Apellidos"
								:rules="[
									(val) => !!val || 'Apellido requerido.',
									(val) =>
									val.length >= 3 ||
									'El Apellido debe de tener 3 o más caracteres',
								]"
								dense
								outlined
							/>


							<q-select
								v-model="form.identificationType"
								:options="[{ value: 'cedula', label: 'Cedula de ciudadania' }]"
								option-value="value"
								option-label="label"
								outlined
								dense
								label="Tipo de identificacion"

							/>

							<q-input
								v-model="form.identification"
								label="Identificacion"
								:rules="[
									(val) => !!val || 'Campo requerido.',
								]"
								dense
								outlined
							/>
							<q-input
								v-model="form.mobilePhone"
								label="Phone"
								:rules="[
									(val) => !!val || 'Campo requerido.',
								]"
								type="tel"
								dense
								outlined
							/>

							<q-input
								v-model="form.country"
								label="Pais de residencia"
								:rules="[
									(val) => !!val || 'Campo requerido.',
								]"
								dense
								outlined
							/>
							<q-input
								v-model="form.address"
								label="Direccion"
								:rules="[
									(val) => !!val || 'Campo requerido.',
								]"
								dense
								outlined
							/>
							<q-input
								v-model="form.city"
								label="Ciudad"
								:rules="[
									(val) => !!val || 'Campo requerido.',
								]"
								dense
								outlined
							/>
							<q-input
								v-model="form.region"
								label="Region"
								:rules="[
									(val) => !!val || 'Campo requerido.',
								]"
								dense
								outlined
							/>
							<q-input
								v-model="form.zipCode"
								label="Codigo postal"
								:rules="[
									(val) => !!val || 'Campo requerido.',
								]"
								dense
								outlined
							/>
						</div>
						<div class="tw-my-4 ">
							<q-btn
								label="Continuar"
								type="submit"
								text-color="black"
								color="amber"
								class="
									tw-font-bold
									tw-rounded-lg
									tw-capitalize
									tw-w-full
									lg:tw-max-w-[160px]
									tw-text-[16px]
									lg:tw-text-[20px]
									tw-p-[8px 20px]
									lg:tw-p-[13px 30px]"
								unelevated
								no-caps
							/>
						</div>

					</q-form>
				</div>

			</div>
			<!-- summary -->
			<div class="
				tw-w-full
				md:tw-my-[20px]
				lg:tw-w-[800px]
				lg:tw-mt-0
				xl:tw-w-[400px]
				xl:tw-mt-[80px]
				xl:tw-ml-8
			">
				<div class="shadow-card tw-rounded-3xl !tw-pt-8 tw-p-5">
					<div class="tw-my-2">
						<h2 class="tw-leading-normal tw-font-semibold tw-text-md md:tw-text-base xl:tw-text-lg">
							{{ $t('icommerce.checkout.orderSummary') }}
						</h2>
					</div>
					<div class="tw-my-2">
						<q-expansion-item class="shadow-1 overflow-hidden"
							style="border-radius: 8px; background-color: #eceded;"
							:label="`${products.length} ${$t('icommerce.checkout.articles')}`"
							header-class="tw-leading-normal tw-font-semibold tw-text-md md:tw-text-base xl:tw-text-lg tw-px-4"
							expand-icon-class="">
							<template v-for="product in products" class="tw-my-4">
								<q-card>
									<q-card-section>
										<span
											class="tw-leading-normal tw-font-semibold tw-text-md md:tw-text-base xl:tw-text-lg">
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
												<span
													class="tw-leading-normal tw-font-light tw-text-sm md:tw-text-md !text-[#333]">
													{{ productsHelper.getPriceWithSymbol(product, cartState.currency) }}
												</span>
											</div>
										</div>

									</q-card-section>
								</q-card>
							</template>
						</q-expansion-item>
					</div>
					<hr class="tw-my-4" />
					<div class="tw-flex tw-justify-between tw-items-center">
						<span class="
							tw-font-[600]
							tw-text-[20px]
							tw-m-0
							tw-p-0
							tw-leading-5
						">
							{{ $t('icommerce.cart.subtotal') }}
						</span>
						<span class="
							tw-text-[18px]
							tw-font-[400]
							tw-m-0
							tw-p-0
							tw-leading-5
						">
							{{ productsHelper.priceWithSymbol(subtotal, cartState.currency) }}
						</span>
					</div>


					<!-- discount -->
					<div class="tw-flex tw-justify-between tw-items-center tw-my-2">
						<span class="tw-text-[14px] tw-font-[500] tw-text-[#818181]">
							{{ $t('icommerce.cart.discount')}} 00%
						</span>
						<span class="tw-text-[14px] tw-font-[600] tw-text-[#66BB6A]">
							{{ productsHelper.priceWithSymbol(0, cartState.currency) }}
						</span>
					</div>

					<div class="tw-my-4 tw-flex-nowrap">
						<span>Impuestos</span><br/>
						<span class="tw-text-[12px] tw-font-[400] tw-text-[#818181]">
							Calculado después de la información de facturación
						</span>
					</div>

					<hr class="tw-my-4" />

					<!--total--->
					<div class="tw-flex tw-justify-between tw-items-center tw-my-2">
						<span class="
							tw-font-[600]
							tw-text-[20px]
							tw-my-0
							tw-p-0
							tw-leading-5
						">
							Total
						</span>
						<span class="
							tw-text-[18px]
							tw-font-[400]
							tw-m-0
							tw-p-0
							tw-leading-5
						">
							{{ productsHelper.priceWithSymbol(subtotal, cartState.currency) }}
						</span>
					</div>

					<!--coupon -->
					<div>
						<div>
							<q-btn label="¿Tienes código de cupón?"
								class="q-p-0 tw-text-[14px] tw-font-[600] tw-text-[#03A9F4]" flat no-caps dense
								@click="showCouponInput = !showCouponInput" />
						</div>
						<div v-if="showCouponInput || form.coupon" class="tw-py-4">
							<q-input v-model="form.coupon" dense outlined />
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
import SocialAuthGoogle from '../../iauth/components/socialAuth/google.vue'


const quasar = useQuasar()
const authStore = useAuthStore()
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
const router = useRouter()

const refForm = ref(null)
const showCouponInput = ref(false)

const user = computed(() => authStore.user)
const products = computed(() => cartState.value.products)

const subtotal = computed(() => {
	let value = 0;
	if (!cartState?.value?.products.length) return value
	value = productsHelper.getSubtotal(cartState?.value?.products, cartState.value.currency)
	return value
})

//const disableButton = computed( () => refForm.value.validate() )

//const disableButton = ref(true)

watch(
	() => cartState.value.products,
	(newValue, oldValue) => {
		if (!newValue.length) redirectToCart()
	},
)

watch(
	() => user.value, 
	(newValue, oldValue) => {
		setFormData()
	}
)

onBeforeMount(() => {
	if (!cartState.value.products.length) redirectToCart() //empty cart
})


onMounted(() => {
	init()
})

function init() {
	setFormData()
	addRedirect()
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
	} else {		
		resetFormData()
	}

}

function resetFormData(){
	console.log('RESET')
	form.value = {
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
	}
}

function getField(name) {
	const field = user.value.fields.find((field) => field.name == name)
	console.warn(name, field)
	if (field && field?.value) return field.value
	return null
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



function addRedirect() {
	if (authStore.isLogged()) return 
	const path = getPath('icommerce.checkout')
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
		total: subtotal.value,

		products: products.value.map((product) => {
			return {
				id: product.id,
				//description: product.description,
				name: product.name,
				url: product.url,
				discount: product.discount,
				frecuency: productsHelper.hasFrencuency(product) ? product.frecuency : null,
				price: productsHelper.getPrice(product, cartState.currency),
				currency: cartState.value.currency
			}
		})
	}

	//console.log(JSON.stringify(order))

	const res = await $fetch(postUrl, {
		method: 'POST',
		body: JSON.stringify(order)
	}).then((response) => {
		//WIP
		window.location.replace('https://clientes.imaginacolombia.com');
		cartState.value = {
			products: [],
			currency:  cartState.value.currency
		}
	})





}

</script>
<style>
.shadow-card {
	box-shadow: 0px 10px 104px rgba(0, 0, 0, 0.08), 0px 3.8px 33px rgba(0, 0, 0, 0.04), 0px 0.8px 8.4px rgba(0, 0, 0, 0.02);
}
</style>