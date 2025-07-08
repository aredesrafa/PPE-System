import { c as create_ssr_component, i as createEventDispatcher, v as validate_component, h as escape, l as each, k as subscribe } from "../../../chunks/ssr.js";
import { f as fichaQueryAdapter } from "../../../chunks/fichaQueryAdapter.js";
import { L as LoadingSpinner, E as ErrorDisplay, R as RefreshOutline, T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, f as createPaginatedStore } from "../../../chunks/ErrorDisplay.js";
import { I as Input } from "../../../chunks/modalStore.js";
import { a as Button, B as Badge } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { C as Checkbox } from "../../../chunks/Checkbox.js";
import { E as EyeOutline } from "../../../chunks/DrawerHeader.svelte_svelte_type_style_lang.js";
import { P as PlusOutline } from "../../../chunks/PlusOutline.js";
import { S as SearchOutline, a as SearchableDropdown } from "../../../chunks/SearchableDropdown.js";
const FichasTablePresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items = [] } = $$props;
  let { loading = false } = $$props;
  let { error = null } = $$props;
  let { pagination } = $$props;
  let { filters } = $$props;
  let { filterOptions } = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  if ($$props.pagination === void 0 && $$bindings.pagination && pagination !== void 0) $$bindings.pagination(pagination);
  if ($$props.filters === void 0 && $$bindings.filters && filters !== void 0) $$bindings.filters(filters);
  if ($$props.filterOptions === void 0 && $$bindings.filterOptions && filterOptions !== void 0) $$bindings.filterOptions(filterOptions);
  return `  ${$$result.head += `<!-- HEAD_svelte-161hi6l_START -->${$$result.title = `<title>Fichas de EPI - DataLife EPI</title>`, ""}<!-- HEAD_svelte-161hi6l_END -->`, ""} <div class="space-y-6"> <div class="flex items-center justify-between"><div data-svelte-h="svelte-pifbsf"><h1 class="text-xl font-medium text-gray-900 dark:text-white">Fichas de EPI</h1> <p class="text-sm text-gray-600 dark:text-gray-400">Gerencie as fichas individuais de equipamentos de proteção</p></div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
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
        Nova Ficha`;
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
  )}` : `${items.length > 0 ? ` <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"> <div class="p-4 border-b border-gray-200 dark:border-gray-700"><div class="grid grid-cols-1 md:grid-cols-5 gap-4"> <div class="relative">${validate_component(SearchOutline, "SearchOutline").$$render(
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
      placeholder: "Buscar colaborador...",
      class: "pl-10 rounded-sm h-10 text-sm",
      value: filters.searchTerm
    },
    {},
    {}
  )}</div>  ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
    $$result,
    {
      options: filterOptions.empresas,
      value: filters.empresaFilter,
      placeholder: "Empresa"
    },
    {},
    {}
  )}  ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
    $$result,
    {
      options: filterOptions.cargos,
      value: filters.cargoFilter,
      placeholder: "Cargo"
    },
    {},
    {}
  )}  <div class="flex items-center">${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: filters.devolucaoPendente }, {}, {
    default: () => {
      return `Pendentes devolução`;
    }
  })}</div>  ${filters.hasActiveFilters ? `${validate_component(Button, "Button").$$render(
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
  )}` : ` <div></div>`}</div></div>  <div class="min-w-[680px] overflow-x-auto">${validate_component(Table, "Table").$$render($$result, { hoverable: true }, {}, {
    default: () => {
      return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Colaborador`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Empresa`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `EPIs Ativos`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Ações`;
            }
          })}`;
        }
      })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
        default: () => {
          return `${each(items, (ficha) => {
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
                      return `<div class="flex flex-col"><span class="font-medium text-gray-900 dark:text-white">${escape(ficha.colaborador.nome)}</span> <span class="text-sm text-gray-500 dark:text-gray-400">${escape(ficha.colaborador.cpf || "CPF não informado")} </span></div> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<div><span class="font-medium text-gray-900 dark:text-white">${escape(ficha.colaborador.empresa)}</span> ${ficha.contratada ? `<div class="text-sm text-gray-500 dark:text-gray-400">${escape(ficha.contratada.nome)} </div>` : ``}</div> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<div class="flex flex-wrap gap-1">${validate_component(Badge, "Badge").$$render($$result, { color: "blue", class: "w-fit rounded-sm" }, {}, {
                        default: () => {
                          return `${escape(ficha.episInfo?.totalEpisAtivos || ficha.totalEpisAtivos || 0)} EPIs
                    `;
                        }
                      })} ${(ficha.episInfo?.episExpirados || ficha.totalEpisVencidos) && (ficha.episInfo?.episExpirados > 0 || ficha.totalEpisVencidos > 0) ? `${validate_component(Badge, "Badge").$$render($$result, { color: "red", class: "w-fit rounded-sm" }, {}, {
                        default: () => {
                          return `${escape(ficha.episInfo?.episExpirados || ficha.totalEpisVencidos)} vencido(s)
                      `;
                        }
                      })}` : ``}</div> ${ficha.episInfo?.tiposEpisAtivos && ficha.episInfo.tiposEpisAtivos.length > 0 ? `<div class="text-xs text-gray-500 dark:text-gray-400 mt-1">${escape(ficha.episInfo.tiposEpisAtivos.slice(0, 2).map((tipo) => `${tipo.quantidade}x ${tipo.tipoEpiNome}`).join(", "))} ${ficha.episInfo.tiposEpisAtivos.length > 2 ? `<span>... +${escape(ficha.episInfo.tiposEpisAtivos.length - 2)}</span>` : ``} </div>` : ``} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<div class="flex space-x-1"><button class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700" title="Ver Detalhes">${validate_component(EyeOutline, "EyeOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button></div> `;
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
      return `<div class="text-center py-12"><div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">${validate_component(SearchOutline, "SearchOutline").$$render($$result, { class: "w-8 h-8 text-gray-400" }, {}, {})}</div> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-qm1del">Nenhuma ficha encontrada</h3> <p class="text-gray-500 dark:text-gray-400 mb-6">${escape(filters.hasActiveFilters ? "Tente ajustar os filtros ou termo de busca" : "Comece cadastrando uma nova ficha de EPI")}</p> ${validate_component(Button, "Button").$$render(
        $$result,
        {
          size: "sm",
          color: "primary",
          class: "rounded-sm"
        },
        {},
        {
          default: () => {
            return `${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})} ${escape(!filters.hasActiveFilters ? "Primeira Ficha" : "Nova Ficha")}`;
          }
        }
      )}</div>`;
    }
  })}`}`}`}</div>`;
});
const FichasContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let empresaOptions;
  let cargoOptions;
  let hasActiveFilters;
  let presentationData;
  let $fichasStore, $$unsubscribe_fichasStore;
  let { initialPageSize = 10 } = $$props;
  const autoRefresh = false;
  const refreshInterval = 3e4;
  const fichasStore = createPaginatedStore(
    (params) => fichaQueryAdapter.getFichasWithColaboradores({
      page: params.page || 1,
      limit: params.limit || initialPageSize,
      searchTerm: params.search || void 0,
      empresaFilter: params.empresa !== "todas" ? params.empresa : void 0,
      cargoFilter: params.cargo !== "todos" ? params.cargo : void 0,
      statusFilter: params.status !== "todos" ? params.status : void 0,
      devolucaoPendente: !!params.devolucaoPendente
    }).then((response) => ({
      data: response.fichas,
      total: response.total,
      page: response.page || params.page || 1,
      pageSize: response.pageSize || params.limit || initialPageSize,
      totalPages: Math.ceil(response.total / (params.limit || initialPageSize))
    })),
    { initialPageSize }
  );
  $$unsubscribe_fichasStore = subscribe(fichasStore, (value) => $fichasStore = value);
  let filters = {
    empresa: "todas",
    cargo: "todos",
    devolucaoPendente: false
  };
  let searchTerm = "";
  if ($$props.initialPageSize === void 0 && $$bindings.initialPageSize && initialPageSize !== void 0) $$bindings.initialPageSize(initialPageSize);
  if ($$props.autoRefresh === void 0 && $$bindings.autoRefresh && autoRefresh !== void 0) $$bindings.autoRefresh(autoRefresh);
  if ($$props.refreshInterval === void 0 && $$bindings.refreshInterval && refreshInterval !== void 0) $$bindings.refreshInterval(refreshInterval);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    empresaOptions = [
      {
        value: "todas",
        label: "Todas as Empresas"
      }
    ];
    cargoOptions = [{ value: "todos", label: "Todos os Cargos" }];
    hasActiveFilters = filters.devolucaoPendente;
    presentationData = {
      items: $fichasStore.items || [],
      loading: $fichasStore.loading,
      error: $fichasStore.error,
      pagination: {
        currentPage: $fichasStore.page,
        totalPages: $fichasStore.totalPages,
        pageSize: $fichasStore.pageSize,
        total: $fichasStore.total,
        hasNext: fichasStore.hasNext(),
        hasPrev: fichasStore.hasPrev()
      },
      filters: {
        searchTerm,
        empresaFilter: filters.empresa,
        cargoFilter: filters.cargo,
        devolucaoPendente: filters.devolucaoPendente,
        hasActiveFilters
      },
      filterOptions: {
        empresas: empresaOptions,
        cargos: cargoOptions
      }
    };
    $$rendered = `   ${validate_component(FichasTablePresenter, "FichasTablePresenter").$$render(
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
    )}  ${``}  ${``}`;
  } while (!$$settled);
  $$unsubscribe_fichasStore();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `  ${$$result.head += `<!-- HEAD_svelte-161hi6l_START -->${$$result.title = `<title>Fichas de EPI - DataLife EPI</title>`, ""}<!-- HEAD_svelte-161hi6l_END -->`, ""}  ${validate_component(FichasContainer, "FichasContainer").$$render($$result, { initialPageSize: 10, autoRefresh: false }, {}, {})}`;
});
export {
  Page as default
};
