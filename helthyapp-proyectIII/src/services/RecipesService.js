import createHttp from "./BaseService";

const http = createHttp();

export const getRecipes = () => {
  return http.get("/recipes");
};

export const getRecipe = (id) => {
  return http.get(`/recipes/${id}`);
};
