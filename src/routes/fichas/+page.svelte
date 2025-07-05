<script lang="ts">
  import { onMount } from 'svelte';
  import { Card, Button, Input, Badge, Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Checkbox } from 'flowbite-svelte';
  import { PlusOutline, SearchOutline, DownloadOutline, EyeOutline, RefreshOutline } from 'flowbite-svelte-icons';
  import { notify } from '$lib/stores';
  import { formatarData } from '$lib/utils/dateHelpers';
  import LoadingSpinner from '$lib/components/common/LoadingSpinner.svelte';
  import ErrorDisplay from '$lib/components/common/ErrorDisplay.svelte';
  import SearchableDropdown from '$lib/components/common/SearchableDropdown.svelte';
  import FichaDetailContainer from '$lib/components/containers/FichaDetailContainer.svelte';

  // ==================== STATE ====================
  
  // Data
  let fichas: any[] = [];
  let loading = false;
  let error: string | null = null;
  
  // Filters
  let searchTerm = '';
  let cargoFilter = 'todos';
  let empresaFilter = 'todas';
  let devolucaoPendente = false;
  
  // Filter options
  let cargoOptions = [
    { value: 'todos', label: 'Todos os Cargos' },
    { value: 'engenheiro', label: 'Engenheiro Civil' },
    { value: 'tecnico', label: 'Técnico em Segurança' },
    { value: 'operador', label: 'Operador de Máquinas' }
  ];
  
  let empresaOptions = [
    { value: 'todas', label: 'Todas as Empresas' },
    { value: 'techcorp', label: 'TechCorp Engenharia' },
    { value: 'buildmax', label: 'BuildMax Construções' },
    { value: 'safework', label: 'SafeWork Solutions' }
  ];
  
  // Modal/Drawer state
  let showFichaDrawer = false;
  let selectedFichaId: string | null = null;
  
  // ==================== LIFECYCLE ====================
  
  onMount(() => {
    loadFichas();
  });
  
  // ==================== DATA LOADING ====================
  
  function loadFichas() {
    loading = true;
    error = null;
    
    // Simular delay de API
    setTimeout(() => {
      try {
        fichas = [
          {
            id: 'ficha-001',
            colaborador: {
              nome: 'João Claudio Silva',
              cpf: '123.456.789-00',
              cargo: 'Engenheiro Civil',
              empresa: 'TechCorp Engenharia'
            },
            status: 'ativa',
            dataEmissao: '2024-09-01',
            dataValidade: '2025-09-01',
            itens: [
              { id: '1', nomeEquipamento: 'Capacete de Segurança' },
              { id: '2', nomeEquipamento: 'Luvas de Proteção' }
            ]
          },
          {
            id: 'ficha-002',
            colaborador: {
              nome: 'Maria Santos Oliveira',
              cpf: '987.654.321-00',
              cargo: 'Técnica em Segurança',
              empresa: 'BuildMax Construções'
            },
            status: 'ativa',
            dataEmissao: '2024-10-15',
            dataValidade: '2025-10-15',
            itens: [
              { id: '3', nomeEquipamento: 'Óculos de Proteção' },
              { id: '4', nomeEquipamento: 'Protetor Auricular' },
              { id: '5', nomeEquipamento: 'Botina de Segurança' },
              { id: '6', nomeEquipamento: 'Máscara PFF2' }
            ]
          },
          {
            id: 'ficha-003',
            colaborador: {
              nome: 'Pedro Costa Lima',
              cpf: '456.789.123-00',
              cargo: 'Operador de Máquinas',
              empresa: 'SafeWork Solutions'
            },
            status: 'vencida',
            dataEmissao: '2024-06-10',
            dataValidade: '2024-12-31',
            itens: [
              { id: '7', nomeEquipamento: 'Cinto de Segurança' }
            ]
          }
        ];
        loading = false;
      } catch (err) {
        error = 'Erro ao carregar fichas';
        loading = false;
      }
    }, 800);
  }
  
  // ==================== COMPUTED ====================
  
  $: filteredFichas = fichas.filter(ficha => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = ficha.colaborador.nome.toLowerCase().includes(searchLower);
      const cpfMatch = ficha.colaborador.cpf.includes(searchTerm);
      if (!nameMatch && !cpfMatch) return false;
    }
    
    // Cargo filter
    if (cargoFilter !== 'todos') {
      const cargoMap: Record<string, string> = {
        'engenheiro': 'Engenheiro Civil',
        'tecnico': 'Técnico em Segurança',
        'operador': 'Operador de Máquinas'
      };
      if (ficha.colaborador.cargo !== cargoMap[cargoFilter]) return false;
    }
    
    // Empresa filter
    if (empresaFilter !== 'todas') {
      const empresaMap: Record<string, string> = {
        'techcorp': 'TechCorp Engenharia',
        'buildmax': 'BuildMax Construções',
        'safework': 'SafeWork Solutions'
      };
      if (ficha.colaborador.empresa !== empresaMap[empresaFilter]) return false;
    }
    
    // Devolução pendente filter
    if (devolucaoPendente) {
      const dataValidade = new Date(ficha.dataValidade);
      const hoje = new Date();
      const fichaVencida = dataValidade < hoje;
      if (!(fichaVencida && ficha.itens.length > 0)) return false;
    }
    
    return true;
  });
  
  $: hasActiveFilters = searchTerm !== '' || cargoFilter !== 'todos' || empresaFilter !== 'todas' || devolucaoPendente;
  
  // ==================== EVENT HANDLERS ====================
  
  function handleNovaFicha() {
    notify.info('Nova ficha', 'Funcionalidade em desenvolvimento');
  }
  
  function handleViewFicha(id: string) {
    selectedFichaId = id;
    showFichaDrawer = true;
  }
  
  function handleCloseFichaDrawer() {
    showFichaDrawer = false;
    selectedFichaId = null;
  }
  
  function handleExportFicha(id: string) {
    notify.success('Ficha exportada', `Ficha ${id} exportada com sucesso!`);
  }
  
  function resetFilters() {
    searchTerm = '';
    cargoFilter = 'todos';
    empresaFilter = 'todas';
    devolucaoPendente = false;
  }
  
  function temDevolucaoPendente(ficha: any): boolean {
    const dataValidade = new Date(ficha.dataValidade);
    const hoje = new Date();
    const fichaVencida = dataValidade < hoje;
    return fichaVencida && ficha.itens.length > 0;
  }
