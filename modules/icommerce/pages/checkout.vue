<template>    
	<div class="tw-flex tw-gap-16 tw-flex-col tw-items-center tw-py-8">
		<div class="tw-grid tw-grid-cols-1">
			<q-btn 
						label="Back"
						@click="redirectToCart()"
					/>
				<!-- logged -->			
				<div v-if="authStore.isLogged()">					
					 {{ user?.fullName }}					


					 <q-input
                  filled                 
                  class="tw-mb-2"
                  v-model="form.firstName"
                  label="Nombres"                  
						/>


						<q-input
                  filled                 
                  class="tw-mb-2"
                  v-model="form.lastName"
                  label="Nombres"                  
						/>


						<q-input
                  filled                 
                  class="tw-mb-2"
                  v-model="form.identification"
                  label="Nombres"                  
						/>



				</div>
				<!-- not logged -->
				<div v-else>		

					<div>						
						Datos del Cliente
						<q-btn
						label="Inicia sesion"
						@click="redirectToLogin()"
					/>


					</div>
					
					

					
					


				</div>
				
			

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

watch(
  () => authStore.user,
  (newQuery, oldQuery) => {
    setFormData()
  },
)

function init(){
	//setFormData()
}

function setFormData(){
	console.log('hello')
	form.value = {
		firstName: user.firstName,
		lastName: user.lastName,
		identification: getField('identification') 
	}
}

function redirectToCart(){	
	router.push({ 
		path: getPath('icommerce.cart') 		
	})
}
 function getField(name){
	return user.fields.find((field) => field.name == 'name').value || false
 }

function redirectToLogin(){
	const path = getPath('iauth.login')	
	router.push({ 
		path, 
		query: {
			redirectTo: 'icommerce.checkout', 
			step: 2
		}
	})
}

</script>
