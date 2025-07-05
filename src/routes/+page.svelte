<script lang="ts">
  import { Card, Badge, Button } from 'flowbite-svelte';
  import { 
    FileDocOutline, 
    CheckCircleOutline, 
    ExclamationCircleOutline, 
    ArchiveOutline,
    ArrowRightOutline,
    SearchOutline
  } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte';
  
  // Métricas mockadas
  const metrics = [
    {
      title: 'Fichas Ativas',
      value: '150',
      icon: FileDocOutline,
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'EPIs Entregues',
      value: '1,245',
      icon: CheckCircleOutline,
      color: 'green',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'EPIs Vencendo',
      value: '23',
      icon: ExclamationCircleOutline,
      color: 'yellow',
      change: '-5%',
      changeType: 'negative'
    },
    {
      title: 'Estoque Baixo',
      value: '12',
      icon: ArchiveOutline,
      color: 'red',
      change: '+3%',
      changeType: 'positive'
    }
  ];
  
  // Dados reativos com stores
  import { writable, derived } from 'svelte/store';
  
  // Mock data stores para demonstrar reatividade otimizada
  const activitiesStore = writable([
    { id: 1, type: 'entrega', description: 'EPI entregue para João Silva', time: 'há 2 horas', equipment: 'Capacete de Segurança' },
    { id: 2, type: 'devolucao', description: 'EPI devolvido por Maria Santos', time: 'há 4 horas', equipment: 'Luvas de Proteção' },
    { id: 3, type: 'entrada', description: 'Nova entrada de estoque', time: 'há 6 horas', equipment: 'Óculos de Proteção - 50 unidades' },
    { id: 4, type: 'vencimento', description: 'EPI próximo ao vencimento', time: 'há 1 dia', equipment: 'Máscara PFF2 - Pedro Oliveira' },
    { id: 5, type: 'ficha', description: 'Nova ficha EPI criada', time: 'há 1 dia', equipment: 'Ana Costa - Administrativa' }
  ]);
  
  const quickStatsStore = writable({
    totalColaboradores: 342,
    fichasVencidas: 8,
    estoqueTotal: 2840,
    entregasHoje: 15
  });
  
  // Derived stores para computações reativas otimizadas
  const totalActiveAlerts = derived([quickStatsStore], ([$stats]) => 
    $stats.fichasVencidas + metrics.find(m => m.title === 'Estoque Baixo')?.value || 0
  );
  
  function getActivityColor(type: string) {
    switch (type) {
      case 'entrega': return 'green';
      case 'devolucao': return 'blue';
      case 'entrada': return 'purple';
      case 'vencimento': return 'yellow';
      case 'ficha': return 'indigo';
      default: return 'gray';
    }
  }
  
  function getActivityBgClass(type: string) {
    const color = getActivityColor(type);
    switch (color) {
      case 'green': return 'bg-green-100 dark:bg-green-900';
      case 'blue': return 'bg-blue-100 dark:bg-blue-900';
      case 'purple': return 'bg-purple-100 dark:bg-purple-900';
      case 'yellow': return 'bg-yellow-100 dark:bg-yellow-900';
      case 'indigo': return 'bg-indigo-100 dark:bg-indigo-900';
      default: return 'bg-gray-100 dark:bg-gray-900';
    }
  }
  
  function getActivityIcon(type: string) {
    switch (type) {
      case 'entrega': return CheckCircleOutline;
      case 'devolucao': return ArrowRightOutline;
      case 'entrada': return ArchiveOutline;
      case 'vencimento': return ExclamationCircleOutline;
      case 'ficha': return FileDocOutline;
      default: return FileDocOutline;
    }
  }
  
  // Otimização: Lazy loading e performance
  let dashboardLoaded = false;
  
  onMount(() => {
    dashboardLoaded = true;
    // Simular carregamento de dados em tempo real
    const interval = setInterval(() => {
      quickStatsStore.update(stats => ({
        ...stats,
        entregasHoje: stats.entregasHoje + Math.floor(Math.random() * 2)
      }));
    }, 30000); // Update a cada 30 segundos
    
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>Dashboard - DataLife EPI</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">Visão geral do sistema de gerenciamento de EPIs</p>
    </div>
    <div class="flex space-x-2">
      <Button size="sm" color="primary" class="rounded-sm">
        Novo EPI
      </Button>
      <Button size="sm" color="alternative" class="rounded-sm">
        Relatório
      </Button>
    </div>
  </div>
  
  <!-- Metrics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each metrics as metric}
      <Card size="sm" class="rounded-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
            <div class="flex items-center mt-2">
              <span class="text-xs {metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}">
                {metric.change}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">vs. mês anterior</span>
            </div>
          </div>
          <div class="p-3 rounded-lg {metric.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' : metric.color === 'green' ? 'bg-green-100 dark:bg-green-900' : metric.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-red-100 dark:bg-red-900'}">
            <svelte:component this={metric.icon} class="w-6 h-6" />
          </div>
        </div>
      </Card>
    {/each}
  </div>
  
  <!-- Main Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Recent Activities -->
    <div class="lg:col-span-2">
      <Card size="sm" class="rounded-sm">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Atividades Recentes</h3>
          <Button size="xs" color="alternative" class="rounded-sm">Ver todas</Button>
        </div>
        
        <div class="space-y-3">
          {#each $activitiesStore as activity (activity.id)}
            <div class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="flex-shrink-0">
                <div class="p-2 rounded-lg {getActivityBgClass(activity.type)}">
                  <svelte:component this={getActivityIcon(activity.type)} class="w-5 h-5" />
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{activity.description}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{activity.equipment}</p>
                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          {/each}
        </div>
      </Card>
    </div>
    
    <!-- Quick Stats & Actions -->
    <div class="space-y-6">
      <!-- Quick Stats -->
      <Card size="sm" class="rounded-sm">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Estatísticas Rápidas</h3>
        
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Total de Colaboradores</span>
            <span class="text-sm font-semibold text-gray-900 dark:text-white">{$quickStatsStore.totalColaboradores}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Fichas Vencidas</span>
            <Badge color="red" class="w-fit rounded-sm">{$quickStatsStore.fichasVencidas}</Badge>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Estoque Total</span>
            <span class="text-sm font-semibold text-gray-900 dark:text-white">{$quickStatsStore.estoqueTotal.toLocaleString('pt-BR')}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Entregas Hoje</span>
            <Badge color="green" class="w-fit rounded-sm">{$quickStatsStore.entregasHoje}</Badge>
          </div>
        </div>
      </Card>
      
      <!-- Quick Actions -->
      <Card size="sm" class="rounded-sm">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ações Rápidas</h3>
        
        <div class="space-y-3">
          <Button color="primary" class="w-full rounded-sm" size="sm">
            Nova Entrega de EPI
          </Button>
          <Button color="alternative" class="w-full rounded-sm" size="sm">
            Cadastrar Colaborador
          </Button>
          <Button color="alternative" class="w-full rounded-sm" size="sm">
            Entrada no Estoque
          </Button>
          <Button color="alternative" class="w-full rounded-sm" size="sm">
            Gerar Relatório
          </Button>
        </div>
      </Card>
      
      <!-- Alerts -->
      <Card size="sm" class="rounded-sm border-l-4 border-l-yellow-500">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Alertas</h3>
        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <ExclamationCircleOutline class="w-4 h-4 text-yellow-600" />
            <span class="text-sm text-gray-600 dark:text-gray-400">23 EPIs vencendo em 30 dias</span>
          </div>
          <div class="flex items-center space-x-2">
            <ExclamationCircleOutline class="w-4 h-4 text-red-600" />
            <span class="text-sm text-gray-600 dark:text-gray-400">12 itens com estoque baixo</span>
          </div>
        </div>
      </Card>
    </div>
  </div>
</div>