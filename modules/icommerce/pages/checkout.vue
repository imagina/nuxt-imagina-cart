<template>
	<div class="tw-flex tw-gap-16 tw-flex-col tw-items-center tw-py-8">
		<div class="tw-grid tw-grid-cols-1">
			<div class="tw-flex">	
							
				<div>
					<q-btn
						label="Back"
						no-caps
						@click="redirectToCart()"
					/>			
				
					<!-- logged -->
					<div v-if="false">
						<div v-if="authStore.isLogged()">
								<q-btn
									label="Cerrar sesion"
									no-caps
									@click="redirectToLogout()"
								/>
						</div>
						<div v-else>
							<q-btn
									label="Inicia sesion"
									no-caps
									@click="redirectToLogin()"
								/>
						</div>
					</div>

					<!-- user data -->					
					<ClientOnly>
						<div>
							<h2>Datos del Cliente</h2>
							<q-form @submit.prevent.stop="goToPayment" ref="refForm">
								<q-input
									v-model="form.email"
									label="Email"
								/>
							<q-input
									v-model="form.firstName"
									label="Nombres"
								/>
								<q-input
									class="tw-mb-2"
									v-model="form.lastName"
									label="Apellidos"
								/>
								<q-input
									class="tw-mb-2"
									v-model="form.identification"
									label="Identificacion"
									
								/>
								<q-input
									class="tw-mb-2"
									v-model="form.mobilePhone"
									label="Phone"
									type="tel"
								/>
								<q-input
									class="tw-mb-2"
									v-model="form.country"
									label="Pais de residencia"
								/>
							<q-btn 
								no-caps
								label="Continuar"
								type="submit"							
							/>
						</q-form>
						</div>
					</ClientOnly>	
				</div>
				<ClientOnly>
					<div>
						<div class="tw-p-20">
							<div v-for="product in products" class="tw-m-4">
								{{ product.name }} 
								<p>									
									<div v-if="hasFrencuency(product)">
										{{ product.frecuency?.label }} 
									</div>
									<div>
										Price: {{ getPrice(product) }}
									</div>
									
								</p>
							</div>
							<hr />
							${{ subTotal }}
						</div>					
					</div>
				</ClientOnly>															
			</div>
		</div>

	</div>
</template>
<script setup>
import { useStorage } from '@vueuse/core'

const authStore = useAuthStore()

const cartState = useStorage('shoppingCart', {products: []})
const form = useStorage('shoppingCheckoutForm', {
	email: null, 
	firstName: null, 
	lastName: null, 
	identification: null, 
	mobilePhone: null,
	country: null
})
const router = useRouter()

const refForm = ref(null)

const user = computed(() => authStore.user)
const products = computed(() => cartState.value.products)



const subTotal	= computed(() => {
	let value = 0;
	if(!cartState?.value?.products.length) return value

  cartState?.value?.products.forEach(product => {
    const price  = getPrice(product)
    value = value + price
  });
	return value
  
})

watch(
  () => cartState.value.products,
  (newValue, oldValue) => {
    if(!newValue.length) redirectToCart()
  },
)



onMounted(() => {
    init()
})

function init(){
	setFormData()
}

function hasFrencuency(product){
  return product?.optionsPivot.length || false
}

function getPrice(product){
  return hasFrencuency(product) && product?.frecuency ? product.frecuency.value : product.price
}

function setFormData(){
	if(authStore.isLogged()){
		form.value = {
			email: user.value.email,
			firstName: user.value.firstName,
			lastName: user.value.lastName,
			identification: getField('identification'),
			mobilePhone: getField('cellularPhone')
		}
	}
}

function getField(name){
	const field = user.value.fields.find((field) => field.name == name)
	if(field) return field.value
	return false
}

function redirectToCart(){
	router.push({
		path: getPath('icommerce.cart')
	})
} 

function redirectToLogin(){
	const path = getPath('iauth.login')
	router.push({
		path,
		query: {
			redirectTo: 'icommerce.checkout',
		}
	})
}

function redirectToLogout(){
	const path = getPath('iauth.logout')
	router.push({
		path,
		query: {
			redirectTo: 'icommerce.checkout',
		}
	})
}

async function goToPayment(){

	const validateRegister = await refForm.value.validate()
	if (!validateRegister) return

	const order = {
		user: {...form.value}, 
		total: subTotal.value,

		products: products.value.map((product) =>  { 
			return { 
				id: product.id,
				//description: product.description,
				name: product.name,
				url: product.url,
				discount: product.discount, 
				frecuency: hasFrencuency(product) ? product.frecuency : null,
				price: getPrice(product)
			}
		})
	}

	console.log(JSON.stringify(order))	
	return
	
	const url  = 'https://clientes.imaginacolombia.com/newcartorder.php'
	const res = await $fetch(url, {
    method: 'POST',
		body: JSON.stringify(order)		
  	}).then((response) => {
		console.log(response)
	})

	console.log(res)


	
}

</script>
