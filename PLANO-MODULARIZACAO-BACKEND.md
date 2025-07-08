# 🚀 Plano de Modularização e Integração com Backend

**Projeto**: DataLife EPI - Frontend Svelte  
**Objetivo**: Preparar o frontend para integração com backend PostgreSQL  
**Status**: Em Planejamento  
**Data**: 04 de Janeiro de 2025  
**Última Atualização**: 04 de Janeiro de 2025 (Revisão Crítica Pós Deep-Code-Reasoning)

## 📋 Resumo Executivo

Este documento detalha o plano completo para modularizar o frontend Svelte e prepará-lo para integração com o backend PostgreSQL documentado. **ATUALIZAÇÃO CRÍTICA**: Após análise profunda com deep-code-reasoning, foram identificadas incompatibilidades arquiteturais mais complexas que requerem uma abordagem diferenciada, especialmente relacionadas ao modelo de domínio de negócio do backend.

## 🚨 **DESCOBERTAS CRÍTICAS DA REVISÃO**

### **Complexidade Subestimada do Backend**

A análise inicial baseou-se em uma visão simplificada. O backend PostgreSQL implementa:

- **16 tipos de movimentação** diferentes (incluindo operações `ESTORNO`)
- **Hierarquias complexas**: `CONTRATADAS → COLABORADORES → FICHAS_EPI`
- **Workflows de assinatura**: `PENDENTE_ASSINATURA → ASSINADA → DEVOLVIDO`
- **ENUMs dinâmicos**: 8 categorias de EPI baseadas em padrões brasileiros
- **Event Sourcing** com compensating transactions (não CRUD simples)

## 🎯 Objetivos Principais

### **Objetivo Primário**

Refatorar a arquitetura do frontend para suportar tanto APIs mockadas quanto o backend real, sem quebrar a funcionalidade existente.

### **Objetivos Específicos**

1. **Desacoplar serviços** da implementação mockada atual
2. **Implementar padrões arquiteturais** que suportem Event Sourcing do backend
3. **Criar abstração de paginação** server-side
4. **Estabelecer tipagem forte** baseada em contratos de API

## 🔍 Análise de Incompatibilidades Identificadas

### **1. Incompatibilidade de Padrão de API**

**Problema Atual:**

- Frontend usa `createCRUDAPI` genérico assumindo operações simples de CRUD
- Backend implementa Event Sourcing para estoque (command-based)

**Evidência:**

```typescript
// Frontend atual (CRUD)
api.estoque.update(item) // Tenta atualizar quantidade diretamente

// Backend real (Event Sourcing)
POST /movimentacoes-estoque { tipo: 'entrada', quantidade: 10 } // Registra evento
```

### **2. Incompatibilidade de Paginação**

**Problema Atual:**

- Frontend faz `getAll()` e pagina no cliente
- Backend implementa paginação server-side

**Evidência:**

```typescript
// Frontend atual
const items = await api.getAll(); // Pega tudo
const paginated = items.slice(start, end); // Pagina no cliente

// Backend real
GET /api/tipos-epi?page=1&limit=20 // Paginação no servidor
// Retorna: { data: [...], total: 150, page: 1, pageSize: 20 }
```

## 🏗️ Arquitetura Proposta

### **Estrutura de Serviços por Domínio**

```
src/lib/services/
├── core/
│   ├── apiClient.ts        # Cliente HTTP central com auth
│   ├── types.api.ts        # Tipos auto-gerados do OpenAPI
│   └── errors.ts           # Tratamento centralizado de erros
├── company/
│   ├── companyService.ts   # CRUD de empresas
│   └── companyStore.ts     # Store de empresas
├── inventory/
│   ├── inventoryService.ts # Command-based para estoque
│   ├── movementService.ts  # Movimentações de estoque
│   └── inventoryStore.ts   # Store com paginação
└── employee/
    ├── employeeService.ts  # CRUD de colaboradores
    └── employeeStore.ts    # Store de colaboradores
```

