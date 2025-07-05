<!--
  EstoqueTablePresenter - Componente "Burro" para Tabela de Estoque
  
  Componente puramente apresentacional que recebe dados via props
  e emite eventos para o Container pai. Zero lógica de negócio.
  
  Responsabilidades:
  - Renderizar tabela com dados de estoque
  - Emitir eventos de interação do usuário
  - Gerenciar estados visuais (loading, empty, error)
  - Paginação visual
  - Ordenação visual
-->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { EstoqueItem } from '$lib/stores/estoqueStore';
  import StatusBadge from '$lib/components/ui/StatusBadge.svelte';
  
  // Flowbite components
  import { 
    Table, 
    TableBody, 
    TableBodyCell, 
    TableBodyRow, 
    TableHead, 
    TableHeadCell,
    Button,
    Spinner,
    Alert,
    Badge
  } from 'flowbite-svelte';
  
  // Icons
  import { 
    EditOutline,
    ChartBarOutline,
    ExclamationTriangleOutline,
    ArchiveBoxOutline
  } from 'flowbite-svelte-icons';
  
  // ==================== PROPS (DADOS RECEBIDOS) ====================
  
  export let items: EstoqueItem[] = [];
  export let loading = false;
  export let error: string | null = null;
  export let empty = false;
  
  // Paginação
  export let currentPage = 1;
  export let totalPages = 1;
  export let pageSize = 20;
  export let totalItems = 0;
  export let hasNext = false;
  export let hasPrev = false;
  
  // Ordenação
  export let currentSort = '';
  export let sortDirection: 'asc' | 'desc' = 'asc';
  
  // Estados visuais
  export let tableClass = '';
  export let containerClass = '';
  
  // ==================== EVENTOS ====================
  
  const dispatch = createEventDispatcher<{
    itemEdit: { item: EstoqueItem };
    itemHistory: { item: EstoqueItem };
    sortChange: { field: string; direction: 'asc' | 'desc' };
    pageChange: { page: number };
    previousPage: void;
    nextPage: void;
  }>();
  
  // ==================== HANDLERS (APENAS EMIT EVENTOS) ====================
  
  function handleSort(field: string) {
    const newDirection = currentSort === field && sortDirection === 'asc' ? 'desc' : 'asc';
    dispatch('sortChange', { field, direction: newDirection });
  }
  
  function handleEdit(item: EstoqueItem) {
    dispatch('itemEdit', { item });
  }
  
  function handleHistory(item: EstoqueItem) {
    dispatch('itemHistory', { item });
  }
  
  function handlePageChange(page: number) {
    dispatch('pageChange', { page });
  }
  
  function handlePreviousPage() {
    dispatch('previousPage');
  }
  
  function handleNextPage() {
    dispatch('nextPage');
  }
  
  // ==================== COMPUTED (APENAS VISUAL) ====================
  
  function formatQuantity(quantity: number): string {
    return new Intl.NumberFormat('pt-BR').format(quantity);
  }
  
  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  function getQuantityColor(item: EstoqueItem): string {
    if (item.quantidade === 0) return 'red';
    if (item.quantidadeMinima && item.quantidade <= item.quantidadeMinima) return 'yellow';
    return 'green';
  }
  
  function getSortIcon(field: string): string {
    if (currentSort !== field) return '';
    return sortDirection === 'asc' ? '↑' : '↓';
  }
</script>

<!-- ==================== HTML ==================== -->

