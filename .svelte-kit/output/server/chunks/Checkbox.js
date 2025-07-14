import { c as create_ssr_component, a as compute_rest_props, b as compute_slots, j as getContext, v as validate_component, d as spread, g as add_attribute, e as escape_object, f as escape_attribute_value, l as each, h as escape } from "./ssr.js";
import { twMerge } from "tailwind-merge";
import { f as Label } from "./ErrorDisplay.js";
const colorClasses = {
  primary: "text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600",
  secondary: "text-secondary-600 focus:ring-secondary-500 dark:focus:ring-secondary-600",
  red: "text-red-600 focus:ring-red-500 dark:focus:ring-red-600",
  green: "text-green-600 focus:ring-green-500 dark:focus:ring-green-600",
  purple: "text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-600",
  teal: "text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600",
  yellow: "text-yellow-400 focus:ring-yellow-500 dark:focus:ring-yellow-600",
  orange: "text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600",
  blue: "text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600"
};
const labelClass = (inline, extraClass) => twMerge(inline ? "inline-flex" : "flex", "items-center", extraClass);
const inputClass = (custom, color, rounded, tinted, spacing, extraClass) => twMerge(
  "w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2",
  spacing,
  tinted ? "dark:bg-gray-600 dark:border-gray-500" : "dark:bg-gray-700 dark:border-gray-600",
  custom && "sr-only peer",
  rounded && "rounded",
  colorClasses[color],
  extraClass
);
const Radio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "custom", "inline", "group", "value", "spacing", "checked"]);
  let $$slots = compute_slots(slots);
  let { color = "primary" } = $$props;
  let { custom = false } = $$props;
  let { inline = false } = $$props;
  let { group = void 0 } = $$props;
  let { value = "" } = $$props;
  let { spacing = $$slots.default ? "me-2" : "" } = $$props;
  let { checked = false } = $$props;
  let background = getContext("background");
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0) $$bindings.custom(custom);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0) $$bindings.group(group);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0) $$bindings.spacing(spacing);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  {
    if (checked && group === void 0) {
      group = value;
    }
  }
  return `${validate_component(Label, "Label").$$render(
    $$result,
    {
      class: labelClass(inline, $$props.class),
      show: $$slots.default
    },
    {},
    {
      default: () => {
        return `<input${spread(
          [
            { type: "radio" },
            escape_object($$restProps),
            { value: escape_attribute_value(value) },
            {
              class: escape_attribute_value(inputClass(custom, color, false, background, spacing, $$slots.default || $$props.class))
            }
          ],
          {}
        )}${value === group ? add_attribute("checked", true, 1) : ""}> ${slots.default ? slots.default({}) : ``}`;
      }
    }
  )} `;
});
const Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "color",
    "custom",
    "inline",
    "group",
    "choices",
    "value",
    "checked",
    "spacing",
    "groupLabelClass",
    "groupInputClass"
  ]);
  let $$slots = compute_slots(slots);
  let { color = "primary" } = $$props;
  let { custom = false } = $$props;
  let { inline = false } = $$props;
  let { group = [] } = $$props;
  let { choices = [] } = $$props;
  let { value = "on" } = $$props;
  let { checked = void 0 } = $$props;
  let { spacing = $$slots.default ? "me-2" : "" } = $$props;
  let { groupLabelClass = "" } = $$props;
  let { groupInputClass = "" } = $$props;
  let background = getContext("background");
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0) $$bindings.custom(custom);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0) $$bindings.group(group);
  if ($$props.choices === void 0 && $$bindings.choices && choices !== void 0) $$bindings.choices(choices);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0) $$bindings.spacing(spacing);
  if ($$props.groupLabelClass === void 0 && $$bindings.groupLabelClass && groupLabelClass !== void 0) $$bindings.groupLabelClass(groupLabelClass);
  if ($$props.groupInputClass === void 0 && $$bindings.groupInputClass && groupInputClass !== void 0) $$bindings.groupInputClass(groupInputClass);
  return `${choices.length > 0 ? `${each(choices, ({ value: value2, label }, i) => {
    return `${validate_component(Label, "Label").$$render(
      $$result,
      {
        class: labelClass(inline, groupLabelClass),
        show: $$slots.default,
        for: `checkbox-${i}`
      },
      {},
      {
        default: () => {
          return `${escape(label)} <input${spread(
            [
              {
                id: escape_attribute_value(`checkbox-${i}`)
              },
              { type: "checkbox" },
              { value: escape_attribute_value(value2) },
              escape_object($$restProps),
              {
                class: escape_attribute_value(inputClass(custom, color, true, background, spacing, groupInputClass))
              }
            ],
            {}
          )}${~group.indexOf(value2) ? add_attribute("checked", true, 1) : ""}> ${slots.default ? slots.default({}) : ``} `;
        }
      }
    )}`;
  })}` : `${validate_component(Label, "Label").$$render(
    $$result,
    {
      class: labelClass(inline, $$props.class),
      show: $$slots.default
    },
    {},
    {
      default: () => {
        return `<input${spread(
          [
            { type: "checkbox" },
            { value: escape_attribute_value(value) },
            escape_object($$restProps),
            {
              class: escape_attribute_value(inputClass(custom, color, true, background, spacing, $$slots.default || $$props.class))
            }
          ],
          {}
        )}${add_attribute("checked", checked, 1)}> ${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`} `;
});
export {
  Checkbox as C,
  Radio as R
};
