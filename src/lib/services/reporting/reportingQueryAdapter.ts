/**
 * Reporting Query Adapter
 * 
 * Adapter especializado para consultas de relatórios e dashboards.
 * Implementa queries otimizadas para análises e visualizações de dados.
 */

import { api, createUrlWithParams } from '../core/apiClient';
import type { 
  RelatorioDescartesDTO,
  RelatorioEstoqueDTO,
  ReportParams,
  ItemEstoqueDTO,
  MovimentacaoEstoqueDTO,
  EntregaDTO,
  TipoEPIDTO
} from '$lib/types/serviceTypes';

// Types específicos para relatórios
export interface DashboardStats {
  totalItensEstoque: number;
  totalTiposEPI: number;
  valorTotalEstoque: number;
  itensBaixoEstoque: number;
  itensVencendo: number;
  itensVencidos: number;
  entregasPendentes: number;
  devolucoesPendentes: number;
  movimentacoesHoje: number;
  colaboradoresAtivos: number;
}

export interface MovimentacaoTrend {
  periodo: string;
  entradas: number;
  saidas: number;
  saldo: number;
  valor: number;
}

export interface CategoriasAnalysis {
  categoria: string;
  quantidade: number;
  valor: number;
  percentualQuantidade: number;
  percentualValor: number;
  tendencia: 'subindo' | 'descendo' | 'estavel';
}

export interface FornecedorAnalysis {
  fornecedor: string;
  totalItens: number;
  valorTotal: number;
  qualidadeMedia: number;
  tempoEntregaMedio: number;
  ultimaCompra: string;
}

export interface ColaboradorUsage {
  colaborador: {
    id: string;
    nome: string;
    cargo: string;
    contratada: string;
  };
  totalItens: number;
  itensAtivos: number;
  itensDevolvidos: number;
  valorTotal: number;
  ultimaEntrega: string;
}

class ReportingQueryAdapter {
  
  // ==================== DASHBOARD PRINCIPAL ====================
  
  /**
   * Busca estatísticas principais do dashboard
   */
  async getDashboardStats(): Promise<DashboardStats> {
    return api.get<DashboardStats>('/dashboard/stats');
  }
  
  /**
   * Busca dados para gráficos do dashboard
   */
  async getDashboardCharts(periodo: 'dia' | 'semana' | 'mes' | 'ano' = 'mes'): Promise<{
    movimentacoesTrend: MovimentacaoTrend[];
    categoriaDistribution: CategoriasAnalysis[];
    statusDistribution: Array<{ status: string; quantidade: number; percentual: number }>;
    valorTrend: Array<{ periodo: string; valor: number }>;
  }> {
    const url = createUrlWithParams('/dashboard/charts', { periodo });
    return api.get(url);
  }
  
  // ==================== RELATÓRIOS DE ESTOQUE ====================
  
  /**
   * Gera relatório completo de estoque
   */
  async gerarRelatorioEstoque(params: ReportParams = {}): Promise<RelatorioEstoqueDTO> {
    const url = createUrlWithParams('/relatorios/estoque', {
      categoria: params.categoria,
      almoxarifadoId: params.almoxarifadoId,
      includeDetalhes: params.includeDetalhes
    });
    
    return api.get<RelatorioEstoqueDTO>(url);
  }
  
  /**
   * Relatório de itens com baixo estoque
   */
  async getRelatorioBaixoEstoque(): Promise<{
    totalItens: number;
    valorTotal: number;
    itens: Array<ItemEstoqueDTO & {
      quantidadeMinima: number;
      diasParaReposicao: number;
      ultimaCompra?: string;
    }>;
  }> {
    return api.get('/relatorios/baixo-estoque');
  }
  
  /**
   * Relatório de validade de itens
   */
  async getRelatorioValidade(params: {
    tipo?: 'vencidos' | 'vencendo' | 'todos';
    diasAntecedencia?: number;
  } = {}): Promise<{
    itensVencidos: ItemEstoqueDTO[];
    itensVencendo: ItemEstoqueDTO[];
    valorPerdido: number;
    categoriasMaisAfetadas: Array<{ categoria: string; quantidade: number; valor: number }>;
  }> {
    const url = createUrlWithParams('/relatorios/validade', params);
    return api.get(url);
  }
  
  // ==================== RELATÓRIOS DE MOVIMENTAÇÃO ====================
  
