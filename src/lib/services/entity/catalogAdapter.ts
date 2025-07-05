/**
 * Catalog Adapter - Service Adapter para Catálogo de EPIs
 * 
 * Responsável por:
 * - CRUD de tipos de EPI
 * - Filtros e busca
 * - Paginação server-side
 * - Cache otimizado
 */

import { apiClient, createUrlWithParams } from '../core/apiClient';
import type { PaginatedResponse, FilterParams } from '../../types/serviceTypes';

// ==================== TIPOS ====================

export interface TipoEPI {
  id: string;
  nomeEquipamento: string;
  numeroCA: string;
  categoria: string;
  fabricante: string;
  validadePadrao?: number; // em dias
  descricao?: string;
  observacoes?: string;
  ativo: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface CatalogFilterParams extends FilterParams {
  categoria?: string;
  fabricante?: string;
  ativo?: boolean;
}

export interface CreateTipoEPIData {
  nomeEquipamento: string;
  numeroCA: string;
  categoria: string;
  fabricante: string;
  validadePadrao?: number;
  descricao?: string;
  observacoes?: string;
}

export interface UpdateTipoEPIData extends Partial<CreateTipoEPIData> {
  ativo?: boolean;
}

// ==================== CACHE ====================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class CatalogCache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutos

  set<T>(key: string, data: T, ttl = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}

// ==================== CATALOG ADAPTER ====================

class CatalogAdapter {
  private cache = new CatalogCache();
  private baseUrl = '/api/v1/tipos-epi';

  // ==================== CONSULTAS ====================

  /**
   * Lista tipos de EPI com paginação e filtros
   */
  async getTiposEPI(params: CatalogFilterParams = {}): Promise<PaginatedResponse<TipoEPI>> {
    console.log('📋 CatalogAdapter: Carregando tipos de EPI', params);

    const cacheKey = `tipos-epi-${JSON.stringify(params)}`;
    const cached = this.cache.get<PaginatedResponse<TipoEPI>>(cacheKey);
    
    if (cached) {
      console.log('💾 Cache hit para tipos EPI');
      return cached;
    }

    try {
      // Por enquanto, mock data - substituir por API real
      const mockResponse = this.getMockTiposEPI(params);
      
      this.cache.set(cacheKey, mockResponse);
      console.log('✅ Tipos EPI carregados com sucesso');
      
      return mockResponse;
    } catch (error) {
      console.error('❌ Erro ao carregar tipos EPI:', error);
      throw new Error('Não foi possível carregar o catálogo de EPIs');
    }
  }

  /**
   * Busca um tipo de EPI específico
   */
  async getTipoEPIById(id: string): Promise<TipoEPI> {
    console.log('🔍 CatalogAdapter: Buscando tipo EPI', id);

    const cacheKey = `tipo-epi-${id}`;
    const cached = this.cache.get<TipoEPI>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      // Mock data - substituir por API real
      const mockData = this.getMockTiposEPI();
      const tipoEPI = mockData.items.find(item => item.id === id);
      
      if (!tipoEPI) {
        throw new Error('Tipo de EPI não encontrado');
      }

      this.cache.set(cacheKey, tipoEPI);
      return tipoEPI;
    } catch (error) {
      console.error('❌ Erro ao buscar tipo EPI:', error);
      throw error;
    }
  }

  // ==================== COMANDOS ====================

  /**
   * Cria um novo tipo de EPI
   */
  async createTipoEPI(data: CreateTipoEPIData): Promise<TipoEPI> {
    console.log('➕ CatalogAdapter: Criando tipo EPI', data);

    try {
      // Mock implementation - substituir por API real
      const newTipoEPI: TipoEPI = {
        id: `epi-${Date.now()}`,
        ...data,
        ativo: true,
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString()
      };

      // Limpar cache relacionado
      this.cache.clear();
      
      console.log('✅ Tipo EPI criado com sucesso:', newTipoEPI.id);
      return newTipoEPI;
    } catch (error) {
      console.error('❌ Erro ao criar tipo EPI:', error);
      throw new Error('Não foi possível criar o tipo de EPI');
    }
  }

  /**
   * Atualiza um tipo de EPI
   */
  async updateTipoEPI(id: string, data: UpdateTipoEPIData): Promise<TipoEPI> {
    console.log('📝 CatalogAdapter: Atualizando tipo EPI', id, data);

    try {
      // Mock implementation - substituir por API real
      const existing = await this.getTipoEPIById(id);
      
      const updatedTipoEPI: TipoEPI = {
        ...existing,
        ...data,
        dataAtualizacao: new Date().toISOString()
      };

      // Limpar cache relacionado
      this.cache.delete(`tipo-epi-${id}`);
      this.cache.clear(); // Limpar lista também
      
      console.log('✅ Tipo EPI atualizado com sucesso');
      return updatedTipoEPI;
    } catch (error) {
      console.error('❌ Erro ao atualizar tipo EPI:', error);
      throw new Error('Não foi possível atualizar o tipo de EPI');
    }
  }

