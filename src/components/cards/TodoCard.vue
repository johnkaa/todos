<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import ITodo from "@/pkg/interfaces/todo";
import BaseButton from "@/components/base/BaseButton.vue";
interface Props {
  todo: ITodo;
  favorite: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "addToFavorites", value: number): void;
}>();

function addToFavorites(id: number) {
  emit("addToFavorites", id);
}
</script>

<template>
  <div
    class="todo-card"
    :class="{ 'todo-card_completed': props.todo.completed }"
  >
    <div class="todo-card__ids">
      <div class="todo-card__user-id">User ID: {{ props.todo.userId }}</div>
      <div class="todo-card__id">ID: {{ props.todo.id }}</div>
    </div>
    <div class="todo-card__title">{{ props.todo.title }}</div>
    <BaseButton
      class="todo-card__button"
      :disabled="props.favorite"
      @click="addToFavorites(props.todo.id)"
    >
      {{ props.favorite ? "Favorite" : "Add to favorites" }}
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/cards/todo-card";
</style>
