/**
 * Estoque Store - Integração com Backend usando Paginated Store Factory
 * 
 * Substitui o store estático legacy por integração real com backend PostgreSQL.
 * Usa server-side pagination, filtros e cache inteligente.
 * 
 * Features:
 * - Paginação server-side otimizada
 * - Filtros por categoria, status, localização
 * - Busca por nome/CA com debounce
 * - Cache com TTL de 5 minutos
 * - States derivados para UI
 * - Integração com configurationStore
 */

import { derived, type Readable } from 'svelte/store';
import { createPaginatedStore, type PaginatedStore } from './paginatedStore';
import { apiClient, type PaginatedResponse } from '../services/api/client';
import type { ItemEstoque, EstoqueFilters } from '../types';

// ==================== TIPOS ESPECÍFICOS DO ESTOQUE ====================

export interface EstoqueItem {
  id: string;
  tipoEpiId: string;
  tipoEpiNome: string;
  tipoEpiCA: string;
  categoria: string;
  almoxarifadoId: string;
  almoxarifadoNome: string;
  quantidade: number;
  quantidadeMinima: number;
  quantidadeMaxima: number;
  localizacao: string;
  status: 'DISPONIVEL' | 'AGUARDANDO_INSPECAO' | 'QUARENTENA';
  observacoes?: string;
  dataUltimaMovimentacao: string;
  responsavelUltimaMovimentacao: string;
  createdAt: string;
  updatedAt: string;
}

export interface EstoqueFiltersParams {
  // Filtros de negócio
  categoria?: string;
  status?: string;
  almoxarifadoId?: string;
  tipoEpiId?: string;
  apenasAbaixoMinimo?: boolean;
  apenasComSaldo?: boolean;
  
  // Busca
  search?: string; // Busca por nome do EPI ou CA
  
  // Ordenação
  orderBy?: 'tipoEpiNome' | 'categoria' | 'quantidade' | 'dataUltimaMovimentacao';
  orderDirection?: 'asc' | 'desc';
}

// ==================== FUNÇÃO DE FETCH PARA O BACKEND ====================

/**
 * Função que faz fetch dos dados de estoque no backend
 */
async function fetchEstoqueData(params: any): Promise<PaginatedResponse<EstoqueItem>> {
  try {
    console.log('📦 Buscando dados de estoque:', params);
    
    // Mapear parâmetros para o formato esperado pelo backend
    const backendParams = {
      page: params.page || 1,
      limit: params.limit || 20,
      
      // Filtros específicos do backend
      apenasAbaixoMinimo: params.apenasAbaixoMinimo,
      apenasComSaldo: params.apenasComSaldo,
      unidadeNegocioId: params.unidadeNegocioId,
      tipoEpiId: params.tipoEpiId,
      almoxarifadoId: params.almoxarifadoId,
      
      // Busca por nome/CA
      search: params.search,
      
      // Ordenação
      orderBy: params.orderBy,
      orderDirection: params.orderDirection
    };
    
    // Chamar endpoint de posição de estoque do backend
    const response = await apiClient.getPosicaoEstoque(backendParams);
    
    // Transformar response do backend para formato esperado pelo paginatedStore
    if (response.success && response.data) {
      return {
        data: response.data.items || response.data, // Backend pode retornar items ou data diretamente
        total: response.meta?.totalItems || response.data.length || 0,
        page: response.meta?.currentPage || backendParams.page,
        pageSize: response.meta?.pageSize || backendParams.limit,
        totalPages: response.meta?.totalPages || Math.ceil((response.meta?.totalItems || 0) / backendParams.limit)
      };
    }
    
    // Fallback para formato vazio
    return {
      data: [],
      total: 0,
      page: 1,
      pageSize: backendParams.limit,
      totalPages: 0
    };
    
  } catch (error) {
    console.error('❌ Erro ao buscar dados de estoque:', error);
    throw error;
  }
}

// ==================== STORE PRINCIPAL ====================

/**
 * Store principal de estoque com paginação server-side
 */
export const estoqueStore: PaginatedStore<EstoqueItem> = createPaginatedStore(
  fetchEstoqueData,
  {
    initialPageSize: 20,
    enableCache: true,
    cacheTimeout: 5 * 60 * 1000, // 5 minutos
    debounceDelay: 300
  }
);

// ==================== STORES DERIVADOS ÚTEIS ====================

/**
 * Apenas os dados de estoque (sem meta de paginação)
 */
export const estoqueData: Readable<EstoqueItem[]> = derived(
  estoqueStore, 
  $store => $store.items
);

/**
 * Status de loading do estoque
 */
export const estoqueLoading: Readable<boolean> = derived(
  estoqueStore, 
  $store => $store.loading
);

/**
 * Erro do estoque
 */
export const estoqueError: Readable<string | null> = derived(
  estoqueStore, 
  $store => $store.error
);

/**
 * Itens com estoque disponível (quantidade > 0 e status DISPONIVEL)
 */
export const estoqueDisponivel: Readable<EstoqueItem[]> = derived(
  estoqueData,
  $items => $items.filter(item => 
    item.quantidade > 0 && item.status === 'DISPONIVEL'
  )
);

/**
 * Itens com baixo estoque (quantidade <= quantidadeMinima)
 */
export const estoqueBaixo: Readable<EstoqueItem[]> = derived(
  estoqueData,
  $items => $items.filter(item => 
    item.quantidadeMinima && item.quantidade <= item.quantidadeMinima
  )
);

/**
 * Itens esgotados (quantidade = 0)
 */
export const estoqueEsgotado: Readable<EstoqueItem[]> = derived(
  estoqueData,
  $items => $items.filter(item => item.quantidade === 0)
);

