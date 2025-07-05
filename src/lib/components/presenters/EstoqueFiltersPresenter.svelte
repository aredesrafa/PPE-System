<!--
  EstoqueFiltersPresenter - Componente "Burro" para Filtros de Estoque
  
  Componente puramente apresentacional para filtros de estoque.
  Recebe valores atuais e emite eventos quando filtros mudam.
  
  Responsabilidades:
  - Renderizar campos de filtro
  - Emitir eventos de mudança
  - Estados visuais dos filtros
  - Integração com EpiCategorySelector
-->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import EpiCategorySelector from '$lib/components/forms/EpiCategorySelector.svelte';
  import type { CategoriaEPIEnum } from '$lib/constants/enums';
  import type { EstoqueFiltersParams } from '$lib/stores/estoqueStore';
  
  // Flowbite components
  import { 
    Input, 
    Select, 
    Button,
    Card,
    Checkbox
  } from 'flowbite-svelte';
  
  // Icons
  import { 
    SearchOutline,
    TrashBinOutline,
    FilterOutline
  } from 'flowbite-svelte-icons';
  
  // ==================== PROPS (VALORES ATUAIS) ====================
  
  export let filters: EstoqueFiltersParams = {};
  export let searchTerm = '';
  export let expanded = false;
  export let loading = false;
  export let disabled = false;
  
  // Opções para selects (vindas do Container)
  export let statusOptions: Array<{value: string, label: string}> = [];
  export let almoxarifadoOptions: Array<{value: string, label: string}> = [];
  
  // Styling
  export let containerClass = '';
  
  // ==================== EVENTOS ====================
  
  const dispatch = createEventDispatcher<{
    searchChange: { search: string };
    filtersChange: { filters: EstoqueFiltersParams };
    filtersClear: void;
    toggleExpanded: { expanded: boolean };
  }>();
  
  // ==================== ESTADO LOCAL (APENAS UI) ====================
  
  let localSearch = searchTerm;
  let localFilters = { ...filters };
  
  // Debounce timer para busca
  let searchTimeout: ReturnType<typeof setTimeout>;
  
  // ==================== HANDLERS ====================
  
  function handleSearchInput() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      dispatch('searchChange', { search: localSearch });
    }, 300);
  }
  
  function handleFilterChange() {
    dispatch('filtersChange', { filters: localFilters });
  }
  
  function handleCategoryChange(event: any) {
    localFilters.categoria = event.detail.selected;
    handleFilterChange();
  }
  
  function handleStatusChange(event: any) {
    localFilters.status = event.target.value || undefined;
    handleFilterChange();
  }
  
  function handleAlmoxarifadoChange(event: any) {
    localFilters.almoxarifadoId = event.target.value || undefined;
    handleFilterChange();
  }
  
  function handleCheckboxChange(field: keyof EstoqueFiltersParams, checked: boolean) {
    localFilters[field] = checked || undefined;
    handleFilterChange();
  }
  
  function handleClear() {
    localSearch = '';
    localFilters = {};
    dispatch('filtersClear');
  }
  
  function toggleExpanded() {
    dispatch('toggleExpanded', { expanded: !expanded });
  }
  
  // ==================== COMPUTED ====================
  
  // Contar filtros ativos
  $: activeFiltersCount = Object.values(localFilters).filter(Boolean).length + (localSearch ? 1 : 0);
  
  // Sincronizar props com estado local
  $: if (searchTerm !== localSearch && searchTerm !== undefined) {
    localSearch = searchTerm;
  }
  
  $: if (JSON.stringify(filters) !== JSON.stringify(localFilters)) {
    localFilters = { ...filters };
  }
</script>

<!-- ==================== HTML ==================== -->

