/**
 * Ficha Process Adapter
 * 
 * Adapter especializado para workflows de fichas EPI. Gerencia o ciclo de vida
 * completo das fichas: criação, entregas, assinaturas, devoluções e histórico.
 * 
 * IMPORTANTE: Implementa Process Lifecycle Pattern para workflows complexos.
 */

import { api, createUrlWithParams } from '../core/apiClient';
// Importações removidas - usar dados mockados locais para evitar dependências
import type { 
  FichaEPIDTO,
  ColaboradorDTO,
  EntregaDTO,
  EntregaItemDTO,
  TipoEPIDTO,
  NovaEntregaForm,
  AssinaturaEntregaForm,
  DevolucaoForm,
  EntityParams
} from '$lib/types/serviceTypes';

// ==================== TIPOS ESPECÍFICOS ====================

export interface FichaDetailData {
  ficha: FichaEPIDTO;
  colaborador: ColaboradorDTO;
  entregas: EntregaDTO[];
  equipamentosEmPosse: EquipamentoEmPosse[];
  devolucoes: DevolucaoItem[];
  historicoEventos: HistoricoEvento[];
}

export interface EquipamentoEmPosse {
  id: string;
  nomeEquipamento: string;
  registroCA: string;
  quantidade: number;
  entregaId: string;
  prazoMaximoDevolucao: Date;
  vencido: boolean;
  diasVencido?: number;
}

export interface DevolucaoItem {
  id: string;
  nomeEquipamento: string;
  registroCA: string;
  quantidade: number;
  dataDevolucao: Date;
  prazoOriginal: Date;
  noPrazo: boolean;
  diasAtraso?: number;
}

export interface HistoricoEvento {
  id: string;
  tipo: 'ficha_criada' | 'entrega' | 'assinatura' | 'devolucao' | 'edicao';
  data: Date;
  descricao: string;
  responsavel: string;
  entregaId?: string;
}

export interface EPIDisponivel {
  id: string;
  nomeEquipamento: string;
  registroCA: string;
  categoria: string;
  disponivel: boolean;
  quantidade?: number;
}

export interface NovaEntregaFormData {
  responsavel: string;
  itens: Array<{
    episDisponivelId: string;
    nomeEquipamento: string;
    registroCA: string;
    quantidade: number;
  }>;
}

class FichaProcessAdapter {
  
  // ==================== QUERIES - Buscar dados de fichas ====================
  
  /**
   * Busca dados completos de uma ficha para o drawer de detalhes
   */
  async getFichaDetailData(fichaId: string): Promise<FichaDetailData> {
    try {
      console.log('📋 Carregando dados completos da ficha:', fichaId);
      
      // Em paralelo, buscar todos os dados necessários
      const [ficha, colaborador, entregas] = await Promise.all([
        this.getFichaById(fichaId),
        this.getColaboradorByFichaId(fichaId),
        this.getEntregasByFichaId(fichaId)
      ]);
      
      // Gerar dados derivados
      const equipamentosEmPosse = this.calculateEquipamentosEmPosse(entregas);
      const devolucoes = this.calculateDevolucoes(entregas);
      const historicoEventos = this.buildHistoricoEventos(ficha, entregas);
      
      console.log('✅ Dados da ficha carregados:', {
        fichaId,
        entregas: entregas.length,
        equipamentos: equipamentosEmPosse.length,
        eventos: historicoEventos.length
      });
      
      return {
        ficha,
        colaborador,
        entregas,
        equipamentosEmPosse,
        devolucoes,
        historicoEventos
      };
      
    } catch (error) {
      console.error('❌ Erro ao carregar dados da ficha:', error);
      throw error;
    }
  }
  
