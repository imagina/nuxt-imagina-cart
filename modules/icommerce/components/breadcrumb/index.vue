<template>
    <div class="tw-w-full tw-flex-row tw-py-3.5 tw-pl-3.5 lg:tw-pl-[80px] tw-bg-[#EEEEEE]">
        <q-breadcrumbs separator-color="mediumGray">
            <template v-slot:separator>
                <q-icon class="tw-text-[#888888]" name="fa-solid fa-angle-right" />
            </template>
            <q-breadcrumbs-el
                class="tw-text-base tw-text-[#888888] tw-font-extrabold"
                label="Tienda"
                :to="'/'"
            />
                
            <q-breadcrumbs-el
                v-if="selectedCategoryState"
                class="tw-text-base tw-text-[#888888] tw-font-medium"
                :label="selectedCategoryState?.title"
                
            />
            </q-breadcrumbs>
    </div>
</template>
<script setup>

const selectedCategoryState = useState('icommerce.selected.category', () => null)

/*
const router =  useRouter()
const currentRoute = computed(() => {
    return {
        path: router.currentRoute.value.name,
        label: router.currentRoute.value.meta.breadcrumb
    }      
});
*/


</script>