<div class="estoque-filters-presenter {containerClass}">
  <!-- Filtros Básicos (sempre visíveis) -->
  <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
    
    <!-- Busca -->
    <div class="flex-1 min-w-0">
      <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Buscar Equipamento
      </label>
      <div class="relative">
        <Input
          id="search"
          placeholder="Nome do equipamento ou CA..."
          bind:value={localSearch}
          on:input={handleSearchInput}
          {disabled}
          class="pl-10"
        />
        <SearchOutline class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
    </div>
    
    <!-- Status (filtro rápido) -->
    <div class="w-full lg:w-48">
      <label for="status-quick" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Status
      </label>
      <Select
        id="status-quick"
        bind:value={localFilters.status}
        on:change={handleStatusChange}
        {disabled}
      >
        <option value="">Todos os status</option>
        {#each statusOptions as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </Select>
    </div>
    
    <!-- Botão Filtros Avançados -->
    <div class="flex gap-2">
      <Button 
        size="sm" 
        color="light"
        on:click={toggleExpanded}
        {disabled}
        class="relative"
      >
        <FilterOutline class="w-4 h-4 mr-2" />
        Filtros
        {#if activeFiltersCount > 0}
          <span class="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {activeFiltersCount}
          </span>
        {/if}
      </Button>
      
      {#if activeFiltersCount > 0}
        <Button 
          size="sm" 
          color="light"
          on:click={handleClear}
          {disabled}
          title="Limpar filtros"
        >
          <TrashBinOutline class="w-4 h-4" />
        </Button>
      {/if}
    </div>
  </div>
  
  <!-- Filtros Avançados (expansível) -->
  {#if expanded}
    <Card class="mt-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Filtros Avançados
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <!-- Categoria EPI -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Categoria
          </label>
          <EpiCategorySelector
            variant="select"
            selected={localFilters.categoria}
            placeholder="Todas as categorias"
            showAll={true}
            {disabled}
            on:change={handleCategoryChange}
          />
        </div>
        
        <!-- Almoxarifado -->
        <div>
          <label for="almoxarifado" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Localização
          </label>
          <Select
            id="almoxarifado"
            bind:value={localFilters.almoxarifadoId}
            on:change={handleAlmoxarifadoChange}
            {disabled}
          >
            <option value="">Todas as localizações</option>
            {#each almoxarifadoOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </Select>
        </div>
        
        <!-- Filtros Booleanos -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Opções
          </label>
          
          <div class="space-y-2">
            <Checkbox
              bind:checked={localFilters.apenasAbaixoMinimo}
              on:change={(e) => handleCheckboxChange('apenasAbaixoMinimo', e.target.checked)}
              {disabled}
            >
              Apenas abaixo do mínimo
            </Checkbox>
            
            <Checkbox
              bind:checked={localFilters.apenasComSaldo}
              on:change={(e) => handleCheckboxChange('apenasComSaldo', e.target.checked)}
              {disabled}
            >
              Apenas com saldo
            </Checkbox>
          </div>
        </div>
      </div>
      
      <!-- Ações dos Filtros Avançados -->
      <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          {activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''} ativo{activeFiltersCount !== 1 ? 's' : ''}
        </div>
        
        <div class="flex gap-2">
          <Button 
            size="sm" 
            color="light"
            on:click={handleClear}
            {disabled}
          >
            Limpar Todos
          </Button>
          
          <Button 
            size="sm" 
            color="light"
            on:click={toggleExpanded}
            {disabled}
          >
            Fechar
          </Button>
        </div>
      </div>
    </Card>
  {/if}
</div>

<!-- ==================== STYLES ==================== -->

<style>
  .estoque-filters-presenter {
    @apply w-full;
  }
  
  /* Animação suave para expansão */
  .estoque-filters-presenter :global(.card) {
    animation: slideDown 0.3s ease-out;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Badge de contador de filtros */
  .estoque-filters-presenter :global(.relative .absolute) {
    animation: pulse 2s infinite;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .estoque-filters-presenter :global(.grid) {
      @apply grid-cols-1;
    }
  }
</style>