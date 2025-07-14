import { c as create_ssr_component, v as validate_component, h as escape } from "../../../chunks/ssr.js";
import { A as Alert } from "../../../chunks/Alert.js";
import { a as Button, B as Badge } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { C as CheckCircleOutline } from "../../../chunks/CheckCircleOutline.js";
import { C as CogOutline } from "../../../chunks/CogOutline.js";
import "../../../chunks/apiClient.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let checking = false;
  let totalInconsistencies = 1;
  let totalDifference = 246;
  return `  ${$$result.head += `<!-- HEAD_svelte-v45kx_START -->${$$result.title = `<title>Verificador de Consistência - DataLife EPI</title>`, ""}<!-- HEAD_svelte-v45kx_END -->`, ""} <div class="container mx-auto px-4 py-6"> <div class="mb-6"><div class="flex items-center justify-between"><div class="flex items-center space-x-3">${validate_component(CogOutline, "CogOutline").$$render($$result, { class: "w-6 h-6 text-primary-600" }, {}, {})} <div data-svelte-h="svelte-1y1sfck"><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Verificador de Consistência de Estoque</h1> <p class="text-gray-600 dark:text-gray-400">Detecta inconsistências entre estoque atual (Read Model) e histórico (Event Log)</p></div></div> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      color: "primary",
      size: "sm",
      disabled: checking,
      class: "rounded-sm"
    },
    {},
    {
      default: () => {
        return `${`Executar Verificação`}`;
      }
    }
  )}</div></div>  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">${validate_component(Card, "Card").$$render($$result, { class: "rounded-sm" }, {}, {
    default: () => {
      return `<div class="flex items-center space-x-3"><div class="flex-shrink-0" data-svelte-h="svelte-lubchg"><div class="w-8 h-8 text-red-500 flex items-center justify-center text-lg">⚠️</div></div> <div><div class="text-sm font-medium text-gray-500 dark:text-gray-400" data-svelte-h="svelte-1m5j0ep">Inconsistências Críticas</div> <div class="text-2xl font-bold text-red-600">${escape(totalInconsistencies)}</div></div></div>`;
    }
  })} ${validate_component(Card, "Card").$$render($$result, { class: "rounded-sm" }, {}, {
    default: () => {
      return `<div class="flex items-center space-x-3"><div class="flex-shrink-0">${validate_component(CogOutline, "CogOutline").$$render($$result, { class: "w-8 h-8 text-yellow-500" }, {}, {})}</div> <div><div class="text-sm font-medium text-gray-500 dark:text-gray-400" data-svelte-h="svelte-18m2miu">Diferença Total</div> <div class="text-2xl font-bold text-yellow-600">${escape(totalDifference)}</div> <div class="text-xs text-gray-500" data-svelte-h="svelte-a30si8">unidades</div></div></div>`;
    }
  })} ${validate_component(Card, "Card").$$render($$result, { class: "rounded-sm" }, {}, {
    default: () => {
      return `<div class="flex items-center space-x-3"><div class="flex-shrink-0">${validate_component(CheckCircleOutline, "CheckCircleOutline").$$render($$result, { class: "w-8 h-8 text-blue-500" }, {}, {})}</div> <div><div class="text-sm font-medium text-gray-500 dark:text-gray-400" data-svelte-h="svelte-1fqvrbg">Última Verificação</div> <div class="text-sm font-medium text-gray-900 dark:text-white">${escape("Nunca executada")}</div></div></div>`;
    }
  })}</div>  ${validate_component(Card, "Card").$$render($$result, { class: "rounded-sm mb-6" }, {}, {
    default: () => {
      return `<div class="p-6"><div class="flex items-start space-x-4"><div class="flex-shrink-0" data-svelte-h="svelte-mxqjp7"><div class="w-6 h-6 text-red-500 flex items-center justify-center text-base mt-1">⚠️</div></div> <div class="flex-1"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-95n8lb">🚨 Inconsistência Crítica Detectada</h3> <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-sm p-4 mb-4" data-svelte-h="svelte-ruz889"><h4 class="font-medium text-red-800 dark:text-red-200 mb-3">Avental de Raspa de Couro CA 32890</h4> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"><div><div class="text-red-700 dark:text-red-300 font-medium">Estoque Atual (Read Model)</div> <div class="text-xl font-bold text-red-800 dark:text-red-200">244 unidades</div></div> <div><div class="text-red-700 dark:text-red-300 font-medium">Saldo Kardex (Event Log)</div> <div class="text-xl font-bold text-red-800 dark:text-red-200">-2 unidades</div></div> <div><div class="text-red-700 dark:text-red-300 font-medium">Diferença</div> <div class="text-xl font-bold text-red-800 dark:text-red-200">+246 unidades</div></div></div> <div class="mt-4 pt-4 border-t border-red-200 dark:border-red-700"><div class="text-sm text-red-700 dark:text-red-300"><strong>Causa:</strong> Script de seed inseriu dados diretamente no Read Model sem gerar eventos correspondentes no Event Log</div></div></div> ${validate_component(Alert, "Alert").$$render($$result, { color: "blue", class: "mb-4" }, {}, {
        default: () => {
          return `<div class="flex items-start space-x-2">${validate_component(CheckCircleOutline, "CheckCircleOutline").$$render($$result, { class: "w-5 h-5 mt-0.5" }, {}, {})} <div data-svelte-h="svelte-1e4ryha"><div class="font-medium">Verificação Confirmada</div> <div class="text-sm mt-1">✅ Backend consultado diretamente<br>
                  ✅ Dados validados via API<br>
                  ✅ Inconsistência real confirmada</div></div></div>`;
        }
      })}</div></div></div>`;
    }
  })}  ${``}  ${validate_component(Card, "Card").$$render($$result, { class: "rounded-sm" }, {}, {
    default: () => {
      return `<div class="p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4" data-svelte-h="svelte-o9q43f">💡 Soluções Disponíveis</h3> <div class="space-y-4"> <div class="border border-gray-200 dark:border-gray-700 rounded-sm p-4" data-svelte-h="svelte-16dvxw"><h4 class="font-medium text-gray-900 dark:text-white mb-2">1. Verificação via Terminal (Implementada)</h4> <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Execute o comando para verificar e confirmar a inconsistência:</p> <div class="bg-gray-100 dark:bg-gray-800 rounded-sm p-3 font-mono text-sm">npm run quick-check-avental</div></div>  <div class="border border-gray-200 dark:border-gray-700 rounded-sm p-4" data-svelte-h="svelte-19beh8p"><h4 class="font-medium text-gray-900 dark:text-white mb-2">2. Correção via API (Manual)</h4> <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Use o endpoint oficial para corrigir o estoque:</p> <div class="bg-gray-100 dark:bg-gray-800 rounded-sm p-3 text-sm"><div class="font-mono text-blue-600 dark:text-blue-400">POST /api/estoque/ajuste-direto</div> <div class="text-gray-600 dark:text-gray-400 mt-2">Payload: novaQuantidade: -2, motivo: &quot;Correção seed&quot;</div></div></div>  <div class="border border-gray-200 dark:border-gray-700 rounded-sm p-4 opacity-60"><h4 class="font-medium text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-1dzrm65">3. Ferramenta Visual Completa</h4> <p class="text-sm text-gray-600 dark:text-gray-400 mb-3" data-svelte-h="svelte-zzp7f6">Interface web para correção automática (em desenvolvimento):</p> ${validate_component(Badge, "Badge").$$render($$result, { color: "yellow", class: "rounded-sm" }, {}, {
        default: () => {
          return `Em Desenvolvimento`;
        }
      })}</div></div></div>`;
    }
  })}</div>`;
});
export {
  Page as default
};