</script>

<svelte:head>
  <title>Fichas EPI - DataLife EPI</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header IDÊNTICO ao original -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-xl font-medium text-gray-900 dark:text-white">Fichas EPI</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Gerencie as fichas de equipamentos dos colaboradores
      </p>
    </div>
    <div class="flex space-x-2">
      <Button size="sm" color="primary" class="rounded-sm" on:click={handleNovaFicha}>
        <PlusOutline class="w-4 h-4 mr-2" />
        Nova Ficha
      </Button>
    </div>
  </div>
  
  <!-- Content IDÊNTICO ao original -->
  {#if loading}
    <LoadingSpinner />
  {:else if error}
    <ErrorDisplay 
      {error} 
      onRetry={loadFichas}
    />
  {:else if filteredFichas.length > 0}
    <!-- Table with Filters IDÊNTICO ao original -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <!-- Filters inside table container -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <!-- Search -->
          <div class="relative">
            <SearchOutline class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nome ou CPF..."
              class="pl-10 rounded-sm h-10 text-sm"
              bind:value={searchTerm}
            />
          </div>
          
          <!-- Cargo Filter -->
          <SearchableDropdown
            options={cargoOptions}
            value={cargoFilter}
            placeholder="Cargo"
            on:change={(e) => cargoFilter = e.detail}
          />
          
          <!-- Empresa Filter -->
          <SearchableDropdown
            options={empresaOptions}
            value={empresaFilter}
            placeholder="Empresa"
            on:change={(e) => empresaFilter = e.detail}
          />
          
          <!-- Devolução Pendente Filter -->
          <div class="flex items-center h-10">
            <Checkbox
              id="devolucao-pendente-filter"
              bind:checked={devolucaoPendente}
              class="rounded-sm"
            />
            <label for="devolucao-pendente-filter" class="ml-2 text-sm text-gray-900 dark:text-white">
              Devolução pendente
            </label>
          </div>
          
          <!-- Clear Filters -->
          {#if hasActiveFilters}
            <Button 
              color="alternative" 
              class="rounded-sm h-10 w-10 p-0 flex items-center justify-center" 
              on:click={resetFilters}
              title="Limpar Filtros"
            >
              <RefreshOutline class="w-4 h-4" />
            </Button>
          {:else}
            <div></div>
          {/if}
        </div>
      </div>
      
      <!-- Table content IDÊNTICO ao original -->
      <div class="min-w-[980px] overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableHeadCell class="min-w-[200px]">Colaborador</TableHeadCell>
            <TableHeadCell class="min-w-[120px] hidden lg:table-cell">Cargo</TableHeadCell>
            <TableHeadCell class="min-w-[150px] hidden xl:table-cell">Empresa</TableHeadCell>
            <TableHeadCell class="min-w-[100px]">EPIs</TableHeadCell>
            <TableHeadCell class="min-w-[120px]">Ações</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each filteredFichas as ficha}
              {@const temPendencia = temDevolucaoPendente(ficha)}
              <TableBodyRow class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700" on:click={() => handleViewFicha(ficha.id)}>
                <TableBodyCell class="min-w-[200px]">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white truncate">
                      {ficha.colaborador.nome}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      CPF: {ficha.colaborador.cpf}
                    </p>
                    <!-- Mostrar cargo em mobile quando coluna cargo está oculta -->
                    <p class="text-xs text-gray-500 dark:text-gray-400 lg:hidden mt-1">
                      {ficha.colaborador.cargo}
                    </p>
                    <!-- Mostrar empresa em mobile quando coluna empresa está oculta -->
                    <p class="text-xs text-gray-500 dark:text-gray-400 xl:hidden mt-1">
                      {ficha.colaborador.empresa}
                    </p>
                  </div>
                </TableBodyCell>
                <TableBodyCell class="min-w-[120px] hidden lg:table-cell">
                  <span class="text-sm text-gray-900 dark:text-white">
                    {ficha.colaborador.cargo}
                  </span>
                </TableBodyCell>
                <TableBodyCell class="min-w-[150px] hidden xl:table-cell">
                  <span class="text-sm text-gray-900 dark:text-white truncate">
                    {ficha.colaborador.empresa}
                  </span>
                </TableBodyCell>
                <TableBodyCell class="min-w-[100px]">
                  <div class="space-y-1">
                    <Badge color="blue" class="w-fit rounded-sm">
                      {ficha.itens.length} item{ficha.itens.length !== 1 ? 's' : ''}
                    </Badge>
                    {#if temPendencia}
                      <Badge color="red" class="w-fit rounded-sm text-xs block">
                        Pendente
                      </Badge>
                    {/if}
                  </div>
                </TableBodyCell>
                <TableBodyCell class="min-w-[120px]">
                  <div class="flex space-x-2">
                    <button
                      class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      on:click={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleViewFicha(ficha.id);
                      }}
                      title="Ver detalhes da ficha"
                    >
                      <EyeOutline class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      class="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      on:click={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleExportFicha(ficha.id);
                      }}
                      title="Exportar ficha"
                    >
                      <DownloadOutline class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </div>
    </div>
  {:else}
    <!-- Empty state -->
    <Card size="sm" class="rounded-sm">
      <div class="text-center py-12">
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4">
          <PlusOutline class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Nenhuma ficha encontrada
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">
          {hasActiveFilters ? 'Nenhuma ficha corresponde aos filtros aplicados.' : 'Você ainda não possui fichas EPI cadastradas.'}
        </p>
        {#if hasActiveFilters}
          <Button size="sm" color="alternative" class="rounded-sm" on:click={resetFilters}>
            Limpar Filtros
          </Button>
        {:else}
          <Button size="sm" color="primary" class="rounded-sm" on:click={handleNovaFicha}>
            <PlusOutline class="w-4 h-4 mr-2" />
            Criar Primeira Ficha
          </Button>
        {/if}
      </div>
    </Card>
  {/if}
</div>

<!-- Ficha Detail Drawer com nova arquitetura -->
<FichaDetailContainer
  bind:open={showFichaDrawer}
  fichaId={selectedFichaId}
  on:close={handleCloseFichaDrawer}
  on:fichaUpdated={() => loadFichas()}
/>