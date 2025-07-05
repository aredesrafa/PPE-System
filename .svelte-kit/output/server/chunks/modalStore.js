import { w as writable, d as derived } from "./index.js";
import { n as get_store_value } from "./ssr.js";
function createThemeStore() {
  const { subscribe, set: setStore, update } = writable("light");
  return {
    subscribe,
    initialize: () => {
      return;
    },
    toggle: () => {
      update((theme) => {
        const newTheme = theme === "light" ? "dark" : "light";
        return newTheme;
      });
    },
    set: (theme) => {
      setStore(theme);
    }
  };
}
const themeStore = createThemeStore();
const MOCK_BUSINESS_CONFIG = {
  tiposMovimentacao: [
    { code: "entrada_nota", label: "Entrada por Nota", description: "Entrada de itens via nota fiscal" },
    { code: "saida_entrega", label: "Saída por Entrega", description: "Saída para entrega a colaborador" },
    { code: "transferencia", label: "Transferência", description: "Transferência entre almoxarifados" },
    { code: "ajuste_positivo", label: "Ajuste Positivo", description: "Ajuste para aumentar estoque" },
    { code: "ajuste_negativo", label: "Ajuste Negativo", description: "Ajuste para diminuir estoque" },
    { code: "devolucao", label: "Devolução", description: "Devolução de item por colaborador" },
    { code: "descarte", label: "Descarte", description: "Descarte de item vencido ou danificado" },
    { code: "estorno", label: "Estorno", description: "Estorno de movimentação anterior" }
  ],
  categoriasEPI: [
    { code: "protecao_cabeca", label: "Proteção da Cabeça", description: "Capacetes, bonés, etc." },
    { code: "protecao_olhos", label: "Proteção dos Olhos", description: "Óculos, viseiras, etc." },
    { code: "protecao_auditiva", label: "Proteção Auditiva", description: "Protetores auriculares" },
    { code: "protecao_respiratoria", label: "Proteção Respiratória", description: "Máscaras, respiradores" },
    { code: "protecao_tronco", label: "Proteção do Tronco", description: "Aventais, coletes, jaquetas" },
    { code: "protecao_maos", label: "Proteção das Mãos", description: "Luvas de diversos tipos" },
    { code: "protecao_pes", label: "Proteção dos Pés", description: "Calçados de segurança" },
    { code: "protecao_queda", label: "Proteção contra Quedas", description: "Cintos, talabartes, etc." }
  ],
  statusEntrega: [
    { code: "pendente_assinatura", label: "Pendente de Assinatura", description: "Aguardando assinatura do colaborador" },
    { code: "assinada", label: "Assinada", description: "Entrega confirmada e assinada" },
    { code: "devolvido", label: "Devolvido", description: "Item devolvido pelo colaborador" },
    { code: "vencido", label: "Vencido", description: "Item vencido e deve ser substituído" },
    { code: "cancelada", label: "Cancelada", description: "Entrega cancelada" }
  ],
  statusFicha: [
    { code: "ativa", label: "Ativa", description: "Ficha ativa do colaborador" },
    { code: "inativa", label: "Inativa", description: "Ficha inativada" },
    { code: "pendente", label: "Pendente", description: "Ficha com pendências" },
    { code: "completa", label: "Completa", description: "Ficha com todos os EPIs entregues" }
  ],
  statusEstoque: [
    { code: "disponivel", label: "Disponível", description: "Item disponível em estoque" },
    { code: "baixo", label: "Estoque Baixo", description: "Quantidade abaixo do mínimo" },
    { code: "vencendo", label: "Próximo ao Vencimento", description: "Vence em até 30 dias" },
    { code: "vencido", label: "Vencido", description: "Item com validade expirada" },
    { code: "esgotado", label: "Esgotado", description: "Sem itens em estoque" },
    { code: "bloqueado", label: "Bloqueado", description: "Item bloqueado para uso" }
  ],
  tiposNota: [
    { code: "entrada", label: "Entrada", description: "Nota de entrada de mercadorias" },
    { code: "transferencia", label: "Transferência", description: "Nota de transferência" },
    { code: "devolucao", label: "Devolução", description: "Nota de devolução" },
    { code: "descarte", label: "Descarte", description: "Nota de descarte" }
  ]
};
class ConfigurationService {
  cache = null;
  cacheExpiry = 0;
  CACHE_DURATION = 5 * 60 * 1e3;
  // 5 minutos
  /**
   * Carrega as regras de negócio do backend ou cache
   * Por enquanto usa mock data, mas está preparado para API real
   */
  async loadBusinessRules() {
    if (this.cache && Date.now() < this.cacheExpiry) {
      return this.cache;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const config = MOCK_BUSINESS_CONFIG;
      this.cache = config;
      this.cacheExpiry = Date.now() + this.CACHE_DURATION;
      return config;
    } catch (error) {
      console.error("Erro ao carregar configurações de negócio:", error);
      if (this.cache) {
        console.warn("Usando configurações do cache devido ao erro");
        return this.cache;
      }
      console.warn("Usando configurações mock devido ao erro");
      return MOCK_BUSINESS_CONFIG;
    }
  }
  /**
   * Busca uma configuração específica por categoria
   */
  async getConfigByCategory(category) {
    const config = await this.loadBusinessRules();
    return config[category] || [];
  }
  /**
   * Busca um item específico por código em uma categoria
   */
  async getConfigItem(category, code) {
    const items = await this.getConfigByCategory(category);
    return items.find((item) => item.code === code) || null;
  }
  /**
   * Limpa o cache forçando uma nova requisição
   */
  clearCache() {
    this.cache = null;
    this.cacheExpiry = 0;
  }
  /**
   * Verifica se o cache está válido
   */
  isCacheValid() {
    return this.cache !== null && Date.now() < this.cacheExpiry;
  }
}
const configurationService = new ConfigurationService();
const initialState = {
  data: null,
  loading: false,
  error: null,
  lastUpdated: null
};
function createBusinessConfigStore() {
  const { subscribe, set, update } = writable(initialState);
  return {
    subscribe,
    /**
     * Inicializa as configurações carregando do backend
     * Deve ser chamado no +layout.svelte
     */
    async initialize() {
      return;
    },
    /**
     * Recarrega as configurações forçando uma nova requisição
     */
    async reload() {
      configurationService.clearCache();
      await this.initialize();
    },
    /**
     * Limpa o store resetando para o estado inicial
     */
    reset() {
      set(initialState);
    },
    /**
     * Verifica se as configurações estão carregadas e válidas
     */
    isReady() {
      let isReady = false;
      subscribe((state) => {
        isReady = state.data !== null && !state.loading && !state.error;
      })();
      return isReady;
    }
  };
}
const businessConfigStore = createBusinessConfigStore();
const tiposMovimentacaoStore = derived(
  businessConfigStore,
  ($config) => $config.data?.tiposMovimentacao || []
);
const categoriasEPIStore = derived(
  businessConfigStore,
  ($config) => $config.data?.categoriasEPI || []
);
const statusEntregaStore = derived(
  businessConfigStore,
  ($config) => $config.data?.statusEntrega || []
);
derived(
  businessConfigStore,
  ($config) => $config.data?.statusFicha || []
);
const statusEstoqueStore = derived(
  businessConfigStore,
  ($config) => $config.data?.statusEstoque || []
);
derived(
  businessConfigStore,
  ($config) => $config.data?.tiposNota || []
);
derived(
  businessConfigStore,
  ($config) => $config.data !== null && !$config.loading && !$config.error
);
function configToOptions(items, addEmptyOption = true) {
  const options = items.map((item) => ({
    value: item.code,
    label: item.label
  }));
  if (addEmptyOption) {
    return [{ value: "", label: "Selecionar..." }, ...options];
  }
  return options;
}
derived(
  tiposMovimentacaoStore,
  (items) => configToOptions(items)
);
const categoriasEPIOptions = derived(
  categoriasEPIStore,
  (items) => configToOptions(items)
);
derived(
  statusEntregaStore,
  (items) => configToOptions(items)
);
const statusEstoqueOptions = derived(
  statusEstoqueStore,
  (items) => configToOptions(items)
);
function createApiStore(initialData = null) {
  const store = writable({
    data: initialData,
    loading: false,
    error: null
  });
  return {
    subscribe: store.subscribe,
    set: (data) => store.update((state) => ({ ...state, data, error: null })),
    setLoading: (loading) => store.update((state) => ({ ...state, loading })),
    setError: (error) => store.update((state) => ({ ...state, error, loading: false })),
    reset: () => store.set({ data: initialData, loading: false, error: null }),
    // Método para executar uma operação de API
    execute: async (apiCall) => {
      store.update((state) => ({ ...state, loading: true, error: null }));
      try {
        const data = await apiCall();
        store.update((state) => ({ ...state, data, loading: false }));
        return data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        store.update((state) => ({ ...state, error: errorMessage, loading: false }));
        throw error;
      }
    }
  };
}
function createNotificationStore() {
  const { subscribe, update } = writable([]);
  return {
    subscribe,
    add: (notification) => {
      const id = Math.random().toString(36).substring(7);
      const newNotification = { id, ...notification };
      update((notifications2) => [...notifications2, newNotification]);
      const duration = notification.duration || 5e3;
      if (duration > 0) {
        setTimeout(() => {
          update((notifications2) => notifications2.filter((n) => n.id !== id));
        }, duration);
      }
      return id;
    },
    remove: (id) => {
      update((notifications2) => notifications2.filter((n) => n.id !== id));
    },
    clear: () => {
      update(() => []);
    }
  };
}
const notifications = createNotificationStore();
const notify = {
  success: (title, message, duration) => notifications.add({ type: "success", title, message, duration }),
  error: (title, message, duration) => notifications.add({ type: "error", title, message, duration }),
  warning: (title, message, duration) => notifications.add({ type: "warning", title, message, duration }),
  info: (title, message, duration) => notifications.add({ type: "info", title, message, duration })
};
function createFiltersStore(initialFilters) {
  const filters = writable(initialFilters);
  const searchTerm = writable("");
  const currentPage = writable(1);
  const itemsPerPage = writable(10);
  const sortField = writable("");
  const sortDirection = writable("asc");
  const filtersState = derived(
    [filters, searchTerm, currentPage, itemsPerPage, sortField, sortDirection],
    ([$filters, $searchTerm, $currentPage, $itemsPerPage, $sortField, $sortDirection]) => ({
      filters: $filters,
      search: {
        term: $searchTerm,
        fields: []
        // Será definido pelos componentes que usam
      },
      pagination: {
        currentPage: $currentPage,
        itemsPerPage: $itemsPerPage,
        totalItems: 0,
        // Será atualizado quando dados forem carregados
        totalPages: 0
      },
      sort: {
        field: $sortField,
        direction: $sortDirection
      }
    })
  );
  return {
    // Subscriptions
    filters,
    searchTerm,
    currentPage,
    itemsPerPage,
    sortField,
    sortDirection,
    filtersState,
    // Actions
    updateFilter: (key, value) => {
      filters.update((f) => ({ ...f, [key]: value }));
      currentPage.set(1);
    },
    setSearchTerm: (term) => {
      searchTerm.set(term);
      currentPage.set(1);
    },
    setCurrentPage: (page) => {
      currentPage.set(page);
    },
    setItemsPerPage: (items) => {
      itemsPerPage.set(items);
      currentPage.set(1);
    },
    setSorting: (field, direction) => {
      const currentDirection = get_store_value(sortDirection);
      const currentField = get_store_value(sortField);
      if (field === currentField && !direction) {
        sortDirection.set(currentDirection === "asc" ? "desc" : "asc");
      } else {
        sortField.set(field);
        sortDirection.set(direction || "asc");
      }
    },
    resetFilters: () => {
      filters.set(initialFilters);
      searchTerm.set("");
      currentPage.set(1);
      sortField.set("");
      sortDirection.set("asc");
    },
    resetPagination: () => {
      currentPage.set(1);
    },
    // Métodos para obter valores atuais
    getCurrentFilters: () => get_store_value(filters),
    getCurrentSearchTerm: () => get_store_value(searchTerm),
    getCurrentPage: () => get_store_value(currentPage),
    getCurrentSort: () => ({
      field: get_store_value(sortField),
      direction: get_store_value(sortDirection)
    })
  };
}
const epiFilters = createFiltersStore({
  status: "todos",
  categoria: "todas",
  fabricante: "todos"
});
createFiltersStore({
  status: "todos",
  estoque: "todos",
  categoria: "todas",
  vencimento: "todos"
});
createFiltersStore({
  cargo: "todos",
  empresa: "todas",
  devolucaoPendente: false
});
function createTiposEPIStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    set,
    add: (tipoEPI) => update((items) => [...items, tipoEPI]),
    update: (id, updates) => update((items) => items.map(
      (item) => item.id === id ? { ...item, ...updates } : item
    )),
    remove: (id) => update((items) => items.filter((item) => item.id !== id)),
    getById: (id) => {
      return get_store_value({ subscribe }).find((item) => item.id === id);
    },
    clear: () => set([])
  };
}
function createEstoqueStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    set,
    add: (item) => update((items) => [...items, item]),
    update: (id, updates) => update((items) => items.map(
      (item) => item.id === id ? { ...item, ...updates } : item
    )),
    remove: (id) => update((items) => items.filter((item) => item.id !== id)),
    updateQuantidade: (id, novaQuantidade) => update((items) => items.map(
      (item) => item.id === id ? { ...item, quantidade: novaQuantidade } : item
    )),
    getById: (id) => {
      return get_store_value({ subscribe }).find((item) => item.id === id);
    },
    getByTipoEPI: (tipoEPIId) => {
      return get_store_value({ subscribe }).filter((item) => item.tipoEPIId === tipoEPIId);
    },
    clear: () => set([])
  };
}
function createFichasStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    set,
    add: (ficha) => update((fichas) => [...fichas, ficha]),
    update: (id, updates) => update((fichas) => fichas.map(
      (ficha) => ficha.id === id ? { ...ficha, ...updates } : ficha
    )),
    remove: (id) => update((fichas) => fichas.filter((ficha) => ficha.id !== id)),
    getById: (id) => {
      return get_store_value({ subscribe }).find((ficha) => ficha.id === id);
    },
    getByColaborador: (colaboradorId) => {
      return get_store_value({ subscribe }).filter((ficha) => ficha.colaboradorId === colaboradorId);
    },
    getAtivas: () => {
      return get_store_value({ subscribe }).filter((ficha) => ficha.status === "ativo");
    },
    getVencidas: () => {
      return get_store_value({ subscribe }).filter((ficha) => ficha.status === "vencido");
    },
    clear: () => set([])
  };
}
function createColaboradoresStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    set,
    add: (colaborador) => update((colaboradores) => [...colaboradores, colaborador]),
    update: (id, updates) => update((colaboradores) => colaboradores.map(
      (col) => col.id === id ? { ...col, ...updates } : col
    )),
    remove: (id) => update((colaboradores) => colaboradores.filter((col) => col.id !== id)),
    getById: (id) => {
      return get_store_value({ subscribe }).find((col) => col.id === id);
    },
    getByEmpresa: (empresaId) => {
      return get_store_value({ subscribe }).filter((col) => col.empresaId === empresaId);
    },
    getAtivos: () => {
      return get_store_value({ subscribe }).filter((col) => col.status === "ativo");
    },
    clear: () => set([])
  };
}
function createEmpresasStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    set,
    add: (empresa) => update((empresas) => [...empresas, empresa]),
    update: (id, updates) => update((empresas) => empresas.map(
      (emp) => emp.id === id ? { ...emp, ...updates } : emp
    )),
    remove: (id) => update((empresas) => empresas.filter((emp) => emp.id !== id)),
    getById: (id) => {
      return get_store_value({ subscribe }).find((emp) => emp.id === id);
    },
    getAtivas: () => {
      return get_store_value({ subscribe }).filter((emp) => emp.status === "ativa");
    },
    clear: () => set([])
  };
}
function createEntregasStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    set,
    add: (entrega) => update((entregas) => [...entregas, entrega]),
    update: (id, updates) => update((entregas) => entregas.map(
      (ent) => ent.id === id ? { ...ent, ...updates } : ent
    )),
    remove: (id) => update((entregas) => entregas.filter((ent) => ent.id !== id)),
    getById: (id) => {
      return get_store_value({ subscribe }).find((ent) => ent.id === id);
    },
    getByFicha: (fichaId) => {
      return get_store_value({ subscribe }).filter((ent) => ent.fichaEPIId === fichaId);
    },
    getPendentes: () => {
      return get_store_value({ subscribe }).filter((ent) => ent.status === "nao_assinado" || ent.status === "pendente");
    },
    clear: () => set([])
  };
}
function createNotificacoesStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    set,
    add: (notificacao) => update((notifs) => [notificacao, ...notifs]),
    update: (id, updates) => update((notifs) => notifs.map(
      (notif) => notif.id === id ? { ...notif, ...updates } : notif
    )),
    remove: (id) => update((notifs) => notifs.filter((notif) => notif.id !== id)),
    markAsRead: (id) => update((notifs) => notifs.map(
      (notif) => notif.id === id ? { ...notif, lida: true } : notif
    )),
    markAllAsRead: () => update((notifs) => notifs.map((notif) => ({ ...notif, lida: true }))),
    getNaoLidas: () => {
      return get_store_value({ subscribe }).filter((notif) => !notif.lida);
    },
    getByTipo: (tipo) => {
      return get_store_value({ subscribe }).filter((notif) => notif.tipo === tipo);
    },
    clear: () => set([])
  };
}
createTiposEPIStore();
const estoqueStore = createEstoqueStore();
const fichasStore = createFichasStore();
const colaboradoresStore = createColaboradoresStore();
createEmpresasStore();
createEntregasStore();
const notificacoesStore = createNotificacoesStore();
derived(
  estoqueStore,
  ($estoque) => $estoque.filter((item) => item.quantidade > 0 && item.status === "disponivel")
);
derived(
  estoqueStore,
  ($estoque) => $estoque.filter(
    (item) => item.quantidadeMinima && item.quantidade <= item.quantidadeMinima
  )
);
derived(
  fichasStore,
  ($fichas) => $fichas.filter((ficha) => ficha.status === "vencido")
);
derived(
  colaboradoresStore,
  ($colaboradores) => $colaboradores.filter((col) => col.status === "ativo")
);
const notificacoesNaoLidas = derived(
  notificacoesStore,
  ($notificacoes) => $notificacoes.filter((notif) => !notif.lida)
);
derived(
  notificacoesNaoLidas,
  ($notificacoes) => $notificacoes.length
);
derived(
  [estoqueStore, fichasStore, colaboradoresStore, notificacoesNaoLidas],
  ([$estoque, $fichas, $colaboradores, $notificacoesNaoLidas]) => ({
    totalEstoque: $estoque.reduce((total, item) => total + item.quantidade, 0),
    fichasAtivas: $fichas.filter((f) => f.status === "ativo").length,
    fichasVencidas: $fichas.filter((f) => f.status === "vencido").length,
    colaboradoresAtivos: $colaboradores.filter((c) => c.status === "ativo").length,
    notificacoesPendentes: $notificacoesNaoLidas.length,
    estoqueComProblemas: $estoque.filter(
      (item) => item.status === "baixo_estoque" || item.status === "vencido" || item.status === "esgotado"
    ).length
  })
);
function createModalStore() {
  const { subscribe, set, update } = writable({
    isOpen: false,
    mode: "create",
    data: void 0
  });
  return {
    subscribe,
    // Abrir modal
    open: (mode = "create", data) => {
      set({ isOpen: true, mode, data });
    },
    // Fechar modal
    close: () => {
      set({ isOpen: false, mode: "create", data: void 0 });
    },
    // Atualizar dados do modal
    setData: (data) => {
      update((state) => ({ ...state, data }));
    },
    // Alterar modo do modal
    setMode: (mode) => {
      update((state) => ({ ...state, mode }));
    },
    // Verificadores de estado - FIXED: usando get() do Svelte
    isOpen: () => get_store_value({ subscribe }).isOpen,
    isMode: (mode) => get_store_value({ subscribe }).mode === mode,
    getData: () => get_store_value({ subscribe }).data
  };
}
createModalStore();
createModalStore();
createModalStore();
createModalStore();
createModalStore();
createModalStore();
createModalStore();
createModalStore();
function createConfirmationStore() {
  const { subscribe, set, update } = writable({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirmar",
    cancelText: "Cancelar",
    confirmColor: "red"
  });
  return {
    subscribe,
    confirm: (options) => {
      set({
        isOpen: true,
        title: options.title,
        message: options.message,
        confirmText: options.confirmText || "Confirmar",
        cancelText: options.cancelText || "Cancelar",
        confirmColor: options.confirmColor || "red",
        onConfirm: options.onConfirm,
        onCancel: options.onCancel
      });
    },
    close: () => {
      set({
        isOpen: false,
        title: "",
        message: "",
        confirmText: "Confirmar",
        cancelText: "Cancelar",
        confirmColor: "red"
      });
    },
    handleConfirm: async () => {
      const state = get_store_value({ subscribe });
      if (state.onConfirm) {
        await state.onConfirm();
      }
      set({
        isOpen: false,
        title: "",
        message: "",
        confirmText: "Confirmar",
        cancelText: "Cancelar",
        confirmColor: "red"
      });
    },
    handleCancel: () => {
      const state = get_store_value({ subscribe });
      if (state.onCancel) {
        state.onCancel();
      }
      set({
        isOpen: false,
        title: "",
        message: "",
        confirmText: "Confirmar",
        cancelText: "Cancelar",
        confirmColor: "red"
      });
    }
  };
}
const confirmationModal = createConfirmationStore();
export {
  createApiStore as a,
  notify as b,
  confirmationModal as c,
  businessConfigStore as d,
  epiFilters as e,
  categoriasEPIOptions as f,
  notifications as n,
  statusEstoqueOptions as s,
  themeStore as t
};
