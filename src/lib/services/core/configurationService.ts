/**
 * Configuration Service para ENUMs Dinâmicos
 * 
 * Este serviço carrega configurações de negócio dinamicamente do backend,
 * incluindo tipos de movimentação, categorias de EPI, status de entrega, etc.
 * 
 * CRÍTICO: O backend possui ENUMs complexos que devem ser carregados dinamicamente
 * ao invés de hardcoded no frontend.
 */

import { api } from './apiClient';

export interface BusinessConfigurationItem {
  code: string;
  label: string;
  description?: string;
}

export interface BusinessConfiguration {
  tiposMovimentacao: BusinessConfigurationItem[];
  categoriasEPI: BusinessConfigurationItem[];
  statusEntrega: BusinessConfigurationItem[];
  statusFicha: BusinessConfigurationItem[];
  statusEstoque: BusinessConfigurationItem[];
  tiposNota: BusinessConfigurationItem[];
}

/**
 * Mock data temporário até integração com backend real
 * Este mock representa os dados que virão do endpoint /api/v1/configuration
 */
const MOCK_BUSINESS_CONFIG: BusinessConfiguration = {
  tiposMovimentacao: [
    { code: 'entrada_nota', label: 'Entrada por Nota', description: 'Entrada de itens via nota fiscal' },
    { code: 'saida_entrega', label: 'Saída por Entrega', description: 'Saída para entrega a colaborador' },
    { code: 'transferencia', label: 'Transferência', description: 'Transferência entre almoxarifados' },
    { code: 'ajuste_positivo', label: 'Ajuste Positivo', description: 'Ajuste para aumentar estoque' },
    { code: 'ajuste_negativo', label: 'Ajuste Negativo', description: 'Ajuste para diminuir estoque' },
    { code: 'devolucao', label: 'Devolução', description: 'Devolução de item por colaborador' },
    { code: 'descarte', label: 'Descarte', description: 'Descarte de item vencido ou danificado' },
    { code: 'estorno', label: 'Estorno', description: 'Estorno de movimentação anterior' }
  ],
  categoriasEPI: [
    { code: 'protecao_cabeca', label: 'Proteção da Cabeça', description: 'Capacetes, bonés, etc.' },
    { code: 'protecao_olhos', label: 'Proteção dos Olhos', description: 'Óculos, viseiras, etc.' },
    { code: 'protecao_auditiva', label: 'Proteção Auditiva', description: 'Protetores auriculares' },
    { code: 'protecao_respiratoria', label: 'Proteção Respiratória', description: 'Máscaras, respiradores' },
    { code: 'protecao_tronco', label: 'Proteção do Tronco', description: 'Aventais, coletes, jaquetas' },
    { code: 'protecao_maos', label: 'Proteção das Mãos', description: 'Luvas de diversos tipos' },
    { code: 'protecao_pes', label: 'Proteção dos Pés', description: 'Calçados de segurança' },
    { code: 'protecao_queda', label: 'Proteção contra Quedas', description: 'Cintos, talabartes, etc.' }
  ],
  statusEntrega: [
    { code: 'pendente_assinatura', label: 'Pendente de Assinatura', description: 'Aguardando assinatura do colaborador' },
    { code: 'assinada', label: 'Assinada', description: 'Entrega confirmada e assinada' },
    { code: 'devolvido', label: 'Devolvido', description: 'Item devolvido pelo colaborador' },
    { code: 'vencido', label: 'Vencido', description: 'Item vencido e deve ser substituído' },
    { code: 'cancelada', label: 'Cancelada', description: 'Entrega cancelada' }
  ],
  statusFicha: [
    { code: 'ativa', label: 'Ativa', description: 'Ficha ativa do colaborador' },
    { code: 'inativa', label: 'Inativa', description: 'Ficha inativada' },
    { code: 'pendente', label: 'Pendente', description: 'Ficha com pendências' },
    { code: 'completa', label: 'Completa', description: 'Ficha com todos os EPIs entregues' }
  ],
  statusEstoque: [
    { code: 'disponivel', label: 'Disponível', description: 'Item disponível em estoque' },
    { code: 'baixo', label: 'Estoque Baixo', description: 'Quantidade abaixo do mínimo' },
    { code: 'vencendo', label: 'Próximo ao Vencimento', description: 'Vence em até 30 dias' },
    { code: 'vencido', label: 'Vencido', description: 'Item com validade expirada' },
    { code: 'esgotado', label: 'Esgotado', description: 'Sem itens em estoque' },
    { code: 'bloqueado', label: 'Bloqueado', description: 'Item bloqueado para uso' }
  ],
  tiposNota: [
    { code: 'entrada', label: 'Entrada', description: 'Nota de entrada de mercadorias' },
    { code: 'transferencia', label: 'Transferência', description: 'Nota de transferência' },
    { code: 'devolucao', label: 'Devolução', description: 'Nota de devolução' },
    { code: 'descarte', label: 'Descarte', description: 'Nota de descarte' }
  ]
};

