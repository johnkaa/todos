import { defineStore } from "pinia";
import type IUser from "@/pkg/interfaces/user";
import usersApi from "@/pkg/api/users";

export type UserState = {
  user: IUser | null;
};

export const useUser = defineStore("user", {
  state: () =>
    ({
      user: null,
    } as UserState),

  actions: {
    async fetchUser() {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const users = await usersApi.getUsers();
        const user = users.find((userData: IUser) => userData.id === +userId);
        if (user) {
          this.user = user;
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
});
