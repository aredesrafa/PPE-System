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
  import { contratadasAdapter } from '$lib/services/entity/contratadasAdapter';
  import { colaboradoresAdapter } from '$lib/services/entity/colaboradoresAdapter';
  import FichasTablePresenter from '../presenters/FichasTablePresenter.svelte';
  import FichaDetailContainer from '../containers/FichaDetailContainer.svelte';
  import NovaFichaModalPresenter from '../presenters/NovaFichaModalPresenter.svelte';
  import type { FichaEPIDTO } from '$lib/types/serviceTypes';

  // ==================== PROPS ====================
  
  export let initialPageSize: number = 10;
  export const autoRefresh: boolean = false;
  export const refreshInterval: number = 30000;

  // ==================== ENHANCED STORE ====================
  
  // 🚀 MIGRADO: Store paginado usando método transitório do novo adapter
  const fichasStore = createPaginatedStore(
    (params) => {
      console.log('🔍 FichasContainer: Parâmetros de busca:', params);
      
      return fichaQueryAdapter.getFichasWithColaboradores({
        page: params.page || 1,
        limit: params.limit || initialPageSize,
        searchTerm: params.search || undefined,
        empresaFilter: params.empresa !== 'todas' ? params.empresa : undefined,
        cargoFilter: params.cargo !== 'todos' ? params.cargo : undefined,
        statusFilter: params.status !== 'todos' ? params.status : undefined,
        devolucaoPendente: params.devolucaoPendente === true  // ✅ CORREÇÃO: Comparação explícita
      }).then(response => {
        console.log('📦 FichasContainer: Resposta da API:', {
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
      });
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
  
  // Estados para filtros dinâmicos
  let filterOptions = {
    empresas: [{ value: 'todas', label: 'Todas as Empresas' }],
    cargos: [{ value: 'todos', label: 'Todos os Cargos' }]
  };
  let loadingFilterOptions = false;
  
  // Estado de inicialização para evitar flash do empty state
  let initializing = true;

  // ==================== LIFECYCLE ====================
  
  onMount(async () => {
    console.log('🚀 FichasContainer: Inicializando...');
    
    try {
      // Aguardar configurações de negócio
      if (typeof window !== 'undefined') {
        await businessConfigStore.initialize();
        
        // Carregar dados iniciais em paralelo
        await Promise.all([
          loadFichasData(),
          loadFilterOptions()
        ]);
        
        console.log('✅ FichasContainer: Inicializado com sucesso');
      }
    } catch (error: any) {
      console.error('❌ Erro ao inicializar FichasContainer:', error);
    } finally {
      // Finalizar inicialização após carregar dados ou erro
      initializing = false;
    }
  });
  
  // ==================== DATA LOADING ====================
  
  async function loadFichasData(): Promise<void> {
    try {
      await fichasStore.fetchPage();
      console.log('📋 Dados de fichas carregados');
    } catch (error: any) {
      console.error('❌ Erro ao carregar fichas:', error);
      notify.error('Erro ao carregar fichas', 'Não foi possível carregar os dados das fichas');
    }
  }
  
  // ✅ CORREÇÃO: Função para carregar opções dos filtros dinamicamente
  async function loadFilterOptions(): Promise<void> {
    try {
      loadingFilterOptions = true;
      console.log('🔧 Carregando opções dos filtros...');
      
      // Carregar empresas e colaboradores em paralelo
      const [empresasResponse, colaboradoresResponse] = await Promise.all([
        api.get('/contratadas?limit=100'),
        api.get('/colaboradores?limit=1000')
      ]);
      
      // Processar empresas
      if (empresasResponse?.success && empresasResponse.data?.contratadas) {
        const empresasOptions = empresasResponse.data.contratadas.map((empresa: any) => ({
          value: empresa.nome,
          label: empresa.nome
        }));
        
        filterOptions.empresas = [
          { value: 'todas', label: 'Todas as Empresas' },
          ...empresasOptions
        ];
        
        console.log('✅ Empresas carregadas:', empresasOptions.length);
      }
      
      // Processar cargos únicos dos colaboradores
      if (colaboradoresResponse?.success && colaboradoresResponse.data?.colaboradores) {
        const cargosUnicos = [...new Set(
          colaboradoresResponse.data.colaboradores
            .map((col: any) => col.cargo)
            .filter((cargo: string) => cargo && cargo.trim())
        )];
        
        const cargosOptions = cargosUnicos.map((cargo: string) => ({
          value: cargo,
          label: cargo
        }));
        
        filterOptions.cargos = [
          { value: 'todos', label: 'Todos os Cargos' },
          ...cargosOptions
        ];
        
        console.log('✅ Cargos únicos carregados:', cargosOptions.length);
      }
      
      // Força reatividade
      filterOptions = { ...filterOptions };
      
    } catch (error: any) {
      console.error('❌ Erro ao carregar opções dos filtros:', error);
      // Manter valores padrão em caso de erro
    } finally {
      loadingFilterOptions = false;
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
  let searchTimeout: number;
  $: {
    // ✅ CORREÇÃO SSR: Só aplicar debounce no browser
    if (typeof window !== 'undefined') {
      if (searchTimeout) clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        fichasStore.setSearch(searchTerm);
      }, 300);
    }
  }

  // Filtros reativos
  $: {
    // ✅ CORREÇÃO SSR: Só aplicar filtros no browser
    if (typeof window !== 'undefined') {
      console.log('🔄 FichasContainer: Aplicando filtros:', filters);
      
      fichasStore.setFilters({
        empresa: filters.empresa,
        cargo: filters.cargo,
        devolucaoPendente: filters.devolucaoPendente  // ✅ CORREÇÃO: Passar valor booleano direto
      });
    }
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
  
  $: fichas = ($fichasStore.items || []) as FichaEPIDTO[];
  $: loading = initializing || $fichasStore.loading;
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
    items={fichas}
    {loading}
    {error}
    pagination={{
      currentPage: pagination.page,
      totalPages: pagination.totalPages,
      pageSize: pagination.pageSize,
      total: pagination.total,
      hasNext: pagination.page < pagination.totalPages,
      hasPrev: pagination.page > 1
    }}
    filters={{
      searchTerm,
      empresaFilter: filters.empresa,
      cargoFilter: filters.cargo,
      devolucaoPendente: filters.devolucaoPendente,
      hasActiveFilters: searchTerm !== '' || filters.empresa !== 'todas' || filters.cargo !== 'todos' || filters.devolucaoPendente
    }}
    {filterOptions}
    on:searchChange={(e) => searchTerm = e.detail}
    on:empresaFilterChange={(e) => filters.empresa = e.detail}
    on:cargoFilterChange={(e) => filters.cargo = e.detail}
    on:devolucaoPendenteChange={(e) => filters.devolucaoPendente = e.detail}
    on:clearFilters={() => { searchTerm = ''; filters = { empresa: 'todas', cargo: 'todos', devolucaoPendente: false }; }}
    on:pageChange={(e) => fichasStore.goToPage(e.detail)}
    on:viewDetail={handleFichaSelect}
    on:refresh={handleRefresh}
    on:novaFicha={handleNovaFicha}
  />

  <!-- Detail Drawer -->
  {#if showDetail && selectedFichaId}
    <FichaDetailContainer
      fichaId={selectedFichaId}
      open={showDetail}
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