### **Padrão Container/Presenter**

```
src/lib/components/
├── containers/              # Componentes "inteligentes"
│   ├── InventoryContainer.svelte
│   ├── EmployeeContainer.svelte
│   └── MovementContainer.svelte
├── presenters/              # Componentes "burros"
│   ├── InventoryTable.svelte
│   ├── EmployeeForm.svelte
│   └── MovementModal.svelte
└── stores/
    ├── paginatedStore.ts    # Store factory para paginação
    └── realtimeStore.ts     # Store para updates em tempo real
```

## 📋 Plano de Implementação Detalhado

### **Fase 0: Configuração Dinâmica de Negócio (NOVA - 1 dia)**

#### **0.1 ConfigurationService para ENUMs Dinâmicos**

**CRÍTICO**: O backend possui ENUMs complexos que devem ser carregados dinamicamente.

**Arquivo:** `src/lib/services/core/configurationService.ts`

```typescript
interface BusinessConfiguration {
  tiposMovimentacao: Array<{
    code: string;
    label: string;
    description?: string;
  }>;
  categoriasEPI: Array<{
    code: string;
    label: string;
    description?: string;
  }>;
  statusEntrega: Array<{
    code: string;
    label: string;
    description?: string;
  }>;
  statusFicha: Array<{
    code: string;
    label: string;
    description?: string;
  }>;
}

class ConfigurationService {
  async loadBusinessRules(): Promise<BusinessConfiguration> {
    return api.get<BusinessConfiguration>("/api/v1/configuration");
  }
}

export const configurationService = new ConfigurationService();
```

**Store de Configuração:**

```typescript
import { writable } from "svelte/store";

export const businessConfigStore = writable<BusinessConfiguration | null>(null);

// Inicializar no +layout.svelte
export async function initializeBusinessConfig() {
  const config = await configurationService.loadBusinessRules();
  businessConfigStore.set(config);
}
```

### **Fase 1: Fundações com Service Adapters Especializados (3-4 dias)**

#### **1.1 Configuração de Tooling**

```bash
# Instalar dependências
npm install -D openapi-typescript
npm install jose # Para JWT (futuro)

# Criar script de geração de tipos
echo '"gen-types": "openapi-typescript openapi.yaml -o src/lib/types/api.generated.ts"' >> package.json
```

#### **1.2 Criação do Cliente HTTP Central**

**Arquivo:** `src/lib/services/core/apiClient.ts`

```typescript
interface ApiError extends Error {
  status: number;
  response?: any;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiRequestOptions extends RequestInit {
  skipAuth?: boolean;
  timeout?: number;
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { skipAuth = false, timeout = 10000, ...fetchOptions } = options;

  // Headers padrão
  const headers = new Headers(fetchOptions.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  // Headers de autenticação serão implementados por outra equipe
  // Placeholder para integração futura

  // Controller para timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData,
      );
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new ApiError("Request timeout", 408);
    }
    throw error;
  }
}

// Funções auxiliares para diferentes métodos HTTP
export const api = {
  get: <T>(endpoint: string, options?: ApiRequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: any, options?: ApiRequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: any, options?: ApiRequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options?: ApiRequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};
```

#### **1.3 Factory de Store Paginado**

**Arquivo:** `src/lib/stores/paginatedStore.ts`

