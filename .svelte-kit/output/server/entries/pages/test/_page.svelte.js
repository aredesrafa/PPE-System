import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-et9qm3_START -->${$$result.title = `<title>Teste - DataLife EPI</title>`, ""}<!-- HEAD_svelte-et9qm3_END -->`, ""} <div class="p-8">${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
    default: () => {
      return `<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4" data-svelte-h="svelte-1wdvg7s">Sistema DataLife EPI - Svelte</h1> <p class="text-gray-600 dark:text-gray-400 mb-6" data-svelte-h="svelte-sqg61s">Frontend recriado em Svelte 4 com Flowbite, mockado mas funcional para apresentação.</p> <div class="space-y-4">${validate_component(Button, "Button").$$render(
        $$result,
        {
          size: "sm",
          color: "primary",
          class: "rounded-sm",
          href: "/"
        },
        {},
        {
          default: () => {
            return `Dashboard`;
          }
        }
      )} ${validate_component(Button, "Button").$$render(
        $$result,
        {
          size: "sm",
          color: "blue",
          class: "rounded-sm",
          href: "/catalogo"
        },
        {},
        {
          default: () => {
            return `Catálogo EPIs`;
          }
        }
      )} ${validate_component(Button, "Button").$$render(
        $$result,
        {
          size: "sm",
          color: "green",
          class: "rounded-sm",
          href: "/estoque"
        },
        {},
        {
          default: () => {
            return `Estoque`;
          }
        }
      )} ${validate_component(Button, "Button").$$render(
        $$result,
        {
          size: "sm",
          color: "yellow",
          class: "rounded-sm",
          href: "/fichas"
        },
        {},
        {
          default: () => {
            return `Fichas EPI`;
          }
        }
      )} ${validate_component(Button, "Button").$$render(
        $$result,
        {
          size: "sm",
          color: "purple",
          class: "rounded-sm",
          href: "/relatorios"
        },
        {},
        {
          default: () => {
            return `Relatórios`;
          }
        }
      )}</div> <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg" data-svelte-h="svelte-17ml6y7"><h3 class="font-semibold text-gray-900 dark:text-white mb-2">Status da Implementação</h3> <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1"><li>✅ Projeto Svelte 4 configurado</li> <li>✅ Flowbite Svelte integrado</li> <li>✅ TailwindCSS configurado</li> <li>✅ Stores e gerenciamento de estado</li> <li>✅ APIs mockadas funcionais</li> <li>✅ Páginas principais criadas</li> <li>✅ Componentes reutilizáveis</li> <li>⚠️ Ajustes de ícones em andamento</li></ul></div>`;
    }
  })}</div>`;
});
export {
  Page as default
};
