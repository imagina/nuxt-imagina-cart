<template>	
		<div>
			<hr/>
			<q-expansion-item
				label="Categorías"
				expand-icon-class="tw-p-2"
			>
			
			<q-list
				class="tw-h-full tw-overflow-y-auto tw-px-4"
			>
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
								<NuxtLink
									:to="`/products/${category.slug}`"  >

								<q-item 
								
									clickable
									v-ripple
									:active="isActive(children)"
									:class=" isActive(category) ? 'tw-font-[700]' : 'tw-font-[500]'"
								>
									<q-item-section>{{ children.title }}</q-item-section>
								</q-item>
								</NuxtLink>
							</template>
						</q-list>
					</q-expansion-item>
					<!-- no children -->
				<NuxtLink
				v-else
					:to="`/products/${category.slug}`">
					 
					<q-item 
						
						:to="`/products/${category.slug}`"  
						clickable
						v-ripple
						:active="isActive(category)"
						class="expansion-item"
						:class=" isActive(category) ? 'tw-font-[700]' : 'tw-font-[500]'"
					>
						<q-item-section>{{ category.title }}</q-item-section>
					</q-item>	
					</NuxtLink>
				</template>				
			</q-list>
			</q-expansion-item>
		</div>
	
</template>
<script setup>


const route = useRoute()

const categories = ref(null)

const props = defineProps( {
	categories: {
		type: Array,
		required: false	
	} 
})

onBeforeMount(async () => {
	await getCategories()
})

async function getCategories(){

	$fetch('/api/icommerce/categories').then(response => {		
		categories.value = response		
	})
}


function isActive(category){
	return route.path.includes(category?.slug) || false
}

</script>
<style>
.expand-icon > i {
	font-size: 15px !important; /* Cambia el tamaño del icono aquí */
}
</style>