import { c as create_ssr_component, a as compute_rest_props, g as add_attribute, d as spread, v as validate_component, e as escape_object, f as escape_attribute_value, j as getContext, h as escape, l as each, k as subscribe } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { I as Input } from "../../../chunks/Input.js";
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, P as PlusOutline, S as SearchOutline, R as RefreshOutline } from "../../../chunks/SearchOutline.js";
import { t as tiposEPIAPI } from "../../../chunks/api.js";
import { e as epiFilters, a as createApiStore, b as notify } from "../../../chunks/modalStore.js";
import { L as LoadingSpinner } from "../../../chunks/LoadingSpinner.js";
import { E as ErrorDisplay } from "../../../chunks/mockData.js";
import { S as SearchableDropdown } from "../../../chunks/SearchableDropdown.js";
import { B as Badge } from "../../../chunks/Badge.js";
import { twMerge } from "tailwind-merge";
import { E as EyeOutline, L as Label, T as Textarea } from "../../../chunks/EyeOutline.js";
import { M as Modal } from "../../../chunks/Modal.js";
import { C as CloseButton } from "../../../chunks/CloseButton.js";
import { S as Select } from "../../../chunks/Select.js";
const base = "block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg border p-0! dark:text-gray-400";
const wrapper = "relative w-full";
const right = "flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400 end-0 p-2.5";
const Fileupload = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasFiles;
  let $$restProps = compute_rest_props($$props, ["files", "inputClass", "clearable", "size"]);
  let { files = void 0 } = $$props;
  let { inputClass = "border p-0! dark:text-gray-400" } = $$props;
  let { clearable = false } = $$props;
  let { size = "md" } = $$props;
  const sizes = {
    sm: "text-xs ps-9 pe-9 p-2",
    md: "text-sm ps-10 pe-10 p-2.5",
    lg: "sm:text-base ps-11 pe-11 p-3"
  };
  let inputCls = twMerge(base, sizes[size ?? "md"], inputClass);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0) $$bindings.files(files);
  if ($$props.inputClass === void 0 && $$bindings.inputClass && inputClass !== void 0) $$bindings.inputClass(inputClass);
  if ($$props.clearable === void 0 && $$bindings.clearable && clearable !== void 0) $$bindings.clearable(clearable);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  hasFiles = files && files.length > 0;
  return `${clearable ? `<div${add_attribute("class", wrapper, 0)}><input${spread(
    [
      { type: "file" },
      escape_object($$restProps),
      { class: escape_attribute_value(inputCls) }
    ],
    {}
  )}> ${hasFiles ? `${validate_component(CloseButton, "CloseButton").$$render($$result, { class: right }, {}, {})}` : ``}</div>` : `${validate_component(Input, "Input").$$render(
    $$result,
    Object.assign({}, $$restProps, {
      class: twMerge(inputClass, $$props.class)
    }),
    {},
    {
      default: ({ props }) => {
        return `<input${spread([{ type: "file" }, escape_object(props)], {})}>`;
      }
    }
  )}`} `;
});
const ClipboardListOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "clipboard list outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"></path></svg>`} `;
});
const TrashBinOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "trash bin outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"></path></svg>`} `;
});
function filterEntities(entities, filters) {
  return entities.filter((entity) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value || value === "todos" || value === "todas" || value === "") {
        return true;
      }
      const entityValue = entity[key];
      if (typeof value === "string" && typeof entityValue === "string") {
        return entityValue.toLowerCase() === value.toLowerCase();
      }
      return entityValue === value;
    });
  });
}
function searchEntities(entities, searchTerm, searchFields) {
  if (!searchTerm.trim()) {
    return entities;
  }
  const lowerSearchTerm = searchTerm.toLowerCase();
  return entities.filter(
    (entity) => searchFields.some((field) => {
      const fieldValue = field.split(".").reduce((obj, key) => {
        return obj && obj[key];
      }, entity);
      if (typeof fieldValue === "string") {
        return fieldValue.toLowerCase().includes(lowerSearchTerm);
      }
      if (typeof fieldValue === "number") {
        return fieldValue.toString().includes(lowerSearchTerm);
      }
      return false;
    })
  );
}
function sortEntities(entities, sortField, sortDirection) {
  return [...entities].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return sortDirection === "asc" ? 1 : -1;
    if (bValue == null) return sortDirection === "asc" ? -1 : 1;
    let comparison = 0;
    if (typeof aValue === "string" && typeof bValue === "string") {
      comparison = aValue.localeCompare(bValue, "pt-BR", {
        numeric: true,
        sensitivity: "base"
      });
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      comparison = aValue - bValue;
    } else if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime();
    } else {
      const aStr = String(aValue);
      const bStr = String(bValue);
      comparison = aStr.localeCompare(bStr, "pt-BR");
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });
}
function paginateEntities(entities, currentPage, itemsPerPage) {
  const totalItems = entities.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const validPage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const items = entities.slice(startIndex, endIndex);
  return {
    items,
    totalItems,
    totalPages,
    currentPage: validPage,
    hasNext: validPage < totalPages,
    hasPrevious: validPage > 1,
    startIndex,
    endIndex
  };
}
function processEntities(entities, options) {
  const {
    filters = {},
    searchTerm = "",
    searchFields = [],
    sortField,
    sortDirection = "asc",
    currentPage = 1,
    itemsPerPage = 10
  } = options;
  let processedEntities = [...entities];
  const originalCount = processedEntities.length;
  if (Object.keys(filters).length > 0) {
    processedEntities = filterEntities(processedEntities, filters);
  }
  if (searchTerm && searchFields.length > 0) {
    processedEntities = searchEntities(processedEntities, searchTerm, searchFields);
  }
  const filteredCount = processedEntities.length;
  {
    processedEntities = sortEntities(processedEntities, sortField, sortDirection);
  }
  const paginationResult = paginateEntities(processedEntities, currentPage, itemsPerPage);
  return {
    ...paginationResult,
    filteredCount,
    originalCount
  };
}
const EPITable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tipos = [] } = $$props;
  let { onView = () => {
  } } = $$props;
  let { onDuplicate = () => {
  } } = $$props;
  let { onDelete = () => {
  } } = $$props;
  if ($$props.tipos === void 0 && $$bindings.tipos && tipos !== void 0) $$bindings.tipos(tipos);
  if ($$props.onView === void 0 && $$bindings.onView && onView !== void 0) $$bindings.onView(onView);
  if ($$props.onDuplicate === void 0 && $$bindings.onDuplicate && onDuplicate !== void 0) $$bindings.onDuplicate(onDuplicate);
  if ($$props.onDelete === void 0 && $$bindings.onDelete && onDelete !== void 0) $$bindings.onDelete(onDelete);
  return `${validate_component(Table, "Table").$$render($$result, { hoverable: true }, {}, {
    default: () => {
      return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[200px]" }, {}, {
            default: () => {
              return `Equipamento`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
            default: () => {
              return `CA`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
            $$result,
            {
              class: "min-w-[120px] hidden lg:table-cell"
            },
            {},
            {
              default: () => {
                return `Fabricante`;
              }
            }
          )} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
            $$result,
            {
              class: "min-w-[120px] hidden xl:table-cell"
            },
            {},
            {
              default: () => {
                return `Categoria`;
              }
            }
          )} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
            default: () => {
              return `Vida Útil`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[120px]" }, {}, {
            default: () => {
              return `Ações`;
            }
          })}`;
        }
      })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
        default: () => {
          return `${tipos.length > 0 ? `${each(tipos, (tipo) => {
            return `${validate_component(TableBodyRow, "TableBodyRow").$$render(
              $$result,
              {
                class: "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              },
              {},
              {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[200px]" }, {}, {
                    default: () => {
                      return `<div><p class="font-medium text-gray-900 dark:text-white truncate">${escape(tipo.nomeEquipamento)}</p> <p class="text-sm text-gray-500 dark:text-gray-400 truncate">${escape(tipo.descricao || "Sem descrição")}</p>  <p class="text-xs text-gray-500 dark:text-gray-400 lg:hidden mt-1">${escape(tipo.fabricante)}</p>  <p class="text-xs text-gray-500 dark:text-gray-400 xl:hidden mt-1">${escape(tipo.categoria)} </p></div> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
                    default: () => {
                      return `${validate_component(Badge, "Badge").$$render($$result, { color: "gray", class: "w-fit rounded-sm" }, {}, {
                        default: () => {
                          return `${escape(tipo.numeroCA)} `;
                        }
                      })} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render(
                    $$result,
                    {
                      class: "min-w-[120px] hidden lg:table-cell"
                    },
                    {},
                    {
                      default: () => {
                        return `<span class="text-sm text-gray-900 dark:text-white">${escape(tipo.fabricante)}</span> `;
                      }
                    }
                  )} ${validate_component(TableBodyCell, "TableBodyCell").$$render(
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
                            color: "primary",
                            class: "w-fit rounded-sm"
                          },
                          {},
                          {
                            default: () => {
                              return `${escape(tipo.categoria)} `;
                            }
                          }
                        )} `;
                      }
                    }
                  )} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
                    default: () => {
                      return `<span class="text-sm text-gray-900 dark:text-white">${escape(tipo.vidaUtilDias)} dias</span> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[120px]" }, {}, {
                    default: () => {
                      return `<div class="flex space-x-2"><button class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Ver detalhes">${validate_component(EyeOutline, "EyeOutline").$$render(
                        $$result,
                        {
                          class: "w-5 h-5 text-gray-600 dark:text-gray-400"
                        },
                        {},
                        {}
                      )}</button> <button class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Duplicar">${validate_component(ClipboardListOutline, "ClipboardListOutline").$$render(
                        $$result,
                        {
                          class: "w-5 h-5 text-gray-600 dark:text-gray-400"
                        },
                        {},
                        {}
                      )}</button> <button class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Excluir">${validate_component(TrashBinOutline, "TrashBinOutline").$$render(
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
          })}` : `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { colspan: "6", class: "text-center py-12" }, {}, {
                default: () => {
                  return `<div class="text-gray-500 dark:text-gray-400" data-svelte-h="svelte-2lgs1h">Nenhum tipo de EPI encontrado</div>`;
                }
              })}`;
            }
          })}`}`;
        }
      })}`;
    }
  })}`;
});
const EPI_CATEGORIES = [
  "Proteção da Cabeça",
  "Proteção dos Olhos e Face",
  "Proteção Auditiva",
  "Proteção Respiratória",
  "Proteção das Mãos",
  "Proteção dos Pés",
  "Proteção do Corpo",
  "Proteção contra Quedas",
  "Outros"
];
const DEFAULT_VIDA_UTIL_DIAS = 365;
const EPIForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { formData = {} } = $$props;
  let { onChange = () => {
  } } = $$props;
  let { idPrefix = "" } = $$props;
  let { disabled = false } = $$props;
  function getFieldId(field) {
    return `${idPrefix}${field}`;
  }
  if ($$props.formData === void 0 && $$bindings.formData && formData !== void 0) $$bindings.formData(formData);
  if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0) $$bindings.onChange(onChange);
  if ($$props.idPrefix === void 0 && $$bindings.idPrefix && idPrefix !== void 0) $$bindings.idPrefix(idPrefix);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="space-y-6"> <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: getFieldId("nomeEquipamento"),
        class: "text-gray-700 dark:text-gray-300 mb-2 block"
      },
      {},
      {
        default: () => {
          return `Nome do Equipamento <span class="text-red-500" data-svelte-h="svelte-1n3raya">*</span>`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: getFieldId("nomeEquipamento"),
        placeholder: "Ex: Capacete de Segurança Classe A",
        size: "sm",
        class: "rounded-sm",
        required: true,
        disabled,
        value: formData.nomeEquipamento
      },
      {
        value: ($$value) => {
          formData.nomeEquipamento = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: getFieldId("numeroCA"),
        class: "text-gray-700 dark:text-gray-300 mb-2 block"
      },
      {},
      {
        default: () => {
          return `Número CA <span class="text-red-500" data-svelte-h="svelte-1n3raya">*</span>`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: getFieldId("numeroCA"),
        placeholder: "Ex: 12345",
        size: "sm",
        class: "rounded-sm",
        required: true,
        disabled,
        value: formData.numeroCA
      },
      {
        value: ($$value) => {
          formData.numeroCA = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: getFieldId("fabricante"),
        class: "text-gray-700 dark:text-gray-300 mb-2 block"
      },
      {},
      {
        default: () => {
          return `Fabricante <span class="text-red-500" data-svelte-h="svelte-1n3raya">*</span>`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: getFieldId("fabricante"),
        placeholder: "Ex: 3M do Brasil",
        size: "sm",
        class: "rounded-sm",
        required: true,
        disabled,
        value: formData.fabricante
      },
      {
        value: ($$value) => {
          formData.fabricante = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>  <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: getFieldId("categoria"),
        class: "text-gray-700 dark:text-gray-300 mb-2 block"
      },
      {},
      {
        default: () => {
          return `Categoria <span class="text-red-500" data-svelte-h="svelte-1n3raya">*</span>`;
        }
      }
    )} ${validate_component(Select, "Select").$$render(
      $$result,
      {
        id: getFieldId("categoria"),
        size: "sm",
        class: "rounded-sm",
        required: true,
        disabled,
        value: formData.categoria
      },
      {
        value: ($$value) => {
          formData.categoria = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<option value="" data-svelte-h="svelte-1ivemfv">Selecione uma categoria</option> ${each(EPI_CATEGORIES, (categoria) => {
            return `<option${add_attribute("value", categoria, 0)}>${escape(categoria)}</option>`;
          })}`;
        }
      }
    )}</div> <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: getFieldId("vidaUtilDias"),
        class: "text-gray-700 dark:text-gray-300 mb-2 block"
      },
      {},
      {
        default: () => {
          return `Vida Útil (dias) <span class="text-red-500" data-svelte-h="svelte-1n3raya">*</span>`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: getFieldId("vidaUtilDias"),
        type: "number",
        min: "1",
        size: "sm",
        class: "rounded-sm",
        required: true,
        disabled,
        value: formData.vidaUtilDias
      },
      {
        value: ($$value) => {
          formData.vidaUtilDias = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>  <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: getFieldId("descricao"),
        class: "text-gray-700 dark:text-gray-300 mb-2 block"
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
        id: getFieldId("descricao"),
        placeholder: "Descreva as características e especificações do EPI...",
        rows: "3",
        class: "rounded-sm",
        disabled,
        value: formData.descricao
      },
      {
        value: ($$value) => {
          formData.descricao = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  <div>${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: getFieldId("foto"),
        class: "text-gray-700 dark:text-gray-300 mb-2 block"
      },
      {},
      {
        default: () => {
          return `Foto do Equipamento`;
        }
      }
    )} ${validate_component(Fileupload, "Fileupload").$$render(
      $$result,
      {
        id: getFieldId("foto"),
        class: "rounded-sm",
        disabled
      },
      {},
      {}
    )} <p class="text-sm text-gray-500 dark:text-gray-400 mt-2" data-svelte-h="svelte-uxqmjz">Selecione uma imagem do equipamento (opcional)</p></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const css = {
  code: ".modal-container{max-height:calc(100vh - 80px - 16px);margin-top:80px;overflow-y:auto}.modal-body-scrollable{max-height:calc(100vh - 200px);overflow-y:auto}",
  map: `{"version":3,"file":"EPIFormModal.svelte","sources":["EPIFormModal.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { Modal, Button } from \\"flowbite-svelte\\";\\nimport EPIForm from \\"./EPIForm.svelte\\";\\nimport { DEFAULT_VIDA_UTIL_DIAS } from \\"$lib/constants/epiConstants\\";\\nexport let open = false;\\nexport let title = \\"Novo EPI\\";\\nexport let mode = \\"create\\";\\nexport let epiData = {};\\nexport let onSave = () => {\\n};\\nexport let onCancel = () => {\\n};\\nlet formData = {};\\nlet errors = {};\\n$: if (open) {\\n  resetForm();\\n}\\nfunction resetForm() {\\n  formData = {\\n    ...epiData,\\n    vidaUtilDias: epiData.vidaUtilDias || DEFAULT_VIDA_UTIL_DIAS\\n  };\\n  errors = {};\\n}\\nfunction handleFieldChange(field, value) {\\n  formData = { ...formData, [field]: value };\\n  if (errors[field]) {\\n    errors = { ...errors, [field]: \\"\\" };\\n  }\\n}\\nfunction validateForm() {\\n  const newErrors = {};\\n  if (!formData.nomeEquipamento?.trim()) {\\n    newErrors.nomeEquipamento = \\"Nome do equipamento \\\\xE9 obrigat\\\\xF3rio\\";\\n  }\\n  if (!formData.numeroCA?.trim()) {\\n    newErrors.numeroCA = \\"N\\\\xFAmero CA \\\\xE9 obrigat\\\\xF3rio\\";\\n  }\\n  if (!formData.fabricante?.trim()) {\\n    newErrors.fabricante = \\"Fabricante \\\\xE9 obrigat\\\\xF3rio\\";\\n  }\\n  if (!formData.categoria?.trim()) {\\n    newErrors.categoria = \\"Categoria \\\\xE9 obrigat\\\\xF3ria\\";\\n  }\\n  if (!formData.vidaUtilDias || formData.vidaUtilDias < 1) {\\n    newErrors.vidaUtilDias = \\"Vida \\\\xFAtil deve ser maior que zero\\";\\n  }\\n  errors = newErrors;\\n  return Object.keys(newErrors).length === 0;\\n}\\nfunction handleSave() {\\n  if (validateForm()) {\\n    onSave(formData);\\n    handleClose();\\n  }\\n}\\nfunction handleClose() {\\n  open = false;\\n  onCancel();\\n}\\nconst isViewMode = mode === \\"view\\";\\nconst isEditMode = mode === \\"edit\\";\\nconst saveButtonText = mode === \\"create\\" ? \\"Cadastrar\\" : \\"Salvar Altera\\\\xE7\\\\xF5es\\";\\n<\/script>\\n\\n<style>\\n  :global(.modal-container) {\\n    max-height: calc(100vh - 80px - 16px); /* Altura total - header (64px + 16px padding) - padding bottom */\\n    margin-top: 80px; /* Altura do header + padding */\\n    overflow-y: auto;\\n  }\\n  \\n  :global(.modal-body-scrollable) {\\n    max-height: calc(100vh - 200px); /* Altura para o corpo do modal considerando header e footer */\\n    overflow-y: auto;\\n  }\\n</style>\\n\\n<Modal bind:open title={title} size=\\"lg\\" autoclose={false} outsideclose={false} class=\\"modal-container\\">\\n  <div slot=\\"header\\" class=\\"flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600\\">\\n    <h3 class=\\"text-xl font-semibold text-gray-900 dark:text-white\\">\\n      {title}\\n    </h3>\\n  </div>\\n  <div class=\\"modal-body-scrollable space-y-4 p-4 md:p-5\\">\\n    <EPIForm \\n      {formData}\\n      onChange={handleFieldChange}\\n      disabled={isViewMode}\\n      idPrefix=\\"modal-\\"\\n    />\\n\\n    <!-- Exibir erros de validação -->\\n    {#if Object.keys(errors).length > 0}\\n      <div class=\\"bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4\\">\\n        <h4 class=\\"text-sm font-medium text-red-800 dark:text-red-400 mb-2\\">\\n          Corrija os seguintes erros:\\n        </h4>\\n        <ul class=\\"text-sm text-red-700 dark:text-red-400 space-y-1\\">\\n          {#each Object.entries(errors) as [field, error]}\\n            {#if error}\\n              <li>• {error}</li>\\n            {/if}\\n          {/each}\\n        </ul>\\n      </div>\\n    {/if}\\n  </div>\\n\\n  <svelte:fragment slot=\\"footer\\">\\n    <div class=\\"flex justify-end space-x-3\\">\\n      <Button color=\\"alternative\\" on:click={handleClose} size=\\"sm\\" class=\\"rounded-sm\\">\\n        {isViewMode ? 'Fechar' : 'Cancelar'}\\n      </Button>\\n      {#if !isViewMode}\\n        <Button color=\\"primary\\" on:click={handleSave} size=\\"sm\\" class=\\"rounded-sm\\">\\n          {saveButtonText}\\n        </Button>\\n      {/if}\\n    </div>\\n  </svelte:fragment>\\n</Modal>"],"names":[],"mappings":"AAiEU,gBAAkB,CACxB,UAAU,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CACrC,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,IACd,CAEQ,sBAAwB,CAC9B,UAAU,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,CAC/B,UAAU,CAAE,IACd"}`
};
const EPIFormModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open = false } = $$props;
  let { title = "Novo EPI" } = $$props;
  let { mode = "create" } = $$props;
  let { epiData = {} } = $$props;
  let { onSave = () => {
  } } = $$props;
  let { onCancel = () => {
  } } = $$props;
  let formData = {};
  let errors = {};
  function resetForm() {
    formData = {
      ...epiData,
      vidaUtilDias: epiData.vidaUtilDias || DEFAULT_VIDA_UTIL_DIAS
    };
    errors = {};
  }
  function handleFieldChange(field, value) {
    formData = { ...formData, [field]: value };
    if (errors[field]) {
      errors = { ...errors, [field]: "" };
    }
  }
  const isViewMode = mode === "view";
  const saveButtonText = mode === "create" ? "Cadastrar" : "Salvar Alterações";
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
  if ($$props.epiData === void 0 && $$bindings.epiData && epiData !== void 0) $$bindings.epiData(epiData);
  if ($$props.onSave === void 0 && $$bindings.onSave && onSave !== void 0) $$bindings.onSave(onSave);
  if ($$props.onCancel === void 0 && $$bindings.onCancel && onCancel !== void 0) $$bindings.onCancel(onCancel);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (open) {
        resetForm();
      }
    }
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title,
        size: "lg",
        autoclose: false,
        outsideclose: false,
        class: "modal-container",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<div class="flex justify-end space-x-3">${validate_component(Button, "Button").$$render(
            $$result,
            {
              color: "alternative",
              size: "sm",
              class: "rounded-sm"
            },
            {},
            {
              default: () => {
                return `${escape(isViewMode ? "Fechar" : "Cancelar")}`;
              }
            }
          )} ${!isViewMode ? `${validate_component(Button, "Button").$$render(
            $$result,
            {
              color: "primary",
              size: "sm",
              class: "rounded-sm"
            },
            {},
            {
              default: () => {
                return `${escape(saveButtonText)}`;
              }
            }
          )}` : ``}</div> `;
        },
        header: () => {
          return `<div slot="header" class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"><h3 class="text-xl font-semibold text-gray-900 dark:text-white">${escape(title)}</h3></div>`;
        },
        default: () => {
          return `<div class="modal-body-scrollable space-y-4 p-4 md:p-5">${validate_component(EPIForm, "EPIForm").$$render(
            $$result,
            {
              formData,
              onChange: handleFieldChange,
              disabled: isViewMode,
              idPrefix: "modal-"
            },
            {},
            {}
          )}  ${Object.keys(errors).length > 0 ? `<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"><h4 class="text-sm font-medium text-red-800 dark:text-red-400 mb-2" data-svelte-h="svelte-1czz086">Corrija os seguintes erros:</h4> <ul class="text-sm text-red-700 dark:text-red-400 space-y-1">${each(Object.entries(errors), ([field, error]) => {
            return `${error ? `<li>• ${escape(error)}</li>` : ``}`;
          })}</ul></div>` : ``}</div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currentPage, $$unsubscribe_currentPage;
  let $searchTerm, $$unsubscribe_searchTerm;
  let $filters, $$unsubscribe_filters;
  let $tiposEPIStore, $$unsubscribe_tiposEPIStore;
  const { filters, searchTerm, currentPage } = epiFilters;
  $$unsubscribe_filters = subscribe(filters, (value) => $filters = value);
  $$unsubscribe_searchTerm = subscribe(searchTerm, (value) => $searchTerm = value);
  $$unsubscribe_currentPage = subscribe(currentPage, (value) => $currentPage = value);
  const tiposEPIStore = createApiStore([]);
  $$unsubscribe_tiposEPIStore = subscribe(tiposEPIStore, (value) => $tiposEPIStore = value);
  let processedData;
  let modalOpen = false;
  let modalMode = "create";
  let modalTitle = "Novo EPI";
  let selectedEPI = {};
  let categoriaOptions = [
    {
      value: "todas",
      label: "Todas as Categorias"
    }
  ];
  let fabricanteOptions = [
    {
      value: "todos",
      label: "Todos os Fabricantes"
    }
  ];
  async function loadTiposEPI() {
    try {
      const data = await tiposEPIStore.execute(() => tiposEPIAPI.getAll());
      const categorias = new Set(data.map((tipo) => tipo.categoria));
      categoriaOptions = [
        {
          value: "todas",
          label: "Todas as Categorias"
        },
        ...Array.from(categorias).map((cat) => ({ value: cat, label: cat }))
      ];
      const fabricantes = new Set(data.map((tipo) => tipo.fabricante));
      fabricanteOptions = [
        {
          value: "todos",
          label: "Todos os Fabricantes"
        },
        ...Array.from(fabricantes).map((fab) => ({ value: fab, label: fab }))
      ];
    } catch (error) {
      console.error("Erro ao carregar tipos de EPI:", error);
      notify.error("Erro ao carregar", "Não foi possível carregar os tipos de EPI");
    }
  }
  function handleViewEPI(epi) {
    modalMode = "view";
    modalTitle = "Detalhes do EPI";
    selectedEPI = { ...epi };
    modalOpen = true;
  }
  function handleDuplicateEPI(epi) {
    modalMode = "create";
    modalTitle = "Duplicar EPI";
    selectedEPI = {
      ...epi,
      id: void 0,
      nomeEquipamento: `${epi.nomeEquipamento} (Cópia)`
    };
    modalOpen = true;
  }
  async function handleDeleteEPI(epi) {
    try {
      await tiposEPIAPI.delete(epi.id);
      notify.success("EPI excluído", "Tipo de EPI excluído com sucesso");
      await loadTiposEPI();
    } catch (error) {
      console.error("Erro ao excluir EPI:", error);
      notify.error("Erro", "Não foi possível excluir o EPI");
    }
  }
  async function handleSaveEPI(epiData) {
    try {
      if (modalMode === "create") {
        await tiposEPIAPI.create(epiData);
        notify.success("EPI cadastrado", "Tipo de EPI cadastrado com sucesso");
      } else if (modalMode === "edit") {
        await tiposEPIAPI.update(epiData.id, epiData);
        notify.success("EPI atualizado", "Tipo de EPI atualizado com sucesso");
      }
      await loadTiposEPI();
    } catch (error) {
      console.error("Erro ao salvar EPI:", error);
      notify.error("Erro", "Não foi possível salvar o EPI");
    }
  }
  function handleModalCancel() {
    modalOpen = false;
    selectedEPI = {};
  }
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if ($tiposEPIStore.data) {
        processedData = processEntities($tiposEPIStore.data, {
          filters: $filters,
          searchTerm: $searchTerm,
          searchFields: ["nomeEquipamento", "fabricante", "numeroCA", "categoria"],
          sortField: "nomeEquipamento",
          sortDirection: "asc",
          currentPage: $currentPage,
          itemsPerPage: 10
        });
      }
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-3ni7bu_START -->${$$result.title = `<title>Catálogo de EPIs - DataLife EPI</title>`, ""}<!-- HEAD_svelte-3ni7bu_END -->`, ""} <div class="space-y-6"> <div class="flex items-center justify-between"><div data-svelte-h="svelte-1sna02h"><h1 class="text-xl font-medium text-gray-900 dark:text-white">Catálogo de EPIs</h1> <p class="text-sm text-gray-600 dark:text-gray-400">Gerencie os tipos de equipamentos de proteção individual</p></div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
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
    )}</div></div>  ${$tiposEPIStore.loading ? `${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}` : `${$tiposEPIStore.error ? `${validate_component(ErrorDisplay, "ErrorDisplay").$$render(
      $$result,
      {
        error: $tiposEPIStore.error,
        onRetry: loadTiposEPI
      },
      {},
      {}
    )}` : `${processedData?.items.length > 0 ? ` <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"> <div class="p-4 border-b border-gray-200 dark:border-gray-700"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"> <div class="relative">${validate_component(SearchOutline, "SearchOutline").$$render(
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
        value: $searchTerm
      },
      {
        value: ($$value) => {
          $searchTerm = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
      $$result,
      {
        options: categoriaOptions,
        value: $filters.categoria,
        placeholder: "Categoria"
      },
      {},
      {}
    )}  ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
      $$result,
      {
        options: fabricanteOptions,
        value: $filters.fabricante,
        placeholder: "Fabricante"
      },
      {},
      {}
    )}  ${$searchTerm || $filters.categoria && $filters.categoria !== "todas" || $filters.fabricante && $filters.fabricante !== "todos" ? `${validate_component(Button, "Button").$$render(
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
    )}` : ` <div></div>`}</div></div>  <div class="min-w-[980px] overflow-x-auto">${validate_component(EPITable, "EPITable").$$render(
      $$result,
      {
        tipos: processedData.items,
        onView: handleViewEPI,
        onDuplicate: handleDuplicateEPI,
        onDelete: handleDeleteEPI
      },
      {},
      {}
    )}</div>  ${processedData.totalPages > 1 ? `<div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700"><div class="text-sm text-gray-500 dark:text-gray-400">Mostrando ${escape(processedData.startIndex + 1)} a ${escape(processedData.endIndex)} de ${escape(processedData.totalItems)} resultados</div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "sm",
        color: "alternative",
        class: "rounded-sm",
        disabled: !processedData.hasPrevious
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
        disabled: !processedData.hasNext
      },
      {},
      {
        default: () => {
          return `Próximo`;
        }
      }
    )}</div></div>` : ``}</div>` : ` ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<div class="text-center py-12"><div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">${validate_component(SearchOutline, "SearchOutline").$$render($$result, { class: "w-8 h-8 text-gray-400" }, {}, {})}</div> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-19fe8vd">Nenhum EPI encontrado</h3> <p class="text-gray-500 dark:text-gray-400 mb-6">${escape($searchTerm || Object.values($filters).some((v) => v !== "todos" && v !== "todas") ? "Tente ajustar os filtros ou termo de busca" : "Comece cadastrando um novo tipo de EPI")}</p> ${validate_component(Button, "Button").$$render(
          $$result,
          {
            size: "sm",
            color: "primary",
            class: "rounded-sm"
          },
          {},
          {
            default: () => {
              return `${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})} ${escape(!$searchTerm && !Object.values($filters).some((v) => v !== "todos" && v !== "todas") ? "Primeiro EPI" : "Novo EPI")}`;
            }
          }
        )}</div>`;
      }
    })}`}`}`}</div>  ${validate_component(EPIFormModal, "EPIFormModal").$$render(
      $$result,
      {
        modalTitle,
        mode: modalMode,
        epiData: selectedEPI,
        onSave: handleSaveEPI,
        onCancel: handleModalCancel,
        open: modalOpen
      },
      {
        open: ($$value) => {
          modalOpen = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_currentPage();
  $$unsubscribe_searchTerm();
  $$unsubscribe_filters();
  $$unsubscribe_tiposEPIStore();
  return $$rendered;
});
export {
  Page as default
};
