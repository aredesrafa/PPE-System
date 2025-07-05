import { c as create_ssr_component, i as createEventDispatcher, g as add_attribute, v as validate_component, h as escape } from "./ssr.js";
import { B as Button } from "./Button.js";
import { C as ChevronDownOutline } from "./ChevronDownOutline.js";
const SearchableDropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedOption;
  let displayText;
  let { options = [] } = $$props;
  let { value = "" } = $$props;
  let { placeholder = "Selecione uma opção" } = $$props;
  let { searchPlaceholder = "Buscar..." } = $$props;
  let { disabled = false } = $$props;
  const size = "sm";
  let { color = "alternative" } = $$props;
  let { noOptionsText = "Nenhuma opção encontrada" } = $$props;
  let { allowClear = false } = $$props;
  let { clearText = "Limpar seleção" } = $$props;
  createEventDispatcher();
  let searchTerm = "";
  let dropdownElement;
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.searchPlaceholder === void 0 && $$bindings.searchPlaceholder && searchPlaceholder !== void 0) $$bindings.searchPlaceholder(searchPlaceholder);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.noOptionsText === void 0 && $$bindings.noOptionsText && noOptionsText !== void 0) $$bindings.noOptionsText(noOptionsText);
  if ($$props.allowClear === void 0 && $$bindings.allowClear && allowClear !== void 0) $$bindings.allowClear(allowClear);
  if ($$props.clearText === void 0 && $$bindings.clearText && clearText !== void 0) $$bindings.clearText(clearText);
  options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
  selectedOption = options.find((option) => option.value === value);
  displayText = selectedOption?.label || placeholder;
  return ` <div class="relative"${add_attribute("this", dropdownElement, 0)}>${validate_component(Button, "Button").$$render(
    $$result,
    {
      color,
      disabled,
      class: "w-full justify-between rounded-sm text-left h-10 px-3 text-sm " + (selectedOption ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400")
    },
    {},
    {
      default: () => {
        return `<span class="truncate">${escape(displayText)}</span> ${validate_component(ChevronDownOutline, "ChevronDownOutline").$$render(
          $$result,
          {
            class: "w-4 h-4 ml-2 flex-shrink-0  transition-transform"
          },
          {},
          {}
        )}`;
      }
    }
  )} ${``}</div>`;
});
export {
  SearchableDropdown as S
};
