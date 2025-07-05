<!--
  Catalog Container - Componente "Inteligente"
  
  Responsabilidades:
  - Gerenciar estado do catálogo
  - Integração com catalogAdapter
  - Lógica de filtros e paginação
  - Event handlers para CRUD
  - Delegação de UI para presenter
-->

<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { catalogAdapter, type TipoEPI, type CatalogFilterParams } from '$lib/services/entity/catalogAdapter';
  import { createPaginatedStore } from '$lib/stores/paginatedStore';
  import { businessConfigStore } from '$lib/stores/businessConfigStore';
  import { notify } from '$lib/stores';
  import CatalogTablePresenter from '$lib/components/presenters/CatalogTablePresenter.svelte';
  import EPIFormModalPresenter from '$lib/components/presenters/EPIFormModalPresenter.svelte';

  // ==================== PROPS ====================
  
  export let initialPageSize = 10;
  export let autoRefresh = false;

  // ==================== EVENT DISPATCHER ====================
  
  const dispatch = createEventDispatcher<{
    epiCreated: TipoEPI;
    epiUpdated: TipoEPI;
    epiDeleted: string;
  }>();

  // ==================== STORES ====================
  
  // Store paginado para tipos de EPI
  const catalogStore = createPaginatedStore(
    (params: CatalogFilterParams) => catalogAdapter.getTiposEPI(params),
    initialPageSize
  );

  // ==================== STATE ====================
  
  // Filtros
  let searchTerm = '';
  let categoriaFilter = 'todas';
  let fabricanteFilter = 'todos';
  let statusFilter = 'todos';

  // Modal state
  let showEPIModal = false;
  let modalMode: 'create' | 'edit' | 'view' = 'create';
  let selectedEPI: TipoEPI | null = null;
  let epiFormLoading = false;

  // Filter options
  let categoriaOptions: Array<{ value: string; label: string }> = [
    { value: 'todas', label: 'Todas as Categorias' }
  ];
  let fabricanteOptions: Array<{ value: string; label: string }> = [
    { value: 'todos', label: 'Todos os Fabricantes' }
  ];

  // ==================== LIFECYCLE ====================
  
  onMount(async () => {
    console.log('📋 CatalogContainer: Inicializando...');
    
    // Aguardar configurações de negócio
    await businessConfigStore.initialize();
    
    // Carregar opções de filtros
    await loadFilterOptions();
    
    // Carregar dados iniciais
    await loadCatalogData();
    
    console.log('✅ CatalogContainer: Inicializado com sucesso');
  });

  // ==================== DATA LOADING ====================
  
  async function loadCatalogData(): Promise<void> {
    const params: CatalogFilterParams = {
      search: searchTerm || undefined,
      categoria: categoriaFilter !== 'todas' ? categoriaFilter : undefined,
      fabricante: fabricanteFilter !== 'todos' ? fabricanteFilter : undefined,
      ativo: statusFilter !== 'todos' ? statusFilter === 'ativo' : undefined,
      page: $catalogStore.currentPage,
      pageSize: $catalogStore.pageSize
    };

    await catalogStore.load(params);
  }

  async function loadFilterOptions(): Promise<void> {
    try {
      const options = await catalogAdapter.getFilterOptions();
      
      categoriaOptions = [
        { value: 'todas', label: 'Todas as Categorias' },
        ...options.categorias
      ];
      
      fabricanteOptions = [
        { value: 'todos', label: 'Todos os Fabricantes' },
        ...options.fabricantes
      ];
    } catch (error) {
      console.error('Erro ao carregar opções de filtros:', error);
    }
  }

  // ==================== FILTER HANDLERS ====================
  
  function handleSearchChange(value: string): void {
    searchTerm = value;
    catalogStore.resetPage();
    loadCatalogData();
  }

  function handleCategoriaFilterChange(value: string): void {
    categoriaFilter = value;
    catalogStore.resetPage();
    loadCatalogData();
  }

  function handleFabricanteFilterChange(value: string): void {
    fabricanteFilter = value;
    catalogStore.resetPage();
    loadCatalogData();
  }

  function handleStatusFilterChange(value: string): void {
    statusFilter = value;
    catalogStore.resetPage();
    loadCatalogData();
  }

  function handleClearFilters(): void {
    searchTerm = '';
    categoriaFilter = 'todas';
    fabricanteFilter = 'todos';
    statusFilter = 'todos';
    catalogStore.resetPage();
    loadCatalogData();
  }

  // ==================== PAGINATION HANDLERS ====================
  
  function handlePageChange(page: number): void {
    catalogStore.setPage(page);
    loadCatalogData();
  }

  function handlePageSizeChange(pageSize: number): void {
    catalogStore.setPageSize(pageSize);
    loadCatalogData();
  }

  // ==================== EPI CRUD HANDLERS ====================
  
  function handleNovoEPI(): void {
    selectedEPI = null;
    modalMode = 'create';
    showEPIModal = true;
  }

  function handleEditarEPI(epi: TipoEPI): void {
    selectedEPI = epi;
    modalMode = 'edit';
    showEPIModal = true;
  }

  function handleVisualizarEPI(epi: TipoEPI): void {
    selectedEPI = epi;
    modalMode = 'view';
    showEPIModal = true;
  }

  async function handleExcluirEPI(epi: TipoEPI): Promise<void> {
    try {
      await catalogAdapter.deleteTipoEPI(epi.id);
      
      notify.success('EPI removido', `${epi.nomeEquipamento} foi removido do catálogo`);
      
      // Recarregar dados
      await loadCatalogData();
      await loadFilterOptions(); // Atualizar opções de filtros
      
      // Emitir evento
      dispatch('epiDeleted', epi.id);
    } catch (error) {
      console.error('Erro ao excluir EPI:', error);
      notify.error('Erro ao excluir', 'Não foi possível remover o EPI do catálogo');
    }
  }

  // ==================== FORM MODAL HANDLERS ====================
  
  async function handleFormSave(formData: any): Promise<void> {
    epiFormLoading = true;
    
    try {
      let result: TipoEPI;
      
      if (modalMode === 'create') {
        result = await catalogAdapter.createTipoEPI(formData);
        notify.success('EPI criado', `${result.nomeEquipamento} foi adicionado ao catálogo`);
        dispatch('epiCreated', result);
      } else {
        result = await catalogAdapter.updateTipoEPI(selectedEPI!.id, formData);
        notify.success('EPI atualizado', `${result.nomeEquipamento} foi atualizado no catálogo`);
        dispatch('epiUpdated', result);
      }
      
      // Recarregar dados
      await loadCatalogData();
      await loadFilterOptions(); // Atualizar opções de filtros
      
      // Fechar modal
      showEPIModal = false;
      selectedEPI = null;
      
    } catch (error) {
      console.error('Erro ao salvar EPI:', error);
      notify.error('Erro ao salvar', 'Não foi possível salvar o EPI');
    } finally {
      epiFormLoading = false;
    }
  }

  function handleFormCancel(): void {
    showEPIModal = false;
    selectedEPI = null;
    epiFormLoading = false;
  }

  // ==================== COMPUTED PROPERTIES ====================
  
  $: hasActiveFilters = searchTerm !== '' || 
    categoriaFilter !== 'todas' || 
    fabricanteFilter !== 'todos' || 
    statusFilter !== 'todos';

  $: modalTitle = modalMode === 'create' ? 'Novo EPI' : 
    modalMode === 'edit' ? 'Editar EPI' : 'Visualizar EPI';

  // Auto-refresh
  let refreshInterval: NodeJS.Timeout | null = null;
  
  $: if (autoRefresh && $catalogStore.data) {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(loadCatalogData, 30000); // 30 segundos
  } else if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
  
  onDestroy(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
  });
