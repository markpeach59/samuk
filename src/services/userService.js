import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiURL + "/users";

export function getUsers() {
  return http.get(apiEndPoint);
}

export function registerUser(name, email, password) {
  return http.post(apiEndPoint, { name, email, password });
}
