import { c as create_ssr_component, a as compute_rest_props, v as validate_component, b as compute_slots } from "./ssr.js";
import { f as fade, F as Frame, C as CloseButton } from "./Button.js";
import { twMerge } from "tailwind-merge";
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
export {
  Alert as A
};