class ConfigurationService {
  private cache: BusinessConfiguration | null = null;
  private cacheExpiry: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  /**
   * Carrega as regras de negócio do backend ou cache
   * Por enquanto usa mock data, mas está preparado para API real
   */
  async loadBusinessRules(): Promise<BusinessConfiguration> {
    // Verificar cache primeiro
    if (this.cache && Date.now() < this.cacheExpiry) {
      return this.cache;
    }

    try {
      // TODO: Quando backend estiver pronto, descomentar a linha abaixo:
      // const config = await api.get<BusinessConfiguration>('/api/v1/configuration');
      
      // Por enquanto, simular delay da API e retornar mock data
      await new Promise(resolve => setTimeout(resolve, 100));
      const config = MOCK_BUSINESS_CONFIG;
      
      // Atualizar cache
      this.cache = config;
      this.cacheExpiry = Date.now() + this.CACHE_DURATION;
      
      return config;
    } catch (error) {
      console.error('Erro ao carregar configurações de negócio:', error);
      
      // Em caso de erro, usar dados do cache (se existir) ou mock data
      if (this.cache) {
        console.warn('Usando configurações do cache devido ao erro');
        return this.cache;
      }
      
      console.warn('Usando configurações mock devido ao erro');
      return MOCK_BUSINESS_CONFIG;
    }
  }

  /**
   * Busca uma configuração específica por categoria
   */
  async getConfigByCategory(category: keyof BusinessConfiguration): Promise<BusinessConfigurationItem[]> {
    const config = await this.loadBusinessRules();
    return config[category] || [];
  }

  /**
   * Busca um item específico por código em uma categoria
   */
  async getConfigItem(category: keyof BusinessConfiguration, code: string): Promise<BusinessConfigurationItem | null> {
    const items = await this.getConfigByCategory(category);
    return items.find(item => item.code === code) || null;
  }

  /**
   * Limpa o cache forçando uma nova requisição
   */
  clearCache(): void {
    this.cache = null;
    this.cacheExpiry = 0;
  }

  /**
   * Verifica se o cache está válido
   */
  isCacheValid(): boolean {
    return this.cache !== null && Date.now() < this.cacheExpiry;
  }
}

// Singleton instance
export const configurationService = new ConfigurationService();

// Helper functions para facilitar o uso nos componentes
export async function getTiposMovimentacao(): Promise<BusinessConfigurationItem[]> {
  return configurationService.getConfigByCategory('tiposMovimentacao');
}

export async function getCategoriasEPI(): Promise<BusinessConfigurationItem[]> {
  return configurationService.getConfigByCategory('categoriasEPI');
}

export async function getStatusEntrega(): Promise<BusinessConfigurationItem[]> {
  return configurationService.getConfigByCategory('statusEntrega');
}

export async function getStatusFicha(): Promise<BusinessConfigurationItem[]> {
  return configurationService.getConfigByCategory('statusFicha');
}

export async function getStatusEstoque(): Promise<BusinessConfigurationItem[]> {
  return configurationService.getConfigByCategory('statusEstoque');
}

export async function getTiposNota(): Promise<BusinessConfigurationItem[]> {
  return configurationService.getConfigByCategory('tiposNota');
}