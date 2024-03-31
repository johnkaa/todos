<script setup lang="ts">
import { defineProps, ref } from "vue";
import ITodo from "@/pkg/interfaces/todo";
import TodoCard from "@/components/cards/TodoCard.vue";

interface Props {
  todos: ITodo[];
}

const props = defineProps<Props>();

const favorites = ref<number[]>([]);
const favoritesFromLocalStorage = localStorage.getItem("favorites");
if (favoritesFromLocalStorage) {
  favorites.value = JSON.parse(favoritesFromLocalStorage);
}

function addToFavorites(id: number) {
  favorites.value.push(id);
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
}
</script>

<template>
  <div class="todos-list">
    <TodoCard
      v-for="todo in props.todos"
      :key="todo.id"
      :todo="todo"
      :favorite="favorites.includes(todo.id)"
      class="todos-list__item"
      @add-to-favorites="addToFavorites"
    />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/views/todos/todos-list";
</style>
