<script lang="ts">
  // Componente de tabela responsiva reutilizável
  // Evita scroll horizontal em telas >= 980px
  
  import { Table, TableHead, TableBody } from 'flowbite-svelte';
  
  export let hoverable = true;
  export let minWidth = '980px'; // Largura mínima antes do scroll
  export let tableClass = '';
  export let containerClass = '';
</script>

<!-- Container responsivo -->
<div class="min-w-[{minWidth}] overflow-x-auto {containerClass}">
  <Table {hoverable} class={tableClass}>
    <TableHead>
      <slot name="header" />
    </TableHead>
    <TableBody>
      <slot name="body" />
    </TableBody>
  </Table>
</div>

<!-- 
  Uso:
  
  <ResponsiveTable minWidth="980px">
    <svelte:fragment slot="header">
      <TableHeadCell class="min-w-[200px]">Coluna 1</TableHeadCell>
      <TableHeadCell class="min-w-[120px] hidden lg:table-cell">Coluna 2</TableHeadCell>
    </svelte:fragment>
    
    <svelte:fragment slot="body">
      {#each items as item}
        <TableBodyRow>
          <TableBodyCell class="min-w-[200px]">...</TableBodyCell>
          <TableBodyCell class="min-w-[120px] hidden lg:table-cell">...</TableBodyCell>
        </TableBodyRow>
      {/each}
    </svelte:fragment>
  </ResponsiveTable>
-->