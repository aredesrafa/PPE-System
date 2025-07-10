import { c as create_ssr_component, a as compute_rest_props, j as getContext, d as spread, g as add_attribute, h as escape, f as escape_attribute_value, e as escape_object, i as createEventDispatcher, v as validate_component, m as missing_component, l as each, k as subscribe, o as onDestroy } from "../../../chunks/ssr.js";
import { c as createUrlWithParams, b as api, a as Button, B as Badge } from "../../../chunks/Button.js";
import { L as LoadingSpinner, E as ErrorDisplay, R as RefreshOutline, T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, f as TrashBinOutline, S as Select, g as Label, h as createPaginatedStore } from "../../../chunks/ErrorDisplay.js";
import { I as Input } from "../../../chunks/modalStore.js";
import { C as Card } from "../../../chunks/Card.js";
import { C as CheckOutline } from "../../../chunks/CheckOutline.js";
import { twMerge } from "tailwind-merge";
import { S as SearchOutline, a as SearchableDropdown, E as EyeOutline, D as Drawer, b as DrawerHeader, T as Textarea } from "../../../chunks/DrawerHeader.js";
import { F as FileDocOutline } from "../../../chunks/FileDocOutline.js";
import { P as PenOutline } from "../../../chunks/PenOutline.js";
import { P as PlusOutline } from "../../../chunks/Icon.js";
import { C as Checkbox, R as Radio } from "../../../chunks/Checkbox.js";
import { f as formatarData } from "../../../chunks/dateHelpers.js";
import { A as Alert } from "../../../chunks/Alert.js";
import { E as ExclamationCircleOutline } from "../../../chunks/ExclamationCircleOutline.js";
const CloseOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "close outline" } = $$props;
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M6 18 17.94 6M18 18 6.06 6"></path></svg>` : `<svg${spread(
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
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="M6 18 17.94 6M18 18 6.06 6"></path></svg>`} `;
});
class NotasMovimentacaoAdapter {
  baseEndpoint = "/notas-movimentacao";
  // Cache removido - dados vêm diretamente do endpoint principal
  // ==================== CONSULTAS ====================
  /**
   * Lista notas usando endpoint principal
   * Dados vêm com todos os campos incluindo createdAt
   */
  async listarNotas(params = {}) {
    console.log(
      "📋 NotasMovimentacaoAdapter: Listando notas via endpoint principal",
      params
    );
    try {
      const url = createUrlWithParams(this.baseEndpoint, {
        page: params.page?.toString(),
        limit: params.limit?.toString(),
        dataInicio: params.dataInicio,
        dataFim: params.dataFim,
        status: params.status,
        tipo: params.tipo,
        numero: params.numero,
        usuarioId: params.responsavel_id,
        almoxarifadoId: params.almoxarifado_id
      });
      const response = await api.get(url, {
        timeout: 3e4,
        retries: 2
      });
      console.log("✅ Notas carregadas:", response);
      if (response.success && response.data) {
        const notasMapeadas = response.data.map((nota) => ({
          // Campos principais (já vêm corretos do backend)
          id: nota.id,
          numero: nota.numero,
          tipo: nota.tipo,
          status: nota._status,
          createdAt: nota.createdAt,
          observacoes: nota.observacoes,
          usuarioId: nota.usuarioId,
          almoxarifadoOrigemId: nota.almoxarifadoOrigemId,
          almoxarifadoDestinoId: nota.almoxarifadoDestinoId,
          // Campos para compatibilidade com frontend legacy
          responsavel_id: nota.usuarioId,
          almoxarifado_id: nota.almoxarifadoOrigemId || nota.almoxarifadoDestinoId,
          almoxarifado_destino_id: nota.almoxarifadoDestinoId,
          tipo_nota: nota.tipo,
          _status: nota._status,
          numero_documento: nota.numero,
          data_documento: nota.createdAt,
          created_at: nota.createdAt,
          // Campos otimizados que agora vêm do backend
          responsavel_nome: nota.usuario?.nome || "N/A",
          almoxarifado_nome: nota.almoxarifadoOrigem?.nome || nota.almoxarifadoDestino?.nome || "N/A",
          almoxarifado_destino_nome: nota.almoxarifadoDestino?.nome,
          total_itens: nota.totalItens || 0,
          valor_total: nota.valorTotal || 0,
          // Itens da nota (agora vêm populados)
          itens: nota._itens || [],
          _itens: nota._itens || [],
          // Relacionamentos expandidos (já vêm do backend)
          responsavel: nota.usuario,
          almoxarifado: nota.almoxarifadoOrigem || nota.almoxarifadoDestino,
          almoxarifado_destino: nota.almoxarifadoDestino
        }));
        return {
          data: notasMapeadas,
          total: response.pagination?.total || 0,
          page: response.pagination?.page || 1,
          pageSize: response.pagination?.limit || 10,
          totalPages: response.pagination?.totalPages || 1
        };
      }
      throw new Error("Resposta inválida do servidor");
    } catch (error) {
      console.error("❌ Erro ao listar notas:", error);
      throw new Error("Não foi possível carregar as notas de movimentação");
    }
  }
  /**
   * Busca uma nota específica por ID
   * Este endpoint JÁ inclui itens por padrão (conforme documentação linha 855)
   */
  async obterNota(id) {
    console.log("🔍 NotasMovimentacaoAdapter: Buscando nota", id);
    try {
      const response = await api.get(`${this.baseEndpoint}/${id}`);
      console.log("✅ Resposta obter nota:", response);
      console.log(
        "🔍 Estrutura da resposta:",
        JSON.stringify(response, null, 2)
      );
      let notaData;
      if (response.success && response.data) {
        notaData = response.data;
      } else if (response.data) {
        notaData = response.data;
      } else {
        notaData = response;
      }
      console.log(
        "📋 Dados da nota processados:",
        JSON.stringify(notaData, null, 2)
      );
      return notaData;
    } catch (error) {
      console.error("❌ Erro ao buscar nota:", error);
      throw new Error("Não foi possível encontrar a nota");
    }
  }
  // Método listarNotasComDetalhes removido - endpoint /resumo já inclui tudo
  /**
   * Lista apenas rascunhos usando endpoint específico
   */
  async listarRascunhos() {
    console.log("📝 NotasMovimentacaoAdapter: Listando rascunhos");
    try {
      const response = await api.get(`${this.baseEndpoint}/rascunhos`);
      console.log("✅ Resposta listar rascunhos:", response);
      if (response.success && response.data) {
        return Array.isArray(response.data) ? response.data : [];
      } else if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data?.items) {
        return response.data.items;
      }
      return [];
    } catch (error) {
      console.error("❌ Erro ao listar rascunhos:", error);
      throw new Error("Não foi possível carregar os rascunhos");
    }
  }
  // ==================== COMANDOS ====================
  /**
   * Cria uma nova nota usando o endpoint correto
   */
  async criarNota(data) {
    console.log("📝 NotasMovimentacaoAdapter: Criando nota", data);
    try {
      if (!data.responsavel_id) {
        console.log(
          "⚠️ responsavel_id não fornecido, buscando usuário padrão..."
        );
        try {
          const usuariosResponse = await api.get("/usuarios?limit=1");
          console.log("🔍 Resposta usuarios endpoint:", usuariosResponse);
          if (usuariosResponse.items && usuariosResponse.items.length > 0) {
            data.responsavel_id = usuariosResponse.items[0].id;
            console.log("✅ Usando responsavel_id:", data.responsavel_id);
          } else if (usuariosResponse.success && usuariosResponse.data && usuariosResponse.data.length > 0) {
            data.responsavel_id = usuariosResponse.data[0].id;
            console.log("✅ Usando responsavel_id:", data.responsavel_id);
          } else {
            console.log(
              "⚠️ Nenhum usuário encontrado, usando administrador padrão..."
            );
            data.responsavel_id = "cffc2197-acbe-4a64-bfd7-435370e9c226";
            console.log(
              "✅ Usando responsavel_id do administrador:",
              data.responsavel_id
            );
          }
        } catch (userError) {
          console.error("❌ Erro ao buscar usuário:", userError);
          data.responsavel_id = "cffc2197-acbe-4a64-bfd7-435370e9c226";
          console.log(
            "✅ Usando responsavel_id do administrador (fallback):",
            data.responsavel_id
          );
        }
      }
      const backendData = {
        tipo: data.tipo_nota
        // usuarioId não é enviado na criação - será inferido pelo backend
      };
      if (data.observacoes && data.observacoes.trim() !== "") {
        backendData.observacoes = data.observacoes.trim();
      }
      if (data.almoxarifado_origem_id) {
        backendData.almoxarifadoOrigemId = data.almoxarifado_origem_id;
      }
      if (data.almoxarifado_destino_id) {
        backendData.almoxarifadoDestinoId = data.almoxarifado_destino_id;
      }
      console.log("📤 Dados para backend:", backendData);
      const response = await api.post(this.baseEndpoint, backendData);
      console.log("✅ Nota criada:", response);
      if (response.success && response.data) {
        return {
          success: response.success,
          data: response.data
        };
      } else if (response.data) {
        return {
          success: true,
          data: response.data
        };
      } else {
        return {
          success: true,
          data: response
        };
      }
    } catch (error) {
      console.error("❌ Erro ao criar nota:", error);
      throw new Error("Não foi possível criar a nota de movimentação");
    }
  }
  /**
   * Atualiza uma nota existente (apenas rascunhos)
   */
  async atualizarNota(id, data) {
    console.log("📝 NotasMovimentacaoAdapter: Atualizando nota", id, data);
    try {
      const response = await api.put(`${this.baseEndpoint}/${id}`, data);
      console.log("✅ Resposta atualizar nota:", response);
      if (response.success && response.data) {
        return response.data;
      } else if (response.data) {
        return response.data;
      } else {
        return response;
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar nota:", error);
      throw new Error("Não foi possível atualizar a nota");
    }
  }
  /**
   * Exclui uma nota (apenas rascunhos)
   */
  async excluirNota(id) {
    console.log("🗑️ NotasMovimentacaoAdapter: Excluindo nota", id);
    try {
      await api.delete(`${this.baseEndpoint}/${id}`);
      console.log("✅ Nota excluída:", id);
    } catch (error) {
      console.error("❌ Erro ao excluir nota:", error);
      throw new Error("Não foi possível excluir a nota");
    }
  }
  // ==================== ITENS ====================
  /**
   * Adiciona um item à nota usando endpoint correto (linha 906)
   */
  async adicionarItem(notaId, item) {
    console.log("➕ NotasMovimentacaoAdapter: Adicionando item", notaId, item);
    try {
      if (!item.tipo_epi_id) {
        throw new Error("ID do tipo EPI é obrigatório");
      }
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const customIdRegex = /^[A-Z0-9]{6}$/;
      if (!uuidRegex.test(item.tipo_epi_id) && !customIdRegex.test(item.tipo_epi_id)) {
        console.error("❌ ID inválido detectado:", item.tipo_epi_id);
        throw new Error(`ID do tipo EPI inválido: ${item.tipo_epi_id}. Deve ser um UUID válido ou ID customizado (ex: E4U302)`);
      }
      const backendItemData = {
        tipoEpiId: item.tipo_epi_id,
        quantidade: Number(item.quantidade)
      };
      if (item.observacoes && item.observacoes.trim() !== "") {
        backendItemData.observacoes = item.observacoes;
      }
      console.log("📤 Dados do item para backend:", backendItemData);
      const response = await api.post(
        `${this.baseEndpoint}/${notaId}/itens`,
        backendItemData
      );
      console.log("✅ Item adicionado:", response);
      if (response.success && response.data) {
        return response.data;
      } else if (response.data) {
        return response.data;
      } else {
        return response;
      }
    } catch (error) {
      console.error("❌ Erro ao adicionar item:", error);
      throw new Error("Não foi possível adicionar o item à nota");
    }
  }
  /**
   * Atualiza quantidade de um item (linha 925)
   */
  async atualizarQuantidade(notaId, tipoEpiId, quantidade) {
    console.log(
      "📝 NotasMovimentacaoAdapter: Atualizando quantidade",
      notaId,
      tipoEpiId,
      quantidade
    );
    try {
      await api.put(`${this.baseEndpoint}/${notaId}/itens/${tipoEpiId}`, {
        quantidade: Number(quantidade)
      });
      console.log("✅ Quantidade atualizada");
    } catch (error) {
      console.error("❌ Erro ao atualizar quantidade:", error);
      throw new Error("Não foi possível atualizar a quantidade");
    }
  }
  /**
   * Remove um item da nota (linha 937)
   */
  async removerItem(notaId, itemId) {
    console.log("🗑️ NotasMovimentacaoAdapter: Removendo item", notaId, itemId);
    try {
      await api.delete(`${this.baseEndpoint}/${notaId}/itens/${itemId}`);
      console.log("✅ Item removido");
    } catch (error) {
      console.error("❌ Erro ao remover item:", error);
      throw new Error("Não foi possível remover o item");
    }
  }
  // ==================== WORKFLOW ====================
  /**
   * Conclui uma nota usando endpoint correto (linha 942)
   */
  async concluirNota(id) {
    console.log("⚡ NotasMovimentacaoAdapter: Concluindo nota", id);
    try {
      const response = await api.post(
        `${this.baseEndpoint}/${id}/concluir`,
        {
          validarEstoque: true
        }
      );
      console.log("✅ Nota concluída:", response);
      if (response.success) {
        return {
          success: response.success,
          data: response.data
        };
      } else {
        return response;
      }
    } catch (error) {
      console.error("❌ Erro ao concluir nota:", error);
      throw new Error("Não foi possível concluir a nota");
    }
  }
  /**
   * Cancela uma nota (linha 988)
   */
  async cancelarNota(id, motivo) {
    console.log("🚫 NotasMovimentacaoAdapter: Cancelando nota", id);
    try {
      await api.post(`${this.baseEndpoint}/${id}/cancelar`, {
        motivo: motivo || "Cancelamento solicitado pelo usuário",
        gerarEstorno: true
      });
      console.log("✅ Nota cancelada:", id);
    } catch (error) {
      console.error("❌ Erro ao cancelar nota:", error);
      throw new Error("Não foi possível cancelar a nota");
    }
  }
  /**
   * Valida se uma nota pode ser cancelada (linha 1001)
   */
  async validarCancelamento(id) {
    console.log("🔍 NotasMovimentacaoAdapter: Validando cancelamento", id);
    try {
      const response = await api.get(
        `${this.baseEndpoint}/${id}/validar-cancelamento`
      );
      console.log("✅ Validação de cancelamento:", response);
      if (response.success && response.data) {
        return response.data;
      } else if (response.data) {
        return response.data;
      } else {
        return response;
      }
    } catch (error) {
      console.error("❌ Erro ao validar cancelamento:", error);
      return { pode_cancelar: false, motivo: "Erro na validação" };
    }
  }
  // ==================== CONSULTAS AVANÇADAS ====================
  /**
   * Busca nota com todos os relacionamentos (mesmo que obterNota)
   */
  async obterNotaCompleta(id) {
    console.log("🔍 NotasMovimentacaoAdapter: Buscando nota completa", id);
    return this.obterNota(id);
  }
  /**
   * Validação local antes de concluir nota
   */
  async validarNotaAntesConcluir(id) {
    console.log("🔍 NotasMovimentacaoAdapter: Validação local da nota", id);
    try {
      const nota = await this.obterNota(id);
      const erros = [];
      const avisos = [];
      if (!nota.itens || nota.itens.length === 0) {
        erros.push("Nota deve ter pelo menos um item");
      }
      if (nota.status === "CONCLUIDA" || nota._status === "CONCLUIDA") {
        erros.push("Nota já foi concluída anteriormente");
      }
      if (nota.status === "CANCELADA" || nota._status === "CANCELADA") {
        erros.push("Nota cancelada não pode ser concluída");
      }
      const podeConfirmar = erros.length === 0;
      if (podeConfirmar) {
        avisos.push("Validação local aprovada");
      }
      console.log("✅ Validação local concluída:", {
        podeConfirmar,
        erros: erros.length,
        itens: nota.itens?.length
      });
      return {
        pode_concluir: podeConfirmar,
        erros,
        avisos,
        total_itens_processados: nota.itens?.length || 0,
        movimentacoes_previstas: nota.itens?.length || 0
      };
    } catch (error) {
      console.error("❌ Erro na validação local:", error);
      return {
        pode_concluir: false,
        erros: ["Não foi possível carregar dados da nota para validação"],
        avisos: ["Erro na validação local"]
      };
    }
  }
  // ==================== FILTROS E OPÇÕES ====================
  /**
   * Obtém opções para filtros - simplificado para usar endpoint /resumo
   */
  async obterOpcoesFilters() {
    console.log("🔧 NotasMovimentacaoAdapter: Carregando opções de filtros");
    try {
      const [responsaveisResponse, almoxarifadosResponse] = await Promise.all([
        api.get("/usuarios?limit=100"),
        api.get("/estoque/almoxarifados")
      ]);
      const responsaveis = responsaveisResponse?.data || responsaveisResponse?.items || [];
      const almoxarifados = almoxarifadosResponse?.data || [];
      const options = {
        responsaveis: responsaveis.map((r) => ({
          value: r.id,
          label: r.nome || r.name || `Usuário ${r.id.slice(0, 8)}`
        })),
        almoxarifados: almoxarifados.map((a) => ({
          value: a.id,
          label: a.nome || a.name || `Almoxarifado ${a.id.slice(0, 8)}`
        })),
        tipos: [
          { value: "ENTRADA", label: "Entrada" },
          { value: "TRANSFERENCIA", label: "Transferência" },
          { value: "DESCARTE", label: "Descarte" },
          { value: "AJUSTE", label: "Ajuste" }
        ],
        status: [
          { value: "RASCUNHO", label: "Rascunho" },
          { value: "CONCLUIDA", label: "Concluída" },
          { value: "CANCELADA", label: "Cancelada" }
        ]
      };
      console.log("✅ Opções de filtros carregadas:", {
        responsaveis: options.responsaveis.length,
        almoxarifados: options.almoxarifados.length
      });
      return options;
    } catch (error) {
      console.error("❌ Erro ao carregar opções de filtros:", error);
      return {
        responsaveis: [],
        almoxarifados: [],
        tipos: [
          { value: "ENTRADA", label: "Entrada" },
          { value: "TRANSFERENCIA", label: "Transferência" },
          { value: "DESCARTE", label: "Descarte" },
          { value: "AJUSTE", label: "Ajuste" }
        ],
        status: [
          { value: "RASCUNHO", label: "Rascunho" },
          { value: "CONCLUIDA", label: "Concluída" },
          { value: "CANCELADA", label: "Cancelada" }
        ]
      };
    }
  }
}
const notasMovimentacaoAdapter = new NotasMovimentacaoAdapter();
const TableContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let startItem;
  let endItem;
  let { loading = false } = $$props;
  let { error = null } = $$props;
  let { isEmpty = false } = $$props;
  let { emptyIcon = null } = $$props;
  let { emptyTitle = "Nenhum item encontrado" } = $$props;
  let { emptyMessage = "Não há dados para exibir" } = $$props;
  let { emptyActionLabel = "" } = $$props;
  let { showPagination = false } = $$props;
  let { currentPage = 1 } = $$props;
  let { totalPages = 1 } = $$props;
  let { pageSize = 20 } = $$props;
  let { total = 0 } = $$props;
  createEventDispatcher();
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  if ($$props.isEmpty === void 0 && $$bindings.isEmpty && isEmpty !== void 0) $$bindings.isEmpty(isEmpty);
  if ($$props.emptyIcon === void 0 && $$bindings.emptyIcon && emptyIcon !== void 0) $$bindings.emptyIcon(emptyIcon);
  if ($$props.emptyTitle === void 0 && $$bindings.emptyTitle && emptyTitle !== void 0) $$bindings.emptyTitle(emptyTitle);
  if ($$props.emptyMessage === void 0 && $$bindings.emptyMessage && emptyMessage !== void 0) $$bindings.emptyMessage(emptyMessage);
  if ($$props.emptyActionLabel === void 0 && $$bindings.emptyActionLabel && emptyActionLabel !== void 0) $$bindings.emptyActionLabel(emptyActionLabel);
  if ($$props.showPagination === void 0 && $$bindings.showPagination && showPagination !== void 0) $$bindings.showPagination(showPagination);
  if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0) $$bindings.currentPage(currentPage);
  if ($$props.totalPages === void 0 && $$bindings.totalPages && totalPages !== void 0) $$bindings.totalPages(totalPages);
  if ($$props.pageSize === void 0 && $$bindings.pageSize && pageSize !== void 0) $$bindings.pageSize(pageSize);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0) $$bindings.total(total);
  startItem = (currentPage - 1) * pageSize + 1;
  endItem = Math.min(currentPage * pageSize, total);
  return `   <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">${loading ? ` <div class="p-8">${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}</div>` : `${error ? ` <div class="p-8">${validate_component(ErrorDisplay, "ErrorDisplay").$$render($$result, { message: error }, {}, {})}</div>` : `${isEmpty ? ` <div class="p-16 text-center">${emptyIcon ? `<div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">${validate_component(emptyIcon || missing_component, "svelte:component").$$render($$result, { class: "w-8 h-8 text-gray-400" }, {}, {})}</div>` : ``} <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${escape(emptyTitle)}</h3> <p class="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">${escape(emptyMessage)}</p> ${emptyActionLabel ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "primary",
      class: "rounded-sm"
    },
    {},
    {
      default: () => {
        return `${escape(emptyActionLabel)}`;
      }
    }
  )}` : ``}</div>` : ` ${slots.filters ? slots.filters({}) : ``}  <div class="overflow-x-auto">${slots.default ? slots.default({}) : ``}</div>  ${showPagination && totalPages > 1 ? `<div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"><div class="text-sm text-gray-600 dark:text-gray-400">Mostrando ${escape(startItem)} a ${escape(endItem)} de ${escape(total)} resultados</div> <div class="flex gap-2">${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "alternative",
      class: "rounded-sm",
      disabled: currentPage === 1
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
      disabled: currentPage === totalPages
    },
    {},
    {
      default: () => {
        return `Próximo`;
      }
    }
  )}</div></div>` : ``}`}`}`}</div>`;
});
const TableFilters = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { searchValue = "" } = $$props;
  let { searchPlaceholder = "Buscar..." } = $$props;
  let { filters = [] } = $$props;
  let { checkboxFilters = [] } = $$props;
  let { resultCount = 0 } = $$props;
  let { totalCount = 0 } = $$props;
  let { resultLabel = "resultados" } = $$props;
  let { showClearButton = false } = $$props;
  createEventDispatcher();
  if ($$props.searchValue === void 0 && $$bindings.searchValue && searchValue !== void 0) $$bindings.searchValue(searchValue);
  if ($$props.searchPlaceholder === void 0 && $$bindings.searchPlaceholder && searchPlaceholder !== void 0) $$bindings.searchPlaceholder(searchPlaceholder);
  if ($$props.filters === void 0 && $$bindings.filters && filters !== void 0) $$bindings.filters(filters);
  if ($$props.checkboxFilters === void 0 && $$bindings.checkboxFilters && checkboxFilters !== void 0) $$bindings.checkboxFilters(checkboxFilters);
  if ($$props.resultCount === void 0 && $$bindings.resultCount && resultCount !== void 0) $$bindings.resultCount(resultCount);
  if ($$props.totalCount === void 0 && $$bindings.totalCount && totalCount !== void 0) $$bindings.totalCount(totalCount);
  if ($$props.resultLabel === void 0 && $$bindings.resultLabel && resultLabel !== void 0) $$bindings.resultLabel(resultLabel);
  if ($$props.showClearButton === void 0 && $$bindings.showClearButton && showClearButton !== void 0) $$bindings.showClearButton(showClearButton);
  return `   <div class="p-4 border-b border-gray-200 dark:border-gray-700"><div class="flex items-center gap-4 flex-wrap"> <div class="relative flex-1 max-w-md">${validate_component(SearchOutline, "SearchOutline").$$render(
    $$result,
    {
      class: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
    },
    {},
    {}
  )} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "text",
      placeholder: searchPlaceholder,
      class: "pl-10 rounded-sm h-10 text-sm",
      value: searchValue
    },
    {},
    {}
  )}</div>  ${each(filters, (filter) => {
    return `${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
      $$result,
      {
        options: filter.options,
        value: filter.value,
        placeholder: filter.placeholder,
        class: "min-w-[140px]"
      },
      {},
      {}
    )}`;
  })}  ${each(checkboxFilters, (checkboxFilter) => {
    return `<div class="flex items-center">${validate_component(Checkbox, "Checkbox").$$render(
      $$result,
      {
        checked: checkboxFilter.checked,
        class: "text-sm"
      },
      {},
      {
        default: () => {
          return `${escape(checkboxFilter.label)} `;
        }
      }
    )} </div>`;
  })}  ${showClearButton ? `<button type="button" class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors" title="Limpar filtros">${validate_component(RefreshOutline, "RefreshOutline").$$render(
    $$result,
    {
      class: "w-4 h-4 text-gray-600 dark:text-gray-400"
    },
    {},
    {}
  )}</button>` : ``}</div>  <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"><div class="text-sm text-gray-600 dark:text-gray-400">${escape(resultCount)} de ${escape(totalCount)} ${escape(resultLabel)} encontrado${escape(resultCount !== 1 ? "s" : "")}</div></div></div>`;
});
function getTipoNotaLabel(tipo) {
  const labels = {
    ENTRADA: "Entrada",
    TRANSFERENCIA: "Transferência",
    DESCARTE: "Descarte",
    ENTRADA_AJUSTE: "Entrada (Ajuste)",
    SAIDA_AJUSTE: "Saída (Ajuste)"
  };
  return labels[tipo] || tipo;
}
function getStatusNotaLabel(status) {
  const labels = {
    RASCUNHO: "Rascunho",
    CONCLUIDA: "Concluída",
    CANCELADA: "Cancelada"
  };
  return labels[status] || status;
}
function getTipoNotaBadgeColor(tipo) {
  const colors = {
    ENTRADA: "green",
    TRANSFERENCIA: "blue",
    DESCARTE: "red",
    ENTRADA_AJUSTE: "yellow",
    SAIDA_AJUSTE: "dark"
  };
  return colors[tipo] || "gray";
}
function getStatusNotaBadgeColor(status) {
  const colors = {
    RASCUNHO: "yellow",
    CONCLUIDA: "green",
    CANCELADA: "red"
  };
  return colors[status] || "dark";
}
function getAvailableActions(nota) {
  const actions = ["view"];
  switch (nota.status) {
    case "RASCUNHO":
      actions.push("edit", "delete", "conclude");
      break;
    case "CONCLUIDA":
      actions.push("cancel");
      break;
  }
  return actions;
}
function getActionTooltip(action, nota) {
  const actionLabels = {
    "view": "Visualizar detalhes da nota",
    "edit": "Editar nota (rascunho)",
    "delete": "Excluir nota (rascunho)",
    "conclude": `Concluir nota e processar ${nota.total_itens || nota.itens?.length || 0} ${(nota.total_itens || nota.itens?.length || 0) === 1 ? "item" : "itens"}`,
    "cancel": "Cancelar nota (reversível)"
  };
  return actionLabels[action] || action;
}
const NotesTablePresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filterConfig;
  let dateFilters;
  let { items = [] } = $$props;
  let { loading = false } = $$props;
  let { error = null } = $$props;
  let { pagination } = $$props;
  let { filters } = $$props;
  let { filterOptions } = $$props;
  createEventDispatcher();
  const tabs = [
    { label: "Concluídas", count: 0 },
    { label: "Rascunhos", count: 0 },
    { label: "Canceladas", count: 0 }
  ];
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  if ($$props.pagination === void 0 && $$bindings.pagination && pagination !== void 0) $$bindings.pagination(pagination);
  if ($$props.filters === void 0 && $$bindings.filters && filters !== void 0) $$bindings.filters(filters);
  if ($$props.filterOptions === void 0 && $$bindings.filterOptions && filterOptions !== void 0) $$bindings.filterOptions(filterOptions);
  {
    if (items && items.length > 0) {
      console.log("🔍 NotesTablePresenter: Dados recebidos", {
        quantidade: items.length,
        primeiraNota: {
          id: items[0]?.id,
          numero: items[0]?.numero,
          responsavel_nome: items[0]?.responsavel_nome,
          almoxarifado_nome: items[0]?.almoxarifado_nome,
          total_itens: items[0]?.total_itens,
          valor_total: items[0]?.valor_total,
          status: items[0]?.status,
          tipo: items[0]?.tipo,
          data_documento: items[0]?.data_documento
        }
      });
    }
  }
  filterConfig = [
    {
      key: "tipo",
      value: filters.tipoFilter,
      options: [{ value: "todas", label: "Todos os Tipos" }, ...filterOptions.tipos],
      placeholder: "Tipo"
    },
    {
      key: "responsavel",
      value: filters.responsavelFilter,
      options: filterOptions.responsaveis,
      placeholder: "Responsável"
    },
    {
      key: "almoxarifado",
      value: filters.almoxarifadoFilter,
      options: filterOptions.almoxarifados,
      placeholder: "Almoxarifado"
    }
  ].filter(Boolean);
  dateFilters = [
    {
      key: "dataInicio",
      type: "date",
      value: filters.dataInicioFilter,
      placeholder: "Data início"
    },
    {
      key: "dataFim",
      type: "date",
      value: filters.dataFimFilter,
      placeholder: "Data fim"
    }
  ];
  return `  ${$$result.head += `<!-- HEAD_svelte-17563br_START -->${$$result.title = `<title>Notas de Movimentação - DataLife EPI</title>`, ""}<!-- HEAD_svelte-17563br_END -->`, ""} <div class="space-y-6"> <div class="flex items-center justify-between"><div data-svelte-h="svelte-1yas3jv"><h1 class="text-xl font-medium text-gray-900 dark:text-white">Notas de Movimentação</h1> <p class="text-sm text-gray-600 dark:text-gray-400">Gerencie notas de entrada, transferência e descarte de EPIs</p></div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
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
        Nova Movimentação`;
      }
    }
  )}</div></div>  <div class="border-b border-gray-200 dark:border-gray-700"><nav class="flex space-x-4 px-4" aria-label="Tabs">${each(tabs, (tab, index) => {
    return `<button class="${"whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm focus:outline-none transition-colors duration-200 -mb-px " + escape(
      filters.activeTab === index ? "border-primary-500 text-primary-600 dark:text-primary-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600",
      true
    )}"><span class="flex items-center space-x-2"><span>${escape(tab.label)}</span> ${filters.activeTab === index && pagination.total > 0 ? `${validate_component(Badge, "Badge").$$render(
      $$result,
      {
        color: "gray",
        class: "rounded-sm text-xs"
      },
      {},
      {
        default: () => {
          return `${escape(pagination.total)}`;
        }
      }
    )}` : ``}</span> </button>`;
  })}</nav></div>  ${loading ? `${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}` : `${error ? `${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
    default: () => {
      return `<div class="text-center py-8"><div class="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">${validate_component(CloseOutline, "CloseOutline").$$render(
        $$result,
        {
          class: "w-8 h-8 text-red-600 dark:text-red-400"
        },
        {},
        {}
      )}</div> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-aprdtf">Erro ao carregar dados</h3> <p class="text-red-600 dark:text-red-400 mb-4">${escape(error)}</p> ${validate_component(Button, "Button").$$render(
        $$result,
        {
          size: "sm",
          color: "red",
          class: "rounded-sm"
        },
        {},
        {
          default: () => {
            return `${validate_component(RefreshOutline, "RefreshOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
          Tentar novamente`;
          }
        }
      )}</div>`;
    }
  })}` : `${items.length > 0 ? ` ${validate_component(TableContainer, "TableContainer").$$render(
    $$result,
    {
      loading,
      error,
      isEmpty: items.length === 0
    },
    {},
    {
      filters: () => {
        return `${validate_component(TableFilters, "TableFilters").$$render(
          $$result,
          {
            slot: "filters",
            searchValue: filters.searchTerm,
            filters: filterConfig,
            dateFilters,
            resultCount: items.length,
            totalCount: pagination.total,
            hasActiveFilters: filters.hasActiveFilters
          },
          {},
          {}
        )}`;
      },
      default: () => {
        return ` <div class="min-w-[1200px] overflow-x-auto">${validate_component(Table, "Table").$$render($$result, { hoverable: true }, {}, {
          default: () => {
            return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Número/Tipo`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Data`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Responsável`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Almoxarifado`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Status`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Qtd. Itens`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Valor Total`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `Ações`;
                  }
                })}`;
              }
            })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
              default: () => {
                return `${each(items, (nota) => {
                  return `${validate_component(TableBodyRow, "TableBodyRow").$$render(
                    $$result,
                    {
                      class: "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `<div class="flex flex-col"><span class="font-medium text-gray-900 dark:text-white">${escape(nota.numero || `#${nota.id.slice(0, 8)}`)}</span> <span class="text-sm text-gray-500 dark:text-gray-400">${escape(getTipoNotaLabel(nota.tipo))} </span></div> `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `<span class="text-sm">${escape(formatarData(nota.data_documento))}</span> `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `<span class="text-sm">${escape(nota.responsavel_nome || "N/A")}</span> `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `<div class="flex flex-col"><span class="text-sm">${escape(nota.almoxarifado_nome || "N/A")}</span> ${nota.almoxarifado_destino_nome && nota.tipo === "TRANSFERENCIA" ? `<span class="text-xs text-gray-500 dark:text-gray-400">→ ${escape(nota.almoxarifado_destino_nome)}</span>` : ``}</div> `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Badge, "Badge").$$render(
                              $$result,
                              {
                                color: getStatusNotaBadgeColor(nota.status),
                                class: "w-fit rounded-sm"
                              },
                              {},
                              {
                                default: () => {
                                  return `${escape(getStatusNotaLabel(nota.status))} `;
                                }
                              }
                            )} `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `<div class="flex items-center space-x-2">${validate_component(FileDocOutline, "FileDocOutline").$$render(
                              $$result,
                              {
                                class: "w-4 h-4 text-gray-400 dark:text-gray-500"
                              },
                              {},
                              {}
                            )} <span class="text-sm font-medium">${escape(nota.total_itens || nota.itens?.length || 0)}</span> <span class="text-xs text-gray-500 dark:text-gray-400">${escape((nota.total_itens || nota.itens?.length || 0) === 1 ? "item" : "itens")} </span></div> `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${nota.valor_total && nota.valor_total > 0 ? `<div class="flex flex-col"><span class="text-sm font-medium text-green-600 dark:text-green-400">R$ ${escape(nota.valor_total.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            }))}</span> <span class="text-xs text-gray-500 dark:text-gray-400">Médio: R$ ${escape((nota.valor_total / (nota.total_itens || nota.itens?.length || 1)).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            }))}</span> </div>` : `<span class="text-sm text-gray-400 dark:text-gray-500" data-svelte-h="svelte-1iua6vw">—</span>`} `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `<div class="flex space-x-1">${each(getAvailableActions(nota), (action) => {
                              return `${action === "view" ? `<button class="p-2 rounded-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"${add_attribute("title", getActionTooltip("view", nota), 0)}>${validate_component(EyeOutline, "EyeOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button>` : `${action === "edit" ? `<button class="p-2 rounded-sm text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 transition-colors"${add_attribute("title", getActionTooltip("edit", nota), 0)}>${validate_component(PenOutline, "PenOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button>` : `${action === "delete" ? `<button class="p-2 rounded-sm text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-700 transition-colors"${add_attribute("title", getActionTooltip("delete", nota), 0)}>${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button>` : `${action === "conclude" ? `<button class="p-2 rounded-sm text-green-500 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-700 transition-colors"${add_attribute("title", getActionTooltip("conclude", nota), 0)}>${validate_component(CheckOutline, "CheckOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button>` : `${action === "cancel" ? `<button class="p-2 rounded-sm text-orange-500 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-700 transition-colors"${add_attribute("title", getActionTooltip("cancel", nota), 0)}>${validate_component(CloseOutline, "CloseOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button>` : ``}`}`}`}`}`;
                            })}</div> `;
                          }
                        })} `;
                      }
                    }
                  )}`;
                })}`;
              }
            })}`;
          }
        })}</div>  ${pagination.totalPages > 1 ? `<div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700"><div class="text-sm text-gray-500 dark:text-gray-400">Mostrando ${escape(Math.min((pagination.currentPage - 1) * pagination.pageSize + 1, pagination.total))} a ${escape(Math.min(pagination.currentPage * pagination.pageSize, pagination.total))} de ${escape(pagination.total)} resultados</div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
          $$result,
          {
            color: "alternative",
            class: "rounded-sm",
            disabled: !pagination.hasPrev
          },
          {},
          {
            default: () => {
              return `Anterior`;
            }
          }
        )} <span class="flex items-center px-3 text-sm text-gray-500 dark:text-gray-400">Página ${escape(pagination.currentPage)} de ${escape(pagination.totalPages)}</span> ${validate_component(Button, "Button").$$render(
          $$result,
          {
            color: "alternative",
            class: "rounded-sm",
            disabled: !pagination.hasNext
          },
          {},
          {
            default: () => {
              return `Próximo`;
            }
          }
        )}</div></div>` : ``}`;
      }
    }
  )}` : ` ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
    default: () => {
      return `<div class="text-center py-12"><div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">${validate_component(FileDocOutline, "FileDocOutline").$$render($$result, { class: "w-8 h-8 text-gray-400" }, {}, {})}</div> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-1a1xvm">Nenhuma nota encontrada</h3> <p class="text-gray-500 dark:text-gray-400 mb-6">${escape(filters.hasActiveFilters ? "Tente ajustar os filtros ou termo de busca" : "Comece criando uma nova nota de movimentação")}</p> ${validate_component(Button, "Button").$$render(
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
          Nova Movimentação`;
          }
        }
      )}</div>`;
    }
  })}`}`}`}</div>`;
});
class TiposEpiAdapter {
  baseEndpoint = "/tipos-epi";
  /**
   * Lista tipos de EPI disponíveis para seleção
   */
  async listarTiposEpi(params) {
    console.log("🛡️ TiposEpiAdapter: Listando tipos de EPI", params);
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.limit) queryParams.append("limit", params.limit.toString());
      if (params?.search) queryParams.append("search", params.search);
      if (params?.categoria) queryParams.append("categoria", params.categoria);
      const url = `${this.baseEndpoint}?${queryParams.toString()}`;
      const response = await api.get(url);
      console.log("✅ Tipos de EPI listados:", response.data.pagination);
      return {
        data: response.data.items,
        total: response.data.pagination.total,
        page: response.data.pagination.page,
        pageSize: response.data.pagination.limit,
        totalPages: response.data.pagination.totalPages
      };
    } catch (error) {
      console.error("❌ Erro ao listar tipos de EPI:", error);
      if (error.name === "AbortError" || error.message?.includes("timeout")) {
        console.warn(
          "⚠️ Backend indisponível, usando dados de fallback para tipos EPI"
        );
        const fallbackData = this.getFallbackTiposEPI();
        return {
          data: fallbackData,
          total: fallbackData.length,
          page: 1,
          pageSize: fallbackData.length,
          totalPages: 1
        };
      }
      throw new Error("Não foi possível carregar os tipos de EPI");
    }
  }
  /**
   * Obtém um tipo de EPI específico por ID
   */
  async obterTipoEpi(id) {
    console.log("🔍 TiposEpiAdapter: Buscando tipo de EPI", id);
    try {
      const response = await api.get(`${this.baseEndpoint}/${id}`);
      console.log("✅ Tipo de EPI encontrado:", response.data.nome_equipamento);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar tipo de EPI:", error);
      throw new Error("Não foi possível encontrar o tipo de EPI");
    }
  }
  /**
   * Converte tipos de EPI em opções para componentes Select
   * Otimizado para criação de notas de entrada
   */
  async obterOpcoesSelect(filtros) {
    console.log("🔧 TiposEpiAdapter: Carregando opções para select", filtros);
    try {
      const params = {
        page: 1,
        limit: filtros?.limite || 100
      };
      if (filtros?.categoria) {
        params.categoria = filtros.categoria;
      }
      const response = await this.listarTiposEpi(params);
      const isValidId = (id) => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const customIdRegex = /^[A-Z0-9]{6}$/;
        return uuidRegex.test(id) || customIdRegex.test(id);
      };
      const validTipos = response.data.filter((tipo) => {
        const valid = isValidId(tipo.id);
        if (!valid) {
          console.warn(`⚠️ Tipo EPI com ID inválido ignorado: ${tipo.id} - ${tipo.nomeEquipamento}`);
        }
        return valid;
      });
      console.log(`🔍 Tipos EPI válidos: ${validTipos.length} de ${response.data.length}`);
      const opcoes = validTipos.map((tipo) => {
        console.log(
          "🔍 Mapeando tipo EPI completo:",
          JSON.stringify(tipo, null, 2)
        );
        console.log("🔍 Campos disponíveis:", Object.keys(tipo));
        console.log("🔍 nome_equipamento:", tipo.nome_equipamento);
        console.log("🔍 nomeEquipamento:", tipo.nomeEquipamento);
        console.log("🔍 nome:", tipo.nome);
        console.log("🔍 name:", tipo.name);
        const nomeEquipamento = tipo.nomeEquipamento || tipo.nome_equipamento || tipo.nome || tipo.name || "Nome não identificado";
        const numeroCA = tipo.numeroCa || tipo.numero_ca || tipo.numeroCA || tipo.ca || "N/A";
        const categoria = tipo.categoria || tipo.category || "Sem categoria";
        const opcaoFinal = {
          value: tipo.id,
          label: `${nomeEquipamento} (CA: ${numeroCA})`,
          categoria,
          numeroCA,
          custoUnitario: tipo.custo_unitario || tipo.custoUnitario || tipo.preco || 0,
          status: tipo.status
        };
        console.log("🎯 Opção final criada:", opcaoFinal);
        return opcaoFinal;
      });
      opcoes.sort((a, b) => a.label.localeCompare(b.label));
      console.log("✅ Opções de select criadas:", opcoes.length);
      return opcoes;
    } catch (error) {
      console.error("❌ Erro ao criar opções de select:", error);
      return [];
    }
  }
  /**
   * Obtém opções agrupadas por categoria
   */
  async obterOpcoesAgrupadasPorCategoria() {
    console.log("📂 TiposEpiAdapter: Agrupando opções por categoria");
    try {
      const opcoes = await this.obterOpcoesSelect({ apenasAtivos: true });
      const agrupadas = {};
      opcoes.forEach((opcao) => {
        if (!agrupadas[opcao.categoria]) {
          agrupadas[opcao.categoria] = [];
        }
        agrupadas[opcao.categoria].push(opcao);
      });
      Object.keys(agrupadas).forEach((categoria) => {
        agrupadas[categoria].sort((a, b) => a.label.localeCompare(b.label));
      });
      console.log("✅ Opções agrupadas por categoria:", Object.keys(agrupadas));
      return agrupadas;
    } catch (error) {
      console.error("❌ Erro ao agrupar opções por categoria:", error);
      return {};
    }
  }
  /**
   * Cache para opções de seleção
   */
  selectOptionsCache = null;
  /**
   * Obtém opções para select com cache inteligente
   */
  async obterOpcoesSelectComCache(filtros) {
    const TTL = 5 * 60 * 1e3;
    const now = Date.now();
    const cacheKey = JSON.stringify(filtros || {});
    if (this.selectOptionsCache && this.selectOptionsCache.key === cacheKey && now - this.selectOptionsCache.timestamp < TTL) {
      console.log("💾 TiposEpiAdapter: Usando cache para opções select");
      return this.selectOptionsCache.data;
    }
    const freshData = await this.obterOpcoesSelect(filtros);
    this.selectOptionsCache = {
      data: freshData,
      timestamp: now,
      key: cacheKey
    };
    return freshData;
  }
  /**
   * Busca tipos de EPI por nome ou CA
   */
  async buscarTiposEpi(termo) {
    console.log("🔍 TiposEpiAdapter: Buscando tipos de EPI", termo);
    if (!termo || termo.length < 2) {
      return [];
    }
    try {
      const response = await this.listarTiposEpi({
        search: termo,
        limit: 20
        // Temporarily disable status filter to debug backend compatibility
        // status: 'ATIVO'
      });
      const opcoes = response.data.map((tipo) => {
        const nomeEquipamento = tipo.nomeEquipamento || tipo.nome_equipamento || tipo.nome || tipo.name || "Nome não identificado";
        const numeroCA = tipo.numeroCa || tipo.numero_ca || tipo.numeroCA || tipo.ca || "N/A";
        const categoria = tipo.categoria || tipo.category || "Sem categoria";
        return {
          value: tipo.id,
          label: `${nomeEquipamento} (CA: ${numeroCA})`,
          categoria,
          numeroCA,
          custoUnitario: tipo.custo_unitario || tipo.custoUnitario || tipo.preco || 0
        };
      });
      console.log("✅ Busca realizada, encontrados:", opcoes.length);
      return opcoes;
    } catch (error) {
      console.error("❌ Erro na busca de tipos de EPI:", error);
      return [];
    }
  }
  /**
   * Obtém categorias disponíveis
   */
  async obterCategorias() {
    console.log("📋 TiposEpiAdapter: Carregando categorias");
    try {
      const response = await this.listarTiposEpi({
        limit: 500
        // Temporarily disable status filter to debug backend compatibility
        // status: 'ATIVO'
      });
      const categorias = [
        ...new Set(response.data.map((tipo) => tipo.categoria))
      ].filter((categoria) => categoria && categoria.trim() !== "").sort();
      console.log("✅ Categorias encontradas:", categorias);
      return categorias;
    } catch (error) {
      console.error("❌ Erro ao carregar categorias:", error);
      return [];
    }
  }
  /**
   * Valida se um tipo de EPI existe e está ativo
   */
  async validarTipoEpiAtivo(id) {
    try {
      const tipo = await this.obterTipoEpi(id);
      return tipo.status === "ATIVO";
    } catch {
      return false;
    }
  }
  /**
   * Limpa cache
   */
  limparCache() {
    this.selectOptionsCache = null;
    console.log("🗑️ TiposEpiAdapter: Cache limpo");
  }
  /**
   * Alias para compatibilidade com service index
   */
  clearCache() {
    this.limparCache();
  }
  /**
   * Obtém tipos de EPI mais utilizados (útil para sugestões)
   */
  async obterTiposPopulares(limite = 10) {
    console.log("🌟 TiposEpiAdapter: Carregando tipos populares");
    try {
      const response = await this.listarTiposEpi({
        limit: limite
        // Temporarily disable status filter to debug backend compatibility
        // status: 'ATIVO'
      });
      const opcoes = response.data.map((tipo) => {
        const nomeEquipamento = tipo.nomeEquipamento || tipo.nome_equipamento || tipo.nome || tipo.name || "Nome não identificado";
        const numeroCA = tipo.numeroCa || tipo.numero_ca || tipo.numeroCA || tipo.ca || "N/A";
        const categoria = tipo.categoria || tipo.category || "Sem categoria";
        return {
          value: tipo.id,
          label: `${nomeEquipamento} (CA: ${numeroCA})`,
          categoria,
          numeroCA,
          custoUnitario: tipo.custo_unitario || tipo.custoUnitario || tipo.preco || 0
        };
      });
      console.log("✅ Tipos populares carregados:", opcoes.length);
      return opcoes;
    } catch (error) {
      console.error("❌ Erro ao carregar tipos populares:", error);
      return [];
    }
  }
  /**
   * Dados de fallback quando backend está indisponível
   */
  getFallbackTiposEPI() {
    return [
      {
        id: "fallback-1",
        nome_equipamento: "Capacete de Segurança (Demo)",
        numero_ca: "12345",
        categoria: "PROTECAO_CRANIO",
        custo_unitario: 35.5,
        status: "ATIVO",
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        id: "fallback-2",
        nome_equipamento: "Óculos de Proteção (Demo)",
        numero_ca: "67890",
        categoria: "PROTECAO_OLHOS",
        custo_unitario: 28.9,
        status: "ATIVO",
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        id: "fallback-3",
        nome_equipamento: "Luva de Segurança (Demo)",
        numero_ca: "54321",
        categoria: "PROTECAO_MAOS",
        custo_unitario: 15.75,
        status: "ATIVO",
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      }
    ];
  }
}
const tiposEpiAdapter = new TiposEpiAdapter();
const tiposEpiAdapter$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  tiposEpiAdapter
}, Symbol.toStringTag, { value: "Module" }));
class EstoqueItensAdapter {
  baseEndpoint = "/estoque/itens";
  /**
   * Lista itens de estoque com filtros
   */
  async listarItensEstoque(params) {
    console.log("📦 EstoqueItensAdapter: Listando itens de estoque", params);
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.limit) queryParams.append("limit", params.limit.toString());
      if (params?.search) queryParams.append("search", params.search);
      if (params?.almoxarifado_id)
        queryParams.append("almoxarifado_id", params.almoxarifado_id);
      if (params?.tipo_epi_id)
        queryParams.append("tipo_epi_id", params.tipo_epi_id);
      if (params?.status && params.status !== "todos") {
        queryParams.append("status", params.status);
      }
      if (params?.categoria) queryParams.append("categoria", params.categoria);
      const url = `${this.baseEndpoint}?${queryParams.toString()}`;
      const response = await api.get(url);
      console.log("✅ Itens de estoque listados:", response.data.pagination);
      return {
        data: response.data.items,
        total: response.data.pagination.total,
        page: response.data.pagination.page,
        pageSize: response.data.pagination.limit,
        totalPages: response.data.pagination.totalPages
      };
    } catch (error) {
      console.error("❌ Erro ao listar itens de estoque:", error);
      throw new Error("Não foi possível carregar os itens de estoque");
    }
  }
  /**
   * Obtém itens disponíveis para saída de um almoxarifado específico
   * Focado em transferências e descartes
   */
  async obterItensDisponiveisParaSaida(almoxarifadoId) {
    console.log(
      "🚚 EstoqueItensAdapter: Buscando itens disponíveis para saída",
      almoxarifadoId
    );
    try {
      const response = await this.listarItensEstoque({
        almoxarifado_id: almoxarifadoId,
        status: "DISPONIVEL",
        limit: 100
        // Limite máximo permitido pela API
      });
      const itensDisponiveis = response.data.filter((item) => item.quantidade > 0).map((item) => ({
        value: item.id,
        label: `${item.tipo_epi.nome_equipamento} - ${item.quantidade} disponível`,
        quantidade: item.quantidade,
        equipamento: item.tipo_epi.nome_equipamento,
        categoria: item.tipo_epi.categoria,
        numeroCA: item.tipo_epi.numero_ca,
        almoxarifado: item.almoxarifado.nome,
        almoxarifadoId: item.almoxarifado.id,
        quantidadeMaxima: item.quantidade,
        status: item.status,
        dataValidade: item.data_validade,
        lote: item.lote
      }));
      itensDisponiveis.sort(
        (a, b) => a.equipamento.localeCompare(b.equipamento)
      );
      console.log("✅ Itens disponíveis para saída:", itensDisponiveis.length);
      return itensDisponiveis;
    } catch (error) {
      console.error("❌ Erro ao buscar itens disponíveis para saída:", error);
      return [];
    }
  }
  /**
   * Busca itens de estoque por termo de pesquisa
   */
  async buscarItensEstoque(termo, almoxarifadoId) {
    console.log(
      "🔍 EstoqueItensAdapter: Buscando itens de estoque",
      termo,
      almoxarifadoId
    );
    if (!termo || termo.length < 2) {
      return [];
    }
    try {
      const params = {
        search: termo,
        limit: 20,
        status: "DISPONIVEL",
        almoxarifado_id: almoxarifadoId
      };
      const response = await this.listarItensEstoque(params);
      const opcoes = response.data.map((item) => ({
        value: item.id,
        label: `${item.tipo_epi.nome_equipamento} (${item.quantidade} disponível)`,
        quantidade: item.quantidade,
        equipamento: item.tipo_epi.nome_equipamento,
        categoria: item.tipo_epi.categoria,
        numeroCA: item.tipo_epi.numero_ca,
        almoxarifado: item.almoxarifado.nome,
        almoxarifadoId: item.almoxarifado.id,
        quantidadeMaxima: item.quantidade,
        status: item.status,
        dataValidade: item.data_validade,
        lote: item.lote
      }));
      console.log("✅ Busca realizada, encontrados:", opcoes.length);
      return opcoes;
    } catch (error) {
      console.error("❌ Erro na busca de itens de estoque:", error);
      return [];
    }
  }
  /**
   * Obtém item específico por ID
   */
  async obterItemEstoque(id) {
    console.log("🔍 EstoqueItensAdapter: Buscando item de estoque", id);
    try {
      const response = await api.get(`${this.baseEndpoint}/${id}`);
      console.log(
        "✅ Item de estoque encontrado:",
        response.data.tipo_epi.nome_equipamento
      );
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar item de estoque:", error);
      throw new Error("Não foi possível encontrar o item de estoque");
    }
  }
  /**
   * Valida se uma quantidade pode ser retirada de um item
   */
  async validarQuantidadeDisponivel(itemId, quantidadeDesejada) {
    console.log(
      "✅ EstoqueItensAdapter: Validando quantidade disponível",
      itemId,
      quantidadeDesejada
    );
    try {
      const item = await this.obterItemEstoque(itemId);
      if (item.status !== "DISPONIVEL") {
        return {
          valido: false,
          quantidadeDisponivel: item.quantidade,
          motivo: `Item não está disponível (status: ${item.status})`
        };
      }
      if (quantidadeDesejada > item.quantidade) {
        return {
          valido: false,
          quantidadeDisponivel: item.quantidade,
          motivo: `Quantidade desejada (${quantidadeDesejada}) é maior que a disponível (${item.quantidade})`
        };
      }
      if (quantidadeDesejada <= 0) {
        return {
          valido: false,
          quantidadeDisponivel: item.quantidade,
          motivo: "Quantidade deve ser maior que zero"
        };
      }
      return {
        valido: true,
        quantidadeDisponivel: item.quantidade
      };
    } catch (error) {
      console.error("❌ Erro ao validar quantidade disponível:", error);
      return {
        valido: false,
        quantidadeDisponivel: 0,
        motivo: "Erro ao validar item de estoque"
      };
    }
  }
  /**
   * Obtém itens agrupados por tipo de EPI
   */
  async obterItensAgrupadosPorTipo(almoxarifadoId) {
    console.log(
      "📊 EstoqueItensAdapter: Agrupando itens por tipo de EPI",
      almoxarifadoId
    );
    try {
      const response = await this.listarItensEstoque({
        almoxarifado_id: almoxarifadoId,
        status: "DISPONIVEL",
        limit: 500
      });
      const agrupados = {};
      response.data.forEach((item) => {
        const tipoId = item.tipo_epi.id;
        if (!agrupados[tipoId]) {
          agrupados[tipoId] = {
            tipo_epi: item.tipo_epi,
            itens: [],
            quantidade_total: 0
          };
        }
        agrupados[tipoId].itens.push(item);
        agrupados[tipoId].quantidade_total += item.quantidade;
      });
      console.log(
        "✅ Itens agrupados por tipo:",
        Object.keys(agrupados).length
      );
      return agrupados;
    } catch (error) {
      console.error("❌ Erro ao agrupar itens por tipo:", error);
      return {};
    }
  }
  /**
   * Cache para itens disponíveis por almoxarifado
   */
  itensDisponiveis = {};
  /**
   * Obtém itens disponíveis com cache (útil para modais que abrem/fecham frequentemente)
   */
  async obterItensDisponiveisComCache(almoxarifadoId) {
    const TTL = 2 * 60 * 1e3;
    const now = Date.now();
    const cached = this.itensDisponiveis[almoxarifadoId];
    if (cached && now - cached.timestamp < TTL) {
      console.log(
        "💾 EstoqueItensAdapter: Usando cache para itens disponíveis"
      );
      return cached.data;
    }
    const freshData = await this.obterItensDisponiveisParaSaida(almoxarifadoId);
    this.itensDisponiveis[almoxarifadoId] = {
      data: freshData,
      timestamp: now
    };
    return freshData;
  }
  /**
   * Limpa cache de itens disponíveis
   */
  limparCache(almoxarifadoId) {
    if (almoxarifadoId) {
      delete this.itensDisponiveis[almoxarifadoId];
      console.log(
        "🗑️ EstoqueItensAdapter: Cache limpo para almoxarifado",
        almoxarifadoId
      );
    } else {
      this.itensDisponiveis = {};
      console.log("🗑️ EstoqueItensAdapter: Cache completo limpo");
    }
  }
  /**
   * Alias para compatibilidade com service index
   */
  clearCache() {
    this.limparCache();
  }
  /**
   * Obtém itens com baixo estoque
   */
  async obterItensBaixoEstoque(almoxarifadoId) {
    console.log("⚠️ EstoqueItensAdapter: Buscando itens com baixo estoque");
    try {
      const response = await this.listarItensEstoque({
        almoxarifado_id: almoxarifadoId,
        status: "BAIXO",
        limit: 100
      });
      const opcoes = response.data.map((item) => ({
        value: item.id,
        label: `${item.tipo_epi.nome_equipamento} - ${item.quantidade} restante`,
        quantidade: item.quantidade,
        equipamento: item.tipo_epi.nome_equipamento,
        categoria: item.tipo_epi.categoria,
        numeroCA: item.tipo_epi.numero_ca,
        almoxarifado: item.almoxarifado.nome,
        almoxarifadoId: item.almoxarifado.id,
        quantidadeMaxima: item.quantidade,
        status: item.status,
        dataValidade: item.data_validade,
        lote: item.lote
      }));
      console.log("✅ Itens com baixo estoque:", opcoes.length);
      return opcoes;
    } catch (error) {
      console.error("❌ Erro ao buscar itens com baixo estoque:", error);
      return [];
    }
  }
  /**
   * Verifica disponibilidade em tempo real (útil antes de confirmar transferência)
   */
  async verificarDisponibilidadeRealTime(verificacoes) {
    console.log(
      "🔄 EstoqueItensAdapter: Verificando disponibilidade em tempo real"
    );
    const resultados = await Promise.all(
      verificacoes.map(async (verificacao) => {
        try {
          const validacao = await this.validarQuantidadeDisponivel(
            verificacao.itemId,
            verificacao.quantidade
          );
          return {
            itemId: verificacao.itemId,
            disponivel: validacao.valido,
            quantidadeAtual: validacao.quantidadeDisponivel,
            motivo: validacao.motivo
          };
        } catch (error) {
          return {
            itemId: verificacao.itemId,
            disponivel: false,
            quantidadeAtual: 0,
            motivo: "Erro ao verificar item"
          };
        }
      })
    );
    console.log("✅ Verificação concluída:", resultados.length);
    return resultados;
  }
}
const estoqueItensAdapter = new EstoqueItensAdapter();
const estoqueItensAdapter$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  estoqueItensAdapter
}, Symbol.toStringTag, { value: "Module" }));
function generateTempId() {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
const NotaItensManagerSimplified = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isEntrada;
  let usaTiposEpi;
  let { tipo } = $$props;
  let { almoxarifadoId } = $$props;
  let { itens = [] } = $$props;
  let { readonly = false } = $$props;
  const dispatch = createEventDispatcher();
  let tipoEpiOptions = [];
  let estoqueItensOptions = [];
  let loadingOptions = false;
  let validationErrors = {};
  async function loadOptions() {
    if (!almoxarifadoId && !usaTiposEpi) return;
    try {
      loadingOptions = true;
      if (usaTiposEpi) {
        tipoEpiOptions = await tiposEpiAdapter.obterOpcoesSelectComCache({ apenasAtivos: true });
        console.log("📦 Tipos EPI carregados:", tipoEpiOptions.length);
      } else {
        estoqueItensOptions = await estoqueItensAdapter.obterItensDisponiveisComCache(almoxarifadoId);
        console.log("📦 Itens de estoque carregados:", estoqueItensOptions.length);
      }
    } catch (error) {
      console.error("Erro ao carregar opções:", error);
      dispatch("validationError", "Erro ao carregar opções disponíveis");
    } finally {
      loadingOptions = false;
    }
  }
  function adicionarItem() {
    const novoItem = {
      temp_id: generateTempId(),
      quantidade: 1,
      equipamento_nome: "",
      custo_unitario: isEntrada ? 0 : void 0
    };
    if (usaTiposEpi) {
      novoItem.tipo_epi_id = "";
    } else {
      novoItem.estoque_item_id = "";
    }
    itens = [...itens, novoItem];
    dispatch("itensChanged", itens);
    console.log("➕ Item adicionado:", novoItem.temp_id);
  }
  if ($$props.tipo === void 0 && $$bindings.tipo && tipo !== void 0) $$bindings.tipo(tipo);
  if ($$props.almoxarifadoId === void 0 && $$bindings.almoxarifadoId && almoxarifadoId !== void 0) $$bindings.almoxarifadoId(almoxarifadoId);
  if ($$props.itens === void 0 && $$bindings.itens && itens !== void 0) $$bindings.itens(itens);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  isEntrada = tipo === "ENTRADA";
  usaTiposEpi = isEntrada;
  {
    if (tipo || almoxarifadoId) {
      loadOptions();
    }
  }
  {
    if (itens.length === 0 && !readonly && (tipoEpiOptions.length > 0 || estoqueItensOptions.length > 0)) {
      adicionarItem();
    }
  }
  return `   <div class="space-y-4"> <div class="flex items-center justify-between"><h4 class="text-lg font-semibold text-gray-900 dark:text-white">Itens da Nota
      ${itens.length > 0 ? `${validate_component(Badge, "Badge").$$render($$result, { color: "gray", class: "ml-2 rounded-sm" }, {}, {
    default: () => {
      return `${escape(itens.length)}`;
    }
  })}` : ``}</h4> ${!readonly ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      size: "sm",
      color: "primary",
      class: "rounded-sm",
      disabled: loadingOptions
    },
    {},
    {
      default: () => {
        return `${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
        Adicionar Item`;
      }
    }
  )}` : ``}</div>  ${loadingOptions ? `<div class="text-center py-8" data-svelte-h="svelte-dy1n65"><div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-primary-600 rounded-full" aria-label="loading"><span class="sr-only">Carregando...</span></div> <p class="text-sm text-gray-500 mt-2">Carregando opções...</p></div>` : `${itens.length === 0 ? ` ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "text-center py-8" }, {}, {
    default: () => {
      return `<div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-8 h-8 text-gray-400" }, {}, {})}</div> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">${escape(readonly ? "Nenhum item encontrado" : "Nenhum item adicionado")}</h3> <p class="text-gray-500 dark:text-gray-400 mb-4">${readonly ? `Esta nota não possui itens registrados` : `${escape(usaTiposEpi ? "Adicione EPIs do catálogo" : "Selecione itens do estoque")}`}</p> ${!readonly ? `${validate_component(Button, "Button").$$render(
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
          Adicionar Primeiro Item`;
          }
        }
      )}` : ``}`;
    }
  })}` : ` <div class="space-y-0">${each(itens, (item, index) => {
    return `<div class="w-full border border-gray-200 dark:border-gray-700 rounded-sm p-4 bg-white dark:bg-gray-800"> <div class="flex items-start justify-between mb-4"><h5 class="text-sm font-medium text-gray-900 dark:text-white">Item ${escape(index + 1)} ${item.equipamento_nome ? `<span class="font-normal text-gray-600 dark:text-gray-400">- ${escape(item.equipamento_nome)} </span>` : ``}</h5> ${!readonly && itens.length > 1 ? `<button class="p-1 rounded-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-800/20 transition-colors" title="Remover item">${validate_component(TrashBinOutline, "TrashBinOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button>` : ``}</div>  <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <div class="md:col-span-2"><label for="${"item-select-" + escape(index, true)}" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${escape(usaTiposEpi ? "Tipo de EPI" : "Item do Estoque")}</label> ${validate_component(Select, "Select").$$render(
      $$result,
      {
        id: "item-select-" + index,
        value: usaTiposEpi ? item.tipo_epi_id : item.estoque_item_id,
        disabled: readonly,
        class: "rounded-sm text-sm"
      },
      {},
      {
        default: () => {
          return `<option value="" data-svelte-h="svelte-6uo3hd">Selecione...</option> ${each(usaTiposEpi ? tipoEpiOptions : estoqueItensOptions, (option) => {
            return `<option${add_attribute("value", option.value, 0)}>${escape(option.label)}</option>`;
          })} `;
        }
      }
    )}</div>  <div><label for="${"quantidade-" + escape(index, true)}" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantidade
                ${item.quantidade_disponivel !== void 0 ? `<span class="text-xs text-gray-500">(máx: ${escape(item.quantidade_disponivel)})</span>` : ``}</label> ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "quantidade-" + index,
        type: "number",
        min: "1",
        max: item.quantidade_disponivel || void 0,
        value: item.quantidade,
        disabled: readonly,
        placeholder: "Qtd",
        class: "rounded-sm text-sm"
      },
      {},
      {}
    )}</div>  ${isEntrada ? `<div class="md:col-span-3"><label for="${"custo-" + escape(index, true)}" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Custo Unitário (R$)</label> ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "custo-" + index,
        type: "number",
        min: "0",
        step: "0.01",
        value: item.custo_unitario,
        disabled: readonly,
        placeholder: "Custo unitário (R$)",
        class: "rounded-sm text-sm"
      },
      {},
      {}
    )} </div>` : ``}</div>  ${item.equipamento_nome ? `<div class="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-sm"><div class="flex items-start justify-between"><div><h6 class="text-sm font-medium text-gray-900 dark:text-white">${escape(item.equipamento_nome)}</h6> ${item.categoria ? `<p class="text-xs text-gray-600 dark:text-gray-400">Categoria: ${escape(item.categoria)} </p>` : ``} ${item.numero_ca ? `<p class="text-xs text-gray-600 dark:text-gray-400">CA: ${escape(item.numero_ca)} </p>` : ``}</div>  <div class="text-right"><p class="text-sm font-medium text-gray-900 dark:text-white">Qtd: ${escape(item.quantidade)}</p> ${isEntrada && item.custo_unitario != null && typeof item.custo_unitario === "number" && !isNaN(item.custo_unitario) ? `<p class="text-xs text-gray-600 dark:text-gray-400">Unit: R$ ${escape(item.custo_unitario.toFixed(2))}</p> <p class="text-sm font-medium text-green-600 dark:text-green-400">Total: R$ ${escape((item.quantidade * item.custo_unitario).toFixed(2))} </p>` : ``} ${item.quantidade_disponivel !== void 0 ? `<p class="text-xs text-gray-600 dark:text-gray-400">Disponível: ${escape(item.quantidade_disponivel)} </p>` : ``} </div></div> </div>` : ``}  ${validationErrors[item.temp_id] ? `${validate_component(Alert, "Alert").$$render($$result, { color: "red", class: "mt-3 rounded-sm" }, {}, {
      default: () => {
        return `<span class="text-sm">${escape(validationErrors[item.temp_id])}</span> `;
      }
    })}` : ``} </div>`;
  })}</div>  ${itens.length > 0 ? `<div class="w-full border border-gray-200 dark:border-gray-700 rounded-sm p-4 bg-gray-50 dark:bg-gray-800"><div class="flex justify-between items-center"><div class="flex items-center space-x-4"><span class="text-sm font-medium text-gray-900 dark:text-white">Total de Itens: ${escape(itens.length)}</span> ${isEntrada ? `<span class="text-sm font-medium text-gray-900 dark:text-white">Valor Total: 
                <span class="text-lg font-bold text-green-600 dark:text-green-400">R$ ${escape(itens.reduce(
    (total, item) => {
      const quantidade = item.quantidade || 0;
      const custo = item.custo_unitario != null && typeof item.custo_unitario === "number" && !isNaN(item.custo_unitario) ? item.custo_unitario : 0;
      return total + quantidade * custo;
    },
    0
  ).toFixed(2))}</span></span>` : ``}</div></div></div>` : ``}`}`}</div>`;
});
class AlmoxarifadosAdapter {
  baseEndpoint = "/estoque/almoxarifados";
  /**
   * Lista todos os almoxarifados disponíveis
   *
   * Como o endpoint direto de almoxarifados não existe,
   * extraímos os dados dos itens de estoque
   */
  async listarAlmoxarifados() {
    console.log("🏪 AlmoxarifadosAdapter: Listando almoxarifados via estoque");
    try {
      try {
        console.log("🔍 Tentando endpoint direto:", this.baseEndpoint);
        const response = await api.get(this.baseEndpoint, {
          timeout: 15e3,
          retries: 1
        });
        console.log("📦 Resposta recebida:", response);
        let items = [];
        if (response.success && response.data) {
          items = Array.isArray(response.data) ? response.data : [];
        } else if (Array.isArray(response)) {
          items = response;
        } else {
          console.warn("⚠️ Estrutura de resposta inesperada:", response);
          items = [];
        }
        console.log("🔍 Almoxarifados recebidos do backend:", items.map((a) => ({ id: a.id, nome: a.nome })));
        console.log(
          "✅ Almoxarifados listados via endpoint direto:",
          items.length
        );
        if (items.length === 0) {
          console.warn("⚠️ Nenhum almoxarifado retornado, usando fallback");
          return this.getFallbackAlmoxarifados();
        }
        return items;
      } catch (directError) {
        console.log(
          "⚠️ Endpoint direto não disponível, extraindo de estoque..."
        );
        const estoqueResponse = await api.get("/estoque/itens?limit=100");
        const almoxarifadosMap = /* @__PURE__ */ new Map();
        estoqueResponse.data.items.forEach((item) => {
          const alm = item.almoxarifado;
          if (alm && !almoxarifadosMap.has(alm.id)) {
            almoxarifadosMap.set(alm.id, {
              id: alm.id,
              nome: alm.nome,
              unidadeNegocioId: alm.unidadeNegocioId,
              // ✅ CORREÇÃO: camelCase
              isPrincipal: alm.nome.toLowerCase().includes("central"),
              // ✅ CORREÇÃO: camelCase
              createdAt: (/* @__PURE__ */ new Date()).toISOString(),
              // ✅ CORREÇÃO: camelCase
              unidadeNegocio: {
                id: alm.unidadeNegocio.id,
                nome: alm.unidadeNegocio.nome,
                codigo: alm.unidadeNegocio.codigo
              }
            });
          }
        });
        const items = Array.from(almoxarifadosMap.values());
        console.log("✅ Almoxarifados extraídos do estoque:", items.length);
        return items;
      }
    } catch (error) {
      console.error("❌ Erro ao listar almoxarifados:", error);
      if (error.name === "AbortError" || error.message?.includes("timeout")) {
        console.warn("⚠️ Backend indisponível, usando dados de fallback");
        return this.getFallbackAlmoxarifados();
      }
      throw new Error("Não foi possível carregar os almoxarifados");
    }
  }
  /**
   * Lista almoxarifados com paginação (se necessário)
   */
  async listarAlmoxarifadosPaginados(params) {
    console.log(
      "🏪 AlmoxarifadosAdapter: Listando almoxarifados com paginação",
      params
    );
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.limit) queryParams.append("limit", params.limit.toString());
      if (params?.search) queryParams.append("search", params.search);
      const url = `${this.baseEndpoint}?${queryParams.toString()}`;
      const response = await api.get(url);
      console.log(
        "✅ Almoxarifados paginados listados:",
        response.data.pagination
      );
      return {
        data: response.data.items,
        total: response.data.pagination.total,
        page: response.data.pagination.page,
        pageSize: response.data.pagination.limit,
        totalPages: response.data.pagination.totalPages
      };
    } catch (error) {
      console.error("❌ Erro ao listar almoxarifados paginados:", error);
      throw new Error("Não foi possível carregar os almoxarifados");
    }
  }
  /**
   * Obtém um almoxarifado específico por ID
   */
  async obterAlmoxarifado(id) {
    console.log("🔍 AlmoxarifadosAdapter: Buscando almoxarifado", id);
    try {
      const response = await api.get(`${this.baseEndpoint}/${id}`);
      console.log("✅ Almoxarifado encontrado:", response.data.nome);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar almoxarifado:", error);
      throw new Error("Não foi possível encontrar o almoxarifado");
    }
  }
  /**
   * Converte almoxarifados em opções para componentes Select
   */
  async obterOpcoesSelect() {
    console.log("🔧 AlmoxarifadosAdapter: Carregando opções para select");
    try {
      const almoxarifados = await this.listarAlmoxarifados();
      const opcoes = almoxarifados.map((alm) => ({
        value: alm.id,
        label: alm.nome,
        isPrincipal: alm.isPrincipal,
        // ✅ CORREÇÃO: camelCase
        unidadeNegocio: alm.unidadeNegocio?.nome
        // ✅ CORREÇÃO: camelCase
      }));
      opcoes.sort((a, b) => {
        if (a.isPrincipal && !b.isPrincipal) return -1;
        if (!a.isPrincipal && b.isPrincipal) return 1;
        return a.label.localeCompare(b.label);
      });
      console.log("✅ Opções de select criadas:", opcoes.length);
      return opcoes;
    } catch (error) {
      console.error("❌ Erro ao criar opções de select:", error);
      return [];
    }
  }
  /**
   * Cache para otimizar performance em chamadas frequentes
   */
  selectOptionsCache = null;
  /**
   * Obtém opções para select com cache (TTL 5 minutos)
   */
  async obterOpcoesSelectComCache() {
    const TTL = 5 * 60 * 1e3;
    const now = Date.now();
    if (this.selectOptionsCache && now - this.selectOptionsCache.timestamp < TTL) {
      console.log("💾 AlmoxarifadosAdapter: Usando cache para opções select");
      return this.selectOptionsCache.data;
    }
    const freshData = await this.obterOpcoesSelect();
    this.selectOptionsCache = {
      data: freshData,
      timestamp: now
    };
    return freshData;
  }
  /**
   * Limpa o cache (útil quando dados são modificados)
   */
  limparCache() {
    this.selectOptionsCache = null;
    console.log("🗑️ AlmoxarifadosAdapter: Cache limpo");
  }
  /**
   * Alias para compatibilidade com service index
   */
  clearCache() {
    this.limparCache();
  }
  /**
   * Valida se um almoxarifado existe
   */
  async validarExistencia(id) {
    try {
      await this.obterAlmoxarifado(id);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Obtém almoxarifados principais (is_principal = true)
   */
  async obterAlmoxarifadosPrincipais() {
    console.log("🏆 AlmoxarifadosAdapter: Buscando almoxarifados principais");
    try {
      const todos = await this.listarAlmoxarifados();
      const principais = todos.filter((alm) => alm.isPrincipal);
      console.log(
        "✅ Almoxarifados principais encontrados:",
        principais.length
      );
      return principais;
    } catch (error) {
      console.error("❌ Erro ao buscar almoxarifados principais:", error);
      throw new Error("Não foi possível carregar os almoxarifados principais");
    }
  }
  /**
   * Dados de fallback quando backend está indisponível
   * Baseados na estrutura real do backend
   */
  getFallbackAlmoxarifados() {
    return [
      {
        id: "567a1885-0763-4a13-b9f6-157daa39ddc3",
        nome: "Almoxarifado Central SP",
        unidadeNegocioId: "d42d0657-4671-4026-ae34-61b74806ad9d",
        // ✅ CORREÇÃO: camelCase
        isPrincipal: true,
        // ✅ CORREÇÃO: camelCase
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        // ✅ CORREÇÃO: camelCase
        unidadeNegocio: {
          id: "d42d0657-4671-4026-ae34-61b74806ad9d",
          nome: "Matriz São Paulo",
          codigo: "SP001"
        }
      },
      {
        id: "fallback-2",
        nome: "Almoxarifado Obra (Demo)",
        unidadeNegocioId: "unidade-2",
        // ✅ CORREÇÃO: camelCase
        isPrincipal: false,
        // ✅ CORREÇÃO: camelCase
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        // ✅ CORREÇÃO: camelCase
        unidadeNegocio: {
          id: "unidade-2",
          nome: "Obra A",
          codigo: "OA01"
        }
      }
    ];
  }
}
const almoxarifadosAdapter = new AlmoxarifadosAdapter();
const css = {
  code: '.drawer-notas{top:64px !important;height:calc(100vh - 64px) !important;max-width:940px !important;z-index:50 !important}[role="presentation"].fixed.top-0.start-0.z-50.w-full.h-full{top:64px !important;height:calc(100vh - 64px) !important}',
  map: `{"version":3,"file":"NotesDetailDrawer.svelte","sources":["NotesDetailDrawer.svelte"],"sourcesContent":["<!--\\n  Notes Detail Drawer - Drawer para visualizar/criar/editar notas\\n  \\n  Baseado na arquitetura do FichaDetailPresenter com o padrão estabelecido.\\n  Substitui o modal anterior por um drawer consistente com o resto da aplicação.\\n-->\\n\\n<script lang=\\"ts\\">import { createEventDispatcher, onMount } from \\"svelte\\";\\nimport { Drawer, Badge, Button, Input, Textarea, Label, Radio, Select, Alert } from \\"flowbite-svelte\\";\\nimport {\\n  CheckOutline,\\n  FloppyDiskOutline,\\n  FileDocOutline,\\n  PlusOutline,\\n  ArrowRightOutline\\n} from \\"flowbite-svelte-icons\\";\\nimport DrawerHeader from \\"$lib/components/common/DrawerHeader.svelte\\";\\nimport NotaItensManagerSimplified, {} from \\"./NotaItensManagerSimplified.svelte\\";\\nimport LoadingSpinner from \\"$lib/components/common/LoadingSpinner.svelte\\";\\nimport ErrorDisplay from \\"$lib/components/common/ErrorDisplay.svelte\\";\\nimport { almoxarifadosAdapter } from \\"$lib/services/entity/almoxarifadosAdapter\\";\\nimport { notasMovimentacaoAdapter } from \\"$lib/services/process/notasMovimentacaoAdapter\\";\\nimport { getTipoNotaLabel, getTipoNotaBadgeColor } from \\"$lib/utils/notasHelpers\\";\\nexport let open = false;\\nexport let mode = \\"create\\";\\nexport let tipo = \\"ENTRADA\\";\\nexport let nota = null;\\nexport const loading = false;\\nconst dispatch = createEventDispatcher();\\nlet hidden = !open;\\nlet lastOpen = open;\\n$: if (open !== lastOpen) {\\n  hidden = !open;\\n  lastOpen = open;\\n}\\nlet formData = {\\n  tipo_nota: \\"ENTRADA\\",\\n  almoxarifado_origem_id: \\"\\",\\n  almoxarifado_destino_id: \\"\\",\\n  observacoes: \\"\\",\\n  data_documento: (/* @__PURE__ */ new Date()).toISOString().split(\\"T\\")[0],\\n  itens: []\\n};\\nlet itens = [];\\nlet itemValidationErrors = [];\\nlet formErrors = {};\\nlet showValidationErrors = false;\\nlet almoxarifadoOptions = [];\\nlet almoxarifadoDestinoOptions = [];\\nlet saveLoading = false;\\nlet dataLoading = false;\\nonMount(async () => {\\n  await loadFormData();\\n});\\n$: if (open) {\\n  if (mode === \\"create\\") {\\n    resetForm();\\n  }\\n  loadFormData();\\n}\\nasync function loadFormData() {\\n  dataLoading = true;\\n  try {\\n    const almoxarifadosResponse = await almoxarifadosAdapter.listarAlmoxarifados();\\n    almoxarifadoOptions = almoxarifadosResponse.map((alm) => ({\\n      value: alm.id,\\n      label: alm.nome,\\n      isPrincipal: alm.isPrincipal,\\n      unidadeNegocio: alm.unidadeNegocio?.nome\\n    }));\\n    almoxarifadoOptions.sort((a, b) => {\\n      if (a.isPrincipal && !b.isPrincipal) return -1;\\n      if (!a.isPrincipal && b.isPrincipal) return 1;\\n      return a.label.localeCompare(b.label);\\n    });\\n    almoxarifadoDestinoOptions = almoxarifadoOptions;\\n    console.log(\\"\\\\u{1F4CB} NotesDetailDrawer: Almoxarifados carregados:\\", {\\n      original: almoxarifadosResponse.length,\\n      options: almoxarifadoOptions.length,\\n      principal: almoxarifadoOptions.find((opt) => opt.isPrincipal)?.label || \\"Nenhum\\",\\n      samples: almoxarifadoOptions.slice(0, 2).map((opt) => ({ value: opt.value, label: opt.label, isPrincipal: opt.isPrincipal }))\\n    });\\n    if ((mode === \\"edit\\" || mode === \\"view\\") && nota) {\\n      await loadNotaData();\\n    } else {\\n      formData.tipo_nota = tipo;\\n      if (almoxarifadoOptions.length > 0) {\\n        const almoxarifadoPadrao = almoxarifadoOptions.find((opt) => opt.isPrincipal) || almoxarifadoOptions[0];\\n        if (formData.tipo_nota === \\"ENTRADA\\") {\\n          if (!formData.almoxarifado_destino_id) {\\n            formData.almoxarifado_destino_id = almoxarifadoPadrao.value;\\n          }\\n        } else if (formData.tipo_nota === \\"TRANSFERENCIA\\") {\\n          if (!formData.almoxarifado_origem_id) {\\n            formData.almoxarifado_origem_id = almoxarifadoPadrao.value;\\n          }\\n        } else if (formData.tipo_nota === \\"DESCARTE\\") {\\n          if (!formData.almoxarifado_origem_id) {\\n            formData.almoxarifado_origem_id = almoxarifadoPadrao.value;\\n          }\\n        }\\n      }\\n    }\\n  } catch (error) {\\n    console.error(\\"Erro ao carregar dados do formul\\\\xE1rio:\\", error);\\n    almoxarifadoOptions = [\\n      { value: \\"567a1885-0763-4a13-b9f6-157daa39ddc3\\", label: \\"Almoxarifado Central SP\\", isPrincipal: true },\\n      { value: \\"1a743859-33e6-4ce3-9158-025dee47922b\\", label: \\"Almoxarifado RJ\\", isPrincipal: false }\\n    ];\\n    almoxarifadoDestinoOptions = almoxarifadoOptions;\\n    if (mode !== \\"edit\\") {\\n      formData.tipo_nota = tipo;\\n      const almoxarifadoPadrao = almoxarifadoOptions[0];\\n      if (tipo === \\"ENTRADA\\" && !formData.almoxarifado_destino_id) {\\n        formData.almoxarifado_destino_id = almoxarifadoPadrao.value;\\n      } else if (tipo === \\"TRANSFERENCIA\\" && !formData.almoxarifado_origem_id) {\\n        formData.almoxarifado_origem_id = almoxarifadoPadrao.value;\\n      } else if (tipo === \\"DESCARTE\\" && !formData.almoxarifado_origem_id) {\\n        formData.almoxarifado_origem_id = almoxarifadoPadrao.value;\\n      }\\n    }\\n  } finally {\\n    dataLoading = false;\\n  }\\n}\\nasync function loadNotaData() {\\n  if (!nota) return;\\n  try {\\n    formData = {\\n      tipo_nota: nota.tipo || nota.tipo_nota,\\n      almoxarifado_origem_id: nota.almoxarifado_id || nota.almoxarifadoOrigemId || \\"\\",\\n      almoxarifado_destino_id: nota.almoxarifado_destino_id || nota.almoxarifadoDestinoId || \\"\\",\\n      observacoes: nota.observacoes || \\"\\",\\n      data_documento: nota.data_documento?.split(\\"T\\")[0] || (/* @__PURE__ */ new Date()).toISOString().split(\\"T\\")[0],\\n      itens: []\\n    };\\n    const itemsArray = nota.itens || nota._itens || [];\\n    console.log(\\"\\\\u{1F50D} Items do backend para processar:\\", itemsArray);\\n    if (itemsArray && itemsArray.length > 0) {\\n      const { tiposEpiAdapter } = await import(\\"$lib/services/entity/tiposEpiAdapter\\");\\n      const { estoqueItensAdapter } = await import(\\"$lib/services/entity/estoqueItensAdapter\\");\\n      const enrichedItens = await Promise.all(\\n        itemsArray.map(async (item) => {\\n          console.log(\\"\\\\u{1F50D} Processando item:\\", item);\\n          const baseItem = {\\n            temp_id: \`existing_\${item.id}\`,\\n            tipo_epi_id: item.tipoEpiId || item.tipo_epi_id,\\n            estoque_item_id: item.estoque_item_id,\\n            quantidade: item.quantidade,\\n            custo_unitario: item.custo_unitario || 0,\\n            equipamento_nome: \\"Equipamento n\\\\xE3o identificado\\",\\n            categoria: \\"\\",\\n            numero_ca: \\"N\\\\xE3o informado\\"\\n          };\\n          try {\\n            if (item.tipoEpiId || item.tipo_epi_id) {\\n              const tipoEpiId = item.tipoEpiId || item.tipo_epi_id;\\n              console.log(\\"\\\\u{1F50D} Buscando dados do tipo EPI:\\", tipoEpiId);\\n              const tiposEpiOptions = await tiposEpiAdapter.obterOpcoesSelectComCache({\\n                apenasAtivos: false\\n                // Incluir inativos para visualização\\n              });\\n              const tipoEpi = tiposEpiOptions.find((opt) => opt.value === tipoEpiId);\\n              if (tipoEpi) {\\n                baseItem.equipamento_nome = tipoEpi.label;\\n                baseItem.categoria = tipoEpi.categoria || \\"\\";\\n                baseItem.numero_ca = tipoEpi.numeroCA || \\"N\\\\xE3o informado\\";\\n                console.log(\\"\\\\u2705 Dados do tipo EPI encontrados:\\", tipoEpi.label);\\n              } else {\\n                console.warn(\\"\\\\u26A0\\\\uFE0F Tipo EPI n\\\\xE3o encontrado para ID:\\", tipoEpiId);\\n              }\\n            }\\n            if (item.estoque_item_id && formData.almoxarifado_origem_id) {\\n              const estoqueOptions = await estoqueItensAdapter.obterItensDisponiveisComCache(\\n                formData.almoxarifado_origem_id\\n              );\\n              const estoqueItem = estoqueOptions.find((opt) => opt.value === item.estoque_item_id);\\n              if (estoqueItem) {\\n                baseItem.equipamento_nome = estoqueItem.label;\\n                baseItem.categoria = estoqueItem.categoria || \\"\\";\\n                baseItem.numero_ca = estoqueItem.numeroCA || \\"N\\\\xE3o informado\\";\\n                console.log(\\"\\\\u2705 Dados do estoque encontrados:\\", estoqueItem.label);\\n              }\\n            }\\n          } catch (enrichError) {\\n            console.error(\\"\\\\u274C Erro ao enriquecer item:\\", enrichError);\\n          }\\n          return baseItem;\\n        })\\n      );\\n      itens = enrichedItens;\\n      console.log(\\"\\\\u2705 Itens enriquecidos processados:\\", itens.length);\\n    }\\n  } catch (error) {\\n    console.error(\\"Erro ao carregar dados da nota:\\", error);\\n  }\\n}\\nfunction resetForm() {\\n  const newFormData = {\\n    tipo_nota: tipo,\\n    almoxarifado_origem_id: \\"\\",\\n    almoxarifado_destino_id: \\"\\",\\n    observacoes: \\"\\",\\n    data_documento: (/* @__PURE__ */ new Date()).toISOString().split(\\"T\\")[0],\\n    itens: []\\n  };\\n  formData = newFormData;\\n  itens = [];\\n  formErrors = {};\\n  showValidationErrors = false;\\n  itemValidationErrors = [];\\n}\\nfunction validateRascunho() {\\n  formErrors = {};\\n  itemValidationErrors = [];\\n  if (formData.tipo_nota === \\"TRANSFERENCIA\\" && formData.almoxarifado_origem_id && formData.almoxarifado_destino_id) {\\n    if (formData.almoxarifado_origem_id === formData.almoxarifado_destino_id) {\\n      formErrors.almoxarifado_destino_id = \\"Almoxarifado de destino deve ser diferente do origem\\";\\n    }\\n  }\\n  if (itens.length === 0) {\\n    itemValidationErrors = [\\"\\\\u26A0\\\\uFE0F Rascunho salvo sem itens - adicione itens antes de concluir\\"];\\n  }\\n  return Object.keys(formErrors).length === 0;\\n}\\nfunction validateConcluida() {\\n  formErrors = {};\\n  itemValidationErrors = [];\\n  if (formData.tipo_nota === \\"ENTRADA\\") {\\n    if (!formData.almoxarifado_destino_id) {\\n      formErrors.almoxarifado_destino_id = \\"Almoxarifado de destino \\\\xE9 obrigat\\\\xF3rio para entrada\\";\\n    }\\n  } else if (formData.tipo_nota === \\"TRANSFERENCIA\\") {\\n    if (!formData.almoxarifado_origem_id) {\\n      formErrors.almoxarifado_origem_id = \\"Almoxarifado de origem \\\\xE9 obrigat\\\\xF3rio para transfer\\\\xEAncia\\";\\n    }\\n    if (!formData.almoxarifado_destino_id) {\\n      formErrors.almoxarifado_destino_id = \\"Almoxarifado de destino \\\\xE9 obrigat\\\\xF3rio para transfer\\\\xEAncia\\";\\n    }\\n    if (formData.almoxarifado_origem_id === formData.almoxarifado_destino_id) {\\n      formErrors.almoxarifado_destino_id = \\"Almoxarifado de destino deve ser diferente do origem\\";\\n    }\\n  } else if (formData.tipo_nota === \\"DESCARTE\\") {\\n    if (!formData.almoxarifado_origem_id) {\\n      formErrors.almoxarifado_origem_id = \\"Almoxarifado de origem \\\\xE9 obrigat\\\\xF3rio para descarte\\";\\n    }\\n  }\\n  if (!formData.data_documento) {\\n    formErrors.data_documento = \\"Data do documento \\\\xE9 obrigat\\\\xF3ria\\";\\n  }\\n  if (itens.length === 0) {\\n    itemValidationErrors = [\\"Pelo menos um item deve ser adicionado para concluir a nota\\"];\\n    return false;\\n  }\\n  if (formData.tipo_nota === \\"ENTRADA\\") {\\n    const itensSemCusto = itens.filter((item) => !item.custo_unitario || item.custo_unitario <= 0);\\n    if (itensSemCusto.length > 0) {\\n      itemValidationErrors = [\`\${itensSemCusto.length} \${itensSemCusto.length === 1 ? \\"item n\\\\xE3o possui\\" : \\"itens n\\\\xE3o possuem\\"} custo unit\\\\xE1rio v\\\\xE1lido\`];\\n      return false;\\n    }\\n  }\\n  return Object.keys(formErrors).length === 0;\\n}\\nasync function handleSaveRascunho() {\\n  if (!validateRascunho()) {\\n    showValidationErrors = true;\\n    return;\\n  }\\n  showValidationErrors = itemValidationErrors.length > 0;\\n  await saveNota(\\"rascunho\\");\\n}\\nasync function handleSaveConcluida() {\\n  if (!validateConcluida()) {\\n    showValidationErrors = true;\\n    return;\\n  }\\n  await saveNota(\\"concluida\\");\\n}\\nasync function saveNota(modo) {\\n  saveLoading = true;\\n  try {\\n    const notaData = {\\n      tipo_nota: formData.tipo_nota,\\n      data_documento: formData.data_documento\\n    };\\n    if (formData.observacoes && formData.observacoes.trim() !== \\"\\") {\\n      notaData.observacoes = formData.observacoes.trim();\\n    }\\n    if (formData.tipo_nota === \\"ENTRADA\\") {\\n      if (formData.almoxarifado_destino_id) {\\n        notaData.almoxarifado_destino_id = formData.almoxarifado_destino_id;\\n      }\\n    } else if (formData.tipo_nota === \\"TRANSFERENCIA\\") {\\n      if (formData.almoxarifado_origem_id) {\\n        notaData.almoxarifado_origem_id = formData.almoxarifado_origem_id;\\n      }\\n      if (formData.almoxarifado_destino_id) {\\n        notaData.almoxarifado_destino_id = formData.almoxarifado_destino_id;\\n      }\\n    } else if (formData.tipo_nota === \\"DESCARTE\\") {\\n      if (formData.almoxarifado_origem_id) {\\n        notaData.almoxarifado_origem_id = formData.almoxarifado_origem_id;\\n      }\\n    }\\n    let notaId;\\n    if (mode === \\"create\\") {\\n      const response = await notasMovimentacaoAdapter.criarNota(notaData);\\n      console.log(\\"\\\\u{1F4DD} Resposta da cria\\\\xE7\\\\xE3o da nota:\\", response);\\n      notaId = response?.data?.id || response?.id || response?.data?.uuid || response?.uuid;\\n      if (!notaId) {\\n        console.error(\\"\\\\u274C N\\\\xE3o foi poss\\\\xEDvel extrair o ID da nota criada:\\", response);\\n        throw new Error(\\"Erro: ID da nota n\\\\xE3o encontrado na resposta do servidor\\");\\n      }\\n      console.log(\\"\\\\u2705 Nota criada com ID:\\", notaId);\\n      if (itens.length > 0) {\\n        for (const item of itens) {\\n          const itemData = {\\n            tipo_epi_id: item.tipo_epi_id,\\n            estoque_item_id: item.estoque_item_id,\\n            quantidade: item.quantidade,\\n            custo_unitario: item.custo_unitario\\n          };\\n          await notasMovimentacaoAdapter.adicionarItem(notaId, itemData);\\n        }\\n      }\\n      if (modo === \\"concluida\\") {\\n        await notasMovimentacaoAdapter.concluirNota(notaId);\\n      }\\n    } else {\\n      if (!nota?.id) {\\n        throw new Error(\\"ID da nota n\\\\xE3o encontrado\\");\\n      }\\n      await notasMovimentacaoAdapter.atualizarNota(nota.id, {\\n        data_documento: notaData.data_documento,\\n        observacoes: notaData.observacoes\\n      });\\n      notaId = nota.id;\\n    }\\n    dispatch(\\"salvar\\", { notaId, modo });\\n  } catch (error) {\\n    console.error(\\"Erro ao salvar nota:\\", error);\\n    throw error;\\n  } finally {\\n    saveLoading = false;\\n  }\\n}\\nfunction handleClose() {\\n  dispatch(\\"close\\");\\n}\\nfunction handleCancel() {\\n  dispatch(\\"cancelar\\");\\n}\\nfunction handleItensChange(event) {\\n  itens = event.detail;\\n  formData.itens = itens;\\n  if (itens.length > 0) {\\n    itemValidationErrors = [];\\n  }\\n}\\nfunction handleItensValidationChange(event) {\\n  if (event.detail) {\\n    itemValidationErrors = [event.detail];\\n  } else {\\n    itemValidationErrors = [];\\n  }\\n}\\n$: drawerTitle = mode === \\"create\\" ? \`Nova Nota - \${getTipoNotaLabel(formData.tipo_nota)}\` : mode === \\"edit\\" ? \`Editar Nota - \${getTipoNotaLabel(formData.tipo_nota)}\` : \`Visualizar Nota - \${getTipoNotaLabel(formData.tipo_nota)}\`;\\n$: totalItens = itens.length;\\n$: valorTotal = itens.reduce((total, item) => {\\n  const custo = typeof item.custo_unitario === \\"number\\" ? item.custo_unitario : 0;\\n  return total + item.quantidade * custo;\\n}, 0);\\n$: canSave = !saveLoading && !dataLoading && mode !== \\"view\\";\\n$: primaryAction = mode === \\"view\\" ? null : {\\n  text: \\"Concluir\\",\\n  icon: \\"CheckOutline\\",\\n  disabled: !canSave\\n};\\n$: secondaryAction = mode === \\"view\\" ? null : {\\n  text: \\"Salvar Rascunho\\",\\n  icon: \\"FloppyDiskOutline\\",\\n  disabled: !canSave\\n};\\n$: statusText = mode === \\"create\\" ? \\"NOVA\\" : mode === \\"edit\\" ? \\"EDITANDO\\" : nota?.status || \\"VISUALIZANDO\\";\\n$: additionalInfo = [\\n  \`\${totalItens} \${totalItens === 1 ? \\"item\\" : \\"itens\\"}\`,\\n  valorTotal > 0 ? \`R$ \${valorTotal.toFixed(2)}\` : \\"Sem valor\\"\\n];\\n$: almoxarifadoDestinoFiltrado = almoxarifadoDestinoOptions.filter(\\n  (alm) => alm.value !== formData.almoxarifado_origem_id\\n);\\n<\/script>\\n\\n<style>\\n  :global(.drawer-notas) {\\n    top: 64px !important; /* Altura do header */\\n    height: calc(100vh - 64px) !important;\\n    max-width: 940px !important;\\n    z-index: 50 !important;\\n  }\\n  \\n  /* Ajustar backdrop para não cobrir header - seletor mais específico */\\n  :global([role=\\"presentation\\"].fixed.top-0.start-0.z-50.w-full.h-full) {\\n    top: 64px !important; /* Começar abaixo do header */\\n    height: calc(100vh - 64px) !important;\\n  }\\n</style>\\n\\n<Drawer \\n  bind:hidden \\n  placement=\\"right\\" \\n  width=\\"w-full max-w-[940px]\\"\\n  backdrop={true}\\n  activateClickOutside={true}\\n  bgOpacity=\\"bg-black/50\\"\\n  position=\\"fixed\\"\\n  id=\\"notas-detail-drawer\\"\\n  class=\\"drawer-notas\\"\\n>\\n  <!-- Header -->\\n  <DrawerHeader\\n    title={drawerTitle}\\n    objectType=\\"NOTA DE MOVIMENTAÇÃO\\"\\n    iconName=\\"FileDocOutline\\"\\n    status={statusText}\\n    statusType=\\"movimento\\"\\n    {additionalInfo}\\n    {primaryAction}\\n    {secondaryAction}\\n    on:close={handleClose}\\n    on:primaryAction={handleSaveConcluida}\\n    on:secondaryAction={handleSaveRascunho}\\n  />\\n\\n  {#if dataLoading}\\n    <div class=\\"flex justify-center items-center py-12\\">\\n      <LoadingSpinner />\\n    </div>\\n  {:else}\\n    <!-- Validation Errors -->\\n    {#if showValidationErrors && (Object.keys(formErrors).length > 0 || itemValidationErrors.length > 0)}\\n      <div class=\\"p-6 pb-0\\">\\n        <Alert color=\\"red\\" class=\\"rounded-sm\\">\\n          <span class=\\"font-medium\\">Erros de validação:</span>\\n          <ul class=\\"mt-2 list-disc list-inside\\">\\n            {#each Object.values(formErrors) as error}\\n              <li>{error}</li>\\n            {/each}\\n            {#each itemValidationErrors as error}\\n              <li>{error}</li>\\n            {/each}\\n          </ul>\\n        </Alert>\\n      </div>\\n    {/if}\\n\\n    <!-- Content Container -->\\n    <div class=\\"p-6 space-y-6\\">\\n\\n      {#if mode === 'view'}\\n        <!-- VIEW MODE: Interface de leitura limpa -->\\n        \\n        <!-- Dados Básicos da Nota -->\\n        <div class=\\"space-y-4\\">\\n          <h3 class=\\"text-lg font-semibold text-gray-900 dark:text-white\\">Informações da Nota</h3>\\n          \\n          <div class=\\"bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4\\">\\n            <div class=\\"grid grid-cols-1 md:grid-cols-2 gap-6\\">\\n              <!-- Tipo de Nota -->\\n              <div>\\n                <dt class=\\"text-sm font-medium text-gray-500 dark:text-gray-400\\">Tipo de Nota</dt>\\n                <dd class=\\"mt-1 text-sm text-gray-900 dark:text-white\\">\\n                  <Badge \\n                    color={getTipoNotaBadgeColor(formData.tipo_nota)} \\n                    class=\\"w-fit rounded-sm font-medium\\"\\n                  >\\n                    {getTipoNotaLabel(formData.tipo_nota)}\\n                  </Badge>\\n                </dd>\\n              </div>\\n\\n              <!-- Data do Documento -->\\n              <div>\\n                <dt class=\\"text-sm font-medium text-gray-500 dark:text-gray-400\\">Data do Documento</dt>\\n                <dd class=\\"mt-1 text-sm text-gray-900 dark:text-white\\">\\n                  {new Date(formData.data_documento).toLocaleDateString('pt-BR')}\\n                </dd>\\n              </div>\\n\\n              <!-- Almoxarifado de Origem -->\\n              {#if formData.almoxarifado_origem_id}\\n                <div>\\n                  <dt class=\\"text-sm font-medium text-gray-500 dark:text-gray-400\\">Almoxarifado de Origem</dt>\\n                  <dd class=\\"mt-1 text-sm text-gray-900 dark:text-white\\">\\n                    {almoxarifadoOptions.find(opt => opt.value === formData.almoxarifado_origem_id)?.label || 'Não identificado'}\\n                    {#if almoxarifadoOptions.find(opt => opt.value === formData.almoxarifado_origem_id)?.isPrincipal}\\n                      <span class=\\"text-xs text-primary-600 dark:text-primary-400 font-medium ml-1\\">(Principal)</span>\\n                    {/if}\\n                  </dd>\\n                </div>\\n              {/if}\\n\\n              <!-- Almoxarifado de Destino -->\\n              {#if formData.almoxarifado_destino_id}\\n                <div>\\n                  <dt class=\\"text-sm font-medium text-gray-500 dark:text-gray-400\\">Almoxarifado de Destino</dt>\\n                  <dd class=\\"mt-1 text-sm text-gray-900 dark:text-white\\">\\n                    {almoxarifadoOptions.find(opt => opt.value === formData.almoxarifado_destino_id)?.label || 'Não identificado'}\\n                    {#if almoxarifadoOptions.find(opt => opt.value === formData.almoxarifado_destino_id)?.isPrincipal}\\n                      <span class=\\"text-xs text-primary-600 dark:text-primary-400 font-medium ml-1\\">(Principal)</span>\\n                    {/if}\\n                  </dd>\\n                </div>\\n              {/if}\\n\\n              <!-- Observações -->\\n              {#if formData.observacoes}\\n                <div class=\\"md:col-span-2\\">\\n                  <dt class=\\"text-sm font-medium text-gray-500 dark:text-gray-400\\">Observações</dt>\\n                  <dd class=\\"mt-1 text-sm text-gray-900 dark:text-white\\">\\n                    {formData.observacoes}\\n                  </dd>\\n                </div>\\n              {/if}\\n            </div>\\n          </div>\\n        </div>\\n\\n        <!-- Itens da Nota -->\\n        <div class=\\"space-y-4\\">\\n          <h3 class=\\"text-lg font-semibold text-gray-900 dark:text-white\\">\\n            Itens da Nota\\n            {#if totalItens > 0}\\n              <Badge color=\\"gray\\" class=\\"ml-2 rounded-sm\\">{totalItens}</Badge>\\n            {/if}\\n          </h3>\\n          \\n          {#if itens.length === 0}\\n            <!-- Estado vazio para visualização -->\\n            <div class=\\"bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center\\">\\n              <div class=\\"w-12 h-12 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center\\">\\n                <FileDocOutline class=\\"w-6 h-6 text-gray-400\\" />\\n              </div>\\n              <h4 class=\\"text-sm font-medium text-gray-900 dark:text-white mb-1\\">Nenhum item encontrado</h4>\\n              <p class=\\"text-xs text-gray-500 dark:text-gray-400\\">Esta nota não possui itens registrados</p>\\n            </div>\\n          {:else}\\n            <!-- Lista de itens para visualização -->\\n            <div class=\\"space-y-3\\">\\n              {#each itens as item, index}\\n                <div class=\\"bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4\\">\\n                  <div class=\\"flex items-start justify-between\\">\\n                    <div class=\\"flex-1\\">\\n                      <div class=\\"flex items-center gap-3 mb-2\\">\\n                        <span class=\\"text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded\\">\\n                          Item {index + 1}\\n                        </span>\\n                        <h4 class=\\"font-medium text-gray-900 dark:text-white\\">\\n                          {item.equipamento_nome || 'Equipamento não identificado'}\\n                        </h4>\\n                      </div>\\n                      \\n                      <div class=\\"grid grid-cols-1 md:grid-cols-3 gap-4 text-sm\\">\\n                        <div>\\n                          <dt class=\\"text-gray-500 dark:text-gray-400\\">Categoria</dt>\\n                          <dd class=\\"text-gray-900 dark:text-white\\">\\n                            {item.categoria || 'Não informado'}\\n                          </dd>\\n                        </div>\\n                        <div>\\n                          <dt class=\\"text-gray-500 dark:text-gray-400\\">Número CA</dt>\\n                          <dd class=\\"text-gray-900 dark:text-white\\">\\n                            {item.numero_ca || 'Não informado'}\\n                          </dd>\\n                        </div>\\n                        <div>\\n                          <dt class=\\"text-gray-500 dark:text-gray-400\\">Quantidade</dt>\\n                          <dd class=\\"text-gray-900 dark:text-white font-medium\\">\\n                            {item.quantidade}\\n                          </dd>\\n                        </div>\\n                        {#if formData.tipo_nota === 'ENTRADA' && item.custo_unitario}\\n                          <div>\\n                            <dt class=\\"text-gray-500 dark:text-gray-400\\">Custo Unitário</dt>\\n                            <dd class=\\"text-gray-900 dark:text-white\\">\\n                              R$ {item.custo_unitario.toFixed(2)}\\n                            </dd>\\n                          </div>\\n                          <div>\\n                            <dt class=\\"text-gray-500 dark:text-gray-400\\">Valor Total</dt>\\n                            <dd class=\\"text-green-600 dark:text-green-400 font-medium\\">\\n                              R$ {(item.quantidade * item.custo_unitario).toFixed(2)}\\n                            </dd>\\n                          </div>\\n                        {/if}\\n                      </div>\\n                    </div>\\n                  </div>\\n                </div>\\n              {/each}\\n            </div>\\n          {/if}\\n        </div>\\n\\n        <!-- Resumo Total -->\\n        {#if totalItens > 0}\\n          <div class=\\"bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800 p-4\\">\\n            <div class=\\"flex items-center justify-between\\">\\n              <div class=\\"flex items-center gap-6\\">\\n                <div class=\\"text-center\\">\\n                  <div class=\\"text-2xl font-bold text-primary-600 dark:text-primary-400\\">\\n                    {totalItens}\\n                  </div>\\n                  <div class=\\"text-xs text-primary-600 dark:text-primary-400 font-medium\\">\\n                    {totalItens === 1 ? 'Item' : 'Itens'}\\n                  </div>\\n                </div>\\n                {#if valorTotal > 0}\\n                  <div class=\\"text-center\\">\\n                    <div class=\\"text-2xl font-bold text-green-600 dark:text-green-400\\">\\n                      R$ {valorTotal.toFixed(2)}\\n                    </div>\\n                    <div class=\\"text-xs text-green-600 dark:text-green-400 font-medium\\">\\n                      Valor Total\\n                    </div>\\n                  </div>\\n                {/if}\\n              </div>\\n            </div>\\n          </div>\\n        {/if}\\n\\n      {:else}\\n        <!-- EDIT/CREATE MODE: Interface de formulário -->\\n        \\n        <!-- Dados Básicos -->\\n        <div class=\\"space-y-4\\">\\n          <h3 class=\\"text-lg font-semibold text-gray-900 dark:text-white\\">Dados da Nota</h3>\\n          \\n          <div class=\\"grid grid-cols-1 md:grid-cols-2 gap-4\\">\\n            <!-- Tipo -->\\n            <div>\\n              <Label for=\\"tipo_nota\\" class=\\"mb-2 text-gray-900 dark:text-white\\">Tipo de Nota</Label>\\n              <Select\\n                id=\\"tipo_nota\\"\\n                bind:value={formData.tipo_nota}\\n                disabled={mode === 'view'}\\n                class=\\"rounded-sm {formErrors.tipo_nota ? 'border-red-500' : ''}\\"\\n              >\\n                <option value=\\"ENTRADA\\">Entrada</option>\\n                <option value=\\"TRANSFERENCIA\\">Transferência</option>\\n                <option value=\\"DESCARTE\\">Descarte</option>\\n              </Select>\\n              {#if formErrors.tipo_nota}\\n                <p class=\\"text-red-500 dark:text-red-400 text-sm mt-1\\">{formErrors.tipo_nota}</p>\\n              {/if}\\n            </div>\\n\\n            <!-- Data do Documento -->\\n            <div>\\n              <Label for=\\"data_documento\\" class=\\"mb-2 text-gray-900 dark:text-white\\">Data do Documento</Label>\\n              <Input\\n                id=\\"data_documento\\"\\n                type=\\"date\\"\\n                size=\\"md\\"\\n                bind:value={formData.data_documento}\\n                disabled={mode === 'view'}\\n                class=\\"rounded-sm h-10 text-sm {formErrors.data_documento ? 'border-red-500' : ''}\\"\\n              />\\n              {#if formErrors.data_documento}\\n                <p class=\\"text-red-500 dark:text-red-400 text-sm mt-1\\">{formErrors.data_documento}</p>\\n              {/if}\\n            </div>\\n\\n            <!-- Almoxarifado - baseado no tipo de nota -->\\n            {#if formData.tipo_nota === 'ENTRADA'}\\n              <!-- Para ENTRADA: Radio buttons para almoxarifado de destino -->\\n              <div>\\n                <Label class=\\"mb-3 text-gray-900 dark:text-white\\">\\n                  Almoxarifado de Destino\\n                </Label>\\n                <div class=\\"space-y-2\\">\\n                  {#each almoxarifadoOptions as option}\\n                    <div class=\\"flex items-center\\">\\n                      <Radio\\n                        name=\\"almoxarifado_destino_id\\"\\n                        value={option.value}\\n                        bind:group={formData.almoxarifado_destino_id}\\n                        disabled={mode === 'view'}\\n                        class=\\"text-primary-600 focus:ring-primary-500\\"\\n                      />\\n                      <Label class=\\"ml-2 text-sm text-gray-900 dark:text-white\\">\\n                        {option.label}\\n                        {#if option.isPrincipal}\\n                          <span class=\\"text-xs text-primary-600 dark:text-primary-400 font-medium ml-1\\">(Principal)</span>\\n                        {/if}\\n                      </Label>\\n                    </div>\\n                  {/each}\\n                </div>\\n                {#if formErrors.almoxarifado_destino_id}\\n                  <p class=\\"text-red-500 dark:text-red-400 text-sm mt-2\\">{formErrors.almoxarifado_destino_id}</p>\\n                {/if}\\n              </div>\\n            {:else}\\n              <!-- Para TRANSFERENCIA e DESCARTE: Radio buttons para almoxarifado de origem -->\\n              <div>\\n                <Label class=\\"mb-3 text-gray-900 dark:text-white\\">\\n                  Almoxarifado de Origem\\n                </Label>\\n                <div class=\\"space-y-2\\">\\n                  {#each almoxarifadoOptions as option}\\n                    <div class=\\"flex items-center\\">\\n                      <Radio\\n                        name=\\"almoxarifado_origem_id\\"\\n                        value={option.value}\\n                        bind:group={formData.almoxarifado_origem_id}\\n                        disabled={mode === 'view'}\\n                        class=\\"text-primary-600 focus:ring-primary-500\\"\\n                      />\\n                      <Label class=\\"ml-2 text-sm text-gray-900 dark:text-white\\">\\n                        {option.label}\\n                        {#if option.isPrincipal}\\n                          <span class=\\"text-xs text-primary-600 dark:text-primary-400 font-medium ml-1\\">(Principal)</span>\\n                        {/if}\\n                      </Label>\\n                    </div>\\n                  {/each}\\n                </div>\\n                {#if formErrors.almoxarifado_origem_id}\\n                  <p class=\\"text-red-500 dark:text-red-400 text-sm mt-2\\">{formErrors.almoxarifado_origem_id}</p>\\n                {/if}\\n              </div>\\n            {/if}\\n\\n            <!-- Almoxarifado Destino (apenas para transferência) -->\\n            {#if formData.tipo_nota === 'TRANSFERENCIA'}\\n              <div>\\n                <Label class=\\"mb-3 text-gray-900 dark:text-white\\">Almoxarifado de Destino</Label>\\n                <div class=\\"space-y-2\\">\\n                  {#each almoxarifadoDestinoFiltrado as option}\\n                    <div class=\\"flex items-center\\">\\n                      <Radio\\n                        name=\\"almoxarifado_destino_id\\"\\n                        value={option.value}\\n                        bind:group={formData.almoxarifado_destino_id}\\n                        disabled={mode === 'view'}\\n                        class=\\"text-primary-600 focus:ring-primary-500\\"\\n                      />\\n                      <Label class=\\"ml-2 text-sm text-gray-900 dark:text-white\\">\\n                        {option.label}\\n                        {#if option.isPrincipal}\\n                          <span class=\\"text-xs text-primary-600 dark:text-primary-400 font-medium ml-1\\">(Principal)</span>\\n                        {/if}\\n                      </Label>\\n                    </div>\\n                  {/each}\\n                </div>\\n                {#if formErrors.almoxarifado_destino_id}\\n                  <p class=\\"text-red-500 dark:text-red-400 text-sm mt-2\\">{formErrors.almoxarifado_destino_id}</p>\\n                {/if}\\n              </div>\\n            {/if}\\n          </div>\\n\\n          <!-- Observações (campo único, não obrigatório) -->\\n          <div>\\n            <Label for=\\"observacoes\\" class=\\"mb-2 text-gray-900 dark:text-white\\">\\n              Observações \\n              <span class=\\"text-xs text-gray-500 dark:text-gray-400\\">(opcional)</span>\\n            </Label>\\n            <Textarea\\n              id=\\"observacoes\\"\\n              bind:value={formData.observacoes}\\n              disabled={mode === 'view'}\\n              placeholder=\\"Observações sobre a movimentação...\\"\\n              rows=\\"3\\"\\n              class=\\"rounded-sm {formErrors.observacoes ? 'border-red-500' : ''}\\"\\n            />\\n            {#if formErrors.observacoes}\\n              <p class=\\"text-red-500 dark:text-red-400 text-sm mt-1\\">{formErrors.observacoes}</p>\\n            {/if}\\n          </div>\\n        </div>\\n\\n        <!-- Itens Manager -->\\n        <div class=\\"border-t border-gray-200 dark:border-gray-700 pt-6\\">\\n          <NotaItensManagerSimplified\\n            bind:itens\\n            tipo={formData.tipo_nota}\\n            almoxarifadoId={formData.tipo_nota === 'ENTRADA' ? formData.almoxarifado_destino_id : formData.almoxarifado_origem_id}\\n            readonly={mode === 'view'}\\n            on:itensChanged={handleItensChange}\\n            on:validationError={handleItensValidationChange}\\n          />\\n        </div>\\n\\n        <!-- Resumo -->\\n        {#if totalItens > 0}\\n          <div class=\\"bg-gray-50 dark:bg-gray-800 rounded-lg p-4\\">\\n            <h4 class=\\"font-medium text-gray-900 dark:text-white mb-2\\">Resumo</h4>\\n            <div class=\\"grid grid-cols-2 gap-4 text-sm\\">\\n              <div>\\n                <span class=\\"text-gray-600 dark:text-gray-400\\">Total de itens:</span>\\n                <span class=\\"font-medium ml-2\\">{totalItens}</span>\\n              </div>\\n              <div>\\n                <span class=\\"text-gray-600 dark:text-gray-400\\">Valor total:</span>\\n                <span class=\\"font-medium ml-2 text-green-600 dark:text-green-400\\">\\n                  R$ {valorTotal.toFixed(2)}\\n                </span>\\n              </div>\\n            </div>\\n          </div>\\n        {/if}\\n      {/if}\\n    </div>\\n  {/if}\\n</Drawer>"],"names":[],"mappings":"AA0YU,aAAe,CACrB,GAAG,CAAE,IAAI,CAAC,UAAU,CACpB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAAU,CACrC,SAAS,CAAE,KAAK,CAAC,UAAU,CAC3B,OAAO,CAAE,EAAE,CAAC,UACd,CAGQ,4DAA8D,CACpE,GAAG,CAAE,IAAI,CAAC,UAAU,CACpB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAC7B"}`
};
const NotesDetailDrawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let drawerTitle;
  let totalItens;
  let valorTotal;
  let canSave;
  let primaryAction;
  let secondaryAction;
  let statusText;
  let additionalInfo;
  let almoxarifadoDestinoFiltrado;
  let { open = false } = $$props;
  let { mode = "create" } = $$props;
  let { tipo = "ENTRADA" } = $$props;
  let { nota = null } = $$props;
  const loading = false;
  createEventDispatcher();
  let hidden = !open;
  let lastOpen = open;
  let formData = {
    tipo_nota: "ENTRADA",
    almoxarifado_origem_id: "",
    almoxarifado_destino_id: "",
    observacoes: "",
    data_documento: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    itens: []
  };
  let itens = [];
  let itemValidationErrors = [];
  let formErrors = {};
  let showValidationErrors = false;
  let almoxarifadoOptions = [];
  let almoxarifadoDestinoOptions = [];
  let dataLoading = false;
  async function loadFormData() {
    dataLoading = true;
    try {
      const almoxarifadosResponse = await almoxarifadosAdapter.listarAlmoxarifados();
      almoxarifadoOptions = almoxarifadosResponse.map((alm) => ({
        value: alm.id,
        label: alm.nome,
        isPrincipal: alm.isPrincipal,
        unidadeNegocio: alm.unidadeNegocio?.nome
      }));
      almoxarifadoOptions.sort((a, b) => {
        if (a.isPrincipal && !b.isPrincipal) return -1;
        if (!a.isPrincipal && b.isPrincipal) return 1;
        return a.label.localeCompare(b.label);
      });
      almoxarifadoDestinoOptions = almoxarifadoOptions;
      console.log("📋 NotesDetailDrawer: Almoxarifados carregados:", {
        original: almoxarifadosResponse.length,
        options: almoxarifadoOptions.length,
        principal: almoxarifadoOptions.find((opt) => opt.isPrincipal)?.label || "Nenhum",
        samples: almoxarifadoOptions.slice(0, 2).map((opt) => ({
          value: opt.value,
          label: opt.label,
          isPrincipal: opt.isPrincipal
        }))
      });
      if ((mode === "edit" || mode === "view") && nota) {
        await loadNotaData();
      } else {
        formData.tipo_nota = tipo;
        if (almoxarifadoOptions.length > 0) {
          const almoxarifadoPadrao = almoxarifadoOptions.find((opt) => opt.isPrincipal) || almoxarifadoOptions[0];
          if (formData.tipo_nota === "ENTRADA") {
            if (!formData.almoxarifado_destino_id) {
              formData.almoxarifado_destino_id = almoxarifadoPadrao.value;
            }
          } else if (formData.tipo_nota === "TRANSFERENCIA") {
            if (!formData.almoxarifado_origem_id) {
              formData.almoxarifado_origem_id = almoxarifadoPadrao.value;
            }
          } else if (formData.tipo_nota === "DESCARTE") {
            if (!formData.almoxarifado_origem_id) {
              formData.almoxarifado_origem_id = almoxarifadoPadrao.value;
            }
          }
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados do formulário:", error);
      almoxarifadoOptions = [
        {
          value: "567a1885-0763-4a13-b9f6-157daa39ddc3",
          label: "Almoxarifado Central SP",
          isPrincipal: true
        },
        {
          value: "1a743859-33e6-4ce3-9158-025dee47922b",
          label: "Almoxarifado RJ",
          isPrincipal: false
        }
      ];
      almoxarifadoDestinoOptions = almoxarifadoOptions;
      if (mode !== "edit") {
        formData.tipo_nota = tipo;
        const almoxarifadoPadrao = almoxarifadoOptions[0];
        if (tipo === "ENTRADA" && !formData.almoxarifado_destino_id) {
          formData.almoxarifado_destino_id = almoxarifadoPadrao.value;
        } else if (tipo === "TRANSFERENCIA" && !formData.almoxarifado_origem_id) {
          formData.almoxarifado_origem_id = almoxarifadoPadrao.value;
        } else if (tipo === "DESCARTE" && !formData.almoxarifado_origem_id) {
          formData.almoxarifado_origem_id = almoxarifadoPadrao.value;
        }
      }
    } finally {
      dataLoading = false;
    }
  }
  async function loadNotaData() {
    if (!nota) return;
    try {
      formData = {
        tipo_nota: nota.tipo || nota.tipo_nota,
        almoxarifado_origem_id: nota.almoxarifado_id || nota.almoxarifadoOrigemId || "",
        almoxarifado_destino_id: nota.almoxarifado_destino_id || nota.almoxarifadoDestinoId || "",
        observacoes: nota.observacoes || "",
        data_documento: nota.data_documento?.split("T")[0] || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        itens: []
      };
      const itemsArray = nota.itens || nota._itens || [];
      console.log("🔍 Items do backend para processar:", itemsArray);
      if (itemsArray && itemsArray.length > 0) {
        const { tiposEpiAdapter: tiposEpiAdapter2 } = await Promise.resolve().then(() => tiposEpiAdapter$1);
        const { estoqueItensAdapter: estoqueItensAdapter2 } = await Promise.resolve().then(() => estoqueItensAdapter$1);
        const enrichedItens = await Promise.all(itemsArray.map(async (item) => {
          console.log("🔍 Processando item:", item);
          const baseItem = {
            temp_id: `existing_${item.id}`,
            tipo_epi_id: item.tipoEpiId || item.tipo_epi_id,
            estoque_item_id: item.estoque_item_id,
            quantidade: item.quantidade,
            custo_unitario: item.custo_unitario || 0,
            equipamento_nome: "Equipamento não identificado",
            categoria: "",
            numero_ca: "Não informado"
          };
          try {
            if (item.tipoEpiId || item.tipo_epi_id) {
              const tipoEpiId = item.tipoEpiId || item.tipo_epi_id;
              console.log("🔍 Buscando dados do tipo EPI:", tipoEpiId);
              const tiposEpiOptions = await tiposEpiAdapter2.obterOpcoesSelectComCache({ apenasAtivos: false });
              const tipoEpi = tiposEpiOptions.find((opt) => opt.value === tipoEpiId);
              if (tipoEpi) {
                baseItem.equipamento_nome = tipoEpi.label;
                baseItem.categoria = tipoEpi.categoria || "";
                baseItem.numero_ca = tipoEpi.numeroCA || "Não informado";
                console.log("✅ Dados do tipo EPI encontrados:", tipoEpi.label);
              } else {
                console.warn("⚠️ Tipo EPI não encontrado para ID:", tipoEpiId);
              }
            }
            if (item.estoque_item_id && formData.almoxarifado_origem_id) {
              const estoqueOptions = await estoqueItensAdapter2.obterItensDisponiveisComCache(formData.almoxarifado_origem_id);
              const estoqueItem = estoqueOptions.find((opt) => opt.value === item.estoque_item_id);
              if (estoqueItem) {
                baseItem.equipamento_nome = estoqueItem.label;
                baseItem.categoria = estoqueItem.categoria || "";
                baseItem.numero_ca = estoqueItem.numeroCA || "Não informado";
                console.log("✅ Dados do estoque encontrados:", estoqueItem.label);
              }
            }
          } catch (enrichError) {
            console.error("❌ Erro ao enriquecer item:", enrichError);
          }
          return baseItem;
        }));
        itens = enrichedItens;
        console.log("✅ Itens enriquecidos processados:", itens.length);
      }
    } catch (error) {
      console.error("Erro ao carregar dados da nota:", error);
    }
  }
  function resetForm() {
    const newFormData = {
      tipo_nota: tipo,
      almoxarifado_origem_id: "",
      almoxarifado_destino_id: "",
      observacoes: "",
      data_documento: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      itens: []
    };
    formData = newFormData;
    itens = [];
    formErrors = {};
    showValidationErrors = false;
    itemValidationErrors = [];
  }
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
  if ($$props.tipo === void 0 && $$bindings.tipo && tipo !== void 0) $$bindings.tipo(tipo);
  if ($$props.nota === void 0 && $$bindings.nota && nota !== void 0) $$bindings.nota(nota);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (open !== lastOpen) {
        hidden = !open;
        lastOpen = open;
      }
    }
    {
      if (open) {
        if (mode === "create") {
          resetForm();
        }
        loadFormData();
      }
    }
    drawerTitle = mode === "create" ? `Nova Nota - ${getTipoNotaLabel(formData.tipo_nota)}` : mode === "edit" ? `Editar Nota - ${getTipoNotaLabel(formData.tipo_nota)}` : `Visualizar Nota - ${getTipoNotaLabel(formData.tipo_nota)}`;
    totalItens = itens.length;
    valorTotal = itens.reduce(
      (total, item) => {
        const custo = typeof item.custo_unitario === "number" ? item.custo_unitario : 0;
        return total + item.quantidade * custo;
      },
      0
    );
    canSave = !dataLoading && mode !== "view";
    primaryAction = mode === "view" ? null : {
      text: "Concluir",
      icon: "CheckOutline",
      disabled: !canSave
    };
    secondaryAction = mode === "view" ? null : {
      text: "Salvar Rascunho",
      icon: "FloppyDiskOutline",
      disabled: !canSave
    };
    statusText = mode === "create" ? "NOVA" : mode === "edit" ? "EDITANDO" : nota?.status || "VISUALIZANDO";
    additionalInfo = [
      `${totalItens} ${totalItens === 1 ? "item" : "itens"}`,
      valorTotal > 0 ? `R$ ${valorTotal.toFixed(2)}` : "Sem valor"
    ];
    almoxarifadoDestinoFiltrado = almoxarifadoDestinoOptions.filter((alm) => alm.value !== formData.almoxarifado_origem_id);
    $$rendered = `   ${validate_component(Drawer, "Drawer").$$render(
      $$result,
      {
        placement: "right",
        width: "w-full max-w-[940px]",
        backdrop: true,
        activateClickOutside: true,
        bgOpacity: "bg-black/50",
        position: "fixed",
        id: "notas-detail-drawer",
        class: "drawer-notas",
        hidden
      },
      {
        hidden: ($$value) => {
          hidden = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return ` ${validate_component(DrawerHeader, "DrawerHeader").$$render(
            $$result,
            {
              title: drawerTitle,
              objectType: "NOTA DE MOVIMENTAÇÃO",
              iconName: "FileDocOutline",
              status: statusText,
              statusType: "movimento",
              additionalInfo,
              primaryAction,
              secondaryAction
            },
            {},
            {}
          )} ${dataLoading ? `<div class="flex justify-center items-center py-12">${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}</div>` : ` ${showValidationErrors && (Object.keys(formErrors).length > 0 || itemValidationErrors.length > 0) ? `<div class="p-6 pb-0">${validate_component(Alert, "Alert").$$render($$result, { color: "red", class: "rounded-sm" }, {}, {
            default: () => {
              return `<span class="font-medium" data-svelte-h="svelte-19ugpdw">Erros de validação:</span> <ul class="mt-2 list-disc list-inside">${each(Object.values(formErrors), (error) => {
                return `<li>${escape(error)}</li>`;
              })} ${each(itemValidationErrors, (error) => {
                return `<li>${escape(error)}</li>`;
              })}</ul>`;
            }
          })}</div>` : ``}  <div class="p-6 space-y-6">${mode === "view" ? `  <div class="space-y-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white" data-svelte-h="svelte-8lkdze">Informações da Nota</h3> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div><dt class="text-sm font-medium text-gray-500 dark:text-gray-400" data-svelte-h="svelte-pciq5c">Tipo de Nota</dt> <dd class="mt-1 text-sm text-gray-900 dark:text-white">${validate_component(Badge, "Badge").$$render(
            $$result,
            {
              color: getTipoNotaBadgeColor(formData.tipo_nota),
              class: "w-fit rounded-sm font-medium"
            },
            {},
            {
              default: () => {
                return `${escape(getTipoNotaLabel(formData.tipo_nota))}`;
              }
            }
          )}</dd></div>  <div><dt class="text-sm font-medium text-gray-500 dark:text-gray-400" data-svelte-h="svelte-1vn6ac2">Data do Documento</dt> <dd class="mt-1 text-sm text-gray-900 dark:text-white">${escape(new Date(formData.data_documento).toLocaleDateString("pt-BR"))}</dd></div>  ${formData.almoxarifado_origem_id ? `<div><dt class="text-sm font-medium text-gray-500 dark:text-gray-400" data-svelte-h="svelte-h81xpe">Almoxarifado de Origem</dt> <dd class="mt-1 text-sm text-gray-900 dark:text-white">${escape(almoxarifadoOptions.find((opt) => opt.value === formData.almoxarifado_origem_id)?.label || "Não identificado")} ${almoxarifadoOptions.find((opt) => opt.value === formData.almoxarifado_origem_id)?.isPrincipal ? `<span class="text-xs text-primary-600 dark:text-primary-400 font-medium ml-1" data-svelte-h="svelte-quypfn">(Principal)</span>` : ``}</dd></div>` : ``}  ${formData.almoxarifado_destino_id ? `<div><dt class="text-sm font-medium text-gray-500 dark:text-gray-400" data-svelte-h="svelte-11el58n">Almoxarifado de Destino</dt> <dd class="mt-1 text-sm text-gray-900 dark:text-white">${escape(almoxarifadoOptions.find((opt) => opt.value === formData.almoxarifado_destino_id)?.label || "Não identificado")} ${almoxarifadoOptions.find((opt) => opt.value === formData.almoxarifado_destino_id)?.isPrincipal ? `<span class="text-xs text-primary-600 dark:text-primary-400 font-medium ml-1" data-svelte-h="svelte-quypfn">(Principal)</span>` : ``}</dd></div>` : ``}  ${formData.observacoes ? `<div class="md:col-span-2"><dt class="text-sm font-medium text-gray-500 dark:text-gray-400" data-svelte-h="svelte-1sl8lih">Observações</dt> <dd class="mt-1 text-sm text-gray-900 dark:text-white">${escape(formData.observacoes)}</dd></div>` : ``}</div></div></div>  <div class="space-y-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Itens da Nota
            ${totalItens > 0 ? `${validate_component(Badge, "Badge").$$render($$result, { color: "gray", class: "ml-2 rounded-sm" }, {}, {
            default: () => {
              return `${escape(totalItens)}`;
            }
          })}` : ``}</h3> ${itens.length === 0 ? ` <div class="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center"><div class="w-12 h-12 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">${validate_component(FileDocOutline, "FileDocOutline").$$render($$result, { class: "w-6 h-6 text-gray-400" }, {}, {})}</div> <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-1" data-svelte-h="svelte-6duyuw">Nenhum item encontrado</h4> <p class="text-xs text-gray-500 dark:text-gray-400" data-svelte-h="svelte-1ej1x9">Esta nota não possui itens registrados</p></div>` : ` <div class="space-y-3">${each(itens, (item, index) => {
            return `<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"><div class="flex items-start justify-between"><div class="flex-1"><div class="flex items-center gap-3 mb-2"><span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">Item ${escape(index + 1)}</span> <h4 class="font-medium text-gray-900 dark:text-white">${escape(item.equipamento_nome || "Equipamento não identificado")} </h4></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"><div><dt class="text-gray-500 dark:text-gray-400" data-svelte-h="svelte-14lljjz">Categoria</dt> <dd class="text-gray-900 dark:text-white">${escape(item.categoria || "Não informado")} </dd></div> <div><dt class="text-gray-500 dark:text-gray-400" data-svelte-h="svelte-1pq153">Número CA</dt> <dd class="text-gray-900 dark:text-white">${escape(item.numero_ca || "Não informado")} </dd></div> <div><dt class="text-gray-500 dark:text-gray-400" data-svelte-h="svelte-6gds52">Quantidade</dt> <dd class="text-gray-900 dark:text-white font-medium">${escape(item.quantidade)} </dd></div> ${formData.tipo_nota === "ENTRADA" && item.custo_unitario ? `<div><dt class="text-gray-500 dark:text-gray-400" data-svelte-h="svelte-yy8rn">Custo Unitário</dt> <dd class="text-gray-900 dark:text-white">R$ ${escape(item.custo_unitario.toFixed(2))} </dd></div> <div><dt class="text-gray-500 dark:text-gray-400" data-svelte-h="svelte-11k0zp4">Valor Total</dt> <dd class="text-green-600 dark:text-green-400 font-medium">R$ ${escape((item.quantidade * item.custo_unitario).toFixed(2))}</dd> </div>` : ``}</div> </div></div> </div>`;
          })}</div>`}</div>  ${totalItens > 0 ? `<div class="bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800 p-4"><div class="flex items-center justify-between"><div class="flex items-center gap-6"><div class="text-center"><div class="text-2xl font-bold text-primary-600 dark:text-primary-400">${escape(totalItens)}</div> <div class="text-xs text-primary-600 dark:text-primary-400 font-medium">${escape(totalItens === 1 ? "Item" : "Itens")}</div></div> ${valorTotal > 0 ? `<div class="text-center"><div class="text-2xl font-bold text-green-600 dark:text-green-400">R$ ${escape(valorTotal.toFixed(2))}</div> <div class="text-xs text-green-600 dark:text-green-400 font-medium" data-svelte-h="svelte-1vt3ayj">Valor Total</div></div>` : ``}</div></div></div>` : ``}` : `  <div class="space-y-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white" data-svelte-h="svelte-in15tf">Dados da Nota</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "tipo_nota",
              class: "mb-2 text-gray-900 dark:text-white"
            },
            {},
            {
              default: () => {
                return `Tipo de Nota`;
              }
            }
          )} ${validate_component(Select, "Select").$$render(
            $$result,
            {
              id: "tipo_nota",
              disabled: mode === "view",
              class: "rounded-sm " + (formErrors.tipo_nota ? "border-red-500" : ""),
              value: formData.tipo_nota
            },
            {
              value: ($$value) => {
                formData.tipo_nota = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `<option value="ENTRADA" data-svelte-h="svelte-qgq2us">Entrada</option> <option value="TRANSFERENCIA" data-svelte-h="svelte-4m889r">Transferência</option> <option value="DESCARTE" data-svelte-h="svelte-urwv3a">Descarte</option>`;
              }
            }
          )} ${formErrors.tipo_nota ? `<p class="text-red-500 dark:text-red-400 text-sm mt-1">${escape(formErrors.tipo_nota)}</p>` : ``}</div>  <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "data_documento",
              class: "mb-2 text-gray-900 dark:text-white"
            },
            {},
            {
              default: () => {
                return `Data do Documento`;
              }
            }
          )} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "data_documento",
              type: "date",
              size: "md",
              disabled: mode === "view",
              class: "rounded-sm h-10 text-sm " + (formErrors.data_documento ? "border-red-500" : ""),
              value: formData.data_documento
            },
            {
              value: ($$value) => {
                formData.data_documento = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${formErrors.data_documento ? `<p class="text-red-500 dark:text-red-400 text-sm mt-1">${escape(formErrors.data_documento)}</p>` : ``}</div>  ${formData.tipo_nota === "ENTRADA" ? ` <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              class: "mb-3 text-gray-900 dark:text-white"
            },
            {},
            {
              default: () => {
                return `Almoxarifado de Destino`;
              }
            }
          )} <div class="space-y-2">${each(almoxarifadoOptions, (option) => {
            return `<div class="flex items-center">${validate_component(Radio, "Radio").$$render(
              $$result,
              {
                name: "almoxarifado_destino_id",
                value: option.value,
                disabled: mode === "view",
                class: "text-primary-600 focus:ring-primary-500",
                group: formData.almoxarifado_destino_id
              },
              {
                group: ($$value) => {
                  formData.almoxarifado_destino_id = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Label, "Label").$$render(
              $$result,
              {
                class: "ml-2 text-sm text-gray-900 dark:text-white"
              },
              {},
              {
                default: () => {
                  return `${escape(option.label)} ${option.isPrincipal ? `<span class="text-xs text-primary-600 dark:text-primary-400 font-medium ml-1" data-svelte-h="svelte-quypfn">(Principal)</span>` : ``} `;
                }
              }
            )} </div>`;
          })}</div> ${formErrors.almoxarifado_destino_id ? `<p class="text-red-500 dark:text-red-400 text-sm mt-2">${escape(formErrors.almoxarifado_destino_id)}</p>` : ``}</div>` : ` <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              class: "mb-3 text-gray-900 dark:text-white"
            },
            {},
            {
              default: () => {
                return `Almoxarifado de Origem`;
              }
            }
          )} <div class="space-y-2">${each(almoxarifadoOptions, (option) => {
            return `<div class="flex items-center">${validate_component(Radio, "Radio").$$render(
              $$result,
              {
                name: "almoxarifado_origem_id",
                value: option.value,
                disabled: mode === "view",
                class: "text-primary-600 focus:ring-primary-500",
                group: formData.almoxarifado_origem_id
              },
              {
                group: ($$value) => {
                  formData.almoxarifado_origem_id = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Label, "Label").$$render(
              $$result,
              {
                class: "ml-2 text-sm text-gray-900 dark:text-white"
              },
              {},
              {
                default: () => {
                  return `${escape(option.label)} ${option.isPrincipal ? `<span class="text-xs text-primary-600 dark:text-primary-400 font-medium ml-1" data-svelte-h="svelte-quypfn">(Principal)</span>` : ``} `;
                }
              }
            )} </div>`;
          })}</div> ${formErrors.almoxarifado_origem_id ? `<p class="text-red-500 dark:text-red-400 text-sm mt-2">${escape(formErrors.almoxarifado_origem_id)}</p>` : ``}</div>`}  ${formData.tipo_nota === "TRANSFERENCIA" ? `<div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              class: "mb-3 text-gray-900 dark:text-white"
            },
            {},
            {
              default: () => {
                return `Almoxarifado de Destino`;
              }
            }
          )} <div class="space-y-2">${each(almoxarifadoDestinoFiltrado, (option) => {
            return `<div class="flex items-center">${validate_component(Radio, "Radio").$$render(
              $$result,
              {
                name: "almoxarifado_destino_id",
                value: option.value,
                disabled: mode === "view",
                class: "text-primary-600 focus:ring-primary-500",
                group: formData.almoxarifado_destino_id
              },
              {
                group: ($$value) => {
                  formData.almoxarifado_destino_id = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Label, "Label").$$render(
              $$result,
              {
                class: "ml-2 text-sm text-gray-900 dark:text-white"
              },
              {},
              {
                default: () => {
                  return `${escape(option.label)} ${option.isPrincipal ? `<span class="text-xs text-primary-600 dark:text-primary-400 font-medium ml-1" data-svelte-h="svelte-quypfn">(Principal)</span>` : ``} `;
                }
              }
            )} </div>`;
          })}</div> ${formErrors.almoxarifado_destino_id ? `<p class="text-red-500 dark:text-red-400 text-sm mt-2">${escape(formErrors.almoxarifado_destino_id)}</p>` : ``}</div>` : ``}</div>  <div>${validate_component(Label, "Label").$$render(
            $$result,
            {
              for: "observacoes",
              class: "mb-2 text-gray-900 dark:text-white"
            },
            {},
            {
              default: () => {
                return `Observações 
              <span class="text-xs text-gray-500 dark:text-gray-400" data-svelte-h="svelte-1313n1d">(opcional)</span>`;
              }
            }
          )} ${validate_component(Textarea, "Textarea").$$render(
            $$result,
            {
              id: "observacoes",
              disabled: mode === "view",
              placeholder: "Observações sobre a movimentação...",
              rows: "3",
              class: "rounded-sm " + (formErrors.observacoes ? "border-red-500" : ""),
              value: formData.observacoes
            },
            {
              value: ($$value) => {
                formData.observacoes = $$value;
                $$settled = false;
              }
            },
            {}
          )} ${formErrors.observacoes ? `<p class="text-red-500 dark:text-red-400 text-sm mt-1">${escape(formErrors.observacoes)}</p>` : ``}</div></div>  <div class="border-t border-gray-200 dark:border-gray-700 pt-6">${validate_component(NotaItensManagerSimplified, "NotaItensManagerSimplified").$$render(
            $$result,
            {
              tipo: formData.tipo_nota,
              almoxarifadoId: formData.tipo_nota === "ENTRADA" ? formData.almoxarifado_destino_id : formData.almoxarifado_origem_id,
              readonly: mode === "view",
              itens
            },
            {
              itens: ($$value) => {
                itens = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div>  ${totalItens > 0 ? `<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"><h4 class="font-medium text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-3i5efz">Resumo</h4> <div class="grid grid-cols-2 gap-4 text-sm"><div><span class="text-gray-600 dark:text-gray-400" data-svelte-h="svelte-18up8m1">Total de itens:</span> <span class="font-medium ml-2">${escape(totalItens)}</span></div> <div><span class="text-gray-600 dark:text-gray-400" data-svelte-h="svelte-j9jcfb">Valor total:</span> <span class="font-medium ml-2 text-green-600 dark:text-green-400">R$ ${escape(valorTotal.toFixed(2))}</span></div></div></div>` : ``}`}</div>`}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const BackendStatusIndicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { visible = false } = $$props;
  let { message = "Backend indisponível - usando dados de demonstração" } = $$props;
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0) $$bindings.visible(visible);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  return `  ${visible ? `${validate_component(Alert, "Alert").$$render($$result, { color: "yellow", class: "mb-4" }, {}, {
    icon: () => {
      return `${validate_component(ExclamationCircleOutline, "ExclamationCircleOutline").$$render($$result, { slot: "icon", class: "w-4 h-4" }, {}, {})}`;
    },
    default: () => {
      return `<span class="font-medium" data-svelte-h="svelte-u3uqae">Modo Offline:</span> ${escape(message)} <span class="block text-sm mt-1" data-svelte-h="svelte-rrnpjt">O sistema está funcionando com dados de demonstração. As operações serão limitadas até que a conexão seja restabelecida.</span>`;
    }
  })}` : ``}`;
});
const NotesContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasActiveFilters;
  let presentationData;
  let $notesStore, $$unsubscribe_notesStore;
  let { initialPageSize = 20 } = $$props;
  createEventDispatcher();
  const notesStore = createPaginatedStore((params) => notasMovimentacaoAdapter.listarNotas(params), {
    initialPageSize,
    enableCache: true,
    cacheTimeout: 3 * 60 * 1e3,
    // 3 minutos
    debounceDelay: 300
  });
  $$unsubscribe_notesStore = subscribe(notesStore, (value) => $notesStore = value);
  let searchTerm = "";
  let tipoFilter = "todas";
  let statusFilter = "todos";
  let responsavelFilter = "todos";
  let almoxarifadoFilter = "todos";
  let dataInicioFilter = "";
  let dataFimFilter = "";
  let activeTab = 0;
  let showNotaDrawer = false;
  let drawerMode = "create";
  let drawerTipo = "ENTRADA";
  let selectedNota = null;
  let notaFormLoading = false;
  let usingFallbackData = false;
  let filterOptions = {
    responsaveis: [
      {
        value: "todos",
        label: "Todos os Responsáveis"
      }
    ],
    almoxarifados: [
      {
        value: "todos",
        label: "Todos os Almoxarifados"
      }
    ],
    tipos: [],
    status: []
  };
  onDestroy(() => {
  });
  if ($$props.initialPageSize === void 0 && $$bindings.initialPageSize && initialPageSize !== void 0) $$bindings.initialPageSize(initialPageSize);
  hasActiveFilters = dataFimFilter !== "";
  {
    {
      if ($notesStore.items.some((item) => item.id.startsWith("fallback-"))) {
        usingFallbackData = true;
      }
    }
  }
  presentationData = {
    items: $notesStore.items,
    loading: $notesStore.loading,
    error: $notesStore.error,
    pagination: {
      currentPage: $notesStore.page,
      totalPages: $notesStore.totalPages,
      pageSize: $notesStore.pageSize,
      total: $notesStore.total,
      hasNext: notesStore.hasNext(),
      hasPrev: notesStore.hasPrev()
    },
    filters: {
      searchTerm,
      tipoFilter,
      statusFilter,
      responsavelFilter,
      almoxarifadoFilter,
      dataInicioFilter,
      dataFimFilter,
      hasActiveFilters,
      activeTab
    },
    filterOptions
  };
  $$unsubscribe_notesStore();
  return `   ${validate_component(BackendStatusIndicator, "BackendStatusIndicator").$$render($$result, { visible: usingFallbackData }, {}, {})}  ${validate_component(NotesTablePresenter, "NotesTablePresenter").$$render(
    $$result,
    {
      items: presentationData.items,
      loading: presentationData.loading,
      error: presentationData.error,
      pagination: presentationData.pagination,
      filters: presentationData.filters,
      filterOptions: presentationData.filterOptions
    },
    {},
    {}
  )}  ${validate_component(NotesDetailDrawer, "NotesDetailDrawer").$$render(
    $$result,
    {
      open: showNotaDrawer,
      mode: drawerMode,
      tipo: drawerTipo,
      nota: selectedNota,
      loading: notaFormLoading
    },
    {},
    {}
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` ${validate_component(NotesContainer, "NotesContainer").$$render($$result, { initialPageSize: 10 }, {}, {})}`;
});
export {
  Page as default
};
