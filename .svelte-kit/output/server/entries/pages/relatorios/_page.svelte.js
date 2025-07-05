import { c as create_ssr_component, a as compute_rest_props, j as getContext, d as spread, g as add_attribute, h as escape, f as escape_attribute_value, e as escape_object, k as subscribe, v as validate_component, l as each } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { S as Select } from "../../../chunks/Select.js";
import { twMerge } from "tailwind-merge";
import { C as ChartOutline } from "../../../chunks/ChartOutline.js";
import { F as FileDocOutline } from "../../../chunks/FileDocOutline.js";
import { r as relatoriosAPI } from "../../../chunks/api.js";
import { a as createApiStore, b as notify } from "../../../chunks/modalStore.js";
import { L as LoadingSpinner } from "../../../chunks/LoadingSpinner.js";
import { E as ErrorDisplay } from "../../../chunks/mockData.js";
const ArrowDownOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "arrow down outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M12 19V5m0 14-4-4m4 4 4-4"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M12 19V5m0 14-4-4m4 4 4-4"></path></svg>`} `;
});
const CalendarMonthSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "desc", "ariaLabel"]);
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
  let { desc = {} } = $$props;
  let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
  let hasDescription = false;
  let { ariaLabel = "calendar month solid" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
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
      { fill: escape_attribute_value(color) },
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"></path></svg>` : `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: escape_attribute_value(color) },
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"></path></svg>`} `;
});
const ShoppingBagSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "desc", "ariaLabel"]);
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
  let { desc = {} } = $$props;
  let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
  let hasDescription = false;
  let { ariaLabel = "shopping bag solid" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
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
      { fill: escape_attribute_value(color) },
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z" clip-rule="evenodd"></path></svg>` : `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: escape_attribute_value(color) },
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z" clip-rule="evenodd"></path></svg>`} `;
});
const UsersGroupSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "desc", "ariaLabel"]);
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
  let { desc = {} } = $$props;
  let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
  let hasDescription = false;
  let { ariaLabel = "users group solid" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
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
      { fill: escape_attribute_value(color) },
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd"></path></svg>` : `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: escape_attribute_value(color) },
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd"></path></svg>`} `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $estatisticasStore, $$unsubscribe_estatisticasStore;
  const estatisticasStore = createApiStore();
  $$unsubscribe_estatisticasStore = subscribe(estatisticasStore, (value) => $estatisticasStore = value);
  let tipoRelatorio = "fichas";
  let periodoRelatorio = "30";
  let formatoRelatorio = "pdf";
  const tiposRelatorio = [
    {
      value: "fichas",
      label: "Relatório de Fichas EPI"
    },
    {
      value: "estoque",
      label: "Relatório de Estoque"
    },
    {
      value: "entregas",
      label: "Relatório de Entregas"
    },
    {
      value: "vencimentos",
      label: "Relatório de Vencimentos"
    },
    {
      value: "colaboradores",
      label: "Relatório de Colaboradores"
    },
    {
      value: "movimentacoes",
      label: "Relatório de Movimentações"
    }
  ];
  const periodosRelatorio = [
    { value: "7", label: "Últimos 7 dias" },
    { value: "30", label: "Últimos 30 dias" },
    { value: "90", label: "Últimos 90 dias" },
    { value: "365", label: "Último ano" },
    {
      value: "custom",
      label: "Período customizado"
    }
  ];
  const formatosRelatorio = [
    { value: "pdf", label: "PDF" },
    { value: "excel", label: "Excel (XLSX)" },
    { value: "csv", label: "CSV" }
  ];
  async function loadEstatisticas() {
    try {
      await estatisticasStore.execute(() => relatoriosAPI.getEstatisticas());
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      notify.error("Erro ao carregar", "Não foi possível carregar as estatísticas");
    }
  }
  const chartData = {
    fichasPorMes: [
      { mes: "Jan", fichas: 12 },
      { mes: "Fev", fichas: 19 },
      { mes: "Mar", fichas: 15 },
      { mes: "Abr", fichas: 22 },
      { mes: "Mai", fichas: 18 },
      { mes: "Jun", fichas: 25 }
    ],
    episPorCategoria: [
      {
        categoria: "Proteção da Cabeça",
        quantidade: 45
      },
      {
        categoria: "Proteção das Mãos",
        quantidade: 78
      },
      {
        categoria: "Proteção dos Olhos",
        quantidade: 32
      },
      {
        categoria: "Proteção Respiratória",
        quantidade: 56
      },
      {
        categoria: "Proteção dos Pés",
        quantidade: 23
      }
    ]
  };
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1mxfxzm_START -->${$$result.title = `<title>Relatórios - DataLife EPI</title>`, ""}<!-- HEAD_svelte-1mxfxzm_END -->`, ""} <div class="space-y-6"> <div class="flex items-center justify-between"><div data-svelte-h="svelte-5t8f3r"><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Relatórios</h1> <p class="text-sm text-gray-600 dark:text-gray-400">Visualize estatísticas e gere relatórios do sistema</p></div> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "sm",
        color: "primary",
        class: "rounded-sm"
      },
      {},
      {
        default: () => {
          return `${validate_component(ArrowDownOutline, "ArrowDownOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
      Exportar Dados`;
        }
      }
    )}</div>  ${$estatisticasStore.loading ? `${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}` : `${$estatisticasStore.error ? `${validate_component(ErrorDisplay, "ErrorDisplay").$$render(
      $$result,
      {
        error: $estatisticasStore.error,
        onRetry: loadEstatisticas
      },
      {},
      {}
    )}` : `${$estatisticasStore.data ? `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-svelte-h="svelte-14ocniz">Total de Colaboradores</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape($estatisticasStore.data.totalColaboradores)}</p></div> <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">${validate_component(UsersGroupSolid, "UsersGroupSolid").$$render(
          $$result,
          {
            class: "w-6 h-6 text-blue-600 dark:text-blue-400"
          },
          {},
          {}
        )}</div></div>`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-svelte-h="svelte-tmcma6">Fichas Ativas</p> <p class="text-2xl font-bold text-green-600">${escape($estatisticasStore.data.fichasAtivas)}</p></div> <div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">${validate_component(FileDocOutline, "FileDocOutline").$$render(
          $$result,
          {
            class: "w-6 h-6 text-green-600 dark:text-green-400"
          },
          {},
          {}
        )}</div></div>`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-svelte-h="svelte-d124mp">Fichas Vencidas</p> <p class="text-2xl font-bold text-red-600">${escape($estatisticasStore.data.fichasVencidas)}</p></div> <div class="p-3 bg-red-100 dark:bg-red-900 rounded-lg">${validate_component(FileDocOutline, "FileDocOutline").$$render(
          $$result,
          {
            class: "w-6 h-6 text-red-600 dark:text-red-400"
          },
          {},
          {}
        )}</div></div>`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-svelte-h="svelte-84c2og">Total em Estoque</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape($estatisticasStore.data.estoqueTotal)}</p></div> <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">${validate_component(ShoppingBagSolid, "ShoppingBagSolid").$$render(
          $$result,
          {
            class: "w-6 h-6 text-purple-600 dark:text-purple-400"
          },
          {},
          {}
        )}</div></div>`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-svelte-h="svelte-k3zw9z">Estoque Baixo</p> <p class="text-2xl font-bold text-yellow-600">${escape($estatisticasStore.data.estoqueBaixo)}</p></div> <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">${validate_component(ShoppingBagSolid, "ShoppingBagSolid").$$render(
          $$result,
          {
            class: "w-6 h-6 text-yellow-600 dark:text-yellow-400"
          },
          {},
          {}
        )}</div></div>`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600 dark:text-gray-400" data-svelte-h="svelte-1iooh02">Entregas neste Mês</p> <p class="text-2xl font-bold text-indigo-600">${escape($estatisticasStore.data.entregasMes)}</p></div> <div class="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">${validate_component(CalendarMonthSolid, "CalendarMonthSolid").$$render(
          $$result,
          {
            class: "w-6 h-6 text-indigo-600 dark:text-indigo-400"
          },
          {},
          {}
        )}</div></div>`;
      }
    })}</div>` : ``}`}`}  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"> ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white" data-svelte-h="svelte-1p4t669">Fichas Criadas por Mês</h3> ${validate_component(ChartOutline, "ChartOutline").$$render($$result, { class: "w-5 h-5 text-gray-400" }, {}, {})}</div> <div class="space-y-3">${each(chartData.fichasPorMes, (item) => {
          return `<div class="flex items-center justify-between"><span class="text-sm text-gray-600 dark:text-gray-400">${escape(item.mes)}</span> <div class="flex items-center space-x-2"><div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-20"><div class="bg-blue-600 h-2 rounded-full" style="${"width: " + escape(item.fichas / 25 * 100, true) + "%"}"></div></div> <span class="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">${escape(item.fichas)} </span></div> </div>`;
        })}</div>`;
      }
    })}  ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white" data-svelte-h="svelte-sduhjy">EPIs por Categoria</h3> ${validate_component(ChartOutline, "ChartOutline").$$render($$result, { class: "w-5 h-5 text-gray-400" }, {}, {})}</div> <div class="space-y-3">${each(chartData.episPorCategoria, (item) => {
          return `<div class="flex items-center justify-between"><span class="text-sm text-gray-600 dark:text-gray-400 flex-1 truncate">${escape(item.categoria)}</span> <div class="flex items-center space-x-2"><div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-20"><div class="bg-green-600 h-2 rounded-full" style="${"width: " + escape(item.quantidade / 80 * 100, true) + "%"}"></div></div> <span class="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">${escape(item.quantidade)} </span></div> </div>`;
        })}</div>`;
      }
    })}</div>  ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4" data-svelte-h="svelte-ommjio">Gerador de Relatórios</h3> <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"> <div><label for="tipo-relatorio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-svelte-h="svelte-uv7oej">Tipo de Relatório</label> ${validate_component(Select, "Select").$$render(
          $$result,
          {
            id: "tipo-relatorio",
            class: "text-sm rounded-sm",
            size: "sm",
            value: tipoRelatorio
          },
          {
            value: ($$value) => {
              tipoRelatorio = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${each(tiposRelatorio, (tipo) => {
                return `<option${add_attribute("value", tipo.value, 0)}>${escape(tipo.label)}</option>`;
              })}`;
            }
          }
        )}</div>  <div><label for="periodo-relatorio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-svelte-h="svelte-2j9jdd">Período</label> ${validate_component(Select, "Select").$$render(
          $$result,
          {
            id: "periodo-relatorio",
            class: "text-sm rounded-sm",
            size: "sm",
            value: periodoRelatorio
          },
          {
            value: ($$value) => {
              periodoRelatorio = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${each(periodosRelatorio, (periodo) => {
                return `<option${add_attribute("value", periodo.value, 0)}>${escape(periodo.label)}</option>`;
              })}`;
            }
          }
        )}</div>  <div><label for="formato-relatorio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" data-svelte-h="svelte-13lkn59">Formato</label> ${validate_component(Select, "Select").$$render(
          $$result,
          {
            id: "formato-relatorio",
            class: "text-sm rounded-sm",
            size: "sm",
            value: formatoRelatorio
          },
          {
            value: ($$value) => {
              formatoRelatorio = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${each(formatosRelatorio, (formato) => {
                return `<option${add_attribute("value", formato.value, 0)}>${escape(formato.label)}</option>`;
              })}`;
            }
          }
        )}</div>  <div class="flex items-end">${validate_component(Button, "Button").$$render(
          $$result,
          {
            color: "primary",
            class: "w-full rounded-sm",
            size: "sm"
          },
          {},
          {
            default: () => {
              return `${validate_component(ArrowDownOutline, "ArrowDownOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
          Gerar Relatório`;
            }
          }
        )}</div></div>  <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"><h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-1wpkk4l">Descrição do Relatório</h4> ${tipoRelatorio === "fichas" ? `<p class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-qyjv9n">Relatório completo das fichas EPI, incluindo status, vencimentos e colaboradores associados.</p>` : `${tipoRelatorio === "estoque" ? `<p class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-105cfor">Relatório detalhado do estoque atual, incluindo quantidades, validades e status dos itens.</p>` : `${tipoRelatorio === "entregas" ? `<p class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-13wnjfk">Relatório de todas as entregas realizadas, com informações de responsáveis e assinaturas.</p>` : `${tipoRelatorio === "vencimentos" ? `<p class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-1fj860b">Relatório focado em EPIs vencidos ou próximos ao vencimento para ações preventivas.</p>` : `${tipoRelatorio === "colaboradores" ? `<p class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-139lpjl">Relatório dos colaboradores, seus EPIs associados e status das fichas.</p>` : `${tipoRelatorio === "movimentacoes" ? `<p class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-ielrdt">Relatório de todas as movimentações de estoque, incluindo entradas, saídas e transferências.</p>` : ``}`}`}`}`}`}</div>`;
      }
    })}  ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4" data-svelte-h="svelte-nhupbb">Relatórios Rápidos</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4">${validate_component(Button, "Button").$$render(
          $$result,
          {
            color: "alternative",
            class: "rounded-sm h-20 flex flex-col items-center justify-center"
          },
          {},
          {
            default: () => {
              return `${validate_component(FileDocOutline, "FileDocOutline").$$render($$result, { class: "w-6 h-6 mb-2" }, {}, {})} <span class="text-sm" data-svelte-h="svelte-19zbdgg">Fichas Vencidas</span>`;
            }
          }
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            color: "alternative",
            class: "rounded-sm h-20 flex flex-col items-center justify-center"
          },
          {},
          {
            default: () => {
              return `${validate_component(ShoppingBagSolid, "ShoppingBagSolid").$$render($$result, { class: "w-6 h-6 mb-2" }, {}, {})} <span class="text-sm" data-svelte-h="svelte-90223i">Estoque Baixo</span>`;
            }
          }
        )} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            color: "alternative",
            class: "rounded-sm h-20 flex flex-col items-center justify-center"
          },
          {},
          {
            default: () => {
              return `${validate_component(CalendarMonthSolid, "CalendarMonthSolid").$$render($$result, { class: "w-6 h-6 mb-2" }, {}, {})} <span class="text-sm" data-svelte-h="svelte-5r9ny9">Entregas do Mês</span>`;
            }
          }
        )}</div>`;
      }
    })}</div>`;
  } while (!$$settled);
  $$unsubscribe_estatisticasStore();
  return $$rendered;
});
export {
  Page as default
};
