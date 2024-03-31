<script setup lang="ts">
import { defineProps } from "vue";
interface Props {
  disabled?: boolean;
}
const props = defineProps<Props>();
</script>

<template>
  <button class="base-button" :disabled="props.disabled">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import "@/assets/scss/base/base-button";
</style>
