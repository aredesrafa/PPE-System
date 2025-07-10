<!--
  Página de Estoque - Sistema de Tabs Condicionais
  Implementação com tabs baseadas na configuração do backend
  ✅ CORRIGIDO: SSR desabilitado para evitar erros de hidratação
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  // Variáveis reativas para controle de estado
  let error: string | null = null;
  let loading = true;
  let tabsAtivas: any[] = [];
  let tabAtiva = 'DISPONIVEL'; // Tab padrão
  
  // Componentes que serão carregados dinamicamente (SSR-safe)
  let Tabs: any;
  let TabItem: any;
  let CheckCircleSolid: any;
  let ExclamationTriangleOutline: any;
  let XCircleSolid: any;
  let InventoryContainer: any;
  let estoqueConfigAdapter: any;
  
  // Componentes de ícones por tab
  let iconComponents: Record<string, any> = {};
  
  // Cores das tabs por status
  const tabColors = {
    'green': 'text-green-600',
    'orange': 'text-orange-600', 
    'red': 'text-red-600',
    'blue': 'text-blue-600'
  };
  
  // Carregar componentes e configuração de forma SSR-safe
  onMount(async () => {
    if (!browser) return;
    
    console.log('🚀 Inicializando página de estoque com tabs condicionais (SSR-safe)');
    
    try {
      // Importações dinâmicas para evitar problemas de SSR
      console.log('📦 Carregando componentes...');
      
      const [
        flowbiteComponents,
        flowbiteIcons,
        inventoryComponent,
        services
      ] = await Promise.all([
        import('flowbite-svelte'),
        import('flowbite-svelte-icons'),
        import('$lib/components/containers/InventoryContainer.svelte'),
        import('$lib/services')
      ]);
      
      // Atribuir componentes carregados
      Tabs = flowbiteComponents.Tabs;
      TabItem = flowbiteComponents.TabItem;
      CheckCircleSolid = flowbiteIcons.CheckCircleSolid;
      ExclamationTriangleOutline = flowbiteIcons.ExclamationTriangleOutline;
      XCircleSolid = flowbiteIcons.XCircleSolid;
      InventoryContainer = inventoryComponent.default;
      estoqueConfigAdapter = services.estoqueConfigAdapter;
      
      // Mapear ícones
      iconComponents = {
        'check-circle': CheckCircleSolid,
        'alert-triangle': ExclamationTriangleOutline,
        'x-circle': XCircleSolid
      };
      
      console.log('✅ Componentes carregados com sucesso');
      
      // Carregar configuração de tabs do backend
      console.log('📋 Carregando configuração de tabs do backend...');
      tabsAtivas = await estoqueConfigAdapter.obterTabsAtivas();
      console.log('📋 Tabs obtidas do adapter:', tabsAtivas);
      
      // Definir primeira tab ativa como padrão
      if (tabsAtivas.length > 0) {
        tabAtiva = tabsAtivas[0].key;
        console.log('📋 Tab padrão definida:', tabAtiva);
      } else {
        console.warn('⚠️ Nenhuma tab ativa encontrada');
        // Fallback para uma tab padrão se não houver nenhuma
        tabsAtivas = [{
          key: 'DISPONIVEL',
          label: 'Disponível',
          visible: true,
          color: 'green' as const,
          icon: 'check-circle',
          statusFilter: 'DISPONIVEL'
        }];
        tabAtiva = 'DISPONIVEL';
      }
      
      console.log('✅ Página de estoque configurada:', {
        totalTabs: tabsAtivas.length,
        tabsAtivas: tabsAtivas.map(t => ({ key: t.key, label: t.label, visible: t.visible })),
        tabPadrão: tabAtiva
      });
      
    } catch (err) {
      console.error('❌ Erro ao inicializar página de estoque:', err);
      console.error('❌ Stack trace:', err?.stack);
      error = err instanceof Error ? err.message : 'Erro desconhecido';
      
      // Fallback em caso de erro
      tabsAtivas = [{
        key: 'DISPONIVEL',
        label: 'Disponível',
        visible: true,
        color: 'green' as const,
        icon: 'check-circle',
        statusFilter: 'DISPONIVEL'
      }];
      tabAtiva = 'DISPONIVEL';
    } finally {
      loading = false;
      console.log('📋 Loading finalizado, loading =', loading);
    }
  });
  
  // Handler para mudança de tab
  function handleTabChange(tabKey: string) {
    console.log('🔄 Mudança de tab:', tabKey);
    tabAtiva = tabKey;
  }
</script>

<svelte:head>
  <title>Estoque - DataLife EPI</title>
</svelte:head>

{#if error}
  <div class="p-6">
    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
      <h3 class="text-red-800 font-medium">Erro ao carregar página de estoque</h3>
      <p class="text-red-600 mt-2">{error}</p>
    </div>
  </div>
{:else if loading}
  <div class="p-6">
    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h3 class="text-gray-800 font-medium">Carregando configuração de estoque...</h3>
      <div class="mt-2 flex items-center">
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
        <span class="text-gray-600">Aguarde...</span>
      </div>
    </div>
  </div>
{:else}
  <div class="p-6">
    <!-- Header da página -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Gestão de Estoque</h1>
      <p class="text-gray-600 dark:text-gray-400">Controle de itens por status</p>
    </div>
    
    <!-- Sistema de Tabs Condicionais -->
    {#if tabsAtivas.length > 0 && Tabs && TabItem}
      <svelte:component this={Tabs} style="underline" contentClass="py-4">
        {#each tabsAtivas as tab (tab.key)}
          <svelte:component 
            this={TabItem}
            open={tabAtiva === tab.key}
            title={tab.label}
            on:click={() => handleTabChange(tab.key)}
          >
            <div slot="title" class="flex items-center gap-2">
              {#if iconComponents[tab.icon]}
                <svelte:component 
                  this={iconComponents[tab.icon]} 
                  class="w-4 h-4 {tabColors[tab.color]}" 
                />
              {/if}
              <span>{tab.label}</span>
            </div>
            
            <!-- Container específico para cada tab -->
            {#if InventoryContainer}
              <svelte:component 
                this={InventoryContainer}
                key={tab.key}
                statusFilter={tab.statusFilter}
                initialPageSize={20}
                autoRefresh={false}
              />
            {:else}
              <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p class="text-blue-700">Carregando container de inventário...</p>
              </div>
            {/if}
          </svelte:component>
        {/each}
      </svelte:component>
    {:else}
      <!-- Fallback caso não tenha tabs configuradas -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 class="text-yellow-800 font-medium">Nenhuma categoria de estoque configurada</h3>
        <p class="text-yellow-600 mt-2">Entre em contato com o administrador do sistema.</p>
      </div>
    {/if}
  </div>
{/if}