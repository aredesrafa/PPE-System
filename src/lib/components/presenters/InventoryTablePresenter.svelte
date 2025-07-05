<!--
  Inventory Table Presenter - Componente "Burro" com Layout Original
  
  Este presenter é puramente apresentacional:
  - Recebe dados via props
  - Renderiza UI IDÊNTICA ao original
  - Emite eventos para o Container
  - Não contém lógica de negócio
-->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { 
    Card, 
    Button,
    Badge,
    Input,
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell,
    Spinner,
    Alert
  } from 'flowbite-svelte';
  import { 
    PlusOutline, 
    SearchOutline, 
    RefreshOutline,
    AdjustmentsHorizontalOutline,
    ClockOutline,
    ArrowUpOutline
  } from 'flowbite-svelte-icons';
  import SearchableDropdown from '$lib/components/common/SearchableDropdown.svelte';
  import LoadingSpinner from '$lib/components/common/LoadingSpinner.svelte';
  import ErrorDisplay from '$lib/components/common/ErrorDisplay.svelte';
  import type { ItemEstoqueDTO } from '$lib/types/serviceTypes';

  // ==================== PROPS (dados do Container) ====================
  
  export let items: ItemEstoqueDTO[] = [];
  export let loading: boolean = false;
  export let error: string | null = null;
  export let total: number = 0;
  export let page: number = 1;
  export let totalPages: number = 1;
  export let searchTerm: string = '';
  export let filters: {
    status: string;
    categoria: string;
  };
  export let categoriaOptions: Array<{ value: string; label: string }> = [];

  // ==================== EVENT DISPATCHER ====================
  
  const dispatch = createEventDispatcher<{
    pageChange: { page: number };
    itemEdit: { item: ItemEstoqueDTO };
    itemHistory: { item: ItemEstoqueDTO };
    searchChange: { value: string };
    filterChange: { key: string; value: string };
    clearFilters: void;
    newMovement: void;
  }>();

  // ==================== LOCAL STATE ====================
  
  let searchInput = '';

  // ==================== EVENT HANDLERS ====================
  
  function handleSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    searchInput = value;
    dispatch('searchChange', { value });
  }

  function handleFilterChange(key: string, value: string): void {
    dispatch('filterChange', { key, value });
  }

  function handleClearFilters(): void {
    searchInput = '';
    dispatch('clearFilters');
  }

  function handleItemEdit(item: ItemEstoqueDTO): void {
    dispatch('itemEdit', { item });
  }

  function handleItemHistory(item: ItemEstoqueDTO): void {
    dispatch('itemHistory', { item });
  }

  function handlePageChange(newPage: number): void {
    dispatch('pageChange', { page: newPage });
  }

  function handleNewMovement(): void {
    dispatch('newMovement');
  }

  // ==================== UTILITY FUNCTIONS ====================
  
  function getStatusInfo(status: string) {
    switch (status) {
      case 'disponivel':
        return { color: 'green' as const, label: 'Disponível' };
      case 'baixo':
        return { color: 'yellow' as const, label: 'Estoque baixo' };
      case 'vencendo':
        return { color: 'orange' as const, label: 'Próximo ao vencimento' };
      case 'vencido':
        return { color: 'red' as const, label: 'Vencido' };
      case 'esgotado':
        return { color: 'gray' as const, label: 'Esgotado' };
      default:
        return { color: 'gray' as const, label: 'Indefinido' };
    }
  }


  // ==================== REACTIVE STATEMENTS ====================
  
  // Sincronizar searchInput com searchTerm quando vem do container
  $: if (searchTerm !== undefined && searchTerm !== searchInput) {
    searchInput = searchTerm;
  }

  // Verificar se há filtros ativos
  $: hasActiveFilters = searchInput || 
    (filters.status && filters.status !== 'todos') || 
    (filters.categoria && filters.categoria !== 'todas');
</script>

