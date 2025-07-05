<script lang="ts">
  import { onMount } from 'svelte';
  import { Card, Button, Input, Select, Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell } from 'flowbite-svelte';
  import { formatarData, formatarDataHora } from '$lib/utils/dateHelpers';
  import LoadingSpinner from '$lib/components/common/LoadingSpinner.svelte';
  import ErrorDisplay from '$lib/components/common/ErrorDisplay.svelte';
  
  // Temporary types for mock data
  interface Movimentacao {
    id: string;
    estoqueOrigemId: string | null;
    estoqueDestinoId: string | null;
    tipoMovimentacao: string;
    quantidade: number;
    responsavel: string;
    motivo: string | null;
    observacoes: string | null;
    documentoOrigemId: string | null;
    documentoTipo: string | null;
    dataMovimentacao: string;
    transacaoId: string | null;
    createdAt: string;
    itemEstoqueId: string | null;
    itemFichaId: string | null;
    nomeEstoqueOrigem?: string | null;
    nomeEstoqueDestino?: string | null;
    nomeEPI?: string | null;
    nomeColaborador?: string | null;
  }
  
  interface Estoque {
    id: string;
    nome: string;
    tipoEstoque: string;
    codigo: string;
    ativo: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  // Mock data for development
  const mockMovimentacoes: Movimentacao[] = [
    {
      id: 'mov-001',
      estoqueOrigemId: 'estoque-1',
      estoqueDestinoId: null,
      tipoMovimentacao: 'entrada',
      quantidade: 10,
      responsavel: 'João Silva',
      motivo: 'Compra de EPIs',
      observacoes: 'Lote recebido conforme nota fiscal',
      documentoOrigemId: 'NF-12345',
      documentoTipo: 'nota_fiscal',
      dataMovimentacao: '2025-01-03T14:30:00Z',
      transacaoId: 'txn-001',
      createdAt: '2025-01-03T14:30:00Z',
      itemEstoqueId: 'item-001',
      itemFichaId: null,
      nomeEstoqueOrigem: 'Estoque Principal',
      nomeEstoqueDestino: null,
      nomeEPI: 'Capacete de Segurança',
      nomeColaborador: null
    },
    {
      id: 'mov-002',
      estoqueOrigemId: 'estoque-1',
      estoqueDestinoId: null,
      tipoMovimentacao: 'saida',
      quantidade: 3,
      responsavel: 'Maria Santos',
      motivo: 'Entrega para colaborador',
      observacoes: 'EPI entregue com termo de responsabilidade',
      documentoOrigemId: 'TERM-001',
      documentoTipo: 'termo_responsabilidade',
      dataMovimentacao: '2025-01-02T09:15:00Z',
      transacaoId: 'txn-002',
      createdAt: '2025-01-02T09:15:00Z',
      itemEstoqueId: 'item-001',
      itemFichaId: 'ficha-001',
      nomeEstoqueOrigem: 'Estoque Principal',
      nomeEstoqueDestino: null,
      nomeEPI: 'Capacete de Segurança',
      nomeColaborador: 'Carlos Pereira'
    },
    {
      id: 'mov-003',
      estoqueOrigemId: 'estoque-1',
      estoqueDestinoId: 'estoque-2',
      tipoMovimentacao: 'transferencia',
      quantidade: 5,
      responsavel: 'Ana Costa',
      motivo: 'Transferência entre estoques',
      observacoes: 'Realocação para estoque secundário',
      documentoOrigemId: 'TRANS-001',
      documentoTipo: 'transferencia',
      dataMovimentacao: '2025-01-01T16:45:00Z',
      transacaoId: 'txn-003',
      createdAt: '2025-01-01T16:45:00Z',
      itemEstoqueId: 'item-002',
      itemFichaId: null,
      nomeEstoqueOrigem: 'Estoque Principal',
      nomeEstoqueDestino: 'Estoque Secundário',
      nomeEPI: 'Óculos de Proteção',
      nomeColaborador: null
    }
  ];
  
  const mockEstoqueOptions: Estoque[] = [
    {
      id: 'estoque-1',
      nome: 'Estoque Principal',
      tipoEstoque: 'fisico',
      codigo: 'EP',
      ativo: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'estoque-2',
      nome: 'Estoque Secundário',
      tipoEstoque: 'fisico',
      codigo: 'ES',
      ativo: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  // State
  let movimentacoes: Movimentacao[] = [];
  let loading = true;
  let error: string | null = null;
  
  // Pagination
  let currentPage = 1;
  let itemsPerPage = 10;
  
  // Filters
  let filtroEstoqueOrigem = '';
  let filtroEstoqueDestino = '';
  let filtroTipoMovimentacao = '';
  let filtroDataInicio = '';
  let filtroDataFim = '';
  
  // Computed values
  $: filteredMovimentacoes = movimentacoes.filter((mov) => {
    const estoqueOrigemMatch = filtroEstoqueOrigem === '' || mov.estoqueOrigemId === filtroEstoqueOrigem;
    const estoqueDestinoMatch = filtroEstoqueDestino === '' || mov.estoqueDestinoId === filtroEstoqueDestino;
    const tipoMovimentacaoMatch = filtroTipoMovimentacao === '' || mov.tipoMovimentacao === filtroTipoMovimentacao;
    
    const dataMovimentacao = new Date(mov.dataMovimentacao);
    const dataInicioMatch = filtroDataInicio === '' || dataMovimentacao >= new Date(filtroDataInicio);
    const dataFimMatch = filtroDataFim === '' || dataMovimentacao <= new Date(filtroDataFim);
    
    return estoqueOrigemMatch && estoqueDestinoMatch && tipoMovimentacaoMatch && dataInicioMatch && dataFimMatch;
  });
  
  $: totalPages = Math.ceil(filteredMovimentacoes.length / itemsPerPage);
  $: startIndex = (currentPage - 1) * itemsPerPage;
  $: endIndex = Math.min(startIndex + itemsPerPage, filteredMovimentacoes.length);
  $: currentItems = filteredMovimentacoes.slice(startIndex, endIndex);
  
  onMount(async () => {
    await fetchMovimentacoes();
  });
  
  async function fetchMovimentacoes() {
    try {
      loading = true;
      error = null;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real implementation, this would be:
      // const response = await movimentacoesAPI.getAll();
      // movimentacoes = response;
      
      movimentacoes = mockMovimentacoes;
    } catch (err) {
      console.error('Erro ao buscar movimentações:', err);
      error = 'Não foi possível carregar as movimentações de estoque.';
    } finally {
      loading = false;
    }
  }
  
  function handleRetry() {
    fetchMovimentacoes();
  }
  
  function goToPage(page: number) {
    currentPage = page;
  }
  
  function previousPage() {
    if (currentPage > 1) {
      currentPage--;
    }
  }
  
  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
    }
  }
  
  function truncateId(id: string): string {
    return id.length > 8 ? id.substring(0, 8) + '...' : id;
  }
  
  function formatTipoMovimentacao(tipo: string): string {
    switch (tipo) {
      case 'entrada': return 'Entrada';
      case 'saida': return 'Saída';
      case 'transferencia': return 'Transferência';
      case 'ajuste': return 'Ajuste';
      case 'descarte': return 'Descarte';
      default: return tipo;
    }
  }
</script>

<svelte:head>
  <title>Auditoria de Movimentações - DataLife EPI</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Auditoria de Movimentações de Estoque</h1>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      Visualize e audite todas as movimentações de estoque com rastreabilidade completa
    </p>
  </div>

  <!-- Filters -->
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Estoque de Origem
        </label>
        <Select
          bind:value={filtroEstoqueOrigem}
          size="sm"
          class="rounded-sm"
        >
          <option value="">Todos os estoques</option>
          {#each mockEstoqueOptions as estoque}
            <option value={estoque.id}>{estoque.nome}</option>
          {/each}
        </Select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Estoque de Destino
        </label>
        <Select
          bind:value={filtroEstoqueDestino}
          size="sm"
          class="rounded-sm"
        >
          <option value="">Todos os estoques</option>
          {#each mockEstoqueOptions as estoque}
            <option value={estoque.id}>{estoque.nome}</option>
          {/each}
        </Select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tipo de Movimentação
        </label>
        <Select
          bind:value={filtroTipoMovimentacao}
          size="sm"
          class="rounded-sm"
        >
          <option value="">Todos os tipos</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
          <option value="transferencia">Transferência</option>
          <option value="ajuste">Ajuste</option>
          <option value="descarte">Descarte</option>
        </Select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Data Início
        </label>
        <Input
          type="date"
          bind:value={filtroDataInicio}
          size="sm"
          class="rounded-sm"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Data Fim
        </label>
        <Input
          type="date"
          bind:value={filtroDataFim}
          size="sm"
          class="rounded-sm"
        />
      </div>
    </div>
    
    <!-- Results counter -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        <span class="font-medium">{filteredMovimentacoes.length}</span> movimentação(ões) encontrada(s)
      </div>
    </div>
  </div>

  <!-- Content -->
  {#if loading}
    <LoadingSpinner />
  {:else if error}
    <ErrorDisplay 
      {error} 
      onRetry={handleRetry}
    />
  {:else if filteredMovimentacoes.length === 0}
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div class="text-center py-12">
        <div class="text-gray-500 dark:text-gray-400">
          Nenhuma movimentação encontrada com os filtros aplicados.
        </div>
      </div>
    </div>
  {:else}
    <!-- Table -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Data</TableHeadCell>
            <TableHeadCell>Tipo</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>EPI</TableHeadCell>
            <TableHeadCell>Origem</TableHeadCell>
            <TableHeadCell>Destino</TableHeadCell>
            <TableHeadCell>Responsável</TableHeadCell>
            <TableHeadCell>Colaborador</TableHeadCell>
            <TableHeadCell>Motivo</TableHeadCell>
            <TableHeadCell>Observações</TableHeadCell>
            <TableHeadCell>Documento</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each currentItems as mov}
              <TableBodyRow>
                <TableBodyCell class="font-medium">
                  <span class="text-xs font-mono">{truncateId(mov.id)}</span>
                </TableBodyCell>
                <TableBodyCell>
                  <div class="text-sm">
                    <div>{formatarData(mov.dataMovimentacao)}</div>
                    <div class="text-xs text-gray-500">{new Date(mov.dataMovimentacao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </TableBodyCell>
                <TableBodyCell>
                  <span class="px-2 py-1 text-xs font-medium rounded-full 
                    {mov.tipoMovimentacao === 'entrada' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                     mov.tipoMovimentacao === 'saida' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                     mov.tipoMovimentacao === 'transferencia' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                     'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}">
                    {formatTipoMovimentacao(mov.tipoMovimentacao)}
                  </span>
                </TableBodyCell>
                <TableBodyCell>
                  <span class="font-medium">{mov.quantidade}</span>
                </TableBodyCell>
                <TableBodyCell>
                  <div class="max-w-32 truncate" title={mov.nomeEPI || 'N/A'}>
                    {mov.nomeEPI || 'N/A'}
                  </div>
                </TableBodyCell>
                <TableBodyCell>
                  <div class="text-sm">
                    {mov.nomeEstoqueOrigem || (mov.estoqueOrigemId ? truncateId(mov.estoqueOrigemId) : 'N/A')}
                  </div>
                </TableBodyCell>
                <TableBodyCell>
                  <div class="text-sm">
                    {mov.nomeEstoqueDestino || (mov.estoqueDestinoId ? truncateId(mov.estoqueDestinoId) : 'N/A')}
                  </div>
                </TableBodyCell>
                <TableBodyCell>
                  <div class="max-w-24 truncate" title={mov.responsavel}>
                    {mov.responsavel}
                  </div>
                </TableBodyCell>
                <TableBodyCell>
                  <div class="max-w-24 truncate" title={mov.nomeColaborador || 'N/A'}>
                    {mov.nomeColaborador || 'N/A'}
                  </div>
                </TableBodyCell>
                <TableBodyCell>
                  <div class="max-w-32 truncate" title={mov.motivo || 'N/A'}>
                    {mov.motivo || 'N/A'}
                  </div>
                </TableBodyCell>
                <TableBodyCell>
                  <div class="max-w-32 truncate" title={mov.observacoes || 'N/A'}>
                    {mov.observacoes || 'N/A'}
                  </div>
                </TableBodyCell>
                <TableBodyCell>
                  {#if mov.documentoTipo && mov.documentoOrigemId}
                    <div class="text-xs">
                      <div class="font-medium">{mov.documentoTipo.replace('_', ' ')}</div>
                      <div class="text-gray-500 font-mono">{truncateId(mov.documentoOrigemId)}</div>
                    </div>
                  {:else}
                    <span class="text-gray-400">N/A</span>
                  {/if}
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </div>
      
      <!-- Pagination -->
      {#if totalPages > 1}
        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {startIndex + 1} a {endIndex} de {filteredMovimentacoes.length} resultados
          </div>
          <div class="flex space-x-2">
            <Button
              size="sm"
              color="alternative"
              class="rounded-sm"
              disabled={currentPage <= 1}
              on:click={previousPage}
            >
              Anterior
            </Button>
            
            <!-- Page numbers -->
            {#each Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const startPage = Math.max(1, currentPage - 2);
              return startPage + i;
            }).filter(page => page <= totalPages) as page}
              <Button
                size="sm"
                color={page === currentPage ? 'primary' : 'alternative'}
                class="rounded-sm min-w-[40px]"
                on:click={() => goToPage(page)}
              >
                {page}
              </Button>
            {/each}
            
            <Button
              size="sm"
              color="alternative"
              class="rounded-sm"
              disabled={currentPage >= totalPages}
              on:click={nextPage}
            >
              Próximo
            </Button>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>