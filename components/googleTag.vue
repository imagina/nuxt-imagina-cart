<template>
</template>
<script setup>
const src = 'https://www.googletagmanager.com/gtag/js';
const id = 'G-8SKBC7T5PP';

function addScript(w,d,u){
	let s=d.createElement('script');s.async=true;s.src=u;
	d.body.appendChild(s);
	let s2 = d.createElement('script')
	s2.innerHTML = `
	function runGtag(){
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', '${id}')
	}
	runGtag()`
	d.body.appendChild(s2);
}

onMounted(() => {
	//if (import.meta.env.PROD) {
    addScript(window, document,  `${src}?id=${id}`);
	//}
})

</script>

