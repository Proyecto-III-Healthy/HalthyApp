import createHttp from "./BaseService";

const http = createHttp(true);

export const createChat = (ingredients) => {
  return http.post("/chat", { ingredients });
};

export const createDayPlan = (data) => {
  return http.post("/dayPlan", data);
};

export const getDayPlans = () => {
  return http.get("/userDayPlans");
};