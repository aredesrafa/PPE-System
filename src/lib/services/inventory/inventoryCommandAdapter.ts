/**
 * Inventory Command Adapter
 * 
 * Adapter especializado para comandos (commands) de inventário.
 * Segue o padrão CQRS separando commands das queries.
 * 
 * IMPORTANTE: O backend implementa Event Sourcing - não CRUD simples!
 */

import { api, createUrlWithParams } from '../core/apiClient';
import type { 
  MovimentacaoEstoqueDTO,
  NotaMovimentacaoDTO,
  NovaMovimentacaoForm,
  EstornoMovimentacaoForm,
  AjusteEstoqueForm,
  TransferenciaEstoqueForm
} from '$lib/types/serviceTypes';

class InventoryCommandAdapter {
  
  // ==================== COMMANDS - Registrar movimentações (Event Sourcing) ====================
  
  /**
   * Registra movimentação genérica - Método base para Event Sourcing
   */
  async registerMovement(movementData: NovaMovimentacaoForm): Promise<MovimentacaoEstoqueDTO> {
    console.log('📝 Registrando movimentação:', movementData);
    
    try {
      // Usar backend real
      const response = await api.post<MovimentacaoEstoqueDTO>('/estoque/movimentacoes', movementData);
      console.log('✅ Movimentação registrada com sucesso:', response);
      return response;
    } catch (error) {
      console.error('❌ Erro ao registrar movimentação:', error);
      throw error;
    }
  }

  /**
   * Registra entrada de estoque
   */
  async registerEntry(data: {
    tipoEpiId: string;
    almoxarifadoId: string;
    quantidade: number;
    observacoes?: string;
    responsavelId: string;
  }): Promise<MovimentacaoEstoqueDTO> {
    const entryData: NovaMovimentacaoForm = {
      ...data,
      tipoMovimentacao: 'ENTRADA_COMPRA'
    };
    
    return this.registerMovement(entryData);
  }

  /**
   * Registra saída de estoque
   */
  async registerExit(data: {
    tipoEpiId: string;
    almoxarifadoId: string;
    quantidade: number;
    observacoes?: string;
    responsavelId: string;
  }): Promise<MovimentacaoEstoqueDTO> {
    const exitData: NovaMovimentacaoForm = {
      ...data,
      tipoMovimentacao: 'SAIDA_ENTREGA'
    };
    
    return this.registerMovement(exitData);
  }

  /**
   * Registra ajuste de estoque
   */
  async registerAdjustment(data: AjusteEstoqueForm): Promise<MovimentacaoEstoqueDTO> {
    const adjustmentData: NovaMovimentacaoForm = {
      tipoEpiId: data.tipoEpiId,
      almoxarifadoId: data.almoxarifadoId,
      quantidade: data.quantidade,
      observacoes: data.motivo,
      responsavelId: data.responsavelId,
      tipoMovimentacao: 'AJUSTE_INVENTARIO'
    };
    
    return this.registerMovement(adjustmentData);
  }

  /**
   * Registra transferência entre almoxarifados
   */
  async registerTransfer(data: TransferenciaEstoqueForm): Promise<MovimentacaoEstoqueDTO> {
    try {
      // Transferência é uma operação composta (saída + entrada)
      const response = await api.post<MovimentacaoEstoqueDTO>('/estoque/transferencias', data);
      console.log('✅ Transferência registrada com sucesso:', response);
      return response;
    } catch (error) {
      console.error('❌ Erro ao registrar transferência:', error);
      throw error;
    }
  }

  /**
   * Cria estorno de movimentação
   */
  async criarEstorno(data: EstornoMovimentacaoForm): Promise<MovimentacaoEstoqueDTO> {
    try {
      const response = await api.post<MovimentacaoEstoqueDTO>('/estoque/estornos', data);
      console.log('✅ Estorno registrado com sucesso:', response);
      return response;
    } catch (error) {
      console.error('❌ Erro ao criar estorno:', error);
      throw error;
    }
  }

  /**
   * Limpa cache interno (se houver implementação de cache no futuro)
   */
  clearCache(): void {
    // Implementar quando houver cache
    console.log('🗑️ Cache do InventoryCommandAdapter limpo');
  }
}

export const inventoryCommandAdapter = new InventoryCommandAdapter();