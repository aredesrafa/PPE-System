import { c as create_ssr_component, a as compute_rest_props, d as spread, g as add_attribute, e as escape_object, f as escape_attribute_value, v as validate_component, h as escape } from "./ssr.js";
import { twMerge } from "tailwind-merge";
import { L as LOADING_TEXTS } from "./content.js";
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
export {
  LoadingSpinner as L
};
