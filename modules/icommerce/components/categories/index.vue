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
						v-if="category?.children"						
						class="expansion-item"
						:label="category.title"
						header-class="tw-text-lg tw-text-sm"
						expand-icon="fa-solid fa-caret-down"
						expand-icon-class="expand-icon"
						expand-separator
					>
						<q-list 							
							class="tw-px-4"
						>
							<template v-for="children in category.children">
								<q-item 
									@click="() => selectedCategory(children)"
									clickable
									v-ripple
								>
									<q-item-section>{{ children.title }}</q-item-section>
								</q-item>
							</template>
						</q-list>
					</q-expansion-item>
					<!-- no children -->
					<q-item 
						v-else
						@click="() => selectedCategory(category)"
						clickable
						v-ripple
					>
						<q-item-section>{{ category.title }}</q-item-section>
					</q-item>	
				</template>				
			</q-list>
		</div>
	</div>
</template>
<script setup>

import apiRoutes from '../../config/apiRoutes'

const emits = defineEmits(['selectedCategory'])

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

		/*for testing */
		
		const ids = data.map(item => item.id)
		data.forEach(element => {
			const n  = Math.floor(Math.random() * ids.length)
			element.parentId = n < 5 ? null : ids[n]
		});
		
		/*for testing */	

		const parents = data.filter(item => item.parentId == null)
		parents.forEach((category) => {
			const children = data.filter(item => item.parentId == category.id)
			if(children.length) category.children = children
		})

		categories.value = parents		
	})
}

function selectedCategory(category){
	emits('selectedCategory', category)
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