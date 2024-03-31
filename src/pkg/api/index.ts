import axios from "axios";

export default (url = "https://jsonplaceholder.typicode.com") => {
  return axios.create({
    baseURL: url,
  });
};
