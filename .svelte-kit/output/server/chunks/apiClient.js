(() => {
  if (typeof window === "undefined") {
    return "https://epi-backend-s14g.onrender.com/api";
  }
  window.location.hostname.includes("github.io");
  return "https://epi-backend-s14g.onrender.com/api";
})();
class ApiError extends Error {
  constructor(message, status, response, endpoint) {
    super(message);
    this.status = status;
    this.response = response;
    this.endpoint = endpoint;
    this.name = "ApiError";
  }
  /**
   * Verifica se é um erro de autenticação
   */
  get isAuthError() {
    return this.status === 401 || this.status === 403;
  }
  /**
   * Verifica se é um erro de rede
   */
  get isNetworkError() {
    return this.status === 0 || this.status >= 500;
  }
  /**
   * Verifica se é um erro do cliente (4xx)
   */
  get isClientError() {
    return this.status >= 400 && this.status < 500;
  }
}
const DEFAULT_OPTIONS = {
  timeout: 3e4,
  // 30 segundos (cold start do backend pode demorar)
  retries: 3,
  retryDelay: 2e3
  // 2 segundos
};
async function apiClient(endpoint, options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const {
    skipAuth = false,
    timeout,
    retries,
    retryDelay,
    ...fetchOptions
  } = config;
  const headers = new Headers(fetchOptions.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");
  if (typeof window !== "undefined" && window.location.hostname.includes("github.io")) {
    headers.set("Origin", window.location.origin);
  }
  async function makeRequest(attempt = 1) {
    {
      throw new ApiError(
        "API calls are only available in browser",
        0,
        null,
        endpoint
      );
    }
  }
  return makeRequest();
}
const api = {
  /**
   * GET request
   */
  get: (endpoint, options) => apiClient(endpoint, { ...options, method: "GET" }),
  /**
   * POST request
   */
  post: (endpoint, data, options) => apiClient(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : void 0
  }),
  /**
   * PUT request
   */
  put: (endpoint, data, options) => apiClient(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : void 0
  }),
  /**
   * PATCH request
   */
  patch: (endpoint, data, options) => apiClient(endpoint, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : void 0
  }),
  /**
   * DELETE request
   */
  delete: (endpoint, options) => apiClient(endpoint, { ...options, method: "DELETE" }),
  /**
   * Método unificado de request
   */
  async request(config) {
    const {
      endpoint,
      method = "GET",
      data,
      params,
      headers = {},
      timeout = 1e4
    } = config;
    const url = createUrlWithParams(endpoint, params || {});
    const requestHeaders = {
      "Content-Type": "application/json",
      ...headers
    };
    const options = {
      method,
      headers: requestHeaders,
      timeout
    };
    if (data && ["POST", "PUT", "PATCH"].includes(method)) {
      options.body = JSON.stringify(data);
    }
    return apiClient(url, options);
  }
};
function createUrlWithParams(baseUrl, params) {
  const urlString = baseUrl.startsWith("/") ? baseUrl : "/" + baseUrl;
  const url = new URL(urlString, "http://dummy.com");
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== void 0 && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, String(v)));
      } else {
        url.searchParams.set(key, typeof value === "boolean" ? value.toString() : String(value));
      }
    }
  });
  return url.pathname + url.search;
}
export {
  api as a,
  createUrlWithParams as c
};
