import { c as create_ssr_component, i as createEventDispatcher, v as validate_component, h as escape, l as each, k as subscribe } from "../../../chunks/ssr.js";
import { a as api } from "../../../chunks/apiClient.js";
import { L as LoadingSpinner, E as ErrorDisplay, R as RefreshOutline, T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, g as createPaginatedStore } from "../../../chunks/ErrorDisplay.js";
import { I as Input } from "../../../chunks/modalStore.js";
import { a as Button, B as Badge } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { C as Checkbox } from "../../../chunks/Checkbox.js";
import { S as SearchOutline, a as SearchableDropdown, E as EyeOutline } from "../../../chunks/DrawerHeader.svelte_svelte_type_style_lang.js";
import { P as PlusOutline } from "../../../chunks/PlusOutline.js";
class FichaTransformAdapter {
  /**
   * Transforma lista de fichas do backend para frontend
   */
  transformFichasList(rawData) {
    if (!rawData?.success || !rawData?.data?.items || !Array.isArray(rawData.data.items)) {
      console.log("❌ Transform: Invalid data structure");
      return {
        items: [],
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0
      };
    }
    const transformedItems = rawData.data.items.map(this.transformFichaBasica);
    return {
      items: transformedItems,
      total: rawData.data.pagination?.total || rawData.data.items.length,
      page: rawData.data.pagination?.page || 1,
      pageSize: rawData.data.pagination?.limit || 10,
      totalPages: rawData.data.pagination?.totalPages || Math.ceil((rawData.data.pagination?.total || rawData.data.items.length) / (rawData.data.pagination?.limit || 10))
    };
  }
  /**
   * Transforma resultados de busca
   */
  transformSearchResults(rawData) {
    if (!rawData?.data?.items) {
      return [];
    }
    return rawData.data.items.map(this.transformFichaBasica);
  }
  /**
   * Transforma uma ficha individual para formato básico
   */
  transformFichaBasica = (rawFicha) => {
    return {
      id: rawFicha.id || "",
      status: rawFicha.status || "inativa",
      statusDisplay: this.transformStatusDisplay(rawFicha.status),
      colaborador: {
        nome: rawFicha.colaborador?.nome || "",
        cpf: rawFicha.colaborador?.cpf || "",
        cpfDisplay: this.formatCPF(rawFicha.colaborador?.cpf || ""),
        matricula: rawFicha.colaborador?.matricula || "",
        cargo: rawFicha.colaborador?.cargo || "",
        empresa: rawFicha.contratada?.nome || rawFicha.colaborador?.empresa || "",
        iniciais: this.extractInitials(rawFicha.colaborador?.nome || "")
      },
      estatisticas: {
        totalEntregas: rawFicha.estatisticas?.totalEntregas || 0,
        itensAtivos: rawFicha.totalEpisAtivos || rawFicha.estatisticas?.itensAtivos || 0,
        devolucoesPendentes: rawFicha.estatisticas?.devolucoesPendentes || 0
      },
      // 🔧 CORREÇÃO: Adicionar totalEpisAtivos na raiz para compatibilidade com FichaEPIDTO
      totalEpisAtivos: rawFicha.totalEpisAtivos || rawFicha.estatisticas?.itensAtivos || 0,
      dataAtualizacao: rawFicha.dataAtualizacao || rawFicha.createdAt || (/* @__PURE__ */ new Date()).toISOString()
    };
  };
  /**
   * Transforma status para display
   */
  transformStatusDisplay(status) {
    const statusMap = {
      "ativa": { cor: "green", label: "Ativa" },
      "inativa": { cor: "gray", label: "Inativa" },
      "vencida": { cor: "red", label: "Vencida" },
      "pendente_devolucao": { cor: "yellow", label: "Pendente Devolução" }
    };
    return statusMap[status] || { cor: "gray", label: "Indefinido" };
  }
  /**
   * Formata CPF para exibição
   */
  formatCPF(cpf) {
    if (!cpf) return "";
    const cleanCPF = cpf.replace(/\D/g, "");
    if (cleanCPF.length !== 11) return cpf;
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  /**
   * Extrai iniciais do nome
   */
  extractInitials(nome) {
    if (!nome) return "";
    return nome.split(" ").filter((part) => part.length > 0).map((part) => part[0].toUpperCase()).slice(0, 2).join("");
  }
  /**
   * Transforma resposta completa de ficha
   */
  transformFichaComplete(rawData) {
    if (!rawData?.success || !rawData?.data) {
      throw new Error("Dados de ficha completa inválidos");
    }
    const processedData = rawData.data;
    return {
      success: true,
      data: {
        // ✅ CORRIGIDO: Usar dados da ficha já processados pelo backend
        ficha: processedData.ficha || {},
        // ✅ NOVO: Transformar entregas para incluir campos esperados pelo frontend
        entregas: this.transformEntregas(processedData.entregas || []),
        // ✅ CORREÇÃO: Extrair devoluções do histórico já que o backend não está populando corretamente
        devolucoes: this.extractDevolucoes(processedData.historico || []),
        equipamentosEmPosse: processedData.equipamentosEmPosse || [],
        // ✅ NOVO: Transformar histórico para incluir campos esperados pelo frontend
        historico: this.transformHistorico(processedData.historico || []),
        estatisticas: processedData.estatisticas || {}
      }
    };
  }
  /**
   * Transforma dados de entregas da API para o formato esperado pelo frontend
   */
  transformEntregas(entregas) {
    return entregas.map((entrega) => ({
      ...entrega,
      // Adicionar campos esperados pelo frontend
      numero: entrega.id || "",
      dataEntrega: this.formatDate(entrega.dataEntrega),
      statusDisplay: this.transformStatusEntrega(entrega.status),
      acoes: this.getAcoesEntrega(entrega.status),
      itens: entrega.itens?.map((item) => ({
        ...item,
        quantidade: item.quantidadeEntregue || 1,
        nomeEquipamento: entrega.tipoEpi?.nome || "EPI não identificado",
        numeroCA: entrega.tipoEpi?.codigo || "",
        registroCA: entrega.tipoEpi?.codigo || ""
      })) || []
    }));
  }
  /**
   * Transforma dados de histórico da API para o formato esperado pelo frontend
   */
  transformHistorico(historico) {
    return historico.map((evento) => ({
      ...evento,
      dataFormatada: this.formatDate(evento.dataAcao),
      tipoDisplay: {
        tipo: evento.tipoAcao,
        label: this.getTipoEventoLabel(evento.tipoAcao),
        cor: this.getTipoEventoCor(evento.tipoAcao)
      },
      acao: evento.descricao || "",
      responsavel: evento.responsavel?.nome || "Sistema",
      detalhes: {
        resumo: evento.descricao || ""
      }
    }));
  }
  /**
   * Transforma status de entrega para display
   */
  transformStatusEntrega(status) {
    const statusMap = {
      "PENDENTE_ASSINATURA": { cor: "yellow", label: "Pendente Assinatura" },
      "ASSINADA": { cor: "green", label: "Assinada" },
      "CANCELADA": { cor: "red", label: "Cancelada" },
      "RASCUNHO": { cor: "gray", label: "Rascunho" }
    };
    return statusMap[status] || { cor: "gray", label: status };
  }
  /**
   * Determina ações disponíveis para uma entrega baseado no status
   */
  getAcoesEntrega(status) {
    switch (status) {
      case "PENDENTE_ASSINATURA":
        return ["assinar", "editar", "imprimir"];
      case "ASSINADA":
        return ["imprimir"];
      case "RASCUNHO":
        return ["editar"];
      default:
        return ["imprimir"];
    }
  }
  /**
   * Formata data para exibição
   */
  formatDate(dateString) {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
    } catch {
      return dateString;
    }
  }
  /**
   * Obtém label do tipo de evento
   */
  getTipoEventoLabel(tipoAcao) {
    const labelMap = {
      "CRIACAO": "Criação",
      "ENTREGA": "Entrega",
      "DEVOLUCAO": "Devolução",
      "EDICAO": "Edição",
      "CANCELAMENTO": "Cancelamento",
      "ALTERACAO_STATUS": "Alteração de Status",
      "ITEM_VENCIDO": "Item Vencido"
    };
    return labelMap[tipoAcao] || tipoAcao;
  }
  /**
   * Obtém cor do tipo de evento
   */
  getTipoEventoCor(tipoAcao) {
    const corMap = {
      "CRIACAO": "blue",
      "ENTREGA": "green",
      "DEVOLUCAO": "orange",
      "EDICAO": "yellow",
      "CANCELAMENTO": "red",
      "ALTERACAO_STATUS": "purple",
      "ITEM_VENCIDO": "red"
    };
    return corMap[tipoAcao] || "gray";
  }
  /**
   * Extrai devoluções do histórico para popular a tab "Devoluções"
   * 🔧 CORREÇÃO: O backend não está populando o array devolucoes, mas as devoluções estão no histórico
   */
  extractDevolucoes(historico) {
    const devolucoes = historico.filter((evento) => evento.tipoAcao === "DEVOLUCAO");
    return devolucoes.map((devolucao) => ({
      id: devolucao.id,
      nomeEquipamento: devolucao.detalhes?.tipoEpiNome || "EPI não identificado",
      numeroCA: "N/A",
      // Não disponível no histórico atual
      categoria: "N/A",
      // Não disponível no histórico atual
      dataDevolucao: this.formatDate(devolucao.dataAcao),
      motivoDisplay: this.getMotivoDevolucao(devolucao.descricao),
      status: "processada",
      // Devoluções no histórico já foram processadas
      condicaoItem: "BOM",
      // Não especificado no histórico
      observacoes: devolucao.descricao || "",
      entregaId: devolucao.detalhes?.entregaId || "",
      responsavel: devolucao.responsavel?.nome || "Sistema"
    }));
  }
  /**
   * Extrai motivo da devolução da descrição
   */
  getMotivoDevolucao(descricao) {
    if (descricao?.includes("danificado")) return "Item danificado";
    if (descricao?.includes("troca")) return "Troca de equipamento";
    if (descricao?.includes("vencido")) return "Item vencido";
    return "Devolução padrão";
  }
}
const fichaTransformAdapter = new FichaTransformAdapter();
class FichaQueryAdapter {
  /**
   * Busca detalhes completos de uma ficha EPI
   * 🔧 CORREÇÃO: Agrega dados de múltiplos endpoints pois /complete não retorna entregas/histórico
   */
  async getFichaComplete(fichaId) {
    try {
      console.log("🔍 Carregando ficha completa:", fichaId);
      const [fichaCompleteResponse, entregasResponse, historicoResponse] = await Promise.all([
        api.get(`/fichas-epi/${fichaId}/complete`),
        api.get(`/fichas-epi/${fichaId}/entregas`),
        api.get(`/fichas-epi/${fichaId}/historico`)
      ]);
      console.log("✅ Dados básicos carregados");
      console.log("📦 Entregas encontradas:", entregasResponse?.data?.length || 0);
      console.log("📝 Eventos de histórico:", historicoResponse?.data?.historico?.length || 0);
      const combinedData = {
        ...fichaCompleteResponse,
        data: {
          ...fichaCompleteResponse.data,
          // ✅ CORREÇÃO: Adicionar entregas e histórico dos endpoints específicos
          entregas: entregasResponse?.data || [],
          historico: historicoResponse?.data?.historico || [],
          // Manter outros dados do endpoint /complete
          devolucoes: fichaCompleteResponse.data?.devolucoes || [],
          equipamentosEmPosse: fichaCompleteResponse.data?.equipamentosEmPosse || [],
          estatisticas: fichaCompleteResponse.data?.estatisticas || {}
        }
      };
      return fichaTransformAdapter.transformFichaComplete(combinedData);
    } catch (error) {
      console.error("❌ Erro ao buscar ficha completa:", error);
      throw error;
    }
  }
  /**
   * Busca lista de fichas com filtros e paginação
   */
  async getFichasList(params = {}) {
    try {
      const queryParams = this.buildQueryParams(params);
      const endpoint = `/fichas-epi/list-enhanced${queryParams}`;
      console.log("🔍 Chamando endpoint:", endpoint);
      const response = await api.get(endpoint);
      return fichaTransformAdapter.transformFichasList(response);
    } catch (error) {
      console.error("Erro ao buscar lista de fichas:", error);
      return {
        items: [],
        total: 0,
        page: params.page || 1,
        pageSize: params.limit || 10,
        totalPages: 0
      };
    }
  }
  /**
   * Busca fichas por termo de pesquisa
   */
  async searchFichas(searchTerm, limit = 20) {
    try {
      if (!searchTerm?.trim()) {
        return [];
      }
      const response = await api.get(`/fichas-epi/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}`);
      return fichaTransformAdapter.transformSearchResults(response);
    } catch (error) {
      console.error("Erro ao buscar fichas:", error);
      return [];
    }
  }
  /**
   * Busca fichas de uma empresa específica
   */
  async getFichasByEmpresa(empresaId, params = {}) {
    return this.getFichasList({
      ...params,
      empresaId
    });
  }
  /**
   * Busca fichas por status
   */
  async getFichasByStatus(status, params = {}) {
    return this.getFichasList({
      ...params,
      status
    });
  }
  /**
   * Busca fichas com devolução pendente
   */
  async getFichasComDevolucaoPendente(params = {}) {
    return this.getFichasList({
      ...params,
      devolucaoPendente: true
    });
  }
  /**
   * Constrói string de query parameters para a API
   */
  buildQueryParams(params) {
    const searchParams = new URLSearchParams();
    if (params.search?.trim()) {
      searchParams.set("search", params.search.trim());
    }
    if (params.empresaId) {
      searchParams.set("empresaId", params.empresaId);
    }
    if (params.empresa?.trim()) {
      searchParams.set("empresa", params.empresa.trim());
    }
    if (params.cargo?.trim()) {
      searchParams.set("cargo", params.cargo.trim());
    }
    if (params.status) {
      searchParams.set("status", params.status);
    }
    if (params.devolucaoPendente !== void 0) {
      searchParams.set("devolucaoPendente", params.devolucaoPendente.toString());
    }
    if (params.page && params.page > 0) {
      searchParams.set("page", params.page.toString());
    }
    if (params.limit && params.limit > 0) {
      searchParams.set("limit", params.limit.toString());
    }
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  }
  /**
   * MÉTODO TRANSITÓRIO: getFichasWithColaboradores 
   * Mantém compatibilidade com código legado
   */
  async getFichasWithColaboradores(params) {
    console.log("📋 FichaQueryAdapter: Método transitório - getFichasWithColaboradores");
    const newParams = {
      page: params.page,
      limit: params.limit,
      search: params.searchTerm,
      empresa: params.empresaFilter,
      cargo: params.cargoFilter,
      status: params.statusFilter,
      devolucaoPendente: params.devolucaoPendente
    };
    try {
      const response = await this.getFichasList(newParams);
      return {
        fichas: response.items,
        total: response.total,
        page: response.page,
        pageSize: response.pageSize
      };
    } catch (error) {
      console.error("❌ Erro no método transitório:", error);
      throw error;
    }
  }
  /**
   * Busca estatísticas gerais de fichas
   */
  async getEstatisticasGerais() {
    try {
      const response = await api.get("/fichas-epi/estatisticas");
      if (!response.success || !response.data) {
        return { total: 0, ativas: 0, inativas: 0, pendenteDevolucao: 0 };
      }
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      return { total: 0, ativas: 0, inativas: 0, pendenteDevolucao: 0 };
    }
  }
  /**
   * Busca EPIs disponíveis para entrega
   */
  async getEPIsDisponiveis() {
    try {
      const response = await api.get("/estoque/itens?apenasDisponiveis=true&apenasComSaldo=true");
      if (!response.success || !Array.isArray(response.data.items)) {
        return [];
      }
      return response.data.items.map((item) => ({
        id: item.id,
        nomeEquipamento: item.tipoEpi.nomeEquipamento,
        numeroCA: item.tipoEpi.numeroCa,
        categoria: item.tipoEpi.categoriaEpi,
        quantidadeDisponivel: item.quantidade,
        disponivel: item.status === "DISPONIVEL" && item.quantidade > 0,
        registroCA: item.tipoEpi.numeroCa,
        // Assumindo que registroCA é o mesmo que numeroCa
        estoqueItemId: item.id,
        tipoEpiId: item.tipoEpi.id,
        posicaoEstoqueId: item.almoxarifadoId
        // Assumindo que almoxarifadoId é o id da posição de estoque
      }));
    } catch (error) {
      console.error("Erro ao buscar EPIs disponíveis:", error);
      return [];
    }
  }
  /**
   * Busca ficha por ID
   */
  async getFichaById(fichaId) {
    try {
      const response = await api.get(`/fichas-epi/${fichaId}`);
      if (!response.success) {
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar ficha por ID:", error);
      return null;
    }
  }
  /**
   * Busca usuários para seleção de responsável
   */
  async getUsuarios() {
    try {
      const response = await api.get("/usuarios");
      console.log("🔍 Resposta da API /usuarios:", response);
      if (!response.items || !Array.isArray(response.items)) {
        console.log("❌ Response não tem items ou items não é array:", response);
        return [];
      }
      console.log("✅ Encontrado", response.items.length, "usuários");
      return response.items.map((user) => ({
        id: user.id,
        nome: user.nome,
        email: user.email,
        perfil: user.perfil || "usuario",
        // Default se não tiver perfil
        ativo: user.ativo !== false,
        // Default true se não especificado
        createdAt: user.createdAt,
        updatedAt: user.updatedAt || user.createdAt
      }));
    } catch (error) {
      console.error("❌ Erro ao buscar usuários:", error);
      return [];
    }
  }
}
const fichaQueryAdapter = new FichaQueryAdapter();
function formatarCPF(cpf) {
  if (!cpf || cpf === "CPF não disponível" || cpf === "") {
    return "CPF não disponível";
  }
  const numeros = cpf.replace(/\D/g, "");
  if (numeros.length !== 11) {
    return cpf.includes("não") ? cpf : "CPF inválido";
  }
  return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
const FichasTablePresenter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items = [] } = $$props;
  let { loading = false } = $$props;
  let { error = null } = $$props;
  let { pagination } = $$props;
  let { filters } = $$props;
  let { filterOptions } = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  if ($$props.pagination === void 0 && $$bindings.pagination && pagination !== void 0) $$bindings.pagination(pagination);
  if ($$props.filters === void 0 && $$bindings.filters && filters !== void 0) $$bindings.filters(filters);
  if ($$props.filterOptions === void 0 && $$bindings.filterOptions && filterOptions !== void 0) $$bindings.filterOptions(filterOptions);
  return `  ${$$result.head += `<!-- HEAD_svelte-161hi6l_START -->${$$result.title = `<title>Fichas de EPI - DataLife EPI</title>`, ""}<!-- HEAD_svelte-161hi6l_END -->`, ""} <div class="space-y-6"> <div class="flex items-center justify-between"><div data-svelte-h="svelte-pifbsf"><h1 class="text-xl font-medium text-gray-900 dark:text-white">Fichas de EPI</h1> <p class="text-sm text-gray-600 dark:text-gray-400">Gerencie as fichas individuais de equipamentos de proteção</p></div> <div class="flex space-x-2">${validate_component(Button, "Button").$$render(
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
  )}</div></div>  ${loading ? `${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}` : `${error ? `${validate_component(ErrorDisplay, "ErrorDisplay").$$render(
    $$result,
    {
      error,
      onRetry: () => dispatch("pageChange", pagination.currentPage)
    },
    {},
    {}
  )}` : `${items.length > 0 ? ` <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"> <div class="p-4 border-b border-gray-200 dark:border-gray-700"><div class="grid grid-cols-1 md:grid-cols-5 gap-4 relative"> <div class="relative">${validate_component(SearchOutline, "SearchOutline").$$render(
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
      placeholder: "Buscar por nome, CPF ou matrícula...",
      class: "pl-10 rounded-sm h-10 text-sm",
      value: filters.searchTerm
    },
    {},
    {}
  )}</div>  <div class="relative z-30">${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
    $$result,
    {
      options: filterOptions.empresas,
      value: filters.empresaFilter,
      placeholder: "Empresa",
      color: "alternative"
    },
    {},
    {}
  )}</div>  <div class="relative z-20">${validate_component(SearchableDropdown, "SearchableDropdown").$$render(
    $$result,
    {
      options: filterOptions.cargos,
      value: filters.cargoFilter,
      placeholder: "Cargo",
      color: "alternative"
    },
    {},
    {}
  )}</div>  <div class="flex items-center">${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: filters.devolucaoPendente }, {}, {
    default: () => {
      return `Pendentes devolução`;
    }
  })}</div>  ${filters.hasActiveFilters ? `${validate_component(Button, "Button").$$render(
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
  )}` : ` <div></div>`}</div></div>  <div class="min-w-[680px] overflow-x-auto">${validate_component(Table, "Table").$$render($$result, { hoverable: true }, {}, {
    default: () => {
      return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Colaborador`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Empresa`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `EPIs Ativos`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Ações`;
            }
          })}`;
        }
      })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
        default: () => {
          return `${each(items, (ficha) => {
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
                      return `<div class="flex flex-col"><span class="font-medium text-gray-900 dark:text-white">${escape(ficha.colaborador.nome)}</span> <span class="text-sm text-gray-500 dark:text-gray-400">${escape(formatarCPF(ficha.colaborador.cpf))}</span> ${ficha.colaborador.matricula ? `<span class="text-xs text-gray-400 dark:text-gray-500">Matrícula: ${escape(ficha.colaborador.matricula)} </span>` : ``}</div> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<div><span class="font-medium text-gray-900 dark:text-white">${escape(ficha.colaborador.empresa || "Empresa não informada")}</span> ${ficha.colaborador.cargo ? `<div class="text-sm text-gray-500 dark:text-gray-400">${escape(ficha.colaborador.cargo)} </div>` : ``}</div> `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<div class="flex flex-wrap gap-1">${validate_component(Badge, "Badge").$$render($$result, { color: "blue", class: "w-fit rounded-sm" }, {}, {
                        default: () => {
                          return `${escape(ficha.totalEpisAtivos || ficha.episInfo?.totalEpisComColaborador || 0)} EPIs
                    `;
                        }
                      })} ${(ficha.episInfo?.episExpirados || ficha.totalEpisVencidos) && ((ficha.episInfo?.episExpirados || 0) > 0 || (ficha.totalEpisVencidos || 0) > 0) ? `${validate_component(Badge, "Badge").$$render($$result, { color: "red", class: "w-fit rounded-sm" }, {}, {
                        default: () => {
                          return `${escape(ficha.episInfo?.episExpirados || ficha.totalEpisVencidos)} vencido(s)
                      `;
                        }
                      })}` : ``}</div> ${ficha.episInfo?.tiposEpisAtivos && ficha.episInfo.tiposEpisAtivos.length > 0 ? `<div class="text-xs text-gray-500 dark:text-gray-400 mt-1">${escape(ficha.episInfo.tiposEpisAtivos.slice(0, 2).map((tipo) => `${tipo.quantidade}x ${tipo.tipoEpiNome}`).join(", "))} ${ficha.episInfo.tiposEpisAtivos.length > 2 ? `<span>... +${escape(ficha.episInfo.tiposEpisAtivos.length - 2)}</span>` : ``} </div>` : ``} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<div class="flex space-x-1"><button class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700" title="Ver Detalhes">${validate_component(EyeOutline, "EyeOutline").$$render($$result, { class: "w-4 h-4" }, {}, {})} </button></div> `;
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
  )}</div></div>` : ``}</div>` : ` ${validate_component(Card, "Card").$$render($$result, { size: "sm", class: "rounded-sm" }, {}, {
    default: () => {
      return `<div class="text-center py-12"><div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">${validate_component(SearchOutline, "SearchOutline").$$render($$result, { class: "w-8 h-8 text-gray-400" }, {}, {})}</div> <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2" data-svelte-h="svelte-qm1del">Nenhuma ficha encontrada</h3> <p class="text-gray-500 dark:text-gray-400 mb-6">${escape(filters.hasActiveFilters ? "Tente ajustar os filtros ou termo de busca" : "Comece cadastrando uma nova ficha de EPI")}</p> ${validate_component(Button, "Button").$$render(
        $$result,
        {
          size: "sm",
          color: "primary",
          class: "rounded-sm"
        },
        {},
        {
          default: () => {
            return `${validate_component(PlusOutline, "PlusOutline").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})} ${escape(!filters.hasActiveFilters ? "Primeira Ficha" : "Nova Ficha")}`;
          }
        }
      )}</div>`;
    }
  })}`}`}`}</div>`;
});
const css = {
  code: ".fichas-container.svelte-zg0loa{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))\n}.fichas-container.svelte-zg0loa:is(.dark *){--tw-bg-opacity:1;background-color:rgb(28 30 41 / var(--tw-bg-opacity, 1))\n}",
  map: `{"version":3,"file":"FichasContainer.svelte","sources":["FichasContainer.svelte"],"sourcesContent":["<!--\\n  Fichas Container - Componente \\"Inteligente\\" com Enhanced Store\\n  \\n  Responsabilidades:\\n  - Gerenciar estado das fichas com arquitetura unificada\\n  - Integração com enhanced store para performance otimizada\\n  - Lógica de filtros e paginação com debounce automático\\n  - Event handlers para CRUD de fichas\\n  - Delegação de UI para presenter\\n-->\\n\\n<script lang=\\"ts\\">import { onMount, onDestroy } from \\"svelte\\";\\nimport { fichaQueryAdapter } from \\"$lib/services/process/queries\\";\\nimport { createPaginatedStore } from \\"$lib/stores/paginatedStore\\";\\nimport { businessConfigStore } from \\"$lib/stores/businessConfigStore\\";\\nimport { notify } from \\"$lib/stores\\";\\nimport { api } from \\"$lib/services/core/apiClient\\";\\nimport { contratadasAdapter } from \\"$lib/services/entity/contratadasAdapter\\";\\nimport { colaboradoresAdapter } from \\"$lib/services/entity/colaboradoresAdapter\\";\\nimport FichasTablePresenter from \\"../presenters/FichasTablePresenter.svelte\\";\\nimport FichaDetailContainer from \\"../containers/FichaDetailContainer.svelte\\";\\nimport NovaFichaModalPresenter from \\"../presenters/NovaFichaModalPresenter.svelte\\";\\nexport let initialPageSize = 10;\\nexport const autoRefresh = false;\\nexport const refreshInterval = 3e4;\\nconst fichasStore = createPaginatedStore(\\n  (params) => {\\n    console.log(\\"\\\\u{1F50D} FichasContainer: Par\\\\xE2metros de busca:\\", params);\\n    return fichaQueryAdapter.getFichasWithColaboradores({\\n      page: params.page || 1,\\n      limit: params.limit || initialPageSize,\\n      searchTerm: params.search || void 0,\\n      empresaFilter: params.empresa !== \\"todas\\" ? params.empresa : void 0,\\n      cargoFilter: params.cargo !== \\"todos\\" ? params.cargo : void 0,\\n      statusFilter: params.status !== \\"todos\\" ? params.status : void 0,\\n      devolucaoPendente: params.devolucaoPendente === true\\n      // ✅ CORREÇÃO: Comparação explícita\\n    }).then((response) => {\\n      console.log(\\"\\\\u{1F4E6} FichasContainer: Resposta da API:\\", {\\n        total: response.total,\\n        fichas: response.fichas?.length || 0,\\n        filtros: {\\n          devolucaoPendente: params.devolucaoPendente,\\n          empresa: params.empresa,\\n          cargo: params.cargo\\n        }\\n      });\\n      return {\\n        data: response.fichas,\\n        total: response.total,\\n        page: response.page || params.page || 1,\\n        pageSize: response.pageSize || params.limit || initialPageSize,\\n        totalPages: Math.ceil(response.total / (params.limit || initialPageSize))\\n      };\\n    });\\n  },\\n  { initialPageSize }\\n);\\nlet showDetail = false;\\nlet selectedFichaId = null;\\nlet showNovaFicha = false;\\nlet contratadas = [];\\nlet colaboradores = [];\\nlet loadingContratadas = false;\\nlet loadingColaboradores = false;\\nlet submittingNovaFicha = false;\\nlet filterOptions = {\\n  empresas: [{ value: \\"todas\\", label: \\"Todas as Empresas\\" }],\\n  cargos: [{ value: \\"todos\\", label: \\"Todos os Cargos\\" }]\\n};\\nlet loadingFilterOptions = false;\\nlet initializing = true;\\nonMount(async () => {\\n  console.log(\\"\\\\u{1F680} FichasContainer: Inicializando...\\");\\n  try {\\n    if (typeof window !== \\"undefined\\") {\\n      await businessConfigStore.initialize();\\n      await Promise.all([\\n        loadFichasData(),\\n        loadFilterOptions()\\n      ]);\\n      console.log(\\"\\\\u2705 FichasContainer: Inicializado com sucesso\\");\\n    }\\n  } catch (error2) {\\n    console.error(\\"\\\\u274C Erro ao inicializar FichasContainer:\\", error2);\\n  } finally {\\n    initializing = false;\\n  }\\n});\\nasync function loadFichasData() {\\n  try {\\n    await fichasStore.fetchPage();\\n    console.log(\\"\\\\u{1F4CB} Dados de fichas carregados\\");\\n  } catch (error2) {\\n    console.error(\\"\\\\u274C Erro ao carregar fichas:\\", error2);\\n    notify.error(\\"Erro ao carregar fichas\\", \\"N\\\\xE3o foi poss\\\\xEDvel carregar os dados das fichas\\");\\n  }\\n}\\nasync function loadFilterOptions() {\\n  try {\\n    loadingFilterOptions = true;\\n    console.log(\\"\\\\u{1F527} Carregando op\\\\xE7\\\\xF5es dos filtros...\\");\\n    const [empresasResponse, colaboradoresResponse] = await Promise.all([\\n      api.get(\\"/contratadas?limit=100\\"),\\n      api.get(\\"/colaboradores?limit=1000\\")\\n    ]);\\n    if (empresasResponse?.success && empresasResponse.data?.contratadas) {\\n      const empresasOptions = empresasResponse.data.contratadas.map((empresa) => ({\\n        value: empresa.nome,\\n        label: empresa.nome\\n      }));\\n      filterOptions.empresas = [\\n        { value: \\"todas\\", label: \\"Todas as Empresas\\" },\\n        ...empresasOptions\\n      ];\\n      console.log(\\"\\\\u2705 Empresas carregadas:\\", empresasOptions.length);\\n    }\\n    if (colaboradoresResponse?.success && colaboradoresResponse.data?.colaboradores) {\\n      const cargosUnicos = [...new Set(\\n        colaboradoresResponse.data.colaboradores.map((col) => col.cargo).filter((cargo) => cargo && cargo.trim())\\n      )];\\n      const cargosOptions = cargosUnicos.map((cargo) => ({\\n        value: cargo,\\n        label: cargo\\n      }));\\n      filterOptions.cargos = [\\n        { value: \\"todos\\", label: \\"Todos os Cargos\\" },\\n        ...cargosOptions\\n      ];\\n      console.log(\\"\\\\u2705 Cargos \\\\xFAnicos carregados:\\", cargosOptions.length);\\n    }\\n    filterOptions = { ...filterOptions };\\n  } catch (error2) {\\n    console.error(\\"\\\\u274C Erro ao carregar op\\\\xE7\\\\xF5es dos filtros:\\", error2);\\n  } finally {\\n    loadingFilterOptions = false;\\n  }\\n}\\nlet filters = {\\n  empresa: \\"todas\\",\\n  cargo: \\"todos\\",\\n  devolucaoPendente: false\\n};\\nlet searchTerm = \\"\\";\\nlet searchTimeout;\\n$: {\\n  if (typeof window !== \\"undefined\\") {\\n    if (searchTimeout) clearTimeout(searchTimeout);\\n    searchTimeout = setTimeout(() => {\\n      fichasStore.setSearch(searchTerm);\\n    }, 300);\\n  }\\n}\\n$: {\\n  if (typeof window !== \\"undefined\\") {\\n    console.log(\\"\\\\u{1F504} FichasContainer: Aplicando filtros:\\", filters);\\n    fichasStore.setFilters({\\n      empresa: filters.empresa,\\n      cargo: filters.cargo,\\n      devolucaoPendente: filters.devolucaoPendente\\n      // ✅ CORREÇÃO: Passar valor booleano direto\\n    });\\n  }\\n}\\nfunction handleFichaSelect(event) {\\n  selectedFichaId = event.detail;\\n  showDetail = true;\\n}\\nfunction handleCloseDetail() {\\n  showDetail = false;\\n  selectedFichaId = null;\\n}\\nfunction handleNovaFicha() {\\n  showNovaFicha = true;\\n}\\nfunction handleCloseNovaFicha() {\\n  showNovaFicha = false;\\n}\\nfunction handleRefresh() {\\n  loadFichasData();\\n}\\n$: fichas = $fichasStore.items || [];\\n$: loading = initializing || $fichasStore.loading;\\n$: error = $fichasStore.error;\\n$: pagination = {\\n  page: $fichasStore.page,\\n  total: $fichasStore.total,\\n  pageSize: $fichasStore.pageSize,\\n  totalPages: $fichasStore.totalPages\\n};\\n<\/script>\\n\\n<!-- ==================== TEMPLATE ==================== -->\\n\\n<div class=\\"fichas-container h-full\\">\\n  <!-- Usar componente original que funcionava -->\\n  <FichasTablePresenter \\n    items={fichas}\\n    {loading}\\n    {error}\\n    pagination={{\\n      currentPage: pagination.page,\\n      totalPages: pagination.totalPages,\\n      pageSize: pagination.pageSize,\\n      total: pagination.total,\\n      hasNext: pagination.page < pagination.totalPages,\\n      hasPrev: pagination.page > 1\\n    }}\\n    filters={{\\n      searchTerm,\\n      empresaFilter: filters.empresa,\\n      cargoFilter: filters.cargo,\\n      devolucaoPendente: filters.devolucaoPendente,\\n      hasActiveFilters: searchTerm !== '' || filters.empresa !== 'todas' || filters.cargo !== 'todos' || filters.devolucaoPendente\\n    }}\\n    {filterOptions}\\n    on:searchChange={(e) => searchTerm = e.detail}\\n    on:empresaFilterChange={(e) => filters.empresa = e.detail}\\n    on:cargoFilterChange={(e) => filters.cargo = e.detail}\\n    on:devolucaoPendenteChange={(e) => filters.devolucaoPendente = e.detail}\\n    on:clearFilters={() => { searchTerm = ''; filters = { empresa: 'todas', cargo: 'todos', devolucaoPendente: false }; }}\\n    on:pageChange={(e) => fichasStore.goToPage(e.detail)}\\n    on:viewDetail={handleFichaSelect}\\n    on:refresh={handleRefresh}\\n    on:novaFicha={handleNovaFicha}\\n  />\\n\\n  <!-- Detail Drawer -->\\n  {#if showDetail && selectedFichaId}\\n    <FichaDetailContainer\\n      fichaId={selectedFichaId}\\n      open={showDetail}\\n      on:close={handleCloseDetail}\\n    />\\n  {/if}\\n\\n  <!-- Nova Ficha Modal -->\\n  {#if showNovaFicha}\\n    <NovaFichaModalPresenter\\n      {contratadas}\\n      {colaboradores}\\n      {loadingContratadas}\\n      {loadingColaboradores}\\n      loading={submittingNovaFicha}\\n      on:close={handleCloseNovaFicha}\\n      on:submit={(e) => console.log('Nova ficha:', e.detail)}\\n    />\\n  {/if}\\n</div>\\n\\n<style>\\n  .fichas-container {\\n    --tw-bg-opacity: 1;\\n    background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1))\\n}\\n.fichas-container:is(.dark *) {\\n    --tw-bg-opacity: 1;\\n    background-color: rgb(28 30 41 / var(--tw-bg-opacity, 1))\\n}\\n</style>"],"names":[],"mappings":"AA2PE,+BAAkB,CAChB,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,IAAI,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,EAAE,CAAC;AAC/D,CACA,+BAAiB,IAAI,KAAK,CAAC,CAAC,CAAE,CAC1B,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,IAAI,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,EAAE,CAAC;AAC5D"}`
};
const FichasContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fichas;
  let loading;
  let error;
  let pagination;
  let $fichasStore, $$unsubscribe_fichasStore;
  let { initialPageSize = 10 } = $$props;
  const autoRefresh = false;
  const refreshInterval = 3e4;
  const fichasStore = createPaginatedStore(
    (params) => {
      console.log("🔍 FichasContainer: Parâmetros de busca:", params);
      return fichaQueryAdapter.getFichasWithColaboradores({
        page: params.page || 1,
        limit: params.limit || initialPageSize,
        searchTerm: params.search || void 0,
        empresaFilter: params.empresa !== "todas" ? params.empresa : void 0,
        cargoFilter: params.cargo !== "todos" ? params.cargo : void 0,
        statusFilter: params.status !== "todos" ? params.status : void 0,
        devolucaoPendente: params.devolucaoPendente === true
      }).then(
        (response) => {
          console.log("📦 FichasContainer: Resposta da API:", {
            total: response.total,
            fichas: response.fichas?.length || 0,
            filtros: {
              devolucaoPendente: params.devolucaoPendente,
              empresa: params.empresa,
              cargo: params.cargo
            }
          });
          return {
            data: response.fichas,
            total: response.total,
            page: response.page || params.page || 1,
            pageSize: response.pageSize || params.limit || initialPageSize,
            totalPages: Math.ceil(response.total / (params.limit || initialPageSize))
          };
        }
      );
    },
    { initialPageSize }
  );
  $$unsubscribe_fichasStore = subscribe(fichasStore, (value) => $fichasStore = value);
  let filterOptions = {
    empresas: [
      {
        value: "todas",
        label: "Todas as Empresas"
      }
    ],
    cargos: [{ value: "todos", label: "Todos os Cargos" }]
  };
  let initializing = true;
  let filters = {
    empresa: "todas",
    cargo: "todos",
    devolucaoPendente: false
  };
  let searchTerm = "";
  let searchTimeout;
  if ($$props.initialPageSize === void 0 && $$bindings.initialPageSize && initialPageSize !== void 0) $$bindings.initialPageSize(initialPageSize);
  if ($$props.autoRefresh === void 0 && $$bindings.autoRefresh && autoRefresh !== void 0) $$bindings.autoRefresh(autoRefresh);
  if ($$props.refreshInterval === void 0 && $$bindings.refreshInterval && refreshInterval !== void 0) $$bindings.refreshInterval(refreshInterval);
  $$result.css.add(css);
  {
    {
      if (typeof window !== "undefined") {
        if (searchTimeout) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(
          () => {
            fichasStore.setSearch(searchTerm);
          },
          300
        );
      }
    }
  }
  {
    {
      if (typeof window !== "undefined") {
        console.log("🔄 FichasContainer: Aplicando filtros:", filters);
        fichasStore.setFilters({
          empresa: filters.empresa,
          cargo: filters.cargo,
          devolucaoPendente: filters.devolucaoPendente
        });
      }
    }
  }
  fichas = $fichasStore.items || [];
  loading = initializing;
  error = $fichasStore.error;
  pagination = {
    page: $fichasStore.page,
    total: $fichasStore.total,
    pageSize: $fichasStore.pageSize,
    totalPages: $fichasStore.totalPages
  };
  $$unsubscribe_fichasStore();
  return `   <div class="fichas-container h-full svelte-zg0loa"> ${validate_component(FichasTablePresenter, "FichasTablePresenter").$$render(
    $$result,
    {
      items: fichas,
      loading,
      error,
      pagination: {
        currentPage: pagination.page,
        totalPages: pagination.totalPages,
        pageSize: pagination.pageSize,
        total: pagination.total,
        hasNext: pagination.page < pagination.totalPages,
        hasPrev: pagination.page > 1
      },
      filters: {
        searchTerm,
        empresaFilter: filters.empresa,
        cargoFilter: filters.cargo,
        devolucaoPendente: filters.devolucaoPendente,
        hasActiveFilters: filters.devolucaoPendente
      },
      filterOptions
    },
    {},
    {}
  )}  ${``}  ${``} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `  ${$$result.head += `<!-- HEAD_svelte-161hi6l_START -->${$$result.title = `<title>Fichas de EPI - DataLife EPI</title>`, ""}<!-- HEAD_svelte-161hi6l_END -->`, ""}  ${validate_component(FichasContainer, "FichasContainer").$$render($$result, { initialPageSize: 10, autoRefresh: false }, {}, {})}`;
});
export {
  Page as default
};
