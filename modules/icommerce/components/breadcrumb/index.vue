<template>
    <div class="tw-w-full tw-py-3.5 tw-pl-3.5 lg:tw-pl-[80px] tw-bg-[#EEEEEE]">
        <q-breadcrumbs separator-color="mediumGray">
            <template v-slot:separator>
                <q-icon class="tw-text-[#888888]" name="fa-solid fa-angle-right" />
            </template>
            <q-breadcrumbs-el
                class="tw-text-base tw-text-[#888888] tw-font-extrabold"
                label="Inicio"
                :to="'/'"
            />
                <NuxtLink

                />
            <q-breadcrumbs-el
                class="tw-text-base tw-text-[#888888] tw-font-medium"
                :label="currentRoute.label"
                :to="getPath(currentRoute.path)"
            />
            </q-breadcrumbs>
    </div>
</template>
<script setup>

const router =  useRouter()
const currentRoute = computed(() => {
    return {
        path: router.currentRoute.value.name,
        label: router.currentRoute.value.meta.breadcrumb
    }
      /*

      return matchedRoutes.map((routeRecord, index) => {
        return {
          text: routeRecord.meta.breadcrumb || routeRecord.name, // Use meta breadcrumb or fallback to route name
          to: index < matchedRoutes.length - 1 ? { name: routeRecord.name } : null, // Don't make last breadcrumb clickable
        };
      });
      */
    });


</script>