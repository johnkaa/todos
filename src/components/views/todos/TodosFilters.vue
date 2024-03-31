<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { useVModel } from "@vueuse/core";
import ISelectOption from "@/pkg/interfaces/select-option";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseInput from "@/components/base/BaseInput.vue";

interface Props {
  fetchData: {
    status: ISelectOption | null;
    userId: ISelectOption | null;
    search: string | null;
  };
  disabled?: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:fetchData", value: ISelectOption | null): void;
}>();

const fetchData = useVModel(props, "fetchData", emit);

const statusOptions: ISelectOption[] = [
  { name: "Completed", value: "completed" },
  { name: "Uncompleted", value: "uncompleted" },
  { name: "Favorites", value: "favorites" },
];
const userIdOptions: ISelectOption[] = [];
for (let i = 0; i < 10; i++) {
  userIdOptions.push({
    name: i + 1,
    value: i + 1,
  });
}
</script>

<template>
  <div class="todos-filters">
    <BaseSelect
      class="todos-filters-item"
      v-model:selected-option="fetchData.status"
      :options="statusOptions"
      :disabled="props.disabled"
      label="Status"
    />

    <BaseSelect
      class="todos-filters-item"
      v-model:selected-option="fetchData.userId"
      :options="userIdOptions"
      :disabled="props.disabled"
      label="User ID"
    />

    <BaseInput
      class="todos-filters-item"
      v-model:model-value="fetchData.search"
      :disabled="props.disabled"
      label="Search by title"
    />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/views/todos/todos-filter";
</style>
