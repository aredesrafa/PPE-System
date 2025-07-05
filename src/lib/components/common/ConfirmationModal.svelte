<script lang="ts">
  import { Modal, Button } from 'flowbite-svelte';
  import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
  import { confirmationModal } from '$lib/stores';
  import { BUTTON_TEXTS, LOADING_TEXTS } from '$lib/constants/content';
  import { semanticColors } from '$lib/theme';
  
  let processing = false;
  
  async function handleConfirm() {
    processing = true;
    try {
      await confirmationModal.handleConfirm();
    } finally {
      processing = false;
    }
  }
  
  function handleCancel() {
    confirmationModal.handleCancel();
  }
</script>

<Modal
  bind:open={$confirmationModal.isOpen}
  size="sm"
  outsideclose
  class="rounded-sm"
>
  <div class="text-center">
    <!-- Icon -->
    <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 {semanticColors.error.bg} rounded-full">
      <ExclamationCircleOutline class="w-6 h-6 {semanticColors.error.text}" />
    </div>
    
    <!-- Title -->
    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      {$confirmationModal.title}
    </h3>
    
    <!-- Message -->
    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
      {$confirmationModal.message}
    </p>
    
    <!-- Actions -->
    <div class="flex justify-center space-x-4">
      <Button
        color={$confirmationModal.confirmColor || 'red'}
        class="rounded-sm"
        disabled={processing}
        on:click={handleConfirm}
      >
        {processing ? LOADING_TEXTS.processing : ($confirmationModal.confirmText || BUTTON_TEXTS.confirm)}
      </Button>
      
      <Button
        color="alternative"
        class="rounded-sm"
        disabled={processing}
        on:click={handleCancel}
      >
        {$confirmationModal.cancelText || BUTTON_TEXTS.cancel}
      </Button>
    </div>
  </div>
</Modal>