<script lang="ts">
  import { Modal, Button } from 'flowbite-svelte';
  import EPIForm from './EPIForm.svelte';
  import type { TipoEPI } from '$lib/types';
  import { DEFAULT_VIDA_UTIL_DIAS } from '$lib/constants/epiConstants';

  export let open: boolean = false;
  export let title: string = 'Novo EPI';
  export let mode: 'create' | 'edit' | 'view' = 'create';
  export let epiData: Partial<TipoEPI> = {};
  export let onSave: (data: Partial<TipoEPI>) => void = () => {};
  export let onCancel: () => void = () => {};

  let formData: Partial<TipoEPI> = {};
  let errors: Partial<Record<keyof TipoEPI, string>> = {};

  // Reatividade para resetar form quando modal abre/fecha
  $: if (open) {
    resetForm();
  }

  function resetForm() {
    formData = {
      ...epiData,
      vidaUtilDias: epiData.vidaUtilDias || DEFAULT_VIDA_UTIL_DIAS
    };
    errors = {};
  }

  function handleFieldChange(field: keyof TipoEPI, value: string | number) {
    formData = { ...formData, [field]: value };
    // Limpar erro do campo quando usuário digita
    if (errors[field]) {
      errors = { ...errors, [field]: '' };
    }
  }

  function validateForm(): boolean {
    const newErrors: Partial<Record<keyof TipoEPI, string>> = {};

    if (!formData.nomeEquipamento?.trim()) {
      newErrors.nomeEquipamento = 'Nome do equipamento é obrigatório';
    }

    if (!formData.numeroCA?.trim()) {
      newErrors.numeroCA = 'Número CA é obrigatório';
    }

    if (!formData.fabricante?.trim()) {
      newErrors.fabricante = 'Fabricante é obrigatório';
    }

    if (!formData.categoria?.trim()) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    if (!formData.vidaUtilDias || formData.vidaUtilDias < 1) {
      newErrors.vidaUtilDias = 'Vida útil deve ser maior que zero';
    }

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  function handleSave() {
    if (validateForm()) {
      onSave(formData);
      handleClose();
    }
  }

  function handleClose() {
    open = false;
    onCancel();
  }

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const saveButtonText = mode === 'create' ? 'Cadastrar' : 'Salvar Alterações';
</script>

<style>
  :global(.modal-container) {
    max-height: calc(100vh - 80px - 16px); /* Altura total - header (64px + 16px padding) - padding bottom */
    margin-top: 80px; /* Altura do header + padding */
    overflow-y: auto;
  }
  
  :global(.modal-body-scrollable) {
    max-height: calc(100vh - 200px); /* Altura para o corpo do modal considerando header e footer */
    overflow-y: auto;
  }
</style>

<Modal bind:open title={title} size="lg" autoclose={false} outsideclose={false} class="modal-container">
  <div slot="header" class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
      {title}
    </h3>
  </div>
  <div class="modal-body-scrollable space-y-4 p-4 md:p-5">
    <EPIForm 
      {formData}
      onChange={handleFieldChange}
      disabled={isViewMode}
      idPrefix="modal-"
    />

    <!-- Exibir erros de validação -->
    {#if Object.keys(errors).length > 0}
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <h4 class="text-sm font-medium text-red-800 dark:text-red-400 mb-2">
          Corrija os seguintes erros:
        </h4>
        <ul class="text-sm text-red-700 dark:text-red-400 space-y-1">
          {#each Object.entries(errors) as [field, error]}
            {#if error}
              <li>• {error}</li>
            {/if}
          {/each}
        </ul>
      </div>
    {/if}
  </div>

  <svelte:fragment slot="footer">
    <div class="flex justify-end space-x-3">
      <Button color="alternative" on:click={handleClose} size="sm" class="rounded-sm">
        {isViewMode ? 'Fechar' : 'Cancelar'}
      </Button>
      {#if !isViewMode}
        <Button color="primary" on:click={handleSave} size="sm" class="rounded-sm">
          {saveButtonText}
        </Button>
      {/if}
    </div>
  </svelte:fragment>
</Modal>