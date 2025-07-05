<script lang="ts">
  import { Button, Avatar, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
  import { BellOutline, MoonOutline, SunOutline, BarsOutline, GridOutline } from 'flowbite-svelte-icons';
  import CompanySelector from '../common/CompanySelector.svelte';
  import { themeStore } from '$lib/stores/themeStore';
  import { selectedCompanyStore } from '$lib/stores/companyStore';
  import { writable, derived } from 'svelte/store';
  
  // Notificações reativas com store
  const notificationsStore = writable([
    { id: 1, title: 'EPI Vencendo', message: 'Capacete de João Silva vence em 5 dias', time: 'há 2 horas', read: false },
    { id: 2, title: 'Estoque Baixo', message: 'Luvas de segurança com apenas 3 unidades', time: 'há 4 horas', read: false },
    { id: 3, title: 'Nova Entrega', message: 'EPIs entregues para Maria Santos', time: 'há 1 dia', read: true }
  ]);
  
  // Derived store para contagem de não lidas
  const unreadCount = derived(notificationsStore, $notifications => 
    $notifications.filter(n => !n.read).length
  );
  
  
  function toggleTheme() {
    themeStore.toggle();
  }
  
  function toggleSidebar() {
    // Dispatch custom event for MainLayout to handle
    window.dispatchEvent(new CustomEvent('toggle-sidebar'));
  }
  
  function handleAppsClick() {
    // Implementar navegação entre módulos futuramente
    console.log('Apps clicked - implementar navegação entre módulos');
  }
  
  // Reactive variables para detectar tipo da empresa
  $: companyBadge = $selectedCompanyStore.badge?.toLowerCase();
  $: isAdminCompany = companyBadge === 'admin';
  $: isHoldingCompany = companyBadge === 'holding';
  $: isContratadaCompany = companyBadge === 'contratada';
  
  // Classes do header baseadas no tipo da empresa
  $: headerClasses = (() => {
    if (isAdminCompany) {
      return 'bg-gray-800 border-gray-700 text-white';
    } else if (isHoldingCompany) {
      return 'bg-primary-900 border-primary-800 text-white';
    } else if (isContratadaCompany) {
      return 'bg-primary-800 border-primary-700 text-white';
    } else {
      return 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700';
    }
  })();
  
  // Classes dos botões baseadas no tipo da empresa
  $: buttonClasses = (() => {
    if (isAdminCompany) {
      return 'text-white hover:bg-gray-700';
    } else if (isHoldingCompany) {
      return 'text-white hover:bg-primary-800';
    } else if (isContratadaCompany) {
      return 'text-white hover:bg-primary-700';
    } else {
      return 'hover:bg-gray-100 dark:hover:bg-gray-700';
    }
  })();
  
  $: needsCustomColor = isAdminCompany || isHoldingCompany || isContratadaCompany;
</script>

<!-- Header fixo -->
<header class="px-4 h-16 fixed left-0 right-0 top-0 z-50 border-b {headerClasses}">
  <div class="flex items-center w-full h-full">
    <!-- Mobile menu button -->
    <Button 
      class="lg:hidden rounded-sm p-2 {buttonClasses}" 
      color={needsCustomColor ? 'none' : 'alternative'} 
      size="sm"
      on:click={toggleSidebar}
    >
      <BarsOutline class="w-5 h-5" />
    </Button>
    
    <!-- Logo -->
    <div class="flex items-center">
      <div class="flex items-center mr-3">
        <img 
          src="/src/lib/assets/logo-icon.svg" 
          alt="DataLife Logo" 
          class="w-8 h-8 mr-2"
        />
        <img 
          src="/src/lib/assets/logo-text.svg" 
          alt="DataLife" 
          class="h-5"
        />
      </div>
    </div>
    
    <!-- Module Header - Componente único clicável -->
    <div class="hidden lg:flex items-center" style="margin-left: 108px;">
      <Button 
        class="flex items-center gap-2 p-2 rounded-sm {buttonClasses}" 
        color={needsCustomColor ? 'none' : 'alternative'} 
        size="sm"
        on:click={handleAppsClick}
      >
        <GridOutline class="w-4 h-4" />
        <span class="text-base font-normal {needsCustomColor ? 'text-white' : 'text-gray-900 dark:text-white'}">
          Gestão de EPI
        </span>
      </Button>
    </div>
    
    <!-- Spacer -->
    <div class="flex-1"></div>
    
    <!-- Right side actions -->
    <div class="flex items-center space-x-3">
      <!-- Company Selector -->
      <CompanySelector headerType={companyBadge} />
      <!-- Theme toggle -->
      <Button 
        class="rounded-sm p-2 {buttonClasses}" 
        color={needsCustomColor ? 'none' : 'alternative'} 
        size="sm"
        on:click={toggleTheme}
      >
        {#if $themeStore === 'dark'}
          <SunOutline class="w-5 h-5" />
        {:else}
          <MoonOutline class="w-5 h-5" />
        {/if}
      </Button>
      
      <!-- Notifications -->
      <div class="relative">
        <Button 
          class="rounded-sm p-2 relative {buttonClasses}" 
          color={needsCustomColor ? 'none' : 'alternative'} 
          size="sm"
        >
          <BellOutline class="w-5 h-5" />
          {#if $unreadCount > 0}
            <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-medium">
              {$unreadCount > 9 ? '9+' : $unreadCount}
            </span>
          {/if}
        </Button>
        <Dropdown placement="bottom-end" class="w-80">
        <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 class="font-semibold text-gray-900 dark:text-white">Notificações</h3>
        </div>
        {#each $notificationsStore as notification (notification.id)}
          <DropdownItem 
            class="flex flex-col items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700 {!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}"
            on:click={() => {
              notificationsStore.update(notifications => 
                notifications.map(n => n.id === notification.id ? {...n, read: true} : n)
              );
            }}
          >
            <div class="flex items-start justify-between w-full">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <p class="font-medium text-gray-900 dark:text-white text-sm">
                    {notification.title}
                  </p>
                  {#if !notification.read}
                    <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                  {/if}
                </div>
                <p class="text-gray-600 dark:text-gray-300 text-xs mt-1">
                  {notification.message}
                </p>
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {notification.time}
              </span>
            </div>
          </DropdownItem>
        {/each}
        <DropdownDivider />
        <DropdownItem class="text-center text-primary-600 hover:text-primary-700 dark:text-primary-400">
          Ver todas as notificações
        </DropdownItem>
      </Dropdown>
      </div>
      
      <!-- User menu otimizado -->
      <div class="relative">
        <Avatar 
          src="" 
          alt="Usuário do Sistema" 
          class="cursor-pointer ring-2 ring-transparent hover:ring-primary-300 transition-all duration-200" 
          size="sm"
        />
        <Dropdown placement="bottom-end" class="w-48">
          <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p class="text-sm text-gray-900 dark:text-white font-medium">Admin</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">admin@datalife.com</p>
          </div>
          <DropdownItem class="flex items-center gap-2 text-sm">
            <div class="w-4 h-4 bg-gray-400 rounded"></div>
            Perfil
          </DropdownItem>
          <DropdownItem class="flex items-center gap-2 text-sm">
          <div class="w-4 h-4 bg-gray-400 rounded"></div>
            Configurações
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem class="text-red-600 flex items-center gap-2 text-sm">
            <div class="w-4 h-4 bg-red-400 rounded"></div>
            Sair
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  </div>
</header>