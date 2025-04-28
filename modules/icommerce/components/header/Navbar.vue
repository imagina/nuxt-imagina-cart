<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { defineEmits } from "vue";
import MenuItem from './MenuItem.vue'
import MenuItemsMobile from "./MenuItemsMobile.vue"
import Modal from "./Modal.vue"
import NavbarButtons from "./NavbarButtons.vue";

const props = defineProps({
  navItems: {
    type: Array,
    required: true
  },
  isScrolled: {
    type: Boolean,
    required: true
  },
  scrollPosition: Object
} );

async function executeAction(action) {
  if (typeof action.action === "function") {
    const actionData = {}; // Placeholder for potential data processing
    await action.action(actionData);
  }
}

// Handle mobile Section
const isMobile = ref( false );
const breakpoint = 1024;

function updateViewport() {
  isMobile.value = window.innerWidth < breakpoint;
}

onMounted( () => {
  updateViewport();
  window.addEventListener( "resize", updateViewport );
} );

onUnmounted( () => {
  window.removeEventListener( "resize", updateViewport );
} );

// Send isMobile to parent
const emit = defineEmits(["update:modelValue"]);

watch(isMobile, (newValue) => {
  emit("update:modelValue", newValue);
});

</script>

<template>
    <!--MENU DESKTOP -->
    <ClientOnly>
    <div v-if="!isMobile" class="tw-flex tw-items-center tw-gap-5 xl:tw-gap-[26px]">
      <template
          v-for="(navItem, index) in navItems"
          :key="navItem.id || index"
      >
        <q-btn
          v-if="navItem.items"
          :label="navItem.label"
          v-bind="navItem.props"
          flat
          no-caps
          padding="0"
          icon-right="fa-solid fa-angle-down"
          class="tw-text-md xl:tw-text-[15px]"
          :class="{
            'hover:tw-text-[#DC3545]': !isScrolled,
            'hover:tw-text-[#F9BA48]': isScrolled
          }"
        >
          <q-menu>
            <q-list>
              <q-item
                v-for="(menuItem, menuItemIndex) in navItem?.items"
                :key="menuItem?.id || menuItemIndex"
                v-bind="menuItem?.props"
                @click="executeAction(menuItem)"
                clickable
              >
                <NuxtLink
                  v-if="!menuItem?.items"
                  :to="menuItem?.to"
                  class="tw-flex tw-items-center hover:text-gray-400"
                >
                  {{ menuItem?.label || menuItem?.tooltip }}
                </NuxtLink>
                <MenuItem v-if="menuItem?.items" :submenu="menuItem" />
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <NuxtLink
          v-if="!navItem.items"
          v-bind="navItem.props"
          :to="navItem?.to"
          class="
            tw-text-md xl:tw-text-[15px
            tw-cursor-pointer
          "
          :class="{
            'hover:tw-text-[#DC3545]': !isScrolled,
            'hover:tw-text-[#F9BA48]': isScrolled
          }"
        >
          {{ navItem.label }}
        </NuxtLink>
      </template>
    </div>

    <!--MENU MOBILE -->
    <div v-if="isMobile" class="tw-flex tw-items-center tw-gap-[26px]">
      <q-list>
        <Modal>

          <!--       Buttons Group-->
          <div class="tw-flex tw-justify-end tw-items-center tw-mb-12">
            <NavbarButtons :scroll-position="scrollPosition" :is-scrolled="isScrolled"/>
          </div>

  <!--        Render navigation items-->
          <MenuItemsMobile :items="navItems"/>

        </Modal>
      </q-list>
    </div>
  </ClientOnly>
</template>

<style scoped>
    :deep(.q-btn .q-icon) {
      font-size: 11px;
    }
</style>

<style>
    .cart .q-icon{
        font-size: 24px !important;
    }
</style>
