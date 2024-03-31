<script setup lang="ts">
import { useUser } from "@/stores/user";
import TheHeader from "@/components/general/TheHeader.vue";
import TheFooter from "@/components/general/TheFooter.vue";

const userStore = useUser();
userStore.fetchUser();
</script>

<template>
  <div class="app-wrapper">
    <TheHeader :user="userStore.user" />
    <router-view class="app-wrapper__content" />
    <TheFooter />
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/main";
</style>
