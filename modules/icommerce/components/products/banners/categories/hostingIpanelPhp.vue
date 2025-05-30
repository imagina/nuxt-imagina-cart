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
		style="background-image: url(https://www.imaginacolombia.com/assets/media/ipanel/web-hosting-col2_extraLargeThumb.webp);"
	>

		<div style="z-index: 10; position: relative;" class="tw-p-8 tw-gap-8">
			<div>
				<span class="tw-text-xl md:tw-text-5xl tw-font-semibold">Hosting en Colombia</span>
			</div>
			<div>
				<span class="tw-text-xl md:tw-text-4xl tw-font-semibold">Encuentra uno de los servicios mas potentes de hosting en Colombia</span>
			</div>
			<div class="tw-my-4 md:tw-my-4">
				<p class="tw-text-md md:tw-text-xl tw-hidden md:tw-block">Web hosting facil con todas las caracteristicas para crecer en el mundo digital</p>
			</div>
			<div class="tw-my-2 md:tw-my-8 tw-flex tw-justify-center md:tw-justify-start" v-if="false">
				<q-btn
					label="Solicita una cotización"
					color="primary"
					class="md:tw-text-[20px] tw-font-[400] tw-duration-200 tw-rounded-full xl:tw-px-6"
					unelevated
					no-caps
				/>
			</div>
		</div>
	</div>
</template>