import { useCookies } from "@vueuse/integrations/useCookies";
import api from "@/pkg/api";
import ISelectOption from "@/pkg/interfaces/select-option";
import ITodo from "@/pkg/interfaces/todo";

interface ITodosOptions {
  status?: ISelectOption | null;
  userId?: ISelectOption | null;
  search?: string | null;
}

interface ICreateTodoOptions {
  userId: number;
  title: string;
}

export default {
  async getTodos(options?: ITodosOptions) {
    const cookies = useCookies(["created-todos"]);
    const createdTodos = cookies.get("created-todos") || [];

    let params = "";
    if (options) {
      params += "?";
      if (options.status) {
        let completed = false;
        if (options.status.value === "completed") {
          completed = true;
        } else if (options.status.value === "uncompleted") {
          completed = false;
        }

        if (options.status.value !== "favorites") {
          params += `completed=${completed}&`;
        }
      }

      if (options.userId) {
        params += `userId=${options.userId.value}&`;
      }
    }

    try {
      const { data } = await api().get(`/todos${params}`);

      let filteredTodos = [...data, ...createdTodos];

      //filter by favorites
      if (options?.status?.value === "favorites") {
        const favoritesTodos = localStorage.getItem("favorites");
        if (favoritesTodos) {
          const favoritesTodosArray = JSON.parse(favoritesTodos);
          filteredTodos = filteredTodos.filter((todo: ITodo) =>
            favoritesTodosArray.includes(todo.id)
          );
        } else {
          filteredTodos = [];
        }
      }

      //filter by userId
      if (options && options.userId) {
        filteredTodos = filteredTodos.filter(
          (todo: ITodo) => todo.userId == options.userId!.value
        );
      }

      //search by title
      if (options && options.search) {
        filteredTodos = filteredTodos.filter((todo: ITodo) =>
          todo.title
            .toLowerCase()
            .includes(options.search?.toLowerCase() as string)
        );
      }

      return filteredTodos;
    } catch (e) {
      console.error(e);
    }
  },

  async createTodo(options: ICreateTodoOptions) {
    try {
      const { data } = await api().post(`/todos`, {
        userId: options.userId,
        title: options.title,
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  },
};
