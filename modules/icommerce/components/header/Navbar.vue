<template>
  <div>
    <template v-for="(menuItem, menuIndex) in menuItems" :key="menuItem.id || menuIndex">
      <q-btn v-if="menuItem.items" :label="menuItem.label" v-bind="menuItem.props">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item
                v-for="(submenuAction, actionIndex) in menuItem.items"
                :key="submenuAction.id || actionIndex"
                @click="executeAction(submenuAction)"
                v-bind="submenuAction.props"
                v-close-popup
            >
              <q-item-section>
                <div class="row items-center text-blue-grey">
                  <q-icon :name="submenuAction.icon" color="blue-grey" size="16px" />
                  {{ submenuAction.label || submenuAction.tooltip }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <NuxtLink
          v-else
          v-bind="menuItem.props"
          class="flex items-center space-x-1 hover:text-gray-400"
      />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  }
});

async function executeAction(action) {
  if (typeof action.action === "function") {
    const actionData = {}; // Placeholder for potential data processing
    await action.action(actionData);
  }
}
</script>