```typescript
import { writable, type Readable } from "svelte/store";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginatedState<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  filters?: Record<string, any>;
}

export interface PaginatedStore<T> extends Readable<PaginatedState<T>> {
  fetchPage: (params?: PaginationParams) => Promise<void>;
  setFilters: (filters: Record<string, any>) => Promise<void>;
  reload: () => Promise<void>;
  reset: () => void;
}

export function createPaginatedStore<T>(
  fetchFunction: (params: PaginationParams) => Promise<PaginatedResponse<T>>,
  initialPageSize: number = 20,
): PaginatedStore<T> {
  const initialState: PaginatedState<T> = {
    items: [],
    total: 0,
    page: 1,
    pageSize: initialPageSize,
    totalPages: 0,
    loading: false,
    error: null,
  };

  const { subscribe, set, update } = writable(initialState);

  let currentParams: PaginationParams = {
    page: 1,
    limit: initialPageSize,
  };

  async function fetchPage(params: PaginationParams = {}) {
    currentParams = { ...currentParams, ...params };

    update((state) => ({ ...state, loading: true, error: null }));

    try {
      const response = await fetchFunction(currentParams);

      set({
        items: response.data,
        total: response.total,
        page: response.page,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        loading: false,
        error: null,
      });
    } catch (error) {
      update((state) => ({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }));
    }
  }

  async function setFilters(filters: Record<string, any>) {
    currentParams = { ...currentParams, filters, page: 1 };
    await fetchPage(currentParams);
  }

  async function reload() {
    await fetchPage(currentParams);
  }

  function reset() {
    currentParams = { page: 1, limit: initialPageSize };
    set(initialState);
  }

  return {
    subscribe,
    fetchPage,
    setFilters,
    reload,
    reset,
  };
}
```

#### **1.4 Refatoração do Serviço de Estoque**

**Arquivo:** `src/lib/services/inventory/inventoryService.ts`

