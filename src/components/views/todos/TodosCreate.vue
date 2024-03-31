<script setup lang="ts">
import { computed, ref, defineEmits } from "vue";
import { useForm } from "vee-validate";
import { useCookies } from "@vueuse/integrations/useCookies";
import createTodoSchema from "@/pkg/schemas/create-todo";
import todosApi from "@/pkg/api/todos";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const emit = defineEmits<{
  (e: "fetch-todos"): void;
}>();

const cookies = useCookies(["created-todos"]);
const createdTodos = computed(() => cookies.get("created-todos"));

const isFetching = ref(false);

const { values, validate } = useForm({
  validationSchema: createTodoSchema,
});
async function createTodo() {
  const { valid } = await validate();
  if (!valid) return;
  isFetching.value = true;

  const createdTodo = await todosApi.createTodo({
    userId: values.userId,
    title: values.title,
  });

  if (createdTodos.value) {
    createdTodo.id = createdTodos.value.length + 201;
    cookies.set("created-todos", [...createdTodos.value, createdTodo]);
  } else {
    createdTodo.id = 201;
    cookies.set("created-todos", [createdTodo]);
  }

  emit("fetch-todos");
  isFetching.value = false;
}
</script>

<template>
  <form class="todos-create" @submit.prevent="createTodo">
    <h2 class="todos-create__title">Create todo item</h2>

    <BaseInput
      class="todos-create__input"
      label="User ID"
      name="userId"
      type="number"
    />

    <BaseInput class="todos-create__input" label="Title" name="title" />

    <BaseButton
      class="todos-create__button"
      :disabled="isFetching"
      type="submit"
    >
      Create
    </BaseButton>
  </form>
</template>

<style scoped lang="scss">
@import "@/assets/scss/views/todos/todos-create";
</style>
