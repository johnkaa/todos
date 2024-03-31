<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import todosApi from "@/pkg/api/todos";
import ITodo from "@/pkg/interfaces/todo";
import TodosList from "@/components/views/todos/TodosList.vue";
import TodosFilters from "@/components/views/todos/TodosFilters.vue";
import TodosCreate from "@/components/views/todos/TodosCreate.vue";

const todos = ref<ITodo[]>([]);

const isFetching = ref(false);

const fetchData = reactive({
  status: null,
  userId: null,
  search: null,
});

async function getTodos() {
  isFetching.value = true;
  try {
    todos.value = (await todosApi.getTodos(fetchData)) as ITodo[];
  } catch (e) {
    console.error(e);
  } finally {
    isFetching.value = false;
  }
}
getTodos();

watch(fetchData, () => {
  getTodos();
});
</script>

<template>
  <div class="todos">
    <div class="container">
      <h1 class="todos__title">Todo list</h1>

      <TodosCreate @fetch-todos="getTodos" />

      <TodosFilters :fetch-data="fetchData" :disabled="isFetching" />

      <div v-if="isFetching" class="todos__loader">loading...</div>
      <TodosList v-else :todos="todos" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/views/todos/index";
</style>
