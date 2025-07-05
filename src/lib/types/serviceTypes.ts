/**
 * Tipos específicos para Service Adapters
 * 
 * DTOs e interfaces que espelham exatamente o backend PostgreSQL
 * para garantir compatibilidade total na integração futura.
 */

import type { PaginatedResponse, PaginationParams } from '$lib/stores/paginatedStore';

// ==================== ENTITY DTOs ====================

export interface ContratadaDTO {
  id: string;
  nome: string;
  cnpj: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  responsavel?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ColaboradorDTO {
  id: string;
  nome: string;
  cpf: string;
  email?: string;
  telefone?: string;
  cargo: string;
  dataAdmissao: string;
  dataDesligamento?: string;
  contratadaId: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  // Dados expandidos
  contratada?: ContratadaDTO;
}

export interface TipoEPIDTO {
  id: string;
  numeroCA: string;
  nomeEquipamento: string;
  descricao?: string;
  fabricante: string;
  categoria: string;
  vidaUtilDias: number;
  valorMedio?: number;
  observacoes?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AlmoxarifadoDTO {
  id: string;
  nome: string;
  codigo: string;
  descricao?: string;
  endereco?: string;
  responsavel?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsuarioDTO {
  id: string;
  nome: string;
  email: string;
  perfil: 'admin' | 'gerente' | 'usuario';
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== INVENTORY DTOs ====================

export interface ItemEstoqueDTO {
  id: string;
  tipoEPIId: string;
  almoxarifadoId: string;
  quantidade: number;
  localizacao?: string;
  dataValidade?: string;
  status: 'disponivel' | 'baixo' | 'vencendo' | 'vencido' | 'esgotado';
  dataUltimaMovimentacao: string;
  createdAt: string;
  updatedAt: string;
  // Dados expandidos (populados pelo backend quando solicitado)
  tipoEPI?: TipoEPIDTO;
  almoxarifado?: AlmoxarifadoDTO;
}

export interface MovimentacaoEstoqueDTO {
  id: string;
  tipoEPIId: string;
  almoxarifadoId: string;
  tipoMovimentacao: string; // Vem da configuração dinâmica
  quantidade: number;
  motivo: string;
  observacoes?: string;
  documentoReferencia?: string;
  dataMovimentacao: string;
  usuarioId: string;
  createdAt: string;
  // Dados expandidos
  tipoEPI?: TipoEPIDTO;
  almoxarifado?: AlmoxarifadoDTO;
  usuario?: UsuarioDTO;
}

export interface NotaMovimentacaoDTO {
  id: string;
  numero: string;
  tipo: string; // Tipo de nota - vem da configuração
  almoxarifadoId: string;
  descricao?: string;
  dataMovimentacao: string;
  usuarioId: string;
  processada: boolean;
  createdAt: string;
  updatedAt: string;
  // Dados expandidos
  itens?: NotaMovimentacaoItemDTO[];
  almoxarifado?: AlmoxarifadoDTO;
  usuario?: UsuarioDTO;
}

export interface NotaMovimentacaoItemDTO {
  id: string;
  notaMovimentacaoId: string;
  tipoEPIId: string;
  quantidade: number;
  valorUnitario?: number;
  observacoes?: string;
  // Dados expandidos
  tipoEPI?: TipoEPIDTO;
}

// ==================== PROCESS DTOs ====================

export interface FichaEPIDTO {
  id: string;
  colaboradorId: string;
  dataEmissao: string;
  dataValidade?: string;
  status: string; // Vem da configuração dinâmica
  observacoes?: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  // Dados expandidos
  colaborador?: ColaboradorDTO;
  entregas?: EntregaDTO[];
}

export interface EntregaDTO {
  id: string;
  fichaEPIId: string;
  dataEntrega: string;
  status: string; // Vem da configuração dinâmica
  assinatura?: string;
  dataAssinatura?: string;
  observacoes?: string;
  usuarioId: string;
  createdAt: string;
  updatedAt: string;
  // Dados expandidos
  fichaEPI?: FichaEPIDTO;
  itens?: EntregaItemDTO[];
  usuario?: UsuarioDTO;
}

export interface EntregaItemDTO {
  id: string;
  entregaId: string;
  tipoEPIId: string;
  itemEstoqueId: string;
  quantidade: number;
  dataValidade?: string;
  // Dados expandidos
  tipoEPI?: TipoEPIDTO;
  itemEstoque?: ItemEstoqueDTO;
}

// ==================== REPORTING DTOs ====================

export interface RelatorioDescartesDTO {
  totalItens: number;
  totalValor: number;
  periodo: {
    inicio: string;
    fim: string;
  };
  categorias: Array<{
    categoria: string;
    quantidade: number;
    valor: number;
    percentual: number;
  }>;
  itens: Array<{
    tipoEPI: TipoEPIDTO;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    dataDescarte: string;
    motivo: string;
  }>;
}

export interface RelatorioEstoqueDTO {
  totalItens: number;
  totalTipos: number;
  valorTotal: number;
  status: {
    disponivel: number;
    baixo: number;
    vencendo: number;
    vencido: number;
    esgotado: number;
  };
  categorias: Array<{
    categoria: string;
    quantidade: number;
    tipos: number;
    valor: number;
  }>;
  itens: ItemEstoqueDTO[];
}

// ==================== FORM DTOs ====================

export interface NovaMovimentacaoForm {
  tipoEPIId: string;
  almoxarifadoId: string;
  tipoMovimentacao: string; // CRÍTICO: Não hardcoded - vem do configurationService
  quantidade: number;
  motivo: string;
  observacoes?: string;
  documentoReferencia?: string;
  itemEstoqueId?: string; // Para identificar qual item está sendo ajustado
}

export interface EstornoMovimentacaoForm {
  movimentacaoOriginalId: string;
  motivo: string;
}

export interface AjusteEstoqueForm {
  itemEstoqueId: string;
  novaQuantidade: number;
  quantidadeAnterior: number;
  motivo: string;
}

export interface TransferenciaEstoqueForm {
  itemId: string;
  almoxarifadoDestinoId: string;
  quantidade: number;
  motivo: string;
}

export interface NovaEntregaForm {
  fichaEPIId: string;
  itens: Array<{
    tipoEPIId: string;
    itemEstoqueId: string;
    quantidade: number;
  }>;
  observacoes?: string;
}

export interface AssinaturaEntregaForm {
  entregaId: string;
  assinatura: string;
}

export interface DevolucaoForm {
  entregaId: string;
  motivo: string;
  observacoes?: string;
}

// ==================== SPECIALIZED PARAMS ====================

/**
 * Parâmetros específicos para inventário
 */
export interface InventoryParams extends PaginationParams {
  tipoEPIId?: string;
  almoxarifadoId?: string;
  status?: string;
  categoria?: string;
  vencimento?: 'vencido' | 'vencendo' | 'valido';
  includeExpanded?: boolean; // Para incluir dados de tipoEPI e almoxarifado
}

/**
 * Parâmetros específicos para movimentações
 */
export interface MovementParams extends PaginationParams {
  itemEstoqueId?: string;
  tipoMovimentacao?: string;
  dataInicio?: string;
  dataFim?: string;
  usuarioId?: string;
  includeExpanded?: boolean;
}

/**
 * Parâmetros específicos para relatórios
 */
export interface ReportParams {
  dataInicio?: string;
  dataFim?: string;
  categoria?: string;
  almoxarifadoId?: string;
  tipoEPIId?: string;
  includeDetalhes?: boolean;
}

/**
 * Parâmetros específicos para entidades hierárquicas
 */
export interface EntityParams extends PaginationParams {
  contratadaId?: string;
  ativo?: boolean;
  includeRelations?: boolean;
}

// ==================== RESPONSE WRAPPERS ====================

// Para responses paginadas específicas
export type PaginatedItemEstoque = PaginatedResponse<ItemEstoqueDTO>;
export type PaginatedMovimentacao = PaginatedResponse<MovimentacaoEstoqueDTO>;
export type PaginatedColaboradores = PaginatedResponse<ColaboradorDTO>;
export type PaginatedTiposEPI = PaginatedResponse<TipoEPIDTO>;
export type PaginatedFichasEPI = PaginatedResponse<FichaEPIDTO>;
export type PaginatedEntregas = PaginatedResponse<EntregaDTO>;

// ==================== ERROR TYPES ====================

export interface ServiceError {
  code: string;
  message: string;
  details?: any;
  field?: string;
}

export interface ValidationError extends ServiceError {
  field: string;
  value?: any;
}

// ==================== UTILITY TYPES ====================

/**
 * Tipo para criar forms a partir de DTOs
 */
export type CreateForm<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Tipo para atualizar forms a partir de DTOs
 */
export type UpdateForm<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;

/**
 * Tipo para requests com dados expandidos
 */
export type WithExpanded<T, K extends keyof T> = T & {
  [P in K]: NonNullable<T[P]>;
};