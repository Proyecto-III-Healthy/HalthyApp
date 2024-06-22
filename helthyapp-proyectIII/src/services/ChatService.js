import createHttp from "./BaseService";

const http = createHttp();

export const createChat = (ingredients) => {
  return http.post("/chat", { ingredients });
};
