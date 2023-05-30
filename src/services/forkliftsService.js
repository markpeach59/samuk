import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiURL + "/forklifts";

const apiEndPointR = config.apiURL + "/forklifts/list";

export function getForklifts() {
  return http.get(apiEndPoint);
}

export function getRestrictedForklifts() {
  return http.get(apiEndPointR);
}
