<script lang="ts">
  import { Button, Input } from 'flowbite-svelte';
  import { ChevronDownOutline, SearchOutline } from 'flowbite-svelte-icons';
  import { createEventDispatcher, onMount } from 'svelte';
  
  export let options: Array<{ value: string; label: string; disabled?: boolean }> = [];
  export let value: string = '';
  export let placeholder: string = 'Selecione uma opção';
  export let searchPlaceholder: string = 'Buscar...';
  export let disabled: boolean = false;
  // Note: size prop removida - não é válida para este componente customizado
  export let color: 'light' | 'dark' | 'red' | 'blue' | 'green' | 'yellow' | 'none' | 'purple' | 'primary' | 'alternative' = 'alternative';
  export let noOptionsText: string = 'Nenhuma opção encontrada';
  export let allowClear: boolean = false;
  export let clearText: string = 'Limpar seleção';
  
  const dispatch = createEventDispatcher<{ change: string; clear: void }>();
  
  let searchTerm = '';
  let dropdownOpen = false;
  let dropdownElement: HTMLDivElement;
  let buttonElement: HTMLButtonElement | undefined;
  let dropdownStyle = '';
  let dropdownPortalElement: HTMLDivElement;
  
  // Filtered options based on search term
  $: filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Selected option for display
  $: selectedOption = options.find(option => option.value === value);
  $: displayText = selectedOption?.label || placeholder;
  
  function handleSelect(optionValue: string) {
    value = optionValue;
    searchTerm = '';
    dropdownOpen = false;
    dispatch('change', optionValue);
  }
  
  function handleClear() {
    value = '';
    searchTerm = '';
    dropdownOpen = false;
    dispatch('clear');
  }
  
  function handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    searchTerm = target.value;
  }
  
  function calculateDropdownPosition() {
    if (!buttonElement) return;
    
    const rect = buttonElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 260; // max-h-60 = 240px + padding
    
    // Verificar se há espaço suficiente abaixo
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    let top: number;
    let maxHeight: number;
    
    if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
      // Posicionar abaixo
      top = rect.bottom + 4;
      maxHeight = Math.min(dropdownHeight, spaceBelow - 10);
    } else {
      // Posicionar acima
      top = rect.top - dropdownHeight - 4;
      maxHeight = Math.min(dropdownHeight, spaceAbove - 10);
    }
    
    // Verificar se estamos dentro de um modal (classe flowbite modal backdrop)
    const isInModal = buttonElement.closest('[role="dialog"]') || 
                      buttonElement.closest('.fixed.inset-0') ||
                      document.querySelector('.fixed.inset-0.z-40'); // Flowbite modal backdrop
    
    // Z-index adequado para modal (Flowbite usa z-50 para modais)
    const zIndex = isInModal ? 999999 : 50000;
    
    dropdownStyle = `
      position: fixed;
      top: ${top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      max-height: ${maxHeight}px;
      z-index: ${zIndex};
    `;
  }
  
  function toggleDropdown() {
    if (!disabled) {
      dropdownOpen = !dropdownOpen;
      if (dropdownOpen) {
        // Calcular posição após o DOM ser atualizado
        setTimeout(calculateDropdownPosition, 0);
      }
    }
  }
  
  // Recalcular posição quando a janela é redimensionada ou quando há scroll
  function handleWindowResize() {
    if (dropdownOpen) {
      calculateDropdownPosition();
    }
  }
  
  function handleWindowScroll() {
    if (dropdownOpen) {
      calculateDropdownPosition();
    }
  }
  
  // Close dropdown when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    
    // Não fechar se o clique foi no botão principal
    if (dropdownElement && dropdownElement.contains(target)) {
      return;
    }
    
    // Não fechar se o clique foi dentro do dropdown portal
    if (dropdownPortalElement && dropdownPortalElement.contains(target)) {
      return;
    }
    
    dropdownOpen = false;
  }
  
  onMount(() => {
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', handleWindowScroll, true);
    
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', handleWindowScroll, true);
    };
  });
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative" bind:this={dropdownElement}>
  <Button
    {color}
    {disabled}
    class="w-full justify-between rounded-sm text-left h-10 px-3 text-sm {selectedOption ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}"
    on:click={toggleDropdown}
  >
    <span class="truncate">{displayText}</span>
    <ChevronDownOutline class="w-4 h-4 ml-2 flex-shrink-0 {dropdownOpen ? 'rotate-180' : ''} transition-transform" />
  </Button>
</div>

<!-- Dropdown renderizado em nível superior usando posicionamento fixo -->
{#if dropdownOpen}
  <div 
    class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden"
    style={dropdownStyle}
    bind:this={dropdownPortalElement}
  >
    <!-- Search input -->
    <div class="p-2 border-b border-gray-200 dark:border-gray-600">
      <div class="relative">
        <SearchOutline class="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          class="pl-8 text-sm rounded-sm h-8"
          value={searchTerm}
          on:input={handleSearchInput}
        />
      </div>
    </div>
    
    <!-- Content container com scroll -->
    <div class="overflow-y-auto" style="max-height: calc(100% - 60px);">
      <!-- Clear option -->
      {#if allowClear && value}
        <button
          type="button"
          class="w-full px-4 py-2 text-left text-red-600 hover:text-red-700 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
          on:click={handleClear}
        >
          {clearText}
        </button>
      {/if}
      
      <!-- Options -->
      {#if filteredOptions.length > 0}
        {#each filteredOptions as option}
          <button
            type="button"
            class="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 {option.value === value ? 'bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'} {option.disabled ? 'opacity-50 cursor-not-allowed' : ''}"
            disabled={option.disabled}
            on:click={() => !option.disabled && handleSelect(option.value)}
          >
            <span class="truncate">{option.label}</span>
            {#if option.value === value}
              <div class="w-2 h-2 bg-primary-600 rounded-full ml-2 flex-shrink-0"></div>
            {/if}
          </button>
        {/each}
      {:else}
        <div class="px-4 py-2 text-gray-500 dark:text-gray-400">
          {noOptionsText}
        </div>
      {/if}
    </div>
  </div>
{/if}