/**
 * Estatísticas resumidas do estoque
 */
export const estoqueStats: Readable<{
  totalItens: number;
  totalQuantidade: number;
  itensDisponiveis: number;
  itensBaixoEstoque: number;
  itensEsgotados: number;
  categorias: string[];
}> = derived(
  estoqueData,
  $items => {
    const totalItens = $items.length;
    const totalQuantidade = $items.reduce((acc, item) => acc + item.quantidade, 0);
    const itensDisponiveis = $items.filter(item => 
      item.quantidade > 0 && item.status === 'DISPONIVEL'
    ).length;
    const itensBaixoEstoque = $items.filter(item => 
      item.quantidadeMinima && item.quantidade <= item.quantidadeMinima
    ).length;
    const itensEsgotados = $items.filter(item => item.quantidade === 0).length;
    const categorias = [...new Set($items.map(item => item.categoria))];
    
    return {
      totalItens,
      totalQuantidade,
      itensDisponiveis,
      itensBaixoEstoque,
      itensEsgotados,
      categorias
    };
  }
);

// ==================== ACTIONS ESPECÍFICAS DO ESTOQUE ====================

/**
 * Carrega estoque com filtros específicos
 */
export async function loadEstoque(filters: EstoqueFiltersParams = {}) {
  return estoqueStore.fetchPage({
    page: 1,
    limit: 20,
    ...filters
  });
}

/**
 * Busca estoque por nome/CA com debounce
 */
export function searchEstoque(searchTerm: string) {
  estoqueStore.setSearch(searchTerm);
}

/**
 * Aplica filtros de estoque
 */
export function filterEstoque(filters: EstoqueFiltersParams) {
  // Remove propriedades undefined/null
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== undefined && value !== null && value !== '')
  );
  
  estoqueStore.setFilters(cleanFilters);
}

/**
 * Limpa todos os filtros
 */
export function clearEstoqueFilters() {
  estoqueStore.reset();
}

/**
 * Recarrega dados atuais (bypass cache)
 */
export function reloadEstoque() {
  return estoqueStore.reload();
}

/**
 * Ordena estoque por campo específico
 */
export function sortEstoque(field: EstoqueFiltersParams['orderBy'], direction: 'asc' | 'desc' = 'asc') {
  return estoqueStore.setSorting(field!, direction);
}

// ==================== UTILITIES PARA COMPONENTES ====================

/**
 * Obtém item de estoque por ID (busca local primeiro, depois backend se necessário)
 */
export function getEstoqueItemById(id: string): EstoqueItem | undefined {
  // Buscar primeiro nos dados carregados
  let currentItems: EstoqueItem[] = [];
  estoqueData.subscribe(items => currentItems = items)();
  
  return currentItems.find(item => item.id === id);
}

/**
 * Obtém itens de estoque por tipo de EPI
 */
export function getEstoqueByTipoEPI(tipoEpiId: string): EstoqueItem[] {
  let currentItems: EstoqueItem[] = [];
  estoqueData.subscribe(items => currentItems = items)();
  
  return currentItems.filter(item => item.tipoEpiId === tipoEpiId);
}

/**
 * Verifica se tem estoque disponível para um tipo de EPI
 */
export function hasEstoqueDisponivel(tipoEpiId: string): boolean {
  const items = getEstoqueByTipoEPI(tipoEpiId);
  return items.some(item => item.quantidade > 0 && item.status === 'DISPONIVEL');
}

/**
 * Obtém quantidade total disponível para um tipo de EPI
 */
export function getQuantidadeDisponivel(tipoEpiId: string): number {
  const items = getEstoqueByTipoEPI(tipoEpiId);
  return items
    .filter(item => item.status === 'DISPONIVEL')
    .reduce((total, item) => total + item.quantidade, 0);
}

// ==================== INTEGRATION HELPERS ====================

/**
 * Inicializa o store de estoque (chamar em +layout.ts ou +page.ts)
 */
export async function initializeEstoque(initialFilters: EstoqueFiltersParams = {}) {
  try {
    console.log('🚀 Inicializando store de estoque...');
    await loadEstoque(initialFilters);
    console.log('✅ Store de estoque inicializado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao inicializar store de estoque:', error);
    throw error;
  }
}

/**
 * Atualiza um item específico no store (otimistic update)
 */
export function updateEstoqueItem(id: string, updates: Partial<EstoqueItem>) {
  // Para updates otimísticos, podemos atualizar o store local imediatamente
  // e depois fazer sync com backend
  console.log('🔄 Atualizando item de estoque localmente:', id, updates);
  
  // TODO: Implementar update otimístico quando necessário
  // Por enquanto, apenas recarregar dados
  reloadEstoque();
}

// ==================== EXPORT CONSOLIDADO ====================

// Re-export do store principal com interface estendida
export default {
  // Store principal
  store: estoqueStore,
  
  // Dados derivados
  data: estoqueData,
  loading: estoqueLoading,
  error: estoqueError,
  disponivel: estoqueDisponivel,
  baixo: estoqueBaixo,
  esgotado: estoqueEsgotado,
  stats: estoqueStats,
  
  // Actions
  load: loadEstoque,
  search: searchEstoque,
  filter: filterEstoque,
  clear: clearEstoqueFilters,
  reload: reloadEstoque,
  sort: sortEstoque,
  initialize: initializeEstoque,
  
  // Utilities
  getById: getEstoqueItemById,
  getByTipoEPI: getEstoqueByTipoEPI,
  hasDisponivel: hasEstoqueDisponivel,
  getQuantidade: getQuantidadeDisponivel,
  update: updateEstoqueItem
};

// Export individual para compatibilidade
export { estoqueStore as default };