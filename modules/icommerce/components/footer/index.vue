<script setup>
    const networks = [
        {
            icon: 'fa-brands fa-facebook-f'
        },
        {
            icon: 'fa-brands fa-instagram'
        },
        {
            icon: 'fa-brands fa-linkedin-in'
        },
        {
            icon: 'fa-brands fa-skype'
        },
        {
            icon: 'fa-brands fa-youtube'
        },
        {
            icon: 'fa-brands fa-whatsapp'
        },
    ]
</script>
<template>
    <footer class="tw-flex tw-items-center tw-flex-col tw-w-full tw-bg-[#101923]">
        <div class="tw-flex tw-items-center tw-flex-col tw-pt-24 tw-pb-14">
            <span class="tw-text-sm tw-text-[#777777]">ESTAMOS LISTOS</span>
            <h1 class="tw-text-[45px] tw-font-bold tw-text-white tw-mb-11">
                ¿Te imaginas un proyecto juntos?
            </h1>
            <q-btn
                label="¡Vamos a iniciar!"
                text-color="white"
                no-caps
                unelevated
                class="
                    tw-w-[172px]
                    tw-justify-center
                    tw-text-base
                    tw-rounded-full
                    tw-mb-8
                    tw-bg-[#DC3545]
                "
            />
            <div class="tw-flex tw-justify-center tw-gap-4">
                <q-btn
                    v-for="network in networks"
                    no-caps
                    unelevated
                    :icon="network?.icon"
                    class="
                        tw-w-[42px]
                        tw-h-[42px]
                        tw-justify-center
                        tw-text-sm
                        tw-rounded-full
                        tw-border
                        tw-border-solid
                        tw-border-[#A0A0A0]
                        tw-text-[#A0A0A0]
                    "
                />
            </div>
        </div>
        <div 
            class="
                tw-flex
                tw-text-base
                tw-justify-between
                tw-text-[#B4B4B4] 
                tw-border-y
                tw-py-10
                tw-border-[#79727280]
            "
        >
            <section class="tw-flex tw-text-base tw-items-center tw-gap-4">
                <div>
                    <img 
                        src="../../assets/img/white-logo-imagina.png" 
                    />
                </div>
                <div>
                    <p>Líneas móviles</p>
                    <div>
                        <span>Ventas: </span>
                        <span class="tw-font-semibold">317 450 8140</span>
                    </div>
                    <div>
                        <span>Soporte: </span>
                        <span class="tw-font-semibold">300 782 6387</span>
                    </div>
                    <div>
                        <span>Proyectos: </span>
                        <span class="tw-font-semibold">300 782 6387</span>
                    </div>
                    <div>
                        <span>Marketing: </span>
                        <span class="tw-font-semibold">300 782 6387</span>
                    </div>
                    <div class="tw-mt-4">
                        <span>• Bogotá: </span>
                        <span class="tw-font-semibold">+57 6013824850</span>
                    </div>
                    <div>
                        <span>• Miami: </span>
                        <span class="tw-font-semibold">+1 3212522392</span>
                    </div>
                </div>
            </section>
            <section class="tw-flex tw-flex-col tw-items-center">
                <span>• Recibe todas las Novedades •</span>
                <q-btn
                    label="Click aquí"
                    text-color="white"
                    no-caps
                    unelevated
                    class="
                        tw-w-[121px]
                        tw-justify-center
                        tw-text-base
                        tw-rounded-full
                        tw-mt-4
                        tw-mb-8
                        tw-bg-[#DC3545]
                    "
                />
                <span>• Otros Enlaces •</span>
                <a>Informe Bic 2024</a>
            </section>
        </div>
        <div 
            class="
                tw-flex 
                
                tw-justify-between
                tw-text-[#999999] 
                tw-text-[13px] 
                tw-my-3
            "
        >
            <span>Nosotros</span>
            <span>Términos y Condiciones</span>
            <span>Área de clientes</span>
            <span>Registro de dominio</span>
            <span>Hosting</span>
        </div>
        <hr class="tw-w-full tw-border-[#797272B2]" />
        <span class="tw-text-[#999999] tw-text-[13px] tw-py-3.5">
            Copyright © 2025 Imagina Colombia .Todos los Derechos Reservados
        </span>
    </footer>
</template>