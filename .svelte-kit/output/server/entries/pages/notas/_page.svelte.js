import { c as create_ssr_component, a as compute_rest_props, j as getContext, d as spread, g as add_attribute, h as escape, f as escape_attribute_value, e as escape_object, i as createEventDispatcher, v as validate_component, l as each } from "../../../chunks/ssr.js";
import { B as Badge } from "../../../chunks/Badge.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { I as Input } from "../../../chunks/Input.js";
import { S as Select } from "../../../chunks/Select.js";
import { P as PlusOutline, S as SearchOutline, R as RefreshOutline, T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../chunks/SearchOutline.js";
import { R as Radio, T as Tabs, a as TabItem, f as formatarData } from "../../../chunks/dateHelpers.js";
import { L as Label, T as Textarea, E as EyeOutline } from "../../../chunks/EyeOutline.js";
import { twMerge } from "tailwind-merge";
import { a as createApiStore } from "../../../chunks/modalStore.js";
import { M as Modal } from "../../../chunks/Modal.js";
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
const MovementModalPresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let modalTitle;
  let { item = null } = $$props;
  let { loading = false } = $$props;
  let { show = true } = $$props;
  createEventDispatcher();
  let formData = {
    tipo: "entrada",
    quantidade: 0,
    motivo: ""
  };
  let errors = {};
  function resetForm() {
    formData = {
      tipo: "entrada",
      quantidade: 0,
      motivo: ""
    };
    errors = {};
  }
  if ($$props.item === void 0 && $$bindings.item && item !== void 0) $$bindings.item(item);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (show && item) {
        resetForm();
      }
    }
    formData.tipo === "entrada" ? `+${formData.quantidade}` : `-${formData.quantidade}`;
    modalTitle = item ? "Ajustar Estoque" : "Nova Movimentação";
    $$rendered = `   ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: modalTitle,
        size: "md",
        autoclose: false,
        outsideclose: false,
        open: show
      },
      {
        open: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return ` ${item ? `<div class="flex items-center gap-3">${validate_component(Button, "Button").$$render(
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
              disabled: loading
            },
            {},
            {
              default: () => {
                return `${loading ? `<div class="flex items-center" data-svelte-h="svelte-1x71bel"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Salvando...</div>` : `Salvar Movimentação`}`;
              }
            }
          )}</div>` : ``} `;
        },
        default: () => {
          return `${item ? `<div class="space-y-4"> <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"><div class="flex items-center justify-between"><h4 class="font-medium text-gray-900 dark:text-white">${escape(item.tipoEPI?.nomeEquipamento || "EPI não encontrado")}</h4> <span class="text-sm font-light text-gray-600 dark:text-gray-400">Estoque atual = ${escape(item.quantidade)}</span></div></div>  <div class="space-y-4"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div>${validate_component(Label, "Label").$$render($$result, { class: "mb-3 block" }, {}, {
            default: () => {
              return `Tipo de Movimentação *`;
            }
          })} <div class="flex gap-6"><div class="flex items-center">${validate_component(Radio, "Radio").$$render(
            $$result,
            {
              name: "tipo",
              value: "entrada",
              class: "mr-2",
              group: formData.tipo
            },
            {
              group: ($$value) => {
                formData.tipo = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${validate_component(Label, "Label").$$render($$result, { class: "text-sm font-normal" }, {}, {
            default: () => {
              return `Aumentar`;
            }
          })}</div> <div class="flex items-center">${validate_component(Radio, "Radio").$$render(
            $$result,
            {
              name: "tipo",
              value: "saida",
              class: "mr-2",
              group: formData.tipo
            },
            {
              group: ($$value) => {
                formData.tipo = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${validate_component(Label, "Label").$$render($$result, { class: "text-sm font-normal" }, {}, {
            default: () => {
              return `Retirar`;
            }
          })}</div></div></div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "quantidade", class: "mb-2" }, {}, {
            default: () => {
              return `Quantidade *`;
            }
          })} <div class="relative"><span class="${"absolute left-3 top-1/2 transform -translate-y-1/2 " + escape(
            formData.tipo === "entrada" ? "text-green-600" : "text-red-600",
            true
          ) + " font-medium"}">${escape(formData.tipo === "entrada" ? "+" : "-")}</span> ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "quantidade",
              type: "number",
              min: "1",
              step: "1",
              size: "sm",
              class: "rounded-sm pl-8",
              color: errors.quantidade ? "red" : "base",
              value: formData.quantidade
            },
            {
              value: ($$value) => {
                formData.quantidade = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> ${errors.quantidade ? `<p class="text-red-600 text-xs mt-1">${escape(errors.quantidade)}</p>` : ``}</div></div>  <div>${validate_component(Label, "Label").$$render($$result, { for: "motivo", class: "mb-2" }, {}, {
            default: () => {
              return `Motivo *`;
            }
          })} ${validate_component(Textarea, "Textarea").$$render(
            $$result,
            {
              id: "motivo",
              placeholder: "Descreva o motivo da movimentação...",
              rows: "2",
              class: "rounded-sm resize-none",
              color: errors.motivo ? "red" : "base",
              value: formData.motivo
            },
            {
              value: ($$value) => {
                formData.motivo = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${errors.motivo ? `<p class="text-red-600 text-xs mt-1">${escape(errors.motivo)}</p>` : ``}</div></div></div>` : ``} `;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
let itemsPerPage = 10;
function getStatusBadge(status) {
  switch (status) {
    case "pendente":
      return { color: "yellow", label: "Pendente" };
    case "processada":
      return { color: "green", label: "Processada" };
    case "cancelada":
      return { color: "red", label: "Cancelada" };
    default:
      return { color: "none", label: status };
  }
}
function calculateTotal(nota) {
  if ("valorTotal" in nota && nota.valorTotal) {
    return `R$ ${nota.valorTotal.toFixed(2).replace(".", ",")}`;
  }
  return "-";
}
function getItemsCount(nota) {
  return nota.itens.reduce((total, item) => total + item.quantidade, 0);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentData;
  let filteredData;
  let totalItems;
  let totalPages;
  let startIndex;
  let endIndex;
  let paginatedData;
  let hasNext;
  let hasPrev;
  let notasEntradaProcessadas;
  let notasSaidaProcessadas;
  const mockNotasEntrada = [
    {
      id: "1",
      numeroNota: "NE-2025-001",
      data: "2025-01-03",
      responsavel: "João Silva",
      status: "processada",
      motivo: "Compra de EPIs",
      fornecedor: "EPI Tech Ltda",
      notaFiscal: "NF-12345",
      valorTotal: 2500,
      itens: [
        {
          id: "1",
          tipoEPIId: "1",
          quantidade: 10,
          custoUnitario: 50
        },
        {
          id: "2",
          tipoEPIId: "2",
          quantidade: 20,
          custoUnitario: 75
        }
      ]
    },
    {
      id: "2",
      numeroNota: "NE-2025-002",
      data: "2025-01-02",
      responsavel: "Maria Santos",
      status: "pendente",
      motivo: "Reposição de estoque",
      fornecedor: "Segurança Industrial",
      valorTotal: 1800,
      itens: [
        {
          id: "3",
          tipoEPIId: "3",
          quantidade: 15,
          custoUnitario: 120
        }
      ]
    },
    {
      id: "3",
      numeroNota: "NE-2025-003",
      data: "2025-01-01",
      responsavel: "Pedro Oliveira",
      status: "processada",
      motivo: "Compra emergencial",
      fornecedor: "ProSafe Equipamentos",
      valorTotal: 3200,
      itens: [
        {
          id: "4",
          tipoEPIId: "1",
          quantidade: 25,
          custoUnitario: 48
        }
      ]
    },
    {
      id: "4",
      numeroNota: "NE-2024-045",
      data: "2024-12-28",
      responsavel: "Ana Pereira",
      status: "cancelada",
      motivo: "Compra cancelada pelo fornecedor",
      fornecedor: "SafeWork Ltda",
      valorTotal: 0,
      itens: []
    },
    {
      id: "5",
      numeroNota: "NE-2024-044",
      data: "2024-12-27",
      responsavel: "Carlos Mendes",
      status: "processada",
      motivo: "Renovação de estoque",
      fornecedor: "EPI Tech Ltda",
      valorTotal: 4500,
      itens: [
        {
          id: "5",
          tipoEPIId: "2",
          quantidade: 30,
          custoUnitario: 80
        },
        {
          id: "6",
          tipoEPIId: "3",
          quantidade: 10,
          custoUnitario: 150
        }
      ]
    },
    {
      id: "6",
      numeroNota: "NE-2024-043",
      data: "2024-12-26",
      responsavel: "Lucia Silva",
      status: "pendente",
      motivo: "Teste de novos fornecedores",
      fornecedor: "NewSafe Industrial",
      valorTotal: 800,
      itens: [
        {
          id: "7",
          tipoEPIId: "1",
          quantidade: 5,
          custoUnitario: 160
        }
      ]
    },
    {
      id: "7",
      numeroNota: "NE-2024-042",
      data: "2024-12-25",
      responsavel: "Roberto Santos",
      status: "processada",
      motivo: "Substituição de equipamentos danificados",
      fornecedor: "Segurança Industrial",
      valorTotal: 2100,
      itens: [
        {
          id: "8",
          tipoEPIId: "3",
          quantidade: 14,
          custoUnitario: 150
        }
      ]
    },
    {
      id: "8",
      numeroNota: "NE-2024-041",
      data: "2024-12-24",
      responsavel: "Fernanda Costa",
      status: "processada",
      motivo: "Estoque para nova obra",
      fornecedor: "ProSafe Equipamentos",
      valorTotal: 5800,
      itens: [
        {
          id: "9",
          tipoEPIId: "1",
          quantidade: 40,
          custoUnitario: 45
        },
        {
          id: "10",
          tipoEPIId: "2",
          quantidade: 50,
          custoUnitario: 72
        }
      ]
    },
    {
      id: "9",
      numeroNota: "NE-2024-040",
      data: "2024-12-23",
      responsavel: "Miguel Alves",
      status: "pendente",
      motivo: "Aguardando liberação fiscal",
      fornecedor: "EPI Tech Ltda",
      valorTotal: 1200,
      itens: [
        {
          id: "11",
          tipoEPIId: "2",
          quantidade: 15,
          custoUnitario: 80
        }
      ]
    },
    {
      id: "10",
      numeroNota: "NE-2024-039",
      data: "2024-12-22",
      responsavel: "Juliana Rocha",
      status: "processada",
      motivo: "Compra de fim de ano",
      fornecedor: "SafeWork Ltda",
      valorTotal: 3600,
      itens: [
        {
          id: "12",
          tipoEPIId: "3",
          quantidade: 24,
          custoUnitario: 150
        }
      ]
    },
    {
      id: "11",
      numeroNota: "NE-2024-038",
      data: "2024-12-21",
      responsavel: "Thiago Martins",
      status: "processada",
      motivo: "Reposição urgente",
      fornecedor: "Segurança Industrial",
      valorTotal: 900,
      itens: [
        {
          id: "13",
          tipoEPIId: "1",
          quantidade: 18,
          custoUnitario: 50
        }
      ]
    },
    {
      id: "12",
      numeroNota: "NE-2024-037",
      data: "2024-12-20",
      responsavel: "Beatriz Lima",
      status: "cancelada",
      motivo: "Erro no pedido",
      fornecedor: "ProSafe Equipamentos",
      valorTotal: 0,
      itens: []
    }
  ];
  const mockNotasSaida = [
    {
      id: "1",
      numeroNota: "NS-2025-001",
      data: "2025-01-03",
      responsavel: "Carlos Lima",
      status: "processada",
      motivo: "Entrega para colaborador",
      destinatario: "João Pereira - Engenheiro",
      solicitante: "RH Corporativo",
      itens: [
        { id: "1", tipoEPIId: "1", quantidade: 3 },
        { id: "2", tipoEPIId: "2", quantidade: 2 }
      ]
    },
    {
      id: "2",
      numeroNota: "NS-2025-002",
      data: "2025-01-02",
      responsavel: "Ana Costa",
      status: "pendente",
      motivo: "Transferência entre estoques",
      destinatario: "Estoque Filial Norte",
      solicitante: "Gerência Operacional",
      itens: [{ id: "3", tipoEPIId: "3", quantidade: 8 }]
    },
    {
      id: "3",
      numeroNota: "NS-2025-003",
      data: "2025-01-01",
      responsavel: "Pedro Rocha",
      status: "processada",
      motivo: "Entrega para obra externa",
      destinatario: "Obra Shopping ABC",
      solicitante: "Engenharia",
      itens: [
        { id: "4", tipoEPIId: "1", quantidade: 15 },
        { id: "5", tipoEPIId: "2", quantidade: 10 }
      ]
    },
    {
      id: "4",
      numeroNota: "NS-2024-045",
      data: "2024-12-28",
      responsavel: "Mariana Silva",
      status: "cancelada",
      motivo: "Entrega cancelada",
      destinatario: "José Santos - Técnico",
      solicitante: "Supervisão",
      itens: []
    },
    {
      id: "5",
      numeroNota: "NS-2024-044",
      data: "2024-12-27",
      responsavel: "Ricardo Alves",
      status: "processada",
      motivo: "Substituição de equipamentos",
      destinatario: "Estoque Filial Sul",
      solicitante: "Manutenção",
      itens: [{ id: "6", tipoEPIId: "3", quantidade: 12 }]
    },
    {
      id: "6",
      numeroNota: "NS-2024-043",
      data: "2024-12-26",
      responsavel: "Sofia Pereira",
      status: "pendente",
      motivo: "Aguardando transporte",
      destinatario: "Equipe Campo - Setor A",
      solicitante: "Coordenação",
      itens: [
        { id: "7", tipoEPIId: "1", quantidade: 8 },
        { id: "8", tipoEPIId: "2", quantidade: 6 }
      ]
    },
    {
      id: "7",
      numeroNota: "NS-2024-042",
      data: "2024-12-25",
      responsavel: "Diego Martins",
      status: "processada",
      motivo: "Entrega para novo colaborador",
      destinatario: "Francisco Lima - Soldador",
      solicitante: "RH Corporativo",
      itens: [{ id: "9", tipoEPIId: "3", quantidade: 2 }]
    },
    {
      id: "8",
      numeroNota: "NS-2024-041",
      data: "2024-12-24",
      responsavel: "Camila Santos",
      status: "processada",
      motivo: "Distribuição mensal",
      destinatario: "Equipe Manutenção",
      solicitante: "Supervisão Técnica",
      itens: [
        { id: "10", tipoEPIId: "1", quantidade: 20 },
        { id: "11", tipoEPIId: "2", quantidade: 25 },
        { id: "12", tipoEPIId: "3", quantidade: 15 }
      ]
    },
    {
      id: "9",
      numeroNota: "NS-2024-040",
      data: "2024-12-23",
      responsavel: "Gabriel Costa",
      status: "pendente",
      motivo: "Aguardando autorização",
      destinatario: "Estoque Filial Leste",
      solicitante: "Gerência Regional",
      itens: [{ id: "13", tipoEPIId: "2", quantidade: 18 }]
    },
    {
      id: "10",
      numeroNota: "NS-2024-039",
      data: "2024-12-22",
      responsavel: "Isabela Rocha",
      status: "processada",
      motivo: "Reposição de equipamentos perdidos",
      destinatario: "Carlos Silva - Eletricista",
      solicitante: "Segurança do Trabalho",
      itens: [
        { id: "14", tipoEPIId: "1", quantidade: 3 },
        { id: "15", tipoEPIId: "3", quantidade: 2 }
      ]
    },
    {
      id: "11",
      numeroNota: "NS-2024-038",
      data: "2024-12-21",
      responsavel: "Lucas Ferreira",
      status: "processada",
      motivo: "Entrega de emergência",
      destinatario: "Obra Residencial XYZ",
      solicitante: "Engenharia de Obra",
      itens: [{ id: "16", tipoEPIId: "2", quantidade: 12 }]
    },
    {
      id: "12",
      numeroNota: "NS-2024-037",
      data: "2024-12-20",
      responsavel: "Amanda Oliveira",
      status: "cancelada",
      motivo: "Destinatário ausente",
      destinatario: "Paulo Mendes - Operador",
      solicitante: "Coordenação",
      itens: []
    }
  ];
  let searchTerm = "";
  let statusFilter = "todos";
  let showNewModal = false;
  let currentPage = 1;
  createApiStore([]);
  let notasEntrada = mockNotasEntrada;
  let notasSaida = mockNotasSaida;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    currentData = notasEntrada;
    filteredData = currentData.filter((nota) => {
      const searchMatch = searchTerm === "" || nota.numeroNota?.toLowerCase().includes(searchTerm.toLowerCase()) || nota.responsavel?.toLowerCase().includes(searchTerm.toLowerCase()) || nota.motivo?.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === "todos" || nota.status === statusFilter;
      return searchMatch && statusMatch;
    });
    totalItems = filteredData.length;
    totalPages = Math.ceil(totalItems / itemsPerPage);
    {
      if (searchTerm || statusFilter) {
        currentPage = 1;
      }
    }
    {
      {
        currentPage = 1;
      }
    }
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    paginatedData = filteredData.slice(startIndex, endIndex);
    hasNext = currentPage < totalPages;
    hasPrev = currentPage > 1;
    notasEntradaProcessadas = notasEntrada.filter((n) => n.status === "processada");
    notasEntrada.filter((n) => n.status === "pendente");
    notasEntradaProcessadas.reduce((total, n) => total + (n.valorTotal || 0), 0);
    notasEntradaProcessadas.reduce((total, n) => total + getItemsCount(n), 0);
    notasSaidaProcessadas = notasSaida.filter((n) => n.status === "processada");
    notasSaida.filter((n) => n.status === "pendente");
    notasSaidaProcessadas.reduce((total, n) => total + getItemsCount(n), 0);
    new Set(notasSaida.filter((n) => "destinatario" in n && n.destinatario).map((n) => "destinatario" in n ? n.destinatario : "")).size;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-17563br_START -->${$$result.title = `<title>Notas de Movimentação - DataLife EPI</title>`, ""}<!-- HEAD_svelte-17563br_END -->`, ""} <div class="space-y-6"> <div class="flex items-center justify-between"><div data-svelte-h="svelte-1yh824s"><h1 class="text-xl font-medium text-gray-900 dark:text-white">Notas de Movimentação</h1> <p class="text-sm text-gray-600 dark:text-gray-400">Gerencie notas de entrada e saída de equipamentos</p></div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
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
Nova Nota`;
        }
      }
    )}</div></div>  ${`${totalItems > 0 ? ` <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"> <div class="p-4 border-b border-gray-200 dark:border-gray-700"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <div class="relative">${validate_component(SearchOutline, "SearchOutline").$$render(
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
        placeholder: "Buscar por número, responsável...",
        class: "pl-10 rounded-sm h-10 text-sm",
        value: searchTerm
      },
      {
        value: ($$value) => {
          searchTerm = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>  ${validate_component(Select, "Select").$$render(
      $$result,
      {
        class: "rounded-sm h-10 text-sm",
        value: statusFilter
      },
      {
        value: ($$value) => {
          statusFilter = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<option value="todos" data-svelte-h="svelte-b4blyw">Todos os status</option> <option value="pendente" data-svelte-h="svelte-1i1ulum">Pendente</option> <option value="processada" data-svelte-h="svelte-1u1n62u">Processada</option> <option value="cancelada" data-svelte-h="svelte-1v8d2em">Cancelada</option>`;
        }
      }
    )}  ${searchTerm || statusFilter !== "todos" ? `${validate_component(Button, "Button").$$render(
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
    )}` : ` <div></div>`}</div></div>  <div class="p-4">${validate_component(Tabs, "Tabs").$$render($$result, { style: "underline", contentClass: "py-4" }, {}, {
      default: () => {
        return `${validate_component(TabItem, "TabItem").$$render(
          $$result,
          {
            open: true,
            title: "Notas de Entrada (" + notasEntrada.length + ")"
          },
          {},
          {
            default: () => {
              return `<div class="space-y-4"> <div class="min-w-[980px] overflow-x-auto">${validate_component(Table, "Table").$$render($$result, { hoverable: true }, {}, {
                default: () => {
                  return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[140px]" }, {}, {
                        default: () => {
                          return `Número da Nota`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
                        default: () => {
                          return `Data`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[120px]" }, {}, {
                        default: () => {
                          return `Responsável`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
                        $$result,
                        {
                          class: "min-w-[120px] hidden lg:table-cell"
                        },
                        {},
                        {
                          default: () => {
                            return `Fornecedor`;
                          }
                        }
                      )} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
                        $$result,
                        {
                          class: "min-w-[100px] hidden xl:table-cell"
                        },
                        {},
                        {
                          default: () => {
                            return `Valor Total`;
                          }
                        }
                      )} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[80px]" }, {}, {
                        default: () => {
                          return `Itens`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
                        default: () => {
                          return `Status`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[120px]" }, {}, {
                        default: () => {
                          return `Ações`;
                        }
                      })}`;
                    }
                  })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                    default: () => {
                      return `${`${each(paginatedData, (nota) => {
                        return `${validate_component(TableBodyRow, "TableBodyRow").$$render(
                          $$result,
                          {
                            class: "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                          },
                          {},
                          {
                            default: () => {
                              return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[140px]" }, {}, {
                                default: () => {
                                  return `<p class="font-medium text-gray-900 dark:text-white">${escape(nota.numeroNota)}</p> <p class="text-sm text-gray-500 dark:text-gray-400">${escape(nota.motivo)}</p> `;
                                }
                              })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
                                default: () => {
                                  return `<span class="text-sm text-gray-900 dark:text-white">${escape(formatarData(nota.data))}</span> `;
                                }
                              })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[120px]" }, {}, {
                                default: () => {
                                  return `<span class="text-sm text-gray-900 dark:text-white">${escape(nota.responsavel)}</span>  <p class="text-xs text-gray-500 dark:text-gray-400 lg:hidden mt-1">${escape("fornecedor" in nota ? nota.fornecedor || "N/A" : "N/A")}</p>  <p class="text-xs text-gray-500 dark:text-gray-400 xl:hidden mt-1">${escape(calculateTotal(nota))}</p> `;
                                }
                              })} ${validate_component(TableBodyCell, "TableBodyCell").$$render(
                                $$result,
                                {
                                  class: "min-w-[120px] hidden lg:table-cell"
                                },
                                {},
                                {
                                  default: () => {
                                    return `<span class="text-sm text-gray-900 dark:text-white">${escape("fornecedor" in nota ? nota.fornecedor || "-" : "-")}</span> `;
                                  }
                                }
                              )} ${validate_component(TableBodyCell, "TableBodyCell").$$render(
                                $$result,
                                {
                                  class: "min-w-[100px] hidden xl:table-cell"
                                },
                                {},
                                {
                                  default: () => {
                                    return `<span class="text-sm text-gray-900 dark:text-white">${escape(calculateTotal(nota))}</span> `;
                                  }
                                }
                              )} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[80px]" }, {}, {
                                default: () => {
                                  return `${validate_component(Badge, "Badge").$$render($$result, { color: "blue", class: "w-fit rounded-sm" }, {}, {
                                    default: () => {
                                      return `${escape(getItemsCount(nota))} un.
                        `;
                                    }
                                  })} `;
                                }
                              })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
                                default: () => {
                                  let statusBadge = getStatusBadge(nota.status);
                                  return `${validate_component(Badge, "Badge").$$render(
                                    $$result,
                                    {
                                      color: statusBadge.color,
                                      class: "w-fit rounded-sm"
                                    },
                                    {},
                                    {
                                      default: () => {
                                        return `${escape(statusBadge.label)} `;
                                      }
                                    }
                                  )} `;
                                }
                              })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[120px]" }, {}, {
                                default: () => {
                                  return `<div class="flex space-x-2"><button class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Ver detalhes">${validate_component(EyeOutline, "EyeOutline").$$render(
                                    $$result,
                                    {
                                      class: "w-5 h-5 text-gray-600 dark:text-gray-400"
                                    },
                                    {},
                                    {}
                                  )}</button> <button class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" ${nota.status === "cancelada" ? "disabled" : ""} title="Editar">${validate_component(PenOutline, "PenOutline").$$render(
                                    $$result,
                                    {
                                      class: "w-5 h-5 text-gray-600 dark:text-gray-400"
                                    },
                                    {},
                                    {}
                                  )} </button></div> `;
                                }
                              })} `;
                            }
                          }
                        )}`;
                      })}`}`;
                    }
                  })}`;
                }
              })}</div></div>`;
            }
          }
        )} ${validate_component(TabItem, "TabItem").$$render(
          $$result,
          {
            title: "Notas de Saída (" + notasSaida.length + ")"
          },
          {},
          {
            default: () => {
              return `<div class="space-y-4"> <div class="min-w-[980px] overflow-x-auto">${validate_component(Table, "Table").$$render($$result, { hoverable: true }, {}, {
                default: () => {
                  return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[140px]" }, {}, {
                        default: () => {
                          return `Número da Nota`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
                        default: () => {
                          return `Data`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[120px]" }, {}, {
                        default: () => {
                          return `Responsável`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
                        $$result,
                        {
                          class: "min-w-[120px] hidden lg:table-cell"
                        },
                        {},
                        {
                          default: () => {
                            return `Destinatário`;
                          }
                        }
                      )} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
                        $$result,
                        {
                          class: "min-w-[120px] hidden xl:table-cell"
                        },
                        {},
                        {
                          default: () => {
                            return `Solicitante`;
                          }
                        }
                      )} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[80px]" }, {}, {
                        default: () => {
                          return `Itens`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
                        default: () => {
                          return `Status`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[120px]" }, {}, {
                        default: () => {
                          return `Ações`;
                        }
                      })}`;
                    }
                  })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                    default: () => {
                      return `${``}`;
                    }
                  })}`;
                }
              })}</div></div>`;
            }
          }
        )}`;
      }
    })}</div>  ${totalPages > 1 || totalItems > 0 ? `<div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700"><div class="text-sm text-gray-500 dark:text-gray-400">Mostrando ${escape(startIndex + 1)} a ${escape(endIndex)} de ${escape(totalItems)} resultados</div> ${totalPages > 1 ? `<div class="flex space-x-2">${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "sm",
        color: "alternative",
        class: "rounded-sm",
        disabled: !hasPrev
      },
      {},
      {
        default: () => {
          return `Anterior`;
        }
      }
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "sm",
        color: "alternative",
        class: "rounded-sm",
        disabled: !hasNext
      },
      {},
      {
        default: () => {
          return `Próximo`;
        }
      }
    )}</div>` : ``}</div>` : ``}</div>` : ` ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<div class="text-center py-12"><div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-8 h-8 text-gray-400" }, {}, {})}</div> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">${escape(searchTerm || statusFilter !== "todos" ? "Nenhuma nota encontrada" : `Nenhuma nota de ${"entrada"} cadastrada`)}</h3> <p class="text-gray-500 dark:text-gray-400 mb-6">${escape(searchTerm || statusFilter !== "todos" ? "Tente ajustar os filtros ou termo de busca" : "Comece criando uma nova nota de movimentação")}</p> ${validate_component(Button, "Button").$$render(
          $$result,
          {
            size: "sm",
            color: "primary",
            class: "rounded-sm"
          },
          {},
          {
            default: () => {
              return `${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})} ${escape(searchTerm || statusFilter !== "todos" ? "Nova Nota" : "Primeira Nota")}`;
            }
          }
        )}</div>`;
      }
    })}`}`}</div>  ${validate_component(MovementModalPresenter, "MovementModalPresenter").$$render(
      $$result,
      { loading: false, show: showNewModal },
      {
        show: ($$value) => {
          showNewModal = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
