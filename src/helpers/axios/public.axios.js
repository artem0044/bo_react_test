import axios from "axios";
import config from "../../config";

console.log(config.api_url, "config.api_url");
const instance = axios.create({
  baseURL: config.api_url,
});

export default instance;
