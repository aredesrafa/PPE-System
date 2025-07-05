<!--
  Estoque v2 - Página Principal com Nova Arquitetura
  
  Demonstração da arquitetura Container/Presenter implementada.
  Esta página é extremamente simples - toda a lógica está no Container.
  
  Migração do componente "God" de 800+ linhas para arquitetura modular:
  - EstoqueContainer: toda a lógica de negócio
  - EstoqueTablePresenter: apenas renderização da tabela
  - EstoqueFiltersPresenter: apenas renderização dos filtros
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import EstoqueContainer from '$lib/components/containers/EstoqueContainer.svelte';
  import { Breadcrumb, BreadcrumbItem, Alert } from 'flowbite-svelte';
  import { InfoCircleOutline } from 'flowbite-svelte-icons';
  
  // Configurações da página
  const pageConfig = {
    initialFilters: {},
    autoLoad: true,
    pageSize: 20,
    enableExport: true,
    enableAdjustments: true
  };
  
  onMount(() => {
    console.log('🚀 Página Estoque v2 carregada - Arquitetura Container/Presenter');
  });
</script>

<!-- ==================== HEAD ==================== -->

<svelte:head>
  <title>Estoque v2 - DataLife EPI</title>
  <meta name="description" content="Gestão de estoque modernizada com arquitetura Container/Presenter" />
</svelte:head>

<!-- ==================== HTML ==================== -->

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  
  <!-- Breadcrumb -->
  <div class="px-4 pt-4">
    <Breadcrumb aria-label="Navegação" class="mb-4">
      <BreadcrumbItem href="/" home>Início</BreadcrumbItem>
      <BreadcrumbItem>Estoque v2</BreadcrumbItem>
    </Breadcrumb>
  </div>
  
  <!-- Container Principal -->
  <div class="px-4 pb-4">
    
    <!-- Banner Informativo sobre Nova Arquitetura -->
    <Alert color="blue" class="mb-6">
      <InfoCircleOutline slot="icon" class="w-4 h-4" />
      <span class="font-medium">Nova Arquitetura Implementada!</span>
      Esta página demonstra o Container/Presenter pattern. 
      Compare com <a href="/estoque" class="underline hover:no-underline">estoque legacy</a> 
      para ver a diferença arquitetural.
    </Alert>
    
    <!-- Container de Estoque (toda a lógica está aqui) -->
    <EstoqueContainer 
      initialFilters={pageConfig.initialFilters}
      autoLoad={pageConfig.autoLoad}
      pageSize={pageConfig.pageSize}
      enableExport={pageConfig.enableExport}
      enableAdjustments={pageConfig.enableAdjustments}
    />
    
  </div>
</div>

<!-- ==================== STYLES ==================== -->

<style>
  /* Estilos específicos da página (mínimos) */
  
  /* Garantir que o layout ocupe toda a altura */
  :global(body) {
    @apply min-h-screen;
  }
  
  /* Suporte ao tema escuro */
  :global(.dark) {
    background-color: rgb(17 24 39);
  }
  
  /* Links no banner informativo */
  :global(.alert a) {
    @apply text-blue-700 dark:text-blue-300;
  }
  
  :global(.alert a:hover) {
    @apply text-blue-800 dark:text-blue-200;
  }
</style>