  /**
   * Relatório de movimentações por período
   */
  async getRelatorioMovimentacoes(params: ReportParams & {
    tipoMovimentacao?: string;
    usuarioId?: string;
  } = {}): Promise<{
    totalMovimentacoes: number;
    entradas: number;
    saidas: number;
    ajustes: number;
    transferencias: number;
    movimentacoes: MovimentacaoEstoqueDTO[];
    resumoPorTipo: Array<{ tipo: string; quantidade: number; valor: number }>;
    resumoPorPeriodo: MovimentacaoTrend[];
  }> {
    const url = createUrlWithParams('/relatorios/movimentacoes', params);
    return api.get(url);
  }
  
  /**
   * Relatório de perdas e descartes
   */
  async getRelatorioDescartes(params: ReportParams = {}): Promise<RelatorioDescartesDTO> {
    const url = createUrlWithParams('/relatorios/descartes', params);
    return api.get<RelatorioDescartesDTO>(url);
  }
  
  /**
   * Análise de giro de estoque
   */
  async getAnaliseGiroEstoque(params: ReportParams = {}): Promise<{
    giroMedio: number;
    itensGiroAlto: Array<TipoEPIDTO & { giro: number; valorMovimentado: number }>;
    itensGiroBaixo: Array<TipoEPIDTO & { giro: number; diasParado: number }>;
    recomendacoes: Array<{
      tipoEPIId: string;
      recomendacao: string;
      impacto: 'alto' | 'medio' | 'baixo';
    }>;
  }> {
    const url = createUrlWithParams('/relatorios/giro-estoque', params);
    return api.get(url);
  }
  
  // ==================== RELATÓRIOS DE ENTREGAS ====================
  
  /**
   * Relatório de entregas e devoluções
   */
  async getRelatorioEntregas(params: ReportParams & {
    colaboradorId?: string;
    status?: string;
  } = {}): Promise<{
    totalEntregas: number;
    entregasAssinadas: number;
    entregasPendentes: number;
    devolucoes: number;
    tempoMedioAssinatura: number;
    tempoMedioDevolucao: number;
    entregas: EntregaDTO[];
    motivosDevolucao: Array<{ motivo: string; quantidade: number }>;
  }> {
    const url = createUrlWithParams('/relatorios/entregas', params);
    return api.get(url);
  }
  
  /**
   * Análise de uso por colaborador
   */
  async getAnaliseUsoColaboradores(params: ReportParams & {
    contratadaId?: string;
    cargo?: string;
  } = {}): Promise<{
    colaboradores: ColaboradorUsage[];
    resumoPorCargo: Array<{ cargo: string; mediaItens: number; valorMedio: number }>;
    resumoPorContratada: Array<{ contratada: string; totalColaboradores: number; totalItens: number; valorTotal: number }>;
  }> {
    const url = createUrlWithParams('/relatorios/uso-colaboradores', params);
    return api.get(url);
  }
  
  // ==================== ANÁLISES FINANCEIRAS ====================
  
  /**
   * Relatório de custos e investimentos
   */
  async getRelatorioCustos(params: ReportParams = {}): Promise<{
    investimentoTotal: number;
    custoMedio: number;
    categoriasMaisCustosas: Array<{ categoria: string; valor: number; percentual: number }>;
    evolucaoInvestimento: Array<{ periodo: string; valor: number }>;
    fornecedores: FornecedorAnalysis[];
    roi: {
      economia: number;
      prevencaoAcidentes: number;
      conformidadeLegal: number;
    };
  }> {
    const url = createUrlWithParams('/relatorios/custos', params);
    return api.get(url);
  }
  
  /**
   * Análise de fornecedores
   */
  async getAnaliseFornecedores(params: ReportParams = {}): Promise<{
    fornecedores: FornecedorAnalysis[];
    melhorCustoBeneficio: FornecedorAnalysis;
    maiorVolume: FornecedorAnalysis;
    melhorQualidade: FornecedorAnalysis;
    recomendacoes: Array<{
      fornecedor: string;
      recomendacao: string;
      prioridade: 'alta' | 'media' | 'baixa';
    }>;
  }> {
    const url = createUrlWithParams('/relatorios/fornecedores', params);
    return api.get(url);
  }
  
  // ==================== RELATÓRIOS DE CONFORMIDADE ====================
  
