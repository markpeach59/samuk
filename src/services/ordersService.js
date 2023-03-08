import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiURL + "/orders";

export function getAllOrders() {
  return http.get(apiEndPoint);
}

export function getOrderDetail(id) {
  return http.get(apiEndPoint + "/" + id);
}
