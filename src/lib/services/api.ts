// Serviços de API mockados para desenvolvimento
// Simula o backend PostgreSQL real com dados realistas

import type { 
  TipoEPI, 
  ItemEstoque, 
  FichaEPI, 
  Colaborador, 
  Empresa, 
  Entrega, 
  Notificacao,
  NovaMovimentacaoForm,
  MovimentacaoEstoque
} from '$lib/types';

import {
  empresasMock,
  colaboradoresMock,
  tiposEPIMock,
  itenEstoqueMock,
  fichasEPIMock,
  entregasMock,
  notificacoesMock,
  generateId,
  simulateNetworkDelay,
  simulateNetworkError
} from './mockData';

// Base API configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Simulate API error
class ApiError extends Error {
  constructor(message: string, public status: number = 500) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API request simulator
async function apiRequest<T>(
  endpoint: string, 
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    delay?: boolean;
  } = {}
): Promise<T> {
  const { method = 'GET', data, delay = true } = options;
  
  // Simulate network delay
  if (delay) {
    await simulateNetworkDelay();
  }
  
  // Simulate occasional network errors
  if (simulateNetworkError()) {
    throw new ApiError('Erro de conexão com o servidor', 500);
  }
  
  console.log(`[API Mock] ${method} ${endpoint}`, data ? { data } : '');
  
  // This would be the actual API call:
  // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
  //   method,
  //   headers: { 'Content-Type': 'application/json' },
  //   body: data ? JSON.stringify(data) : undefined
  // });
  // return response.json();
  
  // For now, return mock data based on endpoint
  return {} as T; // Will be overridden by specific API functions
}

