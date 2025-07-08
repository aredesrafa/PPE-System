import { c as create_ssr_component, i as createEventDispatcher, v as validate_component, h as escape, l as each, k as subscribe, o as onDestroy } from "../../../chunks/ssr.js";
import { c as createUrlWithParams, a as api, I as Input } from "../../../chunks/modalStore.js";
import { L as LoadingSpinner, E as ErrorDisplay, R as RefreshOutline, T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, f as createPaginatedStore } from "../../../chunks/ErrorDisplay.js";
import { a as Button, B as Badge } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { E as EyeOutline } from "../../../chunks/DrawerHeader.svelte_svelte_type_style_lang.js";
import { P as PenOutline, D as Drawer, a as DrawerHeader, S as StatusBadge, T as Textarea } from "../../../chunks/DrawerHeader.js";
import { P as PlusOutline } from "../../../chunks/PlusOutline.js";
import { S as SearchOutline, a as SearchableDropdown } from "../../../chunks/SearchableDropdown.js";
import { T as TrashBinOutline, S as Select } from "../../../chunks/TrashBinOutline.js";
import { L as Label } from "../../../chunks/Label.js";
import { f as formatarData } from "../../../chunks/dateHelpers.js";
class CatalogCache {
  cache = /* @__PURE__ */ new Map();
  defaultTTL = 5 * 60 * 1e3;
  // 5 minutos
  set(key, data, ttl = this.defaultTTL) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }
  clear() {
    this.cache.clear();
  }
  delete(key) {
    this.cache.delete(key);
  }
}
class CatalogAdapter {
  cache = new CatalogCache();
  baseUrl = "/tipos-epi";
  // ==================== CONSULTAS ====================
  /**
   * Lista tipos de EPI com paginação e filtros
   */
  async getTiposEPI(params = {}) {
    console.log(
      "📋 CatalogAdapter: Carregando tipos de EPI do backend real",
      params
    );
    const cacheKey = `tipos-epi-${JSON.stringify(params)}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      console.log("💾 Cache hit para tipos EPI");
      return cached;
    }
    try {
      const queryParams = {
        page: params.page || 1,
        limit: params.pageSize || 10,
        ...params.search && { search: params.search },
        ...params.categoria && { categoria: params.categoria },
        ...params.ativo !== void 0 && { ativo: params.ativo }
      };
      const url = createUrlWithParams("/tipos-epi", queryParams);
      const response = await api.get(url);
      console.log("🔗 Resposta da API tipos-epi:", response);
      const mappedItems = response.data.items.map((item) => ({
        id: item.id,
        nomeEquipamento: item.nomeEquipamento,
        numeroCa: item.numeroCa,
        numeroCA: item.numeroCa,
        // compatibility
        categoria: item.categoria,
        status: item.status || "ATIVO",
        vidaUtilDias: item.vidaUtilDias,
        validadePadrao: item.vidaUtilDias,
        // compatibility
        descricao: item.descricao || "",
        ativo: item.status === "ATIVO",
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        dataCriacao: item.createdAt,
        // compatibility
        dataAtualizacao: item.updatedAt || item.createdAt
        // compatibility
      }));
      const paginatedResponse = {
        data: mappedItems,
        total: response.data.pagination.total,
        page: response.data.pagination.page,
        pageSize: response.data.pagination.limit,
        totalPages: response.data.pagination.totalPages
      };
      this.cache.set(cacheKey, paginatedResponse);
      console.log(
        "✅ Tipos EPI carregados do backend real:",
        mappedItems.length,
        "itens"
      );
      return paginatedResponse;
    } catch (error) {
      console.error("❌ Erro ao carregar tipos EPI do backend:", error);
      throw new Error(
        "Não foi possível carregar o catálogo de EPIs do backend"
      );
    }
  }
  /**
   * Busca um tipo de EPI específico
   */
  async getTipoEPIById(id) {
    console.log("🔍 CatalogAdapter: Buscando tipo EPI do backend real", id);
    const cacheKey = `tipo-epi-${id}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }
    try {
      const url = `/tipos-epi/${id}`;
      const response = await api.get(url);
      console.log("🔗 Resposta da API tipo-epi específico:", response);
      const item = response.data;
      const tipoEPI = {
        id: item.id,
        nomeEquipamento: item.nomeEquipamento,
        numeroCa: item.numeroCa,
        numeroCA: item.numeroCa,
        // compatibility
        categoria: item.categoria,
        status: item.status || "ATIVO",
        vidaUtilDias: item.vidaUtilDias,
        validadePadrao: item.vidaUtilDias,
        // compatibility
        descricao: item.descricao || "",
        ativo: item.status === "ATIVO",
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        dataCriacao: item.createdAt,
        // compatibility
        dataAtualizacao: item.updatedAt || item.createdAt
        // compatibility
      };
      this.cache.set(cacheKey, tipoEPI);
      console.log("✅ Tipo EPI específico carregado do backend real");
      return tipoEPI;
    } catch (error) {
      console.error("❌ Erro ao buscar tipo EPI do backend:", error);
      throw new Error("Não foi possível buscar o tipo de EPI do backend");
    }
  }
  // ==================== COMANDOS ====================
  /**
   * Cria um novo tipo de EPI
   */
  async createTipoEPI(data) {
    console.log("➕ CatalogAdapter: Criando tipo EPI no backend real", data);
    try {
      const backendData = {
        nomeEquipamento: data.nomeEquipamento,
        numeroCa: data.numeroCa,
        categoria: data.categoria,
        vidaUtilDias: data.vidaUtilDias,
        descricao: data.descricao,
        status: "ATIVO"
      };
      const response = await api.post("/tipos-epi", backendData);
      console.log("🔗 Resposta da criação no backend:", response);
      const item = response.data;
      const newTipoEPI = {
        id: item.id,
        nomeEquipamento: item.nomeEquipamento,
        numeroCa: item.numeroCa,
        numeroCA: item.numeroCa,
        // compatibility
        categoria: item.categoria,
        status: item.status || "ATIVO",
        vidaUtilDias: item.vidaUtilDias,
        validadePadrao: item.vidaUtilDias,
        // compatibility
        descricao: item.descricao || "",
        ativo: item.status === "ATIVO",
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        dataCriacao: item.createdAt,
        // compatibility
        dataAtualizacao: item.updatedAt || item.createdAt
        // compatibility
      };
      this.cache.clear();
      console.log("✅ Tipo EPI criado com sucesso no backend:", newTipoEPI.id);
      return newTipoEPI;
    } catch (error) {
      console.error("❌ Erro ao criar tipo EPI no backend:", error);
      throw new Error("Não foi possível criar o tipo de EPI");
    }
  }
  /**
   * Atualiza um tipo de EPI
   */
  async updateTipoEPI(id, data) {
    console.log(
      "📝 CatalogAdapter: Atualizando tipo EPI no backend real",
      id,
      data
    );
    try {
      const backendData = {};
      if (data.nomeEquipamento)
        backendData.nomeEquipamento = data.nomeEquipamento;
      if (data.numeroCa) backendData.numeroCa = data.numeroCa;
      if (data.categoria) backendData.categoria = data.categoria;
      if (data.vidaUtilDias) backendData.vidaUtilDias = data.vidaUtilDias;
      if (data.descricao !== void 0) backendData.descricao = data.descricao;
      if (data.ativo !== void 0)
        backendData.status = data.ativo ? "ATIVO" : "DESCONTINUADO";
      const response = await api.put(`/tipos-epi/${id}`, backendData);
      console.log("🔗 Resposta da atualização no backend:", response);
      const item = response.data;
      const updatedTipoEPI = {
        id: item.id,
        nomeEquipamento: item.nomeEquipamento,
        numeroCa: item.numeroCa,
        numeroCA: item.numeroCa,
        // compatibility
        categoria: item.categoria,
        status: item.status || "ATIVO",
        vidaUtilDias: item.vidaUtilDias,
        validadePadrao: item.vidaUtilDias,
        // compatibility
        descricao: item.descricao || "",
        ativo: item.status === "ATIVO",
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        dataCriacao: item.createdAt,
        // compatibility
        dataAtualizacao: item.updatedAt || item.createdAt
        // compatibility
      };
      this.cache.delete(`tipo-epi-${id}`);
      this.cache.clear();
      console.log("✅ Tipo EPI atualizado com sucesso no backend");
      return updatedTipoEPI;
    } catch (error) {
      console.error("❌ Erro ao atualizar tipo EPI no backend:", error);
      throw new Error("Não foi possível atualizar o tipo de EPI");
    }
  }
  /**
   * Remove um tipo de EPI (soft delete)
   */
  async deleteTipoEPI(id) {
    console.log("🗑️ CatalogAdapter: Removendo tipo EPI no backend real", id);
    try {
      await this.updateTipoEPI(id, { ativo: false });
      console.log("✅ Tipo EPI removido com sucesso no backend");
    } catch (error) {
      console.error("❌ Erro ao remover tipo EPI no backend:", error);
      throw new Error("Não foi possível remover o tipo de EPI");
    }
  }
  // ==================== UTILITIES ====================
  /**
   * Limpa todo o cache
   */
  clearCache() {
    this.cache.clear();
    console.log("🗑️ Cache do catálogo limpo");
  }
  /**
   * Obtém opções únicas para filtros
   */
  async getFilterOptions() {
    try {
      const data = await this.getTiposEPI({ pageSize: 100 });
      if (data.data && data.data.length >= 100) {
        console.warn(
          "⚠️ Mais de 100 tipos de EPI encontrados. Filtros podem estar incompletos."
        );
      }
      const categorias = [...new Set(data.data.map((item) => item.categoria))].filter(Boolean).sort().map((cat) => ({ value: cat, label: cat }));
      console.log("✅ Opções de filtros carregadas:", {
        categorias: categorias.length
      });
      return { categorias };
    } catch (error) {
      console.error("❌ Erro ao carregar opções de filtros:", error);
      return { categorias: [] };
    }
  }
}
const catalogAdapter = new CatalogAdapter();
const CatalogTablePresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let statusBadgeColor;
  let statusText;
  let { items = [] } = $$props;
  let { loading = false } = $$props;
  let { error = null } = $$props;
  let { pagination } = $$props;
  let { filters } = $$props;
  let { filterOptions } = $$props;
  const dispatch = createEventDispatcher();
  const statusOptions = [
    { value: "todos", label: "Todos os Status" },
    { value: "ATIVO", label: "Ativo" },
    {
      value: "DESCONTINUADO",
      label: "Descontinuado"
    }
  ];
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  if ($$props.pagination === void 0 && $$bindings.pagination && pagination !== void 0) $$bindings.pagination(pagination);
  if ($$props.filters === void 0 && $$bindings.filters && filters !== void 0) $$bindings.filters(filters);
  if ($$props.filterOptions === void 0 && $$bindings.filterOptions && filterOptions !== void 0) $$bindings.filterOptions(filterOptions);
  statusBadgeColor = (ativo) => ativo ? "green" : "red";
  statusText = (ativo) => ativo ? "Ativo" : "Inativo";
  return `  ${$$result.head += `<!-- HEAD_svelte-3ni7bu_START -->${$$result.title = `<title>Catálogo de EPIs - DataLife EPI</title>`, ""}<!-- HEAD_svelte-3ni7bu_END -->`, ""} <div class="space-y-6"> <div class="flex items-center justify-between"><div data-svelte-h="svelte-1sna02h"><h1 class="text-xl font-medium text-gray-900 dark:text-white">Catálogo de EPIs</h1> <p class="text-sm text-gray-600 dark:text-gray-400">Gerencie os tipos de equipamentos de proteção individual</p></div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
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
        Novo EPI`;
      }
    }
  )}</div></div>  ${loading ? `${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}` : `${error ? `${validate_component(ErrorDisplay, "ErrorDisplay").$$render(
    $$result,
    {
      error,
      onRetry: () => dispatch("pageChange", pagination.currentPage)
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
      placeholder: "Buscar EPIs...",
      class: "pl-10 rounded-sm h-10 text-sm",
      value: filters.searchTerm
    },
    {},
    {}
  )}</div>  ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
    $$result,
    {
      options: filterOptions.categorias,
      value: filters.categoriaFilter,
      placeholder: "Categoria"
    },
    {},
    {}
  )}  ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
    $$result,
    {
      options: statusOptions,
      value: filters.statusFilter,
      placeholder: "Status"
    },
    {},
    {}
  )}  ${filters.hasActiveFilters ? `${validate_component(Button, "Button").$$render(
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
          return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Nome do Equipamento`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Número CA`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Categoria`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Validade Padrão`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Status`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Ações`;
            }
          })}`;
        }
      })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
        default: () => {
          return `${each(items, (epi) => {
            return `${validate_component(TableBodyRow, "TableBodyRow").$$render(
              $$result,
              {
                class: "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              },
              {},
              {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<div class="flex flex-col"><span class="font-medium text-gray-900 dark:text-white">${escape(epi.nomeEquipamento)}</span> ${epi.descricao ? `<span class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">${escape(epi.descricao)} </span>` : ``}</div> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<span class="font-mono text-sm">${escape(epi.numeroCa || epi.numeroCA)}</span> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<span class="text-sm">${escape(epi.categoria)}</span> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${epi.vidaUtilDias || epi.validadePadrao ? `<span class="text-sm">${escape(Math.round((epi.vidaUtilDias || epi.validadePadrao) / 30))} meses
                    </span>` : `<span class="text-sm text-gray-400" data-svelte-h="svelte-1s2hpp6">-</span>`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${epi.status ? `${validate_component(Badge, "Badge").$$render(
                        $$result,
                        {
                          color: epi.status === "ATIVO" ? "green" : "red",
                          class: "w-fit rounded-sm"
                        },
                        {},
                        {
                          default: () => {
                            return `${escape(epi.status === "ATIVO" ? "Ativo" : "Descontinuado")} `;
                          }
                        }
                      )}` : `${validate_component(Badge, "Badge").$$render(
                        $$result,
                        {
                          color: statusBadgeColor(epi.ativo),
                          class: "w-fit rounded-sm"
                        },
                        {},
                        {
                          default: () => {
                            return `${escape(statusText(epi.ativo))} `;
                          }
                        }
                      )}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<div class="flex space-x-1"><button class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700" title="Visualizar">${validate_component(EyeOutline, "EyeOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button> <button class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700" title="Editar">${validate_component(PenOutline, "PenOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button> <button class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700" title="Excluir">${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button></div> `;
                    }
                  })} `;
                }
              }
            )}`;
          })}`;
        }
      })}`;
    }
  })}</div>  ${pagination.totalPages > 1 ? `<div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700"><div class="text-sm text-gray-500 dark:text-gray-400">Mostrando ${escape(Math.min((pagination.currentPage - 1) * pagination.pageSize + 1, pagination.total))} a ${escape(Math.min(pagination.currentPage * pagination.pageSize, pagination.total))} de ${escape(pagination.total)} resultados</div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
    $$result,
    {
      color: "alternative",
      class: "rounded-sm",
      disabled: !pagination.hasPrev
    },
    {},
    {
      default: () => {
        return `Anterior`;
      }
    }
  )} <span class="flex items-center px-3 text-sm text-gray-500 dark:text-gray-400">Página ${escape(pagination.currentPage)} de ${escape(pagination.totalPages)}</span> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      color: "alternative",
      class: "rounded-sm",
      disabled: !pagination.hasNext
    },
    {},
    {
      default: () => {
        return `Próximo`;
      }
    }
  )}</div></div>` : ``}</div>` : ` ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
    default: () => {
      return `<div class="text-center py-12"><div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">${validate_component(SearchOutline, "SearchOutline").$$render($$result, { class: "w-8 h-8 text-gray-400" }, {}, {})}</div> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-19fe8vd">Nenhum EPI encontrado</h3> <p class="text-gray-500 dark:text-gray-400 mb-6">${escape(filters.hasActiveFilters ? "Tente ajustar os filtros ou termo de busca" : "Comece cadastrando um novo tipo de EPI")}</p> ${validate_component(Button, "Button").$$render(
        $$result,
        {
          size: "sm",
          color: "primary",
          class: "rounded-sm"
        },
        {},
        {
          default: () => {
            return `${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})} ${escape(!filters.hasActiveFilters ? "Primeiro EPI" : "Novo EPI")}`;
          }
        }
      )}</div>`;
    }
  })}`}`}`}</div>`;
});
const css = {
  code: '.drawer-epi{top:64px !important;height:calc(100vh - 64px) !important;max-width:940px !important;z-index:50 !important}[role="presentation"].fixed.top-0.start-0.z-50.w-full.h-full{top:64px !important;height:calc(100vh - 64px) !important}',
  map: `{"version":3,"file":"EPIDetailDrawer.svelte","sources":["EPIDetailDrawer.svelte"],"sourcesContent":["<!--\\n  EPI Detail Drawer - Componente \\"Burro\\" para visualização/edição de EPIs\\n  \\n  Seguindo o padrão estabelecido pelo FichaDetailPresenter:\\n  - Drawer lateral com largura máxima de 940px\\n  - Header padronizado com DrawerHeader\\n  - Tabs para organizar informações\\n  - Estados de loading e erro\\n  - Formulário inline para edição\\n-->\\n\\n<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport {\\n  Drawer,\\n  Button,\\n  Input,\\n  Textarea,\\n  Label,\\n  Select,\\n  Badge\\n} from \\"flowbite-svelte\\";\\nimport {\\n  FloppyDiskOutline,\\n  PenOutline,\\n  EyeOutline,\\n  ChartLineUpOutline,\\n  CheckCircleOutline\\n} from \\"flowbite-svelte-icons\\";\\nimport DrawerHeader from \\"$lib/components/common/DrawerHeader.svelte\\";\\nimport LoadingSpinner from \\"$lib/components/common/LoadingSpinner.svelte\\";\\nimport ErrorDisplay from \\"$lib/components/common/ErrorDisplay.svelte\\";\\nimport StatusBadge from \\"$lib/components/ui/StatusBadge.svelte\\";\\nimport { formatarData } from \\"$lib/utils/dateHelpers\\";\\nexport let open = false;\\nexport let mode = \\"view\\";\\nexport let epi = null;\\nexport let loading = false;\\nexport let error = null;\\nlet hidden = !open;\\nlet formData = {};\\nlet formErrors = {};\\nconst categoriaOptions = [\\n  { value: \\"EPI_CABECA\\", label: \\"EPI de Cabe\\\\xE7a\\", name: \\"EPI de Cabe\\\\xE7a\\" },\\n  { value: \\"EPI_OLHOS_FACE\\", label: \\"EPI de Olhos e Face\\", name: \\"EPI de Olhos e Face\\" },\\n  { value: \\"EPI_AUDITIVA\\", label: \\"EPI Auditiva\\", name: \\"EPI Auditiva\\" },\\n  { value: \\"EPI_RESPIRATORIA\\", label: \\"EPI Respirat\\\\xF3ria\\", name: \\"EPI Respirat\\\\xF3ria\\" },\\n  { value: \\"EPI_MAOS_BRACOS\\", label: \\"EPI de M\\\\xE3os e Bra\\\\xE7os\\", name: \\"EPI de M\\\\xE3os e Bra\\\\xE7os\\" },\\n  { value: \\"EPI_TRONCO\\", label: \\"EPI de Tronco\\", name: \\"EPI de Tronco\\" },\\n  { value: \\"EPI_MEMBROS_INFERIORES\\", label: \\"EPI de Membros Inferiores\\", name: \\"EPI de Membros Inferiores\\" },\\n  { value: \\"EPI_CORPO_INTEIRO\\", label: \\"EPI de Corpo Inteiro\\", name: \\"EPI de Corpo Inteiro\\" }\\n];\\nconst statusOptions = [\\n  { value: \\"ATIVO\\", label: \\"Ativo\\", name: \\"Ativo\\" },\\n  { value: \\"DESCONTINUADO\\", label: \\"Descontinuado\\", name: \\"Descontinuado\\" }\\n];\\n$: {\\n  hidden = !open;\\n}\\n$: if (epi || mode) {\\n  resetForm();\\n}\\n$: additionalInfo = epi ? [\\n  \`CA \${epi.numeroCa}\`,\\n  getCategoriaLabel(epi.categoria)\\n] : [];\\nfunction getCategoriaLabel(categoria) {\\n  return categoriaOptions.find((opt) => opt.value === categoria)?.label || categoria;\\n}\\nfunction resetForm() {\\n  if (mode === \\"create\\") {\\n    formData = {\\n      nomeEquipamento: \\"\\",\\n      numeroCa: \\"\\",\\n      categoria: \\"EPI_CABECA\\",\\n      status: \\"ATIVO\\",\\n      vidaUtilDias: 365,\\n      descricao: \\"\\"\\n    };\\n  } else if (epi) {\\n    formData = {\\n      nomeEquipamento: epi.nomeEquipamento,\\n      numeroCa: epi.numeroCa,\\n      categoria: epi.categoria,\\n      status: epi.status,\\n      vidaUtilDias: epi.vidaUtilDias || 365,\\n      descricao: epi.descricao || \\"\\"\\n    };\\n  }\\n  formErrors = {};\\n}\\nfunction validateForm() {\\n  formErrors = {};\\n  if (!formData.nomeEquipamento?.trim()) {\\n    formErrors.nomeEquipamento = \\"Nome do equipamento \\\\xE9 obrigat\\\\xF3rio\\";\\n  }\\n  if (!formData.numeroCa?.trim()) {\\n    formErrors.numeroCa = \\"N\\\\xFAmero CA \\\\xE9 obrigat\\\\xF3rio\\";\\n  } else if (!/^\\\\d+$/.test(formData.numeroCa.trim())) {\\n    formErrors.numeroCa = \\"N\\\\xFAmero CA deve conter apenas n\\\\xFAmeros\\";\\n  }\\n  if (!formData.categoria) {\\n    formErrors.categoria = \\"Categoria \\\\xE9 obrigat\\\\xF3ria\\";\\n  }\\n  if (!formData.status) {\\n    formErrors.status = \\"Status \\\\xE9 obrigat\\\\xF3rio\\";\\n  }\\n  if (formData.vidaUtilDias && (formData.vidaUtilDias < 1 || formData.vidaUtilDias > 3650)) {\\n    formErrors.vidaUtilDias = \\"Vida \\\\xFAtil deve estar entre 1 e 3650 dias\\";\\n  }\\n  return Object.keys(formErrors).length === 0;\\n}\\nconst dispatch = createEventDispatcher();\\nfunction handleClose() {\\n  dispatch(\\"close\\");\\n}\\nfunction handleEdit() {\\n  dispatch(\\"edit\\");\\n}\\nfunction handleSave() {\\n  if (validateForm()) {\\n    const saveData = {\\n      nomeEquipamento: formData.nomeEquipamento,\\n      numeroCa: formData.numeroCa,\\n      categoria: formData.categoria,\\n      vidaUtilDias: formData.vidaUtilDias,\\n      descricao: formData.descricao,\\n      ativo: formData.status === \\"ATIVO\\"\\n    };\\n    dispatch(\\"save\\", saveData);\\n  }\\n}\\nfunction handleCancel() {\\n  resetForm();\\n  if (mode === \\"create\\") {\\n    handleClose();\\n  } else {\\n    dispatch(\\"edit\\");\\n  }\\n}\\nlet lastHidden = hidden;\\n$: if (hidden !== lastHidden) {\\n  if (hidden && open) {\\n    dispatch(\\"close\\");\\n  }\\n  lastHidden = hidden;\\n}\\n<\/script>\\n\\n<style>\\n  :global(.drawer-epi) {\\n    top: 64px !important; /* Altura do header */\\n    height: calc(100vh - 64px) !important;\\n    max-width: 940px !important;\\n    z-index: 50 !important;\\n  }\\n  \\n  /* Ajustar backdrop para não cobrir header */\\n  :global([role=\\"presentation\\"].fixed.top-0.start-0.z-50.w-full.h-full) {\\n    top: 64px !important;\\n    height: calc(100vh - 64px) !important;\\n  }\\n</style>\\n\\n<!-- ==================== DRAWER PRINCIPAL ==================== -->\\n<Drawer \\n  bind:hidden\\n  placement=\\"right\\" \\n  width=\\"w-full max-w-[940px]\\"\\n  backdrop={true}\\n  activateClickOutside={true}\\n  bgOpacity=\\"bg-black/50\\"\\n  position=\\"fixed\\"\\n  id=\\"epi-detail-drawer\\"\\n  class=\\"drawer-epi\\"\\n>\\n  <!-- Header -->\\n  <DrawerHeader\\n    title={mode === 'create' ? 'Novo EPI' : (epi?.nomeEquipamento || 'EPI')}\\n    objectType=\\"EPI\\"\\n    iconName=\\"ShieldCheckOutline\\"\\n    status={epi?.status}\\n    statusType=\\"epi\\"\\n    {additionalInfo}\\n    primaryAction={mode === 'view' ? { text: 'Editar', icon: 'PenOutline' } : \\n                   mode === 'create' ? { text: 'Criar EPI', icon: 'FloppyDiskOutline' } :\\n                   { text: 'Salvar', icon: 'FloppyDiskOutline' }}\\n    secondaryAction={mode !== 'view' ? { text: 'Cancelar', icon: 'CloseOutline' } : null}\\n    on:close={handleClose}\\n    on:primaryAction={mode === 'view' ? handleEdit : handleSave}\\n    on:secondaryAction={handleCancel}\\n  />\\n\\n  <!-- Loading State -->\\n  {#if loading}\\n    <div class=\\"flex justify-center items-center py-12\\">\\n      <LoadingSpinner />\\n    </div>\\n  {:else if error}\\n    <ErrorDisplay error={error} />\\n  {:else}\\n\\n    <!-- ==================== CONTENT ==================== -->\\n    <div class=\\"p-6\\">\\n      \\n      <!-- Conteúdo Principal -->\\n        <div class=\\"space-y-6\\">\\n          \\n          {#if mode === 'view'}\\n            <!-- Modo Visualização -->\\n            <div class=\\"grid grid-cols-1 md:grid-cols-2 gap-6\\">\\n              \\n              <!-- Informações Básicas -->\\n              <div class=\\"space-y-4\\">\\n                <h3 class=\\"text-lg font-medium text-gray-900 dark:text-white\\">\\n                  Informações Básicas\\n                </h3>\\n                \\n                <div class=\\"space-y-3\\">\\n                  <div>\\n                    <Label class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                      Nome do Equipamento\\n                    </Label>\\n                    <p class=\\"mt-1 text-sm text-gray-900 dark:text-white\\">\\n                      {epi?.nomeEquipamento || 'N/A'}\\n                    </p>\\n                  </div>\\n                  \\n                  <div>\\n                    <Label class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                      Número CA\\n                    </Label>\\n                    <p class=\\"mt-1 text-sm text-gray-900 dark:text-white\\">\\n                      {epi?.numeroCa || 'N/A'}\\n                    </p>\\n                  </div>\\n                  \\n                  <div>\\n                    <Label class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                      Categoria\\n                    </Label>\\n                    <p class=\\"mt-1 text-sm text-gray-900 dark:text-white\\">\\n                      {getCategoriaLabel(epi?.categoria || '')}\\n                    </p>\\n                  </div>\\n                  \\n                  <div>\\n                    <Label class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                      Status\\n                    </Label>\\n                    <div class=\\"mt-1\\">\\n                      <StatusBadge status={epi?.status || 'ATIVO'} type=\\"epi\\" />\\n                    </div>\\n                  </div>\\n                </div>\\n              </div>\\n              \\n              <!-- Especificações -->\\n              <div class=\\"space-y-4\\">\\n                <h3 class=\\"text-lg font-medium text-gray-900 dark:text-white\\">\\n                  Especificações\\n                </h3>\\n                \\n                <div class=\\"space-y-3\\">\\n                  <div>\\n                    <Label class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                      Vida Útil\\n                    </Label>\\n                    <p class=\\"mt-1 text-sm text-gray-900 dark:text-white\\">\\n                      {epi?.vidaUtilDias || 'N/A'} dias\\n                    </p>\\n                  </div>\\n                  \\n                  <div>\\n                    <Label class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                      Data de Criação\\n                    </Label>\\n                    <p class=\\"mt-1 text-sm text-gray-900 dark:text-white\\">\\n                      {epi?.createdAt ? formatarData(epi.createdAt) : 'N/A'}\\n                    </p>\\n                  </div>\\n                  \\n                  {#if epi?.updatedAt && epi.updatedAt !== epi.createdAt}\\n                    <div>\\n                      <Label class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                        Última Atualização\\n                      </Label>\\n                      <p class=\\"mt-1 text-sm text-gray-900 dark:text-white\\">\\n                        {formatarData(epi.updatedAt)}\\n                      </p>\\n                    </div>\\n                  {/if}\\n                </div>\\n              </div>\\n            </div>\\n            \\n            <!-- Descrição -->\\n            {#if epi?.descricao}\\n              <div>\\n                <Label class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                  Descrição\\n                </Label>\\n                <p class=\\"mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap\\">\\n                  {epi.descricao}\\n                </p>\\n              </div>\\n            {/if}\\n            \\n          {:else}\\n            <!-- Modo Edição/Criação -->\\n            <div class=\\"space-y-6\\">\\n              <h3 class=\\"text-lg font-medium text-gray-900 dark:text-white\\">\\n                {mode === 'create' ? 'Novo EPI' : 'Editar EPI'}\\n              </h3>\\n              \\n              <div class=\\"grid grid-cols-1 md:grid-cols-2 gap-6\\">\\n                \\n                <!-- Nome do Equipamento -->\\n                <div class=\\"md:col-span-2\\">\\n                  <Label for=\\"nomeEquipamento\\" class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                    Nome do Equipamento *\\n                  </Label>\\n                  <Input\\n                    id=\\"nomeEquipamento\\"\\n                    bind:value={formData.nomeEquipamento}\\n                    placeholder=\\"Ex: Capacete de Segurança Classe A\\"\\n                    class=\\"mt-1 rounded-sm {formErrors.nomeEquipamento ? 'border-red-500' : ''}\\"\\n                  />\\n                  {#if formErrors.nomeEquipamento}\\n                    <p class=\\"mt-1 text-sm text-red-600\\">{formErrors.nomeEquipamento}</p>\\n                  {/if}\\n                </div>\\n                \\n                <!-- Número CA -->\\n                <div>\\n                  <Label for=\\"numeroCa\\" class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                    Número CA *\\n                  </Label>\\n                  <Input\\n                    id=\\"numeroCa\\"\\n                    bind:value={formData.numeroCa}\\n                    placeholder=\\"Ex: 12345\\"\\n                    class=\\"mt-1 rounded-sm {formErrors.numeroCa ? 'border-red-500' : ''}\\"\\n                  />\\n                  {#if formErrors.numeroCa}\\n                    <p class=\\"mt-1 text-sm text-red-600\\">{formErrors.numeroCa}</p>\\n                  {/if}\\n                </div>\\n                \\n                <!-- Categoria -->\\n                <div>\\n                  <Label for=\\"categoria\\" class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                    Categoria *\\n                  </Label>\\n                  <Select\\n                    id=\\"categoria\\"\\n                    bind:value={formData.categoria}\\n                    items={categoriaOptions}\\n                    class=\\"mt-1 rounded-sm {formErrors.categoria ? 'border-red-500' : ''}\\"\\n                  />\\n                  {#if formErrors.categoria}\\n                    <p class=\\"mt-1 text-sm text-red-600\\">{formErrors.categoria}</p>\\n                  {/if}\\n                </div>\\n                \\n                <!-- Status -->\\n                <div>\\n                  <Label for=\\"status\\" class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                    Status *\\n                  </Label>\\n                  <Select\\n                    id=\\"status\\"\\n                    bind:value={formData.status}\\n                    items={statusOptions}\\n                    class=\\"mt-1 rounded-sm {formErrors.status ? 'border-red-500' : ''}\\"\\n                  />\\n                  {#if formErrors.status}\\n                    <p class=\\"mt-1 text-sm text-red-600\\">{formErrors.status}</p>\\n                  {/if}\\n                </div>\\n                \\n                <!-- Vida Útil -->\\n                <div>\\n                  <Label for=\\"vidaUtilDias\\" class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                    Vida Útil (dias)\\n                  </Label>\\n                  <Input\\n                    id=\\"vidaUtilDias\\"\\n                    type=\\"number\\"\\n                    min=\\"1\\"\\n                    max=\\"3650\\"\\n                    bind:value={formData.vidaUtilDias}\\n                    placeholder=\\"365\\"\\n                    class=\\"mt-1 rounded-sm {formErrors.vidaUtilDias ? 'border-red-500' : ''}\\"\\n                  />\\n                  {#if formErrors.vidaUtilDias}\\n                    <p class=\\"mt-1 text-sm text-red-600\\">{formErrors.vidaUtilDias}</p>\\n                  {/if}\\n                </div>\\n                \\n                <!-- Descrição -->\\n                <div class=\\"md:col-span-2\\">\\n                  <Label for=\\"descricao\\" class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n                    Descrição\\n                  </Label>\\n                  <Textarea\\n                    id=\\"descricao\\"\\n                    bind:value={formData.descricao}\\n                    placeholder=\\"Descrição detalhada do equipamento...\\"\\n                    rows={4}\\n                    class=\\"mt-1 rounded-sm\\"\\n                  />\\n                </div>\\n              </div>\\n              \\n            </div>\\n          {/if}\\n        </div>\\n      \\n    </div>\\n  {/if}\\n</Drawer>"],"names":[],"mappings":"AAqJU,WAAa,CACnB,GAAG,CAAE,IAAI,CAAC,UAAU,CACpB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAAU,CACrC,SAAS,CAAE,KAAK,CAAC,UAAU,CAC3B,OAAO,CAAE,EAAE,CAAC,UACd,CAGQ,4DAA8D,CACpE,GAAG,CAAE,IAAI,CAAC,UAAU,CACpB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAC7B"}`
};
const EPIDetailDrawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let additionalInfo;
  let { open = false } = $$props;
  let { mode = "view" } = $$props;
  let { epi = null } = $$props;
  let { loading = false } = $$props;
  let { error = null } = $$props;
  let hidden = !open;
  let formData = {};
  let formErrors = {};
  const categoriaOptions = [
    {
      value: "EPI_CABECA",
      label: "EPI de Cabeça",
      name: "EPI de Cabeça"
    },
    {
      value: "EPI_OLHOS_FACE",
      label: "EPI de Olhos e Face",
      name: "EPI de Olhos e Face"
    },
    {
      value: "EPI_AUDITIVA",
      label: "EPI Auditiva",
      name: "EPI Auditiva"
    },
    {
      value: "EPI_RESPIRATORIA",
      label: "EPI Respiratória",
      name: "EPI Respiratória"
    },
    {
      value: "EPI_MAOS_BRACOS",
      label: "EPI de Mãos e Braços",
      name: "EPI de Mãos e Braços"
    },
    {
      value: "EPI_TRONCO",
      label: "EPI de Tronco",
      name: "EPI de Tronco"
    },
    {
      value: "EPI_MEMBROS_INFERIORES",
      label: "EPI de Membros Inferiores",
      name: "EPI de Membros Inferiores"
    },
    {
      value: "EPI_CORPO_INTEIRO",
      label: "EPI de Corpo Inteiro",
      name: "EPI de Corpo Inteiro"
    }
  ];
  const statusOptions = [
    {
      value: "ATIVO",
      label: "Ativo",
      name: "Ativo"
    },
    {
      value: "DESCONTINUADO",
      label: "Descontinuado",
      name: "Descontinuado"
    }
  ];
  function getCategoriaLabel(categoria) {
    return categoriaOptions.find((opt) => opt.value === categoria)?.label || categoria;
  }
  function resetForm() {
    if (mode === "create") {
      formData = {
        nomeEquipamento: "",
        numeroCa: "",
        categoria: "EPI_CABECA",
        status: "ATIVO",
        vidaUtilDias: 365,
        descricao: ""
      };
    } else if (epi) {
      formData = {
        nomeEquipamento: epi.nomeEquipamento,
        numeroCa: epi.numeroCa,
        categoria: epi.categoria,
        status: epi.status,
        vidaUtilDias: epi.vidaUtilDias || 365,
        descricao: epi.descricao || ""
      };
    }
    formErrors = {};
  }
  const dispatch = createEventDispatcher();
  let lastHidden = hidden;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
  if ($$props.epi === void 0 && $$bindings.epi && epi !== void 0) $$bindings.epi(epi);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        hidden = !open;
      }
    }
    {
      if (epi || mode) {
        resetForm();
      }
    }
    additionalInfo = epi ? [`CA ${epi.numeroCa}`, getCategoriaLabel(epi.categoria)] : [];
    {
      if (hidden !== lastHidden) {
        if (hidden && open) {
          dispatch("close");
        }
        lastHidden = hidden;
      }
    }
    $$rendered = `    ${validate_component(Drawer, "Drawer").$$render(
      $$result,
      {
        placement: "right",
        width: "w-full max-w-[940px]",
        backdrop: true,
        activateClickOutside: true,
        bgOpacity: "bg-black/50",
        position: "fixed",
        id: "epi-detail-drawer",
        class: "drawer-epi",
        hidden
      },
      {
        hidden: ($$value) => {
          hidden = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return ` ${validate_component(DrawerHeader, "DrawerHeader").$$render(
            $$result,
            {
              title: mode === "create" ? "Novo EPI" : epi?.nomeEquipamento || "EPI",
              objectType: "EPI",
              iconName: "ShieldCheckOutline",
              status: epi?.status,
              statusType: "epi",
              additionalInfo,
              primaryAction: mode === "view" ? { text: "Editar", icon: "PenOutline" } : mode === "create" ? {
                text: "Criar EPI",
                icon: "FloppyDiskOutline"
              } : {
                text: "Salvar",
                icon: "FloppyDiskOutline"
              },
              secondaryAction: mode !== "view" ? { text: "Cancelar", icon: "CloseOutline" } : null
            },
            {},
            {}
          )}  ${loading ? `<div class="flex justify-center items-center py-12">${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}</div>` : `${error ? `${validate_component(ErrorDisplay, "ErrorDisplay").$$render($$result, { error }, {}, {})}` : ` <div class="p-6"> <div class="space-y-6">${mode === "view" ? ` <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-5royo5">Informações Básicas</h3> <div class="space-y-3"><div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Nome do Equipamento`;
              }
            }
          )} <p class="mt-1 text-sm text-gray-900 dark:text-white">${escape(epi?.nomeEquipamento || "N/A")}</p></div> <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Número CA`;
              }
            }
          )} <p class="mt-1 text-sm text-gray-900 dark:text-white">${escape(epi?.numeroCa || "N/A")}</p></div> <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Categoria`;
              }
            }
          )} <p class="mt-1 text-sm text-gray-900 dark:text-white">${escape(getCategoriaLabel(epi?.categoria || ""))}</p></div> <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Status`;
              }
            }
          )} <div class="mt-1">${validate_component(StatusBadge, "StatusBadge").$$render(
            $$result,
            {
              status: epi?.status || "ATIVO",
              type: "epi"
            },
            {},
            {}
          )}</div></div></div></div>  <div class="space-y-4"><h3 class="text-lg font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-11p6gtn">Especificações</h3> <div class="space-y-3"><div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Vida Útil`;
              }
            }
          )} <p class="mt-1 text-sm text-gray-900 dark:text-white">${escape(epi?.vidaUtilDias || "N/A")} dias</p></div> <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Data de Criação`;
              }
            }
          )} <p class="mt-1 text-sm text-gray-900 dark:text-white">${escape(epi?.createdAt ? formatarData(epi.createdAt) : "N/A")}</p></div> ${epi?.updatedAt && epi.updatedAt !== epi.createdAt ? `<div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Última Atualização`;
              }
            }
          )} <p class="mt-1 text-sm text-gray-900 dark:text-white">${escape(formatarData(epi.updatedAt))}</p></div>` : ``}</div></div></div>  ${epi?.descricao ? `<div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Descrição`;
              }
            }
          )} <p class="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap">${escape(epi.descricao)}</p></div>` : ``}` : ` <div class="space-y-6"><h3 class="text-lg font-medium text-gray-900 dark:text-white">${escape(mode === "create" ? "Novo EPI" : "Editar EPI")}</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="md:col-span-2">${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "nomeEquipamento",
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Nome do Equipamento *`;
              }
            }
          )} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "nomeEquipamento",
              placeholder: "Ex: Capacete de Segurança Classe A",
              class: "mt-1 rounded-sm " + (formErrors.nomeEquipamento ? "border-red-500" : ""),
              value: formData.nomeEquipamento
            },
            {
              value: ($$value) => {
                formData.nomeEquipamento = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${formErrors.nomeEquipamento ? `<p class="mt-1 text-sm text-red-600">${escape(formErrors.nomeEquipamento)}</p>` : ``}</div>  <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "numeroCa",
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Número CA *`;
              }
            }
          )} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "numeroCa",
              placeholder: "Ex: 12345",
              class: "mt-1 rounded-sm " + (formErrors.numeroCa ? "border-red-500" : ""),
              value: formData.numeroCa
            },
            {
              value: ($$value) => {
                formData.numeroCa = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${formErrors.numeroCa ? `<p class="mt-1 text-sm text-red-600">${escape(formErrors.numeroCa)}</p>` : ``}</div>  <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "categoria",
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Categoria *`;
              }
            }
          )} ${validate_component(Select, "Select").$$render(
            $$result,
            {
              id: "categoria",
              items: categoriaOptions,
              class: "mt-1 rounded-sm " + (formErrors.categoria ? "border-red-500" : ""),
              value: formData.categoria
            },
            {
              value: ($$value) => {
                formData.categoria = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${formErrors.categoria ? `<p class="mt-1 text-sm text-red-600">${escape(formErrors.categoria)}</p>` : ``}</div>  <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "status",
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Status *`;
              }
            }
          )} ${validate_component(Select, "Select").$$render(
            $$result,
            {
              id: "status",
              items: statusOptions,
              class: "mt-1 rounded-sm " + (formErrors.status ? "border-red-500" : ""),
              value: formData.status
            },
            {
              value: ($$value) => {
                formData.status = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${formErrors.status ? `<p class="mt-1 text-sm text-red-600">${escape(formErrors.status)}</p>` : ``}</div>  <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "vidaUtilDias",
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Vida Útil (dias)`;
              }
            }
          )} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "vidaUtilDias",
              type: "number",
              min: "1",
              max: "3650",
              placeholder: "365",
              class: "mt-1 rounded-sm " + (formErrors.vidaUtilDias ? "border-red-500" : ""),
              value: formData.vidaUtilDias
            },
            {
              value: ($$value) => {
                formData.vidaUtilDias = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${formErrors.vidaUtilDias ? `<p class="mt-1 text-sm text-red-600">${escape(formErrors.vidaUtilDias)}</p>` : ``}</div>  <div class="md:col-span-2">${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "descricao",
              class: "text-sm font-medium text-gray-700 dark:text-gray-300"
            },
            {},
            {
              default: () => {
                return `Descrição`;
              }
            }
          )} ${validate_component(Textarea, "Textarea").$$render(
            $$result,
            {
              id: "descricao",
              placeholder: "Descrição detalhada do equipamento...",
              rows: 4,
              class: "mt-1 rounded-sm",
              value: formData.descricao
            },
            {
              value: ($$value) => {
                formData.descricao = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div></div></div>`}</div></div>`}`}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const CatalogContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categoriaOptions;
  let hasActiveFilters;
  let presentationData;
  let $catalogStore, $$unsubscribe_catalogStore;
  let { initialPageSize = 10 } = $$props;
  const autoRefresh = false;
  createEventDispatcher();
  const catalogStore = createPaginatedStore((params) => catalogAdapter.getTiposEPI(params), {
    initialPageSize,
    enableCache: true,
    cacheTimeout: 5 * 60 * 1e3,
    // 5 minutos
    debounceDelay: 300
  });
  $$unsubscribe_catalogStore = subscribe(catalogStore, (value) => $catalogStore = value);
  let showEPIDrawer = false;
  let drawerMode = "view";
  let selectedEPI = null;
  let epiDrawerLoading = false;
  onDestroy(() => {
  });
  let searchTerm = "";
  let categoriaFilter = "todas";
  let statusFilter = "todos";
  if ($$props.initialPageSize === void 0 && $$bindings.initialPageSize && initialPageSize !== void 0) $$bindings.initialPageSize(initialPageSize);
  if ($$props.autoRefresh === void 0 && $$bindings.autoRefresh && autoRefresh !== void 0) $$bindings.autoRefresh(autoRefresh);
  categoriaOptions = [
    {
      value: "todas",
      label: "Todas as Categorias"
    },
    {
      value: "EPI_CABECA",
      label: "EPI de Cabeça"
    },
    {
      value: "EPI_OLHOS_FACE",
      label: "EPI de Olhos e Face"
    },
    {
      value: "EPI_AUDITIVA",
      label: "EPI Auditiva"
    },
    {
      value: "EPI_RESPIRATORIA",
      label: "EPI Respiratória"
    },
    {
      value: "EPI_MAOS_BRACOS",
      label: "EPI de Mãos e Braços"
    },
    {
      value: "EPI_TRONCO",
      label: "EPI de Tronco"
    },
    {
      value: "EPI_MEMBROS_INFERIORES",
      label: "EPI de Membros Inferiores"
    },
    {
      value: "EPI_CORPO_INTEIRO",
      label: "EPI de Corpo Inteiro"
    }
  ];
  hasActiveFilters = statusFilter !== "todos";
  presentationData = {
    items: $catalogStore.items,
    loading: $catalogStore.loading,
    error: $catalogStore.error,
    pagination: {
      currentPage: $catalogStore.page,
      totalPages: $catalogStore.totalPages,
      pageSize: $catalogStore.pageSize,
      total: $catalogStore.total,
      hasNext: catalogStore.hasNext(),
      hasPrev: catalogStore.hasPrev()
    },
    filters: {
      searchTerm,
      categoriaFilter,
      statusFilter,
      hasActiveFilters
    },
    filterOptions: { categorias: categoriaOptions }
  };
  $$unsubscribe_catalogStore();
  return `   ${validate_component(CatalogTablePresenter, "CatalogTablePresenter").$$render(
    $$result,
    {
      items: presentationData.items,
      loading: presentationData.loading,
      error: presentationData.error,
      pagination: presentationData.pagination,
      filters: presentationData.filters,
      filterOptions: presentationData.filterOptions
    },
    {},
    {}
  )}  ${validate_component(EPIDetailDrawer, "EPIDetailDrawer").$$render(
    $$result,
    {
      open: showEPIDrawer,
      mode: drawerMode,
      epi: selectedEPI,
      loading: epiDrawerLoading
    },
    {},
    {}
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` ${validate_component(CatalogContainer, "CatalogContainer").$$render($$result, { initialPageSize: 10, autoRefresh: false }, {}, {})}`;
});
export {
  Page as default
};
