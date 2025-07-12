<!--
  Fichas Container - Componente "Inteligente" com Enhanced Store
  
  Responsabilidades:
  - Gerenciar estado das fichas com arquitetura unificada
  - Integração com enhanced store para performance otimizada
  - Lógica de filtros e paginação com debounce automático
  - Event handlers para CRUD de fichas
  - Delegação de UI para presenter
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  // 🚀 COMPATIBILIDADE: Usar adapter refatorado mas com método compatível
  import { fichaQueryAdapter } from '$lib/services/process/queries';
  import { createPaginatedStore } from '$lib/stores/paginatedStore';
  import { businessConfigStore } from '$lib/stores/businessConfigStore';
  import { notify } from '$lib/stores';
  import { api } from '$lib/services/core/apiClient';
  import FichasTablePresenter from '../presenters/FichasTablePresenter.svelte';
  import FichaDetailContainer from '../containers/FichaDetailContainer.svelte';
  import NovaFichaModalPresenter from '../presenters/NovaFichaModalPresenter.svelte';
  import type { FichaEPIDTO } from '$lib/types/serviceTypes';

  // ==================== PROPS ====================
  
  export let initialPageSize: number = 10;
  export let autoRefresh: boolean = false;
  export let refreshInterval: number = 30000;

  // ==================== ENHANCED STORE ====================
  
  // 🚀 MIGRADO: Store paginado usando novo adapter mas mantendo compatibilidade
  const fichasStore = createPaginatedStore(
    (params) => {
      // Mapear para o novo formato do adapter
      return fichaQueryAdapter.getFichasList({
        page: params.page || 1,
        limit: params.limit || initialPageSize,
        search: params.search || undefined, // 🆕 NOVO: busca unificada
        empresaId: params.empresa !== 'todas' ? params.empresa : undefined,
        cargo: params.cargo !== 'todos' ? params.cargo : undefined,
        status: params.status !== 'todos' ? params.status : undefined,
        devolucaoPendente: !!params.devolucaoPendente
      }).then(response => ({
        data: response.items, // 🔄 MAPEAR: items -> data para compatibilidade
        total: response.total,
        page: response.page || params.page || 1,
        pageSize: response.pageSize || params.limit || initialPageSize,
        totalPages: response.totalPages || Math.ceil(response.total / (params.limit || initialPageSize))
      }));
    },
    { initialPageSize }
  );
  
  // Estado local para modais
  let showDetail = false;
  let selectedFichaId: string | null = null;
  let showNovaFicha = false;
  
  // Estado para nova ficha
  let contratadas: Array<{ value: string; label: string }> = [];
  let colaboradores: Array<{ value: string; label: string; empresa: string }> = [];
  let loadingContratadas = false;
  let loadingColaboradores = false;
  let submittingNovaFicha = false;

  // ==================== LIFECYCLE ====================
  
  onMount(async () => {
    console.log('🚀 FichasContainer: Inicializando...');
    
    // Aguardar configurações de negócio
    await businessConfigStore.initialize();
    
    // Carregar dados iniciais
    await loadFichasData();
    
    console.log('✅ FichasContainer: Inicializado com sucesso');
  });
  
  // ==================== DATA LOADING ====================
  
  async function loadFichasData(): Promise<void> {
    try {
      await fichasStore.fetchPage();
      console.log('📋 Dados de fichas carregados');
    } catch (error) {
      console.error('❌ Erro ao carregar fichas:', error);
      notify.error('Erro ao carregar fichas', 'Não foi possível carregar os dados das fichas');
    }
  }
  
  // ==================== FILTER HANDLERS ====================
  
  // Filtros reativos
  let filters = {
    empresa: 'todas',
    cargo: 'todos', 
    devolucaoPendente: false
  };
  let searchTerm = '';

  // Debounce para busca
  let searchTimeout: NodeJS.Timeout;
  $: {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      fichasStore.updateFilters({ search: searchTerm });
    }, 300);
  }

  // Filtros reativos
  $: {
    fichasStore.updateFilters({
      empresa: filters.empresa,
      cargo: filters.cargo,
      devolucaoPendente: filters.devolucaoPendente
    });
  }

  // ==================== EVENT HANDLERS ====================
  
  function handleFichaSelect(event: CustomEvent<string>) {
    selectedFichaId = event.detail;
    showDetail = true;
  }
  
  function handleCloseDetail() {
    showDetail = false;
    selectedFichaId = null;
  }
  
  function handleNovaFicha() {
    showNovaFicha = true;
  }
  
  function handleCloseNovaFicha() {
    showNovaFicha = false;
  }
  
  function handleRefresh() {
    loadFichasData();
  }

  // ==================== REACTIVE STATEMENTS ====================
  
  $: fichas = $fichasStore.data || [];
  $: loading = $fichasStore.loading;
  $: error = $fichasStore.error;
  $: pagination = {
    page: $fichasStore.page,
    total: $fichasStore.total,
    pageSize: $fichasStore.pageSize,
    totalPages: $fichasStore.totalPages
  };
</script>

<!-- ==================== TEMPLATE ==================== -->

<div class="fichas-container h-full">
  <!-- Usar componente original que funcionava -->
  <FichasTablePresenter 
    {fichas}
    {loading}
    {error}
    {pagination}
    {searchTerm}
    {filters}
    bind:searchTerm
    bind:filters
    on:fichaSelect={handleFichaSelect}
    on:refresh={handleRefresh}
    on:novaFicha={handleNovaFicha}
    on:pageChange={(e) => fichasStore.goToPage(e.detail)}
  />

  <!-- Detail Drawer -->
  {#if showDetail && selectedFichaId}
    <FichaDetailContainer
      fichaId={selectedFichaId}
      on:close={handleCloseDetail}
    />
  {/if}

  <!-- Nova Ficha Modal -->
  {#if showNovaFicha}
    <NovaFichaModalPresenter
      {contratadas}
      {colaboradores}
      {loadingContratadas}
      {loadingColaboradores}
      loading={submittingNovaFicha}
      on:close={handleCloseNovaFicha}
      on:submit={(e) => console.log('Nova ficha:', e.detail)}
    />
  {/if}
</div>

<style>
  .fichas-container {
    @apply bg-white dark:bg-gray-900;
  }
</style>