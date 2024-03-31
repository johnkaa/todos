import api from "@/pkg/api";

export default {
  async getUsers() {
    try {
      const { data } = await api().get("/users");
      return data;
    } catch (e) {
      console.error(e);
    }
  },
};
