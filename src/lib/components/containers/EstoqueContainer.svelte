<!--
  EstoqueContainer - Componente "Inteligente" para Gestão de Estoque
  
  Container que encapsula toda a lógica de negócio e gerenciamento de estado.
  Usa service adapters e stores reativos, delegando apenas renderização
  para os componentes Presenter.
  
  Responsabilidades:
  - Integração com stores e service adapters
  - Gerenciamento de estado reativo
  - Handlers de eventos e validações
  - Cache inteligente e debounce
  - Coordenação entre Presenters
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { 
    estoqueStore,
    estoqueData,
    estoqueLoading,
    estoqueError,
    loadEstoque,
    searchEstoque,
    filterEstoque,
    clearEstoqueFilters,
    sortEstoque,
    type EstoqueItem,
    type EstoqueFiltersParams
  } from '$lib/stores/estoqueStore';
  
  import { 
    statusEstoqueOptions,
    configurationStore 
  } from '$lib/stores/configurationStore';
  
  // Presenters
  import EstoqueTablePresenter from '$lib/components/presenters/EstoqueTablePresenter.svelte';
  import EstoqueFiltersPresenter from '$lib/components/presenters/EstoqueFiltersPresenter.svelte';
  
  // Modals (vamos criar depois)
  // import EstoqueAdjustModal from '$lib/components/modals/EstoqueAdjustModal.svelte';
  // import EstoqueHistoryModal from '$lib/components/modals/EstoqueHistoryModal.svelte';
  
  // Flowbite components
  import { Card, Button, Alert } from 'flowbite-svelte';
  import { PlusOutline, DownloadOutline } from 'flowbite-svelte-icons';
  
  // ==================== PROPS EXTERNAS ====================
  
  export let initialFilters: EstoqueFiltersParams = {};
  export let autoLoad = true;
  export let pageSize = 20;
  export let enableExport = true;
  export let enableAdjustments = true;
  
  // ==================== ESTADO LOCAL ====================
  
  // Estados dos filtros
  let currentFilters: EstoqueFiltersParams = { ...initialFilters };
  let searchTerm = '';
  let filtersExpanded = false;
  
  // Estados dos modals
  let showAdjustModal = false;
  let showHistoryModal = false;
  let selectedItem: EstoqueItem | null = null;
  
  // Opções para filtros (derivadas de configurações)
  let almoxarifadoOptions: Array<{value: string, label: string}> = [];
  
  // ==================== STORES REATIVOS ====================
  
  // Estados derivados dos stores
  $: items = $estoqueData;
  $: loading = $estoqueLoading;
  $: error = $estoqueError;
  $: empty = !loading && !error && items.length === 0;
  
  // Paginação derivada do store
  $: currentPage = $estoqueStore.page;
  $: totalPages = $estoqueStore.totalPages;
  $: totalItems = $estoqueStore.total;
  $: hasNext = $estoqueStore.hasNext;
  $: hasPrev = $estoqueStore.hasPrev;
  
  // Ordenação derivada do store
  $: currentSort = $estoqueStore.getCurrentParams()?.orderBy || '';
  $: sortDirection = $estoqueStore.getCurrentParams()?.orderDirection || 'asc';
  
  // Opções de status derivadas de configuração
  $: statusOptions = $statusEstoqueOptions?.map(option => ({
    value: option.value,
    label: option.label
  })) || [];
  
  // ==================== LIFECYCLE ====================
  
  onMount(async () => {
    console.log('🚀 EstoqueContainer: Inicializando...');
    
    // Carregar opções de almoxarifado (mock por enquanto)
    loadAlmoxarifadoOptions();
    
    if (autoLoad) {
      await handleInitialLoad();
    }
    
    console.log('✅ EstoqueContainer: Inicializado com sucesso');
  });
  
  onDestroy(() => {
    console.log('🔄 EstoqueContainer: Limpando recursos...');
  });
  
  // ==================== HANDLERS DE NEGÓCIO ====================
  
  async function handleInitialLoad() {
    try {
      await loadEstoque(initialFilters);
    } catch (err) {
      console.error('❌ Erro no carregamento inicial:', err);
    }
  }
  
  function handleSearchChange(event: any) {
    const { search } = event.detail;
    searchTerm = search;
    
    if (search.trim()) {
      searchEstoque(search);
    } else {
      // Se busca vazia, aplicar apenas filtros atuais
      filterEstoque(currentFilters);
    }
  }
  
  function handleFiltersChange(event: any) {
    const { filters } = event.detail;
    currentFilters = { ...filters };
    
    // Combinar busca com filtros
    const allFilters = {
      ...filters,
      ...(searchTerm && { search: searchTerm })
    };
    
    filterEstoque(allFilters);
  }
  
  function handleFiltersClear() {
    currentFilters = {};
    searchTerm = '';
    clearEstoqueFilters();
  }
  
  function handleFiltersToggle(event: any) {
    filtersExpanded = event.detail.expanded;
  }
  
  // ==================== HANDLERS DE TABELA ====================
  
  function handleSortChange(event: any) {
    const { field, direction } = event.detail;
    sortEstoque(field, direction);
  }
  
  function handlePageChange(event: any) {
    const { page } = event.detail;
    estoqueStore.goToPage(page);
  }
  
  function handlePreviousPage() {
    estoqueStore.prevPage();
  }
  
  function handleNextPage() {
    estoqueStore.nextPage();
  }
  
  // ==================== HANDLERS DE AÇÕES ====================
  
  function handleItemEdit(event: any) {
    const { item } = event.detail;
    selectedItem = item;
    showAdjustModal = true;
    
    console.log('✏️ Editando item de estoque:', item.id);
  }
  
  function handleItemHistory(event: any) {
    const { item } = event.detail;
    selectedItem = item;
    showHistoryModal = true;
    
    console.log('📊 Visualizando histórico do item:', item.id);
  }
  
  function handleExport() {
    console.log('📥 Exportando dados de estoque...');
    // TODO: Implementar exportação
  }
  
  function handleNewMovement() {
    console.log('➕ Nova movimentação de estoque...');
    // TODO: Implementar nova movimentação
  }
  
  // ==================== MODAL HANDLERS ====================
  
  function handleAdjustModalClose() {
    showAdjustModal = false;
    selectedItem = null;
  }
  
  function handleHistoryModalClose() {
    showHistoryModal = false;
    selectedItem = null;
  }
  
  async function handleAdjustSuccess() {
    showAdjustModal = false;
    selectedItem = null;
    
    // Recarregar dados após ajuste
    await estoqueStore.reload();
  }
  
  // ==================== UTILITIES ====================
  
  function loadAlmoxarifadoOptions() {
    // Mock de almoxarifados - substituir por API real
    almoxarifadoOptions = [
      { value: 'alm-01', label: 'Almoxarifado Central' },
      { value: 'alm-02', label: 'Almoxarifado Obra A' },
      { value: 'alm-03', label: 'Almoxarifado Obra B' },
      { value: 'alm-04', label: 'Almoxarifado Emergência' }
    ];
  }
  
  // ==================== COMPUTED ====================
  
  // Verificar se tem configurações carregadas
  $: hasConfigurations = $configurationStore !== null;
  
  // Stats básicas para exibição
  $: stats = {
    totalItems: totalItems,
    currentPage: currentPage,
    totalPages: totalPages,
    pageSize: pageSize
  };
