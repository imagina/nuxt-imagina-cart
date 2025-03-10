<script setup>
const props = defineProps({
  submenu: {
    type: Object,
    required: true
  }
});
</script>
<template>
	<q-item-section>
		{{ submenu.label || submenu.tooltip }}
	</q-item-section>
	<q-item-section side>
		<q-icon name="keyboard_arrow_right" />
	</q-item-section>
	<q-menu anchor="top end" self="top start">
		<q-list>
			<q-item
				v-for="(submenuItems, index) in submenu?.items"
				:key="index"
				dense
				clickable
			>
				<q-item-section>
					<NuxtLink
						v-if="!submenuItems?.items"
						v-bind="submenuItems.props"
						class="tw-flex tw-items-center hover:text-gray-400"
						:to="submenuItems.to"
					>
						{{ submenuItems.label || submenuItems.tooltip }}
					</NuxtLink>
				</q-item-section>
			</q-item>
		</q-list>
	</q-menu>
</template>