  /**
   * Relatório de conformidade legal
   */
  async getRelatorioConformidade(params: ReportParams = {}): Promise<{
    colaboradoresCompletos: number;
    colaboradoresPendentes: number;
    itensVencidos: number;
    itensForaEspecificacao: number;
    alertas: Array<{
      tipo: 'vencimento' | 'especificacao' | 'entrega_pendente';
      descricao: string;
      prioridade: 'alta' | 'media' | 'baixa';
      colaboradorId?: string;
      tipoEPIId?: string;
    }>;
    scoreConformidade: number;
  }> {
    const url = createUrlWithParams('/relatorios/conformidade', params);
    return api.get(url);
  }
  
  /**
   * Auditoria de movimentações
   */
  async getRelatorioAuditoria(params: ReportParams & {
    usuarioId?: string;
    tipoAuditoria?: 'movimentacoes' | 'entregas' | 'ajustes';
  } = {}): Promise<{
    totalOperacoes: number;
    operacoesSuspeitas: number;
    usuarios: Array<{
      usuarioId: string;
      nome: string;
      totalOperacoes: number;
      operacoesSuspeitas: number;
      ultimaOperacao: string;
    }>;
    inconsistencias: Array<{
      tipo: string;
      descricao: string;
      dataDeteccao: string;
      status: 'pendente' | 'resolvido';
    }>;
  }> {
    const url = createUrlWithParams('/relatorios/auditoria', params);
    return api.get(url);
  }
  
  // ==================== EXPORTAÇÃO DE RELATÓRIOS ====================
  
  /**
   * Exporta relatório em formato específico
   */
  async exportarRelatorio(
    tipoRelatorio: string,
    formato: 'pdf' | 'excel' | 'csv',
    params: ReportParams = {}
  ): Promise<{
    downloadUrl: string;
    fileName: string;
    expiresAt: string;
  }> {
    const url = createUrlWithParams(`/relatorios/${tipoRelatorio}/export`, {
      formato,
      ...params
    });
    
    return api.post(url);
  }
  
  /**
   * Agenda relatório recorrente
   */
  async agendarRelatorio(config: {
    tipoRelatorio: string;
    frequencia: 'diario' | 'semanal' | 'mensal';
    formato: 'pdf' | 'excel';
    destinatarios: string[];
    parametros?: ReportParams;
  }): Promise<{
    agendamentoId: string;
    proximaExecucao: string;
  }> {
    return api.post('/relatorios/agendar', config);
  }
  
  // ==================== CONSULTAS PERSONALIZADAS ====================
  
  /**
   * Executa consulta personalizada
   */
  async executarConsultaPersonalizada(query: {
    select: string[];
    from: string;
    where?: Record<string, any>;
    groupBy?: string[];
    orderBy?: Array<{ field: string; direction: 'asc' | 'desc' }>;
    limit?: number;
  }): Promise<{
    columns: string[];
    rows: any[][];
    total: number;
  }> {
    return api.post('/relatorios/consulta-personalizada', query);
  }
  
  /**
   * Salva consulta personalizada
   */
  async salvarConsultaPersonalizada(config: {
    nome: string;
    descricao?: string;
    query: any;
    publico?: boolean;
  }): Promise<{
    consultaId: string;
    shareUrl?: string;
  }> {
    return api.post('/relatorios/salvar-consulta', config);
  }
  
  /**
   * Lista consultas salvas
   */
  async getConsultasSalvas(): Promise<Array<{
    id: string;
    nome: string;
    descricao?: string;
    criadoPor: string;
    criadoEm: string;
    publico: boolean;
  }>> {
    return api.get('/relatorios/consultas-salvas');
  }
  
  // ==================== CACHE E PERFORMANCE ====================
  
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutos (relatórios podem ser mais cachados)
  
  /**
   * Busca dados com cache para relatórios pesados
   */
  async getWithCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      console.log(`📄 Cache hit para relatório: ${key}`);
      return cached.data;
    }
    
    console.log(`🔄 Carregando relatório: ${key}`);
    const data = await fetcher();
    
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
  
  /**
   * Dashboard stats com cache
   */
  async getDashboardStatsCached(): Promise<DashboardStats> {
    return this.getWithCache('dashboard-stats', () => this.getDashboardStats());
  }
  
  /**
   * Limpa cache de relatórios
   */
  clearCache(): void {
    this.cache.clear();
  }
  
  /**
   * Limpa cache específico
   */
  clearSpecificCache(key: string): void {
    this.cache.delete(key);
  }
}

// Singleton instance
export const reportingQueryAdapter = new ReportingQueryAdapter();
export default reportingQueryAdapter;