```typescript
import { api } from "../core/apiClient";
import type {
  PaginatedResponse,
  PaginationParams,
} from "$lib/stores/paginatedStore";

// Tipos específicos do domínio de estoque
export interface ItemEstoqueDTO {
  id: string;
  tipoEPIId: string;
  almoxarifadoId: string;
  quantidade: number;
  localizacao?: string;
  dataValidade?: string;
  status: "disponivel" | "baixo" | "vencendo" | "vencido" | "esgotado";
  dataUltimaMovimentacao: string;
  // Dados expandidos (populados pelo backend)
  tipoEPI?: TipoEPIDTO;
  almoxarifado?: AlmoxarifadoDTO;
}

export interface NovaMovimentacaoForm {
  tipoEPIId: string;
  almoxarifadoId: string;
  tipoMovimentacao: string; // CRÍTICO: Não hardcoded - vem do configurationService
  quantidade: number;
  motivo: string;
  observacoes?: string;
  documentoReferencia?: string;
}

export interface EstornoMovimentacaoForm {
  movimentacaoOriginalId: string;
  motivo: string;
}

export interface MovimentacaoEstoqueDTO {
  id: string;
  tipoEPIId: string;
  almoxarifadoId: string;
  tipoMovimentacao: string;
  quantidade: number;
  motivo: string;
  observacoes?: string;
  dataMovimentacao: string;
  usuarioId: string;
  // Dados expandidos
  tipoEPI?: TipoEPIDTO;
  usuario?: UsuarioDTO;
}

// SEPARAÇÃO EM 4 SERVICE ADAPTERS ESPECIALIZADOS

// 1. EntityManagementAdapter - Para entidades com hierarquia
class EntityManagementAdapter {
  // Context-aware fetching para hierarquias
  async getContratadas(): Promise<ContratadaDTO[]> {
    return api.get<ContratadaDTO[]>("/contratadas");
  }

  async getColaboradoresByContratada(
    contratadaId: string,
  ): Promise<ColaboradorDTO[]> {
    return api.get<ColaboradorDTO[]>(
      `/colaboradores?contratadaId=${contratadaId}`,
    );
  }

  async getTiposEPIByCategoria(categoria?: string): Promise<TipoEPIDTO[]> {
    const params = categoria ? `?categoria=${categoria}` : "";
    return api.get<TipoEPIDTO[]>(`/tipos-epi${params}`);
  }
}

// 2. InventoryCommandAdapter - Para Event Sourcing
class InventoryCommandAdapter {
  // QUERIES - Buscar dados de estoque
  async getInventoryItems(
    params: PaginationParams = {},
  ): Promise<PaginatedResponse<ItemEstoqueDTO>> {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.set("page", params.page.toString());
    if (params.limit) searchParams.set("limit", params.limit.toString());
    if (params.sort) searchParams.set("sort", params.sort);
    if (params.order) searchParams.set("order", params.order);

    // Filtros específicos de estoque
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          searchParams.set(key, value.toString());
        }
      });
    }

    return api.get<PaginatedResponse<ItemEstoqueDTO>>(
      `/estoque/itens?${searchParams.toString()}`,
    );
  }

  async getItemById(id: string): Promise<ItemEstoqueDTO> {
    return api.get<ItemEstoqueDTO>(`/estoque/itens/${id}`);
  }

  async getMovementHistory(
    itemId?: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResponse<MovimentacaoEstoqueDTO>> {
    const searchParams = new URLSearchParams();

    if (itemId) searchParams.set("itemId", itemId);
    if (params.page) searchParams.set("page", params.page.toString());
    if (params.limit) searchParams.set("limit", params.limit.toString());

    return api.get<PaginatedResponse<MovimentacaoEstoqueDTO>>(
      `/estoque/movimentacoes?${searchParams.toString()}`,
    );
  }

  // COMMANDS - Registrar movimentações (Event Sourcing)
  async registerMovement(
    movementData: NovaMovimentacaoForm,
  ): Promise<MovimentacaoEstoqueDTO> {
    return api.post<MovimentacaoEstoqueDTO>(
      "/estoque/movimentacoes",
      movementData,
    );
  }

  async registerEntry(data: {
    tipoEPIId: string;
    almoxarifadoId: string;
    quantidade: number;
    dataValidade?: string;
    localizacao?: string;
    motivo: string;
    documentoReferencia?: string;
  }): Promise<MovimentacaoEstoqueDTO> {
    return this.registerMovement({
      ...data,
      tipoMovimentacao: "entrada_nota",
    });
  }

  // COMMAND METHODS - Event Sourcing
  async registrarAjusteContagem(data: {
    itemEstoqueId: string;
    novaQuantidade: number;
    quantidadeAnterior: number;
    motivo: string;
  }): Promise<MovimentacaoEstoqueDTO> {
    const quantidade = data.novaQuantidade - data.quantidadeAnterior;
    const tipoMovimentacao =
      quantidade > 0 ? "AJUSTE_POSITIVO" : "AJUSTE_NEGATIVO";

    return this.registerMovement({
      itemEstoqueId: data.itemEstoqueId,
      tipoMovimentacao,
      quantidade: Math.abs(quantidade),
      motivo: data.motivo,
    });
  }

  // ESTORNO - Operação crítica para Event Sourcing
  async criarEstorno(
    data: EstornoMovimentacaoForm,
  ): Promise<MovimentacaoEstoqueDTO> {
    return api.post<MovimentacaoEstoqueDTO>(
      "/movimentacoes-estoque/estornos",
      data,
    );
  }

  async registerTransfer(data: {
    itemId: string;
    almoxarifadoDestinoId: string;
    quantidade: number;
    motivo: string;
  }): Promise<MovimentacaoEstoqueDTO[]> {
    const item = await this.getItemById(data.itemId);

    // Transferência gera 2 movimentações: saída + entrada
    const saida = await this.registerMovement({
      tipoEPIId: item.tipoEPIId,
      almoxarifadoId: item.almoxarifadoId,
      tipoMovimentacao: "transferencia",
      quantidade: -data.quantidade, // Saída é negativa
      motivo: data.motivo,
    });

    const entrada = await this.registerMovement({
      tipoEPIId: item.tipoEPIId,
      almoxarifadoId: data.almoxarifadoDestinoId,
      tipoMovimentacao: "entrada_nota",
      quantidade: data.quantidade,
      motivo: data.motivo,
      documentoReferencia: `Transferência ${saida.id}`,
    });

    return [saida, entrada];
  }
}

export const inventoryService = new InventoryService();
```