</script>

<!-- ==================== HTML ==================== -->

<div class="estoque-container space-y-6">
  
  <!-- Header com Ações -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Estoque v2
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Gestão modernizada com Container/Presenter pattern
      </p>
    </div>
    
    <div class="flex gap-2">
      {#if enableExport}
        <Button 
          size="sm" 
          color="light"
          on:click={handleExport}
          disabled={loading || empty}
        >
          <DownloadOutline class="w-4 h-4 mr-2" />
          Exportar
        </Button>
      {/if}
      
      {#if enableAdjustments}
        <Button 
          size="sm" 
          color="primary"
          on:click={handleNewMovement}
        >
          <PlusOutline class="w-4 h-4 mr-2" />
          Nova Movimentação
        </Button>
      {/if}
    </div>
  </div>
  
  <!-- Filtros -->
  <Card>
    <EstoqueFiltersPresenter
      filters={currentFilters}
      {searchTerm}
      expanded={filtersExpanded}
      {loading}
      {statusOptions}
      {almoxarifadoOptions}
      on:searchChange={handleSearchChange}
      on:filtersChange={handleFiltersChange}
      on:filtersClear={handleFiltersClear}
      on:toggleExpanded={handleFiltersToggle}
    />
  </Card>
  
  <!-- Tabela Principal -->
  <Card>
    <EstoqueTablePresenter
      {items}
      {loading}
      {error}
      {empty}
      {currentPage}
      {totalPages}
      {pageSize}
      {totalItems}
      {hasNext}
      {hasPrev}
      {currentSort}
      {sortDirection}
      on:itemEdit={handleItemEdit}
      on:itemHistory={handleItemHistory}
      on:sortChange={handleSortChange}
      on:pageChange={handlePageChange}
      on:previousPage={handlePreviousPage}
      on:nextPage={handleNextPage}
    />
  </Card>
  
  <!-- Debug Info (apenas em desenvolvimento) -->
  {#if process.env.NODE_ENV === 'development'}
    <Card>
      <h3 class="text-lg font-semibold mb-2">Debug - Container State</h3>
      <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        <div><strong>Configurações carregadas:</strong> {hasConfigurations ? 'Sim' : 'Não'}</div>
        <div><strong>Filtros ativos:</strong> {JSON.stringify(currentFilters)}</div>
        <div><strong>Busca:</strong> "{searchTerm}"</div>
        <div><strong>Stats:</strong> {JSON.stringify(stats)}</div>
        <div><strong>Status options:</strong> {statusOptions.length} opções</div>
        <div><strong>Almoxarifado options:</strong> {almoxarifadoOptions.length} opções</div>
      </div>
    </Card>
  {/if}
</div>

<!-- ==================== MODALS ==================== -->

<!-- Modal de Ajuste de Estoque (placeholder) -->
{#if showAdjustModal && selectedItem}
  <div class="modal-placeholder">
    <Alert color="blue" class="mb-4">
      <strong>Modal de Ajuste:</strong> {selectedItem.tipoEpiNome}
      <br>
      <small>Componente EstoqueAdjustModal será implementado na próxima iteração</small>
      <Button size="xs" color="light" on:click={handleAdjustModalClose} class="ml-2">
        Fechar
      </Button>
    </Alert>
  </div>
{/if}

<!-- Modal de Histórico (placeholder) -->
{#if showHistoryModal && selectedItem}
  <div class="modal-placeholder">
    <Alert color="green" class="mb-4">
      <strong>Modal de Histórico:</strong> {selectedItem.tipoEpiNome}
      <br>
      <small>Componente EstoqueHistoryModal será implementado na próxima iteração</small>
      <Button size="xs" color="light" on:click={handleHistoryModalClose} class="ml-2">
        Fechar
      </Button>
    </Alert>
  </div>
{/if}

<!-- ==================== STYLES ==================== -->

<style>
  .estoque-container {
    @apply w-full max-w-none;
  }
  
  .modal-placeholder {
    @apply fixed top-4 right-4 z-50 max-w-md;
  }
  
  /* Animações sutis */
  .estoque-container :global(.card) {
    transition: all 0.2s ease-in-out;
  }
  
  .estoque-container :global(.card:hover) {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
</style>