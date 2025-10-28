<template>
	<ClientOnly>
		<div
			v-if="products"
			class="
				tw-flex
				tw-flex-wrap
				md:tw-justify-center
				tw-p-4
				tw-bg-[#f4f5ff]
		"

		>
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
				<div class="shadow-card tw-bg-white tw-rounded-3xl md:!tw-pt-8 tw-p-5">
					<h2 class="tw-leading-none tw-flex tw-items-center tw-gap-3 tw-text-[17px] md:tw-text-[22px] tw-font-bold tw-mb-5 lg:tw-mb-8">
						<span class="tw-rounded-full tw-border tw-border-gray-600 tw-h-7 tw-w-7 md:tw-h-10 md:tw-w-10 tw-flex tw-items-center tw-justify-center">1</span>
						{{ $t('icommerce.checkout.billingAddress') }}
					</h2>
					<!-- logging -->
					<q-inner-loading
						:showing="authStore.loading"
						label="Please wait..."
					>
					<q-spinner size="50px" color="primary"></q-spinner>
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
								v-model.trim="form.email"
								label="Email"
								:rules="[
									(val) => !!val || 'Correo es requerido.',
									(val) => !/\s/.test(val) || 'El Correo no debe contener espacios',
									(val) => isValidEmail(val)
								]"
								dense
								outlined
							/>
							<q-input
								v-model.trim="form.firstName"
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
								v-model.trim="form.lastName"
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
								:options="identificationTypeOptions"
								option-value="value"
								option-label="label"
								outlined
								dense
								label="Tipo de identificación"
							/>

							<q-input
								v-model.trim="form.identification"
								label="Identificación"
								:rules="[
									(val) => !!val || 'Campo requerido.',
								]"
								dense
								outlined
							/>

							<q-input
								v-if="showCompanyname"
								v-model.trim="form.companyName"
								label="Nombre de Empresa (Opcional)"
								:rules="[
									(val) => !!val || 'Campo requerido.',
								]"
								dense
								outlined
							/>

							<q-input
								v-model.trim="form.mobilePhone"
								label="Teléfono"
								:rules="[
									(val) => !!val || 'Campo requerido.'
								]"
								type="tel"
								dense
								outlined
							/>
							<q-select
								v-model="form.country"
								label="País de residencia"
								:options="countries"
								option-value="id"
								option-label="name"
								@update:model-value="getProvinces()"
								:rules="[
									(val) => !!val || 'Campo requerido.',
								]"
								dense
								outlined
								:disable="!countries.length"
							/>
							<q-select
								v-model="form.province"
								label="Estado"
								:options="provinces"
								option-value="id"
								option-label="name"
								@update:model-value="getCities()"
								:rules="[
									(val) => !!val || 'Campo requerido.',
								]"
								dense
								outlined
								:disable="!provinces.length"

							/>
							<q-select
								v-model="form.city"
								label="Ciudad"
								:options="cities"
								option-value="id"
								option-label="name"
								:rules="[
									(val) => !!val || 'Campo requerido.',
								]"
								dense
								outlined
								:disable="!cities.length"
							/>
							<q-input
								v-model.trim="form.address"
								label="Dirección"
								:rules="[
									(val) => !!val  || 'Campo requerido.',
									(val) => (/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#°\-]{5,100}$/).test(val) || 'Dirección inválida (usa letras, números o signos comunes).',
								]"
								dense
								outlined
							/>
							<q-input
								v-model.trim="form.zipCode"
								label="Código  postal"
								:rules="[
									(val) => !!val || 'El código postal es obligatorio',
									(val) => (/^[0-9]{4,10}$/.test(val)) || 'Código postal inválido'
								]"
								dense
								outlined
							/>
						</div>
						<div class="tw-my-4 ">
							<q-btn
								label="Continuar"
								type="submit"

								color="primary"
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
				<div class="shadow-card tw-bg-white  tw-rounded-3xl !tw-pt-8 tw-p-5">
					<SummaryComponent
						:cartState="cartState"
					/>
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
import SummaryComponent  from '../components/cart/summary.vue'
import apiRoutes from '../config/apiRoutes'