<div class="estoque-table-presenter {containerClass}">
  
  <!-- Loading State -->
  {#if loading}
    <div class="flex items-center justify-center py-12">
      <Spinner size="8" />
      <span class="ml-3 text-gray-600 dark:text-gray-400">
        Carregando estoque...
      </span>
    </div>
    
  <!-- Error State -->
  {:else if error}
    <Alert color="red" class="mb-4">
      <ExclamationTriangleOutline slot="icon" class="w-4 h-4" />
      <span class="font-medium">Erro ao carregar estoque:</span> {error}
    </Alert>
    
  <!-- Empty State -->
  {:else if empty || items.length === 0}
    <div class="text-center py-12">
      <div class="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <ArchiveBoxOutline class="w-12 h-12 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Nenhum item encontrado
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Não há itens de estoque que correspondam aos filtros aplicados.
      </p>
    </div>
    
  <!-- Data Table -->
  {:else}
    <div class="overflow-x-auto">
      <Table class="table-hover {tableClass}">
        <TableHead>
          <TableHeadCell class="cursor-pointer" on:click={() => handleSort('quantidade')}>
            <div class="flex items-center">
              Quant.
              <span class="ml-1 text-xs">{getSortIcon('quantidade')}</span>
            </div>
          </TableHeadCell>
          <TableHeadCell class="cursor-pointer" on:click={() => handleSort('tipoEpiNome')}>
            <div class="flex items-center">
              Equipamento
              <span class="ml-1 text-xs">{getSortIcon('tipoEpiNome')}</span>
            </div>
          </TableHeadCell>
          <TableHeadCell class="cursor-pointer" on:click={() => handleSort('status')}>
            <div class="flex items-center">
              Status
              <span class="ml-1 text-xs">{getSortIcon('status')}</span>
            </div>
          </TableHeadCell>
          <TableHeadCell class="cursor-pointer" on:click={() => handleSort('categoria')}>
            <div class="flex items-center">
              Categoria
              <span class="ml-1 text-xs">{getSortIcon('categoria')}</span>
            </div>
          </TableHeadCell>
          <TableHeadCell class="cursor-pointer" on:click={() => handleSort('almoxarifadoNome')}>
            <div class="flex items-center">
              Localização
              <span class="ml-1 text-xs">{getSortIcon('almoxarifadoNome')}</span>
            </div>
          </TableHeadCell>
          <TableHeadCell class="cursor-pointer" on:click={() => handleSort('dataUltimaMovimentacao')}>
            <div class="flex items-center">
              Última Movimentação
              <span class="ml-1 text-xs">{getSortIcon('dataUltimaMovimentacao')}</span>
            </div>
          </TableHeadCell>
          <TableHeadCell>Ações</TableHeadCell>
        </TableHead>
        
        <TableBody>
          {#each items as item (item.id)}
            <TableBodyRow class="hover:bg-gray-50 dark:hover:bg-gray-800">
              
              <!-- Quantidade -->
              <TableBodyCell>
                <div class="text-center">
                  <Badge color={getQuantityColor(item)} class="w-fit">
                    {formatQuantity(item.quantidade)}
                  </Badge>
                  
                  {#if item.quantidadeMinima}
                    <div class="text-xs text-gray-500 mt-1">
                      Mín: {formatQuantity(item.quantidadeMinima)}
                    </div>
                  {/if}
                </div>
              </TableBodyCell>
              
              <!-- Equipamento -->
              <TableBodyCell>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">
                    {item.tipoEpiNome}
                  </div>
                  {#if item.tipoEpiCA}
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      CA: {item.tipoEpiCA}
                    </div>
                  {/if}
                </div>
              </TableBodyCell>
              
              <!-- Status -->
              <TableBodyCell>
                <StatusBadge 
                  type="estoque_item" 
                  status={item.status}
                  size="sm"
                />
              </TableBodyCell>
              
              <!-- Categoria -->
              <TableBodyCell>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {item.categoria}
                </span>
              </TableBodyCell>
              
              <!-- Localização -->
              <TableBodyCell>
                <div>
                  <div class="font-medium text-sm">
                    {item.almoxarifadoNome}
                  </div>
                  {#if item.localizacao}
                    <div class="text-xs text-gray-500">
                      {item.localizacao}
                    </div>
                  {/if}
                </div>
              </TableBodyCell>
              
              <!-- Última Movimentação -->
              <TableBodyCell>
                <div class="text-sm">
                  <div>{formatDate(item.dataUltimaMovimentacao)}</div>
                  {#if item.responsavelUltimaMovimentacao}
                    <div class="text-xs text-gray-500">
                      {item.responsavelUltimaMovimentacao}
                    </div>
                  {/if}
                </div>
              </TableBodyCell>
              
              <!-- Ações -->
              <TableBodyCell>
                <div class="flex gap-1">
                  <Button 
                    size="xs" 
                    color="light"
                    on:click={() => handleEdit(item)}
                    title="Ajustar estoque"
                  >
                    <EditOutline class="w-3 h-3" />
                  </Button>
                  
                  <Button 
                    size="xs" 
                    color="light"
                    on:click={() => handleHistory(item)}
                    title="Ver histórico"
                  >
                    <ChartBarOutline class="w-3 h-3" />
                  </Button>
                </div>
              </TableBodyCell>
              
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    </div>
    
    <!-- Paginação -->
    {#if totalPages > 1}
      <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Mostrando {((currentPage - 1) * pageSize) + 1} a {Math.min(currentPage * pageSize, totalItems)} de {formatQuantity(totalItems)} itens
        </div>
        
        <div class="flex gap-2">
          <Button 
            size="sm" 
            color="light" 
            disabled={!hasPrev}
            on:click={handlePreviousPage}
          >
            Anterior
          </Button>
          
          <!-- Page numbers (máximo 5 páginas visíveis) -->
          {#each Array(Math.min(5, totalPages)) as _, i}
            {@const pageNum = Math.max(1, currentPage - 2) + i}
            {#if pageNum <= totalPages}
              <Button 
                size="sm" 
                color={pageNum === currentPage ? 'primary' : 'light'}
                on:click={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            {/if}
          {/each}
          
          {#if totalPages > 5 && currentPage < totalPages - 2}
            <span class="px-2 py-1 text-sm text-gray-500">...</span>
            <Button 
              size="sm" 
              color="light"
              on:click={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Button>
          {/if}
          
          <Button 
            size="sm" 
            color="light" 
            disabled={!hasNext}
            on:click={handleNextPage}
          >
            Próxima
          </Button>
        </div>
      </div>
    {/if}
  {/if}
</div>

<!-- ==================== STYLES ==================== -->

<style>
  .estoque-table-presenter {
    @apply w-full;
  }
  
  /* Hover effects para tabela */
  :global(.table-hover tbody tr:hover) {
    @apply bg-gray-50 dark:bg-gray-800;
  }
  
  /* Cursor pointer para headers ordenáveis */
  :global(.table-hover thead th.cursor-pointer:hover) {
    @apply bg-gray-100 dark:bg-gray-700;
  }
  
  /* Animações suaves */
  .estoque-table-presenter :global(button) {
    transition: all 0.2s ease-in-out;
  }
  
  .estoque-table-presenter :global(button:hover) {
    transform: translateY(-1px);
  }
  
  /* Loading spinner customizado */
  .estoque-table-presenter :global(.custom-spinner) {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>