<template>
	<div
		class="
			banner-page-hosting
			tw-h-[180px]
			tw-rounded-2xl
			tw-w-[100%]
			sm:tw-h-[240px]
			md:tw-h-[320px]
			lg:tw-h-[400px]
			tw-flex
			tw-align-middle
			tw-justify-center
			md:tw-justify-start
			tw-text-white
			tw-items-center
		"
		style="background-image: url(https://www.imaginacolombia.com/assets/media/pagina-web/05_extraLargeThumb.webp);"
	>

		<div style="z-index: 10; position: relative;" class="tw-p-8 tw-gap-8">
			<div>
				<span class="tw-hidden sm:tw-block tw-text-xl md:tw-text-5xl tw-font-semibold">Reseller Hosting en Colombia</span>
			</div>
			<div class="tw-py-4">
				<span class="tw-text-lg md:tw-text-xl tw-font-semibold">Planes actualizables ilimitadamente con todas las caracteristicas de seguridad y estabilidad de nuestro Hosting Linux.</span>
			</div>
			<bitrixScript />
		</div>
	</div>
</template>
<script setup>
   import bitrixScript from '../bitrixScript';
</script>