// Factory for CRUD operations
function createCRUDAPI<T extends { id: string }>(
  entityName: string,
  mockData: T[],
  endpoint: string
) {
  return {
    async getAll(): Promise<T[]> {
      await apiRequest(`${endpoint}`);
      return [...mockData];
    },

    async getById(id: string): Promise<T> {
      await apiRequest(`${endpoint}/${id}`);
      const item = mockData.find(item => item.id === id);
      if (!item) {
        throw new ApiError(`${entityName} não encontrado`, 404);
      }
      return { ...item };
    },

    async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
      const newItem = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as unknown as T;
      
      await apiRequest(`${endpoint}`, { method: 'POST', data });
      mockData.push(newItem);
      return { ...newItem };
    },

    async update(id: string, data: Partial<T>): Promise<T> {
      await apiRequest(`${endpoint}/${id}`, { method: 'PUT', data });
      const index = mockData.findIndex(item => item.id === id);
      if (index === -1) {
        throw new ApiError(`${entityName} não encontrado`, 404);
      }
      
      const updatedItem = {
        ...mockData[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      mockData[index] = updatedItem;
      return { ...updatedItem };
    },

    async delete(id: string): Promise<void> {
      await apiRequest(`${endpoint}/${id}`, { method: 'DELETE' });
      const index = mockData.findIndex(item => item.id === id);
      if (index === -1) {
        throw new ApiError(`${entityName} não encontrado`, 404);
      }
      mockData.splice(index, 1);
    }
  };
}

// Specific API services
export const empresasAPI = createCRUDAPI('Empresa', empresasMock, '/empresas');
export const colaboradoresAPI = createCRUDAPI('Colaborador', colaboradoresMock, '/colaboradores');
export const tiposEPIAPI = createCRUDAPI('Tipo EPI', tiposEPIMock, '/tipos-epi');
export const itenEstoqueAPI = createCRUDAPI('Item Estoque', itenEstoqueMock, '/itens-estoque');
export const fichasEPIAPI = createCRUDAPI('Ficha EPI', fichasEPIMock, '/fichas');
export const entregasAPI = createCRUDAPI('Entrega', entregasMock, '/entregas');
export const notificacoesAPI = createCRUDAPI('Notificação', notificacoesMock, '/notificacoes');

// Extended API methods for specific entities

// Colaboradores API extensions
export const colaboradoresExtendedAPI = {
  ...colaboradoresAPI,
  
  async getByEmpresa(empresaId: string): Promise<Colaborador[]> {
    await apiRequest(`/colaboradores?empresaId=${empresaId}`);
    return colaboradoresMock.filter(col => col.empresaId === empresaId);
  },

  async getAtivos(): Promise<Colaborador[]> {
    await apiRequest('/colaboradores?status=ativo');
    return colaboradoresMock.filter(col => col.status === 'ativo');
  }
};

// Estoque API extensions
export const estoqueExtendedAPI = {
  ...itenEstoqueAPI,
  
  // Override getAll to include tipoEPI data
  async getAll(): Promise<ItemEstoque[]> {
    await apiRequest('/itens-estoque');
    
    // Populate tipoEPI data
    return itenEstoqueMock.map(item => ({
      ...item,
      tipoEPI: tiposEPIMock.find(tipo => tipo.id === item.tipoEPIId)
    }));
  },
  
  async getByTipoEPI(tipoEPIId: string): Promise<ItemEstoque[]> {
    await apiRequest(`/itens-estoque?tipoEPIId=${tipoEPIId}`);
    const filtered = itenEstoqueMock.filter(item => item.tipoEPIId === tipoEPIId);
    return filtered.map(item => ({
      ...item,
      tipoEPI: tiposEPIMock.find(tipo => tipo.id === item.tipoEPIId)
    }));
  },

  async getBaixoEstoque(): Promise<ItemEstoque[]> {
    await apiRequest('/itens-estoque?status=baixo_estoque');
    const filtered = itenEstoqueMock.filter(item => 
      item.quantidadeMinima && item.quantidade <= item.quantidadeMinima
    );
    return filtered.map(item => ({
      ...item,
      tipoEPI: tiposEPIMock.find(tipo => tipo.id === item.tipoEPIId)
    }));
  },

  async getVencidos(): Promise<ItemEstoque[]> {
    await apiRequest('/itens-estoque?status=vencido');
    const hoje = new Date();
    const filtered = itenEstoqueMock.filter(item => 
      item.dataValidade && new Date(item.dataValidade) < hoje
    );
    return filtered.map(item => ({
      ...item,
      tipoEPI: tiposEPIMock.find(tipo => tipo.id === item.tipoEPIId)
    }));
  },

  async updateQuantidade(id: string, quantidade: number, motivo: string): Promise<ItemEstoque> {
    const data = { quantidade, motivo };
    await apiRequest(`/itens-estoque/${id}/quantidade`, { method: 'PATCH', data });
    
    const item = itenEstoqueMock.find(item => item.id === id);
    if (!item) {
      throw new ApiError('Item não encontrado', 404);
    }
    
    item.quantidade = quantidade;
    item.updatedAt = new Date().toISOString();
    
    // Update status based on quantity
    if (quantidade === 0) {
      item.status = 'esgotado';
    } else if (item.quantidadeMinima && quantidade <= item.quantidadeMinima) {
      item.status = 'baixo_estoque';
    } else {
      item.status = 'disponivel';
    }
    
    return { ...item };
  }
};

// Fichas API extensions with pagination support
export const fichasExtendedAPI = {
  ...fichasEPIAPI,
  
  // Override getAll with pagination and filters
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    cargo?: string;
    empresa?: string;
    devolucaoPendente?: boolean;
  }): Promise<{
    items: FichaEPI[];
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const search = params?.search || '';
    const cargo = params?.cargo || '';
    const empresa = params?.empresa || '';
    const devolucaoPendente = params?.devolucaoPendente || false;
    
    console.log('🔍 API params received:', { page, limit, search, cargo, empresa, devolucaoPendente });
    
    await apiRequest(`/fichas?page=${page}&limit=${limit}&search=${search}&cargo=${cargo}&empresa=${empresa}&devolucaoPendente=${devolucaoPendente}`);
    
    // Get all fichas with colaborador data
    let fichasWithColaborador = fichasEPIMock.map(ficha => ({
      ...ficha,
      colaborador: colaboradoresMock.find(col => col.id === ficha.colaboradorId)
    })).filter(f => f.colaborador) as FichaEPI[];
    
    console.log('📋 Total fichas antes dos filtros:', fichasWithColaborador.length);
    
    // Apply filters server-side
    if (search && search.trim()) {
      const searchLower = search.toLowerCase();
      fichasWithColaborador = fichasWithColaborador.filter(ficha => 
        ficha.colaborador?.nome.toLowerCase().includes(searchLower) ||
        ficha.colaborador?.cpf.includes(search)
      );
      console.log('🔍 Após filtro de busca:', fichasWithColaborador.length);
    }
    
    if (cargo && cargo !== 'todos' && cargo !== '') {
      fichasWithColaborador = fichasWithColaborador.filter(ficha => 
        ficha.colaborador?.cargo === cargo
      );
      console.log('👔 Após filtro de cargo:', fichasWithColaborador.length);
    }
    
    if (empresa && empresa !== 'todas' && empresa !== '') {
      fichasWithColaborador = fichasWithColaborador.filter(ficha => 
        ficha.colaborador?.empresa === empresa
      );
      console.log('🏢 Após filtro de empresa:', fichasWithColaborador.length);
    }
    
    if (devolucaoPendente === true) {
      const beforeDevFilter = fichasWithColaborador.length;
      fichasWithColaborador = fichasWithColaborador.filter(ficha => {
        const dataValidade = new Date(ficha.dataValidade);
        const hoje = new Date();
        const fichaVencida = dataValidade < hoje;
        const hasItems = (ficha.itens?.length || 0) > 0;
        return fichaVencida && hasItems;
      });
      console.log('⏰ Após filtro de devolução pendente:', fichasWithColaborador.length, 'de', beforeDevFilter);
    }
    
    // Calculate pagination
    const total = fichasWithColaborador.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Apply pagination
    const items = fichasWithColaborador.slice(startIndex, endIndex);
    
    return {
      items,
      total,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  },

  async getByColaborador(colaboradorId: string): Promise<FichaEPI[]> {
    await apiRequest(`/fichas?colaboradorId=${colaboradorId}`);
    return fichasEPIMock.filter(ficha => ficha.colaboradorId === colaboradorId);
  },

  async getAtivas(): Promise<FichaEPI[]> {
    await apiRequest('/fichas?status=ativo');
    return fichasEPIMock.filter(ficha => ficha.status === 'ativo');
  },

  async getVencidas(): Promise<FichaEPI[]> {
    await apiRequest('/fichas?status=vencido');
    return fichasEPIMock.filter(ficha => ficha.status === 'vencido');
  },

  async getVencendoEm(dias: number): Promise<FichaEPI[]> {
    await apiRequest(`/fichas?vencendoEm=${dias}`);
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + dias);
    
    return fichasEPIMock.filter(ficha => {
      const dataValidade = new Date(ficha.dataValidade);
      return dataValidade <= dataLimite && ficha.status === 'ativo';
    });
  }
};

