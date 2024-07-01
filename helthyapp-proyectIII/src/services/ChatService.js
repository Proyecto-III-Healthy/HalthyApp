import createHttp from "./BaseService";

const http = createHttp(true);

export const createChat = (ingredients) => {
  return http.post("/chat", { ingredients });
};
