<template>
		<div class="tw-w-[400px] tw-p-[20px]">
			<h1>categorias</h1>
			<q-list>				
				<template v-for="category in categories">
					<q-expansion-item
						:label="category.label"
					/>
				</template>				
			</q-list>          
	
		</div>
  </template>
  <script setup>

import apiRoutes from '../../config/apiRoutes'


	const categories = ref([])


	async function init(){
       await getCategories()
	}


	async function getCategories(){
	
		const params = {
			take: 60,
			page: 1,
			//order: sort.value, 
			//include: 'relatedProducts,categories,category,parent,manufacturer'
		}
		baseService.index(apiRoutes.categories, params).then(response => {
			let  data =  response?.data || []
			
			//data = data.filter(item => item?.showMenu)

			categories.value = data.map((category) => {
				return { label: category.title}
			})

		})
	}

	onMounted(async () => {
		init();
	})

  </script>
 <style>
	
</style>