// Movimentações API
export const movimentacoesAPI = {
  async criar(movimentacao: NovaMovimentacaoForm): Promise<MovimentacaoEstoque[]> {
    await apiRequest('/movimentacoes', { method: 'POST', data: movimentacao });
    
    const movimentacoes: MovimentacaoEstoque[] = [];
    
    // Create movimentação for each item
    for (const item of movimentacao.itens) {
      const novaMovimentacao: MovimentacaoEstoque = {
        id: generateId(),
        tipoMovimentacao: movimentacao.tipo === 'saida' ? 'saida_entrega' : movimentacao.tipo,
        quantidade: item.quantidade,
        responsavel: movimentacao.responsavel,
        motivo: movimentacao.motivo,
        observacoes: movimentacao.observacoes,
        dataMovimentacao: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      movimentacoes.push(novaMovimentacao);
    }
    
    return movimentacoes;
  },

  async getHistorico(itemEstoqueId?: string): Promise<MovimentacaoEstoque[]> {
    const endpoint = itemEstoqueId 
      ? `/movimentacoes?itemEstoqueId=${itemEstoqueId}`
      : '/movimentacoes';
    
    await apiRequest(endpoint);
    
    // Mock historical data
    return [
      {
        id: '1',
        itemEstoqueId: '1',
        tipoMovimentacao: 'entrada',
        quantidade: 25,
        responsavel: 'Ana Silva',
        motivo: 'Compra inicial',
        dataMovimentacao: '2024-01-20T10:00:00Z',
        createdAt: '2024-01-20T10:00:00Z'
      },
      {
        id: '2',
        itemEstoqueId: '1',
        tipoMovimentacao: 'saida_entrega',
        quantidade: 2,
        responsavel: 'Carlos Pereira',
        motivo: 'Entrega para colaborador',
        dataMovimentacao: '2024-02-01T09:00:00Z',
        createdAt: '2024-02-01T09:00:00Z'
      }
    ];
  }
};

// Entregas API extensions
export const entregasExtendedAPI = {
  ...entregasAPI,
  
  async getByFicha(fichaId: string): Promise<Entrega[]> {
    await apiRequest(`/entregas?fichaId=${fichaId}`);
    return entregasMock.filter(entrega => entrega.fichaEPIId === fichaId);
  },

  async getPendentesAssinatura(): Promise<Entrega[]> {
    await apiRequest('/entregas?status=nao_assinado');
    return entregasMock.filter(entrega => entrega.status === 'nao_assinado');
  },

  async assinar(id: string, dadosAssinatura: { ip?: string; device?: string }): Promise<Entrega> {
    await apiRequest(`/entregas/${id}/assinar`, { method: 'POST', data: dadosAssinatura });
    
    const entrega = entregasMock.find(e => e.id === id);
    if (!entrega) {
      throw new ApiError('Entrega não encontrada', 404);
    }
    
    entrega.status = 'assinado';
    entrega.assinatura = {
      dataAssinatura: new Date().toISOString(),
      ...dadosAssinatura
    };
    
    return { ...entrega };
  }
};

// Notificações API extensions
export const notificacoesExtendedAPI = {
  ...notificacoesAPI,
  
  async getNaoLidas(): Promise<Notificacao[]> {
    await apiRequest('/notificacoes?lida=false');
    return notificacoesMock.filter(notif => !notif.lida);
  },

  async marcarComoLida(id: string): Promise<Notificacao> {
    await apiRequest(`/notificacoes/${id}/marcar-lida`, { method: 'PATCH' });
    
    const notificacao = notificacoesMock.find(n => n.id === id);
    if (!notificacao) {
      throw new ApiError('Notificação não encontrada', 404);
    }
    
    notificacao.lida = true;
    return { ...notificacao };
  },

  async marcarTodasComoLidas(): Promise<void> {
    await apiRequest('/notificacoes/marcar-todas-lidas', { method: 'PATCH' });
    notificacoesMock.forEach(notif => notif.lida = true);
  }
};

// Relatórios API
export const relatoriosAPI = {
  async getEstatisticas(): Promise<{
    totalColaboradores: number;
    fichasAtivas: number;
    fichasVencidas: number;
    estoqueTotal: number;
    estoqueBaixo: number;
    entregasMes: number;
  }> {
    await apiRequest('/relatorios/estatisticas');
    
    return {
      totalColaboradores: colaboradoresMock.filter(c => c.status === 'ativo').length,
      fichasAtivas: fichasEPIMock.filter(f => f.status === 'ativo').length,
      fichasVencidas: fichasEPIMock.filter(f => f.status === 'vencido').length,
      estoqueTotal: itenEstoqueMock.reduce((total, item) => total + item.quantidade, 0),
      estoqueBaixo: itenEstoqueMock.filter(item => 
        item.quantidadeMinima && item.quantidade <= item.quantidadeMinima
      ).length,
      entregasMes: entregasMock.filter(e => {
        const entregaDate = new Date(e.dataEntrega);
        const now = new Date();
        return entregaDate.getMonth() === now.getMonth() && 
               entregaDate.getFullYear() === now.getFullYear();
      }).length
    };
  }
};

// Export all APIs
export {
  apiRequest,
  ApiError
};