<!--
  Inventory Container - Componente "Inteligente"
  
  Este container demonstra a nova arquitetura modularizada:
  - Usa service adapters especializados
  - Implementa paginação server-side
  - Gerencia estado com stores otimizados
  - Separa lógica de negócio da apresentação
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    inventoryCommandAdapter, 
    entityManagementAdapter,
    businessConfigStore,
    statusEstoqueOptions,
    categoriasEPIOptions
  } from '$lib/services';
  import { createPaginatedStore } from '$lib/stores/paginatedStore';
  import { notify } from '$lib/stores';
  import InventoryTablePresenter from '../presenters/InventoryTablePresenter.svelte';
  import MovementModalPresenter from '../presenters/MovementModalPresenter.svelte';
  import HistoryModalPresenter from '../presenters/HistoryModalPresenter.svelte';
  import type { 
    ItemEstoqueDTO, 
    NovaMovimentacaoForm,
    MovimentacaoEstoqueDTO,
    TipoEPIDTO,
    AlmoxarifadoDTO 
  } from '$lib/types/serviceTypes';
  
  // ==================== PROPS ====================
  
  // Permitir configuração externa (opcional)
  export let initialPageSize: number = 20;
  export let autoRefresh: boolean = false;
  export let refreshInterval: number = 30000; // 30 segundos
  
  // ==================== STATE MANAGEMENT ====================
  
  // Store paginado usando o service adapter
  const inventoryStore = createPaginatedStore(
    (params) => inventoryCommandAdapter.getInventoryItems({
      ...params,
      includeExpanded: true // Incluir dados de tipoEPI e almoxarifado
    }),
    initialPageSize
  );
  
  // Estado local do container
  let showMovementModal = false;
  let showHistoryModal = false;
  let selectedItem: ItemEstoqueDTO | null = null;
  let selectedItemForHistory: ItemEstoqueDTO | null = null;
  let movementLoading = false;
  let historyLoading = false;
  let historyError: string | null = null;
  let movimentacoes: MovimentacaoEstoqueDTO[] = [];
  let historyPeriod = '30';
  
  // Filtros reativos - apenas status e categoria
  let filters = {
    status: 'todos',
    categoria: 'todas'
  };
  let searchTerm = '';
  
  // Dados auxiliares
  let tiposEPI: TipoEPIDTO[] = [];
  let almoxarifados: AlmoxarifadoDTO[] = [];
  
  // ==================== LIFECYCLE ====================
  
  onMount(async () => {
    console.log('🚀 InventoryContainer: Inicializando...');
    
    // Carregar dados iniciais em paralelo
    await Promise.all([
      loadInventoryData(),
      loadAuxiliaryData()
    ]);
    
    // Forçar aplicação de filtros iniciais (sem filtros aplicados)
    setTimeout(() => {
      applyFilters();
    }, 100);
    
    // Setup auto-refresh se habilitado
    if (autoRefresh) {
      setupAutoRefresh();
    }
    
    console.log('✅ InventoryContainer: Inicializado com sucesso');
  });
  
  // ==================== DATA LOADING ====================
  
  /**
   * Carrega dados de inventário
   */
  async function loadInventoryData(): Promise<void> {
    try {
      await inventoryStore.fetchPage();
      console.log('📦 Dados de inventário carregados');
    } catch (error) {
      console.error('❌ Erro ao carregar inventário:', error);
      notify.error('Erro ao carregar inventário', 'Não foi possível carregar os dados do estoque');
    }
  }
  
  /**
   * Carrega dados auxiliares (tipos EPI, almoxarifados)
   */
  async function loadAuxiliaryData(): Promise<void> {
    try {
      const [tiposResponse, almoxarifadosResponse] = await Promise.all([
        entityManagementAdapter.getTiposEPI({ ativo: true }),
        entityManagementAdapter.getAlmoxarifados({ ativo: true })
      ]);
      
      tiposEPI = tiposResponse.data || [];
      almoxarifados = almoxarifadosResponse;
      
      console.log(`📋 Carregados ${tiposEPI.length} tipos EPI e ${almoxarifados.length} almoxarifados`);
    } catch (error) {
      console.error('❌ Erro ao carregar dados auxiliares:', error);
    }
  }
  
  /**
   * Setup de auto-refresh
   */
  function setupAutoRefresh(): void {
    const interval = setInterval(async () => {
      if (!$inventoryStore.loading && !showMovementModal) {
        console.log('🔄 Auto-refresh do inventário');
        await inventoryStore.reload();
      }
    }, refreshInterval);
    
    // Cleanup no destroy
    return () => clearInterval(interval);
  }
  
  // ==================== REACTIVE STATEMENTS ====================
  
  // Aplicar filtros quando mudarem - debounce para evitar muitas requisições
  let filterTimeout: ReturnType<typeof setTimeout>;
  $: {
    // Trigger quando searchTerm ou filters mudarem
    if (searchTerm !== undefined || filters.status || filters.categoria) {
      clearTimeout(filterTimeout);
      filterTimeout = setTimeout(() => {
        applyFilters();
      }, 300);
    }
  }
  
  /**
   * Aplica filtros de forma reativa
   */
  function applyFilters(): void {
    const activeFilters: Record<string, any> = {};
    
    // Adicionar busca se não estiver vazia
    if (searchTerm && searchTerm.trim() !== '') {
      activeFilters.search = searchTerm.trim();
    }
    
    // Adicionar filtros apenas se diferentes dos valores padrão
    if (filters.status && filters.status !== 'todos') {
      activeFilters.status = filters.status;
    }
    
    if (filters.categoria && filters.categoria !== 'todas') {
      activeFilters.categoria = filters.categoria;
    }
    
    console.log('🔧 Aplicando filtros:', activeFilters);
    inventoryStore.setFilters(activeFilters);
  }
  
  // ==================== EVENT HANDLERS ====================
  
  /**
   * Handler para mudança de página
   */
  function handlePageChange(event: CustomEvent<{ page: number }>): void {
    inventoryStore.goToPage(event.detail.page);
  }
  
  /**
   * Handler para edição de item
   */
  function handleItemEdit(event: CustomEvent<{ item: ItemEstoqueDTO }>): void {
    selectedItem = event.detail.item;
    showMovementModal = true;
    console.log('✏️ Editando item:', selectedItem.id);
  }
  
  /**
   * Handler para histórico de item
   */
  async function handleItemHistory(event: CustomEvent<{ item: ItemEstoqueDTO }>): Promise<void> {
    selectedItemForHistory = event.detail.item;
    showHistoryModal = true;
    await loadItemHistory();
    console.log('📊 Abrindo histórico do item:', selectedItemForHistory.id);
  }

  /**
   * Carrega histórico de movimentações do item
   */
  async function loadItemHistory(): Promise<void> {
    if (!selectedItemForHistory) return;
    
    historyLoading = true;
    historyError = null;
    
    try {
      const history = await inventoryCommandAdapter.getItemMovementHistory(
        selectedItemForHistory.id,
        { 
          limit: 100,
          // Filtrar por período se necessário
          dataInicio: getDateFromPeriod(historyPeriod)
        }
      );
      
      movimentacoes = history;
      console.log(`📊 Carregado histórico: ${history.length} movimentações`);
    } catch (error) {
      console.error('❌ Erro ao carregar histórico:', error);
      historyError = error instanceof Error ? error.message : 'Erro desconhecido';
    } finally {
      historyLoading = false;
    }
  }

  /**
   * Calcula data inicial baseada no período selecionado
   */
  function getDateFromPeriod(period: string): string {
    const now = new Date();
    const days = parseInt(period);
    const pastDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    return pastDate.toISOString().split('T')[0];
  }
  
  /**
   * Handler para salvar movimentação
   */
  async function handleMovementSave(event: CustomEvent<NovaMovimentacaoForm>): Promise<void> {
    movementLoading = true;
    
    try {
      console.log('💾 Salvando movimentação:', event.detail);
      
      // Usar o service adapter para registrar movimentação
      const result = await inventoryCommandAdapter.registerMovement(event.detail);
      
      console.log('✅ Movimentação registrada:', result.id);
      
      // Fechar modal
      showMovementModal = false;
      selectedItem = null;
      
      // Recarregar dados
      await inventoryStore.reload();
      
      notify.success(
        'Movimentação registrada', 
        `${event.detail.tipoMovimentacao} de ${event.detail.quantidade} unidades`
      );
      
    } catch (error) {
      console.error('❌ Erro ao salvar movimentação:', error);
      notify.error('Erro ao salvar', 'Não foi possível registrar a movimentação');
    } finally {
      movementLoading = false;
    }
  }
  
  /**
   * Handler para cancelar movimentação
   */
  function handleMovementCancel(): void {
    showMovementModal = false;
    selectedItem = null;
    console.log('❌ Movimentação cancelada');
  }
  
  /**
   * Handler para mudança de busca
   */
  function handleSearchChange(event: CustomEvent<{ value: string }>): void {
    searchTerm = event.detail.value;
    console.log('🔍 Busca alterada:', searchTerm);
  }
  
  /**
   * Handler para mudança de filtro
   */
  function handleFilterChange(event: CustomEvent<{ key: string; value: string }>): void {
    filters = { ...filters, [event.detail.key]: event.detail.value };
    console.log('🔧 Filtro alterado:', event.detail.key, '=', event.detail.value);
  }
  
  /**
   * Handler para limpar filtros
   */
  function handleClearFilters(): void {
    // Reset filters to default values
    filters = { status: 'todos', categoria: 'todas' };
    searchTerm = '';
    
    // Clear any pending timeout to avoid race conditions
    clearTimeout(filterTimeout);
    
    // Apply empty filters immediately
    inventoryStore.setFilters({});
    
    console.log('🗑️ Filtros limpos - retornando ao estado inicial');
  }

  /**
   * Handler para fechar modal de histórico
   */
  function handleHistoryClose(): void {
    showHistoryModal = false;
    selectedItemForHistory = null;
    movimentacoes = [];
    historyError = null;
    console.log('❌ Modal de histórico fechado');
  }

  /**
   * Handler para mudança de período no histórico
   */
  async function handleHistoryPeriodChange(event: CustomEvent<{ period: string }>): Promise<void> {
    historyPeriod = event.detail.period;
    await loadItemHistory();
    console.log('📅 Período do histórico alterado:', historyPeriod);
  }
  
  /**
   * Handler para nova movimentação
   */
  function handleNewMovement(): void {
    selectedItem = null; // Nova movimentação não tem item específico
    showMovementModal = true;
    console.log('➕ Nova movimentação');
  }
  
  // ==================== COMPUTED PROPERTIES ====================
  
  // Opções para dropdowns baseadas em configuração dinâmica
  $: statusOptions = $statusEstoqueOptions;
  $: categoriaOptions = $categoriasEPIOptions;
  
  // Opções de almoxarifado
  $: almoxarifadoOptions = [
    { value: '', label: 'Todos os Almoxarifados' },
    ...almoxarifados.map(alm => ({ value: alm.id, label: alm.nome }))
  ];
  
  // Verificar se configurações estão prontas
  $: configReady = $businessConfigStore?.data !== null;
  
  // Estado consolidado para o presenter
  $: containerState = {
    items: $inventoryStore.items,
    loading: $inventoryStore.loading,
    error: $inventoryStore.error,
    total: $inventoryStore.total,
    page: $inventoryStore.page,
    totalPages: $inventoryStore.totalPages,
    searchTerm,
    filters,
    statusOptions,
    categoriaOptions
  };
