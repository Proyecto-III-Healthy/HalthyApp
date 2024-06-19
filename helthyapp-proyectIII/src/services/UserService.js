import createHttp from "./BaseService";

const http = createHttp();

export const createUser = (user) => {
  return http.post("/register", user);
};