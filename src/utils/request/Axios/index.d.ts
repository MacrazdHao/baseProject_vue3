import { AxiosInstance, AxiosStatic, AxiosRequestConfig } from "axios";

export interface LocalData {
  [key: string]: any | function;
}

export interface RequestInstance extends AxiosInstance {
  custom?: LocalData;
}

export interface Request extends AxiosStatic {
  create(config?: AxiosRequestConfig): RequestInstance;
}

declare const Axios: Request;

export default Axios;
