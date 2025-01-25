import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface AxiosServiceOptions {
  baseURL?: string;
  defaultHeaders?: Record<string, string>;
}

class AxiosService {
  private instance: AxiosInstance;

  constructor({ baseURL = "", defaultHeaders = {} }: AxiosServiceOptions = {}) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
      },
    });

    // Attach interceptors
    this._setupInterceptors();
  }

  /**
   * Sets up request and response interceptors.
   */
  private _setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config: any) => {
        console.log(
          `[Request] ${config.method?.toUpperCase()} - ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error("[Request Error]", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`[Response] ${response.status} - ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error("[Response Error]", error);
        return Promise.reject(error.response || error.message);
      }
    );
  }

  /**
   * Generic GET request.
   * @param {string} url - The endpoint URL.
   * @param {Record<string, any>} [params={}] - Query parameters.
   * @param {AxiosRequestConfig} [config={}] - Additional Axios config.
   * @returns {Promise<AxiosResponse>} - Axios response promise.
   */
  async get<T = any>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.instance.get(url, { params, ...config });
  }

  /**
   * Generic POST request.
   * @param {string} url - The endpoint URL.
   * @param {Record<string, any>} data - The request body.
   * @param {AxiosRequestConfig} [config={}] - Additional Axios config.
   * @returns {Promise<AxiosResponse>} - Axios response promise.
   */
  async post<T = any>(
    url: string,
    data: Record<string, any>,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config);
  }

  /**
   * Generic PUT request.
   * @param {string} url - The endpoint URL.
   * @param {Record<string, any>} data - The request body.
   * @param {AxiosRequestConfig} [config={}] - Additional Axios config.
   * @returns {Promise<AxiosResponse>} - Axios response promise.
   */
  async put<T = any>(
    url: string,
    data: Record<string, any>,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data, config);
  }

  /**
   * Generic PATCH request.
   * @param {string} url - The endpoint URL.
   * @param {Record<string, any>} data - The request body.
   * @param {AxiosRequestConfig} [config={}] - Additional Axios config.
   * @returns {Promise<AxiosResponse>} - Axios response promise.
   */
  async patch<T = any>(
    url: string,
    data: Record<string, any>,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch(url, data, config);
  }

  /**
   * Generic DELETE request.
   * @param {string} url - The endpoint URL.
   * @param {AxiosRequestConfig} [config={}] - Additional Axios config.
   * @returns {Promise<AxiosResponse>} - Axios response promise.
   */
  async delete<T = any>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config);
  }

  /**
   * Sets default headers.
   * @param {Record<string, string>} headers - Headers to set.
   */
  setHeaders(headers: Record<string, string>) {
    Object.assign(this.instance.defaults.headers, headers);
  }

  /**
   * Sets a default timeout for requests.
   * @param {number} timeout - Timeout in milliseconds.
   */
  setTimeout(timeout: number) {
    this.instance.defaults.timeout = timeout;
  }
}

export default AxiosService;
