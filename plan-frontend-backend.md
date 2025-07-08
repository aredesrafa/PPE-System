# 🔄 Plano de Migração Frontend → Backend Integration

**Versão**: 1.0  
**Data**: 05 de julho de 2025  
**Status**: 📋 Aprovado para Execução  
**Backend**: ✅ Em Produção (https://epi-backend-s14g.onrender.com)

---

## 🎯 **Objetivo Estratégico**

Migrar o frontend Svelte de um sistema baseado em mocks para integração seamless com o backend NestJS em produção, mantendo 100% de funcionalidade durante toda a transição e implementando funcionalidades avançadas que o backend já oferece.

## 📊 **Análise de Gap Frontend vs Backend**

### ✅ **Backend (Produção) - Funcionalidades Disponíveis:**

- **56 endpoints ativos** com documentação OpenAPI
- **Event Sourcing** completo (`movimentacoes_estoque` como livro-razão)
- **8 categorias de EPI**: `PROTECAO_CABECA`, `PROTECAO_OLHOS`, etc.
- **Sistema de devoluções avançado** com status detalhado
- **Entidade Contratada** com validação CNPJ matemática
- **Configurações dinâmicas** (`PERMITIR_ESTOQUE_NEGATIVO`, etc.)
- **Paginação server-side** em todos os relatórios
- **Sistema de assinatura digital** para entregas

### ⚠️ **Frontend (Atual) - Limitações Identificadas:**

- **Mocks estáticos** que não refletem estrutura real do backend
- **Magic strings** ao invés de ENUMs tipados
- **Componentes gigantes** (800+ linhas) violando SRP
- **Stores sem paginação** server-side
- **Funcionalidades faltando**: Contratadas, categorias EPI completas, devoluções avançadas

---

## 🔍 **Descobertas Críticas da Análise Deep-Code-Reasoning**

### 1. **Semantic Drift (Crítico)**

**Problema**: Frontend e backend usam estruturas de dados incompatíveis.

```typescript
// ❌ Frontend atual (hardcoded)
const categoria = "Proteção Cabeça";

// ✅ Backend real (enum tipado)
const categoria = CategoriaEPI.PROTECAO_CABECA;
```

### 2. **Architectural Inconsistency**

**Problema**: Componentes "God" misturando responsabilidades.

```svelte
<!-- ❌ src/routes/estoque/+page.svelte (800+ linhas) -->
<script>
  // Data fetching + validation + rendering + state management
</script>

<!-- ✅ Solução: Container/Presenter Pattern -->
<!-- Container: apenas lógica -->
<!-- Presenter: apenas UI -->
```

### 3. **State Management Mismatch**

**Problema**: Stores não refletem realidade server-side.

```typescript
// ❌ Atual
const estoque = writable<ItemEstoque[]>([mockData]);

// ✅ Target
const estoque = createPaginatedStore<EstoqueItem>({
  data: [],
  meta: { totalPages, currentPage },
  status: "loading",
});
```

---

## 🚀 **Estratégia de Migração: "Parallel Routes"**

Para garantir **zero downtime** e migração gradual:

### 🛣️ **Conceito Parallel Routes:**

```
/estoque/          (versão atual - mantida funcionando)
/estoque-v2/       (nova versão - integrada com backend)
/contratadas-v2/   (funcionalidade nova)
/relatorios-v2/    (filtros avançados)
```

### 🎛️ **Feature Flags via Configuration Store:**

```typescript
// configurationStore controla transição
const useV2Routes = $configurationStore.useV2Routes;

// Navegação condicional
{#if useV2Routes}
  <a href="/estoque-v2">Estoque</a>
{:else}
  <a href="/estoque">Estoque</a>
{/if}
```

---

## 📋 **Plano de Execução Detalhado**

## 🚀 **FASE 0: Setup - Contrato Semântico (CRÍTICO)**

**⏱️ Duração**: 4-6 horas  
**🎯 Objetivo**: Estabelecer fonte única da verdade tipada

### **Task 0.1: Gerar Tipos Automáticos**

```bash
npx openapi-typescript https://epi-backend-s14g.onrender.com/api/docs -o src/lib/services/api/types.ts
```

**Resultado**: Arquivo `types.ts` com interfaces TypeScript para todos os 56 endpoints.

### **Task 0.2: Criar ENUMs Centralizados**

```typescript
// src/lib/constants/enums.ts
export const CategoriaEPI = {
  PROTECAO_CABECA: "PROTECAO_CABECA",
  PROTECAO_OLHOS: "PROTECAO_OLHOS",
  PROTECAO_AUDITIVA: "PROTECAO_AUDITIVA",
  PROTECAO_RESPIRATORIA: "PROTECAO_RESPIRATORIA",
  PROTECAO_TRONCO: "PROTECAO_TRONCO",
  PROTECAO_MAOS: "PROTECAO_MAOS",
  PROTECAO_PES: "PROTECAO_PES",
  PROTECAO_QUEDAS: "PROTECAO_QUEDAS",
  OUTROS: "OUTROS",
} as const;

export const StatusEntregaEnum = {
  PENDENTE_ASSINATURA: "PENDENTE_ASSINATURA",
  ASSINADA: "ASSINADA",
  CANCELADA: "CANCELADA",
} as const;

// ... todos os 16 tipos de movimentação + outros status
```

### **Task 0.3: API Client Tipado**

```typescript
// src/lib/services/api/client.ts
import type { paths } from "./types";

type FichasEPIResponse =
  paths["/api/v1/fichas-epi"]["get"]["responses"]["200"]["content"]["application/json"];

export async function getFichasEPI(params: {
  page: number;
  limit: number;
  filters?: Record<string, any>;
}): Promise<FichasEPIResponse> {
  const url = new URL(`${BASE_URL}/api/v1/fichas-epi`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  return response.json();
}
```

### **Task 0.4: Configuration Store Dinâmico**

```typescript
// src/lib/stores/configurationStore.ts
import { writable } from "svelte/store";
import type { SystemConfiguration } from "../services/api/types";

export const configurationStore = writable<SystemConfiguration | null>(null);

export async function initializeConfiguration() {
  try {
    const response = await fetch("/api/v1/configuration");
    const config = await response.json();
    configurationStore.set(config);
    return config;
  } catch (error) {
    console.error("Failed to load configuration:", error);
    // Fallback para defaults
    configurationStore.set({
      PERMITIR_ESTOQUE_NEGATIVO: false,
      PERMITIR_AJUSTES_FORCADOS: false,
      ESTOQUE_MINIMO_EQUIPAMENTO: 10,
    });
  }
}
```

---

## 🔧 **FASE 1: Refatoração Foundational (Branch feature/refactor-core)**

**⏱️ Duração**: 2-3 dias  
**🎯 Objetivo**: Base sólida para migração página-por-página

### **Task 1.1: Paginated Store Factory**

```typescript
// src/lib/stores/paginatedStore.ts
export function createPaginatedStore<T>(
  fetchFunction: (params: PaginationParams) => Promise<PaginatedResponse<T>>,
  initialPageSize = 20,
) {
  const { subscribe, set, update } = writable<PaginatedState<T>>({
    data: [],
    meta: {
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      pageSize: initialPageSize,
    },
    status: "idle",
    error: null,
  });

  return {
    subscribe,
    async load(params: Partial<PaginationParams> = {}) {
      update((state) => ({ ...state, status: "loading" }));

      try {
        const response = await fetchFunction({
          page: params.page || 1,
          limit: params.limit || initialPageSize,
          ...params,
        });

        set({
          data: response.items,
          meta: response.meta,
          status: "success",
          error: null,
        });
      } catch (error) {
        update((state) => ({
          ...state,
          status: "error",
          error: error.message,
        }));
      }
    },

    async refresh() {
      // Re-fetch current page
    },

    async nextPage() {
      // Increment page and load
    },
  };
}
```

### **Task 1.2: Refatorar Stores Existentes**

```typescript
// src/lib/stores/estoqueStore.ts
import { createPaginatedStore } from "./paginatedStore";
import { getEstoqueItems } from "../services/api/client";

export const estoqueStore = createPaginatedStore(getEstoqueItems, 20);

// Eliminar completamente dados mock
// export const estoqueData = [...]; // ❌ REMOVIDO
```

### **Task 1.3: Layout Integration**

```typescript
// src/routes/+layout.ts
import { initializeConfiguration } from "$lib/stores/configurationStore";

export async function load() {
  const config = await initializeConfiguration();

  return {
    config,
  };
}
```

---

## 📄 **FASE 2: Migração Página-por-Página (Parallel Routes)**

**⏱️ Duração**: 1-2 semanas  
**🎯 Objetivo**: Funcionalidades completas sem quebrar produção

### **Task 2.1: Implementar Entidade Contratada (Nova Funcionalidade)**

```svelte
<!-- src/routes/contratadas-v2/+page.svelte -->
<script lang="ts">
  import { contratadaStore } from '$lib/stores/contratadaStore';
  import { CnpjValidator } from '$lib/components/forms/CnpjValidator.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    contratadaStore.load();
  });
</script>

<ContratadaTablePresenter
  items={$contratadaStore.data}
  meta={$contratadaStore.meta}
  loading={$contratadaStore.status === 'loading'}
  on:pageChange={handlePageChange}
  on:create={openCreateModal}
/>
```

**Validação CNPJ em Tempo Real:**

```svelte
<!-- src/lib/components/forms/CnpjValidator.svelte -->
<script lang="ts">
  import { debounce } from '$lib/utils/debounce';

  export let value: string = '';
  export let valid: boolean | null = null;

  const validateCnpj = debounce(async (cnpj: string) => {
    if (cnpj.length === 18) { // XX.XXX.XXX/XXXX-XX
      try {
        const response = await fetch(`/api/contratadas/validate-cnpj/${cnpj}`);
        const result = await response.json();
        valid = result.valid;
      } catch {
        valid = false;
      }
    }
  }, 300);

  $: if (value) validateCnpj(value);
</script>

<input
  bind:value
  placeholder="XX.XXX.XXX/XXXX-XX"
  class:valid
  class:invalid={valid === false}
/>
```

### **Task 2.2: Migrar Estoque (Quebrar God Component)**

```svelte
<!-- src/routes/estoque-v2/+page.svelte (Container) -->
<script lang="ts">
  import EstoqueContainer from '$lib/components/containers/EstoqueContainer.svelte';
</script>

<EstoqueContainer />
```

```svelte
<!-- src/lib/components/containers/EstoqueContainer.svelte -->
<script lang="ts">
  import { estoqueStore } from '$lib/stores/estoqueStore';
  import EstoqueList from '../presenters/EstoqueList.svelte';
  import EstoqueFilters from '../presenters/EstoqueFilters.svelte';
  import EstoqueActions from '../presenters/EstoqueActions.svelte';

  let filters = {};

  function handleFilterChange(newFilters) {
    filters = newFilters;
    estoqueStore.load({ filters });
  }

  function handlePageChange(page) {
    estoqueStore.load({ page, filters });
  }
</script>

<div class="estoque-container">
  <EstoqueActions on:newEntry={handleNewEntry} />

  <EstoqueFilters
    {filters}
    on:change={handleFilterChange}
  />

  <EstoqueList
    items={$estoqueStore.data}
    meta={$estoqueStore.meta}
    loading={$estoqueStore.status === 'loading'}
    on:pageChange={handlePageChange}
    on:itemEdit={handleEdit}
  />
</div>
```

### **Task 2.3: EPI Categories Selector**

```svelte
<!-- src/lib/components/forms/EpiCategorySelector.svelte -->
<script lang="ts">
  import { CategoriaEPI } from '$lib/constants/enums';
  import type { CategoriaEPIEnum } from '$lib/constants/enums';

  export let selected: CategoriaEPIEnum | null = null;
  export let placeholder = "Selecione uma categoria";

  const categories = Object.entries(CategoriaEPI).map(([key, value]) => ({
    value,
    label: getHumanReadableCategory(value)
  }));

  function getHumanReadableCategory(categoria: CategoriaEPIEnum): string {
    const mapping = {
      [CategoriaEPI.PROTECAO_CABECA]: 'Proteção da Cabeça',
      [CategoriaEPI.PROTECAO_OLHOS]: 'Proteção dos Olhos',
      [CategoriaEPI.PROTECAO_AUDITIVA]: 'Proteção Auditiva',
      [CategoriaEPI.PROTECAO_RESPIRATORIA]: 'Proteção Respiratória',
      [CategoriaEPI.PROTECAO_TRONCO]: 'Proteção do Tronco',
      [CategoriaEPI.PROTECAO_MAOS]: 'Proteção das Mãos',
      [CategoriaEPI.PROTECAO_PES]: 'Proteção dos Pés',
      [CategoriaEPI.PROTECAO_QUEDAS]: 'Proteção Contra Quedas',
      [CategoriaEPI.OUTROS]: 'Outros'
    };
    return mapping[categoria] || categoria;
  }
</script>

<select bind:value={selected}>
  <option value={null}>{placeholder}</option>
  {#each categories as category}
    <option value={category.value}>{category.label}</option>
  {/each}
</select>
```

### **Task 2.4: Sistema Avançado de Devoluções**

```svelte
<!-- src/lib/components/entregas/EntregaItemsList.svelte -->
<script lang="ts">
  import { StatusEntregaItemEnum } from '$lib/constants/enums';
  import StatusBadge from '../ui/StatusBadge.svelte';

  export let items: EntregaItem[];
  export let entregaStatus: StatusEntregaEnum;

  function canReturn(item: EntregaItem): boolean {
    // Regra de negócio: só pode devolver se entrega foi assinada
    return entregaStatus === StatusEntregaEnum.ASSINADA &&
           item.status === StatusEntregaItemEnum.COM_COLABORADOR;
  }

  function isOverdue(item: EntregaItem): boolean {
    if (!item.data_limite_devolucao) return false;
    return new Date(item.data_limite_devolucao) < new Date();
  }
</script>

{#each items as item}
  <tr class:overdue={isOverdue(item)}>
    <td>{item.tipo_epi_nome}</td>
    <td>
      <StatusBadge
        type="entrega_item"
        status={item.status}
        variant={isOverdue(item) ? 'danger' : 'default'}
      />
    </td>
    <td>{item.data_limite_devolucao || 'Sem prazo'}</td>
    <td>
      {#if canReturn(item)}
        <button on:click={() => returnItem(item.id)}>
          Devolver
        </button>
      {:else}
        <span class="text-gray-400">
          {#if entregaStatus !== StatusEntregaEnum.ASSINADA}
            Aguardando assinatura
          {:else}
            Já devolvido
          {/if}
        </span>
      {/if}
    </td>
  </tr>
{/each}
```

---

## 🎨 **FASE 3: Componentes Reutilizáveis e UX**

**⏱️ Duração**: 1 semana  
**🎯 Objetivo**: UI consistente e type-safe

### **Task 3.1: StatusBadge Type-Safe**

```svelte
<!-- src/lib/components/ui/StatusBadge.svelte -->
<script lang="ts">
  import type {
    StatusEntregaEnum,
    StatusFichaEnum,
    StatusNotaEnum,
    StatusEntregaItemEnum
  } from '$lib/constants/enums';

  export let type: 'entrega' | 'ficha' | 'nota' | 'entrega_item';
  export let status: StatusEntregaEnum | StatusFichaEnum | StatusNotaEnum | StatusEntregaItemEnum;
  export let variant: 'default' | 'danger' = 'default';

  function getStatusDisplay(type: string, status: string) {
    const mappings = {
      entrega: {
        'PENDENTE_ASSINATURA': { text: 'Pendente Assinatura', color: 'yellow' },
        'ASSINADA': { text: 'Assinada', color: 'green' },
        'CANCELADA': { text: 'Cancelada', color: 'red' }
      },
      entrega_item: {
        'COM_COLABORADOR': { text: 'Com Colaborador', color: 'blue' },
        'DEVOLVIDO': { text: 'Devolvido', color: 'gray' }
      },
      // ... outros mappings
    };

    return mappings[type]?.[status] || { text: status, color: 'gray' };
  }

  $: display = getStatusDisplay(type, status);
  $: colorClass = variant === 'danger' ? 'bg-red-100 text-red-800' :
                  `bg-${display.color}-100 text-${display.color}-800`;
</script>

<span class="badge {colorClass}">
  {display.text}
</span>
```

### **Task 3.2: Movement History Log (Event Sourcing UI)**

```svelte
<!-- src/lib/components/estoque/MovementHistoryLog.svelte -->
<script lang="ts">
  import { TipoMovimentacaoEnum } from '$lib/constants/enums';
  import type { MovimentacaoEstoque } from '$lib/services/api/types';

  export let movements: MovimentacaoEstoque[];

  function getMovementIcon(tipo: TipoMovimentacaoEnum): string {
    const icons = {
      'ENTRADA_NOTA': '➡️',
      'SAIDA_ENTREGA': '⬅️',
      'ENTRADA_DEVOLUCAO': '🔄',
      'SAIDA_DESCARTE': '🗑️',
      'AJUSTE_POSITIVO': '➕',
      'AJUSTE_NEGATIVO': '➖',
      'ESTORNO_ENTRADA_NOTA': '↩️',
      // ... outros ícones
    };
    return icons[tipo] || '📝';
  }

  function getMovementDescription(movement: MovimentacaoEstoque): string {
    const descriptions = {
      'ENTRADA_NOTA': `Entrada via Nota #${movement.nota_movimentacao_id}`,
      'SAIDA_ENTREGA': `Saída para Entrega #${movement.entrega_id}`,
      'ENTRADA_DEVOLUCAO': 'Devolução de colaborador',
      'SAIDA_DESCARTE': 'Item descartado',
      'AJUSTE_POSITIVO': `Ajuste de inventário (+${movement.quantidade_movida})`,
      'AJUSTE_NEGATIVO': `Ajuste de inventário (-${movement.quantidade_movida})`,
      // ... outras descrições
    };
    return descriptions[movement.tipo_movimentacao] || movement.tipo_movimentacao;
  }

  function getQuantityDisplay(movement: MovimentacaoEstoque): string {
    const isEntry = movement.tipo_movimentacao.includes('ENTRADA') ||
                    movement.tipo_movimentacao.includes('AJUSTE_POSITIVO');
    const sign = isEntry ? '+' : '-';
    return `${sign}${movement.quantidade_movida}`;
  }