// 3. ProcessLifecycleAdapter - Para workflows complexos
class ProcessLifecycleAdapter {
// Workflow de assinatura
async registrarAssinatura(entregaId: string, assinaturaData: {
assinatura: string;
}): Promise<EntregaDTO> {
return api.post<EntregaDTO>(`/entregas/${entregaId}/assinatura`, assinaturaData);
}

async processarDevolucao(entregaId: string, devolucaoData: {
motivo: string;
observacoes?: string;
}): Promise<EntregaDTO> {
return api.post<EntregaDTO>(`/entregas/${entregaId}/devolucao`, devolucaoData);
}
}

// 4. ReportingQueryAdapter - Para consultas especializadas
class ReportingQueryAdapter {
async getRelatorioDescartes(filters: {
dataInicio?: string;
dataFim?: string;
categoria?: string;
}): Promise<RelatorioDescartesDTO> {
const params = new URLSearchParams(filters as any).toString();
return api.get<RelatorioDescartesDTO>(`/relatorios/descartes?${params}`);
}
}

export const entityManagementAdapter = new EntityManagementAdapter();
export const inventoryCommandAdapter = new InventoryCommandAdapter();
export const processLifecycleAdapter = new ProcessLifecycleAdapter();
export const reportingQueryAdapter = new ReportingQueryAdapter();

````

### **Fase 2: Estado Normalizado e Container/Presenter Avançado (4-5 dias)**

#### **2.1 Refatoração da Página de Estoque**

**Container:** `src/routes/estoque/+page.svelte`

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { inventoryService } from '$lib/services/inventory/inventoryService';
  import { createPaginatedStore } from '$lib/stores/paginatedStore';
  import InventoryTablePresenter from '$lib/components/presenters/InventoryTable.svelte';
  import MovementModalPresenter from '$lib/components/presenters/MovementModal.svelte';
  import { notify } from '$lib/stores/notificationStore';

  // Store de estoque com paginação
  const inventoryStore = createPaginatedStore(
    inventoryService.getInventoryItems.bind(inventoryService),
    20
  );

  // Estado local do container
  let showMovementModal = false;
  let selectedItem: ItemEstoqueDTO | null = null;
  let filters = {
    status: 'todos',
    categoria: 'todas',
    vencimento: 'todos'
  };
  let searchTerm = '';

  // Carregamento inicial
  onMount(() => {
    inventoryStore.fetchPage();
  });

  // Reatividade para filtros
  $: {
    const activeFilters = {
      ...filters,
      search: searchTerm
    };
    inventoryStore.setFilters(activeFilters);
  }

  // Event handlers (lógica de negócio)
  function handlePageChange(event: CustomEvent<{ page: number }>) {
    inventoryStore.fetchPage({ page: event.detail.page });
  }

  function handleItemEdit(event: CustomEvent<{ item: ItemEstoqueDTO }>) {
    selectedItem = event.detail.item;
    showMovementModal = true;
  }

  async function handleMovementSave(event: CustomEvent<NovaMovimentacaoForm>) {
    try {
      await inventoryService.registerMovement(event.detail);
      showMovementModal = false;
      selectedItem = null;

      // Recarregar dados
      await inventoryStore.reload();

      notify.success('Movimentação registrada', 'Estoque atualizado com sucesso');
    } catch (error) {
      notify.error('Erro ao salvar', error.message);
    }
  }

  function handleMovementCancel() {
    showMovementModal = false;
    selectedItem = null;
  }

  function handleSearchChange(event: CustomEvent<{ value: string }>) {
    searchTerm = event.detail.value;
  }

  function handleFilterChange(event: CustomEvent<{ key: string; value: string }>) {
    filters = { ...filters, [event.detail.key]: event.detail.value };
  }

  function handleClearFilters() {
    filters = { status: 'todos', categoria: 'todas', vencimento: 'todos' };
    searchTerm = '';
  }
