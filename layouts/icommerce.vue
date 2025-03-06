<template>
      <q-layout view="hHh lpR fFf">
		<div class="tw-m-8">
			<cartComponent />
		</div>

		
			<q-page-container>					
					<slot />					
			</q-page-container>    
    </q-layout>  
</template>
<script setup>
 import cartComponent from '../modules/icommerce/components/cart'

</script>