</script>

<div class="movement-log">
  <h3>📜 Histórico de Movimentações (Event Sourcing)</h3>
  <div class="timeline">
    {#each movements as movement}
      <div class="timeline-item">
        <div class="timeline-icon">
          {getMovementIcon(movement.tipo_movimentacao)}
        </div>
        <div class="timeline-content">
          <div class="movement-header">
            <span class="movement-description">
              {getMovementDescription(movement)}
            </span>
            <span class="movement-quantity" class:positive={movement.tipo_movimentacao.includes('ENTRADA')}>
              {getQuantityDisplay(movement)}
            </span>
          </div>
          <div class="movement-meta">
            <span class="timestamp">{new Date(movement.data_movimentacao).toLocaleString()}</span>
            <span class="responsible">por {movement.responsavel_nome}</span>
          </div>
          {#if movement.movimentacao_origem_id}
            <div class="estorno-info">
              ↩️ Estorno da movimentação #{movement.movimentacao_origem_id}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .movement-log {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1rem;
    background: #fafafa;
  }

  .timeline {
    position: relative;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #d1d5db;
  }

  .timeline-item {
    display: flex;
    margin-bottom: 1rem;
    position: relative;
  }

  .timeline-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    border: 2px solid #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    margin-right: 1rem;
    z-index: 1;
  }

  .movement-quantity.positive {
    color: #059669;
  }

  .movement-quantity:not(.positive) {
    color: #dc2626;
  }

  .estorno-info {
    font-size: 0.875rem;
    color: #6b7280;
    font-style: italic;
  }
