<!--
  Notes Form Modal Presenter - Componente "Burro"
  
  Responsabilidades:
  - Renderizar UI do modal de formulário de notas
  - Renderizar campos específicos por tipo (entrada/saída)
  - Validação básica de UI
  - Emitir eventos para o Container
  - Zero lógica de negócio
-->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Modal, Button, Input, Textarea, Label, Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell } from 'flowbite-svelte';
  import { PlusOutline, TrashBinOutline } from 'flowbite-svelte-icons';
  import type { Nota, CreateNotaData, NotaItem } from '$lib/services/entity/notesAdapter';

  // ==================== PROPS ====================
  
  export let show = false;
  export let mode: 'create' | 'edit' | 'view' = 'create';
  export let tipo: 'entrada' | 'saida' = 'entrada';
  export let title = 'Nota';
  export let nota: Nota | null = null;
  export let loading = false;

  // ==================== EVENT DISPATCHER ====================
  
  const dispatch = createEventDispatcher<{
    salvar: CreateNotaData;
    cancelar: void;
  }>();

  // ==================== FORM STATE ====================
  
  let formData: CreateNotaData = {
    numeroNota: '',
    data: '',
    responsavel: '',
    motivo: '',
    observacoes: '',
    itens: []
  };

  // Form validation
  let errors: Record<string, string> = {};

  // Item being added/edited
  let currentItem: Partial<NotaItem> = {
    tipoEPIId: '',
    quantidade: 1,
    custoUnitario: undefined
  };

  let editingItemIndex = -1;

  // ==================== LIFECYCLE ====================
  
  $: if (show && nota && (mode === 'edit' || mode === 'view')) {
    formData = {
      numeroNota: nota.numeroNota,
      data: nota.data,
      responsavel: nota.responsavel,
      motivo: nota.motivo,
      observacoes: nota.observacoes || '',
      itens: nota.itens.map(item => ({
        tipoEPIId: item.tipoEPIId,
        quantidade: item.quantidade,
        custoUnitario: item.custoUnitario
      })),
      // Campos específicos por tipo
      ...(nota.tipo === 'entrada' ? {
        fornecedor: nota.fornecedor || '',
        notaFiscal: nota.notaFiscal || '',
        valorTotal: nota.valorTotal
      } : {
        destinatario: nota.destinatario || '',
        solicitante: nota.solicitante || ''
      })
    };
    errors = {};
    resetCurrentItem();
  } else if (show && mode === 'create') {
    formData = {
      numeroNota: generateNotaNumber(),
      data: new Date().toISOString().split('T')[0],
      responsavel: '',
      motivo: '',
      observacoes: '',
      itens: [],
      // Campos específicos por tipo
      ...(tipo === 'entrada' ? {
        fornecedor: '',
        notaFiscal: '',
        valorTotal: 0
      } : {
        destinatario: '',
        solicitante: ''
      })
    };
    errors = {};
    resetCurrentItem();
  }

  // ==================== HELPER FUNCTIONS ====================
  
  function generateNotaNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    const prefix = tipo === 'entrada' ? 'NE' : 'NS';
    const sequence = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${year}-${sequence}`;
  }

  function resetCurrentItem(): void {
    currentItem = {
      tipoEPIId: '',
      quantidade: 1,
      custoUnitario: tipo === 'entrada' ? 0 : undefined
    };
    editingItemIndex = -1;
  }

  // ==================== VALIDATION ====================
  
  function validateForm(): boolean {
    errors = {};

    if (!formData.numeroNota.trim()) {
      errors.numeroNota = 'Número da nota é obrigatório';
    }

    if (!formData.data) {
      errors.data = 'Data é obrigatória';
    }

    if (!formData.responsavel.trim()) {
      errors.responsavel = 'Responsável é obrigatório';
    }

    if (!formData.motivo.trim()) {
      errors.motivo = 'Motivo é obrigatório';
    }

    if (formData.itens.length === 0) {
      errors.itens = 'Pelo menos um item deve ser adicionado';
    }

    // Validações específicas por tipo
    if (tipo === 'entrada') {
      const entradaData = formData as any;
      if (!entradaData.fornecedor?.trim()) {
        errors.fornecedor = 'Fornecedor é obrigatório para notas de entrada';
      }
    } else {
      const saidaData = formData as any;
      if (!saidaData.destinatario?.trim()) {
        errors.destinatario = 'Destinatário é obrigatório para notas de saída';
      }
    }

    return Object.keys(errors).length === 0;
  }

  function validateCurrentItem(): boolean {
    if (!currentItem.tipoEPIId) {
      return false;
    }
    if (!currentItem.quantidade || currentItem.quantidade < 1) {
      return false;
    }
    if (tipo === 'entrada' && (!currentItem.custoUnitario || currentItem.custoUnitario < 0)) {
      return false;
    }
    return true;
  }

  // ==================== ITEM HANDLERS ====================
  
  function handleAddItem(): void {
    if (!validateCurrentItem()) return;

    const newItem = {
      tipoEPIId: currentItem.tipoEPIId!,
      quantidade: currentItem.quantidade!,
      custoUnitario: currentItem.custoUnitario
    };

    if (editingItemIndex >= 0) {
      formData.itens[editingItemIndex] = newItem;
    } else {
      formData.itens = [...formData.itens, newItem];
    }

    // Recalcular valor total para entrada
    if (tipo === 'entrada') {
      const entradaData = formData as any;
      entradaData.valorTotal = formData.itens.reduce((total, item) => 
        total + (item.quantidade * (item.custoUnitario || 0)), 0
      );
    }

    resetCurrentItem();
  }

  function handleEditItem(index: number): void {
    const item = formData.itens[index];
    currentItem = { ...item };
    editingItemIndex = index;
  }

  function handleRemoveItem(index: number): void {
    formData.itens = formData.itens.filter((_, i) => i !== index);
    
    // Recalcular valor total para entrada
    if (tipo === 'entrada') {
      const entradaData = formData as any;
      entradaData.valorTotal = formData.itens.reduce((total, item) => 
        total + (item.quantidade * (item.custoUnitario || 0)), 0
      );
    }

    if (editingItemIndex === index) {
      resetCurrentItem();
    }
  }

  function handleCancelEdit(): void {
    resetCurrentItem();
  }

  // ==================== FORM HANDLERS ====================
  
  function handleSalvar(): void {
    if (mode === 'view') return;

    if (validateForm()) {
      dispatch('salvar', formData);
    }
  }

  function handleCancelar(): void {
    dispatch('cancelar');
  }

  function handleModalClose(): void {
    if (!loading) {
      handleCancelar();
    }
  }

  // ==================== COMPUTED PROPERTIES ====================
  
  $: isReadonly = mode === 'view';
  $: saveButtonText = mode === 'create' ? 'Criar Nota' : mode === 'edit' ? 'Atualizar Nota' : '';
  $: showSaveButton = mode !== 'view';
  $: canAddItem = validateCurrentItem();
  $: isEditingItem = editingItemIndex >= 0;

  // Formatar valor monetário
  function formatarValor(valor?: number): string {
    if (!valor) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  // Calcular total do item
  $: totalItem = (currentItem.quantidade || 0) * (currentItem.custoUnitario || 0);
</script>

<Modal bind:open={show} size="xl" autoclose={false} outsideclose={!loading} on:close={handleModalClose}>
  <div slot="header" class="flex items-center space-x-4">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white">
      {title}
    </h3>
    {#if tipo === 'entrada'}
      <span class="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-sm">Entrada</span>
    {:else}
      <span class="text-sm px-2 py-1 bg-purple-100 text-purple-800 rounded-sm">Saída</span>
    {/if}
  </div>

  <form class="space-y-6" on:submit|preventDefault={handleSalvar}>
    <!-- Informações Básicas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Número da Nota -->
      <div>
        <Label for="numeroNota" class="mb-2">
          Número da Nota *
        </Label>
        <Input
          id="numeroNota"
          type="text"
          bind:value={formData.numeroNota}
          disabled={isReadonly || loading}
          class="rounded-sm {errors.numeroNota ? 'border-red-500' : ''}"
        />
        {#if errors.numeroNota}
          <p class="text-red-500 text-sm mt-1">{errors.numeroNota}</p>
        {/if}
      </div>

      <!-- Data -->
      <div>
        <Label for="data" class="mb-2">
          Data *
        </Label>
        <Input
          id="data"
          type="date"
          bind:value={formData.data}
          disabled={isReadonly || loading}
          class="rounded-sm {errors.data ? 'border-red-500' : ''}"
        />
        {#if errors.data}
          <p class="text-red-500 text-sm mt-1">{errors.data}</p>
        {/if}
      </div>

      <!-- Responsável -->
      <div>
        <Label for="responsavel" class="mb-2">
          Responsável *
        </Label>
        <Input
          id="responsavel"
          type="text"
          placeholder="Nome do responsável"
          bind:value={formData.responsavel}
          disabled={isReadonly || loading}
          class="rounded-sm {errors.responsavel ? 'border-red-500' : ''}"
        />
        {#if errors.responsavel}
          <p class="text-red-500 text-sm mt-1">{errors.responsavel}</p>
        {/if}
      </div>

      <!-- Campos específicos por tipo -->
      {#if tipo === 'entrada'}
        <!-- Fornecedor -->
        <div>
          <Label for="fornecedor" class="mb-2">
            Fornecedor *
          </Label>
          <Input
            id="fornecedor"
            type="text"
            placeholder="Nome do fornecedor"
            bind:value={formData.fornecedor}
            disabled={isReadonly || loading}
            class="rounded-sm {errors.fornecedor ? 'border-red-500' : ''}"
          />
          {#if errors.fornecedor}
            <p class="text-red-500 text-sm mt-1">{errors.fornecedor}</p>
          {/if}
        </div>

        <!-- Nota Fiscal -->
        <div>
          <Label for="notaFiscal" class="mb-2">
            Nota Fiscal
          </Label>
          <Input
            id="notaFiscal"
            type="text"
            placeholder="Número da nota fiscal"
            bind:value={formData.notaFiscal}
            disabled={isReadonly || loading}
            class="rounded-sm"
          />
        </div>
      {:else}
        <!-- Destinatário -->
        <div>
          <Label for="destinatario" class="mb-2">
            Destinatário *
          </Label>
          <Input
            id="destinatario"
            type="text"
            placeholder="Nome do destinatário"
            bind:value={formData.destinatario}
            disabled={isReadonly || loading}
            class="rounded-sm {errors.destinatario ? 'border-red-500' : ''}"
          />
          {#if errors.destinatario}
            <p class="text-red-500 text-sm mt-1">{errors.destinatario}</p>
          {/if}
        </div>

        <!-- Solicitante -->
        <div>
          <Label for="solicitante" class="mb-2">
            Solicitante
          </Label>
          <Input
            id="solicitante"
            type="text"
            placeholder="Nome do solicitante"
            bind:value={formData.solicitante}
            disabled={isReadonly || loading}
            class="rounded-sm"
          />
        </div>
      {/if}
    </div>

    <!-- Motivo -->
    <div>
      <Label for="motivo" class="mb-2">
        Motivo *
      </Label>
      <Textarea
        id="motivo"
        placeholder="Descreva o motivo da movimentação..."
        rows="2"
        bind:value={formData.motivo}
        disabled={isReadonly || loading}
        class="rounded-sm {errors.motivo ? 'border-red-500' : ''}"
      />
      {#if errors.motivo}
        <p class="text-red-500 text-sm mt-1">{errors.motivo}</p>
      {/if}
    </div>

    <!-- Observações -->
    <div>
      <Label for="observacoes" class="mb-2">
        Observações
      </Label>
      <Textarea
        id="observacoes"
        placeholder="Observações adicionais..."
        rows="2"
        bind:value={formData.observacoes}
        disabled={isReadonly || loading}
        class="rounded-sm"
      />
    </div>

    <!-- Itens -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <Label class="text-base font-medium">
          Itens da Nota *
        </Label>
        {#if tipo === 'entrada' && formData.valorTotal}
          <span class="text-lg font-bold text-green-600">
            Total: {formatarValor(formData.valorTotal)}
          </span>
        {/if}
      </div>

      {#if errors.itens}
        <p class="text-red-500 text-sm mb-2">{errors.itens}</p>
      {/if}

      <!-- Adicionar/Editar Item -->
      {#if !isReadonly}
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
          <h4 class="text-sm font-medium mb-3">
            {isEditingItem ? 'Editar Item' : 'Adicionar Item'}
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Tipo EPI -->
            <div>
              <Label for="tipoEPI" class="mb-1 text-sm">
                Tipo EPI *
              </Label>
              <Input
                id="tipoEPI"
                type="text"
                placeholder="ID do tipo EPI"
                bind:value={currentItem.tipoEPIId}
                disabled={loading}
                class="rounded-sm text-sm"
              />
            </div>

            <!-- Quantidade -->
            <div>
              <Label for="quantidade" class="mb-1 text-sm">
                Quantidade *
              </Label>
              <Input
                id="quantidade"
                type="number"
                min="1"
                bind:value={currentItem.quantidade}
                disabled={loading}
                class="rounded-sm text-sm"
              />
            </div>

            <!-- Custo Unitário (apenas para entrada) -->
            {#if tipo === 'entrada'}
              <div>
                <Label for="custoUnitario" class="mb-1 text-sm">
                  Custo Unitário *
                </Label>
                <Input
                  id="custoUnitario"
                  type="number"
                  min="0"
                  step="0.01"
                  bind:value={currentItem.custoUnitario}
                  disabled={loading}
                  class="rounded-sm text-sm"
                />
              </div>

              <!-- Total do Item -->
              <div>
                <Label class="mb-1 text-sm">Total</Label>
                <div class="flex items-center h-10 px-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-sm text-sm">
                  {formatarValor(totalItem)}
                </div>
              </div>
            {:else}
              <div></div>
            {/if}
          </div>

          <!-- Botões do Item -->
          <div class="flex space-x-2 mt-3">
            <Button
              size="xs"
              color="primary"
              class="rounded-sm"
              on:click={handleAddItem}
              disabled={!canAddItem || loading}
            >
              {isEditingItem ? 'Atualizar' : 'Adicionar'}
            </Button>
            {#if isEditingItem}
              <Button
                size="xs"
                color="alternative"
                class="rounded-sm"
                on:click={handleCancelEdit}
                disabled={loading}
              >
                Cancelar
              </Button>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Lista de Itens -->
      {#if formData.itens.length > 0}
        <div class="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <Table>
            <TableHead>
              <TableHeadCell>Tipo EPI</TableHeadCell>
              <TableHeadCell>Quantidade</TableHeadCell>
              {#if tipo === 'entrada'}
                <TableHeadCell>Custo Unit.</TableHeadCell>
                <TableHeadCell>Total</TableHeadCell>
              {/if}
              {#if !isReadonly}
                <TableHeadCell>Ações</TableHeadCell>
              {/if}
            </TableHead>
            <TableBody>
              {#each formData.itens as item, index (index)}
                <TableBodyRow>
                  <TableBodyCell>
                    <span class="font-mono text-sm">{item.tipoEPIId}</span>
                  </TableBodyCell>
                  <TableBodyCell>
                    <span class="text-sm">{item.quantidade}</span>
                  </TableBodyCell>
                  {#if tipo === 'entrada'}
                    <TableBodyCell>
                      <span class="text-sm">{formatarValor(item.custoUnitario)}</span>
                    </TableBodyCell>
                    <TableBodyCell>
                      <span class="text-sm font-medium">{formatarValor((item.quantidade * (item.custoUnitario || 0)))}</span>
                    </TableBodyCell>
                  {/if}
                  {#if !isReadonly}
                    <TableBodyCell>
                      <div class="flex space-x-1">
                        <Button
                          size="xs"
                          color="primary"
                          class="rounded-sm p-1"
                          on:click={() => handleEditItem(index)}
                          disabled={loading}
                          title="Editar"
                        >
                          <PlusOutline class="w-3 h-3" />
                        </Button>
                        <Button
                          size="xs"
                          color="red"
                          class="rounded-sm p-1"
                          on:click={() => handleRemoveItem(index)}
                          disabled={loading}
                          title="Remover"
                        >
                          <TrashBinOutline class="w-3 h-3" />
                        </Button>
                      </div>
                    </TableBodyCell>
                  {/if}
                </TableBodyRow>
              {/each}
            </TableBody>
          </Table>
        </div>
      {:else}
        <div class="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg">
          Nenhum item adicionado
        </div>
      {/if}
    </div>
  </form>

  <div slot="footer" class="flex justify-end space-x-2">
    <Button
      color="alternative"
      size="sm"
      class="rounded-sm"
      on:click={handleCancelar}
      disabled={loading}
    >
      {mode === 'view' ? 'Fechar' : 'Cancelar'}
    </Button>
    {#if showSaveButton}
      <Button
        color="primary"
        size="sm"
        class="rounded-sm"
        on:click={handleSalvar}
        disabled={loading}
      >
        {loading ? 'Salvando...' : saveButtonText}
      </Button>
    {/if}
  </div>
</Modal>