</script>

<!-- Usar apenas o presenter para UI -->
<CatalogTablePresenter
  items={$catalogStore.data?.items || []}
  loading={$catalogStore.loading}
  error={$catalogStore.error}
  pagination={{
    currentPage: $catalogStore.currentPage,
    totalPages: $catalogStore.data?.totalPages || 1,
    pageSize: $catalogStore.pageSize,
    total: $catalogStore.data?.total || 0,
    hasNext: $catalogStore.data?.hasNext || false,
    hasPrev: $catalogStore.data?.hasPrev || false
  }}
  filters={{
    searchTerm,
    categoriaFilter,
    fabricanteFilter,  
    statusFilter,
    hasActiveFilters
  }}
  filterOptions={{
    categorias: categoriaOptions,
    fabricantes: fabricanteOptions
  }}
  on:searchChange={(e) => handleSearchChange(e.detail)}
  on:categoriaFilterChange={(e) => handleCategoriaFilterChange(e.detail)}
  on:fabricanteFilterChange={(e) => handleFabricanteFilterChange(e.detail)}
  on:statusFilterChange={(e) => handleStatusFilterChange(e.detail)}
  on:clearFilters={handleClearFilters}
  on:pageChange={(e) => handlePageChange(e.detail)}
  on:pageSizeChange={(e) => handlePageSizeChange(e.detail)}
  on:novoEPI={handleNovoEPI}
  on:editarEPI={(e) => handleEditarEPI(e.detail)}
  on:visualizarEPI={(e) => handleVisualizarEPI(e.detail)}
  on:excluirEPI={(e) => handleExcluirEPI(e.detail)}
/>

<!-- Modal de Formulário EPI -->
<EPIFormModalPresenter
  show={showEPIModal}
  mode={modalMode}
  title={modalTitle}
  epi={selectedEPI}
  loading={epiFormLoading}
  on:salvar={(e) => handleFormSave(e.detail)}
  on:cancelar={handleFormCancel}
/>