<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { onClickOutside, useVModel } from "@vueuse/core";
import ISelectOption from "@/pkg/interfaces/select-option";

interface Props {
  options: ISelectOption[];
  label: string;
  selectedOption: ISelectOption | null;
  disabled?: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:selectedOption", value: ISelectOption | null): void;
}>();

const selectEl = ref(null);
onClickOutside(selectEl, () => {
  if (isShownSelect.value) {
    isShownSelect.value = false;
  }
});

const isShownSelect = ref(false);

const selectedOption = useVModel(props, "selectedOption", emit);
</script>

<template>
  <div class="base-select" ref="selectEl">
    <div class="base-select__label">{{ props.label }}</div>

    <div
      class="base-select__wrapper"
      :class="{ 'base-select__wrapper_disabled': props.disabled }"
      @click="isShownSelect = !isShownSelect"
    >
      <div class="base-select__selected-option">
        {{ selectedOption ? selectedOption.name : "All" }}
      </div>

      <div
        class="base-select__options"
        :class="{ 'base-select__options_shown': isShownSelect }"
      >
        <div
          class="base-select__option"
          :class="{
            'base-select__option_selected': !selectedOption,
          }"
          @click="emit('update:selectedOption', null)"
        >
          All
        </div>
        <div
          v-for="option in props.options"
          :key="option"
          class="base-select__option"
          :class="{
            'base-select__option_selected': selectedOption === option.value,
          }"
          @click="emit('update:selectedOption', option)"
        >
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/base/base-select";
</style>