</script>

<!-- 
  O Container não possui HTML próprio - apenas gerencia estado e lógica.
  Todo o HTML fica no Presenter, que é "burro" e apenas recebe dados e emite eventos.
-->

{#if configReady}
  <InventoryTablePresenter
    {...containerState}
    on:pageChange={handlePageChange}
    on:itemEdit={handleItemEdit}
    on:itemHistory={handleItemHistory}
    on:searchChange={handleSearchChange}
    on:filterChange={handleFilterChange}
    on:clearFilters={handleClearFilters}
    on:newMovement={handleNewMovement}
  />

  {#if showMovementModal}
    <MovementModalPresenter
      item={selectedItem}
      {tiposEPI}
      {almoxarifados}
      loading={movementLoading}
      show={showMovementModal}
      on:save={handleMovementSave}
      on:cancel={handleMovementCancel}
    />
  {/if}

  {#if showHistoryModal}
    <HistoryModalPresenter
      item={selectedItemForHistory}
      {movimentacoes}
      loading={historyLoading}
      error={historyError}
      show={showHistoryModal}
      on:close={handleHistoryClose}
      on:filterChange={handleHistoryPeriodChange}
    />
  {/if}
{:else}
  <!-- Loading state enquanto configurações carregam -->
  <div class="flex items-center justify-center py-12">
    <div class="text-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Carregando configurações...
      </p>
    </div>
  </div>
{/if}