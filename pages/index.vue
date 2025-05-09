<template>
	<div>
	</div>
</template>
<script setup>

const router = useRouter()

const redirectPath = getPath('icommerce.products')

onMounted( () => {
	init()
})

function init(){
	router.push({
		path: redirectPath
	})
}


definePageMeta({
  middleware: 'auth',
})

</script>

