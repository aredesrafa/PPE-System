<script lang="ts">
  import { onMount } from 'svelte';
  import { Card, Button, Badge, Select } from 'flowbite-svelte';
  import { 
    ArrowDownOutline, 
    ChartOutline, 
    FileDocOutline, 
    CalendarMonthSolid,
    UsersGroupSolid,
    ShoppingBagSolid
  } from 'flowbite-svelte-icons';
  import { apiClient } from '$lib/services/api/client';
  import { createApiStore, notify } from '$lib/stores';
  import LoadingSpinner from '$lib/components/common/LoadingSpinner.svelte';
  import ErrorDisplay from '$lib/components/common/ErrorDisplay.svelte';
  import { formatarData } from '$lib/utils/dateHelpers';
  
  // API store for statistics
  const estatisticasStore = createApiStore<{
    totalColaboradores: number;
    fichasAtivas: number;
    fichasVencidas: number;
    estoqueTotal: number;
    estoqueBaixo: number;
    entregasMes: number;
  }>();
  
  // Report options
  let tipoRelatorio = 'fichas';
  let periodoRelatorio = '30';
  let formatoRelatorio = 'pdf';
  
  const tiposRelatorio = [
    { value: 'fichas', label: 'Relatório de Fichas EPI' },
    { value: 'estoque', label: 'Relatório de Estoque' },
    { value: 'entregas', label: 'Relatório de Entregas' },
    { value: 'vencimentos', label: 'Relatório de Vencimentos' },
    { value: 'colaboradores', label: 'Relatório de Colaboradores' },
    { value: 'movimentacoes', label: 'Relatório de Movimentações' }
  ];
  
  const periodosRelatorio = [
    { value: '7', label: 'Últimos 7 dias' },
    { value: '30', label: 'Últimos 30 dias' },
    { value: '90', label: 'Últimos 90 dias' },
    { value: '365', label: 'Último ano' },
    { value: 'custom', label: 'Período customizado' }
  ];
  
  const formatosRelatorio = [
    { value: 'pdf', label: 'PDF' },
    { value: 'excel', label: 'Excel (XLSX)' },
    { value: 'csv', label: 'CSV' }
  ];
  
  onMount(async () => {
    await loadEstatisticas();
  });
  
  async function loadEstatisticas() {
    try {
      // Carrega métricas do dashboard que contém as estatísticas
      await estatisticasStore.execute(() => apiClient.getDashboardMetrics());
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      notify.error('Erro ao carregar', 'Não foi possível carregar as estatísticas');
    }
  }
  
  async function handleGerarRelatorio() {
    try {
      let response;
      const params = {
        dataInicio: new Date(Date.now() - parseInt(periodoRelatorio) * 24 * 60 * 60 * 1000).toISOString(),
        dataFim: new Date().toISOString()
      };

      switch (tipoRelatorio) {
        case 'fichas':
          response = await apiClient.getRelatorioEpisAtivos({ detalhado: formatoRelatorio === 'detalhado' });
          break;
        case 'estoque':
          response = await apiClient.getRelatorioSaldoEstoque();
          break;
        case 'movimentacoes':
          response = await apiClient.getRelatorioMovimentacoes(params);
          break;
        case 'descartados':
          response = await apiClient.getRelatorioDescartados(params);
          break;
        case 'devolucao_atrasada':
          response = await apiClient.getRelatorioDevolucaoAtrasada();
          break;
        default:
          throw new Error('Tipo de relatório não suportado');
      }

      console.log('📊 Relatório gerado:', response);
      notify.success('Sucesso', `Relatório ${tipoRelatorio} gerado com sucesso`);
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      notify.error('Erro', 'Não foi possível gerar o relatório');
    }
  }
  
  function handleExportarDados() {
    notify.info('Em desenvolvimento', 'Funcionalidade de exportação será implementada');
  }
  
  // Chart data (mock for now)
  const chartData = {
    fichasPorMes: [
      { mes: 'Jan', fichas: 12 },
      { mes: 'Fev', fichas: 19 },
      { mes: 'Mar', fichas: 15 },
      { mes: 'Abr', fichas: 22 },
      { mes: 'Mai', fichas: 18 },
      { mes: 'Jun', fichas: 25 }
    ],
    episPorCategoria: [
      { categoria: 'Proteção da Cabeça', quantidade: 45 },
      { categoria: 'Proteção das Mãos', quantidade: 78 },
      { categoria: 'Proteção dos Olhos', quantidade: 32 },
      { categoria: 'Proteção Respiratória', quantidade: 56 },
      { categoria: 'Proteção dos Pés', quantidade: 23 }
    ]
  };
