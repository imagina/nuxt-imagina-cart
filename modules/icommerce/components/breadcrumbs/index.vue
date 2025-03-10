<template>
    <div class="tw-w-full tw-py-3.5 tw-pl-3.5 lg:tw-pl-[80px] tw-bg-[#EEEEEE]">
        <q-breadcrumbs separator-color="mediumGray">
            <template v-slot:separator>
                <q-icon class="tw-text-[#888888]" name="fa-solid fa-angle-right" />
            </template>
            <q-breadcrumbs-el
                class="tw-text-base tw-text-[#888888] tw-font-extrabold"
                label="Home" 
            />
            <q-breadcrumbs-el
                class="tw-text-base tw-text-[#888888] tw-font-medium"
                label="Tienda" 
            />
        </q-breadcrumbs>
    </div>
</template>