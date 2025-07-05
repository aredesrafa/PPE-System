import { c as create_ssr_component, a as compute_rest_props, j as getContext, d as spread, g as add_attribute, h as escape, f as escape_attribute_value, e as escape_object, i as createEventDispatcher, v as validate_component, l as each, k as subscribe } from "../../../chunks/ssr.js";
import { E as ErrorDisplay } from "../../../chunks/mockData.js";
import { d as businessConfigStore, f as categoriasEPIOptions, s as statusEstoqueOptions } from "../../../chunks/modalStore.js";
import { w as writable } from "../../../chunks/index.js";
import { B as Badge } from "../../../chunks/Badge.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { I as Input } from "../../../chunks/Input.js";
import { P as PlusOutline, S as SearchOutline, R as RefreshOutline, T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../chunks/SearchOutline.js";
import { twMerge } from "tailwind-merge";
import { S as SearchableDropdown } from "../../../chunks/SearchableDropdown.js";
import { L as LoadingSpinner } from "../../../chunks/LoadingSpinner.js";
const AdjustmentsHorizontalOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "strokeWidth", "desc", "ariaLabel"]);
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let { size = ctx.size || "md" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { withEvents = ctx.withEvents || false } = $$props;
  let { title = {} } = $$props;
  let { strokeWidth = ctx.strokeWidth || "2" } = $$props;
  let { desc = {} } = $$props;
  let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
  let hasDescription = false;
  let { ariaLabel = "adjustments horizontal outline" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0) $$bindings.desc(desc);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  {
    if (title.id || desc.id) {
      hasDescription = true;
    } else {
      hasDescription = false;
    }
  }
  return `${withEvents ? `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { color: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"></path></svg>` : `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { color: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"></path></svg>`} `;
});
const ArrowUpOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "strokeWidth", "desc", "ariaLabel"]);
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let { size = ctx.size || "md" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { withEvents = ctx.withEvents || false } = $$props;
  let { title = {} } = $$props;
  let { strokeWidth = ctx.strokeWidth || "2" } = $$props;
  let { desc = {} } = $$props;
  let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
  let hasDescription = false;
  let { ariaLabel = "arrow up outline" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0) $$bindings.desc(desc);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  {
    if (title.id || desc.id) {
      hasDescription = true;
    } else {
      hasDescription = false;
    }
  }
  return `${withEvents ? `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { color: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M12 6v13m0-13 4 4m-4-4-4 4"></path></svg>` : `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { color: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M12 6v13m0-13 4 4m-4-4-4 4"></path></svg>`} `;
});
const ClockOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "strokeWidth", "desc", "ariaLabel"]);
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let { size = ctx.size || "md" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { withEvents = ctx.withEvents || false } = $$props;
  let { title = {} } = $$props;
  let { strokeWidth = ctx.strokeWidth || "2" } = $$props;
  let { desc = {} } = $$props;
  let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
  let hasDescription = false;
  let { ariaLabel = "clock outline" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0) $$bindings.desc(desc);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  {
    if (title.id || desc.id) {
      hasDescription = true;
    } else {
      hasDescription = false;
    }
  }
  return `${withEvents ? `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { color: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>` : `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { color: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>`} `;
});
const API_BASE_URL = "";
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
  timeout: 1e4,
  // 10 segundos
  retries: 2,
  retryDelay: 1e3
  // 1 segundo
};
async function apiClient(endpoint, options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const { skipAuth = false, timeout, retries, retryDelay, ...fetchOptions } = config;
  const headers = new Headers(fetchOptions.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");
  async function makeRequest(attempt = 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        let errorData = {};
        const contentType2 = response.headers.get("content-type");
        if (contentType2 && contentType2.includes("application/json")) {
          try {
            errorData = await response.json();
          } catch {
          }
        }
        const message = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new ApiError(message, response.status, errorData, endpoint);
      }
      const contentLength = response.headers.get("content-length");
      if (contentLength === "0" || response.status === 204) {
        return {};
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError("Request timeout", 408, null, endpoint);
      }
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new ApiError("Network error", 0, null, endpoint);
      }
      if (error instanceof ApiError) {
        if ((error.isNetworkError || error.status >= 500) && attempt < (retries || 0)) {
          console.warn(`Tentativa ${attempt} falhou, tentando novamente em ${retryDelay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          return makeRequest(attempt + 1);
        }
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : "Unknown error",
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
  delete: (endpoint, options) => apiClient(endpoint, { ...options, method: "DELETE" })
};
function createUrlWithParams(baseUrl, params) {
  const url = new URL(baseUrl, "http://dummy.com");
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== void 0 && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, String(v)));
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  });
  return url.pathname + url.search;
}
class InventoryCommandAdapter {
  // ==================== QUERIES - Buscar dados de estoque ====================
  /**
   * Busca itens de estoque com paginação e filtros
   * TEMPORÁRIO: Usa dados mockados até integração com backend
   */
  async getInventoryItems(params = {}) {
    try {
      console.log("📋 getInventoryItems chamado com params:", params);
      const mockData = this.getMockInventoryData();
      console.log("📦 Dados mockados carregados:", mockData.length, "itens");
      let filteredData = mockData;
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        console.log("🔍 Aplicando busca:", searchLower);
        filteredData = filteredData.filter(
          (item) => item.tipoEPI?.nomeEquipamento?.toLowerCase().includes(searchLower) || item.tipoEPI?.numeroCA?.includes(params.search)
        );
        console.log("🔍 Itens após busca:", filteredData.length);
      }
      if (params.status && params.status !== "todos") {
        console.log("🏷️ Aplicando filtro de status:", params.status);
        if (params.status === "disponivel") {
          filteredData = filteredData.filter(
            (item) => item.status === "disponivel" || item.status === "baixo_estoque"
          );
        } else if (params.status === "indisponivel") {
          filteredData = filteredData.filter(
            (item) => item.status === "esgotado" || item.status === "vencido"
          );
        }
        console.log("🏷️ Itens após filtro status:", filteredData.length);
      }
      if (params.categoria && params.categoria !== "todas") {
        console.log("📂 Aplicando filtro de categoria:", params.categoria);
        filteredData = filteredData.filter((item) => item.tipoEPI?.categoria === params.categoria);
        console.log("📂 Itens após filtro categoria:", filteredData.length);
      }
      const page = params.page || 1;
      const limit = params.limit || 20;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedItems = filteredData.slice(startIndex, endIndex);
      const items = paginatedItems.map((item) => ({
        id: item.id,
        tipoEPIId: item.tipoEPIId,
        almoxarifadoId: item.almoxarifadoId,
        quantidade: item.quantidade,
        localizacao: item.localizacao,
        status: item.status,
        lote: item.lote,
        dataValidade: item.dataValidade,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        tipoEPI: item.tipoEPI ? {
          id: item.tipoEPI.id,
          nomeEquipamento: item.tipoEPI.nomeEquipamento,
          numeroCA: item.tipoEPI.numeroCA,
          categoria: item.tipoEPI.categoria || "PROTECAO_CABECA",
          descricao: item.tipoEPI.descricao,
          fabricante: item.tipoEPI.fabricante,
          ativo: true,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        } : void 0,
        almoxarifado: {
          id: item.almoxarifadoId,
          nome: "Almoxarifado Central",
          localizacao: "Setor A",
          ativo: true,
          unidadeNegocioId: "1",
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      }));
      return {
        data: items,
        total: filteredData.length,
        page,
        pageSize: limit,
        totalPages: Math.ceil(filteredData.length / limit)
      };
    } catch (error) {
      console.error("❌ Erro ao buscar itens de estoque:", error);
      throw error;
    }
  }
  /**
   * Busca item de estoque por ID
   */
  async getItemById(id, includeExpanded = true) {
    const url = createUrlWithParams(`/estoque/itens/${id}`, {
      includeExpanded
    });
    return api.get(url);
  }
  /**
   * Busca histórico de movimentações
   */
  async getMovementHistory(params = {}) {
    const url = createUrlWithParams("/estoque/movimentacoes", {
      itemEstoqueId: params.itemEstoqueId,
      tipoMovimentacao: params.tipoMovimentacao,
      dataInicio: params.dataInicio,
      dataFim: params.dataFim,
      usuarioId: params.usuarioId,
      includeExpanded: params.includeExpanded,
      page: params.page,
      limit: params.limit,
      sort: params.sort,
      order: params.order
    });
    return api.get(url);
  }
  /**
   * Busca movimentações de um item específico
   */
  async getItemMovementHistory(itemId, params = {}) {
    if (!this.mockMovements) {
      this.mockMovements = [];
    }
    let filteredMovements = this.mockMovements.filter((mov) => mov.itemEstoqueId === itemId);
    if (params.dataInicio) {
      const dataInicio = new Date(params.dataInicio);
      filteredMovements = filteredMovements.filter(
        (mov) => new Date(mov.dataMovimentacao) >= dataInicio
      );
    }
    const limit = params.limit || 50;
    return filteredMovements.slice(0, limit);
  }
  /**
   * Busca saldo consolidado por tipo EPI
   */
  async getConsolidatedStock(tipoEPIId) {
    const url = createUrlWithParams("/estoque/consolidado", {
      tipoEPIId
    });
    return api.get(url);
  }
  // ==================== COMMANDS - Registrar movimentações (Event Sourcing) ====================
  /**
   * Registra movimentação genérica - Método base para Event Sourcing
   */
  async registerMovement(movementData) {
    console.log("📝 Registrando movimentação:", movementData);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      const allItems = this.getMockInventoryData();
      const itemAtual = allItems.find((item) => item.id === movementData.itemEstoqueId);
      if (!itemAtual) {
        throw new Error("Item de estoque não encontrado");
      }
      let novaQuantidade = itemAtual.quantidade;
      if (movementData.tipoMovimentacao === "AJUSTE_POSITIVO") {
        novaQuantidade += movementData.quantidade;
      } else if (movementData.tipoMovimentacao === "AJUSTE_NEGATIVO") {
        novaQuantidade -= movementData.quantidade;
        if (novaQuantidade < 0) {
          throw new Error("Quantidade insuficiente em estoque");
        }
      }
      await this.updateMockItem(itemAtual.id, {
        quantidade: novaQuantidade,
        status: this.calculateStatus(novaQuantidade, itemAtual.dataValidade),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      const movement = {
        id: `mov-${Date.now()}`,
        tipoEPIId: movementData.tipoEPIId,
        almoxarifadoId: movementData.almoxarifadoId,
        tipoMovimentacao: movementData.tipoMovimentacao,
        quantidade: movementData.quantidade,
        motivo: movementData.motivo,
        observacoes: movementData.observacoes || "",
        documentoReferencia: movementData.documentoReferencia,
        usuarioId: "user-admin",
        dataMovimentacao: (/* @__PURE__ */ new Date()).toISOString(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await this.addMockMovement(movement);
      console.log(`✅ Movimentação registrada: ${itemAtual.quantidade} → ${novaQuantidade}`);
      return movement;
    } catch (error) {
      console.error("❌ Erro ao registrar movimentação:", error);
      throw error;
    }
  }
  /**
   * Registra entrada de itens no estoque
   */
  async registerEntry(data) {
    return this.registerMovement({
      ...data,
      tipoMovimentacao: "entrada_nota"
    });
  }
  /**
   * Registra saída de itens do estoque
   */
  async registerExit(data) {
    return this.registerMovement({
      ...data,
      tipoMovimentacao: "saida_entrega"
    });
  }
  /**
   * Registra ajuste de contagem - Command para Event Sourcing
   */
  async registrarAjusteContagem(data) {
    const quantidade = data.novaQuantidade - data.quantidadeAnterior;
    const tipoMovimentacao = quantidade > 0 ? "ajuste_positivo" : "ajuste_negativo";
    return this.registerMovement({
      tipoEPIId: "",
      // Será preenchido pelo backend baseado no itemEstoqueId
      almoxarifadoId: "",
      // Será preenchido pelo backend baseado no itemEstoqueId
      tipoMovimentacao,
      quantidade: Math.abs(quantidade),
      motivo: data.motivo,
      observacoes: `Ajuste de ${data.quantidadeAnterior} para ${data.novaQuantidade} unidades`,
      documentoReferencia: `AJUSTE_${data.itemEstoqueId}`
    });
  }
  /**
   * Registra transferência entre almoxarifados
   */
  async registerTransfer(data) {
    const item = await this.getItemById(data.itemId);
    const saida = await this.registerMovement({
      tipoEPIId: item.tipoEPIId,
      almoxarifadoId: item.almoxarifadoId,
      tipoMovimentacao: "saida_transferencia",
      quantidade: data.quantidade,
      motivo: data.motivo,
      observacoes: `Transferência para almoxarifado ${data.almoxarifadoDestinoId}`
    });
    const entrada = await this.registerMovement({
      tipoEPIId: item.tipoEPIId,
      almoxarifadoId: data.almoxarifadoDestinoId,
      tipoMovimentacao: "entrada_transferencia",
      quantidade: data.quantidade,
      motivo: data.motivo,
      documentoReferencia: `TRANSFERENCIA_${saida.id}`,
      observacoes: `Transferência do almoxarifado ${item.almoxarifadoId}`
    });
    return [saida, entrada];
  }
  /**
   * Registra descarte de itens
   */
  async registerDiscard(data) {
    return this.registerMovement({
      ...data,
      tipoMovimentacao: "descarte"
    });
  }
  /**
   * Registra devolução de itens
   */
  async registerReturn(data) {
    return this.registerMovement({
      ...data,
      tipoMovimentacao: "devolucao",
      documentoReferencia: data.entregaId ? `ENTREGA_${data.entregaId}` : void 0
    });
  }
  // ==================== ESTORNO - Operação crítica para Event Sourcing ====================
  /**
   * Cria estorno de movimentação - Compensating transaction
   */
  async criarEstorno(data) {
    return api.post("/movimentacoes-estoque/estornos", data);
  }
  /**
   * Verifica se movimentação pode ser estornada
   */
  async canReverseMovement(movimentacaoId) {
    return api.get(`/movimentacoes-estoque/${movimentacaoId}/can-reverse`);
  }
  // ==================== NOTAS DE MOVIMENTAÇÃO ====================
  /**
   * Cria nota de movimentação (para agrupar múltiplas movimentações)
   */
  async createMovementNote(data) {
    return api.post("/notas-movimentacao", data);
  }
  /**
   * Processa nota de movimentação (executa as movimentações)
   */
  async processMovementNote(notaId) {
    return api.post(`/notas-movimentacao/${notaId}/processar`);
  }
  /**
   * Busca notas de movimentação
   */
  async getMovementNotes(params = {}) {
    const url = createUrlWithParams("/notas-movimentacao", params);
    return api.get(url);
  }
  // ==================== VALIDAÇÕES E VERIFICAÇÕES ====================
  /**
   * Verifica disponibilidade de estoque antes de movimentação
   */
  async checkStockAvailability(tipoEPIId, almoxarifadoId, quantidadeNecessaria) {
    const url = createUrlWithParams("/estoque/verificar-disponibilidade", {
      tipoEPIId,
      almoxarifadoId,
      quantidade: quantidadeNecessaria
    });
    return api.get(url);
  }
  /**
   * Simula movimentação para validação
   */
  async simulateMovement(movementData) {
    return api.post("/estoque/simular-movimentacao", movementData);
  }
  // ==================== MÉTODOS DE PERFORMANCE ====================
  /**
   * Busca itens com baixo estoque
   */
  async getLowStockItems() {
    const response = await this.getInventoryItems({
      status: "baixo",
      includeExpanded: true,
      limit: 100
    });
    return response.data;
  }
  /**
   * Busca itens próximos ao vencimento
   */
  async getExpiringItems(days = 30) {
    const response = await this.getInventoryItems({
      vencimento: "vencendo",
      includeExpanded: true,
      limit: 100
    });
    return response.data;
  }
  /**
   * Busca movimentações recentes
   */
  async getRecentMovements(limit = 20) {
    const response = await this.getMovementHistory({
      includeExpanded: true,
      limit,
      sort: "dataMovimentacao",
      order: "desc"
    });
    return response.data;
  }
  // ==================== CACHE E PERFORMANCE ====================
  cache = /* @__PURE__ */ new Map();
  CACHE_DURATION = 2 * 60 * 1e3;
  // 2 minutos (estoque muda frequentemente)
  /**
   * Limpa cache do inventário
   */
  clearCache() {
    this.cache.clear();
  }
  /**
   * Invalidar cache quando há movimentação
   */
  invalidateCache() {
    this.clearCache();
  }
  // Override dos métodos de command para invalidar cache
  async registerMovementWithCacheInvalidation(movementData) {
    const result = await this.registerMovement(movementData);
    this.invalidateCache();
    return result;
  }
  // ==================== MÉTODOS AUXILIARES PARA MOCK FUNCIONAL ====================
  /**
   * Atualiza item no mock (simula persistência no backend)
   */
  async updateMockItem(itemId, updates) {
    console.log(`💾 Item ${itemId} seria atualizado:`, updates);
  }
  /**
   * Adiciona movimentação ao histórico mockado
   */
  async addMockMovement(movement) {
    if (!this.mockMovements) {
      this.mockMovements = [];
    }
    this.mockMovements.unshift(movement);
    if (this.mockMovements.length > 100) {
      this.mockMovements = this.mockMovements.slice(0, 100);
    }
    console.log(`📊 Movimentação adicionada ao histórico. Total: ${this.mockMovements.length}`);
  }
  /**
   * Calcula status do item baseado na quantidade e validade
   */
  calculateStatus(quantidade, dataValidade) {
    if (quantidade === 0) {
      return "esgotado";
    }
    if (quantidade <= 5) {
      return "baixo_estoque";
    }
    if (dataValidade) {
      const hoje = /* @__PURE__ */ new Date();
      const vencimento = new Date(dataValidade);
      const diffDays = Math.ceil((vencimento.getTime() - hoje.getTime()) / (1e3 * 60 * 60 * 24));
      if (diffDays <= 0) {
        return "vencido";
      }
      if (diffDays <= 30) {
        return "vencendo";
      }
    }
    return "disponivel";
  }
  // Cache para movimentações mockadas
  mockMovements = [];
  /**
   * Dados mockados de inventário para demonstração
   */
  getMockInventoryData() {
    return [
      {
        id: "item-001",
        tipoEPIId: "tipo-001",
        almoxarifadoId: "alm-001",
        quantidade: 15,
        localizacao: "A1-001",
        status: "disponivel",
        lote: "LOTE2024001",
        dataValidade: "2025-12-31",
        tipoEPI: {
          id: "tipo-001",
          nomeEquipamento: "Capacete de Segurança",
          numeroCA: "31469",
          categoria: "PROTECAO_CABECA",
          descricao: "Capacete de segurança classe A",
          fabricante: "SafetyTech",
          ativo: true
        }
      },
      {
        id: "item-002",
        tipoEPIId: "tipo-002",
        almoxarifadoId: "alm-001",
        quantidade: 25,
        localizacao: "A1-002",
        status: "disponivel",
        lote: "LOTE2024002",
        dataValidade: "2025-06-30",
        tipoEPI: {
          id: "tipo-002",
          nomeEquipamento: "Luvas de Proteção",
          numeroCA: "15276",
          categoria: "PROTECAO_MAOS",
          descricao: "Luvas de proteção mecânica",
          fabricante: "ProtectGear",
          ativo: true
        }
      },
      {
        id: "item-003",
        tipoEPIId: "tipo-003",
        almoxarifadoId: "alm-001",
        quantidade: 8,
        localizacao: "A1-003",
        status: "baixo_estoque",
        lote: "LOTE2024003",
        dataValidade: "2025-09-15",
        tipoEPI: {
          id: "tipo-003",
          nomeEquipamento: "Óculos de Proteção",
          numeroCA: "19420",
          categoria: "PROTECAO_OLHOS",
          descricao: "Óculos de proteção anti-impacto",
          fabricante: "VisionSafe",
          ativo: true
        }
      },
      {
        id: "item-004",
        tipoEPIId: "tipo-004",
        almoxarifadoId: "alm-001",
        quantidade: 30,
        localizacao: "A1-004",
        status: "disponivel",
        lote: "LOTE2024004",
        dataValidade: "2025-11-20",
        tipoEPI: {
          id: "tipo-004",
          nomeEquipamento: "Protetor Auricular",
          numeroCA: "5674",
          categoria: "PROTECAO_AUDITIVA",
          descricao: "Protetor auricular tipo plug",
          fabricante: "SoundGuard",
          ativo: true
        }
      },
      {
        id: "item-005",
        tipoEPIId: "tipo-005",
        almoxarifadoId: "alm-001",
        quantidade: 0,
        localizacao: "A1-005",
        status: "esgotado",
        lote: "LOTE2024005",
        dataValidade: "2025-08-10",
        tipoEPI: {
          id: "tipo-005",
          nomeEquipamento: "Cinto de Segurança",
          numeroCA: "18392",
          categoria: "PROTECAO_QUEDAS",
          descricao: "Cinto de segurança tipo paraquedista",
          fabricante: "HeightSafe",
          ativo: true
        }
      },
      {
        id: "item-006",
        tipoEPIId: "tipo-006",
        almoxarifadoId: "alm-001",
        quantidade: 20,
        localizacao: "A1-006",
        status: "disponivel",
        lote: "LOTE2024006",
        dataValidade: "2025-07-25",
        tipoEPI: {
          id: "tipo-006",
          nomeEquipamento: "Botina de Segurança",
          numeroCA: "12845",
          categoria: "PROTECAO_PES",
          descricao: "Botina de segurança com bico de aço",
          fabricante: "FootProtect",
          ativo: true
        }
      },
      {
        id: "item-007",
        tipoEPIId: "tipo-007",
        almoxarifadoId: "alm-001",
        quantidade: 50,
        localizacao: "A1-007",
        status: "disponivel",
        lote: "LOTE2024007",
        dataValidade: "2025-03-30",
        tipoEPI: {
          id: "tipo-007",
          nomeEquipamento: "Máscara PFF2",
          numeroCA: "42987",
          categoria: "PROTECAO_RESPIRATORIA",
          descricao: "Máscara respiratória PFF2",
          fabricante: "AirSafe",
          ativo: true
        }
      }
    ];
  }
}
const inventoryCommandAdapter = new InventoryCommandAdapter();
function createPaginatedStore(fetchFunction, options = {}) {
  const {
    initialPageSize = 20,
    enableCache = true,
    cacheTimeout = 5 * 60 * 1e3,
    // 5 minutos
    debounceDelay = 300
  } = options;
  const initialState = {
    items: [],
    total: 0,
    page: 1,
    pageSize: initialPageSize,
    totalPages: 0,
    loading: false,
    error: null,
    lastFetch: null
  };
  const { subscribe: subscribe2, set, update } = writable(initialState);
  const cache = /* @__PURE__ */ new Map();
  let currentParams = {
    page: 1,
    limit: initialPageSize
  };
  let searchTimeout = null;
  let filterTimeout = null;
  function getCacheKey(params) {
    return JSON.stringify(params);
  }
  function isCacheValid(entry) {
    return Date.now() - entry.timestamp < cacheTimeout;
  }
  async function fetchWithCache(params) {
    if (enableCache) {
      const cacheKey = getCacheKey(params);
      const cached = cache.get(cacheKey);
      if (cached && isCacheValid(cached)) {
        console.log("📄 Using cached data for:", cacheKey);
        return cached.data;
      }
    }
    const response = await fetchFunction(params);
    if (enableCache) {
      const cacheKey = getCacheKey(params);
      cache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
      });
    }
    return response;
  }
  async function fetchPage(params = {}) {
    currentParams = { ...currentParams, ...params };
    update((state) => ({ ...state, loading: true, error: null }));
    try {
      const response = await fetchWithCache(currentParams);
      set({
        items: response.data,
        total: response.total,
        page: response.page,
        pageSize: response.pageSize,
        totalPages: response.totalPages || Math.ceil(response.total / response.pageSize),
        loading: false,
        error: null,
        lastFetch: Date.now()
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      update((state) => ({
        ...state,
        loading: false,
        error: errorMessage
      }));
      console.error("❌ Erro ao buscar página:", error);
    }
  }
  async function setFilters(filters) {
    if (filterTimeout) {
      clearTimeout(filterTimeout);
    }
    filterTimeout = setTimeout(async () => {
      currentParams = {
        ...currentParams,
        ...filters,
        // Aplicar filtros no nível raiz dos params
        page: 1
        // Reset para primeira página
      };
      await fetchPage(currentParams);
    }, debounceDelay);
  }
  async function setSearch(search) {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(async () => {
      currentParams = {
        ...currentParams,
        search,
        page: 1
        // Reset para primeira página
      };
      await fetchPage(currentParams);
    }, debounceDelay);
  }
  async function setSorting(sort, order) {
    currentParams = {
      ...currentParams,
      sort,
      order,
      page: 1
      // Reset para primeira página
    };
    await fetchPage(currentParams);
  }
  async function nextPage() {
    let canNext = false;
    subscribe2((state) => {
      canNext = state.page < state.totalPages;
    })();
    if (canNext) {
      await fetchPage({ page: currentParams.page + 1 });
    }
  }
  async function prevPage() {
    if (currentParams.page > 1) {
      await fetchPage({ page: currentParams.page - 1 });
    }
  }
  async function goToPage(page) {
    if (page >= 1) {
      await fetchPage({ page });
    }
  }
  async function reload() {
    if (enableCache) {
      const cacheKey = getCacheKey(currentParams);
      cache.delete(cacheKey);
    }
    await fetchPage(currentParams);
  }
  function reset() {
    currentParams = { page: 1, limit: initialPageSize };
    cache.clear();
    set(initialState);
  }
  function hasNext() {
    let result = false;
    subscribe2((state) => {
      result = state.page < state.totalPages;
    })();
    return result;
  }
  function hasPrev() {
    return currentParams.page > 1;
  }
  function isEmpty() {
    let result = false;
    subscribe2((state) => {
      result = state.items.length === 0 && !state.loading;
    })();
    return result;
  }
  function isLoading() {
    let result = false;
    subscribe2((state) => {
      result = state.loading;
    })();
    return result;
  }
  function getCurrentParams() {
    return { ...currentParams };
  }
  return {
    subscribe: subscribe2,
    fetchPage,
    setFilters,
    setSearch,
    setSorting,
    nextPage,
    prevPage,
    goToPage,
    reload,
    reset,
    hasNext,
    hasPrev,
    isEmpty,
    isLoading,
    getCurrentParams
  };
}
function getStatusInfo(status) {
  switch (status) {
    case "disponivel":
      return { color: "green", label: "Disponível" };
    case "baixo":
      return { color: "yellow", label: "Estoque baixo" };
    case "vencendo":
      return {
        color: "orange",
        label: "Próximo ao vencimento"
      };
    case "vencido":
      return { color: "red", label: "Vencido" };
    case "esgotado":
      return { color: "gray", label: "Esgotado" };
    default:
      return { color: "gray", label: "Indefinido" };
  }
}
const InventoryTablePresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasActiveFilters;
  let { items = [] } = $$props;
  let { loading = false } = $$props;
  let { error = null } = $$props;
  let { total = 0 } = $$props;
  let { page = 1 } = $$props;
  let { totalPages = 1 } = $$props;
  let { searchTerm = "" } = $$props;
  let { filters } = $$props;
  let { categoriaOptions = [] } = $$props;
  const dispatch = createEventDispatcher();
  let searchInput = "";
  function handlePageChange(newPage) {
    dispatch("pageChange", { page: newPage });
  }
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0) $$bindings.total(total);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
  if ($$props.totalPages === void 0 && $$bindings.totalPages && totalPages !== void 0) $$bindings.totalPages(totalPages);
  if ($$props.searchTerm === void 0 && $$bindings.searchTerm && searchTerm !== void 0) $$bindings.searchTerm(searchTerm);
  if ($$props.filters === void 0 && $$bindings.filters && filters !== void 0) $$bindings.filters(filters);
  if ($$props.categoriaOptions === void 0 && $$bindings.categoriaOptions && categoriaOptions !== void 0) $$bindings.categoriaOptions(categoriaOptions);
  {
    if (searchTerm !== void 0 && searchTerm !== searchInput) {
      searchInput = searchTerm;
    }
  }
  hasActiveFilters = searchInput || filters.status && filters.status !== "todos" || filters.categoria && filters.categoria !== "todas";
  return `   <div class="space-y-6"> <div class="flex items-center justify-between"><div data-svelte-h="svelte-1lsp2ed"><h1 class="text-xl font-medium text-gray-900 dark:text-white">Estoque de EPIs</h1> <p class="text-sm text-gray-600 dark:text-gray-400">Controle de estoque e movimentações</p></div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "primary",
      class: "rounded-sm"
    },
    {},
    {
      default: () => {
        return `${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
        Nova Movimentação`;
      }
    }
  )}</div></div>  ${loading ? `${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}` : `${error ? `${validate_component(ErrorDisplay, "ErrorDisplay").$$render(
    $$result,
    {
      error,
      onRetry: () => handlePageChange(page)
    },
    {},
    {}
  )}` : `${items.length > 0 ? ` <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"> <div class="p-4 border-b border-gray-200 dark:border-gray-700"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"> <div class="relative">${validate_component(SearchOutline, "SearchOutline").$$render(
    $$result,
    {
      class: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
    },
    {},
    {}
  )} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "text",
      placeholder: "Buscar por nome do EPI ou CA...",
      class: "pl-10 rounded-sm h-10 text-sm",
      value: searchInput
    },
    {},
    {}
  )}</div>  ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
    $$result,
    {
      options: [
        { value: "todos", label: "Todos os Status" },
        { value: "disponivel", label: "Disponível" },
        {
          value: "indisponivel",
          label: "Indisponível"
        }
      ],
      value: filters.status || "todos",
      placeholder: "Status"
    },
    {},
    {}
  )}  ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
    $$result,
    {
      options: categoriaOptions,
      value: filters.categoria || "todas",
      placeholder: "Categoria"
    },
    {},
    {}
  )}  ${hasActiveFilters ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      color: "alternative",
      class: "rounded-sm h-10 w-10 p-0 flex items-center justify-center",
      title: "Limpar Filtros"
    },
    {},
    {
      default: () => {
        return `${validate_component(RefreshOutline, "RefreshOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})}`;
      }
    }
  )}` : ` <div></div>`}</div></div>  <div class="min-w-[980px] overflow-x-auto">${validate_component(Table, "Table").$$render($$result, { hoverable: true }, {}, {
    default: () => {
      return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[200px]" }, {}, {
            default: () => {
              return `Equipamento`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
            $$result,
            {
              class: "min-w-[120px] hidden lg:table-cell"
            },
            {},
            {
              default: () => {
                return `Categoria`;
              }
            }
          )} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
            default: () => {
              return `Quantidade`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
            $$result,
            {
              class: "min-w-[120px] hidden xl:table-cell"
            },
            {},
            {
              default: () => {
                return `Status`;
              }
            }
          )} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[120px]" }, {}, {
            default: () => {
              return `Ações`;
            }
          })}`;
        }
      })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
        default: () => {
          return `${each(items, (item) => {
            let statusInfo = getStatusInfo(item.status);
            return ` ${validate_component(TableBodyRow, "TableBodyRow").$$render(
              $$result,
              {
                class: "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              },
              {},
              {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[200px]" }, {}, {
                    default: () => {
                      return `<div><p class="font-medium text-gray-900 dark:text-white truncate">${escape(item.tipoEPI?.nomeEquipamento || "EPI não encontrado")}</p> <p class="text-sm text-gray-500 dark:text-gray-400 truncate">CA ${escape(item.tipoEPI?.numeroCA || "-")} • ${escape(item.tipoEPI?.fabricante || "-")}</p>  <p class="text-xs text-gray-500 dark:text-gray-400 lg:hidden mt-1 truncate">${escape(item.tipoEPI?.categoria || "Sem categoria")}</p>  <div class="xl:hidden mt-1">${validate_component(Badge, "Badge").$$render(
                        $$result,
                        {
                          color: statusInfo.color,
                          class: "w-fit rounded-sm text-xs"
                        },
                        {},
                        {
                          default: () => {
                            return `${escape(statusInfo.label)} `;
                          }
                        }
                      )} </div></div> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render(
                    $$result,
                    {
                      class: "min-w-[120px] hidden lg:table-cell"
                    },
                    {},
                    {
                      default: () => {
                        return `<span class="text-sm text-gray-900 dark:text-white truncate">${escape(item.tipoEPI?.categoria || "-")}</span> `;
                      }
                    }
                  )} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
                    default: () => {
                      return `<span class="font-medium text-gray-900 dark:text-white">${escape(item.quantidade)}</span> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render(
                    $$result,
                    {
                      class: "min-w-[120px] hidden xl:table-cell"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(Badge, "Badge").$$render(
                          $$result,
                          {
                            color: statusInfo.color,
                            class: "w-fit rounded-sm"
                          },
                          {},
                          {
                            default: () => {
                              return `${escape(statusInfo.label)} `;
                            }
                          }
                        )} `;
                      }
                    }
                  )} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[120px]" }, {}, {
                    default: () => {
                      return `<div class="flex space-x-2"> <button class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Ajustar quantidade">${validate_component(AdjustmentsHorizontalOutline, "AdjustmentsHorizontalOutline").$$render(
                        $$result,
                        {
                          class: "w-5 h-5 text-gray-600 dark:text-gray-400"
                        },
                        {},
                        {}
                      )}</button> <button class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Ver histórico">${validate_component(ClockOutline, "ClockOutline").$$render(
                        $$result,
                        {
                          class: "w-5 h-5 text-gray-600 dark:text-gray-400"
                        },
                        {},
                        {}
                      )} </button></div> `;
                    }
                  })} `;
                }
              }
            )}`;
          })}`;
        }
      })}`;
    }
  })}</div>  ${totalPages > 1 ? `<div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700"><div class="text-sm text-gray-500 dark:text-gray-400">Mostrando ${escape((page - 1) * 20 + 1)} a ${escape(Math.min(page * 20, total))} de ${escape(total)} resultados</div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "alternative",
      class: "rounded-sm",
      disabled: page === 1
    },
    {},
    {
      default: () => {
        return `Anterior`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "alternative",
      class: "rounded-sm",
      disabled: page === totalPages
    },
    {},
    {
      default: () => {
        return `Próximo`;
      }
    }
  )}</div></div>` : ``}</div>` : ` ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
    default: () => {
      return `<div class="text-center py-12"><div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">${validate_component(ArrowUpOutline, "ArrowUpOutline").$$render($$result, { class: "w-8 h-8 text-gray-400" }, {}, {})}</div> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-1ps965a">Nenhum item no estoque</h3> <p class="text-gray-500 dark:text-gray-400 mb-6">${escape(searchInput || hasActiveFilters ? "Tente ajustar os filtros ou termo de busca" : "Comece adicionando itens ao estoque")}</p> ${validate_component(Button, "Button").$$render(
        $$result,
        {
          size: "sm",
          color: "primary",
          class: "rounded-sm"
        },
        {},
        {
          default: () => {
            return `${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
          Primeira Movimentação`;
          }
        }
      )}</div>`;
    }
  })}`}`}`}</div>`;
});
const InventoryContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let statusOptions;
  let categoriaOptions;
  let configReady;
  let containerState;
  let $inventoryStore, $$unsubscribe_inventoryStore;
  let $businessConfigStore, $$unsubscribe_businessConfigStore;
  let $categoriasEPIOptions, $$unsubscribe_categoriasEPIOptions;
  let $statusEstoqueOptions, $$unsubscribe_statusEstoqueOptions;
  $$unsubscribe_businessConfigStore = subscribe(businessConfigStore, (value) => $businessConfigStore = value);
  $$unsubscribe_categoriasEPIOptions = subscribe(categoriasEPIOptions, (value) => $categoriasEPIOptions = value);
  $$unsubscribe_statusEstoqueOptions = subscribe(statusEstoqueOptions, (value) => $statusEstoqueOptions = value);
  let { initialPageSize = 20 } = $$props;
  let { autoRefresh = false } = $$props;
  let { refreshInterval = 3e4 } = $$props;
  const inventoryStore = createPaginatedStore(
    (params) => inventoryCommandAdapter.getInventoryItems({ ...params, includeExpanded: true }),
    // Incluir dados de tipoEPI e almoxarifado
    initialPageSize
  );
  $$unsubscribe_inventoryStore = subscribe(inventoryStore, (value) => $inventoryStore = value);
  let filters = { status: "todos", categoria: "todas" };
  let searchTerm = "";
  let almoxarifados = [];
  let filterTimeout;
  function applyFilters() {
    const activeFilters = {};
    if (filters.status && filters.status !== "todos") {
      activeFilters.status = filters.status;
    }
    if (filters.categoria && filters.categoria !== "todas") {
      activeFilters.categoria = filters.categoria;
    }
    console.log("🔧 Aplicando filtros:", activeFilters);
    inventoryStore.setFilters(activeFilters);
  }
  if ($$props.initialPageSize === void 0 && $$bindings.initialPageSize && initialPageSize !== void 0) $$bindings.initialPageSize(initialPageSize);
  if ($$props.autoRefresh === void 0 && $$bindings.autoRefresh && autoRefresh !== void 0) $$bindings.autoRefresh(autoRefresh);
  if ($$props.refreshInterval === void 0 && $$bindings.refreshInterval && refreshInterval !== void 0) $$bindings.refreshInterval(refreshInterval);
  {
    {
      {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(
          () => {
            applyFilters();
          },
          300
        );
      }
    }
  }
  statusOptions = $statusEstoqueOptions;
  categoriaOptions = $categoriasEPIOptions;
  [
    {
      value: "",
      label: "Todos os Almoxarifados"
    },
    ...almoxarifados.map((alm) => ({ value: alm.id, label: alm.nome }))
  ];
  configReady = $businessConfigStore?.data !== null;
  containerState = {
    items: $inventoryStore.items,
    loading: $inventoryStore.loading,
    error: $inventoryStore.error,
    total: $inventoryStore.total,
    page: $inventoryStore.page,
    totalPages: $inventoryStore.totalPages,
    searchTerm,
    filters,
    statusOptions,
    categoriaOptions
  };
  $$unsubscribe_inventoryStore();
  $$unsubscribe_businessConfigStore();
  $$unsubscribe_categoriasEPIOptions();
  $$unsubscribe_statusEstoqueOptions();
  return `   ${configReady ? `${validate_component(InventoryTablePresenter, "InventoryTablePresenter").$$render($$result, Object.assign({}, containerState), {}, {})} ${``} ${``}` : ` <div class="flex items-center justify-center py-12" data-svelte-h="svelte-rljcoz"><div class="text-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div> <p class="text-sm text-gray-600 dark:text-gray-400">Carregando configurações...</p></div></div>`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `  ${$$result.head += `<!-- HEAD_svelte-1bnjr0i_START -->${$$result.title = `<title>Estoque - DataLife EPI</title>`, ""}<!-- HEAD_svelte-1bnjr0i_END -->`, ""}  ${validate_component(InventoryContainer, "InventoryContainer").$$render($$result, { initialPageSize: 20, autoRefresh: false }, {}, {})}`;
});
export {
  Page as default
};
