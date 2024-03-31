<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { useField } from "vee-validate";

interface Props {
  modelValue?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  label?: string;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const { value, errorMessage } = useField(() => (props.name ? props.name : ""));

let typingTime: ReturnType<typeof setTimeout> | null = null;
function updateModelValue(event: Event, isReady?: boolean) {
  const target = event.target as HTMLInputElement;
  if (isReady) {
    emit("update:modelValue", target.value);
  } else {
    if (typingTime) {
      clearTimeout(typingTime);
    }
    typingTime = setTimeout(() => {
      updateModelValue(event, true);
    }, 300);
  }
}
</script>

<template>
  <div class="base-input">
    <span v-if="props.label" class="base-input__label">{{ props.label }}</span>

    <input
      v-model="value"
      class="base-input__field"
      :class="{ 'base-input__field_disabled': props.disabled }"
      :placeholder="props.placeholder"
      :type="props.type"
      @input="updateModelValue"
    />

    <span v-if="errorMessage" class="base-input__error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/base/base-input";
</style>
