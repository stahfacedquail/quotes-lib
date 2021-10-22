import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;
console.log("AXIOS", axios.defaults.baseURL)

export default axios;