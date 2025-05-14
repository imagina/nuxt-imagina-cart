<template>
	<q-select 	
		v-if="false"
		v-model="localeRef"		
		:options="locales" 
		option-label="name"
		option-value="code"		
		@update:model-value="changeLocale()"
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
const router = useRouter()
const { locale, locales, setLocale } = useI18n()
const localeRef = ref(locale)

async function changeLocale(){
	await $i18n.setLocale(localeRef.value);
	
	// for i18n prefix ?
	//setLocale(localeRef.value)
	//window.location.reload(true)
	
}
</script>
