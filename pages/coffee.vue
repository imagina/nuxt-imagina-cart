<script setup lang="ts">
	//const { data } = await useFetch('/api/coffee')
	const { data } = await useFetch('https://api.sampleapis.com/coffee/hot')
</script>

<template>
	<div>		
		<NuxtLink to="/products">
			BACK to products list 
		</NuxtLink>
		<h1>Coffee list</h1>
		<div class="grid grid-cols-4 gap-4">
			<template v-for="(item, index) in data">			
				<div>
					<img class="w-[250px] rounded-b-md" :src="item.image">
					<h5 class="mb-2 text-xl font-medium leading-tight">{{ item.title }}</h5>
					<p class="mb-4 text-base">
						{{ item.description }}
					</p>
				</div>			
			</template>
		</div>
	</div>
</template>