</script>

<svelte:head>
  <title>Estoque - DataLife EPI</title>
</svelte:head>

<!-- Presenter component recebe dados e callbacks -->
<InventoryTablePresenter
  items={$inventoryStore.items}
  loading={$inventoryStore.loading}
  error={$inventoryStore.error}
  total={$inventoryStore.total}
  page={$inventoryStore.page}
  totalPages={$inventoryStore.totalPages}
  {searchTerm}
  {filters}
  on:pageChange={handlePageChange}
  on:itemEdit={handleItemEdit}
  on:searchChange={handleSearchChange}
  on:filterChange={handleFilterChange}
  on:clearFilters={handleClearFilters}
/>

<!-- Modal presenter -->
{#if showMovementModal}
  <MovementModalPresenter
    item={selectedItem}
    on:save={handleMovementSave}
    on:cancel={handleMovementCancel}
  />
{/if}
````

**Presenter:** `src/lib/components/presenters/InventoryTable.svelte`

```svelte
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Card, Button, Input, Badge } from 'flowbite-svelte';
  import { SearchOutline, RefreshOutline, PlusOutline } from 'flowbite-svelte-icons';
  import type { ItemEstoqueDTO } from '$lib/services/inventory/inventoryService';
  import SearchableDropdown from '$lib/components/common/SearchableDropdown.svelte';
  import LoadingSpinner from '$lib/components/common/LoadingSpinner.svelte';
  import ErrorDisplay from '$lib/components/common/ErrorDisplay.svelte';

  // Props recebidas do container
  export let items: ItemEstoqueDTO[] = [];
  export let loading: boolean = false;
  export let error: string | null = null;
  export let total: number = 0;
  export let page: number = 1;
  export let totalPages: number = 0;
  export let searchTerm: string = '';
  export let filters: Record<string, string> = {};

  // Event dispatcher para comunicação com container
  const dispatch = createEventDispatcher<{
    pageChange: { page: number };
    itemEdit: { item: ItemEstoqueDTO };
    searchChange: { value: string };
    filterChange: { key: string; value: string };
    clearFilters: void;
  }>();

  // Opções para dropdowns (poderiam vir do container também)
  const statusOptions = [
    { value: 'todos', label: 'Todos os Status' },
    { value: 'disponivel', label: 'Disponível' },
    { value: 'baixo', label: 'Estoque Baixo' },
    { value: 'vencendo', label: 'Próximo ao Vencimento' },
    { value: 'vencido', label: 'Vencido' },
    { value: 'esgotado', label: 'Esgotado' }
  ];

  // Verifica se há filtros ativos
  $: hasActiveFilters = searchTerm ||
    Object.entries(filters).some(([key, value]) =>
      value !== 'todos' && value !== 'todas' && value !== ''
    );

  // Funções de evento (dispatch apenas)
  function handleSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    dispatch('searchChange', { value });
  }

  function handleFilterChange(key: string, value: string) {
    dispatch('filterChange', { key, value });
  }

  function handleItemClick(item: ItemEstoqueDTO) {
    dispatch('itemEdit', { item });
  }

  function handlePageChange(newPage: number) {
    dispatch('pageChange', { page: newPage });
  }

  function getStatusBadgeColor(status: string) {
    switch (status) {
      case 'disponivel': return 'green';
      case 'baixo': return 'yellow';
      case 'vencendo': return 'orange';
      case 'vencido': return 'red';
      case 'esgotado': return 'gray';
      default: return 'gray';
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-xl font-medium text-gray-900 dark:text-white">Estoque de EPIs</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Controle de estoque e movimentações
      </p>
    </div>
    <div class="flex space-x-2">
      <Button size="sm" color="primary" class="rounded-sm">
        <PlusOutline class="w-4 h-4 mr-2" />
        Nova Movimentação
      </Button>
    </div>
  </div>

  <!-- Content -->
  {#if loading}
    <LoadingSpinner />
  {:else if error}
    <ErrorDisplay {error} onRetry={() => dispatch('pageChange', { page })} />
  {:else}
    <!-- Table with Filters -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <!-- Filters -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="relative">
            <SearchOutline class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por localização..."
              class="pl-10 rounded-sm h-10 text-sm"
              value={searchTerm}
              on:input={handleSearchInput}
            />
          </div>

          <!-- Status Filter -->
          <SearchableDropdown
            options={statusOptions}
            value={filters.status || 'todos'}
            placeholder="Status"
            on:change={(e) => handleFilterChange('status', e.detail)}
          />

          <!-- More filters... -->

          <!-- Clear Filters -->
          {#if hasActiveFilters}
            <Button
              color="alternative"
              class="rounded-sm h-10 w-10 p-0 flex items-center justify-center"
              on:click={() => dispatch('clearFilters')}
              title="Limpar Filtros"
            >
              <RefreshOutline class="w-4 h-4" />
            </Button>
          {:else}
            <div></div>
          {/if}
        </div>
      </div>

      <!-- Table -->
      <div class="min-w-[980px] overflow-x-auto">
        <!-- Table implementation... -->
        {#if items.length > 0}
          <table class="w-full">
            <!-- Table content -->
            {#each items as item (item.id)}
              <tr on:click={() => handleItemClick(item)} class="cursor-pointer hover:bg-gray-50">
                <td>{item.tipoEPI?.nomeEquipamento}</td>
                <td>{item.quantidade}</td>
                <td>
                  <Badge color={getStatusBadgeColor(item.status)}>
                    {item.status}
                  </Badge>
                </td>
                <!-- More columns... -->
              </tr>
            {/each}
          </table>
        {:else}
          <div class="text-center py-12">
            <p class="text-gray-500">Nenhum item encontrado</p>
          </div>
        {/if}
      </div>

      <!-- Pagination -->
      {#if totalPages > 1}
        <div class="flex items-center justify-between px-6 py-4 border-t">
          <div class="text-sm text-gray-500">
            Mostrando {((page - 1) * 20) + 1} a {Math.min(page * 20, total)} de {total} resultados
          </div>
          <div class="flex space-x-2">
            <Button
              size="sm"
              color="alternative"
              disabled={page === 1}
              on:click={() => handlePageChange(page - 1)}
            >
              Anterior
            </Button>
            <Button
              size="sm"
              color="alternative"
              disabled={page === totalPages}
              on:click={() => handlePageChange(page + 1)}
            >
              Próximo
            </Button>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>
```

### **Fase 3: Integração com Backend Real (2-3 dias)**

#### **3.1 Atualização do Cliente API**

```typescript
// Remover mock, usar fetch real
export const API_BASE_URL = import.meta.env.PROD
  ? "https://api.datalife-epi.com"
  : "http://localhost:3000/api";

// Implementação de autenticação será feita por outra equipe
// Placeholder para integração futura
```

#### **3.2 Migração Gradual de Serviços**

- Substituir mock por implementação real serviço por serviço
- Validar tipos com API real
- Ajustar mapeamentos conforme necessário

## 📊 Cronograma e Esforço

### **Cronograma Detalhado**

| Fase       | Descrição                                | Duração  | Dependências |
| ---------- | ---------------------------------------- | -------- | ------------ |
| **Fase 0** | Configuração Dinâmica de Negócio         | 1 dia    | -            |
| **Fase 1** | Service Adapters Especializados          | 3-4 dias | Fase 0       |
| **Fase 2** | Estado Normalizado + Container/Presenter | 4-5 dias | Fase 1       |
| **Fase 3** | Integração Backend Real                  | 3-4 dias | Fase 2       |
| **Testes** | Testes e Ajustes                         | 2-3 dias | Todas        |

**Total Estimado: 13-18 dias úteis** (após remoção da camada de autenticação)

### **Recursos Necessários**

- 1 desenvolvedor Svelte/TypeScript sênior
- Acesso ao backend documentado
- Ambiente de desenvolvimento/teste
- Especificação OpenAPI do backend

## 🎯 Critérios de Sucesso

### **Critérios Técnicos**

- [ ] Zero breaking changes na UI durante migração
- [ ] Tipagem forte mantida em 100% do código
- [ ] Performance mantida ou melhorada
- [ ] Cobertura de testes mantida
- [ ] Bundle size não aumentado

### **Critérios de Negócio**

- [ ] Todas as funcionalidades atuais preservadas
- [ ] Integração com backend real funcionando
- [ ] Paginação server-side implementada
- [ ] Sistema de movimentações event-sourced

## 🚨 Riscos e Mitigações

### **Riscos Identificados**

| Risco                              | Probabilidade | Impacto | Mitigação                          |
| ---------------------------------- | ------------- | ------- | ---------------------------------- |
| **Incompatibilidade de tipos**     | Média         | Alto    | Validação contínua com OpenAPI     |
| **Performance degradada**          | Baixa         | Médio   | Testes de performance em cada fase |
| **Breaking changes no backend**    | Baixa         | Alto    | Versionamento de API               |
| **Complexidade de Event Sourcing** | Média         | Alto    | POC inicial e documentação         |

### **Estratégias de Mitigação**

1. **Desenvolvimento incremental** - Cada fase é testável independentemente
2. **Feature flags** - Permitir rollback rápido se necessário
3. **Testes automatizados** - Validação contínua da integridade
4. **Documentação detalhada** - Facilitar manutenção futura

## 📈 Benefícios Esperados

### **Benefícios Técnicos**

- **Arquitetura escalável** preparada para crescimento
- **Manutenibilidade melhorada** com separação clara de responsabilidades
- **Performance otimizada** com paginação server-side
- **Tipagem robusta** com contratos auto-gerados

### **Benefícios de Negócio**

- **Time-to-market reduzido** para novas funcionalidades
- **Menor taxa de bugs** com arquitetura bem definida
- **Facilidade de onboarding** de novos desenvolvedores
- **Preparação para escala** empresarial

## 🔄 Próximos Passos

### **Ações Imediatas**

1. [ ] Aprovação do plano pela equipe
2. [ ] Setup do ambiente de desenvolvimento
3. [ ] Criação do arquivo OpenAPI inicial
4. [ ] Início da Fase 1

### **Dependências Externas CRÍTICAS**

- [ ] **Endpoint de configuração**: `GET /api/v1/configuration` para ENUMs dinâmicos
- [ ] **Especificação OpenAPI completa** com todos os 16 tipos de movimentação
- [ ] **Documentação de workflows** de assinatura e devolução
- [ ] **Ambiente de teste** com dados de CONTRATADAS → COLABORADORES
- [ ] **Política de autorização** para operações de estorno

## 🚨 **QUESTÕES CRÍTICAS PARA O BACKEND TEAM**

### **Sobre Idempotência e Consistência**

1. **Comandos são idempotentes?** Posso reenviar `POST /movimentacoes-estoque` com `Idempotency-Key`?
2. **Consistência eventual?** Após command aceito, mudança aparece imediatamente em queries?
3. **Validação de negócio**: Quem impede quantidade negativa - frontend ou backend?

### **Sobre Autorização** (Será tratado por outra equipe)

_Questões de autenticação e autorização serão implementadas futuramente por equipe especializada._

---

**Documento mantido por**: Equipe Frontend DataLife EPI  
**Última atualização**: 04 de Janeiro de 2025 (Revisão Crítica Completa)  
**Próxima revisão**: Após validação das questões críticas com backend team  
**Status**: ⚠️ **PENDENTE VALIDAÇÃO** de questões arquiteturais com backend