<!-- Layout IDÊNTICO ao original -->
<div class="space-y-6">
  <!-- Header idêntico ao original -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-xl font-medium text-gray-900 dark:text-white">Estoque de EPIs</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Controle de estoque e movimentações
      </p>
    </div>
    <div class="flex space-x-2">
      <Button size="sm" color="primary" class="rounded-sm" on:click={handleNewMovement}>
        <PlusOutline class="w-4 h-4 mr-2" />
        Nova Movimentação
      </Button>
    </div>
  </div>
  
  <!-- Content -->
  {#if loading}
    <LoadingSpinner />
  {:else if error}
    <ErrorDisplay 
      {error} 
      onRetry={() => handlePageChange(page)}
    />
  {:else if items.length > 0}
    <!-- Table with Filters - LAYOUT IDÊNTICO -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <!-- Filtros dentro da tabela (não em cards separados) -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="relative">
            <SearchOutline class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nome do EPI ou CA..."
              class="pl-10 rounded-sm h-10 text-sm"
              value={searchInput}
              on:input={handleSearchInput}
            />
          </div>
          
          <!-- Status Filter - Simplificado -->
          <SearchableDropdown
            options={[
              { value: 'todos', label: 'Todos os Status' },
              { value: 'disponivel', label: 'Disponível' },
              { value: 'indisponivel', label: 'Indisponível' }
            ]}
            value={filters.status || 'todos'}
            placeholder="Status"
            on:change={(e) => handleFilterChange('status', e.detail)}
          />
          
          <!-- Category Filter -->
          <SearchableDropdown
            options={categoriaOptions}
            value={filters.categoria || 'todas'}
            placeholder="Categoria"
            on:change={(e) => handleFilterChange('categoria', e.detail)}
          />
          
          <!-- Clear Filters -->
          {#if hasActiveFilters}
            <Button 
              color="alternative" 
              class="rounded-sm h-10 w-10 p-0 flex items-center justify-center" 
              on:click={handleClearFilters}
              title="Limpar Filtros"
            >
              <RefreshOutline class="w-4 h-4" />
            </Button>
          {:else}
            <!-- Empty div to maintain grid layout -->
            <div></div>
          {/if}
        </div>
      </div>
      
      <!-- Table content with responsive behavior -->
      <div class="min-w-[980px] overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableHeadCell class="min-w-[200px]">Equipamento</TableHeadCell>
            <TableHeadCell class="min-w-[120px] hidden lg:table-cell">Categoria</TableHeadCell>
            <TableHeadCell class="min-w-[100px]">Quantidade</TableHeadCell>
            <TableHeadCell class="min-w-[120px] hidden xl:table-cell">Status</TableHeadCell>
            <TableHeadCell class="min-w-[120px]">Ações</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each items as item (item.id)}
              {@const statusInfo = getStatusInfo(item.status)}
              
              <TableBodyRow class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700" on:click={() => handleItemEdit(item)}>
                <TableBodyCell class="min-w-[200px]">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white truncate">
                      {item.tipoEPI?.nomeEquipamento || 'EPI não encontrado'}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                      CA {item.tipoEPI?.numeroCA || '-'} • {item.tipoEPI?.fabricante || '-'}
                    </p>
                    <!-- Mostrar categoria em mobile quando coluna está oculta -->
                    <p class="text-xs text-gray-500 dark:text-gray-400 lg:hidden mt-1 truncate">
                      {item.tipoEPI?.categoria || 'Sem categoria'}
                    </p>
                    <!-- Mostrar status em mobile quando coluna está oculta -->
                    <div class="xl:hidden mt-1">
                      <Badge 
                        color={statusInfo.color} 
                        class="w-fit rounded-sm text-xs"
                      >
                        {statusInfo.label}
                      </Badge>
                    </div>
                  </div>
                </TableBodyCell>
                <TableBodyCell class="min-w-[120px] hidden lg:table-cell">
                  <span class="text-sm text-gray-900 dark:text-white truncate">
                    {item.tipoEPI?.categoria || '-'}
                  </span>
                </TableBodyCell>
                <TableBodyCell class="min-w-[100px]">
                  <span class="font-medium text-gray-900 dark:text-white">
                    {item.quantidade}
                  </span>
                </TableBodyCell>
                <TableBodyCell class="min-w-[120px] hidden xl:table-cell">
                  <Badge 
                    color={statusInfo.color} 
                    class="w-fit rounded-sm"
                  >
                    {statusInfo.label}
                  </Badge>
                </TableBodyCell>
                <TableBodyCell class="min-w-[120px]">
                  <div class="flex space-x-2">
                    <!-- Botões IDÊNTICOS ao original -->
                    <button
                      class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      on:click={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleItemEdit(item);
                      }}
                      title="Ajustar quantidade"
                    >
                      <AdjustmentsHorizontalOutline class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      on:click={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleItemHistory(item);
                      }}
                      title="Ver histórico"
                    >
                      <ClockOutline class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </div>
      
      <!-- Pagination IDÊNTICA -->
      {#if totalPages > 1}
        <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {((page - 1) * 20) + 1} a {Math.min(page * 20, total)} de {total} resultados
          </div>
          <div class="flex space-x-2">
            <Button
              size="sm"
              color="alternative"
              class="rounded-sm"
              disabled={page === 1}
              on:click={() => handlePageChange(page - 1)}
            >
              Anterior
            </Button>
            <Button
              size="sm"
              color="alternative"
              class="rounded-sm"
              disabled={page === totalPages}
              on:click={() => handlePageChange(page + 1)}
            >
              Próximo
            </Button>
          </div>
        </div>
      {/if}
    </div>
  {:else}
    <!-- Empty state IDÊNTICO -->
    <Card size="sm" class="rounded-sm">
      <div class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <ArrowUpOutline class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Nenhum item no estoque
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          {searchInput || hasActiveFilters
            ? 'Tente ajustar os filtros ou termo de busca'
            : 'Comece adicionando itens ao estoque'}
        </p>
        <Button size="sm" color="primary" class="rounded-sm" on:click={handleNewMovement}>
          <PlusOutline class="w-4 h-4 mr-2" />
          Primeira Movimentação
        </Button>
      </div>
    </Card>
  {/if}
</div>