  /**
   * Remove um tipo de EPI (soft delete)
   */
  async deleteTipoEPI(id: string): Promise<void> {
    console.log('🗑️ CatalogAdapter: Removendo tipo EPI', id);

    try {
      // Mock implementation - substituir por API real
      await this.updateTipoEPI(id, { ativo: false });
      
      console.log('✅ Tipo EPI removido com sucesso');
    } catch (error) {
      console.error('❌ Erro ao remover tipo EPI:', error);
      throw new Error('Não foi possível remover o tipo de EPI');
    }
  }

  // ==================== UTILITIES ====================

  /**
   * Limpa todo o cache
   */
  clearCache(): void {
    this.cache.clear();
    console.log('🗑️ Cache do catálogo limpo');
  }

  /**
   * Obtém opções únicas para filtros
   */
  async getFilterOptions(): Promise<{
    categorias: Array<{ value: string; label: string }>;
    fabricantes: Array<{ value: string; label: string }>;
  }> {
    const data = await this.getTiposEPI({ pageSize: 1000 }); // Buscar todos para extrair opções
    
    const categorias = [...new Set(data.items.map(item => item.categoria))]
      .filter(Boolean)
      .sort()
      .map(cat => ({ value: cat, label: cat }));
    
    const fabricantes = [...new Set(data.items.map(item => item.fabricante))]
      .filter(Boolean)
      .sort()
      .map(fab => ({ value: fab, label: fab }));

    return { categorias, fabricantes };
  }

  // ==================== MOCK DATA ====================

  private getMockTiposEPI(params: CatalogFilterParams = {}): PaginatedResponse<TipoEPI> {
    const mockData: TipoEPI[] = [
      {
        id: '1',
        nomeEquipamento: 'Capacete de Segurança',
        numeroCA: '31469',
        categoria: 'Proteção da Cabeça',
        fabricante: 'SafetyTech',
        validadePadrao: 730, // 2 anos
        descricao: 'Capacete de segurança classe A para proteção contra impactos',
        ativo: true,
        dataCriacao: '2024-01-15T10:00:00Z',
        dataAtualizacao: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        nomeEquipamento: 'Óculos de Proteção',
        numeroCA: '19420',
        categoria: 'Proteção dos Olhos',
        fabricante: 'VisionSafe',
        validadePadrao: 365, // 1 ano
        descricao: 'Óculos de proteção contra impactos e respingos',
        ativo: true,
        dataCriacao: '2024-01-10T14:30:00Z',
        dataAtualizacao: '2024-01-10T14:30:00Z'
      },
      {
        id: '3',
        nomeEquipamento: 'Luvas de Proteção',
        numeroCA: '15276',
        categoria: 'Proteção das Mãos',
        fabricante: 'HandSafe',
        validadePadrao: 180, // 6 meses
        descricao: 'Luvas de proteção contra produtos químicos',
        ativo: true,
        dataCriacao: '2024-01-08T09:15:00Z',
        dataAtualizacao: '2024-01-08T09:15:00Z'
      },
      {
        id: '4',
        nomeEquipamento: 'Protetor Auricular',
        numeroCA: '5674',
        categoria: 'Proteção Auditiva',
        fabricante: 'AudioProtect',
        validadePadrao: 365,
        descricao: 'Protetor auricular tipo plug de silicone',
        ativo: true,
        dataCriacao: '2024-01-05T16:45:00Z',
        dataAtualizacao: '2024-01-05T16:45:00Z'
      },
      {
        id: '5',
        nomeEquipamento: 'Cinto de Segurança',
        numeroCA: '18392',
        categoria: 'Proteção contra Quedas',
        fabricante: 'HeightSafe',
        validadePadrao: 1095, // 3 anos
        descricao: 'Cinto de segurança para trabalho em altura',
        ativo: true,
        dataCriacao: '2024-01-03T11:20:00Z',
        dataAtualizacao: '2024-01-03T11:20:00Z'
      },
      {
        id: '6',
        nomeEquipamento: 'Botina de Segurança',
        numeroCA: '12845',
        categoria: 'Proteção dos Pés',
        fabricante: 'FootGuard',
        validadePadrao: 545, // 1.5 anos
        descricao: 'Botina de segurança com bico de aço',
        ativo: true,
        dataCriacao: '2024-01-01T08:00:00Z',
        dataAtualizacao: '2024-01-01T08:00:00Z'
      }
    ];

    // Aplicar filtros
    let filteredData = mockData;

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredData = filteredData.filter(item =>
        item.nomeEquipamento.toLowerCase().includes(searchLower) ||
        item.numeroCA.includes(params.search!) ||
        item.categoria.toLowerCase().includes(searchLower) ||
        item.fabricante.toLowerCase().includes(searchLower)
      );
    }

    if (params.categoria) {
      filteredData = filteredData.filter(item => item.categoria === params.categoria);
    }

    if (params.fabricante) {
      filteredData = filteredData.filter(item => item.fabricante === params.fabricante);
    }

    if (params.ativo !== undefined) {
      filteredData = filteredData.filter(item => item.ativo === params.ativo);
    }

    // Paginação
    const pageSize = params.pageSize || 10;
    const page = params.page || 1;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredData.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      total: filteredData.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredData.length / pageSize),
      hasNext: endIndex < filteredData.length,
      hasPrev: page > 1
    };
  }
}

// ==================== EXPORT ====================

export const catalogAdapter = new CatalogAdapter();