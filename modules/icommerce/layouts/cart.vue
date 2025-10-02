<template>    
    <ClientOnly>
        <bitrixSupportButton />
        <googleTag />
    </ClientOnly>	              
    <div>
        <headerComponent/>
        <slot />
    </div>
</template>
<script setup>

import bitrixSupportButton from '~/components/bitrixSupportButton.vue';
import googleTag from '~/components/googleTag.vue';
import headerComponent from '../components/cart/header.vue';

</script>