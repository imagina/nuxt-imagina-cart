<template>
    <div class="tw-mt-8 md:tw-mt-12 tw-flex tw-justify-center md:tw-justify-start">
        <q-btn
            label="Solicita una cotización"
            color="primary"
            class="tw-text-[16px] md:tw-text-[20px] tw-font-[500] tw-duration-200 tw-rounded-full xl:tw-px-6"
            unelevated
            no-caps
            role="button"
        />
    </div>
</template>
<script setup>
import { useScript } from 'unhead'

const params = (Date.now()/180000|0)

const scriptUrl = `https://cdn.bitrix24.com/b16889623/crm/form/loader_4.js?${params}`;

useScript({
	src: scriptUrl,
	'data-b24-form': 'click/4/ftnt27', 
	'data-skip-moving': 'true'
})

</script>

