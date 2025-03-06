<template>
    <q-layout view="hHh lpR fFf">
			<q-page-container>
          <headerApp />
					<slot />
			</q-page-container>
    </q-layout>
</template>
<script setup>
import headerApp from '../modules/icommerce/components/header/index.vue'
</script>