definePageMeta({
  middleware: 'auth',
})

const identificationTypeOptions = [
	{ value: 'Cédula de Ciudadanía', label: 'Cedula de ciudadania' },
	{ value: 'NIT', label: 'NIT' },
	{ value: 'Cédula de Extranjería', label: 'Cédula de Extranjería' },
	{ value: 'Pasaporte', label: 'Pasaporte' },
	{ value: 'Documento de Identificación extranjero', label: 'Documento de Identificación extranjero' },
	{ value: 'NIT Externo', label: 'NIT Externo' },
]

const quasar = useQuasar()
const authStore = useAuthStore()
const cartState = useStorage('icommerce.cart', {
	products: [],
	currency: 'COP'
})

const form = useStorage('icommerce.CheckoutForm', {
	coupon: null,
	email: null,
	firstName: null,
	lastName: null,
	identification: null,
	identificationType: identificationTypeOptions[0],
	mobilePhone: null,
	country: null,
	address: null,
	city: null,
	province: null,
	zipCode: null
})
const router = useRouter()
const route = useRoute()

const refForm = ref(null)
const showCouponInput = ref(false)
const countries = ref([])
const provinces = ref([])
const cities = ref([])

const user = computed(() => authStore.user)
const products = computed(() => cartState.value.products)

const subtotal = computed(() => productsHelper.getSubtotal(cartState.value.products, cartState.value.currency))

const mainProduct = computed(() =>  cartState.value?.products[0] || null)
const mainDomain = computed(() =>  cartState.value?.products[1] || null)

const showCompanyname = computed(() => (form.value.identificationType?.value == identificationTypeOptions[1].value) || (form.value.identificationType?.value == identificationTypeOptions[5].value) || false)

watch(
	() => cartState.value.products,
	(newValue, oldValue) => {
		if (!newValue.length) redirectToCart()
	},
)

watch(
	() => user.value,
	(newValue, oldValue) => {
		setFormData(true)
	}
)

onBeforeMount(() => {
	if (!cartState.value.products.length) redirectToCart() //empty cart
})


onMounted(async () => {
	await init()
	if (import.meta.client){
		GA_beginCheckout()
	}

})

async function init() {
	await setFormData()
	await getCountries().then( async () => {
		//if(cartState.value.products.length) addRedirect()
	})

}

function isValidEmail(val){
	///(val) => !!/\s/.test(val) || 'El correo no puede contener espacio.',
	return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Por favor introduzca un correo valido'

}

function GA_beginCheckout(){


	const subtotal = computed(() => productsHelper.getSubtotal(cartState.value.products, cartState.value.currency))

	const items = cartState.value.products.map((product) => {
		return {
			item_id: mainProduct.value.id,
			item_name: `Registro de dominio ${product.domain.ext}`,
			item_category: mainProduct.value.category.title,
			item_brand: mainProduct.value.name,
			domain: `.${product.domain.name}`,
			ext: product.domain.ext,
			frecuency: mainProduct.value.frecuency.label,
			price: product.price,
			quantity: 1
		}

	})

	try {
		gtag('event', 'begin_checkout', {
		currency: cartState.value.currency,
		value: subtotal,
		items
		})

	} catch (e) {
		console.log(e)
	}
}



async function getCountries(){
	countries.value = []
	provinces.value = []
	return await baseService.index(apiRoutes.countries).then(response => {
			if(response?.data) countries.value = response.data.filter(x => x.status).sort((a, b) => a.name.localeCompare(b.name));

			if(!form.value.country) form.value.country = countries.value.find(x => x.id == 48) || countries.value[0] //Colombia

			getProvinces()
	})
}

