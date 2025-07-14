import { c as create_ssr_component, a as compute_rest_props, g as add_attribute, d as spread, f as escape_attribute_value, e as escape_object, b as compute_slots, j as getContext, v as validate_component, h as escape, i as createEventDispatcher, l as each } from "./ssr.js";
import { twMerge } from "tailwind-merge";
import { W as Wrapper } from "./modalStore.js";
import { B as Badge, a as Button } from "./Button.js";
import { I as Icon } from "./Icon.js";
import "./DrawerHeader.svelte_svelte_type_style_lang.js";
const Drawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "activateClickOutside",
    "hidden",
    "position",
    "leftOffset",
    "rightOffset",
    "topOffset",
    "bottomOffset",
    "width",
    "backdrop",
    "backdropClass",
    "bgColor",
    "bgOpacity",
    "placement",
    "id",
    "divClass",
    "transitionParams",
    "transitionType"
  ]);
  let { activateClickOutside = true } = $$props;
  let { hidden = true } = $$props;
  let { position = "fixed" } = $$props;
  let { leftOffset = "inset-y-0 start-0" } = $$props;
  let { rightOffset = "inset-y-0 end-0" } = $$props;
  let { topOffset = "inset-x-0 top-0" } = $$props;
  let { bottomOffset = "inset-x-0 bottom-0" } = $$props;
  let { width = "w-80" } = $$props;
  let { backdrop = true } = $$props;
  let { backdropClass = "" } = $$props;
  let { bgColor = "bg-gray-900" } = $$props;
  let { bgOpacity = "bg-black/75" } = $$props;
  let { placement = "left" } = $$props;
  let { id = "drawer-example" } = $$props;
  let { divClass = "overflow-y-auto z-50 p-4 bg-white dark:bg-gray-800" } = $$props;
  let { transitionParams = {} } = $$props;
  let { transitionType = "fly" } = $$props;
  const placements = {
    left: leftOffset,
    right: rightOffset,
    top: topOffset,
    bottom: bottomOffset
  };
  let backdropDivClass = twMerge("fixed top-0 start-0 z-50 w-full h-full", backdrop && bgColor, backdrop && bgOpacity, backdropClass);
  if ($$props.activateClickOutside === void 0 && $$bindings.activateClickOutside && activateClickOutside !== void 0) $$bindings.activateClickOutside(activateClickOutside);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0) $$bindings.hidden(hidden);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  if ($$props.leftOffset === void 0 && $$bindings.leftOffset && leftOffset !== void 0) $$bindings.leftOffset(leftOffset);
  if ($$props.rightOffset === void 0 && $$bindings.rightOffset && rightOffset !== void 0) $$bindings.rightOffset(rightOffset);
  if ($$props.topOffset === void 0 && $$bindings.topOffset && topOffset !== void 0) $$bindings.topOffset(topOffset);
  if ($$props.bottomOffset === void 0 && $$bindings.bottomOffset && bottomOffset !== void 0) $$bindings.bottomOffset(bottomOffset);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.backdrop === void 0 && $$bindings.backdrop && backdrop !== void 0) $$bindings.backdrop(backdrop);
  if ($$props.backdropClass === void 0 && $$bindings.backdropClass && backdropClass !== void 0) $$bindings.backdropClass(backdropClass);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0) $$bindings.bgColor(bgColor);
  if ($$props.bgOpacity === void 0 && $$bindings.bgOpacity && bgOpacity !== void 0) $$bindings.bgOpacity(bgOpacity);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0) $$bindings.placement(placement);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0) $$bindings.divClass(divClass);
  if ($$props.transitionParams === void 0 && $$bindings.transitionParams && transitionParams !== void 0) $$bindings.transitionParams(transitionParams);
  if ($$props.transitionType === void 0 && $$bindings.transitionType && transitionType !== void 0) $$bindings.transitionType(transitionType);
  return `${!hidden ? `${backdrop && activateClickOutside ? `<div role="presentation"${add_attribute("class", backdropDivClass, 0)}></div>` : `${backdrop && !activateClickOutside ? `<div role="presentation"${add_attribute("class", backdropDivClass, 0)}></div>` : ``}`} <div${spread(
    [
      { id: escape_attribute_value(id) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(divClass, width, position, placements[placement], $$props.class))
      },
      { tabindex: "-1" },
      {
        "aria-controls": escape_attribute_value(id)
      },
      {
        "aria-labelledby": escape_attribute_value(id)
      }
    ],
    {}
  )}>${slots.default ? slots.default({ hidden }) : ``}</div>` : ``} `;
});
const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let textareaClass;
  let $$restProps = compute_rest_props($$props, [
    "value",
    "wrappedClass",
    "unWrappedClass",
    "innerWrappedClass",
    "headerClass",
    "footerClass"
  ]);
  let $$slots = compute_slots(slots);
  let { value = void 0 } = $$props;
  let { wrappedClass = "block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-hidden focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50" } = $$props;
  let { unWrappedClass = "p-2.5 text-sm focus:ring-primary-500 border-gray-300 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50" } = $$props;
  let { innerWrappedClass = "py-2 px-4 bg-white dark:bg-gray-800" } = $$props;
  let { headerClass = "" } = $$props;
  let { footerClass = "" } = $$props;
  const background = getContext("background");
  let wrapped;
  let wrapperClass;
  const headerCls = (header) => twMerge(
    header ? "border-b" : "border-t",
    "py-2 px-3 border-gray-200",
    background ? "dark:border-gray-500" : "dark:border-gray-600",
    header ? headerClass : footerClass
  );
  let innerWrapperClass;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.wrappedClass === void 0 && $$bindings.wrappedClass && wrappedClass !== void 0) $$bindings.wrappedClass(wrappedClass);
  if ($$props.unWrappedClass === void 0 && $$bindings.unWrappedClass && unWrappedClass !== void 0) $$bindings.unWrappedClass(unWrappedClass);
  if ($$props.innerWrappedClass === void 0 && $$bindings.innerWrappedClass && innerWrappedClass !== void 0) $$bindings.innerWrappedClass(innerWrappedClass);
  if ($$props.headerClass === void 0 && $$bindings.headerClass && headerClass !== void 0) $$bindings.headerClass(headerClass);
  if ($$props.footerClass === void 0 && $$bindings.footerClass && footerClass !== void 0) $$bindings.footerClass(footerClass);
  wrapped = $$slots.header || $$slots.footer;
  wrapperClass = twMerge(
    "w-full rounded-lg bg-gray-50",
    background ? "dark:bg-gray-600" : "dark:bg-gray-700",
    "text-gray-900 dark:placeholder-gray-400 dark:text-white",
    "border border-gray-200",
    background ? "dark:border-gray-500" : "dark:border-gray-600",
    $$props.class
  );
  textareaClass = wrapped ? wrappedClass : twMerge(wrapperClass, unWrappedClass);
  innerWrapperClass = twMerge(innerWrappedClass, $$slots.footer ? "" : "rounded-b-lg", $$slots.header ? "" : "rounded-t-lg");
  return `${validate_component(Wrapper, "Wrapper").$$render($$result, { show: wrapped, class: wrapperClass }, {}, {
    default: () => {
      return `${$$slots.header ? `<div${add_attribute("class", headerCls(true), 0)}>${slots.header ? slots.header({}) : ``}</div>` : ``} ${validate_component(Wrapper, "Wrapper").$$render($$result, { show: wrapped, class: innerWrapperClass }, {}, {
        default: () => {
          return `<textarea${spread(
            [
              escape_object($$restProps),
              {
                class: escape_attribute_value(textareaClass)
              }
            ],
            {}
          )}>${escape(value || "")}</textarea>`;
        }
      })} ${$$slots.footer ? `<div${add_attribute("class", headerCls(false), 0)}>${slots.footer ? slots.footer({}) : ``}</div>` : ``}`;
    }
  })} `;
});
const PenOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "pen outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"></path></svg>`} `;
});
const StatusBadge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { color } = $$props;
  let { label } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  return `  ${validate_component(Badge, "Badge").$$render($$result, { color, class: "text-xs rounded-sm" }, {}, {
    default: () => {
      return `${escape(label)}`;
    }
  })}`;
});
const css = {
  code: ".truncate.svelte-3dzcad{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  map: `{"version":3,"file":"DrawerHeader.svelte","sources":["DrawerHeader.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport { Button, Badge } from \\"flowbite-svelte\\";\\nimport Icon from \\"$lib/components/common/Icon.svelte\\";\\nimport StatusBadge from \\"$lib/components/ui/StatusBadge.svelte\\";\\nconst dispatch = createEventDispatcher();\\nexport let title;\\nexport let objectType = \\"\\";\\nexport let iconName = \\"UserOutline\\";\\nexport let status = \\"\\";\\nexport let statusType = \\"ficha\\";\\nexport let additionalInfo = [];\\nexport let primaryAction = null;\\nexport let secondaryAction = null;\\nexport let tertiaryAction = null;\\nexport let showMoreActions = false;\\nexport let showCloseButton = true;\\nexport let truncateTitle = true;\\nfunction handleClose() {\\n  dispatch(\\"close\\");\\n}\\nfunction handlePrimaryAction() {\\n  if (primaryAction && !primaryAction.disabled) {\\n    dispatch(\\"primaryAction\\");\\n  }\\n}\\nfunction handleSecondaryAction() {\\n  if (secondaryAction && !secondaryAction.disabled) {\\n    dispatch(\\"secondaryAction\\");\\n  }\\n}\\nfunction handleTertiaryAction() {\\n  if (tertiaryAction && !tertiaryAction.disabled) {\\n    dispatch(\\"tertiaryAction\\");\\n  }\\n}\\nfunction handleMoreActions() {\\n  dispatch(\\"moreActions\\");\\n}\\n<\/script>\\n\\n<!-- Drawer Header -->\\n<div class=\\"flex items-center gap-3 px-3 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800\\">\\n  <!-- Close Button (sempre à esquerda) -->\\n  {#if showCloseButton}\\n    <button\\n      class=\\"rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors\\"\\n      on:click={handleClose}\\n    >\\n      <Icon name=\\"CloseOutline\\" size=\\"w-5 h-5\\" className=\\"text-gray-600 dark:text-gray-400\\" />\\n    </button>\\n  {/if}\\n\\n  <!-- Content Area (expandir para preencher espaço disponível) -->\\n  <div class=\\"flex-1 min-w-0 flex flex-col\\">\\n    <!-- Object Type (ALL CAPS) with Icon Before -->\\n    {#if objectType}\\n      <div class=\\"flex items-center gap-2\\">\\n        <div class=\\"flex-shrink-0\\">\\n          <Icon name={iconName} className=\\"text-gray-900 dark:text-white\\" size=\\"w-4 h-4\\" />\\n        </div>\\n        <p class=\\"text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider\\" style=\\"font-size: 11px;\\">\\n          {objectType}\\n        </p>\\n      </div>\\n    {/if}\\n\\n    <!-- Main Row: Title + Status + Actions -->\\n    <div class=\\"flex items-center gap-2.5\\">\\n      <!-- Title -->\\n      <h2 \\n        class=\\"font-medium text-gray-900 dark:text-white {truncateTitle ? 'truncate' : ''} flex-1 min-w-0\\"\\n        style=\\"font-size: 18px; line-height: 1.2;\\"\\n      >\\n        {title}\\n      </h2>\\n\\n      <!-- Status -->\\n      {#if status}\\n        <div class=\\"flex-shrink-0\\">\\n          <StatusBadge {status} color=\\"blue\\" label={status} />\\n        </div>\\n      {/if}\\n\\n      <!-- Gap maior antes dos botões -->\\n      {#if status && (primaryAction || secondaryAction || tertiaryAction || showMoreActions)}\\n        <div class=\\"w-4\\"></div>\\n      {/if}\\n\\n      <!-- Actions -->\\n      <div class=\\"flex items-center gap-2 flex-shrink-0\\">\\n        <!-- Tertiary Action (icon only with dots) -->\\n        {#if showMoreActions}\\n          <Button\\n            size=\\"sm\\"\\n            color=\\"alternative\\"\\n            class=\\"rounded-sm border border-gray-300 dark:border-gray-600 p-2\\"\\n            on:click={handleMoreActions}\\n          >\\n            <Icon name=\\"EllipsisVerticalOutline\\" size=\\"w-4 h-4\\" />\\n          </Button>\\n        {/if}\\n\\n        <!-- Tertiary Action (custom) -->\\n        {#if tertiaryAction}\\n          <Button\\n            size=\\"sm\\"\\n            color=\\"alternative\\"\\n            class=\\"rounded-sm border border-gray-300 dark:border-gray-600\\"\\n            disabled={tertiaryAction.disabled}\\n            on:click={handleTertiaryAction}\\n          >\\n            {#if tertiaryAction.icon}\\n              <Icon name={tertiaryAction.icon} className=\\"mr-2\\" size=\\"w-4 h-4\\" />\\n            {/if}\\n            {tertiaryAction.text}\\n          </Button>\\n        {/if}\\n\\n        <!-- Secondary Action -->\\n        {#if secondaryAction}\\n          <Button\\n            size=\\"sm\\"\\n            color=\\"alternative\\"\\n            class=\\"rounded-sm border border-gray-300 dark:border-gray-600\\"\\n            disabled={secondaryAction.disabled}\\n            on:click={handleSecondaryAction}\\n          >\\n            {#if secondaryAction.icon}\\n              <Icon name={secondaryAction.icon} className=\\"mr-2\\" size=\\"w-4 h-4\\" />\\n            {/if}\\n            {secondaryAction.text}\\n          </Button>\\n        {/if}\\n\\n        <!-- Primary Action -->\\n        {#if primaryAction}\\n          <Button\\n            size=\\"sm\\"\\n            color=\\"primary\\"\\n            class=\\"rounded-sm\\"\\n            disabled={primaryAction.disabled}\\n            on:click={handlePrimaryAction}\\n          >\\n            {#if primaryAction.icon}\\n              <Icon name={primaryAction.icon} className=\\"mr-2\\" size=\\"w-4 h-4\\" />\\n            {/if}\\n            {primaryAction.text}\\n          </Button>\\n        {/if}\\n      </div>\\n    </div>\\n\\n    <!-- Additional Info Row -->\\n    {#if additionalInfo.length > 0}\\n      <div class=\\"flex items-center gap-1 text-gray-600 dark:text-gray-400 mt-1\\" style=\\"font-size: 12px;\\">\\n        {#each additionalInfo as info, index}\\n          <span>{info}</span>\\n          {#if index < additionalInfo.length - 1}\\n            <span class=\\"text-gray-400 dark:text-gray-500\\">•</span>\\n          {/if}\\n        {/each}\\n      </div>\\n    {/if}\\n  </div>\\n</div>\\n\\n<style>\\n  /* Ensure text truncation works properly */\\n  .truncate {\\n    overflow: hidden;\\n    text-overflow: ellipsis;\\n    white-space: nowrap;\\n  }\\n</style>"],"names":[],"mappings":"AAwKE,uBAAU,CACR,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,WAAW,CAAE,MACf"}`
};
const DrawerHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { title } = $$props;
  let { objectType = "" } = $$props;
  let { iconName = "UserOutline" } = $$props;
  let { status = "" } = $$props;
  let { statusType = "ficha" } = $$props;
  let { additionalInfo = [] } = $$props;
  let { primaryAction = null } = $$props;
  let { secondaryAction = null } = $$props;
  let { tertiaryAction = null } = $$props;
  let { showMoreActions = false } = $$props;
  let { showCloseButton = true } = $$props;
  let { truncateTitle = true } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.objectType === void 0 && $$bindings.objectType && objectType !== void 0) $$bindings.objectType(objectType);
  if ($$props.iconName === void 0 && $$bindings.iconName && iconName !== void 0) $$bindings.iconName(iconName);
  if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
  if ($$props.statusType === void 0 && $$bindings.statusType && statusType !== void 0) $$bindings.statusType(statusType);
  if ($$props.additionalInfo === void 0 && $$bindings.additionalInfo && additionalInfo !== void 0) $$bindings.additionalInfo(additionalInfo);
  if ($$props.primaryAction === void 0 && $$bindings.primaryAction && primaryAction !== void 0) $$bindings.primaryAction(primaryAction);
  if ($$props.secondaryAction === void 0 && $$bindings.secondaryAction && secondaryAction !== void 0) $$bindings.secondaryAction(secondaryAction);
  if ($$props.tertiaryAction === void 0 && $$bindings.tertiaryAction && tertiaryAction !== void 0) $$bindings.tertiaryAction(tertiaryAction);
  if ($$props.showMoreActions === void 0 && $$bindings.showMoreActions && showMoreActions !== void 0) $$bindings.showMoreActions(showMoreActions);
  if ($$props.showCloseButton === void 0 && $$bindings.showCloseButton && showCloseButton !== void 0) $$bindings.showCloseButton(showCloseButton);
  if ($$props.truncateTitle === void 0 && $$bindings.truncateTitle && truncateTitle !== void 0) $$bindings.truncateTitle(truncateTitle);
  $$result.css.add(css);
  return ` <div class="flex items-center gap-3 px-3 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"> ${showCloseButton ? `<button class="rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      name: "CloseOutline",
      size: "w-5 h-5",
      className: "text-gray-600 dark:text-gray-400"
    },
    {},
    {}
  )}</button>` : ``}  <div class="flex-1 min-w-0 flex flex-col"> ${objectType ? `<div class="flex items-center gap-2"><div class="flex-shrink-0">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      name: iconName,
      className: "text-gray-900 dark:text-white",
      size: "w-4 h-4"
    },
    {},
    {}
  )}</div> <p class="text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider" style="font-size: 11px;">${escape(objectType)}</p></div>` : ``}  <div class="flex items-center gap-2.5"> <h2 class="${"font-medium text-gray-900 dark:text-white " + escape(truncateTitle ? "truncate" : "", true) + " flex-1 min-w-0 svelte-3dzcad"}" style="font-size: 18px; line-height: 1.2;">${escape(title)}</h2>  ${status ? `<div class="flex-shrink-0">${validate_component(StatusBadge, "StatusBadge").$$render($$result, { status, color: "blue", label: status }, {}, {})}</div>` : ``}  ${status && (primaryAction || secondaryAction || tertiaryAction || showMoreActions) ? `<div class="w-4"></div>` : ``}  <div class="flex items-center gap-2 flex-shrink-0"> ${showMoreActions ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "alternative",
      class: "rounded-sm border border-gray-300 dark:border-gray-600 p-2"
    },
    {},
    {
      default: () => {
        return `${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            name: "EllipsisVerticalOutline",
            size: "w-4 h-4"
          },
          {},
          {}
        )}`;
      }
    }
  )}` : ``}  ${tertiaryAction ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "alternative",
      class: "rounded-sm border border-gray-300 dark:border-gray-600",
      disabled: tertiaryAction.disabled
    },
    {},
    {
      default: () => {
        return `${tertiaryAction.icon ? `${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            name: tertiaryAction.icon,
            className: "mr-2",
            size: "w-4 h-4"
          },
          {},
          {}
        )}` : ``} ${escape(tertiaryAction.text)}`;
      }
    }
  )}` : ``}  ${secondaryAction ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "alternative",
      class: "rounded-sm border border-gray-300 dark:border-gray-600",
      disabled: secondaryAction.disabled
    },
    {},
    {
      default: () => {
        return `${secondaryAction.icon ? `${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            name: secondaryAction.icon,
            className: "mr-2",
            size: "w-4 h-4"
          },
          {},
          {}
        )}` : ``} ${escape(secondaryAction.text)}`;
      }
    }
  )}` : ``}  ${primaryAction ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "primary",
      class: "rounded-sm",
      disabled: primaryAction.disabled
    },
    {},
    {
      default: () => {
        return `${primaryAction.icon ? `${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            name: primaryAction.icon,
            className: "mr-2",
            size: "w-4 h-4"
          },
          {},
          {}
        )}` : ``} ${escape(primaryAction.text)}`;
      }
    }
  )}` : ``}</div></div>  ${additionalInfo.length > 0 ? `<div class="flex items-center gap-1 text-gray-600 dark:text-gray-400 mt-1" style="font-size: 12px;">${each(additionalInfo, (info, index) => {
    return `<span>${escape(info)}</span> ${index < additionalInfo.length - 1 ? `<span class="text-gray-400 dark:text-gray-500" data-svelte-h="svelte-aa9k88">•</span>` : ``}`;
  })}</div>` : ``}</div> </div>`;
});
export {
  Drawer as D,
  PenOutline as P,
  StatusBadge as S,
  Textarea as T,
  DrawerHeader as a
};
