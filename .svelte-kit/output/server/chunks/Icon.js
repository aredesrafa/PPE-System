import { c as create_ssr_component, g as add_attribute } from "./ssr.js";
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let finalClass;
  let { name } = $$props;
  let { className = "" } = $$props;
  let { size = "w-4 h-4" } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  finalClass = `${size} ${className}`;
  return ` ${`<div${add_attribute("class", `${finalClass} bg-gray-200 dark:bg-gray-600 rounded animate-pulse`, 0)}></div> `}`;
});
export {
  Icon as I
};
