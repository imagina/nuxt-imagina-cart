<template>    
    <ClientOnly>
        <bitrixSupportButton />
        <googleTag />
    </ClientOnly>	              
    <div>
        <headerComponent/>        
        <slot />
        <footerComponent />
    </div>
</template>
<script setup>

import bitrixSupportButton from '~/components/bitrixSupportButton.vue';
import googleTag from '~/components/googleTag.vue';
import headerComponent from '../components/cart/header.vue';
import footerComponent from '../components/cart/footer.vue';

</script>