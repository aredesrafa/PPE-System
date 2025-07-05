<!--
  Ficha Detail Presenter - Componente "Burro" com Layout Original
  
  Este presenter é puramente apresentacional:
  - Recebe dados via props
  - Renderiza UI IDÊNTICA ao original
  - Emite eventos para o Container
  - Não contém lógica de negócio
-->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button, Badge, Tabs, TabItem, Avatar } from 'flowbite-svelte';
  import Icon from '$lib/components/common/Icon.svelte';
  import DrawerHeader from '$lib/components/common/DrawerHeader.svelte';
  import StatusDot from '$lib/components/common/StatusDot.svelte';
  import StatusIndicator from '$lib/components/common/StatusIndicator.svelte';
  import LoadingSpinner from '$lib/components/common/LoadingSpinner.svelte';
  import ErrorDisplay from '$lib/components/common/ErrorDisplay.svelte';
  
  // Importar presenters especializados
  import NovaEntregaDrawerPresenter from './NovaEntregaDrawerPresenter.svelte';
  import EditarEntregaDrawerPresenter from './EditarEntregaDrawerPresenter.svelte';
  import DevolucaoModalPresenter from './DevolucaoModalPresenter.svelte';
  import AssinaturaModalPresenter from './AssinaturaModalPresenter.svelte';
  
  import { formatarData, getCorVencimento, getStatusVencimento } from '$lib/utils/dateHelpers';
  import type { 
    FichaDetailData,
    EPIDisponivel,
    EquipamentoEmPosse,
    NovaEntregaFormData
  } from '$lib/services/process/fichaProcessAdapter';

  // ==================== PROPS (dados do Container) ====================
  
  // Dados principais
  export let fichaData: FichaDetailData | null = null;
  export let episDisponiveis: EPIDisponivel[] = [];
  
  // Estados de loading
  export let loading: boolean = false;
  export let error: string | null = null;
  export let entregaLoading: boolean = false;
  export let assinaturaLoading: boolean = false;
  export let devolucaoLoading: boolean = false;
  
  // Estados dos modals/drawers
  export let showNovaEntregaDrawer: boolean = false;
  export let showEditarEntregaDrawer: boolean = false;
  export let showDevolucaoModal: boolean = false;
  export let showAssinaturaModal: boolean = false;
  
  // Dados de contexto para modals
  export let entregaEdicao: any = null;
  export let equipamentoDevolucao: EquipamentoEmPosse | null = null;
  export let entregaAssinatura: any = null;
  
  // Controle de abertura
  export let open: boolean = false;

  // ==================== EVENT DISPATCHER ====================
  
  const dispatch = createEventDispatcher<{
    close: void;
    novaEntrega: void;
    salvarNovaEntrega: NovaEntregaFormData;
    cancelarNovaEntrega: void;
    editarEntrega: { entrega: any };
    salvarEdicaoEntrega: NovaEntregaFormData;
    cancelarEdicaoEntrega: void;
    assinarEntrega: { entrega: any };
    confirmarAssinatura: { assinatura: string };
    cancelarAssinatura: void;
    devolverEquipamento: { equipamento: EquipamentoEmPosse };
    confirmarDevolucao: { motivo: string };
    cancelarDevolucao: void;
    cancelarEntrega: { entrega: any; motivo: string };
    imprimirEntrega: { entrega: any };
  }>();

  // ==================== EVENT HANDLERS ====================
  
  function handleClose(): void {
    dispatch('close');
  }

  function handleNovaEntrega(): void {
    dispatch('novaEntrega');
  }

  function handleEditarEntrega(entrega: any): void {
    dispatch('editarEntrega', { entrega });
  }

  function handleAssinarEntrega(entrega: any): void {
    dispatch('assinarEntrega', { entrega });
  }

  function handleDevolverEquipamento(equipamento: EquipamentoEmPosse): void {
    dispatch('devolverEquipamento', { equipamento });
  }

  function handleImprimirEntrega(entrega: any): void {
    dispatch('imprimirEntrega', { entrega });
  }

  function handleCancelarEntrega(entrega: any): void {
    // Por simplicidade, usar motivo padrão - em produção seria um modal
    dispatch('cancelarEntrega', { entrega, motivo: 'Cancelamento solicitado' });
  }

  // ==================== UTILITY FUNCTIONS ====================
  
  function getStatusFichaInfo(status: string) {
    switch (status) {
      case 'ativa':
        return { color: 'green' as const, label: 'Ativa' };
      case 'vencida':
        return { color: 'red' as const, label: 'Vencida' };
      case 'suspensa':
        return { color: 'yellow' as const, label: 'Suspensa' };
      default:
        return { color: 'gray' as const, label: 'Indefinida' };
    }
  }

  function getStatusEntregaInfo(status: string) {
    switch (status) {
      case 'assinado':
        return { color: 'green' as const, label: 'Assinado' };
      case 'nao_assinado':
        return { color: 'yellow' as const, label: 'Pendente Assinatura' };
      case 'cancelado':
        return { color: 'red' as const, label: 'Cancelado' };
      default:
        return { color: 'gray' as const, label: 'Indefinido' };
    }
  }

  function getInitials(nome: string): string {
    return nome
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
</script>

<!-- Layout IDÊNTICO ao original -->
{#if open}
  <!-- Backdrop -->
  <div 
    class="fixed bg-black bg-opacity-50 z-40 transition-opacity"
    style="top: 4rem; left: 0; right: 0; bottom: 0;"
    on:click={handleClose}
    on:keydown={(e) => e.key === 'Escape' && handleClose()}
    role="button"
    tabindex="0"
  ></div>

  <!-- Drawer -->
  <div 
    class="fixed top-16 right-0 bg-white dark:bg-gray-800 shadow-xl z-45 transform transition-transform duration-300 ease-in-out flex flex-col"
    class:translate-x-0={open}
    class:translate-x-full={!open}
    style="width: min(880px, 95vw); height: calc(100vh - 4rem);"
  >
    
    <!-- Header usando componente reutilizável EXATAMENTE como o original -->
    <DrawerHeader
      objectType="FICHA EPI"
      title={fichaData?.colaborador?.nome || 'Carregando colaborador...'}
      iconName="ClipboardListOutline"
      status={fichaData?.ficha?.status || ''}
      statusType="ficha"
      additionalInfo={[
        fichaData?.colaborador?.cpf ? `CPF ${fichaData.colaborador.cpf}` : '',
        fichaData?.colaborador?.cargo || ''
      ].filter(Boolean)}
      primaryAction={{
        text: 'Nova entrega',
        icon: 'PlusOutline'
      }}
      on:close={handleClose}
      on:primaryAction={handleNovaEntrega}
    />

    <!-- Content -->
    <div class="flex-1 overflow-y-auto custom-scrollbar">
      {#if loading}
        <div class="flex items-center justify-center py-16">
          <LoadingSpinner />
        </div>
      {:else if error}
        <div class="p-8 text-center">
          <Icon name="ExclamationTriangleOutline" className="text-red-500 mx-auto mb-4" size="w-16 h-16" />
          <p class="text-red-600 dark:text-red-400 text-lg mb-4">{error}</p>
          <Button size="sm" color="primary" class="rounded-sm mt-4" on:click={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </div>
      {:else if fichaData}
        <!-- Tabs Content EXATAMENTE como o original -->
        <div class="px-4 py-4">
          <Tabs 
            tabStyle="underline" 
            contentClass="p-0 mt-4"
          >
            <!-- Tab: Equipamentos (EXATAMENTE como o original) -->
            <TabItem 
              open 
              title="Equipamentos"
            >
              <div class="mt-6 border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden">
                {#if fichaData.equipamentosEmPosse.length > 0}
                  {#each fichaData.equipamentosEmPosse as equipamento}
                    <div class="bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-4">
                          <!-- Quantity box instead of icon (EXATAMENTE como o original) -->
                          <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-sm flex items-center justify-center">
                            <span class="text-lg font-bold text-primary-600 dark:text-primary-400">
                              {equipamento.quantidade}
                            </span>
                          </div>
                          <div>
                            <p class="font-semibold text-gray-900 dark:text-white text-base">
                              {equipamento.nomeEquipamento}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                              CA {equipamento.registroCA}
                            </p>
                          </div>
                        </div>
                        <div class="flex items-center space-x-3">
                          <Button
                            size="sm"
                            color="alternative"
                            class="rounded-sm border border-gray-300 dark:border-gray-600"
                            on:click={() => handleDevolverEquipamento(equipamento)}
                          >
                            Devolver
                          </Button>
                        </div>
                      </div>
                      
                      <!-- Grid de 3 colunas EXATAMENTE como o original -->
                      <div class="grid grid-cols-3 gap-4">
                        <div class="flex flex-col">
                          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Entrega</span>
                          <button 
                            class="text-sm text-primary-600 dark:text-primary-400 font-semibold mt-1 hover:underline text-left"
                            on:click={() => {
                              console.log('Abrir drawer da entrega:', equipamento.entregaId);
                            }}
                          >
                            #{equipamento.entregaId}
                          </button>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Prazo Devolução</span>
                          <span class="text-sm text-gray-900 dark:text-white font-semibold mt-1">
                            {formatarData(equipamento.prazoMaximoDevolucao)}
                            {#if equipamento.vencido}
                              <span class="text-red-600"> - {equipamento.diasVencido} dias atrasado</span>
                            {/if}
                          </span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Status</span>
                          <span class="text-sm font-semibold mt-1 {equipamento.vencido ? 'text-red-600' : 'text-green-600'}">
                            {#if equipamento.vencido}
                              Em atraso
                            {:else}
                              No prazo
                            {/if}
                          </span>
                        </div>
                      </div>
                    </div>
                  {/each}
                {:else}
                  <div class="text-center py-12">
                    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4">
                      <Icon name="ShieldCheckOutline" className="text-gray-400" size="w-8 h-8" />
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Nenhum equipamento em posse
                    </h3>
                    <p class="text-gray-500 dark:text-gray-400">
                      Este colaborador não possui EPIs em sua posse no momento.
                    </p>
                  </div>
                {/if}
              </div>
            </TabItem>

            <!-- Tab: Devoluções (EXATAMENTE como o original) -->
            <TabItem 
              title="Devoluções"
            >
              <div class="mt-6 border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden">
                {#if fichaData.devolucoes.length > 0}
                  {#each fichaData.devolucoes as devolucao}
                    <div class="bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-4">
                          <!-- Quantity box verde para devoluções (EXATAMENTE como o original) -->
                          <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-sm flex items-center justify-center">
                            <span class="text-lg font-bold text-green-600 dark:text-green-400">
                              {devolucao.quantidade}
                            </span>
                          </div>
                          <div>
                            <p class="font-semibold text-gray-900 dark:text-white text-base">
                              {devolucao.nomeEquipamento}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                              CA {devolucao.registroCA}
                            </p>
                          </div>
                        </div>
                        <div class="flex items-center space-x-3">
                          <Button
                            size="sm"
                            color="alternative"
                            class="rounded-sm border border-gray-300 dark:border-gray-600"
                            on:click={() => {
                              console.log('Cancelar devolução:', devolucao);
                            }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                      
                      <!-- Grid de 3 colunas para devoluções -->
                      <div class="grid grid-cols-3 gap-4">
                        <div class="flex flex-col">
                          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Entrega</span>
                          <button 
                            class="text-sm text-primary-600 dark:text-primary-400 font-semibold mt-1 hover:underline text-left"
                            on:click={() => {
                              console.log('Abrir drawer da entrega');
                            }}
                          >
                            #E{Math.random().toString(36).substr(2, 3).toUpperCase()}
                          </button>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Prazo Original</span>
                          <span class="text-sm text-gray-900 dark:text-white font-semibold mt-1">
                            {formatarData(devolucao.prazoOriginal)}
                            {#if !devolucao.noPrazo}
                              <span class="text-red-600"> - {devolucao.diasAtraso} dias atrasado</span>
                            {/if}
                          </span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Data da devolução</span>
                          <span class="text-sm text-gray-900 dark:text-white font-semibold mt-1">
                            {formatarData(devolucao.dataDevolucao)}
                          </span>
                        </div>
                      </div>
                    </div>
                  {/each}
                {:else}
                  <div class="text-center py-12">
                    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4">
                      <Icon name="ArrowUturnLeftOutline" className="text-gray-400" size="w-8 h-8" />
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Nenhuma devolução encontrada
                    </h3>
                    <p class="text-gray-500 dark:text-gray-400">
                      Este colaborador não possui devoluções registradas.
                    </p>
                  </div>
                {/if}
              </div>
            </TabItem>

            <!-- Tab: Entregas (EXATAMENTE como o original) -->
            <TabItem 
              title="Entregas"
            >
              <div class="space-y-4 mt-6">
                {#if fichaData.entregas.length > 0}
                  {#each fichaData.entregas as entrega}
                    {@const statusInfo = getStatusEntregaInfo(entrega.status)}
                    
                    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm p-6 shadow-sm">
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-4">
                          <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-sm">
                            <Icon name="TruckOutline" className="text-primary-600 dark:text-primary-400" size="w-5 h-5" />
                          </div>
                          <div>
                            <p class="font-semibold text-gray-900 dark:text-white text-base">
                              Entrega {entrega.id}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                              {formatarData(entrega.dataEntrega)} • Responsável da Entrega
                            </p>
                          </div>
                        </div>
                        <div class="flex items-center space-x-3">
                          <Badge color={statusInfo.color} class="w-fit rounded-sm">
                            {statusInfo.label}
                          </Badge>
                          
                          <!-- Botões de ação EXATAMENTE como o original -->
                          <div class="flex items-center space-x-2">
                            {#if entrega.status === 'nao_assinado'}
                              <Button
                                size="sm"
                                color="primary"
                                class="rounded-sm"
                                on:click={() => handleAssinarEntrega(entrega)}
                                disabled={assinaturaLoading}
                              >
                                Assinar
                              </Button>
                            {/if}
                            
                            <Button
                              size="sm"
                              color="alternative"
                              class="rounded-sm border border-gray-300 dark:border-gray-600"
                              on:click={() => handleImprimirEntrega(entrega)}
                            >
                              <Icon name="PrinterOutline" className="mr-2" size="w-4 h-4" />
                              Imprimir
                            </Button>

                            <Button
                              size="sm"
                              color="alternative"
                              class="rounded-sm border border-gray-300 dark:border-gray-600"
                              on:click={() => handleEditarEntrega(entrega)}
                            >
                              <Icon name="EditOutline" className="mr-2" size="w-4 h-4" />
                              Editar
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Grid de informações EXATAMENTE como o original -->
                      <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="flex flex-col">
                          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Responsável</span>
                          <span class="text-sm text-gray-900 dark:text-white font-semibold mt-1">
                            Responsável da Entrega
                          </span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Itens</span>
                          <span class="text-sm text-gray-900 dark:text-white font-semibold mt-1">
                            1 item<!-- Mockado - em produção viria dos itens -->
                          </span>
                        </div>
                        {#if entrega.status === 'assinado' && entrega.dataAssinatura}
                          <div class="flex flex-col">
                            <span class="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Data Assinatura</span>
                            <span class="text-sm text-gray-900 dark:text-white font-semibold mt-1">
                              {formatarData(entrega.dataAssinatura)}
                            </span>
                          </div>
                        {/if}
                      </div>

                      <!-- Lista de itens mockada EXATAMENTE como o original -->
                      <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          EPIs Entregues:
                        </p>
                        <div class="space-y-2">
                          <div class="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-sm">
                            <div class="flex flex-col">
                              <span class="text-sm text-gray-900 dark:text-white font-medium">
                                Capacete de Segurança
                              </span>
                              <span class="text-xs text-gray-500 dark:text-gray-400">
                                CA 31469
                              </span>
                            </div>
                            <Badge color="gray" class="w-fit rounded-md text-xs">
                              Qtd: 1
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  {/each}
                {:else}
                  <div class="text-center py-12">
                    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4">
                      <Icon name="TruckOutline" className="text-gray-400" size="w-8 h-8" />
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Nenhuma entrega encontrada
                    </h3>
                    <p class="text-gray-500 dark:text-gray-400">
                      Esta ficha ainda não possui entregas registradas.
                    </p>
                  </div>
                {/if}
              </div>
            </TabItem>

          </Tabs>
        </div>
      {:else}
        <!-- Estado vazio -->
        <div class="flex items-center justify-center h-full">
          <div class="text-center">
            <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-fit mx-auto mb-4">
              <Icon name="DocumentOutline" className="text-gray-400" size="w-8 h-8" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Nenhuma ficha selecionada
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
              Selecione uma ficha para ver os detalhes.
            </p>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- Modals e Drawers Aninhados -->
  
  {#if showNovaEntregaDrawer}
    <NovaEntregaDrawerPresenter
      {episDisponiveis}
      loading={entregaLoading}
      show={showNovaEntregaDrawer}
      on:salvar={(e) => dispatch('salvarNovaEntrega', e.detail)}
      on:cancelar={() => dispatch('cancelarNovaEntrega')}
    />
  {/if}

  {#if showEditarEntregaDrawer && entregaEdicao}
    <EditarEntregaDrawerPresenter
      {episDisponiveis}
      entrega={entregaEdicao}
      loading={entregaLoading}
      show={showEditarEntregaDrawer}
      on:salvar={(e) => dispatch('salvarEdicaoEntrega', e.detail)}
      on:cancelar={() => dispatch('cancelarEdicaoEntrega')}
    />
  {/if}

  {#if showDevolucaoModal && equipamentoDevolucao}
    <DevolucaoModalPresenter
      equipamento={equipamentoDevolucao}
      loading={devolucaoLoading}
      show={showDevolucaoModal}
      on:confirmar={(e) => dispatch('confirmarDevolucao', e.detail)}
      on:cancelar={() => dispatch('cancelarDevolucao')}
    />
  {/if}

  {#if showAssinaturaModal && entregaAssinatura}
    <AssinaturaModalPresenter
      entrega={entregaAssinatura}
      loading={assinaturaLoading}
      show={showAssinaturaModal}
      on:confirmar={(e) => dispatch('confirmarAssinatura', e.detail)}
      on:cancelar={() => dispatch('cancelarAssinatura')}
    />
  {/if}

{/if}

<style>
  /* Personalizar scrollbar para o drawer EXATAMENTE como o original */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 8px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  
  :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4b5563;
    background-clip: content-box;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #d1d5db;
    background-clip: content-box;
  }
  
  :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
    background-clip: content-box;
  }
  
  /* Fallback para Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #e5e7eb transparent;
  }
  
  :global(.dark) .custom-scrollbar {
    scrollbar-color: #4b5563 transparent;
  }

  /* Z-index personalizados para sobreposição de drawers */
  :global(.z-45) {
    z-index: 45;
  }
  
  :global(.z-55) {
    z-index: 55;
  }
  
  :global(.z-60) {
    z-index: 60;
  }
</style>