import { c as create_ssr_component, a as compute_rest_props, v as validate_component, b as compute_slots, d as spread, g as add_attribute, e as escape_object, f as escape_attribute_value, s as setContext, j as getContext, k as subscribe, l as each, h as escape } from "./ssr.js";
import { w as writable } from "./index.js";
import { twMerge, twJoin } from "tailwind-merge";
import { f as fade, F as Frame, C as CloseButton, b as api, a as Button } from "./Button.js";
import { A as ArrowRightOutline, E as ExclamationCircleOutline } from "./ExclamationCircleOutline.js";
const TransitionFrame = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["transition", "params", "open"]);
  let { transition = fade } = $$props;
  let { params = {} } = $$props;
  let { open = true } = $$props;
  function close(ev) {
    if (ev?.stopPropagation) ev.stopPropagation();
    open = false;
  }
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.params === void 0 && $$bindings.params && params !== void 0) $$bindings.params(params);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Frame, "Frame").$$render(
      $$result,
      Object.assign({}, { transition }, { params }, $$restProps, { open }),
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({ close }) : ``}`;
        }
      }
    )} `;
  } while (!$$settled);
  return $$rendered;
});
const Alert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["dismissable", "defaultClass"]);
  let $$slots = compute_slots(slots);
  let { dismissable = false } = $$props;
  let { defaultClass = "p-4 gap-3 text-sm" } = $$props;
  let divClass;
  if ($$props.dismissable === void 0 && $$bindings.dismissable && dismissable !== void 0) $$bindings.dismissable(dismissable);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0) $$bindings.defaultClass(defaultClass);
  divClass = twMerge(defaultClass, ($$slots.icon || dismissable) && "flex items-center", $$props.class);
  return `${validate_component(TransitionFrame, "TransitionFrame").$$render($$result, Object.assign({}, { dismissable }, { color: "primary" }, { role: "alert" }, { rounded: true }, $$restProps, { class: divClass }), {}, {
    default: ({ close }) => {
      return `${$$slots.icon ? `${slots.icon ? slots.icon({}) : ``}` : ``} ${$$slots.icon || dismissable ? `<div>${slots.default ? slots.default({}) : ``}</div>` : `${slots.default ? slots.default({}) : ``}`} ${dismissable ? `${slots["close-button"] ? slots["close-button"]({ close }) : ` ${validate_component(CloseButton, "CloseButton").$$render(
        $$result,
        {
          class: "ms-auto -me-1.5 -my-1.5 dark:hover:bg-gray-700",
          color: $$restProps.color
        },
        {},
        {}
      )} `}` : ``}`;
    }
  })} `;
});
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "bg", "customColor", "size", "currentFill", "currentColor"]);
  let { color = "primary" } = $$props;
  let { bg = "text-gray-300" } = $$props;
  let { customColor = "" } = $$props;
  let { size = "8" } = $$props;
  let { currentFill = "currentFill" } = $$props;
  let { currentColor = "currentColor" } = $$props;
  let iconsize = `w-${size} h-${size}`;
  if (currentFill !== "currentFill") {
    color = void 0;
  }
  const fillColorClasses = {
    primary: "fill-primary-600",
    blue: "fill-blue-600",
    gray: "fill-gray-600 dark:fill-gray-300",
    green: "fill-green-500",
    red: "fill-red-600",
    yellow: "fill-yellow-400",
    pink: "fill-pink-600",
    purple: "fill-purple-600",
    white: "fill-white",
    custom: customColor
  };
  let fillColorClass = color === void 0 ? "" : fillColorClasses[color] ?? fillColorClasses.blue;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.bg === void 0 && $$bindings.bg && bg !== void 0) $$bindings.bg(bg);
  if ($$props.customColor === void 0 && $$bindings.customColor && customColor !== void 0) $$bindings.customColor(customColor);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.currentFill === void 0 && $$bindings.currentFill && currentFill !== void 0) $$bindings.currentFill(currentFill);
  if ($$props.currentColor === void 0 && $$bindings.currentColor && currentColor !== void 0) $$bindings.currentColor(currentColor);
  return `<svg${spread(
    [
      escape_object($$restProps),
      { role: "status" },
      {
        class: escape_attribute_value(twMerge("inline -mt-px animate-spin dark:text-gray-600", iconsize, bg, fillColorClass, $$props.class))
      },
      { viewBox: "0 0 100 101" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" }
    ],
    {}
  )}><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"${add_attribute("fill", currentColor, 0)}></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"${add_attribute("fill", currentFill, 0)}></path></svg> `;
});
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "divClass",
    "striped",
    "hoverable",
    "noborder",
    "shadow",
    "color",
    "customeColor",
    "items",
    "filter",
    "placeholder",
    "innerDivClass",
    "searchClass",
    "svgDivClass",
    "svgClass",
    "inputClass",
    "classInput",
    "classSvgDiv"
  ]);
  let { divClass = "relative overflow-x-auto" } = $$props;
  let { striped = false } = $$props;
  let { hoverable = false } = $$props;
  let { noborder = false } = $$props;
  let { shadow = false } = $$props;
  let { color = "default" } = $$props;
  let { customeColor = "" } = $$props;
  let { items = [] } = $$props;
  let { filter = null } = $$props;
  let { placeholder = "Search" } = $$props;
  let { innerDivClass = "p-4" } = $$props;
  let { searchClass = "relative mt-1" } = $$props;
  let { svgDivClass = "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none" } = $$props;
  let { svgClass = "w-5 h-5 text-gray-500 dark:text-gray-400" } = $$props;
  let { inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" } = $$props;
  let { classInput = "" } = $$props;
  let { classSvgDiv = "" } = $$props;
  let searchTerm = "";
  let inputCls = twMerge(inputClass, classInput);
  let svgDivCls = twMerge(svgDivClass, classSvgDiv);
  const colors = {
    default: "text-gray-500 dark:text-gray-400",
    blue: "text-blue-100 dark:text-blue-100",
    green: "text-green-100 dark:text-green-100",
    red: "text-red-100 dark:text-red-100",
    yellow: "text-yellow-100 dark:text-yellow-100",
    purple: "text-purple-100 dark:text-purple-100",
    indigo: "text-indigo-100 dark:text-indigo-100",
    pink: "text-pink-100 dark:text-pink-100",
    custom: customeColor
  };
  const searchTermStore = writable(searchTerm);
  const filterStore = writable(filter);
  setContext("searchTerm", searchTermStore);
  setContext("filter", filterStore);
  setContext("sorter", writable(null));
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0) $$bindings.divClass(divClass);
  if ($$props.striped === void 0 && $$bindings.striped && striped !== void 0) $$bindings.striped(striped);
  if ($$props.hoverable === void 0 && $$bindings.hoverable && hoverable !== void 0) $$bindings.hoverable(hoverable);
  if ($$props.noborder === void 0 && $$bindings.noborder && noborder !== void 0) $$bindings.noborder(noborder);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0) $$bindings.shadow(shadow);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.customeColor === void 0 && $$bindings.customeColor && customeColor !== void 0) $$bindings.customeColor(customeColor);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.filter === void 0 && $$bindings.filter && filter !== void 0) $$bindings.filter(filter);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.innerDivClass === void 0 && $$bindings.innerDivClass && innerDivClass !== void 0) $$bindings.innerDivClass(innerDivClass);
  if ($$props.searchClass === void 0 && $$bindings.searchClass && searchClass !== void 0) $$bindings.searchClass(searchClass);
  if ($$props.svgDivClass === void 0 && $$bindings.svgDivClass && svgDivClass !== void 0) $$bindings.svgDivClass(svgDivClass);
  if ($$props.svgClass === void 0 && $$bindings.svgClass && svgClass !== void 0) $$bindings.svgClass(svgClass);
  if ($$props.inputClass === void 0 && $$bindings.inputClass && inputClass !== void 0) $$bindings.inputClass(inputClass);
  if ($$props.classInput === void 0 && $$bindings.classInput && classInput !== void 0) $$bindings.classInput(classInput);
  if ($$props.classSvgDiv === void 0 && $$bindings.classSvgDiv && classSvgDiv !== void 0) $$bindings.classSvgDiv(classSvgDiv);
  {
    setContext("striped", striped);
  }
  {
    setContext("hoverable", hoverable);
  }
  {
    setContext("noborder", noborder);
  }
  {
    setContext("color", color);
  }
  {
    setContext("items", items);
  }
  {
    searchTermStore.set(searchTerm);
  }
  {
    {
      if (filter) filterStore.set(filter);
    }
  }
  return `<div${add_attribute("class", twJoin(divClass, shadow && "shadow-md sm:rounded-lg"), 0)}>${filter ? `${slots.search ? slots.search({}) : ` <div${add_attribute("class", innerDivClass, 0)}><label for="table-search" class="sr-only" data-svelte-h="svelte-1m8vpa4">Search</label> <div${add_attribute("class", searchClass, 0)}><div${add_attribute("class", svgDivCls, 0)}>${slots.svgSearch ? slots.svgSearch({}) : ` <svg${add_attribute("class", svgClass, 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg> `}</div> <input type="search" id="table-search"${add_attribute("class", inputCls, 0)}${add_attribute("placeholder", placeholder, 0)}${add_attribute("value", searchTerm, 0)}></div> ${slots.header ? slots.header({}) : ``}</div> `}` : ``} <table${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("w-full text-left text-sm", colors[color], $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</table></div> `;
});
const TableBody = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let items;
  let filtered;
  let sorted;
  let $$restProps = compute_rest_props($$props, ["tableBodyClass"]);
  let $sorter, $$unsubscribe_sorter;
  let $searchTerm, $$unsubscribe_searchTerm;
  let $filter, $$unsubscribe_filter;
  let { tableBodyClass = void 0 } = $$props;
  let filter = getContext("filter");
  $$unsubscribe_filter = subscribe(filter, (value) => $filter = value);
  let searchTerm = getContext("searchTerm");
  $$unsubscribe_searchTerm = subscribe(searchTerm, (value) => $searchTerm = value);
  let sorter = getContext("sorter");
  $$unsubscribe_sorter = subscribe(sorter, (value) => $sorter = value);
  if ($$props.tableBodyClass === void 0 && $$bindings.tableBodyClass && tableBodyClass !== void 0) $$bindings.tableBodyClass(tableBodyClass);
  items = getContext("items") || [];
  filtered = $filter ? items.filter((item) => $filter(item, $searchTerm)) : items;
  sorted = $sorter ? filtered.toSorted((a, b) => $sorter.sortDirection * $sorter.sort(a, b)) : filtered;
  $$unsubscribe_sorter();
  $$unsubscribe_searchTerm();
  $$unsubscribe_filter();
  return `<tbody${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(tableBodyClass)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``} ${each(sorted, (item) => {
    return `${slots.row ? slots.row({ item }) : ``}`;
  })}</tbody> `;
});
const TableBodyCell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["tdClass"]);
  let { tdClass = "px-6 py-4 whitespace-nowrap font-medium " } = $$props;
  let color = "default";
  color = getContext("color");
  let tdClassfinal;
  if ($$props.tdClass === void 0 && $$bindings.tdClass && tdClass !== void 0) $$bindings.tdClass(tdClass);
  tdClassfinal = twMerge(
    tdClass,
    color === "default" ? "text-gray-900 dark:text-white" : "text-blue-50 whitespace-nowrap dark:text-blue-100",
    $$props.class
  );
  return `<td${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(tdClassfinal)
      }
    ],
    {}
  )}>${$$props.onclick ? `<button>${slots.default ? slots.default({}) : ``}</button>` : `${slots.default ? slots.default({}) : ``}`}</td> `;
});
const TableBodyRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color"]);
  let { color = getContext("color") } = $$props;
  const colors = {
    default: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
    blue: "bg-blue-500 border-blue-400",
    green: "bg-green-500 border-green-400",
    red: "bg-red-500 border-red-400",
    yellow: "bg-yellow-500 border-yellow-400",
    purple: "bg-purple-500 border-purple-400",
    custom: ""
  };
  const hoverColors = {
    default: "hover:bg-gray-50 dark:hover:bg-gray-600",
    blue: "hover:bg-blue-400",
    green: "hover:bg-green-400",
    red: "hover:bg-red-400",
    yellow: "hover:bg-yellow-400",
    purple: "hover:bg-purple-400",
    custom: ""
  };
  const stripColors = {
    default: "odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700",
    blue: "odd:bg-blue-800 even:bg-blue-700 dark:odd:bg-blue-800 dark:even:bg-blue-700",
    green: "odd:bg-green-800 even:bg-green-700 dark:odd:bg-green-800 dark:even:bg-green-700",
    red: "odd:bg-red-800 even:bg-red-700 dark:odd:bg-red-800 dark:even:bg-red-700",
    yellow: "odd:bg-yellow-800 even:bg-yellow-700 dark:odd:bg-yellow-800 dark:even:bg-yellow-700",
    purple: "odd:bg-purple-800 even:bg-purple-700 dark:odd:bg-purple-800 dark:even:bg-purple-700",
    custom: ""
  };
  let trClass;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  trClass = twMerge([
    !getContext("noborder") && "border-b last:border-b-0",
    colors[color],
    getContext("hoverable") && hoverColors[color],
    getContext("striped") && stripColors[color],
    $$props.class
  ]);
  return `<tr${spread([escape_object($$restProps), { class: escape_attribute_value(trClass) }], {})}>${slots.default ? slots.default({}) : ``}</tr> `;
});
const TableHead = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let theadClassfinal;
  let $$restProps = compute_rest_props($$props, ["theadClass", "defaultRow"]);
  let { theadClass = "text-xs uppercase" } = $$props;
  let { defaultRow = true } = $$props;
  let color;
  color = getContext("color");
  let noborder = getContext("noborder");
  let striped = getContext("striped");
  let defaultBgColor = noborder || striped ? "" : "bg-gray-50 dark:bg-gray-700";
  const bgColors = {
    default: defaultBgColor,
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-600",
    purple: "bg-purple-600",
    custom: ""
  };
  let textColor = color === "default" ? "text-gray-700 dark:text-gray-400" : color === "custom" ? "" : "text-white  dark:text-white";
  let borderColors = striped ? "" : color === "default" ? "border-gray-700" : color === "custom" ? "" : `border-${color}-400`;
  if ($$props.theadClass === void 0 && $$bindings.theadClass && theadClass !== void 0) $$bindings.theadClass(theadClass);
  if ($$props.defaultRow === void 0 && $$bindings.defaultRow && defaultRow !== void 0) $$bindings.defaultRow(defaultRow);
  theadClassfinal = twMerge(theadClass, textColor, striped && borderColors, bgColors[color], $$props.class);
  return `<thead${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(theadClassfinal)
      }
    ],
    {}
  )}>${defaultRow ? `<tr>${slots.default ? slots.default({}) : ``}</tr>` : `${slots.default ? slots.default({}) : ``}`}</thead> `;
});
const TableHeadCell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["padding", "sort", "defaultDirection", "defaultSort", "direction"]);
  let $sorter, $$unsubscribe_sorter;
  let { padding = "px-6 py-3" } = $$props;
  let { sort = null } = $$props;
  let { defaultDirection = "asc" } = $$props;
  let { defaultSort = false } = $$props;
  let { direction = defaultSort ? defaultDirection : null } = $$props;
  let sorter = getContext("sorter");
  $$unsubscribe_sorter = subscribe(sorter, (value) => $sorter = value);
  let sortId = Math.random().toString(36).substring(2);
  if (defaultSort) {
    sortItems();
  }
  function sortItems() {
    if (!sort || !sorter) return;
    sorter.update((sorter2) => {
      return {
        id: sortId,
        sort,
        sortDirection: sorter2?.id === sortId ? -sorter2.sortDirection : defaultDirection === "asc" ? 1 : -1
      };
    });
  }
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
  if ($$props.sort === void 0 && $$bindings.sort && sort !== void 0) $$bindings.sort(sort);
  if ($$props.defaultDirection === void 0 && $$bindings.defaultDirection && defaultDirection !== void 0) $$bindings.defaultDirection(defaultDirection);
  if ($$props.defaultSort === void 0 && $$bindings.defaultSort && defaultSort !== void 0) $$bindings.defaultSort(defaultSort);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0) $$bindings.direction(direction);
  direction = $sorter?.id === sortId ? $sorter.sortDirection === 1 ? "asc" : "desc" : null;
  $$unsubscribe_sorter();
  return `${sort && sorter ? `<th${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value($$props.class)
      },
      {
        "aria-sort": escape_attribute_value(direction ? `${direction}ending` : void 0)
      }
    ],
    {}
  )}><button${add_attribute("class", twMerge("w-full text-left", "after:absolute after:pl-3", direction === "asc" && 'after:content-["▲"]', direction === "desc" && 'after:content-["▼"]', padding), 0)}>${slots.default ? slots.default({}) : ``}</button></th>` : `<th${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(padding, $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</th>`} `;
});
const RefreshOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "refresh outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path></svg>`} `;
});
function removeNonNumeric(str) {
  return str.replace(/\D/g, "");
}
function isValidCPF(cpf) {
  const numbers = removeNonNumeric(cpf);
  if (numbers.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(numbers)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i);
  }
  let digit1 = sum * 10 % 11;
  if (digit1 === 10) digit1 = 0;
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i);
  }
  let digit2 = sum * 10 % 11;
  if (digit2 === 10) digit2 = 0;
  return digit1 === parseInt(numbers[9]) && digit2 === parseInt(numbers[10]);
}
function isValidCNPJ(cnpj) {
  const numbers = removeNonNumeric(cnpj);
  if (numbers.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(numbers)) return false;
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(numbers[i]) * weights1[i];
  }
  let digit1 = sum % 11;
  digit1 = digit1 < 2 ? 0 : 11 - digit1;
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(numbers[i]) * weights2[i];
  }
  let digit2 = sum % 11;
  digit2 = digit2 < 2 ? 0 : 11 - digit2;
  return digit1 === parseInt(numbers[12]) && digit2 === parseInt(numbers[13]);
}
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
      console.log("🏪 PaginatedStore received response:", {
        dataLength: response.data?.length || 0,
        total: response.total,
        page: response.page,
        pageSize: response.pageSize,
        totalPages: response.totalPages
      });
      const newState = {
        items: response.data,
        total: response.total,
        page: response.page,
        pageSize: response.pageSize,
        totalPages: response.totalPages || Math.ceil(response.total / response.pageSize),
        loading: false,
        error: null,
        lastFetch: Date.now()
      };
      console.log("🏪 Setting new store state:", {
        itemsLength: newState.items?.length || 0,
        total: newState.total,
        loading: newState.loading
      });
      set(newState);
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
function createAdvancedPaginatedStore(config = {}) {
  const {
    defaultPageSize = 10,
    debounceDelay = 300,
    cacheTimeout = 5 * 60 * 1e3
  } = config;
  function getFallbackContratadas(params) {
    const mockData = [
      {
        id: "1",
        nome: "Empresa ABC Ltda",
        cnpj: "12345678000190",
        cnpjFormatado: "12.345.678/0001-90",
        createdAt: "2024-01-15T10:00:00Z"
      },
      {
        id: "2",
        nome: "TechSolutions Corp",
        cnpj: "98765432000198",
        cnpjFormatado: "98.765.432/0001-98",
        createdAt: "2024-01-20T14:30:00Z"
      }
    ];
    let filteredData = [...mockData];
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredData = filteredData.filter(
        (item) => item.nome?.toLowerCase().includes(searchTerm) || item.cnpj?.includes(searchTerm)
      );
    }
    const page = params.page || 1;
    const pageSize = params.limit || defaultPageSize;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    return {
      data: paginatedData,
      total: filteredData.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredData.length / pageSize)
    };
  }
  async function fetchFunction(params) {
    if (config.baseEndpoint === "/contratadas") {
      try {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.search) queryParams.append("nome", params.search);
        if (params.ativo !== void 0 && params.ativo !== "") {
          queryParams.append("ativa", String(params.ativo));
        }
        const endpoint = `/contratadas?${queryParams.toString()}`;
        console.log("🌐 Fetching contratadas from:", `/api${endpoint}`);
        const result = await api.get(endpoint);
        console.log("📦 Contratadas response:", result);
        console.log("📦 Data array:", result.data);
        console.log("📦 Data length:", result.data?.length);
        if (!result.success) {
          throw new Error(result.message || "Erro na resposta da API");
        }
        const contratadas = result.data.contratadas || result.data;
        const total = result.data.total || result.data.length;
        const contratadasComStatus = contratadas.map((contratada) => ({
          ...contratada,
          ativo: contratada.ativo !== void 0 ? contratada.ativo : true
        }));
        return {
          data: contratadasComStatus,
          total,
          page: params.page || 1,
          pageSize: params.limit || 10,
          totalPages: Math.ceil(total / (params.limit || 10))
        };
      } catch (error) {
        console.error("❌ Erro ao buscar contratadas:", error);
        return getFallbackContratadas(params);
      }
    } else if (config.baseEndpoint === "/colaboradores") {
      try {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.search) queryParams.append("nome", params.search);
        if (params.contratadaId)
          queryParams.append("contratadaId", params.contratadaId);
        if (params.ativo !== void 0 && params.ativo !== "") {
          queryParams.append("ativo", String(params.ativo));
        }
        const endpoint = `/colaboradores?${queryParams.toString()}`;
        console.log("🌐 Fetching colaboradores from:", `/api${endpoint}`);
        const result = await api.get(endpoint);
        console.log("📦 Colaboradores response:", result);
        if (!result.success) {
          throw new Error(result.message || "Erro na resposta da API");
        }
        const colaboradores = result.data.colaboradores || result.data || [];
        const total = result.data.total || result.data.length || 0;
        const colaboradoresComStatus = colaboradores.map(
          (colaborador) => ({
            ...colaborador,
            ativo: colaborador.ativo !== void 0 ? colaborador.ativo : true
          })
        );
        return {
          data: colaboradoresComStatus,
          total,
          page: params.page || 1,
          pageSize: params.limit || 10,
          totalPages: Math.ceil(total / (params.limit || 10))
        };
      } catch (error) {
        console.error("❌ Erro ao buscar colaboradores:", error);
        await new Promise((resolve) => setTimeout(resolve, 300));
        const mockData = [
          {
            id: "1",
            nome: "João Silva Santos",
            cpf: "12345678901",
            email: "joao.silva@abc.com.br",
            cargo: "Operador de Máquinas",
            contratada: {
              id: "751c35a3-09dd-42bc-bc96-58ca036525fd",
              nome: "Beta Serviços e Construções S.A."
            },
            contratadaId: "751c35a3-09dd-42bc-bc96-58ca036525fd",
            dataAdmissao: "2023-01-15",
            ativo: true,
            temFichaAtiva: true,
            createdAt: "2023-01-15T10:00:00Z"
          },
          {
            id: "2",
            nome: "Maria Santos Oliveira",
            cpf: "98765432109",
            email: "maria.santos@techsolutions.com",
            cargo: "Técnica de Segurança",
            contratada: {
              id: "70e382b6-7cdb-41f6-acc8-80dfc4110861",
              nome: "Claude Test Company LTDA"
            },
            contratadaId: "70e382b6-7cdb-41f6-acc8-80dfc4110861",
            dataAdmissao: "2023-03-10",
            ativo: true,
            temFichaAtiva: true,
            createdAt: "2023-03-10T10:00:00Z"
          },
          {
            id: "3",
            nome: "Carlos Pereira Lima",
            cpf: "11122233344",
            email: "carlos.pereira@gamma.com.br",
            cargo: "Engenheiro",
            contratada: {
              id: "fbbcd5fc-2bd8-4a38-a54b-46d90cb696b8",
              nome: "Gamma Engenharia e Consultoria"
            },
            contratadaId: "fbbcd5fc-2bd8-4a38-a54b-46d90cb696b8",
            dataAdmissao: "2023-05-20",
            ativo: true,
            temFichaAtiva: false,
            createdAt: "2023-05-20T10:00:00Z"
          }
        ];
        let filteredData = [...mockData];
        if (params.search) {
          const searchTerm = params.search.toLowerCase();
          filteredData = filteredData.filter(
            (item) => item.nome?.toLowerCase().includes(searchTerm) || item.cpf?.includes(searchTerm) || item.email?.toLowerCase().includes(searchTerm)
          );
        }
        if (params.contratadaId) {
          filteredData = filteredData.filter(
            (item) => item.contratadaId === params.contratadaId
          );
        }
        const page = params.page || 1;
        const pageSize = params.limit || defaultPageSize;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        return {
          data: paginatedData,
          total: filteredData.length,
          page,
          pageSize,
          totalPages: Math.ceil(filteredData.length / pageSize)
        };
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const mockData = [
        {
          id: "1",
          nome: "Item Mock 1",
          createdAt: "2023-01-15T10:00:00Z"
        },
        {
          id: "2",
          nome: "Item Mock 2",
          createdAt: "2023-03-10T10:00:00Z"
        }
      ];
      return {
        data: mockData,
        total: mockData.length,
        page: params.page || 1,
        pageSize: params.limit || defaultPageSize,
        totalPages: Math.ceil(
          mockData.length / (params.limit || defaultPageSize)
        )
      };
    }
  }
  const baseStore = createPaginatedStore(fetchFunction, {
    initialPageSize: defaultPageSize,
    enableCache: true,
    debounceDelay
  });
  let currentFilters = {};
  function addItem(item) {
    console.log("➕ Adicionando item:", item);
  }
  function updateItem(id, updates) {
    console.log("✏️ Atualizando item:", id, updates);
  }
  function removeItem(id) {
    console.log("🗑️ Removendo item:", id);
  }
  async function prefetchNext() {
    if (baseStore.hasNext()) {
      console.log("📄 Pré-carregando próxima página...");
      await baseStore.nextPage();
    }
  }
  async function loadData() {
    await baseStore.fetchPage();
  }
  async function setPage(page) {
    await baseStore.goToPage(page);
  }
  async function setFilter(key, value) {
    currentFilters[key] = value;
    await baseStore.setFilters(currentFilters);
  }
  async function clearFilters() {
    currentFilters = {};
    await baseStore.setFilters({});
  }
  async function refresh() {
    await baseStore.reload();
  }
  async function setPageSize(size) {
    await baseStore.fetchPage({ limit: size, page: 1 });
  }
  async function create(data) {
    if (config.baseEndpoint === "/contratadas") {
      try {
        console.log("🆕 Criando contratada:", data);
        const result = await api.post("/contratadas", data);
        console.log("✅ Contratada criada:", result);
        if (!result.success) {
          throw new Error(result.message || "Erro ao criar contratada");
        }
        await refresh();
        return result.data;
      } catch (error) {
        console.error("❌ Erro ao criar contratada:", error);
        throw error;
      }
    } else if (config.baseEndpoint === "/colaboradores") {
      try {
        console.log("🆕 Criando colaborador:", data);
        const colaboradorData = data;
        if (colaboradorData.cpf && !isValidCPF(colaboradorData.cpf)) {
          throw new Error("CPF inválido. Verifique o formato e os dígitos verificadores.");
        }
        if (!colaboradorData.contratadaId) {
          throw new Error("Contratada é obrigatória. Selecione uma contratada válida.");
        }
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(colaboradorData.contratadaId)) {
          throw new Error("ID da contratada inválido. Selecione uma contratada válida da lista.");
        }
        const payload = {
          ...colaboradorData,
          cpf: colaboradorData.cpf ? colaboradorData.cpf.replace(/\D/g, "") : void 0
        };
        const result = await api.post("/colaboradores", payload);
        console.log("✅ Colaborador criado:", result);
        if (!result.success) {
          throw new Error(result.message || "Erro ao criar colaborador");
        }
        await refresh();
        return result.data;
      } catch (error) {
        console.error("❌ Erro ao criar colaborador:", error);
        throw error;
      }
    } else {
      throw new Error("Método create não implementado para este endpoint");
    }
  }
  async function update(id, data) {
    if (config.baseEndpoint === "/contratadas") {
      try {
        console.log("✏️ Atualizando contratada:", id, data);
        const result = await api.put(`/contratadas/${id}`, data);
        console.log("✅ Contratada atualizada:", result);
        if (!result.success) {
          throw new Error(result.message || "Erro ao atualizar contratada");
        }
        await refresh();
        return result.data;
      } catch (error) {
        console.error("❌ Erro ao atualizar contratada:", error);
        throw error;
      }
    } else if (config.baseEndpoint === "/colaboradores") {
      try {
        console.log("✏️ Atualizando colaborador:", id, data);
        const result = await api.put(`/colaboradores/${id}`, data);
        console.log("✅ Colaborador atualizado:", result);
        if (!result.success) {
          throw new Error(result.message || "Erro ao atualizar colaborador");
        }
        await refresh();
        return result.data;
      } catch (error) {
        console.error("❌ Erro ao atualizar colaborador:", error);
        throw error;
      }
    } else {
      throw new Error("Método update não implementado para este endpoint");
    }
  }
  async function deleteItem(id) {
    if (config.baseEndpoint === "/contratadas") {
      try {
        console.log("🗑️ Excluindo contratada:", id);
        const result = await api.delete(`/contratadas/${id}`);
        console.log("✅ Contratada excluída:", result);
        if (!result.success) {
          throw new Error(result.message || "Erro ao excluir contratada");
        }
        await refresh();
        return true;
      } catch (error) {
        console.error("❌ Erro ao excluir contratada:", error);
        throw error;
      }
    } else if (config.baseEndpoint === "/colaboradores") {
      try {
        console.log("🗑️ Excluindo colaborador:", id);
        const result = await api.delete(`/colaboradores/${id}`);
        console.log("✅ Colaborador excluído:", result);
        if (!result.success) {
          throw new Error(result.message || "Erro ao excluir colaborador");
        }
        await refresh();
        return true;
      } catch (error) {
        console.error("❌ Erro ao excluir colaborador:", error);
        throw error;
      }
    } else {
      throw new Error("Método delete não implementado para este endpoint");
    }
  }
  async function loadContratadas() {
    try {
      console.log("🏢 Carregando contratadas do backend...");
      const { contratadasAdapter } = await import("./contratadasAdapter.js");
      const response = await contratadasAdapter.getContratadas({
        page: 1,
        limit: 100
        // Carregar todas as contratadas para filtro
      });
      console.log("✅ Contratadas carregadas:", response.data?.length || 0);
      return response.data || [];
    } catch (error) {
      console.warn("⚠️ Erro ao carregar contratadas, usando fallback:", error);
      return [
        {
          id: "751c35a3-09dd-42bc-bc96-58ca036525fd",
          nome: "Beta Serviços e Construções S.A."
        },
        {
          id: "70e382b6-7cdb-41f6-acc8-80dfc4110861",
          nome: "Claude Test Company LTDA"
        },
        {
          id: "610921f5-2579-4f2a-9a9c-8544f95fdbad",
          nome: "Empresa Contratada Alpha LTDA"
        },
        {
          id: "fbbcd5fc-2bd8-4a38-a54b-46d90cb696b8",
          nome: "Gamma Engenharia e Consultoria"
        }
      ];
    }
  }
  let filterOptions = {
    contratadas: []
  };
  if (config.filterEndpoints?.contratadas) {
    loadContratadas().then((contratadas) => {
      filterOptions.contratadas = contratadas;
      derivedState = {
        ...derivedState,
        filterOptions: { ...filterOptions }
      };
      console.log("🔄 FilterOptions atualizadas:", filterOptions);
    });
  }
  let derivedState = {
    data: [],
    pagination: {
      currentPage: 1,
      itemsPerPage: defaultPageSize,
      totalItems: 0,
      totalPages: 0
    },
    filters: currentFilters,
    filterOptions
  };
  baseStore.subscribe((state) => {
    derivedState = {
      data: state.items,
      pagination: {
        currentPage: state.page,
        itemsPerPage: state.pageSize,
        totalItems: state.total,
        totalPages: state.totalPages
      },
      filters: currentFilters,
      filterOptions
    };
    console.log("🔄 Store state updated:", {
      itemsLength: state.items?.length || 0,
      total: state.total,
      loading: state.loading,
      error: state.error
    });
  });
  return {
    ...baseStore,
    get data() {
      return derivedState.data;
    },
    get pagination() {
      return derivedState.pagination;
    },
    get filters() {
      return derivedState.filters;
    },
    get filterOptions() {
      return derivedState.filterOptions;
    },
    addItem,
    updateItem,
    removeItem,
    prefetchNext,
    loadData,
    setPage,
    setFilter,
    clearFilters,
    refresh,
    setPageSize,
    create,
    update,
    delete: deleteItem
  };
}
const LOADING_TEXTS = {
  default: "Carregando...",
  processing: "Processando...",
  saving: "Salvando...",
  deleting: "Excluindo...",
  creating: "Criando...",
  updating: "Atualizando...",
  searching: "Buscando...",
  loading: "Carregando...",
  signing: "Assinando...",
  uploading: "Enviando...",
  downloading: "Baixando..."
};
const LoadingSpinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let displayText;
  let { size = "md" } = $$props;
  let { color = "primary" } = $$props;
  let { text = LOADING_TEXTS.default } = $$props;
  let { loadingType = void 0 } = $$props;
  let { fullScreen = false } = $$props;
  let { inline = false } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0) $$bindings.text(text);
  if ($$props.loadingType === void 0 && $$bindings.loadingType && loadingType !== void 0) $$bindings.loadingType(loadingType);
  if ($$props.fullScreen === void 0 && $$bindings.fullScreen && fullScreen !== void 0) $$bindings.fullScreen(fullScreen);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  displayText = loadingType ? LOADING_TEXTS[loadingType] : text;
  return `${fullScreen ? `<div class="fixed inset-0 bg-gray-50 dark:bg-gray-900 flex items-center justify-center z-50"><div class="text-center">${validate_component(Spinner, "Spinner").$$render($$result, { size, color, class: "mb-4" }, {}, {})} <p class="text-gray-600 dark:text-gray-400">${escape(displayText)}</p></div></div>` : `${inline ? `<div class="flex items-center space-x-2">${validate_component(Spinner, "Spinner").$$render($$result, { size, color }, {}, {})} <span class="text-sm text-gray-600 dark:text-gray-400">${escape(displayText)}</span></div>` : `<div class="flex flex-col items-center justify-center py-12 px-4"><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 max-w-sm"><div class="flex flex-col items-center text-center">${validate_component(Spinner, "Spinner").$$render($$result, { size, color, class: "mb-3" }, {}, {})} <p class="text-sm text-gray-600 dark:text-gray-400">${escape(displayText)}</p></div></div></div>`}`}`;
});
const ErrorDisplay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let errorMessage;
  let { error = null } = $$props;
  let { title = "Ops! Algo deu errado" } = $$props;
  let { showRetry = true } = $$props;
  let { retryText = "Tentar Novamente" } = $$props;
  let { onRetry = null } = $$props;
  let { fullHeight = false } = $$props;
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.showRetry === void 0 && $$bindings.showRetry && showRetry !== void 0) $$bindings.showRetry(showRetry);
  if ($$props.retryText === void 0 && $$bindings.retryText && retryText !== void 0) $$bindings.retryText(retryText);
  if ($$props.onRetry === void 0 && $$bindings.onRetry && onRetry !== void 0) $$bindings.onRetry(onRetry);
  if ($$props.fullHeight === void 0 && $$bindings.fullHeight && fullHeight !== void 0) $$bindings.fullHeight(fullHeight);
  errorMessage = error instanceof Error ? error.message : error || "Erro desconhecido";
  return `<div class="${"flex items-center justify-center " + escape(fullHeight ? "min-h-96" : "p-8", true)}"><div class="w-full max-w-md">${validate_component(Alert, "Alert").$$render(
    $$result,
    {
      color: "red",
      class: "border-l-4 border-red-500"
    },
    {},
    {
      icon: () => {
        return `${validate_component(ExclamationCircleOutline, "ExclamationCircleOutline").$$render($$result, { slot: "icon", class: "w-4 h-4" }, {}, {})}`;
      },
      default: () => {
        return `<span class="font-medium">${escape(title)}</span> <div class="mt-2 mb-4 text-sm"><p>${escape(errorMessage)}</p></div> ${showRetry && onRetry ? `<div class="flex">${validate_component(Button, "Button").$$render(
          $$result,
          {
            size: "sm",
            color: "red",
            class: "rounded-sm"
          },
          {},
          {
            default: () => {
              return `${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})} ${escape(retryText)}`;
            }
          }
        )}</div>` : ``}`;
      }
    }
  )}</div></div>`;
});
export {
  Alert as A,
  ErrorDisplay as E,
  LoadingSpinner as L,
  RefreshOutline as R,
  Table as T,
  TableHead as a,
  TableHeadCell as b,
  TableBody as c,
  TableBodyRow as d,
  TableBodyCell as e,
  createPaginatedStore as f,
  createAdvancedPaginatedStore as g,
  isValidCNPJ as i
};
