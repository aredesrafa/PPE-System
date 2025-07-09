import { c as create_ssr_component, a as compute_rest_props, j as getContext, d as spread, g as add_attribute, h as escape, f as escape_attribute_value, e as escape_object, i as createEventDispatcher, v as validate_component, l as each, k as subscribe } from "../../../../chunks/ssr.js";
import { R as RefreshOutline, L as LoadingSpinner, E as ErrorDisplay, T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, f as createPaginatedStore } from "../../../../chunks/ErrorDisplay.js";
import { a as Button, B as Badge, b as api } from "../../../../chunks/Button.js";
import { C as Card } from "../../../../chunks/Card.js";
import { L as Label } from "../../../../chunks/Label.js";
import { I as Input } from "../../../../chunks/modalStore.js";
import { S as Select, T as TrashBinOutline } from "../../../../chunks/TrashBinOutline.js";
import { twMerge } from "tailwind-merge";
import { f as formatarData } from "../../../../chunks/dateHelpers.js";
import { f as fichaQueryAdapter } from "../../../../chunks/fichaQueryAdapter.js";
const DownloadOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "download outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"></path></svg>`} `;
});
function truncateId(id) {
  return id.length > 8 ? id.substring(0, 8) + "..." : id;
}
function getTipoMovimentacaoColor(tipo) {
  if (!tipo || typeof tipo !== "string") {
    return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
  if (tipo.startsWith("ESTORNO_")) {
    return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
  }
  if (tipo.startsWith("ENTRADA_") || tipo === "AJUSTE_POSITIVO") {
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }
  if (tipo.startsWith("SAIDA_") || tipo === "AJUSTE_NEGATIVO") {
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  }
  return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
}
const AuditoriaTablePresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let startIndex;
  let endIndex;
  let hasFiltersApplied;
  let { items = [] } = $$props;
  let { loading = false } = $$props;
  let { error = null } = $$props;
  let { pagination } = $$props;
  let { filters = {} } = $$props;
  let { almoxarifados = [] } = $$props;
  let { tiposEpi = [] } = $$props;
  let { usuarios = [] } = $$props;
  const dispatch = createEventDispatcher();
  let itemsPerPageOptions = [
    { value: 10, label: "10 por página" },
    { value: 25, label: "25 por página" },
    { value: 50, label: "50 por página" },
    { value: 100, label: "100 por página" }
  ];
  let tiposMovimentacao = [
    { value: "", label: "Todos os tipos" },
    // Movimentações Diretas
    {
      value: "ENTRADA_NOTA",
      label: "Entrada por Nota"
    },
    {
      value: "SAIDA_ENTREGA",
      label: "Entrega a Colaborador"
    },
    {
      value: "ENTRADA_DEVOLUCAO",
      label: "Devolução"
    },
    {
      value: "SAIDA_TRANSFERENCIA",
      label: "Transferência de Saída"
    },
    {
      value: "ENTRADA_TRANSFERENCIA",
      label: "Transferência de Entrada"
    },
    {
      value: "SAIDA_DESCARTE",
      label: "Descarte"
    },
    {
      value: "AJUSTE_POSITIVO",
      label: "Ajuste (+)"
    },
    {
      value: "AJUSTE_NEGATIVO",
      label: "Ajuste (-)"
    },
    // Movimentações de Estorno
    {
      value: "ESTORNO_ENTRADA_NOTA",
      label: "Estorno de Entrada"
    },
    {
      value: "ESTORNO_SAIDA_ENTREGA",
      label: "Estorno de Entrega"
    },
    {
      value: "ESTORNO_ENTRADA_DEVOLUCAO",
      label: "Estorno de Devolução"
    },
    {
      value: "ESTORNO_SAIDA_DESCARTE",
      label: "Estorno de Descarte"
    },
    {
      value: "ESTORNO_SAIDA_TRANSFERENCIA",
      label: "Estorno de Transferência de Saída"
    },
    {
      value: "ESTORNO_ENTRADA_TRANSFERENCIA",
      label: "Estorno de Transferência de Entrada"
    },
    {
      value: "ESTORNO_AJUSTE_POSITIVO",
      label: "Estorno de Ajuste Positivo"
    },
    {
      value: "ESTORNO_AJUSTE_NEGATIVO",
      label: "Estorno de Ajuste Negativo"
    }
  ];
  function formatTipoMovimentacao(tipo) {
    if (!tipo || typeof tipo !== "string") {
      return "Tipo Desconhecido";
    }
    const tipoFormatado = tiposMovimentacao.find((t) => t.value === tipo);
    if (tipoFormatado) {
      return tipoFormatado.label;
    }
    return tipo.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  }
  function generatePageNumbers() {
    const totalPages = pagination.totalPages;
    const currentPage = pagination.page;
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  if ($$props.pagination === void 0 && $$bindings.pagination && pagination !== void 0) $$bindings.pagination(pagination);
  if ($$props.filters === void 0 && $$bindings.filters && filters !== void 0) $$bindings.filters(filters);
  if ($$props.almoxarifados === void 0 && $$bindings.almoxarifados && almoxarifados !== void 0) $$bindings.almoxarifados(almoxarifados);
  if ($$props.tiposEpi === void 0 && $$bindings.tiposEpi && tiposEpi !== void 0) $$bindings.tiposEpi(tiposEpi);
  if ($$props.usuarios === void 0 && $$bindings.usuarios && usuarios !== void 0) $$bindings.usuarios(usuarios);
  startIndex = (pagination.page - 1) * pagination.pageSize + 1;
  endIndex = Math.min(pagination.page * pagination.pageSize, pagination.total);
  hasFiltersApplied = Object.values(filters).some((value) => value !== null && value !== void 0 && value !== "");
  return `   <div class="space-y-6"> <div class="flex items-center justify-between"><div data-svelte-h="svelte-1toa5dk"><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Auditoria de Movimentações</h1> <p class="text-gray-600 dark:text-gray-400 mt-1">Visualize e audite todas as movimentações de estoque com rastreabilidade completa</p></div> <div class="flex items-center space-x-3">${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "alternative",
      class: "rounded-sm",
      disabled: loading
    },
    {},
    {
      default: () => {
        return `${validate_component(RefreshOutline, "RefreshOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
        Atualizar`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "primary",
      class: "rounded-sm",
      disabled: loading
    },
    {},
    {
      default: () => {
        return `${validate_component(DownloadOutline, "DownloadOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
        Exportar`;
      }
    }
  )}</div></div>  ${validate_component(Card, "Card").$$render($$result, { class: "p-4 rounded-sm !max-w-none" }, {}, {
    default: () => {
      return `<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-6"> <div>${validate_component(Label, "Label").$$render(
        $$result,
        {
          for: "filtro-almoxarifado",
          class: "mb-2"
        },
        {},
        {
          default: () => {
            return `Almoxarifado`;
          }
        }
      )} ${validate_component(Select, "Select").$$render(
        $$result,
        {
          id: "filtro-almoxarifado",
          value: filters.almoxarifadoId || "",
          size: "sm",
          class: "rounded-sm"
        },
        {},
        {
          default: () => {
            return `<option value="" data-svelte-h="svelte-16paryl">Todos os almoxarifados</option> ${each(almoxarifados, (almoxarifado) => {
              return `<option${add_attribute("value", almoxarifado.id, 0)}>${escape(almoxarifado.nome)}</option>`;
            })}`;
          }
        }
      )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "filtro-tipo-epi", class: "mb-2" }, {}, {
        default: () => {
          return `Tipo EPI`;
        }
      })} ${validate_component(Select, "Select").$$render(
        $$result,
        {
          id: "filtro-tipo-epi",
          value: filters.tipoEpiId || "",
          size: "sm",
          class: "rounded-sm"
        },
        {},
        {
          default: () => {
            return `<option value="" data-svelte-h="svelte-145e9py">Todos os EPIs</option> ${each(tiposEpi, (tipoEpi) => {
              return `<option${add_attribute("value", tipoEpi.id, 0)}>${escape(tipoEpi.nomeEquipamento)} (CA ${escape(tipoEpi.numeroCA)})</option>`;
            })}`;
          }
        }
      )}</div>  <div>${validate_component(Label, "Label").$$render(
        $$result,
        {
          for: "filtro-tipo-movimentacao",
          class: "mb-2"
        },
        {},
        {
          default: () => {
            return `Tipo Movimentação`;
          }
        }
      )} ${validate_component(Select, "Select").$$render(
        $$result,
        {
          id: "filtro-tipo-movimentacao",
          value: filters.tipoMovimentacao || "",
          size: "sm",
          class: "rounded-sm"
        },
        {},
        {
          default: () => {
            return `${each(tiposMovimentacao, (tipo) => {
              return `<option${add_attribute("value", tipo.value, 0)}>${escape(tipo.label)}</option>`;
            })}`;
          }
        }
      )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "filtro-usuario", class: "mb-2" }, {}, {
        default: () => {
          return `Responsável`;
        }
      })} ${validate_component(Select, "Select").$$render(
        $$result,
        {
          id: "filtro-usuario",
          value: filters.usuarioId || "",
          size: "sm",
          class: "rounded-sm"
        },
        {},
        {
          default: () => {
            return `<option value="" data-svelte-h="svelte-ynbsva">Todos os usuários</option> ${each(usuarios, (usuario) => {
              return `<option${add_attribute("value", usuario.id, 0)}>${escape(usuario.nome)}</option>`;
            })}`;
          }
        }
      )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "filtro-data-inicio", class: "mb-2" }, {}, {
        default: () => {
          return `Data Início`;
        }
      })} ${validate_component(Input, "Input").$$render(
        $$result,
        {
          id: "filtro-data-inicio",
          type: "date",
          value: filters.dataInicio || "",
          size: "sm",
          class: "rounded-sm"
        },
        {},
        {}
      )}</div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "filtro-data-fim", class: "mb-2" }, {}, {
        default: () => {
          return `Data Fim`;
        }
      })} ${validate_component(Input, "Input").$$render(
        $$result,
        {
          id: "filtro-data-fim",
          type: "date",
          value: filters.dataFim || "",
          size: "sm",
          class: "rounded-sm"
        },
        {},
        {}
      )}</div></div>  <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"><div class="text-sm text-gray-600 dark:text-gray-400"><span class="font-medium">${escape(pagination.total)}</span> movimentação(ões) encontrada(s)
        ${hasFiltersApplied ? `<span class="text-blue-600 dark:text-blue-400" data-svelte-h="svelte-1dconp1">com filtros aplicados</span>` : ``}</div> ${hasFiltersApplied ? `${validate_component(Button, "Button").$$render(
        $$result,
        {
          size: "sm",
          color: "alternative",
          class: "rounded-sm"
        },
        {},
        {
          default: () => {
            return `${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
          Limpar Filtros`;
          }
        }
      )}` : ``}</div>`;
    }
  })}  ${loading ? `${validate_component(Card, "Card").$$render($$result, { class: "rounded-sm !max-w-none" }, {}, {
    default: () => {
      return `<div class="flex items-center justify-center py-12">${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}</div>`;
    }
  })}` : `${error ? `${validate_component(ErrorDisplay, "ErrorDisplay").$$render(
    $$result,
    {
      error,
      onRetry: () => dispatch("refresh")
    },
    {},
    {}
  )}` : `${items.length === 0 ? `${validate_component(Card, "Card").$$render($$result, { class: "rounded-sm !max-w-none" }, {}, {
    default: () => {
      return `<div class="text-center py-12" data-svelte-h="svelte-1hc4bew"><div class="text-gray-500 dark:text-gray-400">Nenhuma movimentação encontrada com os filtros aplicados.</div></div>`;
    }
  })}` : ` ${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "rounded-sm !max-w-none overflow-hidden"
    },
    {},
    {
      default: () => {
        return `<div class="overflow-x-auto">${validate_component(Table, "Table").$$render($$result, { hoverable: true }, {}, {
          default: () => {
            return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `ID`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Data`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Tipo Movimentação`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Quantidade`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `EPI`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Almoxarifado`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Responsável`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Entrega`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Colaborador`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Documento`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Observações`;
                  }
                })}`;
              }
            })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
              default: () => {
                return `${each(items, (movement) => {
                  return `${validate_component(TableBodyRow, "TableBodyRow").$$render(
                    $$result,
                    {
                      class: "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "font-medium" }, {}, {
                          default: () => {
                            return `<span class="text-xs font-mono">${escape(truncateId(movement.id))}</span> `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `<div class="text-sm"><div>${escape(formatarData(movement.data))}</div> <div class="text-xs text-gray-500">${escape(new Date(movement.data).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }))} </div></div> `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Badge, "Badge").$$render(
                              $$result,
                              {
                                class: "w-fit rounded-sm " + getTipoMovimentacaoColor(movement.tipoMovimentacao)
                              },
                              {},
                              {
                                default: () => {
                                  return `${escape(formatTipoMovimentacao(movement.tipoMovimentacao))} `;
                                }
                              }
                            )} `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `<span class="font-medium">${escape(movement.quantidade)}</span> `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `<div class="max-w-32 truncate"${add_attribute("title", movement.tipoEpiNome || "N/A", 0)}>${escape(movement.tipoEpiNome || "N/A")}</div> `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `<div class="text-sm">${escape(movement.almoxarifadoNome || "N/A")}</div> `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `<div class="max-w-24 truncate"${add_attribute("title", movement.usuarioNome, 0)}>${escape(movement.usuarioNome)}</div> `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${movement.entregaId ? `${validate_component(Badge, "Badge").$$render(
                              $$result,
                              {
                                color: "blue",
                                class: "rounded-sm w-fit font-mono text-xs"
                              },
                              {},
                              {
                                default: () => {
                                  return `${escape(movement.entregaId.substring(0, 8))}...
                    `;
                                }
                              }
                            )}` : `<span class="text-gray-400" data-svelte-h="svelte-1n8ckzw">-</span>`} `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${movement.colaboradorNome ? `<div class="max-w-28 truncate"${add_attribute("title", movement.colaboradorNome, 0)}><span class="text-sm font-medium text-indigo-600 dark:text-indigo-400">${escape(movement.colaboradorNome)}</span> </div>` : `<span class="text-gray-400" data-svelte-h="svelte-1n8ckzw">-</span>`} `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${movement.documento ? `<div class="text-xs font-mono text-blue-600 dark:text-blue-400">${escape(movement.documento)} </div>` : `<span class="text-gray-400" data-svelte-h="svelte-1n8ckzw">-</span>`} `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `<div class="max-w-32 truncate"${add_attribute("title", movement.observacoes || "N/A", 0)}>${escape(movement.observacoes || "-")}</div> `;
                          }
                        })} `;
                      }
                    }
                  )}`;
                })}`;
              }
            })}`;
          }
        })}</div>  ${pagination.totalPages > 1 ? `<div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700"><div class="flex items-center space-x-4"><div class="text-sm text-gray-500 dark:text-gray-400">Mostrando ${escape(startIndex)} a ${escape(endIndex)} de ${escape(pagination.total)} resultados</div> ${validate_component(Select, "Select").$$render(
          $$result,
          {
            value: pagination.pageSize.toString(),
            size: "sm",
            class: "w-40 rounded-sm"
          },
          {},
          {
            default: () => {
              return `${each(itemsPerPageOptions, (option) => {
                return `<option${add_attribute("value", option.value, 0)}>${escape(option.label)}</option>`;
              })}`;
            }
          }
        )}</div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
          $$result,
          {
            size: "sm",
            color: "alternative",
            class: "rounded-sm",
            disabled: pagination.page <= 1
          },
          {},
          {
            default: () => {
              return `Anterior`;
            }
          }
        )}  ${each(generatePageNumbers(), (pageNum) => {
          return `${validate_component(Button, "Button").$$render(
            $$result,
            {
              size: "sm",
              color: pageNum === pagination.page ? "primary" : "alternative",
              class: "rounded-sm min-w-[40px]"
            },
            {},
            {
              default: () => {
                return `${escape(pageNum)} `;
              }
            }
          )}`;
        })} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            size: "sm",
            color: "alternative",
            class: "rounded-sm",
            disabled: pagination.page >= pagination.totalPages
          },
          {},
          {
            default: () => {
              return `Próximo`;
            }
          }
        )}</div></div>` : ``}`;
      }
    }
  )}`}`}`}</div>`;
});
const AuditoriaContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let items;
  let loading;
  let error;
  let pagination;
  let $auditoriaStore, $$unsubscribe_auditoriaStore;
  let { initialPageSize = 10 } = $$props;
  const autoRefresh = false;
  let entregasCache = /* @__PURE__ */ new Map();
  let colaboradoresCache = /* @__PURE__ */ new Map();
  let cacheExpiry = 0;
  const CACHE_DURATION = 5 * 60 * 1e3;
  async function loadEntregasForCorrelation() {
    if (Date.now() < cacheExpiry) return;
    try {
      console.log("🔗 Carregando entregas para correlação...");
      const fichasData = await fichaQueryAdapter.getFichasWithColaboradores({ page: 1, limit: 100 });
      entregasCache.clear();
      const fichas = fichasData.data || [];
      console.log(`🔍 Fichas encontradas para correlação: ${fichas.length}`);
      for (const ficha of fichas) {
        try {
          const entregasData = await fichaQueryAdapter.getFichaById(ficha.id);
          const entregas = entregasData.data || [];
          console.log(`📦 Ficha ${ficha.id.substring(0, 8)}: ${entregas.length} entregas encontradas`);
          for (const entrega of entregas) {
            const timestamp = new Date(entrega.dataEntrega).getTime();
            const segundoBase = Math.floor(timestamp / 1e3) * 1e3;
            for (let i = -10; i <= 10; i++) {
              const keyTimestamp = segundoBase + i * 1e3;
              const key = keyTimestamp.toString();
              entregasCache.set(key, entrega.id);
            }
            if (entrega.fichaEPI?.colaborador?.nome) {
              colaboradoresCache.set(entrega.id, entrega.fichaEPI.colaborador.nome);
              console.log(`👤 Colaborador ${entrega.fichaEPI.colaborador.nome} associado à entrega ${entrega.id.substring(0, 8)}`);
            } else if (ficha.colaborador?.nome) {
              colaboradoresCache.set(entrega.id, ficha.colaborador.nome);
              console.log(`👤 Colaborador ${ficha.colaborador.nome} associado à entrega ${entrega.id.substring(0, 8)} (via ficha)`);
            }
            console.log(`✅ Entrega ${entrega.id.substring(0, 8)} adicionada ao cache (${entrega.dataEntrega}) - timestamp base: ${segundoBase}`);
          }
        } catch (error2) {
          console.warn(`⚠️ Erro ao buscar entregas da ficha ${ficha.id}:`, error2);
        }
      }
      cacheExpiry = Date.now() + CACHE_DURATION;
      console.log(`✅ Cache de entregas carregado: ${entregasCache.size} entradas de timestamp, ${colaboradoresCache.size} colaboradores`);
    } catch (error2) {
      console.error("❌ Erro ao carregar entregas para correlação:", error2);
    }
  }
  function correlacionarEntrega(movimentacao) {
    if (movimentacao.tipoMovimentacao !== "SAIDA_ENTREGA") {
      return { entregaId: null, colaboradorNome: null };
    }
    const timestamp = new Date(movimentacao.data).getTime();
    const segundoBase = Math.floor(timestamp / 1e3) * 1e3;
    console.log(`🔍 Tentando correlacionar movimentação ${movimentacao.id.substring(0, 8)} (${movimentacao.data}) - timestamp base: ${segundoBase}`);
    for (let i = -10; i <= 10; i++) {
      const keyTimestamp = segundoBase + i * 1e3;
      const key = keyTimestamp.toString();
      const entregaId = entregasCache.get(key);
      if (entregaId) {
        const colaboradorNome = colaboradoresCache.get(entregaId) || null;
        console.log(`✅ Correlação encontrada: movimentação ${movimentacao.id.substring(0, 8)} → entrega ${entregaId.substring(0, 8)} → colaborador ${colaboradorNome || "N/A"} (diferença: ${i}s)`);
        return { entregaId, colaboradorNome };
      }
    }
    console.log(`❌ Nenhuma correlação encontrada para movimentação ${movimentacao.id.substring(0, 8)} (timestamp base: ${segundoBase})`);
    return { entregaId: null, colaboradorNome: null };
  }
  async function fetchMovimentacoes(params) {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", params.page.toString());
    if (params.limit) searchParams.set("limit", params.limit.toString());
    if (params.almoxarifadoId) searchParams.set("almoxarifadoId", params.almoxarifadoId);
    if (params.tipoEpiId) searchParams.set("tipoEpiId", params.tipoEpiId);
    if (params.tipoMovimentacao) searchParams.set("tipoMovimentacao", params.tipoMovimentacao);
    if (params.usuarioId) searchParams.set("usuarioId", params.usuarioId);
    if (params.dataInicio) searchParams.set("dataInicio", params.dataInicio);
    if (params.dataFim) searchParams.set("dataFim", params.dataFim);
    console.log("📋 Buscando movimentações:", `/relatorios/movimentacoes?${searchParams}`);
    try {
      const endpoint = `/relatorios/movimentacoes?${searchParams}`;
      const result = await api.get(endpoint);
      console.log("✅ Dados recebidos do backend:", result);
      console.log("📊 Estrutura dos dados:", {
        success: result.success,
        movimentacoes: result.data?.movimentacoes?.length || 0,
        totalMovimentacoes: result.data?.resumo?.totalMovimentacoes || 0
      });
      if (!result.success || !result.data) {
        throw new Error(`Backend retornou estrutura inválida: ${JSON.stringify(result)}`);
      }
      const movimentacoes = result.data.movimentacoes || [];
      const total = result.data.resumo?.totalMovimentacoes || 0;
      await loadEntregasForCorrelation();
      const movimentacoesComEntrega = movimentacoes.map((mov) => {
        const correlacao = correlacionarEntrega(mov);
        return {
          ...mov,
          entregaId: correlacao.entregaId,
          colaboradorNome: correlacao.colaboradorNome
        };
      });
      console.log("📋 Dados adaptados para o store:", {
        data: movimentacoesComEntrega.length,
        total,
        page: params.page || 1,
        pageSize: params.limit || 10,
        entregasCorrelacionadas: movimentacoesComEntrega.filter((m) => m.entregaId).length,
        colaboradoresCorrelacionados: movimentacoesComEntrega.filter((m) => m.colaboradorNome).length
      });
      return {
        data: movimentacoesComEntrega,
        total,
        page: params.page || 1,
        pageSize: params.limit || 10,
        totalPages: Math.ceil(total / (params.limit || 10))
      };
    } catch (error2) {
      console.error("❌ Erro ao buscar movimentações:", error2);
      throw error2;
    }
  }
  const auditoriaStore = createPaginatedStore(fetchMovimentacoes, {
    initialPageSize,
    debounceDelay: 300,
    cacheTimeout: 2 * 60 * 1e3,
    // 2 min cache para dados de auditoria
    enableCache: true
  });
  $$unsubscribe_auditoriaStore = subscribe(auditoriaStore, (value) => $auditoriaStore = value);
  let filters = {};
  let almoxarifados = [];
  let tiposEpi = [];
  let usuarios = [];
  if ($$props.initialPageSize === void 0 && $$bindings.initialPageSize && initialPageSize !== void 0) $$bindings.initialPageSize(initialPageSize);
  if ($$props.autoRefresh === void 0 && $$bindings.autoRefresh && autoRefresh !== void 0) $$bindings.autoRefresh(autoRefresh);
  items = $auditoriaStore?.items || [];
  loading = $auditoriaStore?.loading || false;
  error = $auditoriaStore?.error || null;
  pagination = {
    page: $auditoriaStore?.page || 1,
    pageSize: $auditoriaStore?.pageSize || initialPageSize,
    total: $auditoriaStore?.total || 0,
    totalPages: $auditoriaStore?.totalPages || 1
  };
  $$unsubscribe_auditoriaStore();
  return `   ${validate_component(AuditoriaTablePresenter, "AuditoriaTablePresenter").$$render(
    $$result,
    {
      items,
      loading,
      error,
      pagination,
      filters,
      almoxarifados,
      tiposEpi,
      usuarios
    },
    {},
    {}
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `  ${$$result.head += `<!-- HEAD_svelte-1wriy6p_START -->${$$result.title = `<title>Auditoria de Movimentações - DataLife EPI</title>`, ""}<meta name="description" content="Auditoria completa de movimentações de estoque com rastreabilidade e filtros avançados"><!-- HEAD_svelte-1wriy6p_END -->`, ""} ${validate_component(AuditoriaContainer, "AuditoriaContainer").$$render($$result, { initialPageSize: 10, autoRefresh: false }, {}, {})}`;
});
export {
  Page as default
};
