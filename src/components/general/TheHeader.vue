<script setup lang="ts">
import { defineProps } from "vue";
import IUser from "@/pkg/interfaces/user";

interface Props {
  user: IUser | null;
}
const props = defineProps<Props>();
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__inner" v-if="props.user">
        <div class="header__info-field">
          <span>Name: {{ props.user.name }}</span>
        </div>
        <div class="header__info-field">
          <span>Email: {{ props.user.email }}</span>
        </div>
        <div class="header__info-field">
          <span>Phone: {{ props.user.phone }}</span>
        </div>
        <div class="header__info-field">
          <span>City: {{ props.user.address.city }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import "@/assets/scss/general/the-header";
</style>
