import { c as create_ssr_component, a as compute_rest_props, j as getContext, d as spread, g as add_attribute, h as escape, f as escape_attribute_value, e as escape_object, i as createEventDispatcher, v as validate_component, l as each, k as subscribe } from "../../../chunks/ssr.js";
import { c as createUrlWithParams, a as api, I as Input, b as categoriasEPIOptions, s as statusEstoqueOptions } from "../../../chunks/modalStore.js";
import { L as LoadingSpinner, E as ErrorDisplay, R as RefreshOutline, T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, f as createPaginatedStore } from "../../../chunks/ErrorDisplay.js";
import { a as Button, B as Badge } from "../../../chunks/Button.js";
import { twMerge } from "tailwind-merge";
import { P as PlusOutline } from "../../../chunks/PlusOutline.js";
import { S as SearchOutline, a as SearchableDropdown } from "../../../chunks/SearchableDropdown.js";
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
class InventoryCommandAdapter {
  // ==================== QUERIES - Consultar dados de inventário ====================
  /**
   * Obtém itens do inventário com paginação e filtros
   */
  async getInventoryItems(params = {}) {
    console.log("🚨 ADAPTER CHAMADO: Buscando itens do inventário:", params);
    console.log("🚨 API_BASE_URL atual:", "production");
    try {
      const queryParams = {
        page: params.page || 1,
        pageSize: params.pageSize || 20,
        ...params.search && { search: params.search },
        ...params.status && { status: params.status },
        ...params.categoria && { categoria: params.categoria },
        ...params.includeExpanded && { includeExpanded: true }
      };
      const url = createUrlWithParams("/estoque/itens", queryParams);
      console.log("🔗 URL construída:", url);
      const response = await api.get(url);
      console.log("🔍 Resposta bruta do backend estoque:", response);
      console.log("🔍 Estrutura dos dados:", {
        hasData: !!response.data,
        hasItems: !!response.data?.items,
        itemsLength: response.data?.items?.length,
        firstItem: response.data?.items?.[0],
        pagination: response.data?.pagination
      });
      const items = response.data?.items || response.items || [];
      console.log("🔍 Items encontrados no backend:", items.length);
      const mappedItems = items.map((item) => ({
        ...item,
        // Mapear tipoEpi -> tipoEPI para compatibilidade frontend
        tipoEPI: item.tipoEpi ? {
          ...item.tipoEpi,
          numeroCA: item.tipoEpi.numeroCa || item.tipoEpi.numeroCA,
          // Mapear numeroCa -> numeroCA
          nomeEquipamento: item.tipoEpi.nomeEquipamento || item.tipoEpi.nome,
          // Compatibilidade
          categoria: item.tipoEpi.categoriaEpi || item.tipoEpi.categoria
          // Mapear categoria
        } : void 0,
        // Mapear status para lowercase para compatibilidade com frontend
        status: (item.status || "DISPONIVEL").toLowerCase(),
        // Manter dados do almoxarifado
        almoxarifado: item.almoxarifado
      }));
      const pagination = response.data?.pagination || response.pagination || {};
      const mappedResponse = {
        data: mappedItems,
        total: pagination.total || mappedItems.length,
        page: pagination.page || params.page || 1,
        pageSize: pagination.limit || pagination.pageSize || params.pageSize || 20,
        totalPages: pagination.totalPages || Math.ceil(
          (pagination.total || mappedItems.length) / (pagination.limit || pagination.pageSize || params.pageSize || 20)
        )
      };
      console.log("✅ Itens do inventário mapeados:", mappedResponse);
      return mappedResponse;
    } catch (error) {
      console.error("❌ Erro ao buscar itens do inventário:", error);
      throw error;
    }
  }
  /**
   * Obtém histórico de movimentações de um item específico
   */
  async getItemMovementHistory(itemId, params = {}) {
    console.log("📊 Buscando histórico do item:", itemId, params);
    try {
      const queryParams = {
        limit: params.limit || 100,
        ...params.dataInicio && { dataInicio: params.dataInicio },
        ...params.dataFim && { dataFim: params.dataFim }
      };
      const url = createUrlWithParams(
        `/estoque/itens/${itemId}/movimentacoes`,
        queryParams
      );
      const response = await api.get(url);
      console.log("✅ Histórico do item obtido com sucesso:", response.length);
      return response;
    } catch (error) {
      console.error("❌ Erro ao buscar histórico do item:", error);
      throw error;
    }
  }
  // ==================== COMMANDS - Registrar movimentações (Event Sourcing) ====================
  /**
   * Registra movimentação genérica - Método base para Event Sourcing
   */
  async registerMovement(movementData) {
    console.log("📝 Registrando movimentação:", movementData);
    try {
      const response = await api.post(
        "/estoque/movimentacoes",
        movementData
      );
      console.log("✅ Movimentação registrada com sucesso:", response);
      return response;
    } catch (error) {
      console.error("❌ Erro ao registrar movimentação:", error);
      throw error;
    }
  }
  /**
   * Registra entrada de estoque
   */
  async registerEntry(data) {
    const entryData = {
      ...data,
      tipoMovimentacao: "ENTRADA_COMPRA"
    };
    return this.registerMovement(entryData);
  }
  /**
   * Registra saída de estoque
   */
  async registerExit(data) {
    const exitData = {
      ...data,
      tipoMovimentacao: "SAIDA_ENTREGA"
    };
    return this.registerMovement(exitData);
  }
  /**
   * Registra ajuste de estoque
   */
  async registerAdjustment(data) {
    const adjustmentData = {
      tipoEpiId: data.tipoEpiId,
      almoxarifadoId: data.almoxarifadoId,
      quantidade: data.quantidade,
      observacoes: data.motivo,
      responsavelId: data.responsavelId,
      tipoMovimentacao: "AJUSTE_INVENTARIO"
    };
    return this.registerMovement(adjustmentData);
  }
  /**
   * Registra transferência entre almoxarifados
   */
  async registerTransfer(data) {
    try {
      const response = await api.post(
        "/estoque/transferencias",
        data
      );
      console.log("✅ Transferência registrada com sucesso:", response);
      return response;
    } catch (error) {
      console.error("❌ Erro ao registrar transferência:", error);
      throw error;
    }
  }
  /**
   * Cria estorno de movimentação
   */
  async criarEstorno(data) {
    try {
      const response = await api.post(
        "/estoque/estornos",
        data
      );
      console.log("✅ Estorno registrado com sucesso:", response);
      return response;
    } catch (error) {
      console.error("❌ Erro ao criar estorno:", error);
      throw error;
    }
  }
  /**
   * Limpa cache interno (se houver implementação de cache no futuro)
   */
  clearCache() {
    console.log("🗑️ Cache do InventoryCommandAdapter limpo");
  }
}
const inventoryCommandAdapter = new InventoryCommandAdapter();
function getStatusInfo(status) {
  const normalizedStatus = status?.toLowerCase();
  switch (normalizedStatus) {
    case "disponivel":
    case "ativo":
      return { color: "green", label: "Disponível" };
    case "baixo":
      return { color: "yellow", label: "Estoque baixo" };
    case "indisponivel":
    case "inativo":
      return { color: "red", label: "Indisponível" };
    case "vencendo":
      return {
        color: "orange",
        label: "Próximo ao vencimento"
      };
    case "vencido":
      return { color: "red", label: "Vencido" };
    case "esgotado":
    case "zero":
      return { color: "gray", label: "Esgotado" };
    default:
      return {
        color: "blue",
        label: status || "Indefinido"
      };
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
    {
      console.log("🎨 PRESENTER: items recebidos:", {
        itemsLength: items?.length || 0,
        items,
        loading,
        error
      });
    }
  }
  {
    if (searchTerm !== void 0 && searchTerm !== searchInput) {
      searchInput = searchTerm;
    }
  }
  hasActiveFilters = searchInput || filters.status && filters.status !== "todos" || filters.categoria && filters.categoria !== "todas";
  return `   <div class="p-6 space-y-6"> <div class="flex items-center justify-between"><div data-svelte-h="svelte-183crrt"><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Estoque</h1> <p class="text-gray-600 dark:text-gray-400">Controle de estoque e movimentações</p></div> <div class="flex gap-3">${validate_component(Button, "Button").$$render(
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
  )}` : `${items.length > 0 ? ` <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"> <div class="p-4 border-b border-gray-200 dark:border-gray-700"><div class="flex items-center gap-4"> <div class="relative flex-1 max-w-md">${validate_component(SearchOutline, "SearchOutline").$$render(
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
      placeholder: "Buscar por equipamento ou CA...",
      class: "pl-10 rounded-sm h-10 text-sm",
      value: searchInput
    },
    {},
    {}
  )}</div>  ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
    $$result,
    {
      options: [
        { value: "todos", label: "Todos" },
        { value: "disponivel", label: "Disponível" },
        {
          value: "indisponivel",
          label: "Indisponível"
        }
      ],
      value: filters.status || "todos",
      placeholder: "Status",
      class: "min-w-[140px]"
    },
    {},
    {}
  )} ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
    $$result,
    {
      options: categoriaOptions,
      value: filters.categoria || "todas",
      placeholder: "Categoria",
      class: "min-w-[140px]"
    },
    {},
    {}
  )}  ${hasActiveFilters ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      color: "alternative",
      class: "rounded-sm h-10 px-3",
      title: "Limpar Filtros"
    },
    {},
    {
      default: () => {
        return `${validate_component(RefreshOutline, "RefreshOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})}`;
      }
    }
  )}` : ``}</div></div>  <div class="overflow-x-auto">${validate_component(Table, "Table").$$render($$result, { hoverable: true }, {}, {
    default: () => {
      return `${validate_component(TableHead, "TableHead").$$render($$result, { class: "bg-gray-50 dark:bg-gray-700" }, {}, {
        default: () => {
          return `${validate_component(TableHeadCell, "TableHeadCell").$$render(
            $$result,
            {
              class: "py-3 px-6 font-semibold text-xs uppercase text-gray-600 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Equipamento`;
              }
            }
          )} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
            $$result,
            {
              class: "py-3 px-6 font-semibold text-xs uppercase text-gray-600 dark:text-gray-300 hidden md:table-cell"
            },
            {},
            {
              default: () => {
                return `Categoria`;
              }
            }
          )} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
            $$result,
            {
              class: "py-3 px-6 font-semibold text-xs uppercase text-gray-600 dark:text-gray-300 text-center"
            },
            {},
            {
              default: () => {
                return `Quantidade`;
              }
            }
          )} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
            $$result,
            {
              class: "py-3 px-6 font-semibold text-xs uppercase text-gray-600 dark:text-gray-300 hidden lg:table-cell"
            },
            {},
            {
              default: () => {
                return `Status`;
              }
            }
          )} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
            $$result,
            {
              class: "py-3 px-6 font-semibold text-xs uppercase text-gray-600 dark:text-gray-300 text-center"
            },
            {},
            {
              default: () => {
                return `Ações`;
              }
            }
          )}`;
        }
      })} ${validate_component(TableBody, "TableBody").$$render(
        $$result,
        {
          class: "divide-y divide-gray-200 dark:divide-gray-700"
        },
        {},
        {
          default: () => {
            return `${each(items, (item) => {
              let statusInfo = getStatusInfo(item.status);
              return ` ${validate_component(TableBodyRow, "TableBodyRow").$$render(
                $$result,
                {
                  class: "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "py-4 px-6" }, {}, {
                      default: () => {
                        return `<div class="flex items-center space-x-3"><div class="min-w-0 flex-1"><p class="font-medium text-gray-900 dark:text-white truncate">${escape(item.tipoEPI?.nomeEquipamento || "EPI não encontrado")}</p> <p class="text-sm text-gray-500 dark:text-gray-400 truncate">CA ${escape(item.tipoEPI?.numeroCA || "-")}</p>  <div class="md:hidden mt-1 space-y-1"><p class="text-xs text-gray-500 dark:text-gray-400">${escape(item.tipoEPI?.categoria || "Sem categoria")}</p> <div class="lg:hidden">${validate_component(Badge, "Badge").$$render(
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
                        )} </div></div> </div></div> `;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "py-4 px-6 hidden md:table-cell" }, {}, {
                      default: () => {
                        return `<span class="text-sm text-gray-900 dark:text-white">${escape(item.tipoEPI?.categoria || "-")}</span> `;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "py-4 px-6 text-center" }, {}, {
                      default: () => {
                        return `<span class="font-semibold text-lg text-gray-900 dark:text-white">${escape(item.quantidade)}</span> `;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "py-4 px-6 hidden lg:table-cell" }, {}, {
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
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "py-4 px-6" }, {}, {
                      default: () => {
                        return `<div class="flex items-center justify-center space-x-1"><button class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700" title="Ajustar quantidade">${validate_component(AdjustmentsHorizontalOutline, "AdjustmentsHorizontalOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button> <button class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700" title="Ver histórico">${validate_component(ClockOutline, "ClockOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button></div> `;
                      }
                    })} `;
                  }
                }
              )}`;
            })}`;
          }
        }
      )}`;
    }
  })}</div>  ${totalPages > 1 ? `<div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"><div class="text-sm text-gray-600 dark:text-gray-400">Mostrando ${escape((page - 1) * 20 + 1)} a ${escape(Math.min(page * 20, total))} de ${escape(total)} resultados</div> <div class="flex gap-2">${validate_component(Button, "Button").$$render(
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
  )}</div></div>` : ``}</div>` : ` <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"><div class="text-center py-16 px-6"><div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">${validate_component(ArrowUpOutline, "ArrowUpOutline").$$render($$result, { class: "w-8 h-8 text-gray-400" }, {}, {})}</div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-bz2goa">Nenhum item encontrado</h3> <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">${escape(searchInput || hasActiveFilters ? "Tente ajustar os filtros ou termo de busca para encontrar itens" : "Comece adicionando itens ao estoque através de uma nova movimentação")}</p> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "primary",
      class: "rounded-sm"
    },
    {},
    {
      default: () => {
        return `${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})} ${escape(searchInput || hasActiveFilters ? "Nova Movimentação" : "Primeira Movimentação")}`;
      }
    }
  )}</div></div>`}`}`}</div>`;
});
const InventoryContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let statusOptions;
  let categoriaOptions;
  let hasActiveFilters;
  let presentationData;
  let $inventoryStore, $$unsubscribe_inventoryStore;
  let $categoriasEPIOptions, $$unsubscribe_categoriasEPIOptions;
  let $statusEstoqueOptions, $$unsubscribe_statusEstoqueOptions;
  $$unsubscribe_categoriasEPIOptions = subscribe(categoriasEPIOptions, (value) => $categoriasEPIOptions = value);
  $$unsubscribe_statusEstoqueOptions = subscribe(statusEstoqueOptions, (value) => $statusEstoqueOptions = value);
  let { initialPageSize = 20 } = $$props;
  const autoRefresh = false;
  const refreshInterval = 3e4;
  const inventoryStore = createPaginatedStore(
    (params) => inventoryCommandAdapter.getInventoryItems({ ...params, includeExpanded: true }),
    // Incluir dados de tipoEPI e almoxarifado
    { initialPageSize }
  );
  $$unsubscribe_inventoryStore = subscribe(inventoryStore, (value) => $inventoryStore = value);
  let almoxarifados = [];
  let filters = { status: "todos", categoria: "todas" };
  let searchTerm = "";
  if ($$props.initialPageSize === void 0 && $$bindings.initialPageSize && initialPageSize !== void 0) $$bindings.initialPageSize(initialPageSize);
  if ($$props.autoRefresh === void 0 && $$bindings.autoRefresh && autoRefresh !== void 0) $$bindings.autoRefresh(autoRefresh);
  if ($$props.refreshInterval === void 0 && $$bindings.refreshInterval && refreshInterval !== void 0) $$bindings.refreshInterval(refreshInterval);
  statusOptions = [{ value: "todos", label: "Todos os Status" }, ...$statusEstoqueOptions];
  categoriaOptions = [
    {
      value: "todas",
      label: "Todas as Categorias"
    },
    ...$categoriasEPIOptions
  ];
  [
    {
      value: "",
      label: "Todos os Almoxarifados"
    },
    ...almoxarifados.map((alm) => ({ value: alm.id, label: alm.nome }))
  ];
  hasActiveFilters = filters.categoria !== "todas";
  {
    {
      console.log("🏗️ CONTAINER: dados do store:", {
        storeItems: $inventoryStore.items?.length || 0,
        storeLoading: $inventoryStore.loading,
        storeError: $inventoryStore.error,
        storeTotal: $inventoryStore.total
      });
    }
  }
  presentationData = {
    items: $inventoryStore.items || [],
    loading: $inventoryStore.loading,
    error: $inventoryStore.error,
    pagination: {
      currentPage: $inventoryStore.page,
      totalPages: $inventoryStore.totalPages,
      pageSize: $inventoryStore.pageSize,
      total: $inventoryStore.total,
      hasNext: inventoryStore.hasNext(),
      hasPrev: inventoryStore.hasPrev()
    },
    filters: {
      searchTerm,
      statusFilter: filters.status,
      categoriaFilter: filters.categoria,
      hasActiveFilters
    },
    filterOptions: {
      status: statusOptions,
      categorias: categoriaOptions
    }
  };
  $$unsubscribe_inventoryStore();
  $$unsubscribe_categoriasEPIOptions();
  $$unsubscribe_statusEstoqueOptions();
  return `    ${validate_component(InventoryTablePresenter, "InventoryTablePresenter").$$render(
    $$result,
    {
      items: presentationData.items,
      loading: presentationData.loading,
      error: presentationData.error,
      total: presentationData.pagination.total,
      page: presentationData.pagination.currentPage,
      totalPages: presentationData.pagination.totalPages,
      searchTerm: presentationData.filters.searchTerm,
      filters: {
        status: presentationData.filters.statusFilter,
        categoria: presentationData.filters.categoriaFilter
      },
      categoriaOptions: presentationData.filterOptions.categorias
    },
    {},
    {}
  )} ${``} ${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `  ${$$result.head += `<!-- HEAD_svelte-1bnjr0i_START -->${$$result.title = `<title>Estoque - DataLife EPI</title>`, ""}<!-- HEAD_svelte-1bnjr0i_END -->`, ""}  ${validate_component(InventoryContainer, "InventoryContainer").$$render($$result, { initialPageSize: 20, autoRefresh: false }, {}, {})}`;
});
export {
  Page as default
};