</script>

<svelte:head>
  <title>Relatórios - DataLife EPI</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Relatórios</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Visualize estatísticas e gere relatórios do sistema
      </p>
    </div>
    <Button size="sm" color="primary" class="rounded-sm" on:click={handleExportarDados}>
      <ArrowDownOutline class="w-4 h-4 mr-2" />
      Exportar Dados
    </Button>
  </div>
  
  <!-- Statistics Cards -->
  {#if $estatisticasStore.loading}
    <LoadingSpinner />
  {:else if $estatisticasStore.error}
    <ErrorDisplay 
      error={$estatisticasStore.error} 
      onRetry={loadEstatisticas}
    />
  {:else if $estatisticasStore.data}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card size="sm" class="rounded-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Colaboradores</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {$estatisticasStore.data.totalColaboradores}
            </p>
          </div>
          <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <UsersGroupSolid class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </Card>
      
      <Card size="sm" class="rounded-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Fichas Ativas</p>
            <p class="text-2xl font-bold text-green-600">
              {$estatisticasStore.data.fichasAtivas}
            </p>
          </div>
          <div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
            <FileDocOutline class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </Card>
      
      <Card size="sm" class="rounded-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Fichas Vencidas</p>
            <p class="text-2xl font-bold text-red-600">
              {$estatisticasStore.data.fichasVencidas}
            </p>
          </div>
          <div class="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
            <FileDocOutline class="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </Card>
      
      <Card size="sm" class="rounded-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total em Estoque</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {$estatisticasStore.data.estoqueTotal}
            </p>
          </div>
          <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <ShoppingBagSolid class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </Card>
      
      <Card size="sm" class="rounded-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Estoque Baixo</p>
            <p class="text-2xl font-bold text-yellow-600">
              {$estatisticasStore.data.estoqueBaixo}
            </p>
          </div>
          <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <ShoppingBagSolid class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </Card>
      
      <Card size="sm" class="rounded-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Entregas neste Mês</p>
            <p class="text-2xl font-bold text-indigo-600">
              {$estatisticasStore.data.entregasMes}
            </p>
          </div>
          <div class="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <CalendarMonthSolid class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </Card>
    </div>
  {/if}
  
  <!-- Charts Section -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Fichas por Mês -->
    <Card size="sm" class="rounded-sm">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Fichas Criadas por Mês
        </h3>
        <ChartOutline class="w-5 h-5 text-gray-400" />
      </div>
      
      <div class="space-y-3">
        {#each chartData.fichasPorMes as item}
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">{item.mes}</span>
            <div class="flex items-center space-x-2">
              <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-20">
                <div 
                  class="bg-blue-600 h-2 rounded-full" 
                  style="width: {(item.fichas / 25) * 100}%"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                {item.fichas}
              </span>
            </div>
          </div>
        {/each}
      </div>
    </Card>
    
    <!-- EPIs por Categoria -->
    <Card size="sm" class="rounded-sm">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          EPIs por Categoria
        </h3>
        <ChartOutline class="w-5 h-5 text-gray-400" />
      </div>
      
      <div class="space-y-3">
        {#each chartData.episPorCategoria as item}
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400 flex-1 truncate">
              {item.categoria}
            </span>
            <div class="flex items-center space-x-2">
              <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-20">
                <div 
                  class="bg-green-600 h-2 rounded-full" 
                  style="width: {(item.quantidade / 80) * 100}%"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                {item.quantidade}
              </span>
            </div>
          </div>
        {/each}
      </div>
    </Card>
  </div>
  
  <!-- Report Generator -->
  <Card size="sm" class="rounded-sm">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Gerador de Relatórios
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <!-- Tipo de Relatório -->
      <div>
        <label for="tipo-relatorio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tipo de Relatório
        </label>
        <Select id="tipo-relatorio" bind:value={tipoRelatorio} class="text-sm rounded-sm" size="sm">
          {#each tiposRelatorio as tipo}
            <option value={tipo.value}>{tipo.label}</option>
          {/each}
        </Select>
      </div>
      
      <!-- Período -->
      <div>
        <label for="periodo-relatorio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Período
        </label>
        <Select id="periodo-relatorio" bind:value={periodoRelatorio} class="text-sm rounded-sm" size="sm">
          {#each periodosRelatorio as periodo}
            <option value={periodo.value}>{periodo.label}</option>
          {/each}
        </Select>
      </div>
      
      <!-- Formato -->
      <div>
        <label for="formato-relatorio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Formato
        </label>
        <Select id="formato-relatorio" bind:value={formatoRelatorio} class="text-sm rounded-sm" size="sm">
          {#each formatosRelatorio as formato}
            <option value={formato.value}>{formato.label}</option>
          {/each}
        </Select>
      </div>
      
      <!-- Generate Button -->
      <div class="flex items-end">
        <Button color="primary" class="w-full rounded-sm" size="sm" on:click={handleGerarRelatorio}>
          <ArrowDownOutline class="w-4 h-4 mr-2" />
          Gerar Relatório
        </Button>
      </div>
    </div>
    
    <!-- Report Description -->
    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
        Descrição do Relatório
      </h4>
      {#if tipoRelatorio === 'fichas'}
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Relatório completo das fichas EPI, incluindo status, vencimentos e colaboradores associados.
        </p>
      {:else if tipoRelatorio === 'estoque'}
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Relatório detalhado do estoque atual, incluindo quantidades, validades e status dos itens.
        </p>
      {:else if tipoRelatorio === 'entregas'}
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Relatório de todas as entregas realizadas, com informações de responsáveis e assinaturas.
        </p>
      {:else if tipoRelatorio === 'vencimentos'}
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Relatório focado em EPIs vencidos ou próximos ao vencimento para ações preventivas.
        </p>
      {:else if tipoRelatorio === 'colaboradores'}
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Relatório dos colaboradores, seus EPIs associados e status das fichas.
        </p>
      {:else if tipoRelatorio === 'movimentacoes'}
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Relatório de todas as movimentações de estoque, incluindo entradas, saídas e transferências.
        </p>
      {/if}
    </div>
  </Card>
  
  <!-- Quick Reports -->
  <Card size="sm" class="rounded-sm">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Relatórios Rápidos
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Button color="alternative" class="rounded-sm h-20 flex flex-col items-center justify-center" on:click={handleGerarRelatorio}>
        <FileDocOutline class="w-6 h-6 mb-2" />
        <span class="text-sm">Fichas Vencidas</span>
      </Button>
      
      <Button color="alternative" class="rounded-sm h-20 flex flex-col items-center justify-center" on:click={handleGerarRelatorio}>
        <ShoppingBagSolid class="w-6 h-6 mb-2" />
        <span class="text-sm">Estoque Baixo</span>
      </Button>
      
      <Button color="alternative" class="rounded-sm h-20 flex flex-col items-center justify-center" on:click={handleGerarRelatorio}>
        <CalendarMonthSolid class="w-6 h-6 mb-2" />
        <span class="text-sm">Entregas do Mês</span>
      </Button>
    </div>
  </Card>
</div>