  /**
   * Busca ficha por ID
   */
  async getFichaById(fichaId: string): Promise<FichaEPIDTO> {
    // Usar dados mockados locais
    const fichas = this.getMockFichas();
    const ficha = fichas.find(f => f.id === fichaId);
    
    if (!ficha) {
      throw new Error(`Ficha não encontrada: ${fichaId}`);
    }
    
    return {
      id: ficha.id,
      colaboradorId: ficha.colaboradorId,
      dataEmissao: ficha.dataEmissao,
      dataValidade: ficha.dataValidade,
      status: ficha.status,
      observacoes: ficha.observacoes,
      ativo: ficha.ativo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
  
  /**
   * Busca colaborador da ficha
   */
  async getColaboradorByFichaId(fichaId: string): Promise<ColaboradorDTO> {
    // Usar dados mockados locais
    const ficha = await this.getFichaById(fichaId);
    const colaboradores = this.getMockColaboradores();
    const colaborador = colaboradores.find(c => c.id === ficha.colaboradorId);
    
    if (!colaborador) {
      throw new Error(`Colaborador não encontrado para ficha: ${fichaId}`);
    }
    
    return {
      id: colaborador.id,
      nome: colaborador.nome,
      cpf: colaborador.cpf,
      email: colaborador.email,
      telefone: colaborador.telefone,
      cargo: colaborador.cargo,
      dataAdmissao: colaborador.dataAdmissao,
      dataDesligamento: colaborador.dataDesligamento,
      contratadaId: colaborador.contratadaId,
      ativo: colaborador.ativo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      contratada: colaborador.contratada ? {
        id: colaborador.contratada.id,
        nome: colaborador.contratada.nome,
        cnpj: colaborador.contratada.cnpj,
        endereco: colaborador.contratada.endereco,
        telefone: colaborador.contratada.telefone,
        email: colaborador.contratada.email,
        responsavel: colaborador.contratada.responsavel,
        ativo: colaborador.contratada.ativo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } : undefined
    };
  }
  
  /**
   * Busca entregas da ficha
   */
  async getEntregasByFichaId(fichaId: string): Promise<EntregaDTO[]> {
    // Temporário: retornar dados mockados realistas
    return this.getMockEntregasDetalhadas(fichaId);
  }
  
  /**
   * Busca EPIs disponíveis para entrega
   */
  async getEPIsDisponiveis(): Promise<EPIDisponivel[]> {
    // Temporário: retornar dados mockados
    return [
      { id: '1', nomeEquipamento: 'Capacete de Segurança', registroCA: '31469', categoria: 'PROTECAO_CABECA', disponivel: true, quantidade: 15 },
      { id: '2', nomeEquipamento: 'Luvas de Proteção', registroCA: '15276', categoria: 'PROTECAO_MAOS', disponivel: true, quantidade: 25 },
      { id: '3', nomeEquipamento: 'Óculos de Proteção', registroCA: '19420', categoria: 'PROTECAO_OLHOS', disponivel: true, quantidade: 12 },
      { id: '4', nomeEquipamento: 'Protetor Auricular', registroCA: '5674', categoria: 'PROTECAO_AUDITIVA', disponivel: true, quantidade: 30 },
      { id: '5', nomeEquipamento: 'Cinto de Segurança', registroCA: '18392', categoria: 'PROTECAO_QUEDAS', disponivel: true, quantidade: 8 },
      { id: '6', nomeEquipamento: 'Botina de Segurança', registroCA: '12845', categoria: 'PROTECAO_PES', disponivel: true, quantidade: 20 },
      { id: '7', nomeEquipamento: 'Máscara PFF2', registroCA: '42987', categoria: 'PROTECAO_RESPIRATORIA', disponivel: true, quantidade: 50 }
    ];
  }
  
  // ==================== COMMANDS - Operações de processo ====================
  
  /**
   * Cria nova entrega
   */
  async criarNovaEntrega(fichaId: string, entregaData: NovaEntregaFormData): Promise<EntregaDTO> {
    try {
      console.log('📦 Criando nova entrega:', { fichaId, entregaData });
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Gerar nova entrega
      const novaEntrega: EntregaDTO = {
        id: this.generateDeliveryId(),
        fichaEPIId: fichaId,
        dataEntrega: new Date().toISOString(),
        status: 'nao_assinado',
        assinatura: undefined,
        dataAssinatura: undefined,
        observacoes: '',
        usuarioId: 'user-admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Adicionar à cache mockada (em produção seria salvo no backend)
      await this.addEntregaToMockCache(novaEntrega, entregaData);
      
      console.log('✅ Nova entrega criada:', novaEntrega.id);
      
      return novaEntrega;
      
    } catch (error) {
      console.error('❌ Erro ao criar entrega:', error);
      throw error;
    }
  }
  
  /**
   * Edita entrega existente
   */
  async editarEntrega(entregaId: string, entregaData: NovaEntregaFormData): Promise<EntregaDTO> {
    try {
      console.log('✏️ Editando entrega:', { entregaId, entregaData });
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Em produção, seria uma chamada PATCH para o backend
      // Por ora, simular atualização na cache
      
      console.log('✅ Entrega editada:', entregaId);
      
      // Retornar entrega atualizada (mockado)
      return {
        id: entregaId,
        fichaEPIId: '',
        dataEntrega: new Date().toISOString(),
        status: 'nao_assinado',
        usuarioId: 'user-admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('❌ Erro ao editar entrega:', error);
      throw error;
    }
  }
  
  /**
   * Processa assinatura digital
   */
  async processarAssinatura(entregaId: string, assinaturaData: AssinaturaEntregaForm): Promise<EntregaDTO> {
    try {
      console.log('✍️ Processando assinatura:', { entregaId, assinaturaData });
      
      // Simular delay do processamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Em produção: validar assinatura, registrar no blockchain, etc.
      
      console.log('✅ Assinatura processada:', entregaId);
      
      // Retornar entrega com assinatura (mockado)
      return {
        id: entregaId,
        fichaEPIId: '',
        dataEntrega: new Date().toISOString(),
        status: 'assinado',
        assinatura: assinaturaData.assinatura,
        dataAssinatura: new Date().toISOString(),
        usuarioId: 'user-admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('❌ Erro ao processar assinatura:', error);
      throw error;
    }
  }
  
  /**
   * Processa devolução de EPI
   */
  async processarDevolucao(equipamentoId: string, devolucaoData: DevolucaoForm): Promise<void> {
    try {
      console.log('🔄 Processando devolução:', { equipamentoId, devolucaoData });
      
      // Simular delay da operação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Em produção: atualizar estoque, registrar movimento, etc.
      
      console.log('✅ Devolução processada:', equipamentoId);
      
    } catch (error) {
      console.error('❌ Erro ao processar devolução:', error);
      throw error;
    }
  }
  
  /**
   * Cancela entrega
   */
  async cancelarEntrega(entregaId: string, motivo: string): Promise<void> {
    try {
      console.log('❌ Cancelando entrega:', { entregaId, motivo });
      
      // Simular operação
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log('✅ Entrega cancelada:', entregaId);
      
    } catch (error) {
      console.error('❌ Erro ao cancelar entrega:', error);
      throw error;
    }
  }
  
  // ==================== MÉTODOS AUXILIARES ====================
  
  /**
   * Calcula equipamentos em posse baseado nas entregas
   */
  private calculateEquipamentosEmPosse(entregas: EntregaDTO[]): EquipamentoEmPosse[] {
    // Lógica mockada - em produção viria do backend
    return [
      {
        id: '1',
        nomeEquipamento: 'Capacete de Segurança',
        registroCA: '31469',
        quantidade: 1,
        entregaId: this.generateDeliveryId(),
        prazoMaximoDevolucao: new Date('2024-12-15'),
        vencido: true,
        diasVencido: 20
      },
      {
        id: '2', 
        nomeEquipamento: 'Luvas de Proteção',
        registroCA: '15276',
        quantidade: 2,
        entregaId: this.generateDeliveryId(),
        prazoMaximoDevolucao: new Date('2025-02-15'),
        vencido: false
      }
    ];
  }
  
  /**
   * Calcula devoluções realizadas
   */
  private calculateDevolucoes(entregas: EntregaDTO[]): DevolucaoItem[] {
    // Lógica mockada
    return [
      {
        id: '1',
        nomeEquipamento: 'Protetor Auricular',
        registroCA: '5674',
        quantidade: 1,
        dataDevolucao: new Date('2024-11-20'),
        prazoOriginal: new Date('2024-11-15'),
        noPrazo: false,
        diasAtraso: 5
      }
    ];
  }
  
  /**
   * Constrói histórico de eventos da ficha
   */
  private buildHistoricoEventos(ficha: FichaEPIDTO, entregas: EntregaDTO[]): HistoricoEvento[] {
    const eventos: HistoricoEvento[] = [];
    
    // Evento de criação da ficha
    eventos.push({
      id: '1',
      tipo: 'ficha_criada',
      data: new Date(ficha.dataEmissao),
      descricao: 'Ficha criada',
      responsavel: 'Sistema'
    });
    
    // Eventos das entregas
    entregas.forEach((entrega, index) => {
      eventos.push({
        id: `entrega-${index + 1}`,
        tipo: 'entrega',
        data: new Date(entrega.dataEntrega),
        descricao: `Entrega realizada`,
        responsavel: 'Responsável da Entrega',
        entregaId: entrega.id
      });
      
      if (entrega.status === 'assinado' && entrega.dataAssinatura) {
        eventos.push({
          id: `assinatura-${index + 1}`,
          tipo: 'assinatura',
          data: new Date(entrega.dataAssinatura),
          descricao: 'Entrega assinada',
          responsavel: 'Colaborador'
        });
      }
    });
    
    return eventos.sort((a, b) => b.data.getTime() - a.data.getTime());
  }
  
  /**
   * Gera ID único para entrega
   */
  private generateDeliveryId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'E';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  /**
   * Dados mockados de entregas detalhadas
   */
  private getMockEntregasDetalhadas(fichaId: string): EntregaDTO[] {
    return [
      {
        id: this.generateDeliveryId(),
        fichaEPIId: fichaId,
        dataEntrega: new Date('2024-09-15').toISOString(),
        status: 'assinado',
        assinatura: 'data:image/png;base64,mock-signature',
        dataAssinatura: new Date('2024-09-15').toISOString(),
        observacoes: '',
        usuarioId: 'user-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: this.generateDeliveryId(),
        fichaEPIId: fichaId,
        dataEntrega: new Date('2024-11-20').toISOString(),
        status: 'nao_assinado',
        usuarioId: 'user-2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
  
  /**
   * Adiciona entrega à cache mockada
   */
  private async addEntregaToMockCache(entrega: EntregaDTO, entregaData: NovaEntregaFormData): Promise<void> {
    // Em produção, seria uma chamada POST ao backend
    // Por enquanto, simular adição à cache local
    console.log('💾 Entrega adicionada à cache:', { entrega, entregaData });
  }
  
  /**
   * Dados mockados de fichas para demonstração
   */
  private getMockFichas(): any[] {
    return [
      {
        id: 'ficha-001',
        colaboradorId: 'colab-001',
        dataEmissao: '2024-09-01',
        dataValidade: '2025-09-01',
        status: 'ativa',
        observacoes: 'Ficha ativa para engenheiro',
        ativo: true
      },
      {
        id: 'ficha-002',
        colaboradorId: 'colab-002',
        dataEmissao: '2024-10-15',
        dataValidade: '2025-10-15',
        status: 'ativa',
        observacoes: 'Ficha ativa para técnica',
        ativo: true
      },
      {
        id: 'ficha-003',
        colaboradorId: 'colab-003',
        dataEmissao: '2024-06-10',
        dataValidade: '2024-12-31',
        status: 'vencida',
        observacoes: 'Ficha vencida - renovar',
        ativo: true
      }
    ];
  }
  
  /**
   * Dados mockados de colaboradores para demonstração
   */
  private getMockColaboradores(): any[] {
    return [
      {
        id: 'colab-001',
        nome: 'João Claudio Silva',
        cpf: '123.456.789-00',
        email: 'joao.silva@techcorp.com',
        telefone: '(11) 99999-1111',
        cargo: 'Engenheiro Civil',
        dataAdmissao: '2024-01-15',
        dataDesligamento: null,
        contratadaId: 'empresa-001',
        ativo: true,
        contratada: {
          id: 'empresa-001',
          nome: 'TechCorp Engenharia',
          cnpj: '12.345.678/0001-90',
          endereco: 'Rua das Flores, 123',
          telefone: '(11) 3333-1111',
          email: 'contato@techcorp.com',
          responsavel: 'Maria Santos',
          ativo: true
        }
      },
      {
        id: 'colab-002',
        nome: 'Maria Santos Oliveira',
        cpf: '987.654.321-00',
        email: 'maria.santos@buildmax.com',
        telefone: '(11) 99999-2222',
        cargo: 'Técnica em Segurança',
        dataAdmissao: '2024-03-10',
        dataDesligamento: null,
        contratadaId: 'empresa-002',
        ativo: true,
        contratada: {
          id: 'empresa-002',
          nome: 'BuildMax Construções',
          cnpj: '98.765.432/0001-10',
          endereco: 'Av. Industrial, 456',
          telefone: '(11) 3333-2222',
          email: 'contato@buildmax.com',
          responsavel: 'Carlos Pereira',
          ativo: true
        }
      },
      {
        id: 'colab-003',
        nome: 'Pedro Costa Lima',
        cpf: '456.789.123-00',
        email: 'pedro.lima@safework.com',
        telefone: '(11) 99999-3333',
        cargo: 'Operador de Máquinas',
        dataAdmissao: '2024-02-20',
        dataDesligamento: null,
        contratadaId: 'empresa-003',
        ativo: true,
        contratada: {
          id: 'empresa-003',
          nome: 'SafeWork Solutions',
          cnpj: '11.222.333/0001-44',
          endereco: 'Rua da Segurança, 789',
          telefone: '(11) 3333-3333',
          email: 'contato@safework.com',
          responsavel: 'Ana Rodrigues',
          ativo: true
        }
      }
    ];
  }
}

// Singleton instance
export const fichaProcessAdapter = new FichaProcessAdapter();
export default fichaProcessAdapter;