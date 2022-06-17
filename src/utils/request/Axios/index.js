import axios from "axios";
const Axios = axios;
const { create } = axios;
Axios.create = (config) => {
  return {
    ...create(config),
    custom: {},
  };
};
export default Axios;
