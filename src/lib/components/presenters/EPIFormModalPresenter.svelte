<!--
  EPI Form Modal Presenter - Componente "Burro"
  
  Responsabilidades:
  - Renderizar UI do modal de formulário EPI
  - Renderizar campos do formulário
  - Validação básica de UI
  - Emitir eventos para o Container
  - Zero lógica de negócio
-->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Modal, Button, Input, Textarea, Label, Select } from 'flowbite-svelte';
  import type { TipoEPI, CreateTipoEPIData } from '$lib/services/entity/catalogAdapter';

  // ==================== PROPS ====================
  
  export let show = false;
  export let mode: 'create' | 'edit' | 'view' = 'create';
  export let title = 'EPI';
  export let epi: TipoEPI | null = null;
  export let loading = false;

  // ==================== EVENT DISPATCHER ====================
  
  const dispatch = createEventDispatcher<{
    salvar: CreateTipoEPIData;
    cancelar: void;
  }>();

  // ==================== FORM STATE ====================
  
  let formData: CreateTipoEPIData = {
    nomeEquipamento: '',
    numeroCA: '',
    categoria: '',
    fabricante: '',
    validadePadrao: undefined,
    descricao: '',
    observacoes: ''
  };

  // Form validation
  let errors: Record<string, string> = {};

  // ==================== CATEGORIA OPTIONS ====================
  
  const categoriaOptions = [
    { value: '', label: 'Selecione uma categoria' },
    { value: 'Proteção da Cabeça', label: 'Proteção da Cabeça' },
    { value: 'Proteção dos Olhos', label: 'Proteção dos Olhos' },
    { value: 'Proteção das Mãos', label: 'Proteção das Mãos' },
    { value: 'Proteção dos Pés', label: 'Proteção dos Pés' },
    { value: 'Proteção Auditiva', label: 'Proteção Auditiva' },
    { value: 'Proteção Respiratória', label: 'Proteção Respiratória' },
    { value: 'Proteção contra Quedas', label: 'Proteção contra Quedas' },
    { value: 'Proteção do Corpo', label: 'Proteção do Corpo' }
  ];

  // ==================== LIFECYCLE ====================
  
  $: if (show && epi && (mode === 'edit' || mode === 'view')) {
    formData = {
      nomeEquipamento: epi.nomeEquipamento,
      numeroCA: epi.numeroCA,
      categoria: epi.categoria,
      fabricante: epi.fabricante,
      validadePadrao: epi.validadePadrao,
      descricao: epi.descricao || '',
      observacoes: epi.observacoes || ''
    };
    errors = {};
  } else if (show && mode === 'create') {
    formData = {
      nomeEquipamento: '',
      numeroCA: '',
      categoria: '',
      fabricante: '',
      validadePadrao: undefined,
      descricao: '',
      observacoes: ''
    };
    errors = {};
  }

  // ==================== VALIDATION ====================
  
  function validateForm(): boolean {
    errors = {};

    if (!formData.nomeEquipamento.trim()) {
      errors.nomeEquipamento = 'Nome do equipamento é obrigatório';
    }

    if (!formData.numeroCA.trim()) {
      errors.numeroCA = 'Número CA é obrigatório';
    }

    if (!formData.categoria) {
      errors.categoria = 'Categoria é obrigatória';
    }

    if (!formData.fabricante.trim()) {
      errors.fabricante = 'Fabricante é obrigatório';
    }

    if (formData.validadePadrao !== undefined && formData.validadePadrao < 1) {
      errors.validadePadrao = 'Validade deve ser maior que 0';
    }

    return Object.keys(errors).length === 0;
  }

  // ==================== HANDLERS ====================
  
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
  $: saveButtonText = mode === 'create' ? 'Cadastrar' : mode === 'edit' ? 'Atualizar' : '';
  $: showSaveButton = mode !== 'view';
</script>

<Modal bind:open={show} size="lg" autoclose={false} outsideclose={!loading} on:close={handleModalClose}>
  <div slot="header" class="flex items-center space-x-4">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white">
      {title}
    </h3>
  </div>

  <form class="space-y-4" on:submit|preventDefault={handleSalvar}>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Nome do Equipamento -->
      <div class="md:col-span-2">
        <Label for="nomeEquipamento" class="mb-2">
          Nome do Equipamento *
        </Label>
        <Input
          id="nomeEquipamento"
          type="text"
          placeholder="Ex: Capacete de Segurança"
          bind:value={formData.nomeEquipamento}
          disabled={isReadonly || loading}
          class="rounded-sm {errors.nomeEquipamento ? 'border-red-500' : ''}"
        />
        {#if errors.nomeEquipamento}
          <p class="text-red-500 text-sm mt-1">{errors.nomeEquipamento}</p>
        {/if}
      </div>

      <!-- Número CA -->
      <div>
        <Label for="numeroCA" class="mb-2">
          Número CA *
        </Label>
        <Input
          id="numeroCA"
          type="text"
          placeholder="Ex: 31469"
          bind:value={formData.numeroCA}
          disabled={isReadonly || loading}
          class="rounded-sm {errors.numeroCA ? 'border-red-500' : ''}"
        />
        {#if errors.numeroCA}
          <p class="text-red-500 text-sm mt-1">{errors.numeroCA}</p>
        {/if}
      </div>

      <!-- Fabricante -->
      <div>
        <Label for="fabricante" class="mb-2">
          Fabricante *
        </Label>
        <Input
          id="fabricante"
          type="text"
          placeholder="Ex: SafetyTech"
          bind:value={formData.fabricante}
          disabled={isReadonly || loading}
          class="rounded-sm {errors.fabricante ? 'border-red-500' : ''}"
        />
        {#if errors.fabricante}
          <p class="text-red-500 text-sm mt-1">{errors.fabricante}</p>
        {/if}
      </div>

      <!-- Categoria -->
      <div>
        <Label for="categoria" class="mb-2">
          Categoria *
        </Label>
        <Select
          id="categoria"
          items={categoriaOptions}
          bind:value={formData.categoria}
          disabled={isReadonly || loading}
          class="rounded-sm {errors.categoria ? 'border-red-500' : ''}"
        />
        {#if errors.categoria}
          <p class="text-red-500 text-sm mt-1">{errors.categoria}</p>
        {/if}
      </div>

      <!-- Validade Padrão -->
      <div>
        <Label for="validadePadrao" class="mb-2">
          Validade Padrão (dias)
        </Label>
        <Input
          id="validadePadrao"
          type="number"
          placeholder="Ex: 365"
          bind:value={formData.validadePadrao}
          disabled={isReadonly || loading}
          class="rounded-sm {errors.validadePadrao ? 'border-red-500' : ''}"
          min="1"
        />
        {#if errors.validadePadrao}
          <p class="text-red-500 text-sm mt-1">{errors.validadePadrao}</p>
        {/if}
        <p class="text-sm text-gray-500 mt-1">
          Deixe em branco se não houver validade padrão
        </p>
      </div>

      <!-- Descrição -->
      <div class="md:col-span-2">
        <Label for="descricao" class="mb-2">
          Descrição
        </Label>
        <Textarea
          id="descricao"
          placeholder="Descrição detalhada do equipamento..."
          rows="3"
          bind:value={formData.descricao}
          disabled={isReadonly || loading}
          class="rounded-sm"
        />
      </div>

      <!-- Observações -->
      <div class="md:col-span-2">
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