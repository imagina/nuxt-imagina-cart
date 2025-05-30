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
		style="background-image: url(https://www.imaginacolombia.com/assets/media/dalle-2024-06-27-094113-a-sleek-and-modern-web-hosting-advertisement-for-hosting-windows-net-c-product-page-the-background-features-a-dynamic-digital-landscape-with-serv_extraLargeThumb.webp);"
	>

		<div style="z-index: 10; position: relative;" class="tw-p-8 tw-gap-8">
			<div>
				<span class="tw-text-xl md:tw-text-5xl tw-font-semibold">Hosting Windows</span>
			</div>
			<div>
				<span class="tw-text-xl md:tw-text-4xl tw-font-semibold">ASP / .NET / C# / SQL SERVER</span>
			</div>
			<div class="tw-my-4 md:tw-my-4">
				<p class="tw-text-md md:tw-text-xl tw-hidden md:tw-block">Panel de Control Plesk Última versión, Configuraciones a medida.</p>
			</div>
			<bitrixScript />
		</div>
	</div>
</template>
<script setup>
   import bitrixScript from '../bitrixScript';
</script>