</style>
```

### **Task 3.3: Filtros Multi-Dimensionais para Relatórios**

```svelte
<!-- src/lib/components/reports/AdvancedFilters.svelte -->
<script lang="ts">
  import { CategoriaEPI, StatusEstoqueEnum } from '$lib/constants/enums';
  import DateRangePicker from '../forms/DateRangePicker.svelte';
  import EpiCategorySelector from '../forms/EpiCategorySelector.svelte';

  export let filters = {};

  let filterRules = [
    { field: 'categoria', operator: 'equals', value: null }
  ];

  function addFilter() {
    filterRules = [...filterRules, { field: '', operator: 'equals', value: null }];
  }

  function removeFilter(index) {
    filterRules = filterRules.filter((_, i) => i !== index);
  }

  function buildFilters() {
    const result = {};
    filterRules.forEach(rule => {
      if (rule.field && rule.value !== null) {
        result[rule.field] = { [rule.operator]: rule.value };
      }
    });
    return result;
  }

  $: filters = buildFilters();
</script>

<div class="advanced-filters">
  <h4>🔍 Filtros Avançados</h4>

  {#each filterRules as rule, index}
    <div class="filter-rule">
      <select bind:value={rule.field}>
        <option value="">Selecione um campo</option>
        <option value="categoria">Categoria</option>
        <option value="status">Status</option>
        <option value="almoxarifado_id">Almoxarifado</option>
        <option value="data_criacao">Data de Criação</option>
      </select>

      <select bind:value={rule.operator}>
        <option value="equals">é igual a</option>
        <option value="not_equals">é diferente de</option>
        <option value="greater_than">é maior que</option>
        <option value="less_than">é menor que</option>
        <option value="contains">contém</option>
      </select>

      {#if rule.field === 'categoria'}
        <EpiCategorySelector bind:selected={rule.value} />
      {:else if rule.field === 'status'}
        <select bind:value={rule.value}>
          {#each Object.values(StatusEstoqueEnum) as status}
            <option value={status}>{status}</option>
          {/each}
        </select>
      {:else if rule.field === 'data_criacao'}
        <DateRangePicker bind:value={rule.value} />
      {:else}
        <input type="text" bind:value={rule.value} placeholder="Valor..." />
      {/if}

      <button on:click={() => removeFilter(index)}>❌</button>
    </div>
  {/each}

  <button on:click={addFilter} class="add-filter">➕ Adicionar Filtro</button>
</div>
```

---

## 📋 **FASE 4: Melhorias e Otimizações (Contínuo)**

**⏱️ Duração**: Contínuo  
**🎯 Objetivo**: Performance, qualidade e evolução

### **Task 4.1: CI/CD Type Safety Check**

```yaml
# .github/workflows/type-check.yml
name: Type Safety Check

on: [push, pull_request]

jobs:
  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Generate types from backend
        run: npx openapi-typescript https://epi-backend-s14g.onrender.com/api/docs -o src/lib/services/api/types.ts

      - name: Check for type drift
        run: |
          if git diff --exit-code src/lib/services/api/types.ts; then
            echo "✅ Types are up to date"
          else
            echo "❌ Types have drifted from backend API"
            echo "Please run: npm run generate-types"
            exit 1
          fi

      - name: Type check
        run: npm run check
```

### **Task 4.2: Performance Optimizations**

```typescript
// src/lib/utils/apiOptimizations.ts

// Batch API calls quando possível
export async function loadPageData(pageType: string, id?: string) {
  const promises = [];

  switch (pageType) {
    case "delivery-details":
      // Ao invés de 3 chamadas sequenciais, fazer paralelo
      promises.push(
        getDelivery(id),
        getDeliveryItems(id),
        getDeliveryHistory(id),
      );
      break;

    case "inventory-dashboard":
      promises.push(
        getInventoryItems({ page: 1, limit: 20 }),
        getInventoryStats(),
        getLowStockAlerts(),
      );
      break;
  }

  try {
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("Failed to load page data:", error);
    throw error;
  }
}

// Cache inteligente nos stores
export function createCachedStore<T>(
  fetchFunction: () => Promise<T>,
  ttlMs: number = 300000, // 5 minutos
) {
  let cache: { data: T; timestamp: number } | null = null;

  return {
    async get(): Promise<T> {
      const now = Date.now();

      if (cache && now - cache.timestamp < ttlMs) {
        return cache.data;
      }

      const data = await fetchFunction();
      cache = { data, timestamp: now };
      return data;
    },

    invalidate() {
      cache = null;
    },
  };
}
```

### **Task 4.3: Colaboração Backend - Endpoints Agregados**

```typescript
// Análise: se uma página precisar de muitas chamadas, propor novo endpoint

// ❌ Problema: página de detalhes da entrega fazendo 5+ calls
async function loadDeliveryPage(id: string) {
  const delivery = await getDelivery(id); // 1
  const items = await getDeliveryItems(id); // 2
  const ficha = await getFicha(delivery.ficha_id); // 3
  const colaborador = await getColaborador(ficha.colaborador_id); // 4
  const history = await getDeliveryHistory(id); // 5
  // ... potencialmente mais calls
}

// ✅ Solução: propor endpoint agregado ao backend
// GET /api/v1/deliveries/{id}/complete
// Retorna: { delivery, items, ficha, colaborador, history } em uma única call
```

---

## 🎯 **Critérios de Sucesso**

### ✅ **Funcionais:**

- [ ] **Zero downtime** durante migração
- [ ] **100% feature parity** com versão atual
- [ ] **Novas funcionalidades** (Contratadas, 8 categorias EPI, devoluções avançadas)
- [ ] **Validação CNPJ** em tempo real
- [ ] **Event Sourcing** representado corretamente na UI

### ✅ **Técnicos:**

- [ ] **Type safety completa** entre frontend e backend
- [ ] **Zero magic strings** - apenas ENUMs
- [ ] **Performance melhorada** com paginação server-side
- [ ] **Componentes reutilizáveis** < 200 linhas cada
- [ ] **Coverage de testes** > 80%

### ✅ **Operacionais:**

- [ ] **CI/CD automatizado** para detectar type drift
- [ ] **Documentação atualizada** de todos os componentes
- [ ] **Monitoramento** de performance e erros
- [ ] **Rollback strategy** definida

---

## 🚨 **Riscos e Mitigações**

### ⚠️ **Riscos Identificados:**

| Risco                            | Probabilidade | Impacto | Mitigação                           |
| -------------------------------- | ------------- | ------- | ----------------------------------- |
| **Backend API mudança breaking** | Baixo         | Alto    | CI/CD detecta automaticamente       |
| **Performance degradada**        | Médio         | Médio   | Testes de carga + cache inteligente |
| **Bugs na migração**             | Médio         | Alto    | Parallel routes + rollback rápido   |
| **Resistência da equipe**        | Baixo         | Médio   | Treinamento + documentação clara    |

### 🛡️ **Estratégias de Rollback:**

1. **Level 1**: Feature flags para voltar rotas antigas
2. **Level 2**: Revert do merge da refatoração foundational
3. **Level 3**: Hotfix para bugs críticos

---

## 📅 **Cronograma Detalhado**

| Fase       | Duração     | Início   | Término  | Responsável   | Dependências          |
| ---------- | ----------- | -------- | -------- | ------------- | --------------------- |
| **Fase 0** | 4-6h        | Hoje     | Hoje     | Dev Lead      | Backend em produção   |
| **Fase 1** | 2-3 dias    | +1 dia   | +3 dias  | Frontend Team | Fase 0 completa       |
| **Fase 2** | 1-2 semanas | +4 dias  | +14 dias | Full Team     | Fase 1 aprovada       |
| **Fase 3** | 1 semana    | +15 dias | +21 dias | Frontend Team | Fase 2 parcial        |
| **Fase 4** | Contínuo    | +22 dias | ∞        | Todos         | Processo estabelecido |

---

## 📊 **Métricas de Monitoramento**

### 🎯 **KPIs Técnicos:**

- **Build Time**: Meta < 2 minutos
- **Bundle Size**: Meta < 70% do React original
- **API Response Time**: Meta < 200ms (p95)
- **Error Rate**: Meta < 0.1%

### 👥 **KPIs de Usuário:**

- **Page Load Time**: Meta < 1.5s
- **Time to Interactive**: Meta < 2s
- **User Satisfaction**: Meta > 4.5/5

### 🔧 **KPIs de Desenvolvimento:**

- **Deploy Frequency**: Meta > 1x/dia
- **Lead Time**: Meta < 2 dias
- **MTTR**: Meta < 1 hora

---

## 🔗 **Recursos e Links**

### 📚 **Documentação:**

- **Backend API**: https://epi-backend-s14g.onrender.com/api/docs
- **Repositório Backend**: https://github.com/costarafael/epi35
- **OpenAPI Generator**: https://www.npmjs.com/package/openapi-typescript

### 🛠️ **Ferramentas:**

- **Type Generation**: `openapi-typescript`
- **API Testing**: Postman Collection
- **Performance**: Lighthouse CI
- **Error Tracking**: Sentry (sugestão)

---

## ✅ **Aprovação e Sign-off**

- [ ] **Tech Lead**: Arquitetura aprovada
- [ ] **Product Owner**: Funcionalidades validadas
- [ ] **DevOps**: Estratégia de deploy aprovada
- [ ] **QA**: Plano de testes aprovado

---

**📝 Próxima Ação**: Executar Fase 0 - Setup do Contrato Semântico

```bash
# Comando para iniciar a migração
npx openapi-typescript https://epi-backend-s14g.onrender.com/api/docs -o src/lib/services/api/types.ts
```

---

_Documento criado com análise deep-code-reasoning em 05/07/2025_
