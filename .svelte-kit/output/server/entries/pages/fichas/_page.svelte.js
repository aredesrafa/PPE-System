import { c as create_ssr_component, a as compute_rest_props, b as compute_slots, j as getContext, l as each, v as validate_component, h as escape, d as spread, g as add_attribute, f as escape_attribute_value, e as escape_object, i as createEventDispatcher } from "../../../chunks/ssr.js";
import { B as Badge } from "../../../chunks/Badge.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { l as labelClass, i as inputClass, f as formatarData, T as Tabs, a as TabItem } from "../../../chunks/dateHelpers.js";
import { L as Label, T as Textarea, E as EyeOutline } from "../../../chunks/EyeOutline.js";
import { I as Input } from "../../../chunks/Input.js";
import { P as PlusOutline, S as SearchOutline, R as RefreshOutline, T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../chunks/SearchOutline.js";
import { twMerge } from "tailwind-merge";
import { b as notify } from "../../../chunks/modalStore.js";
import { S as SearchableDropdown } from "../../../chunks/SearchableDropdown.js";
import { L as LoadingSpinner } from "../../../chunks/LoadingSpinner.js";
import { S as Select } from "../../../chunks/Select.js";
import { M as Modal } from "../../../chunks/Modal.js";
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
const DownloadOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "download outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"></path></svg>`} `;
});
class FichaProcessAdapter {
  // ==================== QUERIES - Buscar dados de fichas ====================
  /**
   * Busca dados completos de uma ficha para o drawer de detalhes
   */
  async getFichaDetailData(fichaId) {
    try {
      console.log("📋 Carregando dados completos da ficha:", fichaId);
      const [ficha, colaborador, entregas] = await Promise.all([
        this.getFichaById(fichaId),
        this.getColaboradorByFichaId(fichaId),
        this.getEntregasByFichaId(fichaId)
      ]);
      const equipamentosEmPosse = this.calculateEquipamentosEmPosse(entregas);
      const devolucoes = this.calculateDevolucoes(entregas);
      const historicoEventos = this.buildHistoricoEventos(ficha, entregas);
      console.log("✅ Dados da ficha carregados:", {
        fichaId,
        entregas: entregas.length,
        equipamentos: equipamentosEmPosse.length,
        eventos: historicoEventos.length
      });
      return {
        ficha,
        colaborador,
        entregas,
        equipamentosEmPosse,
        devolucoes,
        historicoEventos
      };
    } catch (error) {
      console.error("❌ Erro ao carregar dados da ficha:", error);
      throw error;
    }
  }
  /**
   * Busca ficha por ID
   */
  async getFichaById(fichaId) {
    const fichas = this.getMockFichas();
    const ficha = fichas.find((f) => f.id === fichaId);
    if (!ficha) {
      throw new Error(`Ficha não encontrada: ${fichaId}`);
    }
    return {
      id: ficha.id,
      colaboradorId: ficha.colaboradorId,
      dataEmissao: ficha.dataEmissao,
      dataValidade: ficha.dataValidade,
      status: ficha.status,
      observacoes: ficha.observacoes,
      ativo: ficha.ativo,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  /**
   * Busca colaborador da ficha
   */
  async getColaboradorByFichaId(fichaId) {
    const ficha = await this.getFichaById(fichaId);
    const colaboradores = this.getMockColaboradores();
    const colaborador = colaboradores.find((c) => c.id === ficha.colaboradorId);
    if (!colaborador) {
      throw new Error(`Colaborador não encontrado para ficha: ${fichaId}`);
    }
    return {
      id: colaborador.id,
      nome: colaborador.nome,
      cpf: colaborador.cpf,
      email: colaborador.email,
      telefone: colaborador.telefone,
      cargo: colaborador.cargo,
      dataAdmissao: colaborador.dataAdmissao,
      dataDesligamento: colaborador.dataDesligamento,
      contratadaId: colaborador.contratadaId,
      ativo: colaborador.ativo,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      contratada: colaborador.contratada ? {
        id: colaborador.contratada.id,
        nome: colaborador.contratada.nome,
        cnpj: colaborador.contratada.cnpj,
        endereco: colaborador.contratada.endereco,
        telefone: colaborador.contratada.telefone,
        email: colaborador.contratada.email,
        responsavel: colaborador.contratada.responsavel,
        ativo: colaborador.contratada.ativo,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      } : void 0
    };
  }
  /**
   * Busca entregas da ficha
   */
  async getEntregasByFichaId(fichaId) {
    return this.getMockEntregasDetalhadas(fichaId);
  }
  /**
   * Busca EPIs disponíveis para entrega
   */
  async getEPIsDisponiveis() {
    return [
      { id: "1", nomeEquipamento: "Capacete de Segurança", registroCA: "31469", categoria: "PROTECAO_CABECA", disponivel: true, quantidade: 15 },
      { id: "2", nomeEquipamento: "Luvas de Proteção", registroCA: "15276", categoria: "PROTECAO_MAOS", disponivel: true, quantidade: 25 },
      { id: "3", nomeEquipamento: "Óculos de Proteção", registroCA: "19420", categoria: "PROTECAO_OLHOS", disponivel: true, quantidade: 12 },
      { id: "4", nomeEquipamento: "Protetor Auricular", registroCA: "5674", categoria: "PROTECAO_AUDITIVA", disponivel: true, quantidade: 30 },
      { id: "5", nomeEquipamento: "Cinto de Segurança", registroCA: "18392", categoria: "PROTECAO_QUEDAS", disponivel: true, quantidade: 8 },
      { id: "6", nomeEquipamento: "Botina de Segurança", registroCA: "12845", categoria: "PROTECAO_PES", disponivel: true, quantidade: 20 },
      { id: "7", nomeEquipamento: "Máscara PFF2", registroCA: "42987", categoria: "PROTECAO_RESPIRATORIA", disponivel: true, quantidade: 50 }
    ];
  }
  // ==================== COMMANDS - Operações de processo ====================
  /**
   * Cria nova entrega
   */
  async criarNovaEntrega(fichaId, entregaData) {
    try {
      console.log("📦 Criando nova entrega:", { fichaId, entregaData });
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      const novaEntrega = {
        id: this.generateDeliveryId(),
        fichaEPIId: fichaId,
        dataEntrega: (/* @__PURE__ */ new Date()).toISOString(),
        status: "nao_assinado",
        assinatura: void 0,
        dataAssinatura: void 0,
        observacoes: "",
        usuarioId: "user-admin",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await this.addEntregaToMockCache(novaEntrega, entregaData);
      console.log("✅ Nova entrega criada:", novaEntrega.id);
      return novaEntrega;
    } catch (error) {
      console.error("❌ Erro ao criar entrega:", error);
      throw error;
    }
  }
  /**
   * Edita entrega existente
   */
  async editarEntrega(entregaId, entregaData) {
    try {
      console.log("✏️ Editando entrega:", { entregaId, entregaData });
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("✅ Entrega editada:", entregaId);
      return {
        id: entregaId,
        fichaEPIId: "",
        dataEntrega: (/* @__PURE__ */ new Date()).toISOString(),
        status: "nao_assinado",
        usuarioId: "user-admin",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("❌ Erro ao editar entrega:", error);
      throw error;
    }
  }
  /**
   * Processa assinatura digital
   */
  async processarAssinatura(entregaId, assinaturaData) {
    try {
      console.log("✍️ Processando assinatura:", { entregaId, assinaturaData });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("✅ Assinatura processada:", entregaId);
      return {
        id: entregaId,
        fichaEPIId: "",
        dataEntrega: (/* @__PURE__ */ new Date()).toISOString(),
        status: "assinado",
        assinatura: assinaturaData.assinatura,
        dataAssinatura: (/* @__PURE__ */ new Date()).toISOString(),
        usuarioId: "user-admin",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("❌ Erro ao processar assinatura:", error);
      throw error;
    }
  }
  /**
   * Processa devolução de EPI
   */
  async processarDevolucao(equipamentoId, devolucaoData) {
    try {
      console.log("🔄 Processando devolução:", { equipamentoId, devolucaoData });
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      console.log("✅ Devolução processada:", equipamentoId);
    } catch (error) {
      console.error("❌ Erro ao processar devolução:", error);
      throw error;
    }
  }
  /**
   * Cancela entrega
   */
  async cancelarEntrega(entregaId, motivo) {
    try {
      console.log("❌ Cancelando entrega:", { entregaId, motivo });
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("✅ Entrega cancelada:", entregaId);
    } catch (error) {
      console.error("❌ Erro ao cancelar entrega:", error);
      throw error;
    }
  }
  // ==================== MÉTODOS AUXILIARES ====================
  /**
   * Calcula equipamentos em posse baseado nas entregas
   */
  calculateEquipamentosEmPosse(entregas) {
    return [
      {
        id: "1",
        nomeEquipamento: "Capacete de Segurança",
        registroCA: "31469",
        quantidade: 1,
        entregaId: this.generateDeliveryId(),
        prazoMaximoDevolucao: /* @__PURE__ */ new Date("2024-12-15"),
        vencido: true,
        diasVencido: 20
      },
      {
        id: "2",
        nomeEquipamento: "Luvas de Proteção",
        registroCA: "15276",
        quantidade: 2,
        entregaId: this.generateDeliveryId(),
        prazoMaximoDevolucao: /* @__PURE__ */ new Date("2025-02-15"),
        vencido: false
      }
    ];
  }
  /**
   * Calcula devoluções realizadas
   */
  calculateDevolucoes(entregas) {
    return [
      {
        id: "1",
        nomeEquipamento: "Protetor Auricular",
        registroCA: "5674",
        quantidade: 1,
        dataDevolucao: /* @__PURE__ */ new Date("2024-11-20"),
        prazoOriginal: /* @__PURE__ */ new Date("2024-11-15"),
        noPrazo: false,
        diasAtraso: 5
      }
    ];
  }
  /**
   * Constrói histórico de eventos da ficha
   */
  buildHistoricoEventos(ficha, entregas) {
    const eventos = [];
    eventos.push({
      id: "1",
      tipo: "ficha_criada",
      data: new Date(ficha.dataEmissao),
      descricao: "Ficha criada",
      responsavel: "Sistema"
    });
    entregas.forEach((entrega, index) => {
      eventos.push({
        id: `entrega-${index + 1}`,
        tipo: "entrega",
        data: new Date(entrega.dataEntrega),
        descricao: `Entrega realizada`,
        responsavel: "Responsável da Entrega",
        entregaId: entrega.id
      });
      if (entrega.status === "assinado" && entrega.dataAssinatura) {
        eventos.push({
          id: `assinatura-${index + 1}`,
          tipo: "assinatura",
          data: new Date(entrega.dataAssinatura),
          descricao: "Entrega assinada",
          responsavel: "Colaborador"
        });
      }
    });
    return eventos.sort((a, b) => b.data.getTime() - a.data.getTime());
  }
  /**
   * Gera ID único para entrega
   */
  generateDeliveryId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "E";
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  /**
   * Dados mockados de entregas detalhadas
   */
  getMockEntregasDetalhadas(fichaId) {
    return [
      {
        id: this.generateDeliveryId(),
        fichaEPIId: fichaId,
        dataEntrega: (/* @__PURE__ */ new Date("2024-09-15")).toISOString(),
        status: "assinado",
        assinatura: "data:image/png;base64,mock-signature",
        dataAssinatura: (/* @__PURE__ */ new Date("2024-09-15")).toISOString(),
        observacoes: "",
        usuarioId: "user-1",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        id: this.generateDeliveryId(),
        fichaEPIId: fichaId,
        dataEntrega: (/* @__PURE__ */ new Date("2024-11-20")).toISOString(),
        status: "nao_assinado",
        usuarioId: "user-2",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    ];
  }
  /**
   * Adiciona entrega à cache mockada
   */
  async addEntregaToMockCache(entrega, entregaData) {
    console.log("💾 Entrega adicionada à cache:", { entrega, entregaData });
  }
  /**
   * Dados mockados de fichas para demonstração
   */
  getMockFichas() {
    return [
      {
        id: "ficha-001",
        colaboradorId: "colab-001",
        dataEmissao: "2024-09-01",
        dataValidade: "2025-09-01",
        status: "ativa",
        observacoes: "Ficha ativa para engenheiro",
        ativo: true
      },
      {
        id: "ficha-002",
        colaboradorId: "colab-002",
        dataEmissao: "2024-10-15",
        dataValidade: "2025-10-15",
        status: "ativa",
        observacoes: "Ficha ativa para técnica",
        ativo: true
      },
      {
        id: "ficha-003",
        colaboradorId: "colab-003",
        dataEmissao: "2024-06-10",
        dataValidade: "2024-12-31",
        status: "vencida",
        observacoes: "Ficha vencida - renovar",
        ativo: true
      }
    ];
  }
  /**
   * Dados mockados de colaboradores para demonstração
   */
  getMockColaboradores() {
    return [
      {
        id: "colab-001",
        nome: "João Claudio Silva",
        cpf: "123.456.789-00",
        email: "joao.silva@techcorp.com",
        telefone: "(11) 99999-1111",
        cargo: "Engenheiro Civil",
        dataAdmissao: "2024-01-15",
        dataDesligamento: null,
        contratadaId: "empresa-001",
        ativo: true,
        contratada: {
          id: "empresa-001",
          nome: "TechCorp Engenharia",
          cnpj: "12.345.678/0001-90",
          endereco: "Rua das Flores, 123",
          telefone: "(11) 3333-1111",
          email: "contato@techcorp.com",
          responsavel: "Maria Santos",
          ativo: true
        }
      },
      {
        id: "colab-002",
        nome: "Maria Santos Oliveira",
        cpf: "987.654.321-00",
        email: "maria.santos@buildmax.com",
        telefone: "(11) 99999-2222",
        cargo: "Técnica em Segurança",
        dataAdmissao: "2024-03-10",
        dataDesligamento: null,
        contratadaId: "empresa-002",
        ativo: true,
        contratada: {
          id: "empresa-002",
          nome: "BuildMax Construções",
          cnpj: "98.765.432/0001-10",
          endereco: "Av. Industrial, 456",
          telefone: "(11) 3333-2222",
          email: "contato@buildmax.com",
          responsavel: "Carlos Pereira",
          ativo: true
        }
      },
      {
        id: "colab-003",
        nome: "Pedro Costa Lima",
        cpf: "456.789.123-00",
        email: "pedro.lima@safework.com",
        telefone: "(11) 99999-3333",
        cargo: "Operador de Máquinas",
        dataAdmissao: "2024-02-20",
        dataDesligamento: null,
        contratadaId: "empresa-003",
        ativo: true,
        contratada: {
          id: "empresa-003",
          nome: "SafeWork Solutions",
          cnpj: "11.222.333/0001-44",
          endereco: "Rua da Segurança, 789",
          telefone: "(11) 3333-3333",
          email: "contato@safework.com",
          responsavel: "Ana Rodrigues",
          ativo: true
        }
      }
    ];
  }
}
const fichaProcessAdapter = new FichaProcessAdapter();
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
const StatusDot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let color;
  let text;
  let dotClass;
  let textClass;
  let { status } = $$props;
  let { type = "ficha" } = $$props;
  let { showText = true } = $$props;
  let { size = "md" } = $$props;
  const statusColors = {
    // Fichas EPI
    ficha: {
      ativo: "#00B8AA",
      // green-500 - nossa paleta personalizada
      vencido: "#FF4563",
      // red-500 - nossa paleta personalizada  
      suspenso: "#D98C29",
      // yellow-500 - nossa paleta personalizada
      arquivado: "#535D72",
      // gray-500 - nossa paleta personalizada
      inativo: "#535D72"
    },
    // gray-500
    // Colaboradores
    colaborador: {
      ativo: "#00B8AA",
      // green-500
      inativo: "#535D72",
      // gray-500
      desligado: "#FF4563",
      // red-500
      suspenso: "#D98C29"
    },
    // yellow-500
    // Entregas
    entrega: {
      assinado: "#00B8AA",
      // green-500
      nao_assinado: "#D98C29",
      // yellow-500
      pendente: "#D98C29",
      // yellow-500
      cancelado: "#FF4563"
    },
    // red-500
    // Itens de estoque
    item: {
      disponivel: "#00B8AA",
      // green-500
      baixo_estoque: "#D98C29",
      // yellow-500
      esgotado: "#FF4563",
      // red-500
      vencido: "#FF4563",
      // red-500
      vencendo: "#D98C29"
    },
    // yellow-500
    // Movimentações
    movimento: {
      entrada: "#00B8AA",
      // green-500
      saida: "#FF4563",
      // red-500
      ajuste: "#3F83F8",
      // primary-500 (blue)
      transferencia: "#3F83F8"
    }
    // primary-500 (blue)
  };
  const statusTexts = {
    // Fichas
    ativo: "Ativo",
    vencido: "Vencido",
    suspenso: "Suspenso",
    arquivado: "Arquivado",
    inativo: "Inativo",
    // Entregas
    assinado: "Assinado",
    nao_assinado: "Não Assinado",
    pendente: "Pendente",
    cancelado: "Cancelado",
    // Estoque
    disponivel: "Disponível",
    baixo_estoque: "Baixo Estoque",
    esgotado: "Esgotado",
    vencendo: "Vencendo",
    // Movimentações
    entrada: "Entrada",
    saida: "Saída",
    ajuste: "Ajuste",
    transferencia: "Transferência"
  };
  const dotSizes = {
    sm: "w-2 h-2",
    // 8px
    md: "w-2.5 h-2.5",
    // 10px (padrão Figma)
    lg: "w-3 h-3"
  };
  const textSizes = {
    sm: "text-xs",
    // 12px
    md: "text-sm",
    // 14px (padrão Figma)
    lg: "text-base"
  };
  if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.showText === void 0 && $$bindings.showText && showText !== void 0) $$bindings.showText(showText);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  color = statusColors[type]?.[status] || "#535D72";
  text = statusTexts[status] || status;
  dotClass = dotSizes[size];
  textClass = textSizes[size];
  return ` <div class="${"inline-flex items-center gap-2 " + escape($$props.class || "", true)}"> <div class="${"rounded-full " + escape(dotClass, true) + " border border-white dark:border-gray-800"}" style="${"background-color: " + escape(color, true) + ";"}"></div>  ${showText ? `<span class="${"font-medium text-gray-900 dark:text-white " + escape(textClass, true)}">${escape(text)}</span>` : ``}</div> `;
});
const css$3 = {
  code: ".truncate.svelte-3dzcad{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  map: `{"version":3,"file":"DrawerHeader.svelte","sources":["DrawerHeader.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport { Button, Badge } from \\"flowbite-svelte\\";\\nimport Icon from \\"$lib/components/common/Icon.svelte\\";\\nimport StatusDot from \\"$lib/components/common/StatusDot.svelte\\";\\nconst dispatch = createEventDispatcher();\\nexport let title;\\nexport let objectType = \\"\\";\\nexport let iconName = \\"UserOutline\\";\\nexport let status = \\"\\";\\nexport let statusType = \\"ficha\\";\\nexport let additionalInfo = [];\\nexport let primaryAction = null;\\nexport let secondaryAction = null;\\nexport let tertiaryAction = null;\\nexport let showMoreActions = false;\\nexport let showCloseButton = true;\\nexport let truncateTitle = true;\\nfunction handleClose() {\\n  dispatch(\\"close\\");\\n}\\nfunction handlePrimaryAction() {\\n  if (primaryAction && !primaryAction.disabled) {\\n    dispatch(\\"primaryAction\\");\\n  }\\n}\\nfunction handleSecondaryAction() {\\n  if (secondaryAction && !secondaryAction.disabled) {\\n    dispatch(\\"secondaryAction\\");\\n  }\\n}\\nfunction handleTertiaryAction() {\\n  if (tertiaryAction && !tertiaryAction.disabled) {\\n    dispatch(\\"tertiaryAction\\");\\n  }\\n}\\nfunction handleMoreActions() {\\n  dispatch(\\"moreActions\\");\\n}\\n<\/script>\\n\\n<!-- Drawer Header -->\\n<div class=\\"flex items-center gap-3 px-3 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800\\">\\n  <!-- Close Button (sempre à esquerda) -->\\n  {#if showCloseButton}\\n    <button\\n      class=\\"rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors\\"\\n      on:click={handleClose}\\n    >\\n      <Icon name=\\"CloseOutline\\" size=\\"w-5 h-5\\" className=\\"text-gray-600 dark:text-gray-400\\" />\\n    </button>\\n  {/if}\\n\\n  <!-- Content Area (expandir para preencher espaço disponível) -->\\n  <div class=\\"flex-1 min-w-0 flex flex-col\\">\\n    <!-- Object Type (ALL CAPS) -->\\n    {#if objectType}\\n      <p class=\\"text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider mb-1\\" style=\\"font-size: 11px;\\">\\n        {objectType}\\n      </p>\\n    {/if}\\n\\n    <!-- Main Row: Icon + Title + Status + Actions -->\\n    <div class=\\"flex items-center gap-2.5\\">\\n      <!-- Icon -->\\n      <div class=\\"flex-shrink-0\\">\\n        <Icon name={iconName} className=\\"text-gray-900 dark:text-white\\" size=\\"w-6 h-6\\" />\\n      </div>\\n\\n      <!-- Title -->\\n      <h2 \\n        class=\\"font-medium text-gray-900 dark:text-white {truncateTitle ? 'truncate' : ''} flex-1 min-w-0\\"\\n        style=\\"font-size: 18px; line-height: 1.2;\\"\\n      >\\n        {title}\\n      </h2>\\n\\n      <!-- Status -->\\n      {#if status}\\n        <div class=\\"flex-shrink-0\\">\\n          <StatusDot {status} type={statusType} size=\\"md\\" />\\n        </div>\\n      {/if}\\n\\n      <!-- Gap maior antes dos botões -->\\n      {#if status && (primaryAction || secondaryAction || tertiaryAction || showMoreActions)}\\n        <div class=\\"w-4\\"></div>\\n      {/if}\\n\\n      <!-- Actions -->\\n      <div class=\\"flex items-center gap-2 flex-shrink-0\\">\\n        <!-- Tertiary Action (icon only with dots) -->\\n        {#if showMoreActions}\\n          <Button\\n            size=\\"sm\\"\\n            color=\\"alternative\\"\\n            class=\\"rounded-sm border border-gray-300 dark:border-gray-600 p-2\\"\\n            on:click={handleMoreActions}\\n          >\\n            <Icon name=\\"EllipsisVerticalOutline\\" size=\\"w-4 h-4\\" />\\n          </Button>\\n        {/if}\\n\\n        <!-- Tertiary Action (custom) -->\\n        {#if tertiaryAction}\\n          <Button\\n            size=\\"sm\\"\\n            color=\\"alternative\\"\\n            class=\\"rounded-sm border border-gray-300 dark:border-gray-600\\"\\n            disabled={tertiaryAction.disabled}\\n            on:click={handleTertiaryAction}\\n          >\\n            {#if tertiaryAction.icon}\\n              <Icon name={tertiaryAction.icon} className=\\"mr-2\\" size=\\"w-4 h-4\\" />\\n            {/if}\\n            {tertiaryAction.text}\\n          </Button>\\n        {/if}\\n\\n        <!-- Secondary Action -->\\n        {#if secondaryAction}\\n          <Button\\n            size=\\"sm\\"\\n            color=\\"alternative\\"\\n            class=\\"rounded-sm border border-gray-300 dark:border-gray-600\\"\\n            disabled={secondaryAction.disabled}\\n            on:click={handleSecondaryAction}\\n          >\\n            {#if secondaryAction.icon}\\n              <Icon name={secondaryAction.icon} className=\\"mr-2\\" size=\\"w-4 h-4\\" />\\n            {/if}\\n            {secondaryAction.text}\\n          </Button>\\n        {/if}\\n\\n        <!-- Primary Action -->\\n        {#if primaryAction}\\n          <Button\\n            size=\\"sm\\"\\n            color=\\"primary\\"\\n            class=\\"rounded-sm\\"\\n            disabled={primaryAction.disabled}\\n            on:click={handlePrimaryAction}\\n          >\\n            {#if primaryAction.icon}\\n              <Icon name={primaryAction.icon} className=\\"mr-2\\" size=\\"w-4 h-4\\" />\\n            {/if}\\n            {primaryAction.text}\\n          </Button>\\n        {/if}\\n      </div>\\n    </div>\\n\\n    <!-- Additional Info Row -->\\n    {#if additionalInfo.length > 0}\\n      <div class=\\"flex items-center gap-1 text-gray-600 dark:text-gray-400 mt-1\\" style=\\"font-size: 12px;\\">\\n        {#each additionalInfo as info, index}\\n          <span>{info}</span>\\n          {#if index < additionalInfo.length - 1}\\n            <span class=\\"text-gray-400\\">•</span>\\n          {/if}\\n        {/each}\\n      </div>\\n    {/if}\\n  </div>\\n</div>\\n\\n<style>\\n  /* Ensure text truncation works properly */\\n  .truncate {\\n    overflow: hidden;\\n    text-overflow: ellipsis;\\n    white-space: nowrap;\\n  }\\n</style>"],"names":[],"mappings":"AAwKE,uBAAU,CACR,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,WAAW,CAAE,MACf"}`
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
  $$result.css.add(css$3);
  return ` <div class="flex items-center gap-3 px-3 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"> ${showCloseButton ? `<button class="rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      name: "CloseOutline",
      size: "w-5 h-5",
      className: "text-gray-600 dark:text-gray-400"
    },
    {},
    {}
  )}</button>` : ``}  <div class="flex-1 min-w-0 flex flex-col"> ${objectType ? `<p class="text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider mb-1" style="font-size: 11px;">${escape(objectType)}</p>` : ``}  <div class="flex items-center gap-2.5"> <div class="flex-shrink-0">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      name: iconName,
      className: "text-gray-900 dark:text-white",
      size: "w-6 h-6"
    },
    {},
    {}
  )}</div>  <h2 class="${"font-medium text-gray-900 dark:text-white " + escape(truncateTitle ? "truncate" : "", true) + " flex-1 min-w-0 svelte-3dzcad"}" style="font-size: 18px; line-height: 1.2;">${escape(title)}</h2>  ${status ? `<div class="flex-shrink-0">${validate_component(StatusDot, "StatusDot").$$render($$result, { status, type: statusType, size: "md" }, {}, {})}</div>` : ``}  ${status && (primaryAction || secondaryAction || tertiaryAction || showMoreActions) ? `<div class="w-4"></div>` : ``}  <div class="flex items-center gap-2 flex-shrink-0"> ${showMoreActions ? `${validate_component(Button, "Button").$$render(
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
    return `<span>${escape(info)}</span> ${index < additionalInfo.length - 1 ? `<span class="text-gray-400" data-svelte-h="svelte-9uw2yr">•</span>` : ``}`;
  })}</div>` : ``}</div> </div>`;
});
const css$2 = {
  code: ".custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar{width:8px}.custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-track{background:transparent;border-radius:8px}.custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:8px;border:2px solid transparent;background-clip:content-box}.dark .custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-thumb{background:#4b5563;background-clip:content-box}",
  map: '{"version":3,"file":"NovaEntregaDrawerPresenter.svelte","sources":["NovaEntregaDrawerPresenter.svelte"],"sourcesContent":["<!--\\n  Nova Entrega Drawer Presenter - Componente \\"Burro\\"\\n  \\n  Presenter especializado para o formulário de nova entrega:\\n  - Recebe dados via props\\n  - Renderiza formulário com validação visual\\n  - Emite eventos para o Container\\n  - Mantém layout original\\n-->\\n\\n<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport { Button, Input, Select, Label } from \\"flowbite-svelte\\";\\nimport Icon from \\"$lib/components/common/Icon.svelte\\";\\nimport DrawerHeader from \\"$lib/components/common/DrawerHeader.svelte\\";\\nexport let episDisponiveis = [];\\nexport let loading = false;\\nexport let show = false;\\nconst dispatch = createEventDispatcher();\\nlet responsavelEntrega = \\"\\";\\nlet itensSelecionados = [];\\nlet errors = {};\\n$: if (show) {\\n  resetForm();\\n}\\nfunction resetForm() {\\n  responsavelEntrega = \\"\\";\\n  itensSelecionados = [];\\n  errors = {};\\n}\\nfunction adicionarItem() {\\n  itensSelecionados = [...itensSelecionados, {\\n    episDisponivelId: \\"\\",\\n    nomeEquipamento: \\"\\",\\n    registroCA: \\"\\",\\n    quantidade: 1\\n  }];\\n}\\nfunction removerItem(index) {\\n  itensSelecionados = itensSelecionados.filter((_, i) => i !== index);\\n}\\nfunction atualizarEPI(index, episDisponivelId) {\\n  const epiSelecionado = episDisponiveis.find((epi) => epi.id === episDisponivelId);\\n  if (epiSelecionado) {\\n    itensSelecionados[index] = {\\n      ...itensSelecionados[index],\\n      episDisponivelId,\\n      nomeEquipamento: epiSelecionado.nomeEquipamento,\\n      registroCA: epiSelecionado.registroCA\\n    };\\n    delete errors[`item-${index}`];\\n    errors = { ...errors };\\n  }\\n}\\nfunction atualizarQuantidade(index, quantidade) {\\n  itensSelecionados[index] = {\\n    ...itensSelecionados[index],\\n    quantidade\\n  };\\n  delete errors[`quantidade-${index}`];\\n  errors = { ...errors };\\n}\\nfunction validateForm() {\\n  const newErrors = {};\\n  if (!responsavelEntrega.trim()) {\\n    newErrors.responsavel = \\"Respons\\\\xE1vel \\\\xE9 obrigat\\\\xF3rio\\";\\n  }\\n  if (itensSelecionados.length === 0) {\\n    newErrors.items = \\"Adicione pelo menos um item\\";\\n  }\\n  itensSelecionados.forEach((item, index) => {\\n    if (!item.episDisponivelId) {\\n      newErrors[`item-${index}`] = \\"Selecione um EPI\\";\\n    }\\n    if (item.quantidade < 1) {\\n      newErrors[`quantidade-${index}`] = \\"Quantidade deve ser maior que 0\\";\\n    }\\n  });\\n  errors = newErrors;\\n  return Object.keys(newErrors).length === 0;\\n}\\nfunction handleSalvar() {\\n  if (!validateForm()) {\\n    return;\\n  }\\n  const formData = {\\n    responsavel: responsavelEntrega.trim(),\\n    itens: itensSelecionados.map((item) => ({\\n      episDisponivelId: item.episDisponivelId,\\n      nomeEquipamento: item.nomeEquipamento,\\n      registroCA: item.registroCA,\\n      quantidade: item.quantidade\\n    }))\\n  };\\n  dispatch(\\"salvar\\", formData);\\n}\\nfunction handleCancelar() {\\n  dispatch(\\"cancelar\\");\\n}\\n$: episOptions = [\\n  { value: \\"\\", label: \\"Selecione um EPI...\\" },\\n  ...episDisponiveis.filter((epi) => epi.disponivel).map((epi) => ({\\n    value: epi.id,\\n    label: `${epi.nomeEquipamento} (CA ${epi.registroCA})${epi.quantidade ? ` - ${epi.quantidade} dispon\\\\xEDveis` : \\"\\"}`\\n  }))\\n];\\n$: canSave = responsavelEntrega.trim() && itensSelecionados.length > 0 && !loading;\\n<\/script>\\n\\n{#if show}\\n  <!-- Overlay -->\\n  <div class=\\"fixed inset-0 bg-black bg-opacity-50 z-55 transition-opacity\\"></div>\\n\\n  <!-- Drawer -->\\n  <div class=\\"fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-60 transform transition-transform duration-300 ease-in-out\\">\\n    \\n    <!-- Header -->\\n    <DrawerHeader \\n      title=\\"Nova Entrega de EPI\\" \\n      on:close={handleCancelar}\\n    />\\n\\n    <!-- Content -->\\n    <div class=\\"flex flex-col h-full\\">\\n      <div class=\\"flex-1 overflow-y-auto custom-scrollbar p-6\\">\\n        \\n        <!-- Responsável -->\\n        <div class=\\"mb-6\\">\\n          <Label for=\\"responsavel\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n            Responsável pela Entrega *\\n          </Label>\\n          <Input\\n            id=\\"responsavel\\"\\n            type=\\"text\\"\\n            placeholder=\\"Nome do responsável pela entrega\\"\\n            bind:value={responsavelEntrega}\\n            class=\\"rounded-sm {errors.responsavel ? \'border-red-500\' : \'\'}\\"\\n            disabled={loading}\\n          />\\n          {#if errors.responsavel}\\n            <p class=\\"mt-1 text-sm text-red-600 dark:text-red-400\\">\\n              {errors.responsavel}\\n            </p>\\n          {/if}\\n        </div>\\n\\n        <!-- EPIs para Entrega -->\\n        <div class=\\"mb-6\\">\\n          <div class=\\"flex items-center justify-between mb-4\\">\\n            <Label class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n              EPIs para Entrega *\\n            </Label>\\n            <Button\\n              size=\\"xs\\"\\n              color=\\"alternative\\"\\n              class=\\"rounded-sm\\"\\n              on:click={adicionarItem}\\n              disabled={loading}\\n            >\\n              <Icon name=\\"PlusOutline\\" className=\\"mr-2\\" size=\\"w-4 h-4\\" />\\n              Adicionar Item\\n            </Button>\\n          </div>\\n\\n          {#if errors.items}\\n            <p class=\\"mb-3 text-sm text-red-600 dark:text-red-400\\">\\n              {errors.items}\\n            </p>\\n          {/if}\\n\\n          <div class=\\"space-y-4\\">\\n            {#each itensSelecionados as item, index}\\n              <div class=\\"border border-gray-200 dark:border-gray-700 rounded-lg p-4\\">\\n                <div class=\\"flex items-start justify-between mb-4\\">\\n                  <h4 class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                    Item {index + 1}\\n                  </h4>\\n                  {#if itensSelecionados.length > 1}\\n                    <button\\n                      class=\\"text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300\\"\\n                      on:click={() => removerItem(index)}\\n                      disabled={loading}\\n                      title=\\"Remover item\\"\\n                    >\\n                      <Icon name=\\"TrashBinOutline\\" size=\\"w-4 h-4\\" />\\n                    </button>\\n                  {/if}\\n                </div>\\n\\n                <div class=\\"grid grid-cols-1 md:grid-cols-3 gap-4\\">\\n                  <!-- EPI Selection -->\\n                  <div class=\\"md:col-span-2\\">\\n                    <Label for=\\"epi-{index}\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n                      Equipamento\\n                    </Label>\\n                    <Select\\n                      id=\\"epi-{index}\\"\\n                      items={episOptions}\\n                      bind:value={item.episDisponivelId}\\n                      on:change={(e) => atualizarEPI(index, e.target.value)}\\n                      class=\\"rounded-sm {errors[`item-${index}`] ? \'border-red-500\' : \'\'}\\"\\n                      disabled={loading}\\n                    />\\n                    {#if errors[`item-${index}`]}\\n                      <p class=\\"mt-1 text-sm text-red-600 dark:text-red-400\\">\\n                        {errors[`item-${index}`]}\\n                      </p>\\n                    {/if}\\n                  </div>\\n\\n                  <!-- Quantidade -->\\n                  <div>\\n                    <Label for=\\"quantidade-{index}\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n                      Quantidade\\n                    </Label>\\n                    <Input\\n                      id=\\"quantidade-{index}\\"\\n                      type=\\"number\\"\\n                      min=\\"1\\"\\n                      max=\\"100\\"\\n                      bind:value={item.quantidade}\\n                      on:input={(e) => atualizarQuantidade(index, parseInt(e.target.value) || 1)}\\n                      class=\\"rounded-sm {errors[`quantidade-${index}`] ? \'border-red-500\' : \'\'}\\"\\n                      disabled={loading}\\n                    />\\n                    {#if errors[`quantidade-${index}`]}\\n                      <p class=\\"mt-1 text-sm text-red-600 dark:text-red-400\\">\\n                        {errors[`quantidade-${index}`]}\\n                      </p>\\n                    {/if}\\n                  </div>\\n                </div>\\n\\n                <!-- Preview do EPI selecionado -->\\n                {#if item.nomeEquipamento}\\n                  <div class=\\"mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-sm\\">\\n                    <div class=\\"flex items-center justify-between\\">\\n                      <div>\\n                        <p class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                          {item.nomeEquipamento}\\n                        </p>\\n                        <p class=\\"text-xs text-gray-500 dark:text-gray-400\\">\\n                          CA {item.registroCA}\\n                        </p>\\n                      </div>\\n                      <div class=\\"text-right\\">\\n                        <p class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                          Qtd: {item.quantidade}\\n                        </p>\\n                      </div>\\n                    </div>\\n                  </div>\\n                {/if}\\n              </div>\\n            {/each}\\n\\n            <!-- Add first item button if no items -->\\n            {#if itensSelecionados.length === 0}\\n              <div class=\\"border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center\\">\\n                <Icon name=\\"PlusOutline\\" className=\\"mx-auto mb-3 text-gray-400\\" size=\\"w-8 h-8\\" />\\n                <p class=\\"text-sm text-gray-500 dark:text-gray-400 mb-4\\">\\n                  Nenhum item adicionado\\n                </p>\\n                <Button\\n                  size=\\"sm\\"\\n                  color=\\"alternative\\"\\n                  class=\\"rounded-sm\\"\\n                  on:click={adicionarItem}\\n                  disabled={loading}\\n                >\\n                  Adicionar Primeiro Item\\n                </Button>\\n              </div>\\n            {/if}\\n          </div>\\n        </div>\\n\\n        <!-- Summary -->\\n        {#if itensSelecionados.length > 0}\\n          <div class=\\"mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800\\">\\n            <h4 class=\\"text-sm font-medium text-blue-900 dark:text-blue-100 mb-2\\">\\n              Resumo da Entrega\\n            </h4>\\n            <div class=\\"text-sm text-blue-800 dark:text-blue-200\\">\\n              <p>• Total de itens: {itensSelecionados.length}</p>\\n              <p>• Quantidade total: {itensSelecionados.reduce((sum, item) => sum + item.quantidade, 0)} unidades</p>\\n              <p>• Responsável: {responsavelEntrega || \'Não informado\'}</p>\\n            </div>\\n          </div>\\n        {/if}\\n\\n      </div>\\n\\n      <!-- Footer Actions -->\\n      <div class=\\"flex-shrink-0 bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700\\">\\n        <div class=\\"flex items-center justify-end space-x-3\\">\\n          <Button\\n            color=\\"alternative\\"\\n            class=\\"rounded-sm\\"\\n            on:click={handleCancelar}\\n            disabled={loading}\\n          >\\n            Cancelar\\n          </Button>\\n          <Button\\n            color=\\"primary\\"\\n            class=\\"rounded-sm\\"\\n            on:click={handleSalvar}\\n            disabled={!canSave}\\n          >\\n            {#if loading}\\n              <Icon name=\\"SpinnerOutline\\" className=\\"mr-2 animate-spin\\" size=\\"w-4 h-4\\" />\\n              Salvando...\\n            {:else}\\n              <Icon name=\\"CheckOutline\\" className=\\"mr-2\\" size=\\"w-4 h-4\\" />\\n              Salvar Entrega\\n            {/if}\\n          </Button>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>\\n  /* Scrollbar customization */\\n  .custom-scrollbar::-webkit-scrollbar {\\n    width: 8px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-track {\\n    background: transparent;\\n    border-radius: 8px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background: #e5e7eb;\\n    border-radius: 8px;\\n    border: 2px solid transparent;\\n    background-clip: content-box;\\n  }\\n  \\n  :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background: #4b5563;\\n    background-clip: content-box;\\n  }\\n</style>"],"names":[],"mappings":"AAqUE,+BAAiB,mBAAoB,CACnC,KAAK,CAAE,GACT,CAEA,+BAAiB,yBAA0B,CACzC,UAAU,CAAE,WAAW,CACvB,aAAa,CAAE,GACjB,CAEA,+BAAiB,yBAA0B,CACzC,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WAAW,CAC7B,eAAe,CAAE,WACnB,CAEQ,KAAM,CAAC,+BAAiB,yBAA0B,CACxD,UAAU,CAAE,OAAO,CACnB,eAAe,CAAE,WACnB"}'
};
const NovaEntregaDrawerPresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let episOptions;
  let canSave;
  let { episDisponiveis = [] } = $$props;
  let { loading = false } = $$props;
  let { show = false } = $$props;
  createEventDispatcher();
  let responsavelEntrega = "";
  let itensSelecionados = [];
  let errors = {};
  function resetForm() {
    responsavelEntrega = "";
    itensSelecionados = [];
    errors = {};
  }
  if ($$props.episDisponiveis === void 0 && $$bindings.episDisponiveis && episDisponiveis !== void 0) $$bindings.episDisponiveis(episDisponiveis);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (show) {
        resetForm();
      }
    }
    episOptions = [
      { value: "", label: "Selecione um EPI..." },
      ...episDisponiveis.filter((epi) => epi.disponivel).map((epi) => ({
        value: epi.id,
        label: `${epi.nomeEquipamento} (CA ${epi.registroCA})${epi.quantidade ? ` - ${epi.quantidade} disponíveis` : ""}`
      }))
    ];
    canSave = responsavelEntrega.trim() && itensSelecionados.length > 0 && !loading;
    $$rendered = `  ${show ? ` <div class="fixed inset-0 bg-black bg-opacity-50 z-55 transition-opacity"></div>  <div class="fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-60 transform transition-transform duration-300 ease-in-out"> ${validate_component(DrawerHeader, "DrawerHeader").$$render($$result, { title: "Nova Entrega de EPI" }, {}, {})}  <div class="flex flex-col h-full"><div class="flex-1 overflow-y-auto custom-scrollbar p-6 svelte-ng7f9w"> <div class="mb-6">${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "responsavel",
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      },
      {},
      {
        default: () => {
          return `Responsável pela Entrega *`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "responsavel",
        type: "text",
        placeholder: "Nome do responsável pela entrega",
        class: "rounded-sm " + (errors.responsavel ? "border-red-500" : ""),
        disabled: loading,
        value: responsavelEntrega
      },
      {
        value: ($$value) => {
          responsavelEntrega = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${errors.responsavel ? `<p class="mt-1 text-sm text-red-600 dark:text-red-400">${escape(errors.responsavel)}</p>` : ``}</div>  <div class="mb-6"><div class="flex items-center justify-between mb-4">${validate_component(Label, "Label").$$render(
      $$result,
      {
        class: "text-sm font-medium text-gray-700 dark:text-gray-300"
      },
      {},
      {
        default: () => {
          return `EPIs para Entrega *`;
        }
      }
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "xs",
        color: "alternative",
        class: "rounded-sm",
        disabled: loading
      },
      {},
      {
        default: () => {
          return `${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              name: "PlusOutline",
              className: "mr-2",
              size: "w-4 h-4"
            },
            {},
            {}
          )}
              Adicionar Item`;
        }
      }
    )}</div> ${errors.items ? `<p class="mb-3 text-sm text-red-600 dark:text-red-400">${escape(errors.items)}</p>` : ``} <div class="space-y-4">${each(itensSelecionados, (item, index) => {
      return `<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"><div class="flex items-start justify-between mb-4"><h4 class="text-sm font-medium text-gray-900 dark:text-white">Item ${escape(index + 1)}</h4> ${itensSelecionados.length > 1 ? `<button class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" ${loading ? "disabled" : ""} title="Remover item">${validate_component(Icon, "Icon").$$render($$result, { name: "TrashBinOutline", size: "w-4 h-4" }, {}, {})} </button>` : ``}</div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <div class="md:col-span-2">${validate_component(Label, "Label").$$render(
        $$result,
        {
          for: "epi-" + index,
          class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        },
        {},
        {
          default: () => {
            return `Equipamento
                    `;
          }
        }
      )} ${validate_component(Select, "Select").$$render(
        $$result,
        {
          id: "epi-" + index,
          items: episOptions,
          class: "rounded-sm " + (errors[`item-${index}`] ? "border-red-500" : ""),
          disabled: loading,
          value: item.episDisponivelId
        },
        {
          value: ($$value) => {
            item.episDisponivelId = $$value;
            $$settled = false;
          }
        },
        {}
      )} ${errors[`item-${index}`] ? `<p class="mt-1 text-sm text-red-600 dark:text-red-400">${escape(errors[`item-${index}`])} </p>` : ``}</div>  <div>${validate_component(Label, "Label").$$render(
        $$result,
        {
          for: "quantidade-" + index,
          class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        },
        {},
        {
          default: () => {
            return `Quantidade
                    `;
          }
        }
      )} ${validate_component(Input, "Input").$$render(
        $$result,
        {
          id: "quantidade-" + index,
          type: "number",
          min: "1",
          max: "100",
          class: "rounded-sm " + (errors[`quantidade-${index}`] ? "border-red-500" : ""),
          disabled: loading,
          value: item.quantidade
        },
        {
          value: ($$value) => {
            item.quantidade = $$value;
            $$settled = false;
          }
        },
        {}
      )} ${errors[`quantidade-${index}`] ? `<p class="mt-1 text-sm text-red-600 dark:text-red-400">${escape(errors[`quantidade-${index}`])} </p>` : ``} </div></div>  ${item.nomeEquipamento ? `<div class="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-sm"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-900 dark:text-white">${escape(item.nomeEquipamento)}</p> <p class="text-xs text-gray-500 dark:text-gray-400">CA ${escape(item.registroCA)} </p></div> <div class="text-right"><p class="text-sm font-medium text-gray-900 dark:text-white">Qtd: ${escape(item.quantidade)}</p> </div></div> </div>` : ``} </div>`;
    })}  ${itensSelecionados.length === 0 ? `<div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        name: "PlusOutline",
        className: "mx-auto mb-3 text-gray-400",
        size: "w-8 h-8"
      },
      {},
      {}
    )} <p class="text-sm text-gray-500 dark:text-gray-400 mb-4" data-svelte-h="svelte-1e863on">Nenhum item adicionado</p> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "sm",
        color: "alternative",
        class: "rounded-sm",
        disabled: loading
      },
      {},
      {
        default: () => {
          return `Adicionar Primeiro Item`;
        }
      }
    )}</div>` : ``}</div></div>  ${itensSelecionados.length > 0 ? `<div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"><h4 class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2" data-svelte-h="svelte-gkoh82">Resumo da Entrega</h4> <div class="text-sm text-blue-800 dark:text-blue-200"><p>• Total de itens: ${escape(itensSelecionados.length)}</p> <p>• Quantidade total: ${escape(itensSelecionados.reduce((sum, item) => sum + item.quantidade, 0))} unidades</p> <p>• Responsável: ${escape(responsavelEntrega || "Não informado")}</p></div></div>` : ``}</div>  <div class="flex-shrink-0 bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700"><div class="flex items-center justify-end space-x-3">${validate_component(Button, "Button").$$render(
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
        disabled: !canSave
      },
      {},
      {
        default: () => {
          return `${loading ? `${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              name: "SpinnerOutline",
              className: "mr-2 animate-spin",
              size: "w-4 h-4"
            },
            {},
            {}
          )}
              Salvando...` : `${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              name: "CheckOutline",
              className: "mr-2",
              size: "w-4 h-4"
            },
            {},
            {}
          )}
              Salvar Entrega`}`;
        }
      }
    )}</div></div></div></div>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const css$1 = {
  code: ".custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar{width:8px}.custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-track{background:transparent;border-radius:8px}.custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:8px;border:2px solid transparent;background-clip:content-box}.dark .custom-scrollbar.svelte-ng7f9w::-webkit-scrollbar-thumb{background:#4b5563;background-clip:content-box}",
  map: '{"version":3,"file":"EditarEntregaDrawerPresenter.svelte","sources":["EditarEntregaDrawerPresenter.svelte"],"sourcesContent":["<!--\\n  Editar Entrega Drawer Presenter - Componente \\"Burro\\"\\n  \\n  Presenter para edição de entrega existente:\\n  - Reutiliza lógica similar ao NovaEntregaDrawerPresenter\\n  - Pré-popula campos com dados da entrega\\n  - Mantém layout idêntico\\n-->\\n\\n<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport { Button, Input, Select, Label } from \\"flowbite-svelte\\";\\nimport Icon from \\"$lib/components/common/Icon.svelte\\";\\nimport DrawerHeader from \\"$lib/components/common/DrawerHeader.svelte\\";\\nexport let episDisponiveis = [];\\nexport let entrega = null;\\nexport let loading = false;\\nexport let show = false;\\nconst dispatch = createEventDispatcher();\\nlet responsavelEntrega = \\"\\";\\nlet itensSelecionados = [];\\nlet errors = {};\\n$: if (show && entrega) {\\n  populateForm();\\n}\\nfunction populateForm() {\\n  if (!entrega) return;\\n  responsavelEntrega = \\"Respons\\\\xE1vel da Entrega\\";\\n  itensSelecionados = [\\n    {\\n      episDisponivelId: \\"1\\",\\n      // Encontrar correspondência com episDisponiveis\\n      nomeEquipamento: \\"Capacete de Seguran\\\\xE7a\\",\\n      registroCA: \\"31469\\",\\n      quantidade: 1\\n    }\\n  ];\\n  errors = {};\\n}\\nfunction resetForm() {\\n  responsavelEntrega = \\"\\";\\n  itensSelecionados = [];\\n  errors = {};\\n}\\nfunction adicionarItem() {\\n  itensSelecionados = [...itensSelecionados, {\\n    episDisponivelId: \\"\\",\\n    nomeEquipamento: \\"\\",\\n    registroCA: \\"\\",\\n    quantidade: 1\\n  }];\\n}\\nfunction removerItem(index) {\\n  itensSelecionados = itensSelecionados.filter((_, i) => i !== index);\\n}\\nfunction atualizarEPI(index, episDisponivelId) {\\n  const epiSelecionado = episDisponiveis.find((epi) => epi.id === episDisponivelId);\\n  if (epiSelecionado) {\\n    itensSelecionados[index] = {\\n      ...itensSelecionados[index],\\n      episDisponivelId,\\n      nomeEquipamento: epiSelecionado.nomeEquipamento,\\n      registroCA: epiSelecionado.registroCA\\n    };\\n    delete errors[`item-${index}`];\\n    errors = { ...errors };\\n  }\\n}\\nfunction atualizarQuantidade(index, quantidade) {\\n  itensSelecionados[index] = {\\n    ...itensSelecionados[index],\\n    quantidade\\n  };\\n  delete errors[`quantidade-${index}`];\\n  errors = { ...errors };\\n}\\nfunction validateForm() {\\n  const newErrors = {};\\n  if (!responsavelEntrega.trim()) {\\n    newErrors.responsavel = \\"Respons\\\\xE1vel \\\\xE9 obrigat\\\\xF3rio\\";\\n  }\\n  if (itensSelecionados.length === 0) {\\n    newErrors.items = \\"Adicione pelo menos um item\\";\\n  }\\n  itensSelecionados.forEach((item, index) => {\\n    if (!item.episDisponivelId) {\\n      newErrors[`item-${index}`] = \\"Selecione um EPI\\";\\n    }\\n    if (item.quantidade < 1) {\\n      newErrors[`quantidade-${index}`] = \\"Quantidade deve ser maior que 0\\";\\n    }\\n  });\\n  errors = newErrors;\\n  return Object.keys(newErrors).length === 0;\\n}\\nfunction handleSalvar() {\\n  if (!validateForm()) {\\n    return;\\n  }\\n  const formData = {\\n    responsavel: responsavelEntrega.trim(),\\n    itens: itensSelecionados.map((item) => ({\\n      episDisponivelId: item.episDisponivelId,\\n      nomeEquipamento: item.nomeEquipamento,\\n      registroCA: item.registroCA,\\n      quantidade: item.quantidade\\n    }))\\n  };\\n  dispatch(\\"salvar\\", formData);\\n}\\nfunction handleCancelar() {\\n  dispatch(\\"cancelar\\");\\n}\\n$: episOptions = [\\n  { value: \\"\\", label: \\"Selecione um EPI...\\" },\\n  ...episDisponiveis.filter((epi) => epi.disponivel).map((epi) => ({\\n    value: epi.id,\\n    label: `${epi.nomeEquipamento} (CA ${epi.registroCA})${epi.quantidade ? ` - ${epi.quantidade} dispon\\\\xEDveis` : \\"\\"}`\\n  }))\\n];\\n$: canSave = responsavelEntrega.trim() && itensSelecionados.length > 0 && !loading;\\n<\/script>\\n\\n{#if show}\\n  <!-- Overlay -->\\n  <div class=\\"fixed inset-0 bg-black bg-opacity-50 z-55 transition-opacity\\"></div>\\n\\n  <!-- Drawer -->\\n  <div class=\\"fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-60 transform transition-transform duration-300 ease-in-out\\">\\n    \\n    <!-- Header -->\\n    <DrawerHeader \\n      title=\\"Editar Entrega #{entrega?.id || \'\'}\\" \\n      on:close={handleCancelar}\\n    />\\n\\n    <!-- Content -->\\n    <div class=\\"flex flex-col h-full\\">\\n      <div class=\\"flex-1 overflow-y-auto custom-scrollbar p-6\\">\\n        \\n        <!-- Info da Entrega Original -->\\n        {#if entrega}\\n          <div class=\\"mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800\\">\\n            <h4 class=\\"text-sm font-medium text-blue-900 dark:text-blue-100 mb-2\\">\\n              Informações da Entrega Original\\n            </h4>\\n            <div class=\\"text-sm text-blue-800 dark:text-blue-200\\">\\n              <p>• Data: {new Date(entrega.dataEntrega).toLocaleDateString(\'pt-BR\')}</p>\\n              <p>• Status: {entrega.status === \'assinado\' ? \'Assinado\' : \'Pendente Assinatura\'}</p>\\n              <p>• ID: #{entrega.id}</p>\\n            </div>\\n          </div>\\n        {/if}\\n        \\n        <!-- Responsável -->\\n        <div class=\\"mb-6\\">\\n          <Label for=\\"responsavel\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n            Responsável pela Entrega *\\n          </Label>\\n          <Input\\n            id=\\"responsavel\\"\\n            type=\\"text\\"\\n            placeholder=\\"Nome do responsável pela entrega\\"\\n            bind:value={responsavelEntrega}\\n            class=\\"rounded-sm {errors.responsavel ? \'border-red-500\' : \'\'}\\"\\n            disabled={loading}\\n          />\\n          {#if errors.responsavel}\\n            <p class=\\"mt-1 text-sm text-red-600 dark:text-red-400\\">\\n              {errors.responsavel}\\n            </p>\\n          {/if}\\n        </div>\\n\\n        <!-- EPIs para Entrega -->\\n        <div class=\\"mb-6\\">\\n          <div class=\\"flex items-center justify-between mb-4\\">\\n            <Label class=\\"text-sm font-medium text-gray-700 dark:text-gray-300\\">\\n              EPIs da Entrega *\\n            </Label>\\n            <Button\\n              size=\\"xs\\"\\n              color=\\"alternative\\"\\n              class=\\"rounded-sm\\"\\n              on:click={adicionarItem}\\n              disabled={loading}\\n            >\\n              <Icon name=\\"PlusOutline\\" className=\\"mr-2\\" size=\\"w-4 h-4\\" />\\n              Adicionar Item\\n            </Button>\\n          </div>\\n\\n          {#if errors.items}\\n            <p class=\\"mb-3 text-sm text-red-600 dark:text-red-400\\">\\n              {errors.items}\\n            </p>\\n          {/if}\\n\\n          <div class=\\"space-y-4\\">\\n            {#each itensSelecionados as item, index}\\n              <div class=\\"border border-gray-200 dark:border-gray-700 rounded-lg p-4\\">\\n                <div class=\\"flex items-start justify-between mb-4\\">\\n                  <h4 class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                    Item {index + 1}\\n                  </h4>\\n                  {#if itensSelecionados.length > 1}\\n                    <button\\n                      class=\\"text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300\\"\\n                      on:click={() => removerItem(index)}\\n                      disabled={loading}\\n                      title=\\"Remover item\\"\\n                    >\\n                      <Icon name=\\"TrashBinOutline\\" size=\\"w-4 h-4\\" />\\n                    </button>\\n                  {/if}\\n                </div>\\n\\n                <div class=\\"grid grid-cols-1 md:grid-cols-3 gap-4\\">\\n                  <!-- EPI Selection -->\\n                  <div class=\\"md:col-span-2\\">\\n                    <Label for=\\"epi-{index}\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n                      Equipamento\\n                    </Label>\\n                    <Select\\n                      id=\\"epi-{index}\\"\\n                      items={episOptions}\\n                      bind:value={item.episDisponivelId}\\n                      on:change={(e) => atualizarEPI(index, e.target.value)}\\n                      class=\\"rounded-sm {errors[`item-${index}`] ? \'border-red-500\' : \'\'}\\"\\n                      disabled={loading}\\n                    />\\n                    {#if errors[`item-${index}`]}\\n                      <p class=\\"mt-1 text-sm text-red-600 dark:text-red-400\\">\\n                        {errors[`item-${index}`]}\\n                      </p>\\n                    {/if}\\n                  </div>\\n\\n                  <!-- Quantidade -->\\n                  <div>\\n                    <Label for=\\"quantidade-{index}\\" class=\\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n                      Quantidade\\n                    </Label>\\n                    <Input\\n                      id=\\"quantidade-{index}\\"\\n                      type=\\"number\\"\\n                      min=\\"1\\"\\n                      max=\\"100\\"\\n                      bind:value={item.quantidade}\\n                      on:input={(e) => atualizarQuantidade(index, parseInt(e.target.value) || 1)}\\n                      class=\\"rounded-sm {errors[`quantidade-${index}`] ? \'border-red-500\' : \'\'}\\"\\n                      disabled={loading}\\n                    />\\n                    {#if errors[`quantidade-${index}`]}\\n                      <p class=\\"mt-1 text-sm text-red-600 dark:text-red-400\\">\\n                        {errors[`quantidade-${index}`]}\\n                      </p>\\n                    {/if}\\n                  </div>\\n                </div>\\n\\n                <!-- Preview do EPI selecionado -->\\n                {#if item.nomeEquipamento}\\n                  <div class=\\"mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-sm\\">\\n                    <div class=\\"flex items-center justify-between\\">\\n                      <div>\\n                        <p class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                          {item.nomeEquipamento}\\n                        </p>\\n                        <p class=\\"text-xs text-gray-500 dark:text-gray-400\\">\\n                          CA {item.registroCA}\\n                        </p>\\n                      </div>\\n                      <div class=\\"text-right\\">\\n                        <p class=\\"text-sm font-medium text-gray-900 dark:text-white\\">\\n                          Qtd: {item.quantidade}\\n                        </p>\\n                      </div>\\n                    </div>\\n                  </div>\\n                {/if}\\n              </div>\\n            {/each}\\n\\n            <!-- Add first item button if no items -->\\n            {#if itensSelecionados.length === 0}\\n              <div class=\\"border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center\\">\\n                <Icon name=\\"PlusOutline\\" className=\\"mx-auto mb-3 text-gray-400\\" size=\\"w-8 h-8\\" />\\n                <p class=\\"text-sm text-gray-500 dark:text-gray-400 mb-4\\">\\n                  Nenhum item na entrega\\n                </p>\\n                <Button\\n                  size=\\"sm\\"\\n                  color=\\"alternative\\"\\n                  class=\\"rounded-sm\\"\\n                  on:click={adicionarItem}\\n                  disabled={loading}\\n                >\\n                  Adicionar Primeiro Item\\n                </Button>\\n              </div>\\n            {/if}\\n          </div>\\n        </div>\\n\\n        <!-- Summary -->\\n        {#if itensSelecionados.length > 0}\\n          <div class=\\"mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800\\">\\n            <h4 class=\\"text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-2\\">\\n              Resumo das Alterações\\n            </h4>\\n            <div class=\\"text-sm text-yellow-800 dark:text-yellow-200\\">\\n              <p>• Total de itens: {itensSelecionados.length}</p>\\n              <p>• Quantidade total: {itensSelecionados.reduce((sum, item) => sum + item.quantidade, 0)} unidades</p>\\n              <p>• Responsável: {responsavelEntrega || \'Não informado\'}</p>\\n            </div>\\n          </div>\\n        {/if}\\n\\n      </div>\\n\\n      <!-- Footer Actions -->\\n      <div class=\\"flex-shrink-0 bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700\\">\\n        <div class=\\"flex items-center justify-end space-x-3\\">\\n          <Button\\n            color=\\"alternative\\"\\n            class=\\"rounded-sm\\"\\n            on:click={handleCancelar}\\n            disabled={loading}\\n          >\\n            Cancelar\\n          </Button>\\n          <Button\\n            color=\\"primary\\"\\n            class=\\"rounded-sm\\"\\n            on:click={handleSalvar}\\n            disabled={!canSave}\\n          >\\n            {#if loading}\\n              <Icon name=\\"SpinnerOutline\\" className=\\"mr-2 animate-spin\\" size=\\"w-4 h-4\\" />\\n              Salvando...\\n            {:else}\\n              <Icon name=\\"CheckOutline\\" className=\\"mr-2\\" size=\\"w-4 h-4\\" />\\n              Salvar Alterações\\n            {/if}\\n          </Button>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>\\n  /* Scrollbar customization */\\n  .custom-scrollbar::-webkit-scrollbar {\\n    width: 8px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-track {\\n    background: transparent;\\n    border-radius: 8px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background: #e5e7eb;\\n    border-radius: 8px;\\n    border: 2px solid transparent;\\n    background-clip: content-box;\\n  }\\n  \\n  :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background: #4b5563;\\n    background-clip: content-box;\\n  }\\n</style>"],"names":[],"mappings":"AAiWE,+BAAiB,mBAAoB,CACnC,KAAK,CAAE,GACT,CAEA,+BAAiB,yBAA0B,CACzC,UAAU,CAAE,WAAW,CACvB,aAAa,CAAE,GACjB,CAEA,+BAAiB,yBAA0B,CACzC,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WAAW,CAC7B,eAAe,CAAE,WACnB,CAEQ,KAAM,CAAC,+BAAiB,yBAA0B,CACxD,UAAU,CAAE,OAAO,CACnB,eAAe,CAAE,WACnB"}'
};
const EditarEntregaDrawerPresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let episOptions;
  let canSave;
  let { episDisponiveis = [] } = $$props;
  let { entrega = null } = $$props;
  let { loading = false } = $$props;
  let { show = false } = $$props;
  createEventDispatcher();
  let responsavelEntrega = "";
  let itensSelecionados = [];
  let errors = {};
  function populateForm() {
    if (!entrega) return;
    responsavelEntrega = "Responsável da Entrega";
    itensSelecionados = [
      {
        episDisponivelId: "1",
        // Encontrar correspondência com episDisponiveis
        nomeEquipamento: "Capacete de Segurança",
        registroCA: "31469",
        quantidade: 1
      }
    ];
    errors = {};
  }
  if ($$props.episDisponiveis === void 0 && $$bindings.episDisponiveis && episDisponiveis !== void 0) $$bindings.episDisponiveis(episDisponiveis);
  if ($$props.entrega === void 0 && $$bindings.entrega && entrega !== void 0) $$bindings.entrega(entrega);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (show && entrega) {
        populateForm();
      }
    }
    episOptions = [
      { value: "", label: "Selecione um EPI..." },
      ...episDisponiveis.filter((epi) => epi.disponivel).map((epi) => ({
        value: epi.id,
        label: `${epi.nomeEquipamento} (CA ${epi.registroCA})${epi.quantidade ? ` - ${epi.quantidade} disponíveis` : ""}`
      }))
    ];
    canSave = responsavelEntrega.trim() && itensSelecionados.length > 0 && !loading;
    $$rendered = `  ${show ? ` <div class="fixed inset-0 bg-black bg-opacity-50 z-55 transition-opacity"></div>  <div class="fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-60 transform transition-transform duration-300 ease-in-out"> ${validate_component(DrawerHeader, "DrawerHeader").$$render(
      $$result,
      {
        title: "Editar Entrega #" + (entrega?.id || "")
      },
      {},
      {}
    )}  <div class="flex flex-col h-full"><div class="flex-1 overflow-y-auto custom-scrollbar p-6 svelte-ng7f9w"> ${entrega ? `<div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"><h4 class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2" data-svelte-h="svelte-1p8cqi4">Informações da Entrega Original</h4> <div class="text-sm text-blue-800 dark:text-blue-200"><p>• Data: ${escape(new Date(entrega.dataEntrega).toLocaleDateString("pt-BR"))}</p> <p>• Status: ${escape(entrega.status === "assinado" ? "Assinado" : "Pendente Assinatura")}</p> <p>• ID: #${escape(entrega.id)}</p></div></div>` : ``}  <div class="mb-6">${validate_component(Label, "Label").$$render(
      $$result,
      {
        for: "responsavel",
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      },
      {},
      {
        default: () => {
          return `Responsável pela Entrega *`;
        }
      }
    )} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "responsavel",
        type: "text",
        placeholder: "Nome do responsável pela entrega",
        class: "rounded-sm " + (errors.responsavel ? "border-red-500" : ""),
        disabled: loading,
        value: responsavelEntrega
      },
      {
        value: ($$value) => {
          responsavelEntrega = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${errors.responsavel ? `<p class="mt-1 text-sm text-red-600 dark:text-red-400">${escape(errors.responsavel)}</p>` : ``}</div>  <div class="mb-6"><div class="flex items-center justify-between mb-4">${validate_component(Label, "Label").$$render(
      $$result,
      {
        class: "text-sm font-medium text-gray-700 dark:text-gray-300"
      },
      {},
      {
        default: () => {
          return `EPIs da Entrega *`;
        }
      }
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "xs",
        color: "alternative",
        class: "rounded-sm",
        disabled: loading
      },
      {},
      {
        default: () => {
          return `${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              name: "PlusOutline",
              className: "mr-2",
              size: "w-4 h-4"
            },
            {},
            {}
          )}
              Adicionar Item`;
        }
      }
    )}</div> ${errors.items ? `<p class="mb-3 text-sm text-red-600 dark:text-red-400">${escape(errors.items)}</p>` : ``} <div class="space-y-4">${each(itensSelecionados, (item, index) => {
      return `<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"><div class="flex items-start justify-between mb-4"><h4 class="text-sm font-medium text-gray-900 dark:text-white">Item ${escape(index + 1)}</h4> ${itensSelecionados.length > 1 ? `<button class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" ${loading ? "disabled" : ""} title="Remover item">${validate_component(Icon, "Icon").$$render($$result, { name: "TrashBinOutline", size: "w-4 h-4" }, {}, {})} </button>` : ``}</div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <div class="md:col-span-2">${validate_component(Label, "Label").$$render(
        $$result,
        {
          for: "epi-" + index,
          class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        },
        {},
        {
          default: () => {
            return `Equipamento
                    `;
          }
        }
      )} ${validate_component(Select, "Select").$$render(
        $$result,
        {
          id: "epi-" + index,
          items: episOptions,
          class: "rounded-sm " + (errors[`item-${index}`] ? "border-red-500" : ""),
          disabled: loading,
          value: item.episDisponivelId
        },
        {
          value: ($$value) => {
            item.episDisponivelId = $$value;
            $$settled = false;
          }
        },
        {}
      )} ${errors[`item-${index}`] ? `<p class="mt-1 text-sm text-red-600 dark:text-red-400">${escape(errors[`item-${index}`])} </p>` : ``}</div>  <div>${validate_component(Label, "Label").$$render(
        $$result,
        {
          for: "quantidade-" + index,
          class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        },
        {},
        {
          default: () => {
            return `Quantidade
                    `;
          }
        }
      )} ${validate_component(Input, "Input").$$render(
        $$result,
        {
          id: "quantidade-" + index,
          type: "number",
          min: "1",
          max: "100",
          class: "rounded-sm " + (errors[`quantidade-${index}`] ? "border-red-500" : ""),
          disabled: loading,
          value: item.quantidade
        },
        {
          value: ($$value) => {
            item.quantidade = $$value;
            $$settled = false;
          }
        },
        {}
      )} ${errors[`quantidade-${index}`] ? `<p class="mt-1 text-sm text-red-600 dark:text-red-400">${escape(errors[`quantidade-${index}`])} </p>` : ``} </div></div>  ${item.nomeEquipamento ? `<div class="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-sm"><div class="flex items-center justify-between"><div><p class="text-sm font-medium text-gray-900 dark:text-white">${escape(item.nomeEquipamento)}</p> <p class="text-xs text-gray-500 dark:text-gray-400">CA ${escape(item.registroCA)} </p></div> <div class="text-right"><p class="text-sm font-medium text-gray-900 dark:text-white">Qtd: ${escape(item.quantidade)}</p> </div></div> </div>` : ``} </div>`;
    })}  ${itensSelecionados.length === 0 ? `<div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        name: "PlusOutline",
        className: "mx-auto mb-3 text-gray-400",
        size: "w-8 h-8"
      },
      {},
      {}
    )} <p class="text-sm text-gray-500 dark:text-gray-400 mb-4" data-svelte-h="svelte-iymvfb">Nenhum item na entrega</p> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "sm",
        color: "alternative",
        class: "rounded-sm",
        disabled: loading
      },
      {},
      {
        default: () => {
          return `Adicionar Primeiro Item`;
        }
      }
    )}</div>` : ``}</div></div>  ${itensSelecionados.length > 0 ? `<div class="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"><h4 class="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-2" data-svelte-h="svelte-sxfnj2">Resumo das Alterações</h4> <div class="text-sm text-yellow-800 dark:text-yellow-200"><p>• Total de itens: ${escape(itensSelecionados.length)}</p> <p>• Quantidade total: ${escape(itensSelecionados.reduce((sum, item) => sum + item.quantidade, 0))} unidades</p> <p>• Responsável: ${escape(responsavelEntrega || "Não informado")}</p></div></div>` : ``}</div>  <div class="flex-shrink-0 bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700"><div class="flex items-center justify-end space-x-3">${validate_component(Button, "Button").$$render(
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
        disabled: !canSave
      },
      {},
      {
        default: () => {
          return `${loading ? `${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              name: "SpinnerOutline",
              className: "mr-2 animate-spin",
              size: "w-4 h-4"
            },
            {},
            {}
          )}
              Salvando...` : `${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              name: "CheckOutline",
              className: "mr-2",
              size: "w-4 h-4"
            },
            {},
            {}
          )}
              Salvar Alterações`}`;
        }
      }
    )}</div></div></div></div>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const DevolucaoModalPresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canConfirm;
  let isVencido;
  let diasVencimento;
  let { equipamento = null } = $$props;
  let { loading = false } = $$props;
  let { show = false } = $$props;
  createEventDispatcher();
  let motivo = "";
  let devolucaoTotal = true;
  let quantidadeDevolucao = 1;
  let errors = {};
  function resetForm() {
    motivo = "";
    devolucaoTotal = true;
    quantidadeDevolucao = equipamento?.quantidade || 1;
    errors = {};
  }
  if ($$props.equipamento === void 0 && $$bindings.equipamento && equipamento !== void 0) $$bindings.equipamento(equipamento);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (show && equipamento) {
        resetForm();
      }
    }
    canConfirm = motivo.trim() && !loading;
    isVencido = equipamento?.vencido || false;
    diasVencimento = equipamento?.diasVencido || 0;
    $$rendered = `  ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "md",
        autoclose: false,
        class: "z-60",
        open: show
      },
      {
        open: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="p-6"> <div class="flex items-center justify-between mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white" data-svelte-h="svelte-az2hzw">Devolver Equipamento</h3> <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" ${loading ? "disabled" : ""}>${validate_component(Icon, "Icon").$$render($$result, { name: "CloseOutline", size: "w-5 h-5" }, {}, {})}</button></div> ${equipamento ? ` <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"><div class="flex items-start justify-between mb-3"><div><h4 class="font-medium text-gray-900 dark:text-white">${escape(equipamento.nomeEquipamento)}</h4> <p class="text-sm text-gray-500 dark:text-gray-400">CA ${escape(equipamento.registroCA)} • Entrega #${escape(equipamento.entregaId)}</p></div> <div class="text-right"><p class="text-sm font-medium text-gray-900 dark:text-white">Qtd: ${escape(equipamento.quantidade)}</p></div></div>  <div class="pt-3 border-t border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between"><div><p class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-13u3t5e">Prazo de Devolução</p> <p class="text-sm text-gray-900 dark:text-white">${escape(formatarData(equipamento.prazoMaximoDevolucao))}</p></div> <div class="text-right">${isVencido ? `<div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              name: "ExclamationTriangleOutline",
              className: "mr-1",
              size: "w-3 h-3"
            },
            {},
            {}
          )}
                  Vencido há ${escape(diasVencimento)} dias</div>` : `<div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              name: "CheckCircleOutline",
              className: "mr-1",
              size: "w-3 h-3"
            },
            {},
            {}
          )}
                  No prazo</div>`}</div></div></div></div>  <div class="mb-6">${validate_component(Label, "Label").$$render(
            $$result,
            {
              class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
            },
            {},
            {
              default: () => {
                return `Tipo de Devolução`;
              }
            }
          )} <div class="space-y-3"> <div class="flex items-center">${validate_component(Checkbox, "Checkbox").$$render(
            $$result,
            {
              id: "devolucao-total",
              class: "rounded-sm",
              checked: devolucaoTotal
            },
            {
              checked: ($$value) => {
                devolucaoTotal = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "devolucao-total",
              class: "ml-3 text-sm text-gray-900 dark:text-white"
            },
            {},
            {
              default: () => {
                return `Devolução total (${escape(equipamento.quantidade)} ${escape(equipamento.quantidade === 1 ? "unidade" : "unidades")})`;
              }
            }
          )}</div>  ${equipamento.quantidade > 1 ? `<div class="flex items-center">${validate_component(Checkbox, "Checkbox").$$render(
            $$result,
            {
              checked: !devolucaoTotal,
              id: "devolucao-parcial",
              class: "rounded-sm"
            },
            {},
            {}
          )} ${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "devolucao-parcial",
              class: "ml-3 text-sm text-gray-900 dark:text-white"
            },
            {},
            {
              default: () => {
                return `Devolução parcial`;
              }
            }
          )}</div>  ${!devolucaoTotal ? `<div class="ml-6 mt-2">${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "quantidade-devolucao",
              class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            },
            {},
            {
              default: () => {
                return `Quantidade a devolver`;
              }
            }
          )} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "quantidade-devolucao",
              type: "number",
              min: "1",
              max: equipamento.quantidade,
              class: "w-32 rounded-sm " + (errors.quantidade ? "border-red-500" : ""),
              disabled: loading,
              value: quantidadeDevolucao
            },
            {
              value: ($$value) => {
                quantidadeDevolucao = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${errors.quantidade ? `<p class="mt-1 text-sm text-red-600 dark:text-red-400">${escape(errors.quantidade)}</p>` : ``}</div>` : ``}` : ``}</div></div>  <div class="mb-6">${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "motivo",
              class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            },
            {},
            {
              default: () => {
                return `Motivo da Devolução *`;
              }
            }
          )} ${validate_component(Textarea, "Textarea").$$render(
            $$result,
            {
              id: "motivo",
              placeholder: "Descreva o motivo da devolução...",
              rows: 3,
              class: "rounded-sm " + (errors.motivo ? "border-red-500" : ""),
              disabled: loading,
              value: motivo
            },
            {
              value: ($$value) => {
                motivo = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${errors.motivo ? `<p class="mt-1 text-sm text-red-600 dark:text-red-400">${escape(errors.motivo)}</p>` : ``}</div>  ${isVencido ? `<div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"><div class="flex items-start">${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              name: "ExclamationTriangleOutline",
              className: "text-red-600 dark:text-red-400 mt-0.5 mr-3",
              size: "w-5 h-5"
            },
            {},
            {}
          )} <div><h4 class="text-sm font-medium text-red-800 dark:text-red-200" data-svelte-h="svelte-1l5do2t">Equipamento com prazo vencido</h4> <p class="text-sm text-red-700 dark:text-red-300 mt-1">Este equipamento está ${escape(diasVencimento)} dias em atraso para devolução.</p></div></div></div>` : ``}  <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"><h4 class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2" data-svelte-h="svelte-2ckhis">Resumo da Devolução</h4> <div class="text-sm text-blue-800 dark:text-blue-200"><p>• Equipamento: ${escape(equipamento.nomeEquipamento)} (CA ${escape(equipamento.registroCA)})</p> <p>• Quantidade: ${escape(devolucaoTotal ? equipamento.quantidade : quantidadeDevolucao)} ${escape(devolucaoTotal || quantidadeDevolucao === 1 ? "unidade" : "unidades")}</p> <p>• Tipo: ${escape(devolucaoTotal ? "Devolução total" : "Devolução parcial")}</p> ${motivo.trim() ? `<p>• Motivo: ${escape(motivo.trim())}</p>` : ``}</div></div>` : ``}  <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">${validate_component(Button, "Button").$$render(
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
              disabled: !canConfirm
            },
            {},
            {
              default: () => {
                return `${loading ? `${validate_component(Icon, "Icon").$$render(
                  $$result,
                  {
                    name: "SpinnerOutline",
                    className: "mr-2 animate-spin",
                    size: "w-4 h-4"
                  },
                  {},
                  {}
                )}
          Processando...` : `${validate_component(Icon, "Icon").$$render(
                  $$result,
                  {
                    name: "CheckOutline",
                    className: "mr-2",
                    size: "w-4 h-4"
                  },
                  {},
                  {}
                )}
          Confirmar Devolução`}`;
              }
            }
          )}</div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const AssinaturaModalPresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canConfirm;
  let { entrega = null } = $$props;
  let { loading = false } = $$props;
  let { show = false } = $$props;
  createEventDispatcher();
  let observacoes = "";
  let assinaturaConfirmada = false;
  function resetForm() {
    observacoes = "";
    assinaturaConfirmada = false;
  }
  if ($$props.entrega === void 0 && $$bindings.entrega && entrega !== void 0) $$bindings.entrega(entrega);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (show) {
        resetForm();
      }
    }
    canConfirm = !loading && !assinaturaConfirmada;
    $$rendered = `  ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "lg",
        autoclose: false,
        class: "z-60",
        open: show
      },
      {
        open: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="p-6"> <div class="flex items-center justify-between mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white" data-svelte-h="svelte-1iz89hx">Confirmar Assinatura Digital</h3> <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" ${loading ? "disabled" : ""}>${validate_component(Icon, "Icon").$$render($$result, { name: "CloseOutline", size: "w-5 h-5" }, {}, {})}</button></div> ${entrega ? ` <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><p class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-15muixn">Entrega</p> <p class="text-sm text-gray-900 dark:text-white font-semibold">#${escape(entrega.id)}</p></div> <div><p class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-1nce9zk">Data da Entrega</p> <p class="text-sm text-gray-900 dark:text-white font-semibold">${escape(formatarData(entrega.dataEntrega))}</p></div></div></div>  <div class="mb-6" data-svelte-h="svelte-udbm6m"><h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">EPIs a serem confirmados:</h4> <div class="space-y-2"> <div class="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-sm border border-gray-200 dark:border-gray-600"><div class="flex flex-col"><span class="text-sm text-gray-900 dark:text-white font-medium">Capacete de Segurança</span> <span class="text-xs text-gray-500 dark:text-gray-400">CA 31469</span></div> <div class="text-right"><span class="text-sm font-medium text-gray-900 dark:text-white">Qtd: 1</span></div></div></div></div>  <div class="mb-6">${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "observacoes",
              class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            },
            {},
            {
              default: () => {
                return `Observações (opcional)`;
              }
            }
          )} ${validate_component(Textarea, "Textarea").$$render(
            $$result,
            {
              id: "observacoes",
              placeholder: "Adicione observações sobre a entrega...",
              rows: 3,
              class: "rounded-sm",
              disabled: loading,
              value: observacoes
            },
            {
              value: ($$value) => {
                observacoes = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div>  <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"><div class="flex items-start">${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              name: "ShieldCheckOutline",
              className: "text-blue-600 dark:text-blue-400 mt-0.5 mr-3",
              size: "w-5 h-5"
            },
            {},
            {}
          )} <div data-svelte-h="svelte-1xj7jh7"><h4 class="text-sm font-medium text-blue-900 dark:text-blue-100">Assinatura Digital Segura</h4> <p class="text-sm text-blue-800 dark:text-blue-200 mt-1">Sua assinatura será registrada de forma segura e vinculada a esta entrega. 
              Este processo confirma o recebimento dos EPIs listados acima.</p></div></div></div>  ${assinaturaConfirmada ? `<div class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"><div class="flex items-center">${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              name: "CheckCircleOutline",
              className: "text-green-600 dark:text-green-400 mr-3",
              size: "w-5 h-5"
            },
            {},
            {}
          )} <div data-svelte-h="svelte-9s52he"><h4 class="text-sm font-medium text-green-900 dark:text-green-100">Assinatura Confirmada</h4> <p class="text-sm text-green-800 dark:text-green-200">Processando assinatura digital...</p></div></div></div>` : ``}  <div class="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"><div class="flex items-start">${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              name: "ExclamationTriangleOutline",
              className: "text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3",
              size: "w-5 h-5"
            },
            {},
            {}
          )} <div data-svelte-h="svelte-eonq7k"><h4 class="text-sm font-medium text-yellow-900 dark:text-yellow-100">Importante</h4> <p class="text-sm text-yellow-800 dark:text-yellow-200 mt-1">Ao assinar, você confirma o recebimento dos EPIs e se compromete a:</p> <ul class="text-sm text-yellow-800 dark:text-yellow-200 mt-2 ml-4 list-disc"><li>Usar os equipamentos conforme as instruções</li> <li>Manter os EPIs em bom estado de conservação</li> <li>Devolver quando solicitado ou no fim do período</li> <li>Comunicar imediatamente qualquer dano ou perda</li></ul></div></div></div>` : ``}  <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">${validate_component(Button, "Button").$$render(
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
              disabled: !canConfirm
            },
            {},
            {
              default: () => {
                return `${loading ? `${validate_component(Icon, "Icon").$$render(
                  $$result,
                  {
                    name: "SpinnerOutline",
                    className: "mr-2 animate-spin",
                    size: "w-4 h-4"
                  },
                  {},
                  {}
                )}
          Processando Assinatura...` : `${assinaturaConfirmada ? `${validate_component(Icon, "Icon").$$render(
                  $$result,
                  {
                    name: "CheckOutline",
                    className: "mr-2",
                    size: "w-4 h-4"
                  },
                  {},
                  {}
                )}
          Assinatura Confirmada` : `${validate_component(Icon, "Icon").$$render(
                  $$result,
                  {
                    name: "PenOutline",
                    className: "mr-2",
                    size: "w-4 h-4"
                  },
                  {},
                  {}
                )}
          Assinar Digitalmente`}`}`;
              }
            }
          )}</div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const css = {
  code: ".custom-scrollbar.svelte-1mqz8gy::-webkit-scrollbar{width:8px}.custom-scrollbar.svelte-1mqz8gy::-webkit-scrollbar-track{background:transparent;border-radius:8px}.custom-scrollbar.svelte-1mqz8gy::-webkit-scrollbar-thumb{background:#e5e7eb;border-radius:8px;border:2px solid transparent;background-clip:content-box}.dark .custom-scrollbar.svelte-1mqz8gy::-webkit-scrollbar-thumb{background:#4b5563;background-clip:content-box}.custom-scrollbar.svelte-1mqz8gy::-webkit-scrollbar-thumb:hover{background:#d1d5db;background-clip:content-box}.dark .custom-scrollbar.svelte-1mqz8gy::-webkit-scrollbar-thumb:hover{background:#6b7280;background-clip:content-box}.custom-scrollbar.svelte-1mqz8gy{scrollbar-width:thin;scrollbar-color:#e5e7eb transparent}.dark .custom-scrollbar.svelte-1mqz8gy{scrollbar-color:#4b5563 transparent}.z-45{z-index:45}.z-55{z-index:55}.z-60{z-index:60}",
  map: `{"version":3,"file":"FichaDetailPresenter.svelte","sources":["FichaDetailPresenter.svelte"],"sourcesContent":["<!--\\n  Ficha Detail Presenter - Componente \\"Burro\\" com Layout Original\\n  \\n  Este presenter é puramente apresentacional:\\n  - Recebe dados via props\\n  - Renderiza UI IDÊNTICA ao original\\n  - Emite eventos para o Container\\n  - Não contém lógica de negócio\\n-->\\n\\n<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport { Button, Badge, Tabs, TabItem, Avatar } from \\"flowbite-svelte\\";\\nimport Icon from \\"$lib/components/common/Icon.svelte\\";\\nimport DrawerHeader from \\"$lib/components/common/DrawerHeader.svelte\\";\\nimport StatusDot from \\"$lib/components/common/StatusDot.svelte\\";\\nimport StatusIndicator from \\"$lib/components/common/StatusIndicator.svelte\\";\\nimport LoadingSpinner from \\"$lib/components/common/LoadingSpinner.svelte\\";\\nimport ErrorDisplay from \\"$lib/components/common/ErrorDisplay.svelte\\";\\nimport NovaEntregaDrawerPresenter from \\"./NovaEntregaDrawerPresenter.svelte\\";\\nimport EditarEntregaDrawerPresenter from \\"./EditarEntregaDrawerPresenter.svelte\\";\\nimport DevolucaoModalPresenter from \\"./DevolucaoModalPresenter.svelte\\";\\nimport AssinaturaModalPresenter from \\"./AssinaturaModalPresenter.svelte\\";\\nimport { formatarData, getCorVencimento, getStatusVencimento } from \\"$lib/utils/dateHelpers\\";\\nexport let fichaData = null;\\nexport let episDisponiveis = [];\\nexport let loading = false;\\nexport let error = null;\\nexport let entregaLoading = false;\\nexport let assinaturaLoading = false;\\nexport let devolucaoLoading = false;\\nexport let showNovaEntregaDrawer = false;\\nexport let showEditarEntregaDrawer = false;\\nexport let showDevolucaoModal = false;\\nexport let showAssinaturaModal = false;\\nexport let entregaEdicao = null;\\nexport let equipamentoDevolucao = null;\\nexport let entregaAssinatura = null;\\nexport let open = false;\\nconst dispatch = createEventDispatcher();\\nfunction handleClose() {\\n  dispatch(\\"close\\");\\n}\\nfunction handleNovaEntrega() {\\n  dispatch(\\"novaEntrega\\");\\n}\\nfunction handleEditarEntrega(entrega) {\\n  dispatch(\\"editarEntrega\\", { entrega });\\n}\\nfunction handleAssinarEntrega(entrega) {\\n  dispatch(\\"assinarEntrega\\", { entrega });\\n}\\nfunction handleDevolverEquipamento(equipamento) {\\n  dispatch(\\"devolverEquipamento\\", { equipamento });\\n}\\nfunction handleImprimirEntrega(entrega) {\\n  dispatch(\\"imprimirEntrega\\", { entrega });\\n}\\nfunction handleCancelarEntrega(entrega) {\\n  dispatch(\\"cancelarEntrega\\", { entrega, motivo: \\"Cancelamento solicitado\\" });\\n}\\nfunction getStatusFichaInfo(status) {\\n  switch (status) {\\n    case \\"ativa\\":\\n      return { color: \\"green\\", label: \\"Ativa\\" };\\n    case \\"vencida\\":\\n      return { color: \\"red\\", label: \\"Vencida\\" };\\n    case \\"suspensa\\":\\n      return { color: \\"yellow\\", label: \\"Suspensa\\" };\\n    default:\\n      return { color: \\"gray\\", label: \\"Indefinida\\" };\\n  }\\n}\\nfunction getStatusEntregaInfo(status) {\\n  switch (status) {\\n    case \\"assinado\\":\\n      return { color: \\"green\\", label: \\"Assinado\\" };\\n    case \\"nao_assinado\\":\\n      return { color: \\"yellow\\", label: \\"Pendente Assinatura\\" };\\n    case \\"cancelado\\":\\n      return { color: \\"red\\", label: \\"Cancelado\\" };\\n    default:\\n      return { color: \\"gray\\", label: \\"Indefinido\\" };\\n  }\\n}\\nfunction getInitials(nome) {\\n  return nome.split(\\" \\").map((n) => n[0]).join(\\"\\").toUpperCase().slice(0, 2);\\n}\\n<\/script>\\n\\n<!-- Layout IDÊNTICO ao original -->\\n{#if open}\\n  <!-- Backdrop -->\\n  <div \\n    class=\\"fixed bg-black bg-opacity-50 z-40 transition-opacity\\"\\n    style=\\"top: 4rem; left: 0; right: 0; bottom: 0;\\"\\n    on:click={handleClose}\\n    on:keydown={(e) => e.key === 'Escape' && handleClose()}\\n    role=\\"button\\"\\n    tabindex=\\"0\\"\\n  ></div>\\n\\n  <!-- Drawer -->\\n  <div \\n    class=\\"fixed top-16 right-0 bg-white dark:bg-gray-800 shadow-xl z-45 transform transition-transform duration-300 ease-in-out flex flex-col\\"\\n    class:translate-x-0={open}\\n    class:translate-x-full={!open}\\n    style=\\"width: min(880px, 95vw); height: calc(100vh - 4rem);\\"\\n  >\\n    \\n    <!-- Header usando componente reutilizável EXATAMENTE como o original -->\\n    <DrawerHeader\\n      objectType=\\"FICHA EPI\\"\\n      title={fichaData?.colaborador?.nome || 'Carregando colaborador...'}\\n      iconName=\\"ClipboardListOutline\\"\\n      status={fichaData?.ficha?.status || ''}\\n      statusType=\\"ficha\\"\\n      additionalInfo={[\\n        fichaData?.colaborador?.cpf ? \`CPF \${fichaData.colaborador.cpf}\` : '',\\n        fichaData?.colaborador?.cargo || ''\\n      ].filter(Boolean)}\\n      primaryAction={{\\n        text: 'Nova entrega',\\n        icon: 'PlusOutline'\\n      }}\\n      on:close={handleClose}\\n      on:primaryAction={handleNovaEntrega}\\n    />\\n\\n    <!-- Content -->\\n    <div class=\\"flex-1 overflow-y-auto custom-scrollbar\\">\\n      {#if loading}\\n        <div class=\\"flex items-center justify-center py-16\\">\\n          <LoadingSpinner />\\n        </div>\\n      {:else if error}\\n        <div class=\\"p-8 text-center\\">\\n          <Icon name=\\"ExclamationTriangleOutline\\" className=\\"text-red-500 mx-auto mb-4\\" size=\\"w-16 h-16\\" />\\n          <p class=\\"text-red-600 dark:text-red-400 text-lg mb-4\\">{error}</p>\\n          <Button size=\\"sm\\" color=\\"primary\\" class=\\"rounded-sm mt-4\\" on:click={() => window.location.reload()}>\\n            Tentar Novamente\\n          </Button>\\n        </div>\\n      {:else if fichaData}\\n        <!-- Tabs Content EXATAMENTE como o original -->\\n        <div class=\\"px-4 py-4\\">\\n          <Tabs \\n            tabStyle=\\"underline\\" \\n            contentClass=\\"p-0 mt-4\\"\\n          >\\n            <!-- Tab: Equipamentos (EXATAMENTE como o original) -->\\n            <TabItem \\n              open \\n              title=\\"Equipamentos\\"\\n            >\\n              <div class=\\"mt-6 border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden\\">\\n                {#if fichaData.equipamentosEmPosse.length > 0}\\n                  {#each fichaData.equipamentosEmPosse as equipamento}\\n                    <div class=\\"bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0\\">\\n                      <div class=\\"flex items-center justify-between mb-4\\">\\n                        <div class=\\"flex items-center space-x-4\\">\\n                          <!-- Quantity box instead of icon (EXATAMENTE como o original) -->\\n                          <div class=\\"w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-sm flex items-center justify-center\\">\\n                            <span class=\\"text-lg font-bold text-primary-600 dark:text-primary-400\\">\\n                              {equipamento.quantidade}\\n                            </span>\\n                          </div>\\n                          <div>\\n                            <p class=\\"font-semibold text-gray-900 dark:text-white text-base\\">\\n                              {equipamento.nomeEquipamento}\\n                            </p>\\n                            <p class=\\"text-sm text-gray-500 dark:text-gray-400\\">\\n                              CA {equipamento.registroCA}\\n                            </p>\\n                          </div>\\n                        </div>\\n                        <div class=\\"flex items-center space-x-3\\">\\n                          <Button\\n                            size=\\"sm\\"\\n                            color=\\"alternative\\"\\n                            class=\\"rounded-sm border border-gray-300 dark:border-gray-600\\"\\n                            on:click={() => handleDevolverEquipamento(equipamento)}\\n                          >\\n                            Devolver\\n                          </Button>\\n                        </div>\\n                      </div>\\n                      \\n                      <!-- Grid de 3 colunas EXATAMENTE como o original -->\\n                      <div class=\\"grid grid-cols-3 gap-4\\">\\n                        <div class=\\"flex flex-col\\">\\n                          <span class=\\"text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide\\">Entrega</span>\\n                          <button \\n                            class=\\"text-sm text-primary-600 dark:text-primary-400 font-semibold mt-1 hover:underline text-left\\"\\n                            on:click={() => {\\n                              console.log('Abrir drawer da entrega:', equipamento.entregaId);\\n                            }}\\n                          >\\n                            #{equipamento.entregaId}\\n                          </button>\\n                        </div>\\n                        <div class=\\"flex flex-col\\">\\n                          <span class=\\"text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide\\">Prazo Devolução</span>\\n                          <span class=\\"text-sm text-gray-900 dark:text-white font-semibold mt-1\\">\\n                            {formatarData(equipamento.prazoMaximoDevolucao)}\\n                            {#if equipamento.vencido}\\n                              <span class=\\"text-red-600\\"> - {equipamento.diasVencido} dias atrasado</span>\\n                            {/if}\\n                          </span>\\n                        </div>\\n                        <div class=\\"flex flex-col\\">\\n                          <span class=\\"text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide\\">Status</span>\\n                          <span class=\\"text-sm font-semibold mt-1 {equipamento.vencido ? 'text-red-600' : 'text-green-600'}\\">\\n                            {#if equipamento.vencido}\\n                              Em atraso\\n                            {:else}\\n                              No prazo\\n                            {/if}\\n                          </span>\\n                        </div>\\n                      </div>\\n                    </div>\\n                  {/each}\\n                {:else}\\n                  <div class=\\"text-center py-12\\">\\n                    <div class=\\"p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4\\">\\n                      <Icon name=\\"ShieldCheckOutline\\" className=\\"text-gray-400\\" size=\\"w-8 h-8\\" />\\n                    </div>\\n                    <h3 class=\\"text-lg font-semibold text-gray-900 dark:text-white mb-2\\">\\n                      Nenhum equipamento em posse\\n                    </h3>\\n                    <p class=\\"text-gray-500 dark:text-gray-400\\">\\n                      Este colaborador não possui EPIs em sua posse no momento.\\n                    </p>\\n                  </div>\\n                {/if}\\n              </div>\\n            </TabItem>\\n\\n            <!-- Tab: Devoluções (EXATAMENTE como o original) -->\\n            <TabItem \\n              title=\\"Devoluções\\"\\n            >\\n              <div class=\\"mt-6 border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden\\">\\n                {#if fichaData.devolucoes.length > 0}\\n                  {#each fichaData.devolucoes as devolucao}\\n                    <div class=\\"bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0\\">\\n                      <div class=\\"flex items-center justify-between mb-4\\">\\n                        <div class=\\"flex items-center space-x-4\\">\\n                          <!-- Quantity box verde para devoluções (EXATAMENTE como o original) -->\\n                          <div class=\\"w-10 h-10 bg-green-100 dark:bg-green-900 rounded-sm flex items-center justify-center\\">\\n                            <span class=\\"text-lg font-bold text-green-600 dark:text-green-400\\">\\n                              {devolucao.quantidade}\\n                            </span>\\n                          </div>\\n                          <div>\\n                            <p class=\\"font-semibold text-gray-900 dark:text-white text-base\\">\\n                              {devolucao.nomeEquipamento}\\n                            </p>\\n                            <p class=\\"text-sm text-gray-500 dark:text-gray-400\\">\\n                              CA {devolucao.registroCA}\\n                            </p>\\n                          </div>\\n                        </div>\\n                        <div class=\\"flex items-center space-x-3\\">\\n                          <Button\\n                            size=\\"sm\\"\\n                            color=\\"alternative\\"\\n                            class=\\"rounded-sm border border-gray-300 dark:border-gray-600\\"\\n                            on:click={() => {\\n                              console.log('Cancelar devolução:', devolucao);\\n                            }}\\n                          >\\n                            Cancelar\\n                          </Button>\\n                        </div>\\n                      </div>\\n                      \\n                      <!-- Grid de 3 colunas para devoluções -->\\n                      <div class=\\"grid grid-cols-3 gap-4\\">\\n                        <div class=\\"flex flex-col\\">\\n                          <span class=\\"text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide\\">Entrega</span>\\n                          <button \\n                            class=\\"text-sm text-primary-600 dark:text-primary-400 font-semibold mt-1 hover:underline text-left\\"\\n                            on:click={() => {\\n                              console.log('Abrir drawer da entrega');\\n                            }}\\n                          >\\n                            #E{Math.random().toString(36).substr(2, 3).toUpperCase()}\\n                          </button>\\n                        </div>\\n                        <div class=\\"flex flex-col\\">\\n                          <span class=\\"text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide\\">Prazo Original</span>\\n                          <span class=\\"text-sm text-gray-900 dark:text-white font-semibold mt-1\\">\\n                            {formatarData(devolucao.prazoOriginal)}\\n                            {#if !devolucao.noPrazo}\\n                              <span class=\\"text-red-600\\"> - {devolucao.diasAtraso} dias atrasado</span>\\n                            {/if}\\n                          </span>\\n                        </div>\\n                        <div class=\\"flex flex-col\\">\\n                          <span class=\\"text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide\\">Data da devolução</span>\\n                          <span class=\\"text-sm text-gray-900 dark:text-white font-semibold mt-1\\">\\n                            {formatarData(devolucao.dataDevolucao)}\\n                          </span>\\n                        </div>\\n                      </div>\\n                    </div>\\n                  {/each}\\n                {:else}\\n                  <div class=\\"text-center py-12\\">\\n                    <div class=\\"p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4\\">\\n                      <Icon name=\\"ArrowUturnLeftOutline\\" className=\\"text-gray-400\\" size=\\"w-8 h-8\\" />\\n                    </div>\\n                    <h3 class=\\"text-lg font-semibold text-gray-900 dark:text-white mb-2\\">\\n                      Nenhuma devolução encontrada\\n                    </h3>\\n                    <p class=\\"text-gray-500 dark:text-gray-400\\">\\n                      Este colaborador não possui devoluções registradas.\\n                    </p>\\n                  </div>\\n                {/if}\\n              </div>\\n            </TabItem>\\n\\n            <!-- Tab: Entregas (EXATAMENTE como o original) -->\\n            <TabItem \\n              title=\\"Entregas\\"\\n            >\\n              <div class=\\"space-y-4 mt-6\\">\\n                {#if fichaData.entregas.length > 0}\\n                  {#each fichaData.entregas as entrega}\\n                    {@const statusInfo = getStatusEntregaInfo(entrega.status)}\\n                    \\n                    <div class=\\"bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm p-6 shadow-sm\\">\\n                      <div class=\\"flex items-center justify-between mb-4\\">\\n                        <div class=\\"flex items-center space-x-4\\">\\n                          <div class=\\"p-3 bg-primary-100 dark:bg-primary-900 rounded-sm\\">\\n                            <Icon name=\\"TruckOutline\\" className=\\"text-primary-600 dark:text-primary-400\\" size=\\"w-5 h-5\\" />\\n                          </div>\\n                          <div>\\n                            <p class=\\"font-semibold text-gray-900 dark:text-white text-base\\">\\n                              Entrega {entrega.id}\\n                            </p>\\n                            <p class=\\"text-sm text-gray-500 dark:text-gray-400\\">\\n                              {formatarData(entrega.dataEntrega)} • Responsável da Entrega\\n                            </p>\\n                          </div>\\n                        </div>\\n                        <div class=\\"flex items-center space-x-3\\">\\n                          <Badge color={statusInfo.color} class=\\"w-fit rounded-sm\\">\\n                            {statusInfo.label}\\n                          </Badge>\\n                          \\n                          <!-- Botões de ação EXATAMENTE como o original -->\\n                          <div class=\\"flex items-center space-x-2\\">\\n                            {#if entrega.status === 'nao_assinado'}\\n                              <Button\\n                                size=\\"sm\\"\\n                                color=\\"primary\\"\\n                                class=\\"rounded-sm\\"\\n                                on:click={() => handleAssinarEntrega(entrega)}\\n                                disabled={assinaturaLoading}\\n                              >\\n                                Assinar\\n                              </Button>\\n                            {/if}\\n                            \\n                            <Button\\n                              size=\\"sm\\"\\n                              color=\\"alternative\\"\\n                              class=\\"rounded-sm border border-gray-300 dark:border-gray-600\\"\\n                              on:click={() => handleImprimirEntrega(entrega)}\\n                            >\\n                              <Icon name=\\"PrinterOutline\\" className=\\"mr-2\\" size=\\"w-4 h-4\\" />\\n                              Imprimir\\n                            </Button>\\n\\n                            <Button\\n                              size=\\"sm\\"\\n                              color=\\"alternative\\"\\n                              class=\\"rounded-sm border border-gray-300 dark:border-gray-600\\"\\n                              on:click={() => handleEditarEntrega(entrega)}\\n                            >\\n                              <Icon name=\\"EditOutline\\" className=\\"mr-2\\" size=\\"w-4 h-4\\" />\\n                              Editar\\n                            </Button>\\n                          </div>\\n                        </div>\\n                      </div>\\n                      \\n                      <!-- Grid de informações EXATAMENTE como o original -->\\n                      <div class=\\"grid grid-cols-2 gap-4 mb-4\\">\\n                        <div class=\\"flex flex-col\\">\\n                          <span class=\\"text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide\\">Responsável</span>\\n                          <span class=\\"text-sm text-gray-900 dark:text-white font-semibold mt-1\\">\\n                            Responsável da Entrega\\n                          </span>\\n                        </div>\\n                        <div class=\\"flex flex-col\\">\\n                          <span class=\\"text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide\\">Itens</span>\\n                          <span class=\\"text-sm text-gray-900 dark:text-white font-semibold mt-1\\">\\n                            1 item<!-- Mockado - em produção viria dos itens -->\\n                          </span>\\n                        </div>\\n                        {#if entrega.status === 'assinado' && entrega.dataAssinatura}\\n                          <div class=\\"flex flex-col\\">\\n                            <span class=\\"text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide\\">Data Assinatura</span>\\n                            <span class=\\"text-sm text-gray-900 dark:text-white font-semibold mt-1\\">\\n                              {formatarData(entrega.dataAssinatura)}\\n                            </span>\\n                          </div>\\n                        {/if}\\n                      </div>\\n\\n                      <!-- Lista de itens mockada EXATAMENTE como o original -->\\n                      <div class=\\"mt-4 pt-4 border-t border-gray-200 dark:border-gray-700\\">\\n                        <p class=\\"text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3\\">\\n                          EPIs Entregues:\\n                        </p>\\n                        <div class=\\"space-y-2\\">\\n                          <div class=\\"flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-sm\\">\\n                            <div class=\\"flex flex-col\\">\\n                              <span class=\\"text-sm text-gray-900 dark:text-white font-medium\\">\\n                                Capacete de Segurança\\n                              </span>\\n                              <span class=\\"text-xs text-gray-500 dark:text-gray-400\\">\\n                                CA 31469\\n                              </span>\\n                            </div>\\n                            <Badge color=\\"gray\\" class=\\"w-fit rounded-md text-xs\\">\\n                              Qtd: 1\\n                            </Badge>\\n                          </div>\\n                        </div>\\n                      </div>\\n                    </div>\\n                  {/each}\\n                {:else}\\n                  <div class=\\"text-center py-12\\">\\n                    <div class=\\"p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4\\">\\n                      <Icon name=\\"TruckOutline\\" className=\\"text-gray-400\\" size=\\"w-8 h-8\\" />\\n                    </div>\\n                    <h3 class=\\"text-lg font-semibold text-gray-900 dark:text-white mb-2\\">\\n                      Nenhuma entrega encontrada\\n                    </h3>\\n                    <p class=\\"text-gray-500 dark:text-gray-400\\">\\n                      Esta ficha ainda não possui entregas registradas.\\n                    </p>\\n                  </div>\\n                {/if}\\n              </div>\\n            </TabItem>\\n\\n          </Tabs>\\n        </div>\\n      {:else}\\n        <!-- Estado vazio -->\\n        <div class=\\"flex items-center justify-center h-full\\">\\n          <div class=\\"text-center\\">\\n            <div class=\\"p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4\\">\\n              <Icon name=\\"DocumentOutline\\" className=\\"text-gray-400\\" size=\\"w-8 h-8\\" />\\n            </div>\\n            <h3 class=\\"text-lg font-semibold text-gray-900 dark:text-white mb-2\\">\\n              Nenhuma ficha selecionada\\n            </h3>\\n            <p class=\\"text-gray-500 dark:text-gray-400\\">\\n              Selecione uma ficha para ver os detalhes.\\n            </p>\\n          </div>\\n        </div>\\n      {/if}\\n    </div>\\n  </div>\\n\\n  <!-- Modals e Drawers Aninhados -->\\n  \\n  {#if showNovaEntregaDrawer}\\n    <NovaEntregaDrawerPresenter\\n      {episDisponiveis}\\n      loading={entregaLoading}\\n      show={showNovaEntregaDrawer}\\n      on:salvar={(e) => dispatch('salvarNovaEntrega', e.detail)}\\n      on:cancelar={() => dispatch('cancelarNovaEntrega')}\\n    />\\n  {/if}\\n\\n  {#if showEditarEntregaDrawer && entregaEdicao}\\n    <EditarEntregaDrawerPresenter\\n      {episDisponiveis}\\n      entrega={entregaEdicao}\\n      loading={entregaLoading}\\n      show={showEditarEntregaDrawer}\\n      on:salvar={(e) => dispatch('salvarEdicaoEntrega', e.detail)}\\n      on:cancelar={() => dispatch('cancelarEdicaoEntrega')}\\n    />\\n  {/if}\\n\\n  {#if showDevolucaoModal && equipamentoDevolucao}\\n    <DevolucaoModalPresenter\\n      equipamento={equipamentoDevolucao}\\n      loading={devolucaoLoading}\\n      show={showDevolucaoModal}\\n      on:confirmar={(e) => dispatch('confirmarDevolucao', e.detail)}\\n      on:cancelar={() => dispatch('cancelarDevolucao')}\\n    />\\n  {/if}\\n\\n  {#if showAssinaturaModal && entregaAssinatura}\\n    <AssinaturaModalPresenter\\n      entrega={entregaAssinatura}\\n      loading={assinaturaLoading}\\n      show={showAssinaturaModal}\\n      on:confirmar={(e) => dispatch('confirmarAssinatura', e.detail)}\\n      on:cancelar={() => dispatch('cancelarAssinatura')}\\n    />\\n  {/if}\\n\\n{/if}\\n\\n<style>\\n  /* Personalizar scrollbar para o drawer EXATAMENTE como o original */\\n  .custom-scrollbar::-webkit-scrollbar {\\n    width: 8px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-track {\\n    background: transparent;\\n    border-radius: 8px;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background: #e5e7eb;\\n    border-radius: 8px;\\n    border: 2px solid transparent;\\n    background-clip: content-box;\\n  }\\n  \\n  :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {\\n    background: #4b5563;\\n    background-clip: content-box;\\n  }\\n  \\n  .custom-scrollbar::-webkit-scrollbar-thumb:hover {\\n    background: #d1d5db;\\n    background-clip: content-box;\\n  }\\n  \\n  :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb:hover {\\n    background: #6b7280;\\n    background-clip: content-box;\\n  }\\n  \\n  /* Fallback para Firefox */\\n  .custom-scrollbar {\\n    scrollbar-width: thin;\\n    scrollbar-color: #e5e7eb transparent;\\n  }\\n  \\n  :global(.dark) .custom-scrollbar {\\n    scrollbar-color: #4b5563 transparent;\\n  }\\n\\n  /* Z-index personalizados para sobreposição de drawers */\\n  :global(.z-45) {\\n    z-index: 45;\\n  }\\n  \\n  :global(.z-55) {\\n    z-index: 55;\\n  }\\n  \\n  :global(.z-60) {\\n    z-index: 60;\\n  }\\n</style>"],"names":[],"mappings":"AAygBE,gCAAiB,mBAAoB,CACnC,KAAK,CAAE,GACT,CAEA,gCAAiB,yBAA0B,CACzC,UAAU,CAAE,WAAW,CACvB,aAAa,CAAE,GACjB,CAEA,gCAAiB,yBAA0B,CACzC,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WAAW,CAC7B,eAAe,CAAE,WACnB,CAEQ,KAAM,CAAC,gCAAiB,yBAA0B,CACxD,UAAU,CAAE,OAAO,CACnB,eAAe,CAAE,WACnB,CAEA,gCAAiB,yBAAyB,MAAO,CAC/C,UAAU,CAAE,OAAO,CACnB,eAAe,CAAE,WACnB,CAEQ,KAAM,CAAC,gCAAiB,yBAAyB,MAAO,CAC9D,UAAU,CAAE,OAAO,CACnB,eAAe,CAAE,WACnB,CAGA,gCAAkB,CAChB,eAAe,CAAE,IAAI,CACrB,eAAe,CAAE,OAAO,CAAC,WAC3B,CAEQ,KAAM,CAAC,gCAAkB,CAC/B,eAAe,CAAE,OAAO,CAAC,WAC3B,CAGQ,KAAO,CACb,OAAO,CAAE,EACX,CAEQ,KAAO,CACb,OAAO,CAAE,EACX,CAEQ,KAAO,CACb,OAAO,CAAE,EACX"}`
};
function getStatusEntregaInfo(status) {
  switch (status) {
    case "assinado":
      return { color: "green", label: "Assinado" };
    case "nao_assinado":
      return {
        color: "yellow",
        label: "Pendente Assinatura"
      };
    case "cancelado":
      return { color: "red", label: "Cancelado" };
    default:
      return { color: "gray", label: "Indefinido" };
  }
}
const FichaDetailPresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { fichaData = null } = $$props;
  let { episDisponiveis = [] } = $$props;
  let { loading = false } = $$props;
  let { error = null } = $$props;
  let { entregaLoading = false } = $$props;
  let { assinaturaLoading = false } = $$props;
  let { devolucaoLoading = false } = $$props;
  let { showNovaEntregaDrawer = false } = $$props;
  let { showEditarEntregaDrawer = false } = $$props;
  let { showDevolucaoModal = false } = $$props;
  let { showAssinaturaModal = false } = $$props;
  let { entregaEdicao = null } = $$props;
  let { equipamentoDevolucao = null } = $$props;
  let { entregaAssinatura = null } = $$props;
  let { open = false } = $$props;
  createEventDispatcher();
  if ($$props.fichaData === void 0 && $$bindings.fichaData && fichaData !== void 0) $$bindings.fichaData(fichaData);
  if ($$props.episDisponiveis === void 0 && $$bindings.episDisponiveis && episDisponiveis !== void 0) $$bindings.episDisponiveis(episDisponiveis);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  if ($$props.entregaLoading === void 0 && $$bindings.entregaLoading && entregaLoading !== void 0) $$bindings.entregaLoading(entregaLoading);
  if ($$props.assinaturaLoading === void 0 && $$bindings.assinaturaLoading && assinaturaLoading !== void 0) $$bindings.assinaturaLoading(assinaturaLoading);
  if ($$props.devolucaoLoading === void 0 && $$bindings.devolucaoLoading && devolucaoLoading !== void 0) $$bindings.devolucaoLoading(devolucaoLoading);
  if ($$props.showNovaEntregaDrawer === void 0 && $$bindings.showNovaEntregaDrawer && showNovaEntregaDrawer !== void 0) $$bindings.showNovaEntregaDrawer(showNovaEntregaDrawer);
  if ($$props.showEditarEntregaDrawer === void 0 && $$bindings.showEditarEntregaDrawer && showEditarEntregaDrawer !== void 0) $$bindings.showEditarEntregaDrawer(showEditarEntregaDrawer);
  if ($$props.showDevolucaoModal === void 0 && $$bindings.showDevolucaoModal && showDevolucaoModal !== void 0) $$bindings.showDevolucaoModal(showDevolucaoModal);
  if ($$props.showAssinaturaModal === void 0 && $$bindings.showAssinaturaModal && showAssinaturaModal !== void 0) $$bindings.showAssinaturaModal(showAssinaturaModal);
  if ($$props.entregaEdicao === void 0 && $$bindings.entregaEdicao && entregaEdicao !== void 0) $$bindings.entregaEdicao(entregaEdicao);
  if ($$props.equipamentoDevolucao === void 0 && $$bindings.equipamentoDevolucao && equipamentoDevolucao !== void 0) $$bindings.equipamentoDevolucao(equipamentoDevolucao);
  if ($$props.entregaAssinatura === void 0 && $$bindings.entregaAssinatura && entregaAssinatura !== void 0) $$bindings.entregaAssinatura(entregaAssinatura);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  $$result.css.add(css);
  return `   ${open ? ` <div class="fixed bg-black bg-opacity-50 z-40 transition-opacity" style="top: 4rem; left: 0; right: 0; bottom: 0;" role="button" tabindex="0"></div>  <div class="${[
    "fixed top-16 right-0 bg-white dark:bg-gray-800 shadow-xl z-45 transform transition-transform duration-300 ease-in-out flex flex-col",
    (open ? "translate-x-0" : "") + " " + (!open ? "translate-x-full" : "")
  ].join(" ").trim()}" style="width: min(880px, 95vw); height: calc(100vh - 4rem);"> ${validate_component(DrawerHeader, "DrawerHeader").$$render(
    $$result,
    {
      objectType: "FICHA EPI",
      title: fichaData?.colaborador?.nome || "Carregando colaborador...",
      iconName: "ClipboardListOutline",
      status: fichaData?.ficha?.status || "",
      statusType: "ficha",
      additionalInfo: [
        fichaData?.colaborador?.cpf ? `CPF ${fichaData.colaborador.cpf}` : "",
        fichaData?.colaborador?.cargo || ""
      ].filter(Boolean),
      primaryAction: {
        text: "Nova entrega",
        icon: "PlusOutline"
      }
    },
    {},
    {}
  )}  <div class="flex-1 overflow-y-auto custom-scrollbar svelte-1mqz8gy">${loading ? `<div class="flex items-center justify-center py-16">${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}</div>` : `${error ? `<div class="p-8 text-center">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      name: "ExclamationTriangleOutline",
      className: "text-red-500 mx-auto mb-4",
      size: "w-16 h-16"
    },
    {},
    {}
  )} <p class="text-red-600 dark:text-red-400 text-lg mb-4">${escape(error)}</p> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "primary",
      class: "rounded-sm mt-4"
    },
    {},
    {
      default: () => {
        return `Tentar Novamente`;
      }
    }
  )}</div>` : `${fichaData ? ` <div class="px-4 py-4">${validate_component(Tabs, "Tabs").$$render(
    $$result,
    {
      tabStyle: "underline",
      contentClass: "p-0 mt-4"
    },
    {},
    {
      default: () => {
        return ` ${validate_component(TabItem, "TabItem").$$render($$result, { open: true, title: "Equipamentos" }, {}, {
          default: () => {
            return `<div class="mt-6 border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden">${fichaData.equipamentosEmPosse.length > 0 ? `${each(fichaData.equipamentosEmPosse, (equipamento) => {
              return `<div class="bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"> <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-sm flex items-center justify-center"><span class="text-lg font-bold text-primary-600 dark:text-primary-400">${escape(equipamento.quantidade)} </span></div> <div><p class="font-semibold text-gray-900 dark:text-white text-base">${escape(equipamento.nomeEquipamento)}</p> <p class="text-sm text-gray-500 dark:text-gray-400">CA ${escape(equipamento.registroCA)}</p> </div></div> <div class="flex items-center space-x-3">${validate_component(Button, "Button").$$render(
                $$result,
                {
                  size: "sm",
                  color: "alternative",
                  class: "rounded-sm border border-gray-300 dark:border-gray-600"
                },
                {},
                {
                  default: () => {
                    return `Devolver
                          `;
                  }
                }
              )} </div></div>  <div class="grid grid-cols-3 gap-4"><div class="flex flex-col"><span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-1bkkvwr">Entrega</span> <button class="text-sm text-primary-600 dark:text-primary-400 font-semibold mt-1 hover:underline text-left">#${escape(equipamento.entregaId)} </button></div> <div class="flex flex-col"><span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-16fo64b">Prazo Devolução</span> <span class="text-sm text-gray-900 dark:text-white font-semibold mt-1">${escape(formatarData(equipamento.prazoMaximoDevolucao))} ${equipamento.vencido ? `<span class="text-red-600">- ${escape(equipamento.diasVencido)} dias atrasado</span>` : ``} </span></div> <div class="flex flex-col"><span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-1m0tcpl">Status</span> <span class="${"text-sm font-semibold mt-1 " + escape(equipamento.vencido ? "text-red-600" : "text-green-600", true)}">${equipamento.vencido ? `Em atraso` : `No prazo`}</span> </div></div> </div>`;
            })}` : `<div class="text-center py-12"><div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4">${validate_component(Icon, "Icon").$$render(
              $$result,
              {
                name: "ShieldCheckOutline",
                className: "text-gray-400",
                size: "w-8 h-8"
              },
              {},
              {}
            )}</div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-rfo04i">Nenhum equipamento em posse</h3> <p class="text-gray-500 dark:text-gray-400" data-svelte-h="svelte-1guugvm">Este colaborador não possui EPIs em sua posse no momento.</p></div>`}</div>`;
          }
        })}  ${validate_component(TabItem, "TabItem").$$render($$result, { title: "Devoluções" }, {}, {
          default: () => {
            return `<div class="mt-6 border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden">${fichaData.devolucoes.length > 0 ? `${each(fichaData.devolucoes, (devolucao) => {
              return `<div class="bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"> <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-sm flex items-center justify-center"><span class="text-lg font-bold text-green-600 dark:text-green-400">${escape(devolucao.quantidade)} </span></div> <div><p class="font-semibold text-gray-900 dark:text-white text-base">${escape(devolucao.nomeEquipamento)}</p> <p class="text-sm text-gray-500 dark:text-gray-400">CA ${escape(devolucao.registroCA)}</p> </div></div> <div class="flex items-center space-x-3">${validate_component(Button, "Button").$$render(
                $$result,
                {
                  size: "sm",
                  color: "alternative",
                  class: "rounded-sm border border-gray-300 dark:border-gray-600"
                },
                {},
                {
                  default: () => {
                    return `Cancelar
                          `;
                  }
                }
              )} </div></div>  <div class="grid grid-cols-3 gap-4"><div class="flex flex-col"><span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-1bkkvwr">Entrega</span> <button class="text-sm text-primary-600 dark:text-primary-400 font-semibold mt-1 hover:underline text-left">#E${escape(Math.random().toString(36).substr(2, 3).toUpperCase())} </button></div> <div class="flex flex-col"><span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-k3q2nw">Prazo Original</span> <span class="text-sm text-gray-900 dark:text-white font-semibold mt-1">${escape(formatarData(devolucao.prazoOriginal))} ${!devolucao.noPrazo ? `<span class="text-red-600">- ${escape(devolucao.diasAtraso)} dias atrasado</span>` : ``} </span></div> <div class="flex flex-col"><span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-b9twru">Data da devolução</span> <span class="text-sm text-gray-900 dark:text-white font-semibold mt-1">${escape(formatarData(devolucao.dataDevolucao))}</span> </div></div> </div>`;
            })}` : `<div class="text-center py-12"><div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4">${validate_component(Icon, "Icon").$$render(
              $$result,
              {
                name: "ArrowUturnLeftOutline",
                className: "text-gray-400",
                size: "w-8 h-8"
              },
              {},
              {}
            )}</div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-rnqo4m">Nenhuma devolução encontrada</h3> <p class="text-gray-500 dark:text-gray-400" data-svelte-h="svelte-7hptym">Este colaborador não possui devoluções registradas.</p></div>`}</div>`;
          }
        })}  ${validate_component(TabItem, "TabItem").$$render($$result, { title: "Entregas" }, {}, {
          default: () => {
            return `<div class="space-y-4 mt-6">${fichaData.entregas.length > 0 ? `${each(fichaData.entregas, (entrega) => {
              let statusInfo = getStatusEntregaInfo(entrega.status);
              return ` <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm p-6 shadow-sm"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"><div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-sm">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  name: "TruckOutline",
                  className: "text-primary-600 dark:text-primary-400",
                  size: "w-5 h-5"
                },
                {},
                {}
              )}</div> <div><p class="font-semibold text-gray-900 dark:text-white text-base">Entrega ${escape(entrega.id)}</p> <p class="text-sm text-gray-500 dark:text-gray-400">${escape(formatarData(entrega.dataEntrega))} • Responsável da Entrega</p> </div></div> <div class="flex items-center space-x-3">${validate_component(Badge, "Badge").$$render(
                $$result,
                {
                  color: statusInfo.color,
                  class: "w-fit rounded-sm"
                },
                {},
                {
                  default: () => {
                    return `${escape(statusInfo.label)} `;
                  }
                }
              )}  <div class="flex items-center space-x-2">${entrega.status === "nao_assinado" ? `${validate_component(Button, "Button").$$render(
                $$result,
                {
                  size: "sm",
                  color: "primary",
                  class: "rounded-sm",
                  disabled: assinaturaLoading
                },
                {},
                {
                  default: () => {
                    return `Assinar
                              `;
                  }
                }
              )}` : ``} ${validate_component(Button, "Button").$$render(
                $$result,
                {
                  size: "sm",
                  color: "alternative",
                  class: "rounded-sm border border-gray-300 dark:border-gray-600"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(Icon, "Icon").$$render(
                      $$result,
                      {
                        name: "PrinterOutline",
                        className: "mr-2",
                        size: "w-4 h-4"
                      },
                      {},
                      {}
                    )}
                              Imprimir
                            `;
                  }
                }
              )} ${validate_component(Button, "Button").$$render(
                $$result,
                {
                  size: "sm",
                  color: "alternative",
                  class: "rounded-sm border border-gray-300 dark:border-gray-600"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(Icon, "Icon").$$render(
                      $$result,
                      {
                        name: "EditOutline",
                        className: "mr-2",
                        size: "w-4 h-4"
                      },
                      {},
                      {}
                    )}
                              Editar
                            `;
                  }
                }
              )}</div> </div></div>  <div class="grid grid-cols-2 gap-4 mb-4"><div class="flex flex-col" data-svelte-h="svelte-aj4nd7"><span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Responsável</span> <span class="text-sm text-gray-900 dark:text-white font-semibold mt-1">Responsável da Entrega
                          </span></div> <div class="flex flex-col" data-svelte-h="svelte-12aei6o"><span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Itens</span> <span class="text-sm text-gray-900 dark:text-white font-semibold mt-1">1 item </span></div> ${entrega.status === "assinado" && entrega.dataAssinatura ? `<div class="flex flex-col"><span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide" data-svelte-h="svelte-y249x4">Data Assinatura</span> <span class="text-sm text-gray-900 dark:text-white font-semibold mt-1">${escape(formatarData(entrega.dataAssinatura))}</span> </div>` : ``}</div>  <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"><p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3" data-svelte-h="svelte-3j99ra">EPIs Entregues:</p> <div class="space-y-2"><div class="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-sm"><div class="flex flex-col" data-svelte-h="svelte-171j8y6"><span class="text-sm text-gray-900 dark:text-white font-medium">Capacete de Segurança</span> <span class="text-xs text-gray-500 dark:text-gray-400">CA 31469
                              </span></div> ${validate_component(Badge, "Badge").$$render(
                $$result,
                {
                  color: "gray",
                  class: "w-fit rounded-md text-xs"
                },
                {},
                {
                  default: () => {
                    return `Qtd: 1
                            `;
                  }
                }
              )}</div> </div></div> </div>`;
            })}` : `<div class="text-center py-12"><div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4">${validate_component(Icon, "Icon").$$render(
              $$result,
              {
                name: "TruckOutline",
                className: "text-gray-400",
                size: "w-8 h-8"
              },
              {},
              {}
            )}</div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-13xuse8">Nenhuma entrega encontrada</h3> <p class="text-gray-500 dark:text-gray-400" data-svelte-h="svelte-1p30txm">Esta ficha ainda não possui entregas registradas.</p></div>`}</div>`;
          }
        })}`;
      }
    }
  )}</div>` : ` <div class="flex items-center justify-center h-full"><div class="text-center"><div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      name: "DocumentOutline",
      className: "text-gray-400",
      size: "w-8 h-8"
    },
    {},
    {}
  )}</div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-61ymzq">Nenhuma ficha selecionada</h3> <p class="text-gray-500 dark:text-gray-400" data-svelte-h="svelte-174czpu">Selecione uma ficha para ver os detalhes.</p></div></div>`}`}`}</div></div>  ${showNovaEntregaDrawer ? `${validate_component(NovaEntregaDrawerPresenter, "NovaEntregaDrawerPresenter").$$render(
    $$result,
    {
      episDisponiveis,
      loading: entregaLoading,
      show: showNovaEntregaDrawer
    },
    {},
    {}
  )}` : ``} ${showEditarEntregaDrawer && entregaEdicao ? `${validate_component(EditarEntregaDrawerPresenter, "EditarEntregaDrawerPresenter").$$render(
    $$result,
    {
      episDisponiveis,
      entrega: entregaEdicao,
      loading: entregaLoading,
      show: showEditarEntregaDrawer
    },
    {},
    {}
  )}` : ``} ${showDevolucaoModal && equipamentoDevolucao ? `${validate_component(DevolucaoModalPresenter, "DevolucaoModalPresenter").$$render(
    $$result,
    {
      equipamento: equipamentoDevolucao,
      loading: devolucaoLoading,
      show: showDevolucaoModal
    },
    {},
    {}
  )}` : ``} ${showAssinaturaModal && entregaAssinatura ? `${validate_component(AssinaturaModalPresenter, "AssinaturaModalPresenter").$$render(
    $$result,
    {
      entrega: entregaAssinatura,
      loading: assinaturaLoading,
      show: showAssinaturaModal
    },
    {},
    {}
  )}` : ``}` : ``}`;
});
const FichaDetailContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let containerState;
  let { open = false } = $$props;
  let { fichaId = null } = $$props;
  createEventDispatcher();
  let fichaData = null;
  let episDisponiveis = [];
  let loading = true;
  let error = null;
  let showNovaEntregaDrawer = false;
  let showEditarEntregaDrawer = false;
  let showDevolucaoModal = false;
  let showAssinaturaModal = false;
  let entregaLoading = false;
  let assinaturaLoading = false;
  let devolucaoLoading = false;
  let entregaEdicao = null;
  let equipamentoDevolucao = null;
  let entregaAssinatura = null;
  let lastFichaId = null;
  async function loadFichaData() {
    if (!fichaId) return;
    loading = true;
    error = null;
    lastFichaId = fichaId;
    try {
      console.log("📋 Carregando dados da ficha:", fichaId);
      fichaData = await fichaProcessAdapter.getFichaDetailData(fichaId);
      console.log("✅ Dados da ficha carregados:", fichaData);
    } catch (err) {
      console.error("❌ Erro ao carregar ficha:", err);
      error = err instanceof Error ? err.message : "Erro desconhecido";
      notify.error("Erro ao carregar ficha", "Não foi possível carregar os dados da ficha");
    } finally {
      loading = false;
    }
  }
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.fichaId === void 0 && $$bindings.fichaId && fichaId !== void 0) $$bindings.fichaId(fichaId);
  {
    if (open && fichaId && fichaId !== lastFichaId) {
      loadFichaData();
    }
  }
  containerState = {
    // Dados principais
    fichaData,
    episDisponiveis,
    // Estados de loading
    loading,
    error,
    entregaLoading,
    assinaturaLoading,
    devolucaoLoading,
    // Estados dos modals/drawers
    showNovaEntregaDrawer,
    showEditarEntregaDrawer,
    showDevolucaoModal,
    showAssinaturaModal,
    // Dados de contexto para modals
    entregaEdicao,
    equipamentoDevolucao,
    entregaAssinatura,
    // Controle de abertura
    open
  };
  return `   ${open ? `${validate_component(FichaDetailPresenter, "FichaDetailPresenter").$$render($$result, Object.assign({}, containerState), {}, {})}` : ``}`;
});
function temDevolucaoPendente(ficha) {
  const dataValidade = new Date(ficha.dataValidade);
  const hoje = /* @__PURE__ */ new Date();
  const fichaVencida = dataValidade < hoje;
  return fichaVencida && ficha.itens.length > 0;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredFichas;
  let hasActiveFilters;
  let fichas = [];
  let searchTerm = "";
  let cargoFilter = "todos";
  let empresaFilter = "todas";
  let devolucaoPendente = false;
  let cargoOptions = [
    { value: "todos", label: "Todos os Cargos" },
    {
      value: "engenheiro",
      label: "Engenheiro Civil"
    },
    {
      value: "tecnico",
      label: "Técnico em Segurança"
    },
    {
      value: "operador",
      label: "Operador de Máquinas"
    }
  ];
  let empresaOptions = [
    {
      value: "todas",
      label: "Todas as Empresas"
    },
    {
      value: "techcorp",
      label: "TechCorp Engenharia"
    },
    {
      value: "buildmax",
      label: "BuildMax Construções"
    },
    {
      value: "safework",
      label: "SafeWork Solutions"
    }
  ];
  let showFichaDrawer = false;
  let selectedFichaId = null;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    filteredFichas = fichas.filter((ficha) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = ficha.colaborador.nome.toLowerCase().includes(searchLower);
        const cpfMatch = ficha.colaborador.cpf.includes(searchTerm);
        if (!nameMatch && !cpfMatch) return false;
      }
      if (devolucaoPendente) {
        const dataValidade = new Date(ficha.dataValidade);
        const hoje = /* @__PURE__ */ new Date();
        const fichaVencida = dataValidade < hoje;
        if (!(fichaVencida && ficha.itens.length > 0)) return false;
      }
      return true;
    });
    hasActiveFilters = searchTerm !== "" || cargoFilter !== "todos" || empresaFilter !== "todas" || devolucaoPendente;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-i8h1dw_START -->${$$result.title = `<title>Fichas EPI - DataLife EPI</title>`, ""}<!-- HEAD_svelte-i8h1dw_END -->`, ""} <div class="space-y-6"> <div class="flex items-center justify-between"><div data-svelte-h="svelte-aownfx"><h1 class="text-xl font-medium text-gray-900 dark:text-white">Fichas EPI</h1> <p class="text-sm text-gray-600 dark:text-gray-400">Gerencie as fichas de equipamentos dos colaboradores</p></div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
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
        Nova Ficha`;
        }
      }
    )}</div></div>  ${`${`${filteredFichas.length > 0 ? ` <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"> <div class="p-4 border-b border-gray-200 dark:border-gray-700"><div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"> <div class="relative">${validate_component(SearchOutline, "SearchOutline").$$render(
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
        placeholder: "Buscar por nome ou CPF...",
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
    )}</div>  ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
      $$result,
      {
        options: cargoOptions,
        value: cargoFilter,
        placeholder: "Cargo"
      },
      {},
      {}
    )}  ${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
      $$result,
      {
        options: empresaOptions,
        value: empresaFilter,
        placeholder: "Empresa"
      },
      {},
      {}
    )}  <div class="flex items-center h-10">${validate_component(Checkbox, "Checkbox").$$render(
      $$result,
      {
        id: "devolucao-pendente-filter",
        class: "rounded-sm",
        checked: devolucaoPendente
      },
      {
        checked: ($$value) => {
          devolucaoPendente = $$value;
          $$settled = false;
        }
      },
      {}
    )} <label for="devolucao-pendente-filter" class="ml-2 text-sm text-gray-900 dark:text-white" data-svelte-h="svelte-c6xj71">Devolução pendente</label></div>  ${hasActiveFilters ? `${validate_component(Button, "Button").$$render(
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
    )}` : `<div></div>`}</div></div>  <div class="min-w-[980px] overflow-x-auto">${validate_component(Table, "Table").$$render($$result, { hoverable: true }, {}, {
      default: () => {
        return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[200px]" }, {}, {
              default: () => {
                return `Colaborador`;
              }
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
              $$result,
              {
                class: "min-w-[120px] hidden lg:table-cell"
              },
              {},
              {
                default: () => {
                  return `Cargo`;
                }
              }
            )} ${validate_component(TableHeadCell, "TableHeadCell").$$render(
              $$result,
              {
                class: "min-w-[150px] hidden xl:table-cell"
              },
              {},
              {
                default: () => {
                  return `Empresa`;
                }
              }
            )} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
              default: () => {
                return `EPIs`;
              }
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "min-w-[120px]" }, {}, {
              default: () => {
                return `Ações`;
              }
            })}`;
          }
        })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
          default: () => {
            return `${each(filteredFichas, (ficha) => {
              let temPendencia = temDevolucaoPendente(ficha);
              return ` ${validate_component(TableBodyRow, "TableBodyRow").$$render(
                $$result,
                {
                  class: "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[200px]" }, {}, {
                      default: () => {
                        return `<div><p class="font-medium text-gray-900 dark:text-white truncate">${escape(ficha.colaborador.nome)}</p> <p class="text-sm text-gray-500 dark:text-gray-400">CPF: ${escape(ficha.colaborador.cpf)}</p>  <p class="text-xs text-gray-500 dark:text-gray-400 lg:hidden mt-1">${escape(ficha.colaborador.cargo)}</p>  <p class="text-xs text-gray-500 dark:text-gray-400 xl:hidden mt-1">${escape(ficha.colaborador.empresa)} </p></div> `;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render(
                      $$result,
                      {
                        class: "min-w-[120px] hidden lg:table-cell"
                      },
                      {},
                      {
                        default: () => {
                          return `<span class="text-sm text-gray-900 dark:text-white">${escape(ficha.colaborador.cargo)}</span> `;
                        }
                      }
                    )} ${validate_component(TableBodyCell, "TableBodyCell").$$render(
                      $$result,
                      {
                        class: "min-w-[150px] hidden xl:table-cell"
                      },
                      {},
                      {
                        default: () => {
                          return `<span class="text-sm text-gray-900 dark:text-white truncate">${escape(ficha.colaborador.empresa)}</span> `;
                        }
                      }
                    )} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[100px]" }, {}, {
                      default: () => {
                        return `<div class="space-y-1">${validate_component(Badge, "Badge").$$render($$result, { color: "blue", class: "w-fit rounded-sm" }, {}, {
                          default: () => {
                            return `${escape(ficha.itens.length)} item${escape(ficha.itens.length !== 1 ? "s" : "")} `;
                          }
                        })} ${temPendencia ? `${validate_component(Badge, "Badge").$$render(
                          $$result,
                          {
                            color: "red",
                            class: "w-fit rounded-sm text-xs block"
                          },
                          {},
                          {
                            default: () => {
                              return `Pendente
                      `;
                            }
                          }
                        )}` : ``}</div> `;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-[120px]" }, {}, {
                      default: () => {
                        return `<div class="flex space-x-2"><button class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Ver detalhes da ficha">${validate_component(EyeOutline, "EyeOutline").$$render(
                          $$result,
                          {
                            class: "w-5 h-5 text-gray-600 dark:text-gray-400"
                          },
                          {},
                          {}
                        )}</button> <button class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Exportar ficha">${validate_component(DownloadOutline, "DownloadOutline").$$render(
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
            })}`;
          }
        })}`;
      }
    })}</div></div>` : ` ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
      default: () => {
        return `<div class="text-center py-12"><div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4">${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-8 h-8 text-gray-400" }, {}, {})}</div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-1cyioj">Nenhuma ficha encontrada</h3> <p class="text-gray-500 dark:text-gray-400 mb-4">${escape(hasActiveFilters ? "Nenhuma ficha corresponde aos filtros aplicados." : "Você ainda não possui fichas EPI cadastradas.")}</p> ${hasActiveFilters ? `${validate_component(Button, "Button").$$render(
          $$result,
          {
            size: "sm",
            color: "alternative",
            class: "rounded-sm"
          },
          {},
          {
            default: () => {
              return `Limpar Filtros`;
            }
          }
        )}` : `${validate_component(Button, "Button").$$render(
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
            Criar Primeira Ficha`;
            }
          }
        )}`}</div>`;
      }
    })}`}`}`}</div>  ${validate_component(FichaDetailContainer, "FichaDetailContainer").$$render(
      $$result,
      {
        fichaId: selectedFichaId,
        open: showFichaDrawer
      },
      {
        open: ($$value) => {
          showFichaDrawer = $$value;
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
