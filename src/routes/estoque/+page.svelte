<!--
  Página de Estoque - Arquitetura Container/Presenter
  Implementação completa com service adapters especializados
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import InventoryContainer from '$lib/components/containers/InventoryContainer.svelte';
  import { businessConfigStore } from '$lib/stores/businessConfigStore';
  
  // Garantir que as configurações de negócio estejam carregadas
  onMount(async () => {
    console.log('🚀 Inicializando página de estoque com arquitetura Container/Presenter');
    
    // Inicializar configurações se ainda não estiverem carregadas
    await businessConfigStore.initialize();
    
    console.log('✅ Página de estoque pronta com arquitetura modular completa');
  });
</script>

<svelte:head>
  <title>Estoque - DataLife EPI</title>
</svelte:head>

<!-- Usando o Container completo com service adapters -->
<InventoryContainer 
  initialPageSize={20}
  autoRefresh={false}
/>