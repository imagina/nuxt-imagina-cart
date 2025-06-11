<template>
    
    <div class="tw-w-full tw-flex-row tw-py-3.5 tw-pl-3.5 lg:tw-pl-[80px] tw-bg-[#EEEEEE] tw-min-h-[52px]">        
        <q-breadcrumbs separator-color="mediumGray">
            <template v-slot:separator>
                <q-icon class="tw-text-[#888888]" name="fa-solid fa-angle-right" />
            </template>
            <q-breadcrumbs-el
                class="tw-text-[14px] md:tw-text-base tw-font-[800] tw-text-[#888888] "
                label="Tienda"
                :to="'/'"
            />
                
            <q-breadcrumbs-el
                class="tw-text-[14px] md:tw-text-base tw-text-[#888888] tw-font-medium"
                :label="currentRoute"
            />
            </q-breadcrumbs>
    </div>
    
    
</template>
<script setup>
const route = useRoute()
const currentRoute = computed(() =>  {
    if(route.name == 'icommerce.products') return (route?.params?.slug || route.meta.breadcrumb )
    return route?.meta?.breadcrumb || ''
})
</script>