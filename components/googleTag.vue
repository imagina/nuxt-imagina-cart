<template>	
</template>
<script setup>

const id = import.meta.env.PROD ? 'G-8SKBC7T5PP' : 'G-BVFN8DF2P7' ;

function addScript(){
	const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){ dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', id);     
    };
    document.body.appendChild(script);
}

onMounted(() => {
	addScript()
})


function sendEvent(type = 'event', name, data = {} ) {
    gtag(type, name, data);
}
	

</script>

