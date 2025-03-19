<template>
	<div class="tw-flex tw-gap-16 tw-flex-col tw-items-center tw-py-8">
		<div class="tw-grid tw-grid-cols-1">
			<div class="tw-flex">
				<!-- user data -->
				<div>
			<q-btn
						label="Back"
						no-caps
						@click="redirectToCart()"
					/>
				<!-- logged -->

				Datos del Cliente

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

					 {{ user?.fullName }}
					 <q-input
							v-model="form.email"
							label="Nombres"
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
						/>

						<q-btn 
							no-caps
							label="Continuar"
							@click="goToPayment()"
						/>

						

						


				</div>
				<div>
					<div class="tw-p-20">
						<div v-for="product in products">
							{{ product.name }}
						</div>
						<hr />
						${{ subTotal }}

					</div>
					

					
					
				</div>
			</div>
		</div>

	</div>
</template>
<script setup>
import { useStorage } from '@vueuse/core'

const authStore = useAuthStore()

const cartState = useStorage('shoppingCart', {products: []})
const router = useRouter()

const user = computed(() => authStore.user)
const form = ref({})

const products = computed(() => cartState.value.products)



const subTotal	= computed(() => {
	let value = 0;
	if(!cartState?.value?.products.length) return value

  cartState?.value?.products.forEach(product => {
    const price  = product?.frecuency ? product.frecuency.value : product.price
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
	const url  = 'wh'
	const res = await $fetch(url, {
    method: 'POST',
    body: {
      // My form data
    }
  })

	console.log(res)
}

</script>
