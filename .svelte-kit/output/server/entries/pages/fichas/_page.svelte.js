import { c as create_ssr_component, a as compute_rest_props, j as getContext, d as spread, g as add_attribute, h as escape, f as escape_attribute_value, e as escape_object, i as createEventDispatcher, v as validate_component, l as each, b as compute_slots, k as subscribe } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import "../../../chunks/client.js";
import { U as UIMappingHelpers, f as fichaQueryAdapter } from "../../../chunks/uiMappingHelpers.js";
import { a as Button, B as Badge } from "../../../chunks/Button.js";
import { L as LoadingSpinner, E as ErrorDisplay, R as RefreshOutline, T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, g as Label, f as TrashBinOutline, S as Select, h as createPaginatedStore } from "../../../chunks/ErrorDisplay.js";
import { I as Input, a as notify } from "../../../chunks/modalStore.js";
import { C as Card } from "../../../chunks/Card.js";
import { C as Checkbox } from "../../../chunks/Checkbox.js";
import { S as SearchOutline, a as SearchableDropdown, E as EyeOutline, b as DrawerHeader, T as Textarea, D as Drawer } from "../../../chunks/DrawerHeader.js";
import { P as PlusOutline, I as Icon } from "../../../chunks/Icon.js";
import { w as writable } from "../../../chunks/index.js";
import { E as ExclamationCircleOutline } from "../../../chunks/ExclamationCircleOutline.js";
import { C as CheckOutline } from "../../../chunks/CheckOutline.js";
import { C as CheckCircleOutline } from "../../../chunks/CheckCircleOutline.js";
import { f as formatarData } from "../../../chunks/dateHelpers.js";
import { twMerge } from "tailwind-merge";
const FileLinesOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "file lines outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"></path></svg>`} `;
});
const GlobeOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "globe outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>`} `;
});
const PrinterOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "printer outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"></path></svg>`} `;
});
const QrCodeOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "qr code outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M4 4h6v6H4V4Zm10 10h6v6h-6v-6Zm0-10h6v6h-6V4Zm-4 10h.01v.01H10V14Zm0 4h.01v.01H10V18Zm-3 2h.01v.01H7V20Zm0-4h.01v.01H7V16Zm-3 2h.01v.01H4V18Zm0-4h.01v.01H4V14Z"></path><path stroke="currentColor" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M7 7h.01v.01H7V7Zm10 10h.01v.01H17V17Z"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M4 4h6v6H4V4Zm10 10h6v6h-6v-6Zm0-10h6v6h-6V4Zm-4 10h.01v.01H10V14Zm0 4h.01v.01H10V18Zm-3 2h.01v.01H7V20Zm0-4h.01v.01H7V16Zm-3 2h.01v.01H4V18Zm0-4h.01v.01H4V14Z"></path><path stroke="currentColor" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M7 7h.01v.01H7V7Zm10 10h.01v.01H17V17Z"></path></svg>`} `;
});
const TabletOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "tablet outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M11 18h2M5.875 3h12.25c.483 0 .875.448.875 1v16c0 .552-.392 1-.875 1H5.875C5.392 21 5 20.552 5 20V4c0-.552.392-1 .875-1Z"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M11 18h2M5.875 3h12.25c.483 0 .875.448.875 1v16c0 .552-.392 1-.875 1H5.875C5.392 21 5 20.552 5 20V4c0-.552.392-1 .875-1Z"></path></svg>`} `;
});
function formatarCPF(cpf) {
  if (!cpf || cpf === "CPF não disponível" || cpf === "") {
    return "CPF não disponível";
  }
  const numeros = cpf.replace(/\D/g, "");
  if (numeros.length !== 11) {
    return cpf.includes("não") ? cpf : "CPF inválido";
  }
  return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
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
  )}` : `${items.length > 0 ? ` <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"> <div class="p-4 border-b border-gray-200 dark:border-gray-700"><div class="grid grid-cols-1 md:grid-cols-5 gap-4 relative"> <div class="relative">${validate_component(SearchOutline, "SearchOutline").$$render(
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
      placeholder: "Buscar por nome, CPF ou matrícula...",
      class: "pl-10 rounded-sm h-10 text-sm",
      value: filters.searchTerm
    },
    {},
    {}
  )}</div>  <div class="relative z-10">${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
    $$result,
    {
      options: filterOptions.empresas,
      value: filters.empresaFilter,
      placeholder: "Empresa",
      color: "alternative"
    },
    {},
    {}
  )}</div>  <div class="relative z-10">${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
    $$result,
    {
      options: filterOptions.cargos,
      value: filters.cargoFilter,
      placeholder: "Cargo",
      color: "alternative"
    },
    {},
    {}
  )}</div>  <div class="flex items-center">${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: filters.devolucaoPendente }, {}, {
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
                      return `<div class="flex flex-col"><span class="font-medium text-gray-900 dark:text-white">${escape(ficha.colaborador.nome)}</span> <span class="text-sm text-gray-500 dark:text-gray-400">${escape(formatarCPF(ficha.colaborador.cpf))}</span> ${ficha.colaborador.matricula ? `<span class="text-xs text-gray-400 dark:text-gray-500">Matrícula: ${escape(ficha.colaborador.matricula)} </span>` : ``}</div> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<div><span class="font-medium text-gray-900 dark:text-white">${escape(ficha.colaborador.empresa || "Empresa não informada")}</span> ${ficha.colaborador.cargo ? `<div class="text-sm text-gray-500 dark:text-gray-400">${escape(ficha.colaborador.cargo)} </div>` : ``}</div> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<div class="flex flex-wrap gap-1">${validate_component(Badge, "Badge").$$render($$result, { color: "blue", class: "w-fit rounded-sm" }, {}, {
                        default: () => {
                          return `${escape(ficha.episInfo?.totalEpisComColaborador || ficha.totalEpisAtivos || 0)} EPIs
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
const fichaDataStore = writable(/* @__PURE__ */ new Map());
const EmptyState = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let iconSizes;
  let paddingSizes;
  let { icon } = $$props;
  let { message } = $$props;
  let { description = "" } = $$props;
  let { size = "md" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  iconSizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };
  paddingSizes = { sm: "py-4", md: "py-8", lg: "py-12" };
  return `<div class="${"text-center " + escape(paddingSizes[size], true) + " text-gray-500 dark:text-gray-400"}">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      name: icon,
      class: iconSizes[size] + " mx-auto mb-2 text-gray-400 dark:text-gray-500"
    },
    {},
    {}
  )} <p class="font-medium text-sm">${escape(message)}</p> ${description ? `<p class="text-xs mt-1 text-gray-400 dark:text-gray-500">${escape(description)}</p>` : ``}  ${slots.actions ? slots.actions({}) : ``}</div>`;
});
const ItemCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cardClasses;
  let $$slots = compute_slots(slots);
  let { className = "" } = $$props;
  let { hoverable = false } = $$props;
  let { clickable = false } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.hoverable === void 0 && $$bindings.hoverable && hoverable !== void 0) $$bindings.hoverable(hoverable);
  if ($$props.clickable === void 0 && $$bindings.clickable && clickable !== void 0) $$bindings.clickable(clickable);
  cardClasses = [
    "border border-gray-200 dark:border-gray-700 rounded-sm p-4",
    hoverable ? "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" : "",
    clickable ? "cursor-pointer" : "",
    className
  ].filter(Boolean).join(" ");
  return `<div${add_attribute("class", cardClasses, 0)}><div class="flex justify-between items-start"><div class="flex-1 min-w-0">${slots.content ? slots.content({}) : ``}</div> ${$$slots.actions ? `<div class="flex-shrink-0 ml-4">${slots.actions ? slots.actions({}) : ``}</div>` : ``}</div>  ${slots.footer ? slots.footer({}) : ``}</div>`;
});
const css$4 = {
  code: ".custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar{width:8px}.custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-track{background:transparent;border-radius:8px}.custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:8px;border:2px solid transparent;background-clip:content-box}.dark .custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-thumb{background:#4b5563;background-clip:content-box}",
  map: '{"version":3,"file":"NovaEntregaDrawerPresenter.svelte","sources":["NovaEntregaDrawerPresenter.svelte"],"sourcesContent":["<!--\\n  Nova Entrega Drawer Presenter - Componente \\"Burro\\"\\n  \\n  Presenter especializado para o formulário de nova entrega:\\n  - Recebe dados via props\\n  - Renderiza formulário com validação visual\\n  - Emite eventos para o Container\\n  - Mantém layout original\\n-->\\n\\n<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport { Button, Input, Label } from \\"flowbite-svelte\\";\\nimport { PlusOutline, TrashBinOutline, CheckOutline, CloseOutline, ExclamationCircleOutline } from \\"flowbite-svelte-icons\\";\\nimport SearchableDropdown from \\"$lib/components/common/SearchableDropdown.svelte\\";\\nimport DrawerHeader from \\"$lib/components/common/DrawerHeader.svelte\\";\\nexport let episDisponiveis = [];\\nexport let usuarios = [];\\nexport let loading = false;\\nexport let show = false;\\nconst dispatch = createEventDispatcher();\\nlet responsavelEntrega = \\"\\";\\nlet usuarioResponsavelId = \\"\\";\\nlet itensSelecionados = [];\\n$: if (show && itensSelecionados.length === 0) {\\n  resetForm();\\n  adicionarItem();\\n}\\n$: if (usuarios.length > 0 && !usuarioResponsavelId) {\\n  usuarioResponsavelId = usuarios[0].id;\\n  responsavelEntrega = usuarios[0].nome;\\n}\\nfunction resetForm() {\\n  responsavelEntrega = \\"\\";\\n  usuarioResponsavelId = \\"\\";\\n  itensSelecionados = [];\\n}\\nfunction adicionarItem() {\\n  itensSelecionados = [...itensSelecionados, {\\n    episDisponivelId: \\"\\",\\n    nomeEquipamento: \\"\\",\\n    registroCA: \\"\\",\\n    quantidade: 1\\n  }];\\n}\\nfunction removerItem(index) {\\n  itensSelecionados = itensSelecionados.filter((_, i) => i !== index);\\n}\\nfunction atualizarEPI(index, episDisponivelId) {\\n  const epiSelecionado = episDisponiveis.find((epi) => epi.id === episDisponivelId);\\n  if (epiSelecionado) {\\n    itensSelecionados[index] = {\\n      ...itensSelecionados[index],\\n      episDisponivelId,\\n      nomeEquipamento: epiSelecionado.nomeEquipamento,\\n      registroCA: epiSelecionado.numeroCA || epiSelecionado.registroCA\\n    };\\n  }\\n}\\nfunction atualizarQuantidade(index, quantidade) {\\n  itensSelecionados[index] = {\\n    ...itensSelecionados[index],\\n    quantidade\\n  };\\n}\\nfunction atualizarUsuario(usuarioId) {\\n  const usuarioSelecionado = usuarios.find((user) => user.id === usuarioId);\\n  if (usuarioSelecionado) {\\n    usuarioResponsavelId = usuarioId;\\n    responsavelEntrega = usuarioSelecionado.nome;\\n  }\\n}\\nfunction validateForm() {\\n  return usuarioResponsavelId.trim() && itensSelecionados.length > 0 && itensSelecionados.every((item) => item.episDisponivelId && item.quantidade > 0);\\n}\\nfunction handleSalvar() {\\n  console.log(\\"\\\\u{1F4DD} NovaEntregaDrawer: Preparando dados do formul\\\\xE1rio...\\");\\n  console.log(\\"\\\\u{1F4CB} Itens selecionados originais:\\", itensSelecionados);\\n  console.log(\\"\\\\u{1F464} Usuario respons\\\\xE1vel ID:\\", usuarioResponsavelId);\\n  console.log(\\"\\\\u{1F4E6} Validando itens...\\");\\n  if (!usuarioResponsavelId.trim()) {\\n    console.error(\\"\\\\u274C Erro: usu\\\\xE1rio respons\\\\xE1vel n\\\\xE3o selecionado\\");\\n    return;\\n  }\\n  if (itensSelecionados.length === 0) {\\n    console.error(\\"\\\\u274C Erro: nenhum item selecionado\\");\\n    return;\\n  }\\n  const itensValidos = itensSelecionados.filter((item) => item.episDisponivelId && item.quantidade > 0);\\n  if (itensValidos.length === 0) {\\n    console.error(\\"\\\\u274C Erro: nenhum item v\\\\xE1lido selecionado\\");\\n    return;\\n  }\\n  const formData = {\\n    responsavel: responsavelEntrega.trim(),\\n    usuarioResponsavelId: usuarioResponsavelId.trim(),\\n    itens: itensValidos.map((item) => ({\\n      episDisponivelId: item.episDisponivelId,\\n      nomeEquipamento: item.nomeEquipamento,\\n      registroCA: item.registroCA,\\n      quantidade: item.quantidade\\n    }))\\n  };\\n  console.log(\\"\\\\u2705 FormData montado:\\", {\\n    responsavel: formData.responsavel,\\n    usuarioId: formData.usuarioResponsavelId,\\n    totalItens: formData.itens.length,\\n    itens: formData.itens.map((item, index) => ({\\n      index: index + 1,\\n      id: item.episDisponivelId,\\n      nome: item.nomeEquipamento,\\n      ca: item.registroCA,\\n      quantidade: item.quantidade\\n    }))\\n  });\\n  const tiposUnicos = new Set(formData.itens.map((item) => item.episDisponivelId));\\n  console.log(`\\\\u{1F3AF} Verifica\\\\xE7\\\\xE3o de tipos \\\\xFAnicos: ${tiposUnicos.size} tipos \\\\xFAnicos de ${formData.itens.length} itens totais`);\\n  if (tiposUnicos.size < formData.itens.length) {\\n    console.warn(\\"\\\\u26A0\\\\uFE0F ALERTA: Alguns itens t\\\\xEAm o mesmo episDisponivelId - isso pode causar problemas na expans\\\\xE3o\\");\\n  }\\n  dispatch(\\"salvar\\", formData);\\n}\\nfunction handleCancelar() {\\n  dispatch(\\"cancelar\\");\\n}\\n$: episOptions = [\\n  { value: \\"\\", label: \\"Selecione um EPI...\\" },\\n  ...episDisponiveis.map((epi) => ({\\n    value: epi.id,\\n    label: `${epi.nomeEquipamento} (CA ${epi.numeroCA || epi.registroCA}) - ${epi.quantidadeDisponivel} dispon\\\\xEDveis`\\n  }))\\n];\\n$: if (episDisponiveis?.length > 0) {\\n  console.log(\\"\\\\u{1F3AF} NovaEntregaDrawer: EPIs dispon\\\\xEDveis atualizados:\\", episDisponiveis.length);\\n  console.log(\\"\\\\u{1F4E6} Amostra de EPIs no drawer:\\", episDisponiveis.slice(0, 2));\\n  console.log(\\"\\\\u{1F527} Op\\\\xE7\\\\xF5es do select:\\", episOptions.slice(0, 3));\\n}\\n$: usuarioOptions = [\\n  { value: \\"\\", label: \\"Selecione um respons\\\\xE1vel...\\" },\\n  ...usuarios.map((user) => ({\\n    value: user.id,\\n    label: `${user.nome} (${user.email})`\\n  }))\\n];\\n$: canSave = usuarioResponsavelId.trim() && itensSelecionados.length > 0 && !loading && episDisponiveis.length > 0;\\n<\/script>\\n\\n{#if show}\\n  <!-- Overlay -->\\n  <div \\n    class=\\"fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity\\"\\n    on:click={handleCancelar}\\n    role=\\"presentation\\"\\n  ></div>\\n\\n  <!-- Drawer -->\\n  <div \\n    class=\\"fixed top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out\\"\\n    on:click|stopPropagation\\n    role=\\"dialog\\"\\n    aria-modal=\\"true\\"\\n  >\\n    \\n    <!-- Header -->\\n    <DrawerHeader \\n      title=\\"Nova Entrega de EPI\\"\\n      objectType=\\"NOVA ENTREGA\\"\\n      iconName=\\"PlusOutline\\"\\n      primaryAction={{\\n        text: loading ? \'Salvando...\' : \'Criar Entrega\',\\n        icon: loading ? \'\' : \'CheckOutline\',\\n        disabled: !canSave\\n      }}\\n      secondaryAction={{\\n        text: \'Cancelar\',\\n        disabled: loading\\n      }}\\n      on:close={handleCancelar}\\n      on:primaryAction={handleSalvar}\\n      on:secondaryAction={handleCancelar}\\n    />\\n\\n    <!-- Content -->\\n    <div class=\\"overflow-y-auto custom-scrollbar p-6\\" style=\\"height: calc(100% - 80px);\\">\\n        \\n        <!-- Responsável -->\\n        <div class=\\"mb-6\\">\\n          <Label for=\\"responsavel\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n            Responsável pela Entrega *\\n          </Label>\\n          <SearchableDropdown\\n            options={usuarioOptions}\\n            value={usuarioResponsavelId}\\n            placeholder=\\"Selecione um responsável...\\"\\n            disabled={loading}\\n            on:change={(e) => atualizarUsuario(e.detail)}\\n          />\\n        </div>\\n\\n        <!-- EPIs para Entrega -->\\n        <div class=\\"mb-6\\">\\n          <div class=\\"flex items-center justify-between mb-4\\">\\n            <Label class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n              EPIs para Entrega *\\n            </Label>\\n            <Button\\n              size=\\"xs\\"\\n              color=\\"alternative\\"\\n              class=\\"rounded-sm\\"\\n              on:click={adicionarItem}\\n              disabled={loading}\\n            >\\n              <PlusOutline class=\\"w-4 h-4 mr-2\\" />\\n              Adicionar Item\\n            </Button>\\n          </div>\\n\\n\\n          {#if episDisponiveis.length === 0}\\n            <div class=\\"p-4 border-2 border-dashed border-red-300 rounded-lg bg-red-50 dark:bg-red-900/20\\">\\n              <div class=\\"text-center\\">\\n                <ExclamationCircleOutline class=\\"mx-auto mb-2 text-red-500 w-8 h-8\\" />\\n                <h4 class=\\"text-sm font-medium text-red-800 dark:text-red-200 mb-1\\">\\n                  Nenhum EPI Disponível\\n                </h4>\\n                <p class=\\"text-sm text-red-600 dark:text-red-400\\">\\n                  Não há EPIs disponíveis para entrega no momento. Verifique o estoque ou entre em contato com o administrador.\\n                </p>\\n              </div>\\n            </div>\\n          {:else}\\n            <div class=\\"space-y-4\\">\\n              {#each itensSelecionados as item, index}\\n                <div class=\\"border border-gray-200 dark:border-gray-700 rounded-lg p-4\\">\\n                <div class=\\"flex items-start justify-between mb-4\\">\\n                  <h4 class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                    Item {index + 1}\\n                  </h4>\\n                  {#if itensSelecionados.length > 1}\\n                    <button\\n                      class=\\"text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300\\"\\n                      on:click={() => removerItem(index)}\\n                      disabled={loading}\\n                      title=\\"Remover item\\"\\n                    >\\n                      <TrashBinOutline class=\\"w-4 h-4\\" />\\n                    </button>\\n                  {/if}\\n                </div>\\n\\n                <div class=\\"grid grid-cols-1 md:grid-cols-3 gap-4\\">\\n                  <!-- EPI Selection -->\\n                  <div class=\\"md:col-span-2\\">\\n                    <Label for=\\"epi-{index}\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n                      Equipamento\\n                    </Label>\\n                    <SearchableDropdown\\n                      options={episOptions}\\n                      value={item.episDisponivelId}\\n                      placeholder=\\"Selecione um EPI...\\"\\n                      disabled={loading}\\n                      on:change={(e) => atualizarEPI(index, e.detail)}\\n                    />\\n                  </div>\\n\\n                  <!-- Quantidade -->\\n                  <div>\\n                    <Label for=\\"quantidade-{index}\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n                      Quantidade\\n                    </Label>\\n                    <Input\\n                      id=\\"quantidade-{index}\\"\\n                      type=\\"number\\"\\n                      min=\\"1\\"\\n                      max=\\"100\\"\\n                      bind:value={item.quantidade}\\n                      on:input={(e) => atualizarQuantidade(index, parseInt(e.target.value) || 1)}\\n                      class=\\"rounded-sm\\"\\n                      disabled={loading}\\n                    />\\n                  </div>\\n                </div>\\n\\n                <!-- Preview do EPI selecionado -->\\n                {#if item.nomeEquipamento}\\n                  <div class=\\"mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-sm\\">\\n                    <div class=\\"flex items-center justify-between\\">\\n                      <div>\\n                        <p class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                          {item.nomeEquipamento}\\n                        </p>\\n                        <p class=\\"text-xs text-gray-500 dark:text-gray-400\\">\\n                          CA {item.registroCA}\\n                        </p>\\n                      </div>\\n                      <div class=\\"text-right\\">\\n                        <p class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                          Qtd: {item.quantidade}\\n                        </p>\\n                      </div>\\n                    </div>\\n                  </div>\\n                {/if}\\n              </div>\\n            {/each}\\n\\n            <!-- Add first item button if no items -->\\n            {#if itensSelecionados.length === 0}\\n              <div class=\\"border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center\\">\\n                <PlusOutline class=\\"w-8 h-8 mx-auto mb-3 text-gray-400\\" />\\n                <p class=\\"text-sm text-gray-500 dark:text-gray-400 mb-4\\">\\n                  Nenhum item adicionado\\n                </p>\\n                <Button\\n                  size=\\"sm\\"\\n                  color=\\"alternative\\"\\n                  class=\\"rounded-sm\\"\\n                  on:click={adicionarItem}\\n                  disabled={loading}\\n                >\\n                  Adicionar Primeiro Item\\n                </Button>\\n              </div>\\n            {/if}\\n            </div>\\n          {/if}\\n        </div>\\n\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>\\n  /* Scrollbar customization */\\n  .custom-scrollbar::-webkit-scrollbar {\\n    width: 8px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-track {\\n    background: transparent;\\n    border-radius: 8px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background: #e5e7eb;\\n    border-radius: 8px;\\n    border: 2px solid transparent;\\n    background-clip: content-box;\\n  }\\n  \\n  :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background: #4b5563;\\n    background-clip: content-box;\\n  }\\n</style>"],"names":[],"mappings":"AA6UE,+BAAiB,mBAAoB,CACnC,KAAK,CAAE,GACT,CAEA,+BAAiB,yBAA0B,CACzC,UAAU,CAAE,WAAW,CACvB,aAAa,CAAE,GACjB,CAEA,+BAAiB,yBAA0B,CACzC,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WAAW,CAC7B,eAAe,CAAE,WACnB,CAEQ,KAAM,CAAC,+BAAiB,yBAA0B,CACxD,UAAU,CAAE,OAAO,CACnB,eAAe,CAAE,WACnB"}'
};
const NovaEntregaDrawerPresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let episOptions;
  let usuarioOptions;
  let canSave;
  let { episDisponiveis = [] } = $$props;
  let { usuarios = [] } = $$props;
  let { loading = false } = $$props;
  let { show = false } = $$props;
  createEventDispatcher();
  let usuarioResponsavelId = "";
  let itensSelecionados = [];
  function resetForm() {
    usuarioResponsavelId = "";
    itensSelecionados = [];
  }
  function adicionarItem() {
    itensSelecionados = [
      ...itensSelecionados,
      {
        episDisponivelId: "",
        nomeEquipamento: "",
        registroCA: "",
        quantidade: 1
      }
    ];
  }
  if ($$props.episDisponiveis === void 0 && $$bindings.episDisponiveis && episDisponiveis !== void 0) $$bindings.episDisponiveis(episDisponiveis);
  if ($$props.usuarios === void 0 && $$bindings.usuarios && usuarios !== void 0) $$bindings.usuarios(usuarios);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  $$result.css.add(css$4);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (show && itensSelecionados.length === 0) {
        resetForm();
        adicionarItem();
      }
    }
    {
      if (usuarios.length > 0 && !usuarioResponsavelId) {
        usuarioResponsavelId = usuarios[0].id;
        usuarios[0].nome;
      }
    }
    episOptions = [
      { value: "", label: "Selecione um EPI..." },
      ...episDisponiveis.map((epi) => ({
        value: epi.id,
        label: `${epi.nomeEquipamento} (CA ${epi.numeroCA || epi.registroCA}) - ${epi.quantidadeDisponivel} disponíveis`
      }))
    ];
    {
      if (episDisponiveis?.length > 0) {
        console.log("🎯 NovaEntregaDrawer: EPIs disponíveis atualizados:", episDisponiveis.length);
        console.log("📦 Amostra de EPIs no drawer:", episDisponiveis.slice(0, 2));
        console.log("🔧 Opções do select:", episOptions.slice(0, 3));
      }
    }
    usuarioOptions = [
      {
        value: "",
        label: "Selecione um responsável..."
      },
      ...usuarios.map((user) => ({
        value: user.id,
        label: `${user.nome} (${user.email})`
      }))
    ];
    canSave = usuarioResponsavelId.trim() && itensSelecionados.length > 0 && !loading && episDisponiveis.length > 0;
    $$rendered = `  ${show ? ` <div class="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity" role="presentation"></div>  <div class="fixed top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out" role="dialog" aria-modal="true"> ${validate_component(DrawerHeader, "DrawerHeader").$$render(
      $$result,
      {
        title: "Nova Entrega de EPI",
        objectType: "NOVA ENTREGA",
        iconName: "PlusOutline",
        primaryAction: {
          text: loading ? "Salvando..." : "Criar Entrega",
          icon: loading ? "" : "CheckOutline",
          disabled: !canSave
        },
        secondaryAction: { text: "Cancelar", disabled: loading }
      },
      {},
      {}
    )}  <div class="overflow-y-auto custom-scrollbar p-6 svelte-ng7f9w" style="height: calc(100% - 80px);"> <div class="mb-6">${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "responsavel",
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      },
      {},
      {
        default: () => {
          return `Responsável pela Entrega *`;
        }
      }
    )} ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
      $$result,
      {
        options: usuarioOptions,
        value: usuarioResponsavelId,
        placeholder: "Selecione um responsável...",
        disabled: loading
      },
      {},
      {}
    )}</div>  <div class="mb-6"><div class="flex items-center justify-between mb-4">${validate_component(Label, "Label").$$render(
      $$result,
      {
        class: "text-sm font-medium text-gray-700 dark:text-gray-300"
      },
      {},
      {
        default: () => {
          return `EPIs para Entrega *`;
        }
      }
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "xs",
        color: "alternative",
        class: "rounded-sm",
        disabled: loading
      },
      {},
      {
        default: () => {
          return `${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
              Adicionar Item`;
        }
      }
    )}</div> ${episDisponiveis.length === 0 ? `<div class="p-4 border-2 border-dashed border-red-300 rounded-lg bg-red-50 dark:bg-red-900/20"><div class="text-center">${validate_component(ExclamationCircleOutline, "ExclamationCircleOutline").$$render(
      $$result,
      {
        class: "mx-auto mb-2 text-red-500 w-8 h-8"
      },
      {},
      {}
    )} <h4 class="text-sm font-medium text-red-800 dark:text-red-200 mb-1" data-svelte-h="svelte-1y6kxv5">Nenhum EPI Disponível</h4> <p class="text-sm text-red-600 dark:text-red-400" data-svelte-h="svelte-4gen4i">Não há EPIs disponíveis para entrega no momento. Verifique o estoque ou entre em contato com o administrador.</p></div></div>` : `<div class="space-y-4">${each(itensSelecionados, (item, index) => {
      return `<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"><div class="flex items-start justify-between mb-4"><h4 class="text-sm font-medium text-gray-900 dark:text-white">Item ${escape(index + 1)}</h4> ${itensSelecionados.length > 1 ? `<button class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" ${loading ? "disabled" : ""} title="Remover item">${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button>` : ``}</div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <div class="md:col-span-2">${validate_component(Label, "Label").$$render(
        $$result,
        {
          for: "epi-" + index,
          class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        },
        {},
        {
          default: () => {
            return `Equipamento
                    `;
          }
        }
      )} ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
        $$result,
        {
          options: episOptions,
          value: item.episDisponivelId,
          placeholder: "Selecione um EPI...",
          disabled: loading
        },
        {},
        {}
      )}</div>  <div>${validate_component(Label, "Label").$$render(
        $$result,
        {
          for: "quantidade-" + index,
          class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        },
        {},
        {
          default: () => {
            return `Quantidade
                    `;
          }
        }
      )} ${validate_component(Input, "Input").$$render(
        $$result,
        {
          id: "quantidade-" + index,
          type: "number",
          min: "1",
          max: "100",
          class: "rounded-sm",
          disabled: loading,
          value: item.quantidade
        },
        {
          value: ($$value) => {
            item.quantidade = $$value;
            $$settled = false;
          }
        },
        {}
      )} </div></div>  ${item.nomeEquipamento ? `<div class="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-sm"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-900 dark:text-white">${escape(item.nomeEquipamento)}</p> <p class="text-xs text-gray-500 dark:text-gray-400">CA ${escape(item.registroCA)} </p></div> <div class="text-right"><p class="text-sm font-medium text-gray-900 dark:text-white">Qtd: ${escape(item.quantidade)}</p> </div></div> </div>` : ``} </div>`;
    })}  ${itensSelecionados.length === 0 ? `<div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">${validate_component(PlusOutline, "PlusOutline").$$render(
      $$result,
      {
        class: "w-8 h-8 mx-auto mb-3 text-gray-400"
      },
      {},
      {}
    )} <p class="text-sm text-gray-500 dark:text-gray-400 mb-4" data-svelte-h="svelte-1e863on">Nenhum item adicionado</p> ${validate_component(Button, "Button").$$render(
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
          return `Adicionar Primeiro Item`;
        }
      }
    )}</div>` : ``}</div>`}</div></div></div>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const css$3 = {
  code: ".custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar{width:8px}.custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-track{background:transparent;border-radius:8px}.custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:8px;border:2px solid transparent;background-clip:content-box}.dark .custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-thumb{background:#4b5563;background-clip:content-box}",
  map: '{"version":3,"file":"EditarEntregaDrawerPresenter.svelte","sources":["EditarEntregaDrawerPresenter.svelte"],"sourcesContent":["<!--\\n  Editar Entrega Drawer Presenter - Componente \\"Burro\\"\\n  \\n  Presenter para edição de entrega existente:\\n  - Reutiliza lógica similar ao NovaEntregaDrawerPresenter\\n  - Pré-popula campos com dados da entrega\\n  - Mantém layout idêntico\\n-->\\n\\n<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport { Button, Input, Select, Label } from \\"flowbite-svelte\\";\\nimport { PlusOutline, TrashBinOutline, CheckOutline, RefreshOutline } from \\"flowbite-svelte-icons\\";\\nimport DrawerHeader from \\"$lib/components/common/DrawerHeader.svelte\\";\\nexport let episDisponiveis = [];\\nexport let entrega = null;\\nexport let loading = false;\\nexport let show = false;\\nconst dispatch = createEventDispatcher();\\nlet responsavelEntrega = \\"\\";\\nlet itensSelecionados = [];\\nlet errors = {};\\n$: if (show && entrega) {\\n  populateForm();\\n}\\nfunction populateForm() {\\n  if (!entrega) return;\\n  responsavelEntrega = \\"Respons\\\\xE1vel da Entrega\\";\\n  itensSelecionados = [\\n    {\\n      episDisponivelId: \\"1\\",\\n      // Encontrar correspondência com episDisponiveis\\n      nomeEquipamento: \\"Capacete de Seguran\\\\xE7a\\",\\n      registroCA: \\"31469\\",\\n      quantidade: 1\\n    }\\n  ];\\n  errors = {};\\n}\\nfunction resetForm() {\\n  responsavelEntrega = \\"\\";\\n  itensSelecionados = [];\\n  errors = {};\\n}\\nfunction adicionarItem() {\\n  itensSelecionados = [...itensSelecionados, {\\n    episDisponivelId: \\"\\",\\n    nomeEquipamento: \\"\\",\\n    registroCA: \\"\\",\\n    quantidade: 1\\n  }];\\n}\\nfunction removerItem(index) {\\n  itensSelecionados = itensSelecionados.filter((_, i) => i !== index);\\n}\\nfunction handleEPISelectChange(index, event) {\\n  const target = event.target;\\n  atualizarEPI(index, target.value);\\n}\\nfunction atualizarEPI(index, episDisponivelId) {\\n  const epiSelecionado = episDisponiveis.find((epi) => epi.id === episDisponivelId);\\n  if (epiSelecionado) {\\n    itensSelecionados[index] = {\\n      ...itensSelecionados[index],\\n      episDisponivelId,\\n      nomeEquipamento: epiSelecionado.nomeEquipamento,\\n      registroCA: epiSelecionado.registroCA\\n    };\\n    delete errors[`item-${index}`];\\n    errors = { ...errors };\\n  }\\n}\\nfunction atualizarQuantidade(index, quantidade) {\\n  itensSelecionados[index] = {\\n    ...itensSelecionados[index],\\n    quantidade\\n  };\\n  delete errors[`quantidade-${index}`];\\n  errors = { ...errors };\\n}\\nfunction validateForm() {\\n  const newErrors = {};\\n  if (!responsavelEntrega.trim()) {\\n    newErrors.responsavel = \\"Respons\\\\xE1vel \\\\xE9 obrigat\\\\xF3rio\\";\\n  }\\n  if (itensSelecionados.length === 0) {\\n    newErrors.items = \\"Adicione pelo menos um item\\";\\n  }\\n  itensSelecionados.forEach((item, index) => {\\n    if (!item.episDisponivelId) {\\n      newErrors[`item-${index}`] = \\"Selecione um EPI\\";\\n    }\\n    if (item.quantidade < 1) {\\n      newErrors[`quantidade-${index}`] = \\"Quantidade deve ser maior que 0\\";\\n    }\\n  });\\n  errors = newErrors;\\n  return Object.keys(newErrors).length === 0;\\n}\\nfunction handleSalvar() {\\n  if (!validateForm()) {\\n    return;\\n  }\\n  const formData = {\\n    responsavel: responsavelEntrega.trim(),\\n    itens: itensSelecionados.map((item) => ({\\n      episDisponivelId: item.episDisponivelId,\\n      nomeEquipamento: item.nomeEquipamento,\\n      registroCA: item.registroCA,\\n      quantidade: item.quantidade\\n    }))\\n  };\\n  dispatch(\\"salvar\\", formData);\\n}\\nfunction handleCancelar() {\\n  dispatch(\\"cancelar\\");\\n}\\n$: episOptions = [\\n  { value: \\"\\", label: \\"Selecione um EPI...\\" },\\n  ...episDisponiveis.filter((epi) => epi.disponivel).map((epi) => ({\\n    value: epi.id,\\n    label: `${epi.nomeEquipamento} (CA ${epi.registroCA})${epi.quantidade ? ` - ${epi.quantidade} dispon\\\\xEDveis` : \\"\\"}`\\n  }))\\n];\\n$: canSave = responsavelEntrega.trim() && itensSelecionados.length > 0 && !loading;\\n<\/script>\\n\\n{#if show}\\n  <!-- Overlay -->\\n  <div \\n    class=\\"fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity\\"\\n    on:click={handleCancelar}\\n    role=\\"presentation\\"\\n  ></div>\\n\\n  <!-- Drawer -->\\n  <div \\n    class=\\"fixed top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out\\"\\n    on:click|stopPropagation\\n    role=\\"dialog\\"\\n    aria-modal=\\"true\\"\\n  >\\n    \\n    <!-- Header -->\\n    <DrawerHeader \\n      title=\\"Editar Entrega #{entrega?.id || \'\'}\\" \\n      on:close={handleCancelar}\\n    />\\n\\n    <!-- Content -->\\n    <div class=\\"flex flex-col h-full\\">\\n      <div class=\\"flex-1 overflow-y-auto custom-scrollbar p-6\\" style=\\"height: calc(100% - 80px);\\">\\n        \\n        <!-- Info da Entrega Original -->\\n        {#if entrega}\\n          <div class=\\"mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800\\">\\n            <h4 class=\\"text-sm font-medium text-blue-900 dark:text-blue-100 mb-2\\">\\n              Informações da Entrega Original\\n            </h4>\\n            <div class=\\"text-sm text-blue-800 dark:text-blue-200\\">\\n              <p>• Data: {new Date(entrega.dataEntrega).toLocaleDateString(\'pt-BR\')}</p>\\n              <p>• Status: {entrega.status === \'assinado\' ? \'Assinado\' : \'Pendente Assinatura\'}</p>\\n              <p>• ID: #{entrega.id}</p>\\n            </div>\\n          </div>\\n        {/if}\\n        \\n        <!-- Responsável -->\\n        <div class=\\"mb-6\\">\\n          <Label for=\\"responsavel\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n            Responsável pela Entrega *\\n          </Label>\\n          <Input\\n            id=\\"responsavel\\"\\n            type=\\"text\\"\\n            placeholder=\\"Nome do responsável pela entrega\\"\\n            bind:value={responsavelEntrega}\\n            class=\\"rounded-sm {errors.responsavel ? \'border-red-500\' : \'\'}\\"\\n            disabled={loading}\\n          />\\n          {#if errors.responsavel}\\n            <p class=\\"mt-1 text-sm text-red-600 dark:text-red-400\\">\\n              {errors.responsavel}\\n            </p>\\n          {/if}\\n        </div>\\n\\n        <!-- EPIs para Entrega -->\\n        <div class=\\"mb-6\\">\\n          <div class=\\"flex items-center justify-between mb-4\\">\\n            <Label class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n              EPIs da Entrega *\\n            </Label>\\n            <Button\\n              size=\\"xs\\"\\n              color=\\"alternative\\"\\n              class=\\"rounded-sm\\"\\n              on:click={adicionarItem}\\n              disabled={loading}\\n            >\\n              <PlusOutline class=\\"mr-2 w-4 h-4\\" />\\n              Adicionar Item\\n            </Button>\\n          </div>\\n\\n          {#if errors.items}\\n            <p class=\\"mb-3 text-sm text-red-600 dark:text-red-400\\">\\n              {errors.items}\\n            </p>\\n          {/if}\\n\\n          <div class=\\"space-y-4\\">\\n            {#each itensSelecionados as item, index}\\n              <div class=\\"border border-gray-200 dark:border-gray-700 rounded-lg p-4\\">\\n                <div class=\\"flex items-start justify-between mb-4\\">\\n                  <h4 class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                    Item {index + 1}\\n                  </h4>\\n                  {#if itensSelecionados.length > 1}\\n                    <button\\n                      class=\\"text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300\\"\\n                      on:click={() => removerItem(index)}\\n                      disabled={loading}\\n                      title=\\"Remover item\\"\\n                    >\\n                      <TrashBinOutline class=\\"w-4 h-4\\" />\\n                    </button>\\n                  {/if}\\n                </div>\\n\\n                <div class=\\"grid grid-cols-1 md:grid-cols-3 gap-4\\">\\n                  <!-- EPI Selection -->\\n                  <div class=\\"md:col-span-2\\">\\n                    <Label for=\\"epi-{index}\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n                      Equipamento\\n                    </Label>\\n                    <Select\\n                      id=\\"epi-{index}\\"\\n                      items={episOptions}\\n                      bind:value={item.episDisponivelId}\\n                      on:change={(e) => handleEPISelectChange(index, e)}\\n                      class=\\"rounded-sm {errors[`item-${index}`] ? \'border-red-500\' : \'\'}\\"\\n                      disabled={loading}\\n                    />\\n                    {#if errors[`item-${index}`]}\\n                      <p class=\\"mt-1 text-sm text-red-600 dark:text-red-400\\">\\n                        {errors[`item-${index}`]}\\n                      </p>\\n                    {/if}\\n                  </div>\\n\\n                  <!-- Quantidade -->\\n                  <div>\\n                    <Label for=\\"quantidade-{index}\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n                      Quantidade\\n                    </Label>\\n                    <Input\\n                      id=\\"quantidade-{index}\\"\\n                      type=\\"number\\"\\n                      min=\\"1\\"\\n                      max=\\"100\\"\\n                      bind:value={item.quantidade}\\n                      on:input={(e) => atualizarQuantidade(index, parseInt(e.target.value) || 1)}\\n                      class=\\"rounded-sm {errors[`quantidade-${index}`] ? \'border-red-500\' : \'\'}\\"\\n                      disabled={loading}\\n                    />\\n                    {#if errors[`quantidade-${index}`]}\\n                      <p class=\\"mt-1 text-sm text-red-600 dark:text-red-400\\">\\n                        {errors[`quantidade-${index}`]}\\n                      </p>\\n                    {/if}\\n                  </div>\\n                </div>\\n\\n                <!-- Preview do EPI selecionado -->\\n                {#if item.nomeEquipamento}\\n                  <div class=\\"mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-sm\\">\\n                    <div class=\\"flex items-center justify-between\\">\\n                      <div>\\n                        <p class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                          {item.nomeEquipamento}\\n                        </p>\\n                        <p class=\\"text-xs text-gray-500 dark:text-gray-400\\">\\n                          CA {item.registroCA}\\n                        </p>\\n                      </div>\\n                      <div class=\\"text-right\\">\\n                        <p class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                          Qtd: {item.quantidade}\\n                        </p>\\n                      </div>\\n                    </div>\\n                  </div>\\n                {/if}\\n              </div>\\n            {/each}\\n\\n            <!-- Add first item button if no items -->\\n            {#if itensSelecionados.length === 0}\\n              <div class=\\"border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center\\">\\n                <PlusOutline class=\\"mx-auto mb-3 text-gray-400 w-8 h-8\\" />\\n                <p class=\\"text-sm text-gray-500 dark:text-gray-400 mb-4\\">\\n                  Nenhum item na entrega\\n                </p>\\n                <Button\\n                  size=\\"sm\\"\\n                  color=\\"alternative\\"\\n                  class=\\"rounded-sm\\"\\n                  on:click={adicionarItem}\\n                  disabled={loading}\\n                >\\n                  Adicionar Primeiro Item\\n                </Button>\\n              </div>\\n            {/if}\\n          </div>\\n        </div>\\n\\n        <!-- Summary -->\\n        {#if itensSelecionados.length > 0}\\n          <div class=\\"mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800\\">\\n            <h4 class=\\"text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-2\\">\\n              Resumo das Alterações\\n            </h4>\\n            <div class=\\"text-sm text-yellow-800 dark:text-yellow-200\\">\\n              <p>• Total de itens: {itensSelecionados.length}</p>\\n              <p>• Quantidade total: {itensSelecionados.reduce((sum, item) => sum + item.quantidade, 0)} unidades</p>\\n              <p>• Responsável: {responsavelEntrega || \'Não informado\'}</p>\\n            </div>\\n          </div>\\n        {/if}\\n\\n      </div>\\n\\n      <!-- Footer Actions -->\\n      <div class=\\"flex-shrink-0 bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700\\">\\n        <div class=\\"flex items-center justify-end space-x-3\\">\\n          <Button\\n            color=\\"alternative\\"\\n            class=\\"rounded-sm\\"\\n            on:click={handleCancelar}\\n            disabled={loading}\\n          >\\n            Cancelar\\n          </Button>\\n          <Button\\n            color=\\"primary\\"\\n            class=\\"rounded-sm\\"\\n            on:click={handleSalvar}\\n            disabled={!canSave}\\n          >\\n            {#if loading}\\n              <RefreshOutline class=\\"mr-2 animate-spin w-4 h-4\\" />\\n              Salvando...\\n            {:else}\\n              <CheckOutline class=\\"mr-2 w-4 h-4\\" />\\n              Salvar Alterações\\n            {/if}\\n          </Button>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>\\n  /* Scrollbar customization */\\n  .custom-scrollbar::-webkit-scrollbar {\\n    width: 8px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-track {\\n    background: transparent;\\n    border-radius: 8px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background: #e5e7eb;\\n    border-radius: 8px;\\n    border: 2px solid transparent;\\n    background-clip: content-box;\\n  }\\n  \\n  :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background: #4b5563;\\n    background-clip: content-box;\\n  }\\n</style>"],"names":[],"mappings":"AA8WE,+BAAiB,mBAAoB,CACnC,KAAK,CAAE,GACT,CAEA,+BAAiB,yBAA0B,CACzC,UAAU,CAAE,WAAW,CACvB,aAAa,CAAE,GACjB,CAEA,+BAAiB,yBAA0B,CACzC,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WAAW,CAC7B,eAAe,CAAE,WACnB,CAEQ,KAAM,CAAC,+BAAiB,yBAA0B,CACxD,UAAU,CAAE,OAAO,CACnB,eAAe,CAAE,WACnB"}'
};
const EditarEntregaDrawerPresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let episOptions;
  let canSave;
  let { episDisponiveis = [] } = $$props;
  let { entrega = null } = $$props;
  let { loading = false } = $$props;
  let { show = false } = $$props;
  createEventDispatcher();
  let responsavelEntrega = "";
  let itensSelecionados = [];
  let errors = {};
  function populateForm() {
    if (!entrega) return;
    responsavelEntrega = "Responsável da Entrega";
    itensSelecionados = [
      {
        episDisponivelId: "1",
        // Encontrar correspondência com episDisponiveis
        nomeEquipamento: "Capacete de Segurança",
        registroCA: "31469",
        quantidade: 1
      }
    ];
    errors = {};
  }
  if ($$props.episDisponiveis === void 0 && $$bindings.episDisponiveis && episDisponiveis !== void 0) $$bindings.episDisponiveis(episDisponiveis);
  if ($$props.entrega === void 0 && $$bindings.entrega && entrega !== void 0) $$bindings.entrega(entrega);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  $$result.css.add(css$3);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (show && entrega) {
        populateForm();
      }
    }
    episOptions = [
      { value: "", label: "Selecione um EPI..." },
      ...episDisponiveis.filter((epi) => epi.disponivel).map((epi) => ({
        value: epi.id,
        label: `${epi.nomeEquipamento} (CA ${epi.registroCA})${epi.quantidade ? ` - ${epi.quantidade} disponíveis` : ""}`
      }))
    ];
    canSave = responsavelEntrega.trim() && itensSelecionados.length > 0 && !loading;
    $$rendered = `  ${show ? ` <div class="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity" role="presentation"></div>  <div class="fixed top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out" role="dialog" aria-modal="true"> ${validate_component(DrawerHeader, "DrawerHeader").$$render(
      $$result,
      {
        title: "Editar Entrega #" + (entrega?.id || "")
      },
      {},
      {}
    )}  <div class="flex flex-col h-full"><div class="flex-1 overflow-y-auto custom-scrollbar p-6 svelte-ng7f9w" style="height: calc(100% - 80px);"> ${entrega ? `<div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"><h4 class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2" data-svelte-h="svelte-1p8cqi4">Informações da Entrega Original</h4> <div class="text-sm text-blue-800 dark:text-blue-200"><p>• Data: ${escape(new Date(entrega.dataEntrega).toLocaleDateString("pt-BR"))}</p> <p>• Status: ${escape(entrega.status === "assinado" ? "Assinado" : "Pendente Assinatura")}</p> <p>• ID: #${escape(entrega.id)}</p></div></div>` : ``}  <div class="mb-6">${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "responsavel",
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      },
      {},
      {
        default: () => {
          return `Responsável pela Entrega *`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "responsavel",
        type: "text",
        placeholder: "Nome do responsável pela entrega",
        class: "rounded-sm " + (errors.responsavel ? "border-red-500" : ""),
        disabled: loading,
        value: responsavelEntrega
      },
      {
        value: ($$value) => {
          responsavelEntrega = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${errors.responsavel ? `<p class="mt-1 text-sm text-red-600 dark:text-red-400">${escape(errors.responsavel)}</p>` : ``}</div>  <div class="mb-6"><div class="flex items-center justify-between mb-4">${validate_component(Label, "Label").$$render(
      $$result,
      {
        class: "text-sm font-medium text-gray-700 dark:text-gray-300"
      },
      {},
      {
        default: () => {
          return `EPIs da Entrega *`;
        }
      }
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "xs",
        color: "alternative",
        class: "rounded-sm",
        disabled: loading
      },
      {},
      {
        default: () => {
          return `${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "mr-2 w-4 h-4" }, {}, {})}
              Adicionar Item`;
        }
      }
    )}</div> ${errors.items ? `<p class="mb-3 text-sm text-red-600 dark:text-red-400">${escape(errors.items)}</p>` : ``} <div class="space-y-4">${each(itensSelecionados, (item, index) => {
      return `<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"><div class="flex items-start justify-between mb-4"><h4 class="text-sm font-medium text-gray-900 dark:text-white">Item ${escape(index + 1)}</h4> ${itensSelecionados.length > 1 ? `<button class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" ${loading ? "disabled" : ""} title="Remover item">${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button>` : ``}</div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <div class="md:col-span-2">${validate_component(Label, "Label").$$render(
        $$result,
        {
          for: "epi-" + index,
          class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        },
        {},
        {
          default: () => {
            return `Equipamento
                    `;
          }
        }
      )} ${validate_component(Select, "Select").$$render(
        $$result,
        {
          id: "epi-" + index,
          items: episOptions,
          class: "rounded-sm " + (errors[`item-${index}`] ? "border-red-500" : ""),
          disabled: loading,
          value: item.episDisponivelId
        },
        {
          value: ($$value) => {
            item.episDisponivelId = $$value;
            $$settled = false;
          }
        },
        {}
      )} ${errors[`item-${index}`] ? `<p class="mt-1 text-sm text-red-600 dark:text-red-400">${escape(errors[`item-${index}`])} </p>` : ``}</div>  <div>${validate_component(Label, "Label").$$render(
        $$result,
        {
          for: "quantidade-" + index,
          class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        },
        {},
        {
          default: () => {
            return `Quantidade
                    `;
          }
        }
      )} ${validate_component(Input, "Input").$$render(
        $$result,
        {
          id: "quantidade-" + index,
          type: "number",
          min: "1",
          max: "100",
          class: "rounded-sm " + (errors[`quantidade-${index}`] ? "border-red-500" : ""),
          disabled: loading,
          value: item.quantidade
        },
        {
          value: ($$value) => {
            item.quantidade = $$value;
            $$settled = false;
          }
        },
        {}
      )} ${errors[`quantidade-${index}`] ? `<p class="mt-1 text-sm text-red-600 dark:text-red-400">${escape(errors[`quantidade-${index}`])} </p>` : ``} </div></div>  ${item.nomeEquipamento ? `<div class="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-sm"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-900 dark:text-white">${escape(item.nomeEquipamento)}</p> <p class="text-xs text-gray-500 dark:text-gray-400">CA ${escape(item.registroCA)} </p></div> <div class="text-right"><p class="text-sm font-medium text-gray-900 dark:text-white">Qtd: ${escape(item.quantidade)}</p> </div></div> </div>` : ``} </div>`;
    })}  ${itensSelecionados.length === 0 ? `<div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">${validate_component(PlusOutline, "PlusOutline").$$render(
      $$result,
      {
        class: "mx-auto mb-3 text-gray-400 w-8 h-8"
      },
      {},
      {}
    )} <p class="text-sm text-gray-500 dark:text-gray-400 mb-4" data-svelte-h="svelte-iymvfb">Nenhum item na entrega</p> ${validate_component(Button, "Button").$$render(
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
          return `Adicionar Primeiro Item`;
        }
      }
    )}</div>` : ``}</div></div>  ${itensSelecionados.length > 0 ? `<div class="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"><h4 class="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-2" data-svelte-h="svelte-sxfnj2">Resumo das Alterações</h4> <div class="text-sm text-yellow-800 dark:text-yellow-200"><p>• Total de itens: ${escape(itensSelecionados.length)}</p> <p>• Quantidade total: ${escape(itensSelecionados.reduce((sum, item) => sum + item.quantidade, 0))} unidades</p> <p>• Responsável: ${escape(responsavelEntrega || "Não informado")}</p></div></div>` : ``}</div>  <div class="flex-shrink-0 bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700"><div class="flex items-center justify-end space-x-3">${validate_component(Button, "Button").$$render(
      $$result,
      {
        color: "alternative",
        class: "rounded-sm",
        disabled: loading
      },
      {},
      {
        default: () => {
          return `Cancelar`;
        }
      }
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        color: "primary",
        class: "rounded-sm",
        disabled: !canSave
      },
      {},
      {
        default: () => {
          return `${loading ? `${validate_component(RefreshOutline, "RefreshOutline").$$render($$result, { class: "mr-2 animate-spin w-4 h-4" }, {}, {})}
              Salvando...` : `${validate_component(CheckOutline, "CheckOutline").$$render($$result, { class: "mr-2 w-4 h-4" }, {}, {})}
              Salvar Alterações`}`;
        }
      }
    )}</div></div></div></div>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const css$2 = {
  code: ".custom-scrollbar.svelte-fw4j42{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent}.custom-scrollbar.svelte-fw4j42::-webkit-scrollbar{width:6px}.custom-scrollbar.svelte-fw4j42::-webkit-scrollbar-track{background:transparent}.custom-scrollbar.svelte-fw4j42::-webkit-scrollbar-thumb{background-color:#cbd5e1;border-radius:3px}.custom-scrollbar.svelte-fw4j42::-webkit-scrollbar-thumb:hover{background-color:#94a3b8}",
  map: `{"version":3,"file":"DevolucaoModalPresenter.svelte","sources":["DevolucaoModalPresenter.svelte"],"sourcesContent":["<!--\\n  Devolução Drawer Presenter - Componente \\"Burro\\"\\n  \\n  Drawer para processar devolução de EPI:\\n  - Interface simples para devolução\\n  - Validação básica\\n  - Layout convertido de modal para drawer\\n-->\\n\\n<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport { Button, Label, Textarea, Select } from \\"flowbite-svelte\\";\\nimport {\\n  CloseOutline,\\n  ExclamationCircleOutline,\\n  CheckCircleOutline,\\n  ClockOutline,\\n  CheckOutline,\\n  ArrowLeftOutline\\n} from \\"flowbite-svelte-icons\\";\\nimport { formatarData } from \\"$lib/utils/dateHelpers\\";\\nimport DrawerHeader from \\"$lib/components/common/DrawerHeader.svelte\\";\\nexport let equipamento = null;\\nexport let loading = false;\\nexport let show = false;\\nconst dispatch = createEventDispatcher();\\nlet motivoSelecionado = \\"devolu\\\\xE7\\\\xE3o padr\\\\xE3o\\";\\nlet observacoes = \\"\\";\\nlet errors = {};\\nconst motivosOptions = [\\n  { value: \\"devolu\\\\xE7\\\\xE3o padr\\\\xE3o\\", name: \\"Devolu\\\\xE7\\\\xE3o Padr\\\\xE3o - Fim do per\\\\xEDodo de uso\\" },\\n  { value: \\"danificado\\", name: \\"Danificado - EPI com defeito ou quebrado\\" },\\n  { value: \\"troca\\", name: \\"Troca - Substitui\\\\xE7\\\\xE3o por outro equipamento\\" },\\n  { value: \\"outros\\", name: \\"Outros - Outro motivo espec\\\\xEDfico\\" }\\n];\\n$: if (show && equipamento) {\\n  resetForm();\\n}\\nfunction resetForm() {\\n  motivoSelecionado = \\"devolu\\\\xE7\\\\xE3o padr\\\\xE3o\\";\\n  observacoes = \\"\\";\\n  errors = {};\\n}\\nfunction validateForm() {\\n  const newErrors = {};\\n  if (!motivoSelecionado) {\\n    newErrors.motivo = \\"Motivo da devolu\\\\xE7\\\\xE3o \\\\xE9 obrigat\\\\xF3rio\\";\\n  }\\n  errors = newErrors;\\n  return Object.keys(newErrors).length === 0;\\n}\\nfunction handleConfirmar() {\\n  if (!validateForm()) {\\n    return;\\n  }\\n  dispatch(\\"confirmar\\", {\\n    motivo: motivoSelecionado,\\n    observacoes: observacoes.trim() || void 0\\n  });\\n}\\nfunction handleCancelar() {\\n  dispatch(\\"cancelar\\");\\n}\\n$: canConfirm = motivoSelecionado && !loading;\\n$: isVencido = equipamento?.vencido || false;\\n$: diasVencimento = equipamento?.diasVencido || 0;\\n<\/script>\\n\\n{#if show}\\n  <!-- Overlay -->\\n  <div \\n    class=\\"fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity\\"\\n    on:click={handleCancelar}\\n    role=\\"presentation\\"\\n  ></div>\\n\\n  <!-- Drawer -->\\n  <div \\n    class=\\"fixed top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out\\"\\n    on:click|stopPropagation\\n    role=\\"dialog\\"\\n    aria-modal=\\"true\\"\\n  >\\n    \\n    <!-- Header -->\\n    <DrawerHeader \\n      title={equipamento ? \`Devolver \${equipamento.nomeEquipamento}\` : 'Devolver Equipamento'}\\n      objectType=\\"DEVOLUÇÃO EPI\\"\\n      iconName=\\"TrashBinOutline\\"\\n      primaryAction={{\\n        text: loading ? 'Processando...' : 'Confirmar Devolução',\\n        icon: loading ? '' : 'CheckOutline',\\n        disabled: !canConfirm\\n      }}\\n      on:close={handleCancelar}\\n      on:primaryAction={handleConfirmar}\\n    />\\n\\n    <!-- Content -->\\n    <div class=\\"flex-1 overflow-y-auto p-6 custom-scrollbar\\">\\n\\n    {#if equipamento}\\n      <!-- Informações do Equipamento -->\\n      <div class=\\"mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg\\">\\n        <div class=\\"flex items-start space-x-3 mb-3\\">\\n          <!-- Box com número 1 -->\\n          <div class=\\"flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md flex items-center justify-center font-semibold text-sm\\">\\n            1\\n          </div>\\n          <div class=\\"flex-1\\">\\n            <h4 class=\\"font-medium text-gray-900 dark:text-white\\">\\n              {equipamento.nomeEquipamento}\\n            </h4>\\n            <p class=\\"text-sm text-gray-500 dark:text-gray-400\\">\\n              CA {equipamento.registroCA} • Entrega #{equipamento.entregaId}\\n            </p>\\n          </div>\\n        </div>\\n\\n        <!-- Status de Vencimento -->\\n        <div class=\\"pt-3 border-t border-gray-200 dark:border-gray-700\\">\\n          <div class=\\"flex items-center justify-between\\">\\n            <div>\\n              <p class=\\"text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide\\">\\n                Prazo de Devolução\\n              </p>\\n              <p class=\\"text-sm text-gray-900 dark:text-white\\">\\n                {formatarData(equipamento.prazoMaximoDevolucao)}\\n              </p>\\n            </div>\\n            <div class=\\"text-right\\">\\n              {#if isVencido}\\n                <div class=\\"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200\\">\\n                  <ExclamationCircleOutline class=\\"mr-1 w-3 h-3\\" />\\n                  Vencido há {diasVencimento} dias\\n                </div>\\n              {:else}\\n                <div class=\\"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200\\">\\n                  <CheckCircleOutline class=\\"mr-1 w-3 h-3\\" />\\n                  No prazo\\n                </div>\\n              {/if}\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n\\n\\n      <!-- Motivo da Devolução -->\\n      <div class=\\"mb-6\\">\\n        <Label for=\\"motivo\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n          Motivo da Devolução *\\n        </Label>\\n        <Select\\n          id=\\"motivo\\"\\n          bind:value={motivoSelecionado}\\n          class=\\"rounded-sm {errors.motivo ? 'border-red-500' : ''}\\"\\n          disabled={loading}\\n          items={motivosOptions}\\n        />\\n        {#if errors.motivo}\\n          <p class=\\"mt-1 text-sm text-red-600 dark:text-red-400\\">\\n            {errors.motivo}\\n          </p>\\n        {/if}\\n      </div>\\n\\n      <!-- Observações (opcional) -->\\n      <div class=\\"mb-6\\">\\n        <Label for=\\"observacoes\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n          Observações (opcional)\\n        </Label>\\n        <Textarea\\n          id=\\"observacoes\\"\\n          placeholder=\\"Observações adicionais sobre a devolução...\\"\\n          bind:value={observacoes}\\n          rows={2}\\n          class=\\"rounded-sm\\"\\n          disabled={loading}\\n        />\\n        <p class=\\"mt-1 text-xs text-gray-500 dark:text-gray-400\\">\\n          Campo opcional para detalhes específicos da devolução\\n        </p>\\n      </div>\\n\\n      <!-- Alertas -->\\n      {#if isVencido}\\n        <div class=\\"mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800\\">\\n          <div class=\\"flex items-start\\">\\n            <ExclamationCircleOutline class=\\"text-red-600 dark:text-red-400 mt-0.5 mr-3 w-5 h-5\\" />\\n            <div>\\n              <h4 class=\\"text-sm font-medium text-red-800 dark:text-red-200\\">\\n                Equipamento com prazo vencido\\n              </h4>\\n              <p class=\\"text-sm text-red-700 dark:text-red-300 mt-1\\">\\n                Este equipamento está {diasVencimento} dias em atraso para devolução.\\n              </p>\\n            </div>\\n          </div>\\n        </div>\\n      {/if}\\n\\n\\n    {/if}\\n\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>\\n  .custom-scrollbar {\\n    scrollbar-width: thin;\\n    scrollbar-color: #cbd5e1 transparent;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar {\\n    width: 6px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-track {\\n    background: transparent;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background-color: #cbd5e1;\\n    border-radius: 3px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-thumb:hover {\\n    background-color: #94a3b8;\\n  }\\n</style>"],"names":[],"mappings":"AAiNE,+BAAkB,CAChB,eAAe,CAAE,IAAI,CACrB,eAAe,CAAE,OAAO,CAAC,WAC3B,CAEA,+BAAiB,mBAAoB,CACnC,KAAK,CAAE,GACT,CAEA,+BAAiB,yBAA0B,CACzC,UAAU,CAAE,WACd,CAEA,+BAAiB,yBAA0B,CACzC,gBAAgB,CAAE,OAAO,CACzB,aAAa,CAAE,GACjB,CAEA,+BAAiB,yBAAyB,MAAO,CAC/C,gBAAgB,CAAE,OACpB"}`
};
const DevolucaoModalPresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canConfirm;
  let isVencido;
  let diasVencimento;
  let { equipamento = null } = $$props;
  let { loading = false } = $$props;
  let { show = false } = $$props;
  createEventDispatcher();
  let motivoSelecionado = "devolução padrão";
  let observacoes = "";
  let errors = {};
  const motivosOptions = [
    {
      value: "devolução padrão",
      name: "Devolução Padrão - Fim do período de uso"
    },
    {
      value: "danificado",
      name: "Danificado - EPI com defeito ou quebrado"
    },
    {
      value: "troca",
      name: "Troca - Substituição por outro equipamento"
    },
    {
      value: "outros",
      name: "Outros - Outro motivo específico"
    }
  ];
  function resetForm() {
    motivoSelecionado = "devolução padrão";
    observacoes = "";
    errors = {};
  }
  if ($$props.equipamento === void 0 && $$bindings.equipamento && equipamento !== void 0) $$bindings.equipamento(equipamento);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (show && equipamento) {
        resetForm();
      }
    }
    canConfirm = motivoSelecionado && !loading;
    isVencido = equipamento?.vencido || false;
    diasVencimento = equipamento?.diasVencido || 0;
    $$rendered = `  ${show ? ` <div class="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity" role="presentation"></div>  <div class="fixed top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out" role="dialog" aria-modal="true"> ${validate_component(DrawerHeader, "DrawerHeader").$$render(
      $$result,
      {
        title: equipamento ? `Devolver ${equipamento.nomeEquipamento}` : "Devolver Equipamento",
        objectType: "DEVOLUÇÃO EPI",
        iconName: "TrashBinOutline",
        primaryAction: {
          text: loading ? "Processando..." : "Confirmar Devolução",
          icon: loading ? "" : "CheckOutline",
          disabled: !canConfirm
        }
      },
      {},
      {}
    )}  <div class="flex-1 overflow-y-auto p-6 custom-scrollbar svelte-fw4j42">${equipamento ? ` <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"><div class="flex items-start space-x-3 mb-3"> <div class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md flex items-center justify-center font-semibold text-sm" data-svelte-h="svelte-bog2zm">1</div> <div class="flex-1"><h4 class="font-medium text-gray-900 dark:text-white">${escape(equipamento.nomeEquipamento)}</h4> <p class="text-sm text-gray-500 dark:text-gray-400">CA ${escape(equipamento.registroCA)} • Entrega #${escape(equipamento.entregaId)}</p></div></div>  <div class="pt-3 border-t border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-13u3t5e">Prazo de Devolução</p> <p class="text-sm text-gray-900 dark:text-white">${escape(formatarData(equipamento.prazoMaximoDevolucao))}</p></div> <div class="text-right">${isVencido ? `<div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">${validate_component(ExclamationCircleOutline, "ExclamationCircleOutline").$$render($$result, { class: "mr-1 w-3 h-3" }, {}, {})}
                  Vencido há ${escape(diasVencimento)} dias</div>` : `<div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">${validate_component(CheckCircleOutline, "CheckCircleOutline").$$render($$result, { class: "mr-1 w-3 h-3" }, {}, {})}
                  No prazo</div>`}</div></div></div></div>  <div class="mb-6">${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "motivo",
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      },
      {},
      {
        default: () => {
          return `Motivo da Devolução *`;
        }
      }
    )} ${validate_component(Select, "Select").$$render(
      $$result,
      {
        id: "motivo",
        class: "rounded-sm " + (errors.motivo ? "border-red-500" : ""),
        disabled: loading,
        items: motivosOptions,
        value: motivoSelecionado
      },
      {
        value: ($$value) => {
          motivoSelecionado = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${errors.motivo ? `<p class="mt-1 text-sm text-red-600 dark:text-red-400">${escape(errors.motivo)}</p>` : ``}</div>  <div class="mb-6">${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "observacoes",
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      },
      {},
      {
        default: () => {
          return `Observações (opcional)`;
        }
      }
    )} ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        id: "observacoes",
        placeholder: "Observações adicionais sobre a devolução...",
        rows: 2,
        class: "rounded-sm",
        disabled: loading,
        value: observacoes
      },
      {
        value: ($$value) => {
          observacoes = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="mt-1 text-xs text-gray-500 dark:text-gray-400" data-svelte-h="svelte-1gkgsxh">Campo opcional para detalhes específicos da devolução</p></div>  ${isVencido ? `<div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"><div class="flex items-start">${validate_component(ExclamationCircleOutline, "ExclamationCircleOutline").$$render(
      $$result,
      {
        class: "text-red-600 dark:text-red-400 mt-0.5 mr-3 w-5 h-5"
      },
      {},
      {}
    )} <div><h4 class="text-sm font-medium text-red-800 dark:text-red-200" data-svelte-h="svelte-1l5do2t">Equipamento com prazo vencido</h4> <p class="text-sm text-red-700 dark:text-red-300 mt-1">Este equipamento está ${escape(diasVencimento)} dias em atraso para devolução.</p></div></div></div>` : ``}` : ``}</div></div>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const css$1 = {
  code: ".custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar{width:8px}.custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-track{background:transparent;border-radius:8px}.custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:8px;border:2px solid transparent;background-clip:content-box}.dark .custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-thumb{background:#4b5563;background-clip:content-box}",
  map: `{"version":3,"file":"AssinaturaModalPresenter.svelte","sources":["AssinaturaModalPresenter.svelte"],"sourcesContent":["<!--\\n  Assinatura Drawer Presenter - Componente \\"Burro\\"\\n  \\n  Drawer para processar assinatura digital:\\n  - Interface simples para confirmar assinatura\\n  - Placeholder para integração futura com assinatura digital\\n  - Layout convertido de modal para drawer\\n-->\\n\\n<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport { Button } from \\"flowbite-svelte\\";\\nimport {\\n  CloseOutline,\\n  CheckOutline,\\n  RefreshOutline,\\n  CheckCircleOutline,\\n  TabletOutline,\\n  GlobeOutline,\\n  QrCodeOutline,\\n  FileLinesOutline,\\n  PrinterOutline\\n} from \\"flowbite-svelte-icons\\";\\nimport { formatarData } from \\"$lib/utils/dateHelpers\\";\\nimport DrawerHeader from \\"$lib/components/common/DrawerHeader.svelte\\";\\nexport let entrega = null;\\nexport let loading = false;\\nexport let show = false;\\nconst dispatch = createEventDispatcher();\\nlet assinaturaConfirmada = false;\\n$: if (show) {\\n  resetForm();\\n}\\nfunction resetForm() {\\n  assinaturaConfirmada = false;\\n}\\nfunction handleConfirmar() {\\n  const assinaturaDigital = \`assinatura_digital_\${Date.now()}\`;\\n  dispatch(\\"confirmar\\", { assinatura: assinaturaDigital });\\n}\\nfunction handleCancelar() {\\n  dispatch(\\"cancelar\\");\\n}\\nfunction confirmarAssinatura() {\\n  assinaturaConfirmada = true;\\n  setTimeout(() => {\\n    handleConfirmar();\\n  }, 500);\\n}\\n$: canConfirm = !loading && !assinaturaConfirmada;\\n<\/script>\\n\\n{#if show}\\n  <!-- Overlay -->\\n  <div \\n    class=\\"fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity\\"\\n    on:click={handleCancelar}\\n    role=\\"presentation\\"\\n  ></div>\\n\\n  <!-- Drawer -->\\n  <div \\n    class=\\"fixed top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out\\"\\n    on:click|stopPropagation\\n    role=\\"dialog\\"\\n    aria-modal=\\"true\\"\\n  >\\n    \\n    <!-- Header -->\\n    <DrawerHeader \\n      title={entrega ? \`Assinatura da Entrega #\${entrega.id}\` : 'Confirmar Assinatura Digital'}\\n      objectType=\\"ASSINATURA DIGITAL\\"\\n      iconName=\\"TabletOutline\\"\\n      primaryAction={{\\n        text: loading ? 'Processando...' : (assinaturaConfirmada ? 'Assinatura Confirmada' : 'Foi assinado'),\\n        icon: loading ? '' : (assinaturaConfirmada ? 'CheckOutline' : 'CheckCircleOutline'),\\n        disabled: !canConfirm\\n      }}\\n      secondaryAction={{\\n        text: 'Cancelar',\\n        disabled: loading\\n      }}\\n      on:close={handleCancelar}\\n      on:primaryAction={confirmarAssinatura}\\n      on:secondaryAction={handleCancelar}\\n    />\\n\\n    <!-- Content -->\\n    <div class=\\"overflow-y-auto custom-scrollbar p-6\\" style=\\"height: calc(100% - 80px);\\">\\n\\n    {#if entrega}\\n      <!-- Informações da Entrega -->\\n      <div class=\\"mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg\\">\\n        <div class=\\"grid grid-cols-1 md:grid-cols-2 gap-4\\">\\n          <div>\\n            <p class=\\"text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide\\">\\n              Entrega\\n            </p>\\n            <p class=\\"text-sm text-gray-900 dark:text-white font-semibold\\">\\n              #{entrega.id}\\n            </p>\\n          </div>\\n          <div>\\n            <p class=\\"text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide\\">\\n              Data da Entrega\\n            </p>\\n            <p class=\\"text-sm text-gray-900 dark:text-white font-semibold\\">\\n              {formatarData(entrega.dataEntrega)}\\n            </p>\\n          </div>\\n        </div>\\n      </div>\\n\\n      <!-- EPIs da Entrega -->\\n      <div class=\\"mb-6\\">\\n        <h4 class=\\"text-sm font-semibold text-gray-900 dark:text-white mb-3\\">\\n          EPIs a serem confirmados:\\n        </h4>\\n        <div class=\\"space-y-2\\">\\n          <!-- Item mockado - em produção viria de entrega.itens -->\\n          <div class=\\"flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-sm border border-gray-200 dark:border-gray-600\\">\\n            <div class=\\"flex flex-col\\">\\n              <span class=\\"text-sm text-gray-900 dark:text-white font-medium\\">\\n                Capacete de Segurança\\n              </span>\\n              <span class=\\"text-xs text-gray-500 dark:text-gray-400\\">\\n                CA 31469\\n              </span>\\n            </div>\\n            <div class=\\"text-right\\">\\n              <span class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                Qtd: 1\\n              </span>\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n\\n\\n      <!-- Opções de Assinatura -->\\n      <div class=\\"mb-6 grid grid-cols-1 md:grid-cols-2 gap-4\\">\\n        <!-- Assinatura Digital -->\\n        <div class=\\"p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800\\">\\n          <div class=\\"flex items-start\\">\\n            <TabletOutline class=\\"text-blue-600 dark:text-blue-400 mt-0.5 mr-3 w-5 h-5\\" />\\n            <div>\\n              <h4 class=\\"text-sm font-medium text-blue-900 dark:text-blue-100\\">\\n                Assinatura Digital\\n              </h4>\\n              <p class=\\"text-sm text-blue-800 dark:text-blue-200 mt-1\\">\\n                Assine digitalmente através do link ou QR Code\\n              </p>\\n              <div class=\\"mt-3 space-y-2\\">\\n                <Button size=\\"xs\\" color=\\"primary\\" class=\\"rounded-sm w-full\\">\\n                  <GlobeOutline class=\\"mr-2 w-3 h-3\\" />\\n                  Abrir Link de Assinatura\\n                </Button>\\n                <div class=\\"flex items-center justify-center p-3 bg-white dark:bg-gray-700 rounded border\\">\\n                  <div class=\\"w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center\\">\\n                    <QrCodeOutline class=\\"text-gray-400 w-8 h-8\\" />\\n                  </div>\\n                </div>\\n                <p class=\\"text-xs text-blue-700 dark:text-blue-300 text-center\\">\\n                  Escaneie o QR Code para assinar\\n                </p>\\n              </div>\\n            </div>\\n          </div>\\n        </div>\\n        \\n        <!-- Assinatura Manual -->\\n        <div class=\\"p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800\\">\\n          <div class=\\"flex items-start\\">\\n            <FileLinesOutline class=\\"text-green-600 dark:text-green-400 mt-0.5 mr-3 w-5 h-5\\" />\\n            <div>\\n              <h4 class=\\"text-sm font-medium text-green-900 dark:text-green-100\\">\\n                Assinatura Manual\\n              </h4>\\n              <p class=\\"text-sm text-green-800 dark:text-green-200 mt-1\\">\\n                Imprima o documento para assinatura física\\n              </p>\\n              <div class=\\"mt-3 space-y-2\\">\\n                <Button size=\\"xs\\" color=\\"alternative\\" class=\\"rounded-sm w-full\\">\\n                  <PrinterOutline class=\\"mr-2 w-3 h-3\\" />\\n                  Imprimir Documento\\n                </Button>\\n                <p class=\\"text-xs text-green-700 dark:text-green-300 text-center\\">\\n                  Após assinatura física, confirme abaixo\\n                </p>\\n              </div>\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n\\n      <!-- Estado da Assinatura -->\\n      {#if assinaturaConfirmada}\\n        <div class=\\"mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800\\">\\n          <div class=\\"flex items-center\\">\\n            <CheckCircleOutline class=\\"text-green-600 dark:text-green-400 mr-3 w-5 h-5\\" />\\n            <div>\\n              <h4 class=\\"text-sm font-medium text-green-900 dark:text-green-100\\">\\n                Assinatura Confirmada\\n              </h4>\\n              <p class=\\"text-sm text-green-800 dark:text-green-200\\">\\n                Processando assinatura digital...\\n              </p>\\n            </div>\\n          </div>\\n        </div>\\n      {/if}\\n\\n\\n    {/if}\\n\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>\\n  /* Scrollbar customization */\\n  .custom-scrollbar::-webkit-scrollbar {\\n    width: 8px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-track {\\n    background: transparent;\\n    border-radius: 8px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background: #e5e7eb;\\n    border-radius: 8px;\\n    border: 2px solid transparent;\\n    background-clip: content-box;\\n  }\\n  \\n  :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background: #4b5563;\\n    background-clip: content-box;\\n  }\\n</style>"],"names":[],"mappings":"AA4NE,+BAAiB,mBAAoB,CACnC,KAAK,CAAE,GACT,CAEA,+BAAiB,yBAA0B,CACzC,UAAU,CAAE,WAAW,CACvB,aAAa,CAAE,GACjB,CAEA,+BAAiB,yBAA0B,CACzC,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WAAW,CAC7B,eAAe,CAAE,WACnB,CAEQ,KAAM,CAAC,+BAAiB,yBAA0B,CACxD,UAAU,CAAE,OAAO,CACnB,eAAe,CAAE,WACnB"}`
};
const AssinaturaModalPresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canConfirm;
  let { entrega = null } = $$props;
  let { loading = false } = $$props;
  let { show = false } = $$props;
  createEventDispatcher();
  let assinaturaConfirmada = false;
  function resetForm() {
    assinaturaConfirmada = false;
  }
  if ($$props.entrega === void 0 && $$bindings.entrega && entrega !== void 0) $$bindings.entrega(entrega);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  $$result.css.add(css$1);
  {
    if (show) {
      resetForm();
    }
  }
  canConfirm = !loading && !assinaturaConfirmada;
  return `  ${show ? ` <div class="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity" role="presentation"></div>  <div class="fixed top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out" role="dialog" aria-modal="true"> ${validate_component(DrawerHeader, "DrawerHeader").$$render(
    $$result,
    {
      title: entrega ? `Assinatura da Entrega #${entrega.id}` : "Confirmar Assinatura Digital",
      objectType: "ASSINATURA DIGITAL",
      iconName: "TabletOutline",
      primaryAction: {
        text: loading ? "Processando..." : assinaturaConfirmada ? "Assinatura Confirmada" : "Foi assinado",
        icon: loading ? "" : assinaturaConfirmada ? "CheckOutline" : "CheckCircleOutline",
        disabled: !canConfirm
      },
      secondaryAction: { text: "Cancelar", disabled: loading }
    },
    {},
    {}
  )}  <div class="overflow-y-auto custom-scrollbar p-6 svelte-ng7f9w" style="height: calc(100% - 80px);">${entrega ? ` <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><p class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-15muixn">Entrega</p> <p class="text-sm text-gray-900 dark:text-white font-semibold">#${escape(entrega.id)}</p></div> <div><p class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-1nce9zk">Data da Entrega</p> <p class="text-sm text-gray-900 dark:text-white font-semibold">${escape(formatarData(entrega.dataEntrega))}</p></div></div></div>  <div class="mb-6" data-svelte-h="svelte-udbm6m"><h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">EPIs a serem confirmados:</h4> <div class="space-y-2"> <div class="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-sm border border-gray-200 dark:border-gray-600"><div class="flex flex-col"><span class="text-sm text-gray-900 dark:text-white font-medium">Capacete de Segurança</span> <span class="text-xs text-gray-500 dark:text-gray-400">CA 31469</span></div> <div class="text-right"><span class="text-sm font-medium text-gray-900 dark:text-white">Qtd: 1</span></div></div></div></div>  <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"> <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"><div class="flex items-start">${validate_component(TabletOutline, "TabletOutline").$$render(
    $$result,
    {
      class: "text-blue-600 dark:text-blue-400 mt-0.5 mr-3 w-5 h-5"
    },
    {},
    {}
  )} <div><h4 class="text-sm font-medium text-blue-900 dark:text-blue-100" data-svelte-h="svelte-1yxfyqp">Assinatura Digital</h4> <p class="text-sm text-blue-800 dark:text-blue-200 mt-1" data-svelte-h="svelte-mz9p7b">Assine digitalmente através do link ou QR Code</p> <div class="mt-3 space-y-2">${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "xs",
      color: "primary",
      class: "rounded-sm w-full"
    },
    {},
    {
      default: () => {
        return `${validate_component(GlobeOutline, "GlobeOutline").$$render($$result, { class: "mr-2 w-3 h-3" }, {}, {})}
                  Abrir Link de Assinatura`;
      }
    }
  )} <div class="flex items-center justify-center p-3 bg-white dark:bg-gray-700 rounded border"><div class="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">${validate_component(QrCodeOutline, "QrCodeOutline").$$render($$result, { class: "text-gray-400 w-8 h-8" }, {}, {})}</div></div> <p class="text-xs text-blue-700 dark:text-blue-300 text-center" data-svelte-h="svelte-1u6pcnc">Escaneie o QR Code para assinar</p></div></div></div></div>  <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"><div class="flex items-start">${validate_component(FileLinesOutline, "FileLinesOutline").$$render(
    $$result,
    {
      class: "text-green-600 dark:text-green-400 mt-0.5 mr-3 w-5 h-5"
    },
    {},
    {}
  )} <div><h4 class="text-sm font-medium text-green-900 dark:text-green-100" data-svelte-h="svelte-uzpa23">Assinatura Manual</h4> <p class="text-sm text-green-800 dark:text-green-200 mt-1" data-svelte-h="svelte-1vt0diy">Imprima o documento para assinatura física</p> <div class="mt-3 space-y-2">${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "xs",
      color: "alternative",
      class: "rounded-sm w-full"
    },
    {},
    {
      default: () => {
        return `${validate_component(PrinterOutline, "PrinterOutline").$$render($$result, { class: "mr-2 w-3 h-3" }, {}, {})}
                  Imprimir Documento`;
      }
    }
  )} <p class="text-xs text-green-700 dark:text-green-300 text-center" data-svelte-h="svelte-kjygt1">Após assinatura física, confirme abaixo</p></div></div></div></div></div>  ${assinaturaConfirmada ? `<div class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"><div class="flex items-center">${validate_component(CheckCircleOutline, "CheckCircleOutline").$$render(
    $$result,
    {
      class: "text-green-600 dark:text-green-400 mr-3 w-5 h-5"
    },
    {},
    {}
  )} <div data-svelte-h="svelte-9s52he"><h4 class="text-sm font-medium text-green-900 dark:text-green-100">Assinatura Confirmada</h4> <p class="text-sm text-green-800 dark:text-green-200">Processando assinatura digital...</p></div></div></div>` : ``}` : ``}</div></div>` : ``}`;
});
const css = {
  code: '.drawer-ficha{top:64px !important;height:calc(100vh - 64px) !important;max-width:940px !important;z-index:50 !important}[role="presentation"].fixed.top-0.start-0.z-50.w-full.h-full{top:64px !important;height:calc(100vh - 64px) !important}.z-\\\\[70\\\\]{z-index:70 !important}.z-\\\\[60\\\\]{z-index:60 !important}',
  map: `{"version":3,"file":"FichaDetailPresenter.svelte","sources":["FichaDetailPresenter.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport { Button, Badge, Avatar, Drawer } from \\"flowbite-svelte\\";\\nimport Icon from \\"$lib/components/common/Icon.svelte\\";\\nimport DrawerHeader from \\"$lib/components/common/DrawerHeader.svelte\\";\\nimport EmptyState from \\"$lib/components/common/EmptyState.svelte\\";\\nimport ItemCard from \\"$lib/components/common/ItemCard.svelte\\";\\nimport StatsGrid from \\"$lib/components/common/StatsGrid.svelte\\";\\nimport StatusBadge from \\"$lib/components/ui/StatusBadge.svelte\\";\\nimport LoadingSpinner from \\"$lib/components/common/LoadingSpinner.svelte\\";\\nimport ErrorDisplay from \\"$lib/components/common/ErrorDisplay.svelte\\";\\nimport NovaEntregaDrawerPresenter from \\"./NovaEntregaDrawerPresenter.svelte\\";\\nimport EditarEntregaDrawerPresenter from \\"./EditarEntregaDrawerPresenter.svelte\\";\\nimport DevolucaoModalPresenter from \\"./DevolucaoModalPresenter.svelte\\";\\nimport AssinaturaModalPresenter from \\"./AssinaturaModalPresenter.svelte\\";\\nimport { UIMappingHelpers } from \\"$lib/services/process/shared/uiMappingHelpers\\";\\nexport let fichaCompleteData = null;\\nexport let episDisponiveis = [];\\nexport let usuarios = [];\\nexport let loading = false;\\nexport let error = null;\\nexport let entregaLoading = false;\\nexport let assinaturaLoading = false;\\nexport let devolucaoLoading = false;\\nexport let showNovaEntregaDrawer = false;\\nexport let showEditarEntregaDrawer = false;\\nexport let showDevolucaoModal = false;\\nexport let showAssinaturaModal = false;\\nexport let entregaEdicao = null;\\nexport let equipamentoDevolucao = null;\\nexport let entregaAssinatura = null;\\nexport let open = false;\\nlet hidden = !open;\\nlet lastOpen = open;\\n$: if (open !== lastOpen) {\\n  console.log(\\"\\\\u{1F504} Sincronizando drawer (open changed):\\", { open, hidden, lastOpen });\\n  hidden = !open;\\n  lastOpen = open;\\n}\\n$: if (open) {\\n  console.log(\\"\\\\u{1F3AF} FichaDetailPresenter: Drawer foi aberto, carregando dados...\\", {\\n    open,\\n    hidden,\\n    fichaCompleteData: !!fichaCompleteData,\\n    loading\\n  });\\n}\\nlet activeTab = \\"equipamentos\\";\\n$: fichaData = fichaCompleteData?.data;\\n$: colaborador = fichaData?.ficha?.colaborador;\\n$: equipamentosEmPosse = fichaData?.equipamentosEmPosse || [];\\n$: devolucoes = fichaData?.devolucoes || [];\\n$: entregas = fichaData?.entregas || [];\\n$: historico = fichaData?.historico || [];\\n$: estatisticas = fichaData?.estatisticas;\\n$: if (fichaData) {\\n  console.log(\\"\\\\u{1F3AF} FichaDetailPresenter - dados reativos atualizados:\\");\\n  console.log(\\"  - Equipamentos em posse:\\", equipamentosEmPosse?.length || 0);\\n  console.log(\\"  - Devolu\\\\xE7\\\\xF5es:\\", devolucoes?.length || 0);\\n  console.log(\\"  - Entregas:\\", entregas?.length || 0);\\n  console.log(\\"  - Hist\\\\xF3rico:\\", historico?.length || 0);\\n}\\n$: statusConfig = fichaData?.ficha?.statusDisplay ? UIMappingHelpers.getStatusConfig(\\n  fichaData.ficha.statusDisplay.label,\\n  fichaData.ficha.statusDisplay.cor\\n) : null;\\n$: additionalInfo = colaborador ? [\\n  colaborador.cpfDisplay || colaborador.cpf || \\"CPF n\\\\xE3o dispon\\\\xEDvel\\",\\n  \`\${colaborador.cargo || \\"Cargo n\\\\xE3o informado\\"} \\\\u2022 \${colaborador.empresa || \\"Empresa n\\\\xE3o informada\\"}\`\\n] : [];\\nconst dispatch = createEventDispatcher();\\nfunction handleClose() {\\n  dispatch(\\"close\\");\\n}\\nlet lastHidden = hidden;\\n$: if (hidden !== lastHidden) {\\n  console.log(\\"\\\\u{1F504} Hidden changed:\\", { hidden, lastHidden, open });\\n  if (hidden && open) {\\n    console.log(\\"\\\\u{1F3AF} Drawer fechado externamente, notificando Container\\");\\n    dispatch(\\"close\\");\\n  }\\n  lastHidden = hidden;\\n}\\nfunction handleNovaEntrega() {\\n  dispatch(\\"novaEntrega\\");\\n}\\nfunction handleEditarEntrega(entrega) {\\n  dispatch(\\"editarEntrega\\", { entrega });\\n}\\nfunction handleAssinarEntrega(entrega) {\\n  dispatch(\\"assinarEntrega\\", { entrega });\\n}\\nfunction handleDevolverEquipamento(equipamento) {\\n  dispatch(\\"devolverEquipamento\\", { equipamento });\\n}\\nfunction handleImprimirEntrega(entrega) {\\n  dispatch(\\"imprimirEntrega\\", { entrega });\\n}\\nfunction handleCancelarEntrega(entrega) {\\n  dispatch(\\"cancelarEntrega\\", { entrega, motivo: \\"Cancelamento solicitado\\" });\\n}\\nfunction getEventIcon(tipo) {\\n  return UIMappingHelpers.getEventIcon(tipo);\\n}\\nfunction getStatusClasses(cor) {\\n  return UIMappingHelpers.getColorClasses(cor);\\n}\\nfunction getBadgeColor(cor) {\\n  return UIMappingHelpers.getBadgeColor(cor);\\n}\\n$: anyNestedDrawerOpen = showNovaEntregaDrawer || showEditarEntregaDrawer || showDevolucaoModal || showAssinaturaModal;\\n<\/script>\\n\\n<style>\\n  :global(.drawer-ficha) {\\n    top: 64px !important; /* Altura do header */\\n    height: calc(100vh - 64px) !important;\\n    max-width: 940px !important;\\n    z-index: 50 !important;\\n  }\\n  \\n  /* Ajustar backdrop para não cobrir header - seletor mais específico */\\n  :global([role=\\"presentation\\"].fixed.top-0.start-0.z-50.w-full.h-full) {\\n    top: 64px !important; /* Começar abaixo do header */\\n    height: calc(100vh - 64px) !important;\\n  }\\n  \\n  /* Garantir que modais e drawers internos fiquem na frente */\\n  :global(.z-\\\\\\\\[70\\\\\\\\]) {\\n    z-index: 70 !important;\\n  }\\n  \\n  :global(.z-\\\\\\\\[60\\\\\\\\]) {\\n    z-index: 60 !important;\\n  }\\n</style>\\n\\n<!-- ==================== DRAWER PRINCIPAL ==================== -->\\n<Drawer \\n  bind:hidden\\n  placement=\\"right\\" \\n  width=\\"w-full max-w-[940px]\\"\\n  backdrop={!anyNestedDrawerOpen}\\n  activateClickOutside={!anyNestedDrawerOpen}\\n  bgOpacity=\\"bg-black/50\\"\\n  position=\\"fixed\\"\\n  id=\\"ficha-detail-drawer\\"\\n  class=\\"drawer-ficha\\"\\n>\\n  <!-- ✅ REFATORADO: Usar DrawerHeader aprimorado -->\\n  <DrawerHeader\\n    title={colaborador?.nome || 'Nome não disponível'}\\n    objectType=\\"FICHA EPI\\"\\n    iconName=\\"UserOutline\\"\\n    status={fichaData?.ficha?.status}\\n    statusType=\\"ficha\\"\\n    {additionalInfo}\\n    primaryAction={{ text: 'Nova Entrega', icon: 'PlusOutline' }}\\n    on:close={handleClose}\\n    on:primaryAction={handleNovaEntrega}\\n  />\\n  \\n  <!-- Estatísticas removidas conforme solicitado -->\\n  \\n  <!-- Loading State -->\\n  {#if loading}\\n    <div class=\\"flex justify-center items-center py-12\\">\\n      <LoadingSpinner />\\n    </div>\\n  {:else if error}\\n    <ErrorDisplay message={error} />\\n  {:else if fichaData}\\n\\n    <!-- ==================== TABS NAVIGATION ==================== -->\\n    <div class=\\"border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800\\">\\n      <nav class=\\"flex space-x-8 px-6\\" aria-label=\\"Tabs\\">\\n        {#each [\\n          { id: 'equipamentos', label: 'Equipamentos', count: equipamentosEmPosse.length },\\n          { id: 'devolucoes', label: 'Devoluções', count: devolucoes.length },\\n          { id: 'entregas', label: 'Entregas', count: entregas.length },\\n          { id: 'historico', label: 'Histórico', count: historico.length }\\n        ] as tab}\\n          <button\\n            class=\\"py-4 px-1 border-b-2 font-medium text-sm transition-colors {activeTab === tab.id \\n              ? 'border-primary-500 text-primary-600 dark:text-primary-400' \\n              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}\\"\\n            on:click={() => activeTab = tab.id}\\n          >\\n            {tab.label}\\n            <span class=\\"ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300\\">\\n              {tab.count}\\n            </span>\\n          </button>\\n        {/each}\\n      </nav>\\n    </div>\\n\\n    <!-- ==================== TAB CONTENT ==================== -->\\n    <div class=\\"p-6\\">\\n      \\n      <!-- TAB: Equipamentos em Posse -->\\n      {#if activeTab === 'equipamentos'}\\n        <div class=\\"space-y-4\\">\\n          <div class=\\"flex justify-between items-center\\">\\n            <h3 class=\\"text-xl font-semibold text-gray-900 dark:text-white\\">Equipamentos com o Colaborador</h3>\\n          </div>\\n\\n          {#if equipamentosEmPosse.length === 0}\\n            <EmptyState \\n              icon=\\"ClipboardDocumentListOutline\\" \\n              message=\\"Nenhum equipamento em posse\\"\\n              description=\\"Este colaborador não possui equipamentos atualmente\\"\\n            />\\n          {:else}\\n            <div class=\\"space-y-3\\">\\n              {#each equipamentosEmPosse as equipamento (equipamento.id)}\\n                <ItemCard>\\n                  <div slot=\\"content\\">\\n                    <h4 class=\\"font-medium text-gray-900 dark:text-white\\">{equipamento.nomeEquipamento}</h4>\\n                    <p class=\\"text-sm text-gray-600 dark:text-gray-300\\">\\n                      CA: {equipamento.numeroCA || equipamento.registroCA} • {equipamento.categoria}\\n                    </p>\\n                    <p class=\\"text-sm text-gray-600 dark:text-gray-300\\">\\n                      Entregue em: {equipamento.dataEntrega}\\n                    </p>\\n                    \\n                    <!-- ✅ SIMPLIFICADO: Status de vencimento já vem processado -->\\n                    <div class=\\"mt-2\\">\\n                      <Badge \\n                        color={UIMappingHelpers.getBadgeColor(equipamento.statusVencimentoDisplay.cor)} \\n                        class=\\"rounded-sm\\"\\n                      >\\n                        {equipamento.statusVencimentoDisplay.texto}\\n                      </Badge>\\n                      <span class=\\"ml-2 text-sm text-gray-600 dark:text-gray-300\\">\\n                        {UIMappingHelpers.formatDaysRemaining(\\n                          equipamento.statusVencimentoDisplay.diasRestantes,\\n                          equipamento.statusVencimentoDisplay.statusDetalhado\\n                        )}\\n                      </span>\\n                    </div>\\n                  </div>\\n\\n                  <!-- ✅ SIMPLIFICADO: Lógica de ações já vem do backend -->\\n                  <div slot=\\"actions\\">\\n                    {#if equipamento.podeDevolver}\\n                      <Button \\n                        size=\\"sm\\" \\n                        color=\\"alternative\\" \\n                        class=\\"rounded-sm\\"\\n                        on:click={() => handleDevolverEquipamento(equipamento)}\\n                      >\\n                        Devolver\\n                      </Button>\\n                    {/if}\\n                  </div>\\n                </ItemCard>\\n              {/each}\\n            </div>\\n          {/if}\\n        </div>\\n\\n      <!-- TAB: Devoluções -->\\n      {:else if activeTab === 'devolucoes'}\\n        <div class=\\"space-y-4\\">\\n          <h3 class=\\"text-xl font-semibold text-gray-900 dark:text-white\\">Devoluções Efetuadas</h3>\\n\\n          {#if devolucoes.length === 0}\\n            <EmptyState \\n              icon=\\"TrashBinOutline\\" \\n              message=\\"Nenhuma devolução registrada\\"\\n              description=\\"Não há histórico de devoluções para este colaborador\\"\\n            />\\n          {:else}\\n            <div class=\\"space-y-3\\">\\n              {#each devolucoes as devolucao (devolucao.id)}\\n                <div class=\\"bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4\\">\\n                  <div class=\\"flex justify-between items-start\\">\\n                    <div class=\\"flex-1\\">\\n                      <!-- Header com nome do equipamento e badge de status -->\\n                      <div class=\\"flex items-center justify-between mb-3\\">\\n                        <h4 class=\\"font-semibold text-gray-900 dark:text-white\\">{devolucao.nomeEquipamento}</h4>\\n                        <Badge \\n                          color={devolucao.status === 'processada' ? 'green' : 'red'} \\n                          class=\\"rounded-sm\\"\\n                        >\\n                          {devolucao.status === 'processada' ? 'Processada' : 'Cancelada'}\\n                        </Badge>\\n                      </div>\\n                      \\n                      <!-- Informações principais em grid -->\\n                      <div class=\\"grid grid-cols-2 gap-4 mb-3\\">\\n                        <div>\\n                          <span class=\\"text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide\\">CA / Categoria</span>\\n                          <p class=\\"text-sm text-gray-900 dark:text-white\\">{devolucao.numeroCA} • {devolucao.categoria}</p>\\n                        </div>\\n                        <div>\\n                          <span class=\\"text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide\\">Data Devolução</span>\\n                          <p class=\\"text-sm text-gray-900 dark:text-white\\">{devolucao.dataDevolucao}</p>\\n                        </div>\\n                      </div>\\n                      \\n                      <!-- Motivo da devolução -->\\n                      <div class=\\"mb-3\\">\\n                        <span class=\\"text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide\\">Motivo</span>\\n                        <p class=\\"text-sm text-gray-900 dark:text-white\\">{devolucao.motivoDisplay}</p>\\n                      </div>\\n                      \\n                      <!-- Badges de condição (apenas se não for BOM) -->\\n                      {#if devolucao.condicaoItem && devolucao.condicaoItem !== 'BOM'}\\n                        <div class=\\"flex items-center space-x-2\\">\\n                          <Badge \\n                            color={devolucao.condicaoItem === 'DANIFICADO' ? 'yellow' : 'red'} \\n                            class=\\"rounded-sm text-xs\\"\\n                          >\\n                            {devolucao.condicaoItem}\\n                          </Badge>\\n                        </div>\\n                      {/if}\\n                      \\n                      <!-- Observações (se houver) -->\\n                      {#if devolucao.observacoes}\\n                        <div class=\\"mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded border-l-4 border-blue-400\\">\\n                          <p class=\\"text-sm text-gray-700 dark:text-gray-300 italic\\">\\"{devolucao.observacoes}\\"</p>\\n                        </div>\\n                      {/if}\\n                    </div>\\n                  </div>\\n                </div>\\n              {/each}\\n            </div>\\n          {/if}\\n        </div>\\n\\n      <!-- TAB: Entregas -->\\n      {:else if activeTab === 'entregas'}\\n        <div class=\\"space-y-4\\">\\n          <h3 class=\\"text-xl font-semibold text-gray-900 dark:text-white\\">Entregas Registradas</h3>\\n\\n          {#if entregas.length === 0}\\n            <EmptyState \\n              icon=\\"TruckOutline\\" \\n              message=\\"Nenhuma entrega registrada\\"\\n              description=\\"Não há histórico de entregas para este colaborador\\"\\n            />\\n          {:else}\\n            <div class=\\"space-y-3\\">\\n              {#each entregas as entrega (entrega.id)}\\n                <ItemCard>\\n                  <div slot=\\"content\\">\\n                    <h4 class=\\"font-medium text-gray-900 dark:text-white\\">Entrega {entrega.numero}</h4>\\n                    <p class=\\"text-sm text-gray-600 dark:text-gray-300\\">\\n                      Data: {entrega.dataEntrega}\\n                    </p>\\n                    \\n                    <!-- ✅ SIMPLIFICADO: Status já vem processado -->\\n                    <div class=\\"mt-2\\">\\n                      <Badge \\n                        color={UIMappingHelpers.getBadgeColor(entrega.statusDisplay.cor)} \\n                        class=\\"rounded-sm\\"\\n                      >\\n                        {entrega.statusDisplay.label}\\n                      </Badge>\\n                    </div>\\n\\n                    <!-- Itens da entrega -->\\n                    <div class=\\"mt-2\\">\\n                      <p class=\\"text-sm font-medium text-gray-900 dark:text-white\\">Itens:</p>\\n                      <div class=\\"mt-1 space-y-1\\">\\n                        {#each entrega.itens as item (item.id)}\\n                          <div class=\\"flex items-center space-x-2\\">\\n                            <span class=\\"inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-gray-700 rounded\\">\\n                              {item.quantidade}\\n                            </span>\\n                            <div class=\\"px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-gray-800 dark:text-gray-200\\">\\n                              {item.nomeEquipamento} (CA: {item.numeroCA || item.registroCA})\\n                            </div>\\n                          </div>\\n                        {/each}\\n                      </div>\\n                    </div>\\n                  </div>\\n\\n                  <!-- ✅ SIMPLIFICADO: Ações permitidas já vêm do backend -->\\n                  <div slot=\\"actions\\" class=\\"flex space-x-2\\">\\n                    {#each entrega.acoes as acao}\\n                      {#if acao === 'assinar'}\\n                        <Button size=\\"sm\\" color=\\"primary\\" class=\\"rounded-sm\\" on:click={() => handleAssinarEntrega(entrega)}>\\n                          Assinar\\n                        </Button>\\n                      {:else if acao === 'imprimir'}\\n                        <Button size=\\"sm\\" color=\\"alternative\\" class=\\"rounded-sm\\" on:click={() => handleImprimirEntrega(entrega)}>\\n                          Imprimir\\n                        </Button>\\n                      {:else if acao === 'editar'}\\n                        <Button size=\\"sm\\" color=\\"alternative\\" class=\\"rounded-sm\\" on:click={() => handleEditarEntrega(entrega)}>\\n                          Editar\\n                        </Button>\\n                      {/if}\\n                    {/each}\\n                  </div>\\n                </ItemCard>\\n              {/each}\\n            </div>\\n          {/if}\\n        </div>\\n\\n      <!-- TAB: Histórico -->\\n      {:else if activeTab === 'historico'}\\n        <div class=\\"space-y-4\\">\\n          <h3 class=\\"text-xl font-semibold text-gray-900 dark:text-white\\">Histórico Completo</h3>\\n\\n          {#if historico.length === 0}\\n            <EmptyState \\n              icon=\\"ClockOutline\\" \\n              message=\\"Nenhum evento registrado\\"\\n              description=\\"Não há histórico de atividades para esta ficha\\"\\n            />\\n          {:else}\\n            <div class=\\"space-y-4\\">\\n              {#each historico as evento (evento.id)}\\n                <div class=\\"flex items-start space-x-4\\">\\n                  <!-- ✅ SIMPLIFICADO: Usar helper para ícone -->\\n                  <div class={\`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center \${getStatusClasses(evento.tipoDisplay.cor)}\`}>\\n                    <Icon name={getEventIcon(evento.tipoDisplay.tipo)} class=\\"w-5 h-5\\" />\\n                  </div>\\n\\n                  <div class=\\"flex-1 min-w-0\\">\\n                    <div class=\\"flex items-center justify-between\\">\\n                      <div>\\n                        <!-- ✅ SIMPLIFICADO: Label já vem do backend -->\\n                        <h4 class=\\"font-medium text-gray-900 dark:text-white\\">{evento.tipoDisplay.label}</h4>\\n                        <p class=\\"text-sm text-gray-600 dark:text-gray-300\\">{evento.acao}</p>\\n                      </div>\\n                      <!-- ✅ SIMPLIFICADO: Data já vem formatada -->\\n                      <span class=\\"text-sm text-gray-500 dark:text-gray-400\\">{evento.dataFormatada}</span>\\n                    </div>\\n\\n                    <!-- ✅ SIMPLIFICADO: Mudança de status já vem formatada -->\\n                    {#if evento.mudancaStatus}\\n                      <p class=\\"text-sm text-blue-600 dark:text-blue-400 mt-1\\">\\n                        {evento.mudancaStatus}\\n                      </p>\\n                    {/if}\\n\\n                    <!-- ✅ SIMPLIFICADO: Resumo já vem pronto do backend -->\\n                    {#if evento.detalhes?.resumo}\\n                      <p class=\\"text-sm text-gray-600 dark:text-gray-300 mt-1\\">\\n                        {evento.detalhes.resumo}\\n                      </p>\\n                    {/if}\\n\\n                    <p class=\\"text-xs text-gray-500 dark:text-gray-400 mt-1\\">\\n                      Responsável: {evento.responsavel}\\n                    </p>\\n                  </div>\\n                </div>\\n              {/each}\\n            </div>\\n          {/if}\\n        </div>\\n      {/if}\\n    </div>\\n  {:else}\\n    <div class=\\"text-center py-8 text-gray-500 dark:text-gray-400\\">\\n      <p>Nenhum dado disponível</p>\\n    </div>\\n  {/if}\\n</Drawer>\\n\\n<!-- ==================== MODALS E DRAWERS ==================== -->\\n\\n<!-- Nova Entrega Drawer -->\\n<NovaEntregaDrawerPresenter\\n  bind:show={showNovaEntregaDrawer}\\n  {episDisponiveis}\\n  {usuarios}\\n  loading={entregaLoading}\\n  on:salvar={(e) => dispatch('salvarNovaEntrega', e.detail)}\\n  on:cancelar={() => dispatch('cancelarNovaEntrega')}\\n/>\\n\\n<!-- Editar Entrega Drawer -->\\n<EditarEntregaDrawerPresenter\\n  bind:show={showEditarEntregaDrawer}\\n  {episDisponiveis}\\n  entrega={entregaEdicao}\\n  loading={entregaLoading}\\n  on:salvar={(e) => dispatch('salvarEdicaoEntrega', e.detail)}\\n  on:cancelar={() => dispatch('cancelarEdicaoEntrega')}\\n/>\\n\\n<!-- Modal de Devolução -->\\n<DevolucaoModalPresenter\\n  bind:show={showDevolucaoModal}\\n  equipamento={equipamentoDevolucao}\\n  loading={devolucaoLoading}\\n  on:confirmar={(e) => dispatch('confirmarDevolucao', e.detail)}\\n  on:cancelar={() => dispatch('cancelarDevolucao')}\\n/>\\n\\n<!-- Modal de Assinatura -->\\n<AssinaturaModalPresenter\\n  bind:show={showAssinaturaModal}\\n  entrega={entregaAssinatura}\\n  loading={assinaturaLoading}\\n  on:confirmar={(e) => dispatch('confirmarAssinatura', e.detail)}\\n  on:cancelar={() => dispatch('cancelarAssinatura')}\\n/>"],"names":[],"mappings":"AAiHU,aAAe,CACrB,GAAG,CAAE,IAAI,CAAC,UAAU,CACpB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAAU,CACrC,SAAS,CAAE,KAAK,CAAC,UAAU,CAC3B,OAAO,CAAE,EAAE,CAAC,UACd,CAGQ,4DAA8D,CACpE,GAAG,CAAE,IAAI,CAAC,UAAU,CACpB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAC7B,CAGQ,WAAa,CACnB,OAAO,CAAE,EAAE,CAAC,UACd,CAEQ,WAAa,CACnB,OAAO,CAAE,EAAE,CAAC,UACd"}`
};
const FichaDetailPresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fichaData;
  let colaborador;
  let equipamentosEmPosse;
  let devolucoes;
  let entregas;
  let historico;
  let additionalInfo;
  let anyNestedDrawerOpen;
  let { fichaCompleteData = null } = $$props;
  let { episDisponiveis = [] } = $$props;
  let { usuarios = [] } = $$props;
  let { loading = false } = $$props;
  let { error = null } = $$props;
  let { entregaLoading = false } = $$props;
  let { assinaturaLoading = false } = $$props;
  let { devolucaoLoading = false } = $$props;
  let { showNovaEntregaDrawer = false } = $$props;
  let { showEditarEntregaDrawer = false } = $$props;
  let { showDevolucaoModal = false } = $$props;
  let { showAssinaturaModal = false } = $$props;
  let { entregaEdicao = null } = $$props;
  let { equipamentoDevolucao = null } = $$props;
  let { entregaAssinatura = null } = $$props;
  let { open = false } = $$props;
  let hidden = !open;
  let lastOpen = open;
  let activeTab = "equipamentos";
  const dispatch = createEventDispatcher();
  let lastHidden = hidden;
  if ($$props.fichaCompleteData === void 0 && $$bindings.fichaCompleteData && fichaCompleteData !== void 0) $$bindings.fichaCompleteData(fichaCompleteData);
  if ($$props.episDisponiveis === void 0 && $$bindings.episDisponiveis && episDisponiveis !== void 0) $$bindings.episDisponiveis(episDisponiveis);
  if ($$props.usuarios === void 0 && $$bindings.usuarios && usuarios !== void 0) $$bindings.usuarios(usuarios);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  if ($$props.entregaLoading === void 0 && $$bindings.entregaLoading && entregaLoading !== void 0) $$bindings.entregaLoading(entregaLoading);
  if ($$props.assinaturaLoading === void 0 && $$bindings.assinaturaLoading && assinaturaLoading !== void 0) $$bindings.assinaturaLoading(assinaturaLoading);
  if ($$props.devolucaoLoading === void 0 && $$bindings.devolucaoLoading && devolucaoLoading !== void 0) $$bindings.devolucaoLoading(devolucaoLoading);
  if ($$props.showNovaEntregaDrawer === void 0 && $$bindings.showNovaEntregaDrawer && showNovaEntregaDrawer !== void 0) $$bindings.showNovaEntregaDrawer(showNovaEntregaDrawer);
  if ($$props.showEditarEntregaDrawer === void 0 && $$bindings.showEditarEntregaDrawer && showEditarEntregaDrawer !== void 0) $$bindings.showEditarEntregaDrawer(showEditarEntregaDrawer);
  if ($$props.showDevolucaoModal === void 0 && $$bindings.showDevolucaoModal && showDevolucaoModal !== void 0) $$bindings.showDevolucaoModal(showDevolucaoModal);
  if ($$props.showAssinaturaModal === void 0 && $$bindings.showAssinaturaModal && showAssinaturaModal !== void 0) $$bindings.showAssinaturaModal(showAssinaturaModal);
  if ($$props.entregaEdicao === void 0 && $$bindings.entregaEdicao && entregaEdicao !== void 0) $$bindings.entregaEdicao(entregaEdicao);
  if ($$props.equipamentoDevolucao === void 0 && $$bindings.equipamentoDevolucao && equipamentoDevolucao !== void 0) $$bindings.equipamentoDevolucao(equipamentoDevolucao);
  if ($$props.entregaAssinatura === void 0 && $$bindings.entregaAssinatura && entregaAssinatura !== void 0) $$bindings.entregaAssinatura(entregaAssinatura);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (open !== lastOpen) {
        console.log("🔄 Sincronizando drawer (open changed):", { open, hidden, lastOpen });
        hidden = !open;
        lastOpen = open;
      }
    }
    {
      if (open) {
        console.log("🎯 FichaDetailPresenter: Drawer foi aberto, carregando dados...", {
          open,
          hidden,
          fichaCompleteData: !!fichaCompleteData,
          loading
        });
      }
    }
    fichaData = fichaCompleteData?.data;
    colaborador = fichaData?.ficha?.colaborador;
    equipamentosEmPosse = fichaData?.equipamentosEmPosse || [];
    devolucoes = fichaData?.devolucoes || [];
    entregas = fichaData?.entregas || [];
    historico = fichaData?.historico || [];
    fichaData?.estatisticas;
    {
      if (fichaData) {
        console.log("🎯 FichaDetailPresenter - dados reativos atualizados:");
        console.log("  - Equipamentos em posse:", equipamentosEmPosse?.length || 0);
        console.log("  - Devoluções:", devolucoes?.length || 0);
        console.log("  - Entregas:", entregas?.length || 0);
        console.log("  - Histórico:", historico?.length || 0);
      }
    }
    fichaData?.ficha?.statusDisplay ? UIMappingHelpers.getStatusConfig(fichaData.ficha.statusDisplay.label, fichaData.ficha.statusDisplay.cor) : null;
    additionalInfo = colaborador ? [
      colaborador.cpfDisplay || colaborador.cpf || "CPF não disponível",
      `${colaborador.cargo || "Cargo não informado"} • ${colaborador.empresa || "Empresa não informada"}`
    ] : [];
    {
      if (hidden !== lastHidden) {
        console.log("🔄 Hidden changed:", { hidden, lastHidden, open });
        if (hidden && open) {
          console.log("🎯 Drawer fechado externamente, notificando Container");
          dispatch("close");
        }
        lastHidden = hidden;
      }
    }
    anyNestedDrawerOpen = showNovaEntregaDrawer || showEditarEntregaDrawer || showDevolucaoModal || showAssinaturaModal;
    $$rendered = ` ${validate_component(Drawer, "Drawer").$$render(
      $$result,
      {
        placement: "right",
        width: "w-full max-w-[940px]",
        backdrop: !anyNestedDrawerOpen,
        activateClickOutside: !anyNestedDrawerOpen,
        bgOpacity: "bg-black/50",
        position: "fixed",
        id: "ficha-detail-drawer",
        class: "drawer-ficha",
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
              title: colaborador?.nome || "Nome não disponível",
              objectType: "FICHA EPI",
              iconName: "UserOutline",
              status: fichaData?.ficha?.status,
              statusType: "ficha",
              additionalInfo,
              primaryAction: {
                text: "Nova Entrega",
                icon: "PlusOutline"
              }
            },
            {},
            {}
          )}   ${loading ? `<div class="flex justify-center items-center py-12">${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}</div>` : `${error ? `${validate_component(ErrorDisplay, "ErrorDisplay").$$render($$result, { message: error }, {}, {})}` : `${fichaData ? ` <div class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"><nav class="flex space-x-8 px-6" aria-label="Tabs">${each(
            [
              {
                id: "equipamentos",
                label: "Equipamentos",
                count: equipamentosEmPosse.length
              },
              {
                id: "devolucoes",
                label: "Devoluções",
                count: devolucoes.length
              },
              {
                id: "entregas",
                label: "Entregas",
                count: entregas.length
              },
              {
                id: "historico",
                label: "Histórico",
                count: historico.length
              }
            ],
            (tab) => {
              return `<button class="${"py-4 px-1 border-b-2 font-medium text-sm transition-colors " + escape(
                activeTab === tab.id ? "border-primary-500 text-primary-600 dark:text-primary-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600",
                true
              )}">${escape(tab.label)} <span class="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">${escape(tab.count)}</span> </button>`;
            }
          )}</nav></div>  <div class="p-6"> ${`<div class="space-y-4"><div class="flex justify-between items-center" data-svelte-h="svelte-1ffw2a3"><h3 class="text-xl font-semibold text-gray-900 dark:text-white">Equipamentos com o Colaborador</h3></div> ${equipamentosEmPosse.length === 0 ? `${validate_component(EmptyState, "EmptyState").$$render(
            $$result,
            {
              icon: "ClipboardDocumentListOutline",
              message: "Nenhum equipamento em posse",
              description: "Este colaborador não possui equipamentos atualmente"
            },
            {},
            {}
          )}` : `<div class="space-y-3">${each(equipamentosEmPosse, (equipamento) => {
            return `${validate_component(ItemCard, "ItemCard").$$render($$result, {}, {}, {
              actions: () => {
                return `<div slot="actions">${equipamento.podeDevolver ? `${validate_component(Button, "Button").$$render(
                  $$result,
                  {
                    size: "sm",
                    color: "alternative",
                    class: "rounded-sm"
                  },
                  {},
                  {
                    default: () => {
                      return `Devolver
                      `;
                    }
                  }
                )}` : ``} </div>`;
              },
              content: () => {
                return `<div slot="content"><h4 class="font-medium text-gray-900 dark:text-white">${escape(equipamento.nomeEquipamento)}</h4> <p class="text-sm text-gray-600 dark:text-gray-300">CA: ${escape(equipamento.numeroCA || equipamento.registroCA)} • ${escape(equipamento.categoria)}</p> <p class="text-sm text-gray-600 dark:text-gray-300">Entregue em: ${escape(equipamento.dataEntrega)}</p>  <div class="mt-2">${validate_component(Badge, "Badge").$$render(
                  $$result,
                  {
                    color: UIMappingHelpers.getBadgeColor(equipamento.statusVencimentoDisplay.cor),
                    class: "rounded-sm"
                  },
                  {},
                  {
                    default: () => {
                      return `${escape(equipamento.statusVencimentoDisplay.texto)} `;
                    }
                  }
                )} <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">${escape(UIMappingHelpers.formatDaysRemaining(equipamento.statusVencimentoDisplay.diasRestantes, equipamento.statusVencimentoDisplay.statusDetalhado))} </span></div> </div>`;
              },
              default: () => {
                return ` `;
              }
            })}`;
          })}</div>`}</div> `}</div>` : `<div class="text-center py-8 text-gray-500 dark:text-gray-400" data-svelte-h="svelte-tlgdc6"><p>Nenhum dado disponível</p></div>`}`}`}`;
        }
      }
    )}   ${validate_component(NovaEntregaDrawerPresenter, "NovaEntregaDrawerPresenter").$$render(
      $$result,
      {
        episDisponiveis,
        usuarios,
        loading: entregaLoading,
        show: showNovaEntregaDrawer
      },
      {
        show: ($$value) => {
          showNovaEntregaDrawer = $$value;
          $$settled = false;
        }
      },
      {}
    )}  ${validate_component(EditarEntregaDrawerPresenter, "EditarEntregaDrawerPresenter").$$render(
      $$result,
      {
        episDisponiveis,
        entrega: entregaEdicao,
        loading: entregaLoading,
        show: showEditarEntregaDrawer
      },
      {
        show: ($$value) => {
          showEditarEntregaDrawer = $$value;
          $$settled = false;
        }
      },
      {}
    )}  ${validate_component(DevolucaoModalPresenter, "DevolucaoModalPresenter").$$render(
      $$result,
      {
        equipamento: equipamentoDevolucao,
        loading: devolucaoLoading,
        show: showDevolucaoModal
      },
      {
        show: ($$value) => {
          showDevolucaoModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}  ${validate_component(AssinaturaModalPresenter, "AssinaturaModalPresenter").$$render(
      $$result,
      {
        entrega: entregaAssinatura,
        loading: assinaturaLoading,
        show: showAssinaturaModal
      },
      {
        show: ($$value) => {
          showAssinaturaModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const FichaDetailContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let containerState;
  let $fichaDataStore, $$unsubscribe_fichaDataStore;
  $$unsubscribe_fichaDataStore = subscribe(fichaDataStore, (value) => $fichaDataStore = value);
  let { open = false } = $$props;
  let { fichaId = null } = $$props;
  createEventDispatcher();
  let fichaCompleteData = null;
  let episDisponiveis = [];
  let usuarios = [];
  let loading = true;
  let error = null;
  let showNovaEntregaDrawer = false;
  let showEditarEntregaDrawer = false;
  let showDevolucaoModal = false;
  let showAssinaturaModal = false;
  let entregaLoading = false;
  let assinaturaLoading = false;
  let devolucaoLoading = false;
  let entregaEdicao = null;
  let equipamentoDevolucao = null;
  let entregaAssinatura = null;
  let lastFichaId = null;
  async function loadFichaData() {
    if (!fichaId) return;
    loading = true;
    error = null;
    lastFichaId = fichaId;
    try {
      console.log("📋 FichaDetailContainer: Carregando ficha completa:", fichaId);
      fichaCompleteData = await fichaQueryAdapter.getFichaComplete(fichaId);
      console.log("✅ Dados da ficha carregados");
      console.log("🔍 Equipamentos em posse:", fichaCompleteData?.data?.equipamentosEmPosse?.length || 0);
      console.log("🔄 Devoluções:", fichaCompleteData?.data?.devolucoes?.length || 0);
      console.log("🚚 Entregas:", fichaCompleteData?.data?.entregas?.length || 0);
      console.log("📝 Histórico:", fichaCompleteData?.data?.historico?.length || 0);
    } catch (err) {
      console.error("❌ Erro ao carregar ficha:", err);
      error = err instanceof Error ? err.message : "Erro desconhecido";
      notify.error("Erro ao carregar ficha", "Não foi possível carregar os dados da ficha");
    } finally {
      loading = false;
    }
  }
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.fichaId === void 0 && $$bindings.fichaId && fichaId !== void 0) $$bindings.fichaId(fichaId);
  {
    if (open && fichaId) {
      console.log("🎯 FichaDetailContainer: Estado open mudou para true, fichaId:", fichaId);
    }
  }
  {
    if (fichaId && $fichaDataStore.has(fichaId)) {
      const cachedData = $fichaDataStore.get(fichaId);
      if (cachedData && fichaCompleteData !== cachedData) {
        fichaCompleteData = cachedData;
        console.log("🔄 Dados completos atualizados via store reativo:", fichaId);
      }
    }
  }
  {
    if (open && fichaId && fichaId !== lastFichaId) {
      loadFichaData();
    }
  }
  containerState = {
    // Dados principais (já processados pelo backend)
    fichaCompleteData,
    episDisponiveis,
    usuarios,
    // Estados de loading
    loading,
    error,
    entregaLoading,
    assinaturaLoading,
    devolucaoLoading,
    // Estados dos modals/drawers
    showNovaEntregaDrawer,
    showEditarEntregaDrawer,
    showDevolucaoModal,
    showAssinaturaModal,
    // Dados de contexto para modals
    entregaEdicao,
    equipamentoDevolucao,
    entregaAssinatura,
    // Controle de abertura
    open
  };
  $$unsubscribe_fichaDataStore();
  return `    ${validate_component(FichaDetailPresenter, "FichaDetailPresenter").$$render($$result, Object.assign({}, containerState), {}, {})}`;
});
const FichasContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasActiveFilters;
  let presentationData;
  let $fichasStore, $$unsubscribe_fichasStore;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { initialPageSize = 10 } = $$props;
  let { autoRefresh = false } = $$props;
  let { refreshInterval = 3e4 } = $$props;
  const fichasStore = createPaginatedStore(
    (params) => fichaQueryAdapter.getFichasList({
      page: params.page || 1,
      limit: params.limit || initialPageSize,
      search: params.search || void 0,
      // 🆕 BUSCA UNIFICADA: CPF, nome, matrícula
      // ✅ CORREÇÃO: Usar nomes corretos dos parâmetros conforme container envia
      empresaFilter: params.empresaFilter !== "todas" ? params.empresaFilter : void 0,
      // Container envia 'empresaFilter'
      cargo: params.cargo !== "todos" ? params.cargo : void 0,
      status: params.status !== "todos" ? params.status : void 0,
      devolucaoPendente: !!params.devolucaoPendente
    }).then(
      (response) => ({
        data: response.items,
        total: response.total,
        page: response.page || params.page || 1,
        pageSize: response.pageSize || params.limit || initialPageSize,
        totalPages: Math.ceil(response.total / (params.limit || initialPageSize))
      })
    ),
    { initialPageSize }
  );
  $$unsubscribe_fichasStore = subscribe(fichasStore, (value) => $fichasStore = value);
  let showDetail = false;
  let selectedFichaId = null;
  let empresaOptions = [
    {
      value: "todas",
      label: "Todas as Empresas"
    }
  ];
  let cargoOptions = [{ value: "todos", label: "Todos os Cargos" }];
  function handleDirectLink(fichaId) {
    if (fichaId && fichaId !== selectedFichaId) {
      console.log("🔗 Abrindo ficha via link direto:", fichaId);
      selectedFichaId = fichaId;
      showDetail = true;
    }
  }
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
    {
      {
        if ($page.url.searchParams.get("ficha")) {
          handleDirectLink($page.url.searchParams.get("ficha"));
        }
      }
    }
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
    )}  ${showDetail ? `${validate_component(FichaDetailContainer, "FichaDetailContainer").$$render(
      $$result,
      {
        fichaId: selectedFichaId,
        open: showDetail
      },
      {
        open: ($$value) => {
          showDetail = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}  ${``}`;
  } while (!$$settled);
  $$unsubscribe_fichasStore();
  $$unsubscribe_page();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `  ${$$result.head += `<!-- HEAD_svelte-161hi6l_START -->${$$result.title = `<title>Fichas de EPI - DataLife EPI</title>`, ""}<!-- HEAD_svelte-161hi6l_END -->`, ""}  ${validate_component(FichasContainer, "FichasContainer").$$render($$result, { initialPageSize: 10, autoRefresh: false }, {}, {})}`;
});
export {
  Page as default
};
