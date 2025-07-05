import { c as create_ssr_component, v as validate_component, h as escape, l as each, g as add_attribute } from "../../../chunks/ssr.js";
import { I as Input } from "../../../chunks/Input.js";
import { S as Select } from "../../../chunks/Select.js";
import { L as LoadingSpinner } from "../../../chunks/LoadingSpinner.js";
let itemsPerPage = 10;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredMovimentacoes;
  let startIndex;
  let endIndex;
  const mockEstoqueOptions = [
    {
      id: "estoque-1",
      nome: "Estoque Principal",
      tipoEstoque: "fisico",
      codigo: "EP",
      ativo: true,
      createdAt: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "estoque-2",
      nome: "Estoque Secundário",
      tipoEstoque: "fisico",
      codigo: "ES",
      ativo: true,
      createdAt: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
    }
  ];
  let movimentacoes = [];
  let currentPage = 1;
  let filtroEstoqueOrigem = "";
  let filtroEstoqueDestino = "";
  let filtroTipoMovimentacao = "";
  let filtroDataInicio = "";
  let filtroDataFim = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    filteredMovimentacoes = movimentacoes.filter((mov) => {
      const estoqueOrigemMatch = filtroEstoqueOrigem === "" || mov.estoqueOrigemId === filtroEstoqueOrigem;
      const estoqueDestinoMatch = filtroEstoqueDestino === "" || mov.estoqueDestinoId === filtroEstoqueDestino;
      const tipoMovimentacaoMatch = filtroTipoMovimentacao === "" || mov.tipoMovimentacao === filtroTipoMovimentacao;
      const dataMovimentacao = new Date(mov.dataMovimentacao);
      const dataInicioMatch = filtroDataInicio === "" || dataMovimentacao >= new Date(filtroDataInicio);
      const dataFimMatch = filtroDataFim === "" || dataMovimentacao <= new Date(filtroDataFim);
      return estoqueOrigemMatch && estoqueDestinoMatch && tipoMovimentacaoMatch && dataInicioMatch && dataFimMatch;
    });
    Math.ceil(filteredMovimentacoes.length / itemsPerPage);
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = Math.min(startIndex + itemsPerPage, filteredMovimentacoes.length);
    filteredMovimentacoes.slice(startIndex, endIndex);
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-11k3ljv_START -->${$$result.title = `<title>Auditoria de Movimentações - DataLife EPI</title>`, ""}<!-- HEAD_svelte-11k3ljv_END -->`, ""} <div class="space-y-6"> <div data-svelte-h="svelte-mndqa6"><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Auditoria de Movimentações de Estoque</h1> <p class="text-sm text-gray-600 dark:text-gray-400">Visualize e audite todas as movimentações de estoque com rastreabilidade completa</p></div>  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4"><div class="grid grid-cols-1 md:grid-cols-5 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" data-svelte-h="svelte-ngymsy">Estoque de Origem</label> ${validate_component(Select, "Select").$$render(
      $$result,
      {
        size: "sm",
        class: "rounded-sm",
        value: filtroEstoqueOrigem
      },
      {
        value: ($$value) => {
          filtroEstoqueOrigem = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<option value="" data-svelte-h="svelte-c81xlk">Todos os estoques</option> ${each(mockEstoqueOptions, (estoque) => {
            return `<option${add_attribute("value", estoque.id, 0)}>${escape(estoque.nome)}</option>`;
          })}`;
        }
      }
    )}</div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" data-svelte-h="svelte-pcdihr">Estoque de Destino</label> ${validate_component(Select, "Select").$$render(
      $$result,
      {
        size: "sm",
        class: "rounded-sm",
        value: filtroEstoqueDestino
      },
      {
        value: ($$value) => {
          filtroEstoqueDestino = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<option value="" data-svelte-h="svelte-c81xlk">Todos os estoques</option> ${each(mockEstoqueOptions, (estoque) => {
            return `<option${add_attribute("value", estoque.id, 0)}>${escape(estoque.nome)}</option>`;
          })}`;
        }
      }
    )}</div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" data-svelte-h="svelte-3b2vre">Tipo de Movimentação</label> ${validate_component(Select, "Select").$$render(
      $$result,
      {
        size: "sm",
        class: "rounded-sm",
        value: filtroTipoMovimentacao
      },
      {
        value: ($$value) => {
          filtroTipoMovimentacao = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<option value="" data-svelte-h="svelte-uq7dmw">Todos os tipos</option> <option value="entrada" data-svelte-h="svelte-1lzfn2s">Entrada</option> <option value="saida" data-svelte-h="svelte-1x3h19i">Saída</option> <option value="transferencia" data-svelte-h="svelte-ko6im7">Transferência</option> <option value="ajuste" data-svelte-h="svelte-196ocwm">Ajuste</option> <option value="descarte" data-svelte-h="svelte-10wh71i">Descarte</option>`;
        }
      }
    )}</div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" data-svelte-h="svelte-v3st7r">Data Início</label> ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "date",
        size: "sm",
        class: "rounded-sm",
        value: filtroDataInicio
      },
      {
        value: ($$value) => {
          filtroDataInicio = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" data-svelte-h="svelte-1aq88a">Data Fim</label> ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "date",
        size: "sm",
        class: "rounded-sm",
        value: filtroDataFim
      },
      {
        value: ($$value) => {
          filtroDataFim = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>  <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"><div class="text-sm text-gray-600 dark:text-gray-400"><span class="font-medium">${escape(filteredMovimentacoes.length)}</span> movimentação(ões) encontrada(s)</div></div></div>  ${`${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}`}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
