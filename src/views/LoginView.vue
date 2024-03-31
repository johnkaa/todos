<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { useUser } from "@/stores/user";
import loginSchema from "@/pkg/schemas/login";
import IUser from "@/pkg/interfaces/user";
import usersApi from "@/pkg/api/users";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";

type loginErroredType = "username" | "phone" | null;

const router = useRouter();
const userStore = useUser();

const isFetching = ref(false);

const loginErroredValue = ref<loginErroredType>(null);
const { values, validate } = useForm({
  validationSchema: loginSchema,
  initialValues: {
    username: "Samantha",
    phone: "1-463-123-4447",
  },
});

async function login() {
  const { valid } = await validate();
  if (!valid) return;
  isFetching.value = true;

  const users = await usersApi.getUsers();
  const user = users.find(
    (userData: IUser) =>
      userData.username.toLowerCase() === values.username.toLowerCase() &&
      userData.phone === values.phone
  );

  if (user) {
    loginErroredValue.value = null;
    await router.push("/todos");

    localStorage.setItem("userId", user.id);
    await userStore.fetchUser();
  } else {
    const usernameContains = users.find(
      (userData: IUser) =>
        userData.username.toLowerCase() === values.username.toLowerCase()
    );

    if (usernameContains) {
      loginErroredValue.value = "phone";
    } else {
      loginErroredValue.value = "username";
    }
  }

  isFetching.value = false;
}
</script>

<template>
  <div class="login">
    <div class="container">
      <div class="login__inner">
        <div class="login__header">Login form</div>

        <form class="login__form" @submit.prevent="login">
          <BaseInput
            class="login__form-input"
            :disabled="isFetching"
            name="username"
            label="Username"
          />

          <BaseInput
            class="login__form-input"
            :disabled="isFetching"
            name="phone"
            label="Phone number"
          />

          <BaseButton
            class="login__form-button"
            :disabled="isFetching"
            type="submit"
          >
            Login
          </BaseButton>
          <div v-if="loginErroredValue" class="login__errored">
            {{ loginErroredValue }} is invalid
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/views/login-view";
</style>