async function getProvinces(){
	provinces.value = []
	cities.value = []
	return await baseService.index(apiRoutes.provinces, {
		filter: {
			country: form.value.country.id
		}
	}).then(response => {
			if(response?.data) provinces.value = response.data.sort((a, b) => a.name.localeCompare(b.name));
			if(!form.value.province)  form.value.province = provinces.value[0]
			getCities()
	})
}

async function getCities(){
	cities.value = []
	return await baseService.index(apiRoutes.cities, {
		filter: {
			country: form.value.country.id,
			province: form.value.province.id
		}

	}).then(response => {
			if(response?.data) cities.value = response.data.sort((a, b) => a.name.localeCompare(b.name));
			if(!form.value.city) form.value.city = cities.value[0]
	})
}




function setFormData(reset = false) {
	if (authStore.isLogged()){
		form.value.email = form.value.email.trim() ||  user.value.email.trim()
		form.value.firstName = form.value.firstName ||  user.value.firstName
		form.value.lastName = form.value.lastName || user.value.lastName
		form.value.identification = form.value.identification ||  getField('identification')
		form.value.mobilePhone = form.value.mobilePhone || getField('cellularPhone')
		form.value.identificationType = form.value.identificationType || identificationTypeOptions[0]
	} else {
		if(reset) resetFormData()
	}

}


function resetFormData(){
	//console.log('RESET')
	form.value = {
		coupon: null,
		email: null,
		firstName: null,
		lastName: null,
		identification: null,
		identificationType: identificationTypeOptions[0],
		mobilePhone: null,
		country: null,
		address: null,
		city: null,
		state: null,
		zipCode: null
	}
}

function getField(name) {
	const field = user.value.fields.find((field) => field.name == name)
	if (field && field?.value) return field.value
	return null
}

function calcDiscount(){
  return productsHelper.calcDiscount(cartState.value.products, subtotal.value)
}

function redirectToCart() {
	router.push({
		path: getPath('icommerce.cart'),
		//query: route.query,

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
			...route.query,
			redirectTo: 'icommerce.checkout',
		}
	})
}


async function goToPayment() {

	const validateRegister = await refForm.value.validate()
	if (!validateRegister) return


	quasar.loading.show({
		message: 'Estamos procesando su pedido',
	})


	const order = {

		currency: cartState.value.currency,
		total: subtotal.value,

		products: products.value.map((product) => {
			const frecuency = productsHelper.hasFrencuency(product) ? product?.frecuency : {}
			const frecuencyMonths = parseInt(frecuency.label.match(/\d+/)[0], 10) || 0
			const renewal = frecuencyMonths > 12 ? (( frecuencyMonths / 12) - 1) : 0

			return {
				id: product?.externalId || product?.domain?.ext || null,
				domain: product?.domain?.domainName || null,
				billincycle: frecuency?.frecuency || null,
				domainType: product?.domain?.action?.value || null,
			    transferCode: product?.domain?.transferCode || null,
				frecuency: frecuencyMonths,
				renewal
			}
		})
	}


	if(order.products.length > 1){
		//setup the main domain o main product
		order.products[0].domain = order.products[1].domain
		order.products = order.products.filter((_, index) => index !== 1);
	}


	const user = { ...form.value }
	user.city = user.city.name
	user.state = user.province.name
	delete user.province
	delete user.coupon
	user.country = user.country['iso2'] || user.country['name']
	user.identificationType = user.identificationType.value
	order.user = user

	const res = await $fetch(apiRoutes.newCartOrder, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(order)
	}).then((response) => {

		const redirectUrl = response.redirectUrl || apiRoutes.imaginaClients
		window.location.replace(redirectUrl);

		cartState.value = {
			products: [],
			currency:  cartState.value.currency
		}

		quasar.loading.hide()
	}).catch((error) => {
		quasar.loading.hide()
		console.log(error)	
	})
}

</script>
<style>
.shadow-card {
	/*box-shadow: 0px 10px 104px rgba(0, 0, 0, 0.08), 0px 3.8px 33px rgba(0, 0, 0, 0.04), 0px 0.8px 8.4px rgba(0, 0, 0, 0.02);*/
}
</style>