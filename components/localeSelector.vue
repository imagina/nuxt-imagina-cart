<template>
	<q-select 	
		v-model="localeRef"		
		:options="locales" 
		option-label="name"
		option-value="code"		
		@update:model-value="setLocale()"
		outlined		
		hide-bottom-space
		dense
		options-dense		
		hide-dropdown-icon		
		emit-value
	/>
</template>
<script setup>
const { $i18n } = useNuxtApp();
const { locale, locales } = useI18n()
const localeRef = ref(locale)

async function setLocale(){
	await $i18n.setLocale(localeRef.value);
}
</script>
