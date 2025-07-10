import { c as create_ssr_component, a as compute_rest_props, j as getContext, d as spread, g as add_attribute, h as escape, f as escape_attribute_value, e as escape_object, k as subscribe, l as each, v as validate_component, m as missing_component } from "../../chunks/ssr.js";
import { w as writable, d as derived } from "../../chunks/index.js";
import { a as Button, B as Badge } from "../../chunks/Button.js";
import { C as Card } from "../../chunks/Card.js";
import { twMerge } from "tailwind-merge";
import { E as ExclamationCircleOutline, A as ArrowRightOutline } from "../../chunks/ExclamationCircleOutline.js";
import { C as CheckCircleOutline } from "../../chunks/CheckCircleOutline.js";
import { F as FileDocOutline } from "../../chunks/FileDocOutline.js";
import { b as base } from "../../chunks/paths.js";
const ArchiveOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "archive outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"></path></svg>`} `;
});
function getActivityColor(type) {
  switch (type) {
    case "entrega":
      return "green";
    case "devolucao":
      return "blue";
    case "entrada":
      return "purple";
    case "vencimento":
      return "yellow";
    case "ficha":
      return "indigo";
    default:
      return "gray";
  }
}
function getActivityBgClass(type) {
  const color = getActivityColor(type);
  switch (color) {
    case "green":
      return "bg-green-100 dark:bg-green-900";
    case "blue":
      return "bg-blue-100 dark:bg-blue-900";
    case "purple":
      return "bg-purple-100 dark:bg-purple-900";
    case "yellow":
      return "bg-yellow-100 dark:bg-yellow-900";
    case "indigo":
      return "bg-indigo-100 dark:bg-indigo-900";
    default:
      return "bg-gray-100 dark:bg-gray-900";
  }
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $loading, $$unsubscribe_loading;
  let $activitiesStore, $$unsubscribe_activitiesStore;
  let $dashboardData, $$unsubscribe_dashboardData;
  let $quickStatsStore, $$unsubscribe_quickStatsStore;
  const dashboardData = writable(null);
  $$unsubscribe_dashboardData = subscribe(dashboardData, (value) => $dashboardData = value);
  const loading = writable(true);
  $$unsubscribe_loading = subscribe(loading, (value) => $loading = value);
  let metrics = [];
  const activitiesStore = writable([]);
  $$unsubscribe_activitiesStore = subscribe(activitiesStore, (value) => $activitiesStore = value);
  const quickStatsStore = writable({
    totalColaboradores: 0,
    fichasVencidas: 0,
    estoqueTotal: 0,
    entregasHoje: 0
  });
  $$unsubscribe_quickStatsStore = subscribe(quickStatsStore, (value) => $quickStatsStore = value);
  derived([quickStatsStore], ([$stats]) => $stats.fichasVencidas + metrics.find((m) => m.title === "Estoque Baixo")?.value || 0);
  function getActivityIcon(type) {
    switch (type) {
      case "entrega":
        return CheckCircleOutline;
      case "devolucao":
        return ArrowRightOutline;
      case "entrada":
        return ArchiveOutline;
      case "vencimento":
        return ExclamationCircleOutline;
      case "ficha":
        return FileDocOutline;
      default:
        return FileDocOutline;
    }
  }
  $$unsubscribe_loading();
  $$unsubscribe_activitiesStore();
  $$unsubscribe_dashboardData();
  $$unsubscribe_quickStatsStore();
  return `${$$result.head += `<!-- HEAD_svelte-s5dteg_START -->${$$result.title = `<title>Dashboard - DataLife EPI</title>`, ""}<!-- HEAD_svelte-s5dteg_END -->`, ""} <div class="space-y-6"> <div class="flex items-center justify-between" data-svelte-h="svelte-13se1wv"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1> <p class="text-sm text-gray-600 dark:text-gray-400">Visão geral do sistema de gerenciamento de EPIs</p></div></div>  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">${$loading ? `${each(Array(4), (_, i) => {
    return `${validate_component(Card, "Card").$$render(
      $$result,
      {
        size: "sm",
        class: "rounded-sm shadow-none"
      },
      {},
      {
        default: () => {
          return `<div class="flex items-center justify-between animate-pulse" data-svelte-h="svelte-bgl0bx"><div class="space-y-2"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div> <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div> <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div></div> <div class="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg"><div class="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div> </div></div> `;
        }
      }
    )}`;
  })}` : `${each(metrics, (metric) => {
    return `${validate_component(Card, "Card").$$render(
      $$result,
      {
        size: "sm",
        class: "rounded-sm shadow-none"
      },
      {},
      {
        default: () => {
          return `<div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-600 dark:text-gray-400">${escape(metric.title)}</p> <p class="text-2xl font-bold text-gray-900 dark:text-white">${escape(metric.value)}</p> <div class="flex items-center mt-2"><span class="${"text-xs " + escape(
            metric.changeType === "positive" ? "text-green-600" : "text-red-600",
            true
          )}">${escape(metric.change)}</span> <span class="text-xs text-gray-500 dark:text-gray-400 ml-1" data-svelte-h="svelte-9uf3xt">vs. mês anterior</span> </div></div> <div class="${"p-3 rounded-lg " + escape(
            metric.color === "blue" ? "bg-blue-100 dark:bg-blue-900" : metric.color === "green" ? "bg-green-100 dark:bg-green-900" : metric.color === "yellow" ? "bg-yellow-100 dark:bg-yellow-900" : "bg-red-100 dark:bg-red-900",
            true
          )}">${validate_component(metric.icon || missing_component, "svelte:component").$$render($$result, { class: "w-6 h-6" }, {}, {})} </div></div> `;
        }
      }
    )}`;
  })}`}</div>  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <div class="lg:col-span-2 space-y-6">${validate_component(Card, "Card").$$render(
    $$result,
    {
      size: "sm",
      class: "rounded-sm w-full max-w-none shadow-none"
    },
    {},
    {
      default: () => {
        return `<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white" data-svelte-h="svelte-1euutue">Atividades Recentes</h3> ${validate_component(Button, "Button").$$render(
          $$result,
          {
            size: "xs",
            color: "alternative",
            class: "rounded-sm",
            href: base + "/fichas"
          },
          {},
          {
            default: () => {
              return `Ver Fichas`;
            }
          }
        )}</div> <div class="space-y-3">${each($activitiesStore, (activity) => {
          return `<div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><div class="flex-shrink-0"><div class="${"p-2 rounded-lg " + escape(getActivityBgClass(activity.type), true)}">${validate_component(getActivityIcon(activity.type) || missing_component, "svelte:component").$$render($$result, { class: "w-5 h-5" }, {}, {})} </div></div> <div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900 dark:text-white">${escape(activity.description)}</p> <p class="text-sm text-gray-600 dark:text-gray-400">${escape(activity.equipment)}</p> <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">${escape(activity.time)}</p></div> </div>`;
        })}</div>`;
      }
    }
  )}  ${$dashboardData && $dashboardData.contratadaStats && $dashboardData.contratadaStats.topContratadas.length > 0 ? `${validate_component(Card, "Card").$$render(
    $$result,
    {
      size: "sm",
      class: "rounded-sm w-full max-w-none shadow-none"
    },
    {},
    {
      default: () => {
        return `<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4" data-svelte-h="svelte-10d2baa">EPIs ativos por Contratada</h3> <div class="space-y-3">${each($dashboardData.contratadaStats.topContratadas, (item) => {
          return `<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900 dark:text-white truncate">${escape(item.contratada.nome)}</p> <p class="text-xs text-gray-500 dark:text-gray-400">${escape(item.contratada.cnpjFormatado)}</p></div> <div class="text-right ml-4">${validate_component(Badge, "Badge").$$render(
            $$result,
            {
              color: "green",
              class: "w-fit rounded-sm mb-1"
            },
            {},
            {
              default: () => {
                return `${escape(item.totalEpisAtivos)} EPIs`;
              }
            }
          )} <p class="text-xs text-gray-600 dark:text-gray-400">${escape(item.totalColaboradores)} Colab.</p></div> </div>`;
        })}</div>`;
      }
    }
  )}` : ``}</div>  <div class="space-y-6"> ${validate_component(Card, "Card").$$render(
    $$result,
    {
      size: "sm",
      class: "rounded-sm shadow-none"
    },
    {},
    {
      default: () => {
        return `<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4" data-svelte-h="svelte-ppurac">Estatísticas Rápidas</h3> <div class="space-y-3"><div class="flex items-center justify-between"><span class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-8sutok">Total de Colaboradores</span> <span class="text-sm font-semibold text-gray-900 dark:text-white">${escape($quickStatsStore.totalColaboradores)}</span></div> <div class="flex items-center justify-between"><span class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-1jiovvy">Fichas Vencidas</span> ${validate_component(Badge, "Badge").$$render($$result, { color: "red", class: "w-fit rounded-sm" }, {}, {
          default: () => {
            return `${escape($quickStatsStore.fichasVencidas)}`;
          }
        })}</div> <div class="flex items-center justify-between"><span class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-7onrs3">Estoque Total</span> <span class="text-sm font-semibold text-gray-900 dark:text-white">${escape($quickStatsStore.estoqueTotal.toLocaleString("pt-BR"))}</span></div> <div class="flex items-center justify-between"><span class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-1l7hlno">Entregas Hoje</span> ${validate_component(Badge, "Badge").$$render(
          $$result,
          {
            color: "green",
            class: "w-fit rounded-sm"
          },
          {},
          {
            default: () => {
              return `${escape($quickStatsStore.entregasHoje)}`;
            }
          }
        )}</div></div>`;
      }
    }
  )}  ${validate_component(Card, "Card").$$render(
    $$result,
    {
      size: "sm",
      class: "rounded-sm border-l-4 border-l-yellow-500 shadow-none"
    },
    {},
    {
      default: () => {
        return `<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-103vt7x">Alertas</h3> <div class="space-y-2"><div class="flex items-center space-x-2">${validate_component(ExclamationCircleOutline, "ExclamationCircleOutline").$$render($$result, { class: "w-4 h-4 text-yellow-600" }, {}, {})} <span class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-79ea4n">23 EPIs vencendo em 30 dias</span></div> <div class="flex items-center space-x-2">${validate_component(ExclamationCircleOutline, "ExclamationCircleOutline").$$render($$result, { class: "w-4 h-4 text-red-600" }, {}, {})} <span class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-1ahloid">12 itens com estoque baixo</span></div></div>`;
      }
    }
  )}</div></div></div>`;
});
export {
  Page as default
};
