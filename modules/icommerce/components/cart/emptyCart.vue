<template>
    <!-- empty cart -->
    <div 
        class="tw-min-h-[50vh]"
    >
        <h1 class="tw-text-[35px] tw-font-[700]">{{ $t('icommerce.cart.yourCart') }}</h1>
        <div class="tw-my-4 tw-text-[14px] tw-font-[400]">
            <p>
                {{ $t('icommerce.cart.emptyCart') }}
            </p>
        </div>
        <q-btn
            :label="$t('icommerce.goToStore')"
            text-color="black"
            color="amber"
            no-caps
            unelevated
            class="
                tw-w-2/4
                tw-justify-center
                tw-font-bold
                tw-rounded-lg
                tw-mt-4
                tw-my-8
            "
            @click="() => { router.push({ path: getPath('icommerce.products') })}"
        />
    </div>
</template>
<script setup>
const { t } = useI18n()
const router = useRouter()

</script>