<template>
	<div class="tw-flex tw-gap-16 tw-flex-col tw-items-center tw-py-8">
		<div class="tw-grid tw-grid-cols-1">
			<q-btn
						label="Back"
						@click="redirectToCart()"
					/>
				<!-- logged -->

				Datos del Cliente

				<div v-if="authStore.isLogged()">
						<q-btn
							label="Cerrar sesion"
							@click="redirectToLogout()"
						/>
				</div>
				<div v-else>
					<q-btn
							label="Inicia sesion"
							@click="redirectToLogin()"
						/>
				</div>





					 {{ user?.fullName }}


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













		</div>

	</div>
</template>
<script setup>
import { useStorage } from '@vueuse/core'

const authStore = useAuthStore()

const cartState = useStorage('cart', {products: []})
const router = useRouter()

const user = computed(() => authStore.user)

const form = ref({})

const currencies = [
    { value:'COP',  label:'Colombian peso', symbol: '$' },
    { value: 'USD', label: 'United States dollar', symbol: '$'}
];

const currency = ref(currencies[0].value)

const showCart = computed(() => cartState.value?.products?.length ||  false)

onMounted(() => {
    init()
})

function init(){
	setFormData()
}

function setFormData(){

	if(authStore.isLogged()){
			form.value = {
				firstName: user.value.firstName,
				lastName: user.value.lastName,
				identification: getField('identification')
			}
	}


}

function redirectToCart(){
	router.push({
		path: getPath('icommerce.cart')
	})
}
 function getField(name){
	const field = user.value.fields.find((field) => field.name == name)
	if(field) return field.value
	return false
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

</script>
