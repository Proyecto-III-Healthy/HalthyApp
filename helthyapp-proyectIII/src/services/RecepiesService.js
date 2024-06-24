import createHttp from "./BaseService";

const http = createHttp();

export const getRecepies = () => {
  return http.get("/recepies");
};
