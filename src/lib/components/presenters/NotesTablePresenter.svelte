<!--
  Notes Table Presenter - Componente "Burro"
  
  Responsabilidades:
  - Renderizar UI da tabela de notas
  - Renderizar filtros e tabs
  - Renderizar paginação
  - Emitir eventos para o Container
  - Zero lógica de negócio
-->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Card, Button, Input, Badge, Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Tabs, TabItem } from 'flowbite-svelte';
  import { PlusOutline, SearchOutline, EyeOutline, PenOutline, TrashBinOutline, RefreshOutline, CheckOutline } from 'flowbite-svelte-icons';
  import SearchableDropdown from '$lib/components/common/SearchableDropdown.svelte';
  import LoadingSpinner from '$lib/components/common/LoadingSpinner.svelte';
  import ErrorDisplay from '$lib/components/common/ErrorDisplay.svelte';
  import type { Nota, NotaEntrada, NotaSaida } from '$lib/services/entity/notesAdapter';
  import { formatarData } from '$lib/utils/dateHelpers';

  // ==================== PROPS ====================
  
  export let items: Nota[] = [];
  export let loading = false;
  export let error: string | null = null;
  
  export let pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  
  export let filters: {
    searchTerm: string;
    tipoFilter: string;
    statusFilter: string;
    responsavelFilter: string;
    dataInicioFilter: string;
    dataFimFilter: string;
    hasActiveFilters: boolean;
    activeTab: number;
  };
  
  export let filterOptions: {
    responsaveis: Array<{ value: string; label: string }>;
    status: Array<{ value: string; label: string }>;
  };

  // ==================== EVENT DISPATCHER ====================
  
  const dispatch = createEventDispatcher<{
    searchChange: string;
    tipoFilterChange: string;
    statusFilterChange: string;
    responsavelFilterChange: string;
    dataInicioChange: string;
    dataFimChange: string;
    clearFilters: void;
    tabChange: number;
    pageChange: number;
    pageSizeChange: number;
    novaNotaEntrada: void;
    novaNotaSaida: void;
    editarNota: Nota;
    visualizarNota: Nota;
    excluirNota: Nota;
    processarNota: Nota;
  }>();

  // ==================== TAB CONFIGURATION ====================
  
  const tabs = [
    { label: 'Todas', count: 0 },
    { label: 'Entrada', count: 0 },
    { label: 'Saída', count: 0 }
  ];

  // ==================== TIPO FILTER OPTIONS ====================
  
  const tipoOptions = [
    { value: 'todas', label: 'Todos os Tipos' },
    { value: 'entrada', label: 'Entrada' },
    { value: 'saida', label: 'Saída' }
  ];

  // ==================== HANDLERS ====================
  
  function handleSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    dispatch('searchChange', target.value);
  }

  function handleTipoChange(event: CustomEvent<string>): void {
    dispatch('tipoFilterChange', event.detail);
  }

  function handleStatusChange(event: CustomEvent<string>): void {
    dispatch('statusFilterChange', event.detail);
  }

  function handleResponsavelChange(event: CustomEvent<string>): void {
    dispatch('responsavelFilterChange', event.detail);
  }

  function handleDataInicioInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    dispatch('dataInicioChange', target.value);
  }

  function handleDataFimInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    dispatch('dataFimChange', target.value);
  }

  function handleClearFilters(): void {
    dispatch('clearFilters');
  }

  function handleTabChange(tabIndex: number): void {
    dispatch('tabChange', tabIndex);
  }

  function handlePageChange(page: number): void {
    dispatch('pageChange', page);
  }

  function handleNovaNotaEntrada(): void {
    dispatch('novaNotaEntrada');
  }

  function handleNovaNotaSaida(): void {
    dispatch('novaNotaSaida');
  }

  function handleEditarNota(nota: Nota): void {
    dispatch('editarNota', nota);
  }

  function handleVisualizarNota(nota: Nota): void {
    dispatch('visualizarNota', nota);
  }

  function handleExcluirNota(nota: Nota): void {
    dispatch('excluirNota', nota);
  }

  function handleProcessarNota(nota: Nota): void {
    dispatch('processarNota', nota);
  }

  // ==================== COMPUTED PROPERTIES ====================
  
  $: statusBadgeColor = (status: string) => {
    switch (status) {
      case 'processada': return 'green';
      case 'pendente': return 'yellow';
      case 'cancelada': return 'red';
      default: return 'gray';
    }
  };

  $: statusText = (status: string) => {
    switch (status) {
      case 'processada': return 'Processada';
      case 'pendente': return 'Pendente';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  $: tipoText = (tipo: string) => tipo === 'entrada' ? 'Entrada' : 'Saída';
  $: tipoBadgeColor = (tipo: string) => tipo === 'entrada' ? 'blue' : 'purple';

  // Função helper para checar se é NotaEntrada
  function isNotaEntrada(nota: Nota): nota is NotaEntrada {
    return nota.tipo === 'entrada';
  }

  // Função helper para checar se é NotaSaida
  function isNotaSaida(nota: Nota): nota is NotaSaida {
    return nota.tipo === 'saida';
  }

  // Calcular totais dos itens
  function calcularTotalItens(nota: Nota): number {
    return nota.itens.reduce((total, item) => total + item.quantidade, 0);
  }

  // Formatar valor monetário
  function formatarValor(valor?: number): string {
    if (!valor) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }
</script>

<svelte:head>
  <title>Notas de Movimentação - DataLife EPI</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-xl font-medium text-gray-900 dark:text-white">Notas de Movimentação</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Gerencie as notas de entrada e saída de EPIs
      </p>
    </div>
    <div class="flex space-x-2">
      <Button size="sm" color="blue" class="rounded-sm" on:click={handleNovaNotaEntrada}>
        <PlusOutline class="w-4 h-4 mr-2" />
        Nova Entrada
      </Button>
      <Button size="sm" color="purple" class="rounded-sm" on:click={handleNovaNotaSaida}>
        <PlusOutline class="w-4 h-4 mr-2" />
        Nova Saída
      </Button>
    </div>
  </div>

  <!-- Content -->
  {#if loading}
    <LoadingSpinner />
  {:else if error}
    <ErrorDisplay 
      {error} 
      onRetry={() => dispatch('pageChange', pagination.currentPage)}
    />
  {:else}
    <!-- Tabs -->
    <Tabs 
      style="underline" 
      contentClass="mt-4"
      activeTabValue={filters.activeTab}
      on:click={(e) => handleTabChange(e.detail)}
    >
      <TabItem open={filters.activeTab === 0} title="Todas as Notas">
        <span slot="title">Todas</span>
      </TabItem>
      <TabItem open={filters.activeTab === 1} title="Notas de Entrada">
        <span slot="title">Entrada</span>
      </TabItem>
      <TabItem open={filters.activeTab === 2} title="Notas de Saída">
        <span slot="title">Saída</span>
      </TabItem>
    </Tabs>

    {#if items.length > 0}
      <!-- Table with Filters -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <!-- Filters inside table container -->
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <!-- Search -->
            <div class="relative lg:col-span-2">
              <SearchOutline class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar notas..."
                class="pl-10 rounded-sm h-10 text-sm"
                value={filters.searchTerm}
                on:input={handleSearchInput}
              />
            </div>
            
            <!-- Status Filter -->
            <SearchableDropdown
              options={filterOptions.status}
              value={filters.statusFilter}
              placeholder="Status"
              on:change={handleStatusChange}
            />
            
            <!-- Responsável Filter -->
            <SearchableDropdown
              options={filterOptions.responsaveis}
              value={filters.responsavelFilter}
              placeholder="Responsável"
              on:change={handleResponsavelChange}
            />
            
            <!-- Data Início -->
            <Input
              type="date"
              placeholder="Data Início"
              class="rounded-sm h-10 text-sm"
              value={filters.dataInicioFilter}
              on:input={handleDataInicioInput}
            />
            
            <!-- Clear Filters Button -->
            {#if filters.hasActiveFilters}
              <Button 
                color="alternative" 
                class="rounded-sm h-10 w-10 p-0 flex items-center justify-center" 
                on:click={handleClearFilters}
                title="Limpar Filtros"
              >
                <RefreshOutline class="w-4 h-4" />
              </Button>
            {:else}
              <div></div>
            {/if}
          </div>
        </div>
        
        <!-- Table content with responsive behavior -->
        <div class="min-w-[1200px] overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Número</TableHeadCell>
              <TableHeadCell>Tipo</TableHeadCell>
              <TableHeadCell>Data</TableHeadCell>
              <TableHeadCell>Responsável</TableHeadCell>
              <TableHeadCell>Motivo</TableHeadCell>
              <TableHeadCell>Itens</TableHeadCell>
              <TableHeadCell>Valor</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Ações</TableHeadCell>
            </TableHead>
            <TableBody>
              {#each items as nota (nota.id)}
                <TableBodyRow>
                  <TableBodyCell>
                    <span class="font-mono text-sm font-medium">
                      {nota.numeroNota}
                    </span>
                  </TableBodyCell>
                  <TableBodyCell>
                    <Badge color={tipoBadgeColor(nota.tipo)} class="w-fit rounded-sm">
                      {tipoText(nota.tipo)}
                    </Badge>
                  </TableBodyCell>
                  <TableBodyCell>
                    <span class="text-sm">{formatarData(nota.data)}</span>
                  </TableBodyCell>
                  <TableBodyCell>
                    <span class="text-sm">{nota.responsavel}</span>
                  </TableBodyCell>
                  <TableBodyCell>
                    <span class="text-sm truncate max-w-xs" title={nota.motivo}>
                      {nota.motivo}
                    </span>
                  </TableBodyCell>
                  <TableBodyCell>
                    <span class="text-sm font-medium">
                      {calcularTotalItens(nota)} itens
                    </span>
                  </TableBodyCell>
                  <TableBodyCell>
                    {#if isNotaEntrada(nota)}
                      <span class="text-sm font-medium text-green-600">
                        {formatarValor(nota.valorTotal)}
                      </span>
                    {:else}
                      <span class="text-sm text-gray-400">-</span>
                    {/if}
                  </TableBodyCell>
                  <TableBodyCell>
                    <Badge color={statusBadgeColor(nota.status)} class="w-fit rounded-sm">
                      {statusText(nota.status)}
                    </Badge>
                  </TableBodyCell>
                  <TableBodyCell>
                    <div class="flex space-x-1">
                      <Button
                        size="sm"
                        color="alternative"
                        class="rounded-sm p-2"
                        on:click={() => handleVisualizarNota(nota)}
                        title="Visualizar"
                      >
                        <EyeOutline class="w-4 h-4" />
                      </Button>
                      {#if nota.status === 'pendente'}
                        <Button
                          size="sm"
                          color="primary"
                          class="rounded-sm p-2"
                          on:click={() => handleEditarNota(nota)}
                          title="Editar"
                        >
                          <PenOutline class="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          color="green"
                          class="rounded-sm p-2"
                          on:click={() => handleProcessarNota(nota)}
                          title="Processar"
                        >
                          <CheckOutline class="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          color="red"
                          class="rounded-sm p-2"
                          on:click={() => handleExcluirNota(nota)}
                          title="Cancelar"
                        >
                          <TrashBinOutline class="w-4 h-4" />
                        </Button>
                      {/if}
                    </div>
                  </TableBodyCell>
                </TableBodyRow>
              {/each}
            </TableBody>
          </Table>
        </div>
        
        <!-- Pagination -->
        {#if pagination.totalPages > 1}
          <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Mostrando {Math.min((pagination.currentPage - 1) * pagination.pageSize + 1, pagination.total)} a {Math.min(pagination.currentPage * pagination.pageSize, pagination.total)} de {pagination.total} resultados
            </div>
            <div class="flex space-x-2">
              <Button
                size="sm"
                color="alternative"
                class="rounded-sm"
                disabled={!pagination.hasPrev}
                on:click={() => handlePageChange(pagination.currentPage - 1)}
              >
                Anterior
              </Button>
              <span class="flex items-center px-3 text-sm text-gray-500 dark:text-gray-400">
                Página {pagination.currentPage} de {pagination.totalPages}
              </span>
              <Button
                size="sm"
                color="alternative"
                class="rounded-sm"
                disabled={!pagination.hasNext}
                on:click={() => handlePageChange(pagination.currentPage + 1)}
              >
                Próximo
              </Button>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <!-- Empty state -->
      <Card size="sm" class="rounded-sm">
        <div class="text-center py-12">
          <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <SearchOutline class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhuma nota encontrada
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">
            {filters.hasActiveFilters
              ? 'Tente ajustar os filtros ou termo de busca'
              : 'Comece criando uma nova nota de movimentação'}
          </p>
          <div class="flex justify-center space-x-2">
            <Button size="sm" color="blue" class="rounded-sm" on:click={handleNovaNotaEntrada}>
              <PlusOutline class="w-4 h-4 mr-2" />
              {!filters.hasActiveFilters ? 'Primeira Entrada' : 'Nova Entrada'}
            </Button>
            <Button size="sm" color="purple" class="rounded-sm" on:click={handleNovaNotaSaida}>
              <PlusOutline class="w-4 h-4 mr-2" />
              {!filters.hasActiveFilters ? 'Primeira Saída' : 'Nova Saída'}
            </Button>
          </div>
        </div>
      </Card>
    {/if}
  {/if}
</div>