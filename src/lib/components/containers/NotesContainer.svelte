<!--
  Notes Container - Componente "Inteligente"
  
  Responsabilidades:
  - Gerenciar estado das notas de movimentação
  - Integração com notesAdapter
  - Lógica de filtros e paginação
  - Event handlers para CRUD
  - Delegação de UI para presenter
-->

<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { notesAdapter, type Nota, type NotesFilterParams, type CreateNotaData } from '$lib/services/entity/notesAdapter';
  import { createPaginatedStore } from '$lib/stores/paginatedStore';
  import { businessConfigStore } from '$lib/stores/businessConfigStore';
  import { notify } from '$lib/stores';
  import NotesTablePresenter from '$lib/components/presenters/NotesTablePresenter.svelte';
  import NotesFormModalPresenter from '$lib/components/presenters/NotesFormModalPresenter.svelte';

  // ==================== PROPS ====================
  
  export let initialPageSize = 10;
  export let autoRefresh = false;

  // ==================== EVENT DISPATCHER ====================
  
  const dispatch = createEventDispatcher<{
    notaCreated: Nota;
    notaUpdated: Nota;
    notaDeleted: string;
    notaProcessed: Nota;
  }>();

  // ==================== STORES ====================
  
  // Store paginado para notas
  const notesStore = createPaginatedStore(
    (params: NotesFilterParams) => notesAdapter.getNotas(params),
    initialPageSize
  );

  // ==================== STATE ====================
  
  // Filtros
  let searchTerm = '';
  let tipoFilter = 'todas'; // 'todas', 'entrada', 'saida'
  let statusFilter = 'todos'; // 'todos', 'pendente', 'processada', 'cancelada'
  let responsavelFilter = 'todos';
  let dataInicioFilter = '';
  let dataFimFilter = '';

  // Tab state
  let activeTab = 0; // 0 = Todas, 1 = Entrada, 2 = Saída

  // Modal state
  let showNotaModal = false;
  let modalMode: 'create' | 'edit' | 'view' = 'create';
  let modalTipo: 'entrada' | 'saida' = 'entrada';
  let selectedNota: Nota | null = null;
  let notaFormLoading = false;

  // Filter options
  let responsavelOptions: Array<{ value: string; label: string }> = [
    { value: 'todos', label: 'Todos os Responsáveis' }
  ];

  let statusOptions: Array<{ value: string; label: string }> = [
    { value: 'todos', label: 'Todos os Status' }
  ];

  // ==================== LIFECYCLE ====================
  
  onMount(async () => {
    console.log('📋 NotesContainer: Inicializando...');
    
    // Aguardar configurações de negócio
    await businessConfigStore.initialize();
    
    // Carregar opções de filtros
    await loadFilterOptions();
    
    // Carregar dados iniciais
    await loadNotesData();
    
    console.log('✅ NotesContainer: Inicializado com sucesso');
  });

  // ==================== DATA LOADING ====================
  
  async function loadNotesData(): Promise<void> {
    const params: NotesFilterParams = {
      search: searchTerm || undefined,
      tipo: getFilteredTipo(),
      status: statusFilter !== 'todos' ? statusFilter as any : undefined,
      responsavel: responsavelFilter !== 'todos' ? responsavelFilter : undefined,
      dataInicio: dataInicioFilter || undefined,
      dataFim: dataFimFilter || undefined,
      page: $notesStore.currentPage,
      pageSize: $notesStore.pageSize
    };

    await notesStore.load(params);
  }

  async function loadFilterOptions(): Promise<void> {
    try {
      const options = await notesAdapter.getFilterOptions();
      
      responsavelOptions = [
        { value: 'todos', label: 'Todos os Responsáveis' },
        ...options.responsaveis
      ];
      
      statusOptions = [
        { value: 'todos', label: 'Todos os Status' },
        ...options.status
      ];
    } catch (error) {
      console.error('Erro ao carregar opções de filtros:', error);
    }
  }

  // ==================== FILTER HELPERS ====================
  
  function getFilteredTipo(): 'entrada' | 'saida' | undefined {
    if (activeTab === 1) return 'entrada';
    if (activeTab === 2) return 'saida';
    return tipoFilter !== 'todas' ? tipoFilter as any : undefined;
  }

  // ==================== TAB HANDLERS ====================
  
  function handleTabChange(tabIndex: number): void {
    activeTab = tabIndex;
    notesStore.resetPage();
    loadNotesData();
  }

  // ==================== FILTER HANDLERS ====================
  
  function handleSearchChange(value: string): void {
    searchTerm = value;
    notesStore.resetPage();
    loadNotesData();
  }

  function handleTipoFilterChange(value: string): void {
    tipoFilter = value;
    notesStore.resetPage();
    loadNotesData();
  }

  function handleStatusFilterChange(value: string): void {
    statusFilter = value;
    notesStore.resetPage();
    loadNotesData();
  }

  function handleResponsavelFilterChange(value: string): void {
    responsavelFilter = value;
    notesStore.resetPage();
    loadNotesData();
  }

  function handleDataInicioChange(value: string): void {
    dataInicioFilter = value;
    notesStore.resetPage();
    loadNotesData();
  }

  function handleDataFimChange(value: string): void {
    dataFimFilter = value;
    notesStore.resetPage();
    loadNotesData();
  }

  function handleClearFilters(): void {
    searchTerm = '';
    tipoFilter = 'todas';
    statusFilter = 'todos';
    responsavelFilter = 'todos';
    dataInicioFilter = '';
    dataFimFilter = '';
    activeTab = 0;
    notesStore.resetPage();
    loadNotesData();
  }

  // ==================== PAGINATION HANDLERS ====================
  
  function handlePageChange(page: number): void {
    notesStore.setPage(page);
    loadNotesData();
  }

  function handlePageSizeChange(pageSize: number): void {
    notesStore.setPageSize(pageSize);
    loadNotesData();
  }

  // ==================== NOTA CRUD HANDLERS ====================
  
  function handleNovaNota(tipo: 'entrada' | 'saida'): void {
    selectedNota = null;
    modalMode = 'create';
    modalTipo = tipo;
    showNotaModal = true;
  }

  function handleEditarNota(nota: Nota): void {
    selectedNota = nota;
    modalMode = 'edit';
    modalTipo = nota.tipo;
    showNotaModal = true;
  }

  function handleVisualizarNota(nota: Nota): void {
    selectedNota = nota;
    modalMode = 'view';
    modalTipo = nota.tipo;
    showNotaModal = true;
  }

  async function handleExcluirNota(nota: Nota): Promise<void> {
    try {
      await notesAdapter.deleteNota(nota.id);
      
      notify.success('Nota removida', `${nota.numeroNota} foi removida`);
      
      // Recarregar dados
      await loadNotesData();
      await loadFilterOptions(); // Atualizar opções de filtros
      
      // Emitir evento
      dispatch('notaDeleted', nota.id);
    } catch (error) {
      console.error('Erro ao excluir nota:', error);
      notify.error('Erro ao excluir', 'Não foi possível remover a nota');
    }
  }

  async function handleProcessarNota(nota: Nota): Promise<void> {
    try {
      const updatedNota = await notesAdapter.processarNota(nota.id);
      
      notify.success('Nota processada', `${nota.numeroNota} foi processada`);
      
      // Recarregar dados
      await loadNotesData();
      
      // Emitir evento
      dispatch('notaProcessed', updatedNota);
    } catch (error) {
      console.error('Erro ao processar nota:', error);
      notify.error('Erro ao processar', 'Não foi possível processar a nota');
    }
  }

  // ==================== FORM MODAL HANDLERS ====================
  
  async function handleFormSave(formData: CreateNotaData): Promise<void> {
    notaFormLoading = true;
    
    try {
      let result: Nota;
      
      if (modalMode === 'create') {
        result = await notesAdapter.createNota(formData, modalTipo);
        notify.success('Nota criada', `${result.numeroNota} foi criada`);
        dispatch('notaCreated', result);
      } else {
        result = await notesAdapter.updateNota(selectedNota!.id, formData);
        notify.success('Nota atualizada', `${result.numeroNota} foi atualizada`);
        dispatch('notaUpdated', result);
      }
      
      // Recarregar dados
      await loadNotesData();
      await loadFilterOptions(); // Atualizar opções de filtros
      
      // Fechar modal
      showNotaModal = false;
      selectedNota = null;
      
    } catch (error) {
      console.error('Erro ao salvar nota:', error);
      notify.error('Erro ao salvar', 'Não foi possível salvar a nota');
    } finally {
      notaFormLoading = false;
    }
  }

  function handleFormCancel(): void {
    showNotaModal = false;
    selectedNota = null;
    notaFormLoading = false;
  }

  // ==================== COMPUTED PROPERTIES ====================
  
  $: hasActiveFilters = searchTerm !== '' || 
    tipoFilter !== 'todas' || 
    statusFilter !== 'todos' || 
    responsavelFilter !== 'todos' ||
    dataInicioFilter !== '' ||
    dataFimFilter !== '';

  $: modalTitle = modalMode === 'create' ? `Nova Nota de ${modalTipo === 'entrada' ? 'Entrada' : 'Saída'}` : 
    modalMode === 'edit' ? `Editar Nota de ${modalTipo === 'entrada' ? 'Entrada' : 'Saída'}` : 
    `Visualizar Nota de ${modalTipo === 'entrada' ? 'Entrada' : 'Saída'}`;

  // Auto-refresh
  let refreshInterval: NodeJS.Timeout | null = null;
  
  $: if (autoRefresh && $notesStore.data) {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(loadNotesData, 60000); // 1 minuto
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
<NotesTablePresenter
  items={$notesStore.data?.items || []}
  loading={$notesStore.loading}
  error={$notesStore.error}
  pagination={{
    currentPage: $notesStore.currentPage,
    totalPages: $notesStore.data?.totalPages || 1,
    pageSize: $notesStore.pageSize,
    total: $notesStore.data?.total || 0,
    hasNext: $notesStore.data?.hasNext || false,
    hasPrev: $notesStore.data?.hasPrev || false
  }}
  filters={{
    searchTerm,
    tipoFilter,
    statusFilter,
    responsavelFilter,
    dataInicioFilter,
    dataFimFilter,
    hasActiveFilters,
    activeTab
  }}
  filterOptions={{
    responsaveis: responsavelOptions,
    status: statusOptions
  }}
  on:searchChange={(e) => handleSearchChange(e.detail)}
  on:tipoFilterChange={(e) => handleTipoFilterChange(e.detail)}
  on:statusFilterChange={(e) => handleStatusFilterChange(e.detail)}
  on:responsavelFilterChange={(e) => handleResponsavelFilterChange(e.detail)}
  on:dataInicioChange={(e) => handleDataInicioChange(e.detail)}
  on:dataFimChange={(e) => handleDataFimChange(e.detail)}
  on:clearFilters={handleClearFilters}
  on:tabChange={(e) => handleTabChange(e.detail)}
  on:pageChange={(e) => handlePageChange(e.detail)}
  on:pageSizeChange={(e) => handlePageSizeChange(e.detail)}
  on:novaNotaEntrada={() => handleNovaNota('entrada')}
  on:novaNotaSaida={() => handleNovaNota('saida')}
  on:editarNota={(e) => handleEditarNota(e.detail)}
  on:visualizarNota={(e) => handleVisualizarNota(e.detail)}
  on:excluirNota={(e) => handleExcluirNota(e.detail)}
  on:processarNota={(e) => handleProcessarNota(e.detail)}
/>

<!-- Modal de Formulário Nota -->
<NotesFormModalPresenter
  show={showNotaModal}
  mode={modalMode}
  tipo={modalTipo}
  title={modalTitle}
  nota={selectedNota}
  loading={notaFormLoading}
  on:salvar={(e) => handleFormSave(e.detail)}
  on:cancelar={handleFormCancel}
/>