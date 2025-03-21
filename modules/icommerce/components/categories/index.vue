<template>
	<div class="lg:tw-pr-[20px]">
		<q-btn
			flat
			round
			dense
			icon="menu"
			@click="drawer = !drawer"
			v-show="isMobile"
		/>
		<div v-show="drawer">
			<h1 class="tw-text-lg tw-font-semibold tw-mb-[30px]">
				CATEGORÍAS
			</h1>
			<q-list>				
				<template v-for="category in categories">
					<q-expansion-item
						class="expansion-item"
						:label="category.label"
						header-class="tw-text-lg tw-text-sm"
						expand-icon="fa-solid fa-caret-down"
						expand-icon-class="expand-icon"
						expand-separator
					/>
				</template>				
			</q-list>
		</div>
	</div>
</template>
<script setup>

import apiRoutes from '../../config/apiRoutes'

const categories = ref([])
const drawer = ref(false)
const isMobile = ref(false)
const BREAKPOINT = 1024

function updateViewport() {
	isMobile.value = window.innerWidth < BREAKPOINT
	drawer.value = !isMobile.value
}

onBeforeMount(async () => {
	await getCategories()
})

async function init(){
	updateViewport()
	window.addEventListener('resize', updateViewport)	
}

async function getCategories(){

	const params = {
		take: 20,
		page: 1,
		//order: sort.value,
	}

	baseService.index(apiRoutes.categories, params).then(response => {
		let  data =  response?.data || []
		categories.value = data.map((category) => {
			return { label: category.title}
		})
	})
}

onMounted(async () => {
	init();
})

onUnmounted(() => {
	window.removeEventListener('resize', updateViewport)
})

</script>
<style>
.expand-icon > i {
	font-size: 15px !important; /* Cambia el tamaño del icono aquí */
}
</style>