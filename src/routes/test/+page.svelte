<script lang="ts">
  import { Card, Button } from 'flowbite-svelte';
</script>

<svelte:head>
  <title>Teste - DataLife EPI</title>
</svelte:head>

<div class="p-8">
  <Card size="sm" class="rounded-sm">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Sistema DataLife EPI - Svelte
    </h1>
    
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Frontend recriado em Svelte 4 com Flowbite, mockado mas funcional para apresentação.
    </p>
    
    <div class="space-y-4">
      <Button size="sm" color="primary" class="rounded-sm" href="/">
        Dashboard
      </Button>
      
      <Button size="sm" color="blue" class="rounded-sm" href="/catalogo">
        Catálogo EPIs
      </Button>
      
      <Button size="sm" color="green" class="rounded-sm" href="/estoque">
        Estoque
      </Button>
      
      <Button size="sm" color="yellow" class="rounded-sm" href="/fichas">
        Fichas EPI
      </Button>
      
      <Button size="sm" color="purple" class="rounded-sm" href="/relatorios">
        Relatórios
      </Button>
    </div>
    
    <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
        Status da Implementação
      </h3>
      <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        <li>✅ Projeto Svelte 4 configurado</li>
        <li>✅ Flowbite Svelte integrado</li>
        <li>✅ TailwindCSS configurado</li>
        <li>✅ Stores e gerenciamento de estado</li>
        <li>✅ APIs mockadas funcionais</li>
        <li>✅ Páginas principais criadas</li>
        <li>✅ Componentes reutilizáveis</li>
        <li>⚠️ Ajustes de ícones em andamento</li>
      </ul>
    </div>
  </Card>
</div>