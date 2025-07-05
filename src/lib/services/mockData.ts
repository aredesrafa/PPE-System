// Dados mockados hiperrealistas para desenvolvimento
// Baseados no projeto React original

import type { 
  TipoEPI, 
  ItemEstoque, 
  FichaEPI, 
  Colaborador, 
  Empresa, 
  Entrega, 
  Notificacao,
  ItemFicha
} from '$lib/types';

// Função para gerar IDs únicos
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Empresas mockadas
export const empresasMock: Empresa[] = [
  {
    id: '1',
    nome: 'DataLife Tecnologia Ltda',
    cnpj: '12.345.678/0001-90',
    endereco: 'Av. Paulista, 1000 - São Paulo/SP',
    status: 'ativa',
    tipo: 'holding'
  },
  {
    id: '2',
    nome: 'Construção Civil ABC',
    cnpj: '98.765.432/0001-10',
    endereco: 'Rua das Obras, 500 - São Paulo/SP',
    status: 'ativa',
    tipo: 'contratada',
    holdingId: '1'
  },
  {
    id: '3',
    nome: 'Indústria XYZ',
    cnpj: '11.222.333/0001-44',
    endereco: 'Distrito Industrial, 123 - São Bernardo/SP',
    status: 'ativa',
    tipo: 'contratada',
    holdingId: '1'
  }
];

// Colaboradores mockados
export const colaboradoresMock: Colaborador[] = [
  {
    id: '1',
    nome: 'João Silva Santos',
    cpf: '123.456.789-00',
    email: 'joao.silva@datalife.com.br',
    cargo: 'Engenheiro de Segurança',
    empresa: 'DataLife Tecnologia Ltda',
    dataAdmissao: '2023-01-15',
    empresaId: '1',
    status: 'ativo',
    temFichaAtiva: true
  },
  {
    id: '2',
    nome: 'Maria Santos Oliveira',
    cpf: '987.654.321-00',
    email: 'maria.santos@construcaoabc.com.br',
    cargo: 'Operária',
    empresa: 'Construção Civil ABC',
    dataAdmissao: '2022-03-10',
    empresaId: '2',
    status: 'ativo',
    temFichaAtiva: true
  },
  {
    id: '3',
    nome: 'Pedro Costa Lima',
    cpf: '456.789.123-00',
    email: 'pedro.costa@industriaxyz.com.br',
    cargo: 'Soldador',
    empresa: 'Indústria XYZ',
    dataAdmissao: '2021-08-22',
    empresaId: '3',
    status: 'ativo',
    temFichaAtiva: false
  },
  {
    id: '4',
    nome: 'Ana Rodrigues Silva',
    cpf: '789.123.456-00',
    email: 'ana.rodrigues@datalife.com.br',
    cargo: 'Analista de Sistemas',
    empresa: 'DataLife Tecnologia Ltda',
    dataAdmissao: '2023-05-01',
    empresaId: '1',
    status: 'ativo',
    temFichaAtiva: false
  },
  {
    id: '5',
    nome: 'Carlos Ferreira Nunes',
    cpf: '321.654.987-00',
    email: 'carlos.ferreira@construcaoabc.com.br',
    cargo: 'Pedreiro',
    empresa: 'Construção Civil ABC',
    dataAdmissao: '2020-11-15',
    empresaId: '2',
    status: 'afastado',
    temFichaAtiva: true
  }
];

// Tipos de EPI mockados
export const tiposEPIMock: TipoEPI[] = [
  {
    id: '1',
    numeroCA: '12345',
    nomeEquipamento: 'Capacete de Segurança',
    descricao: 'Capacete de segurança classe A, resistente a impactos',
    fabricante: 'Protec Segurança',
    categoria: 'Proteção da Cabeça',
    vidaUtilDias: 1095, // 3 anos
    foto: '/images/capacete.jpg'
  },
  {
    id: '2',
    numeroCA: '67890',
    nomeEquipamento: 'Luvas de Proteção',
    descricao: 'Luvas de proteção contra agentes químicos',
    fabricante: 'SafeHands',
    categoria: 'Proteção das Mãos',
    vidaUtilDias: 180, // 6 meses
    foto: '/images/luvas.jpg'
  },
  {
    id: '3',
    numeroCA: '54321',
    nomeEquipamento: 'Óculos de Proteção',
    descricao: 'Óculos de proteção antiembaçante',
    fabricante: 'VisionSafe',
    categoria: 'Proteção dos Olhos',
    vidaUtilDias: 730, // 2 anos
    foto: '/images/oculos.jpg'
  },
  {
    id: '4',
    numeroCA: '98765',
    nomeEquipamento: 'Máscara PFF2',
    descricao: 'Máscara de proteção respiratória PFF2',
    fabricante: 'BreatheSafe',
    categoria: 'Proteção Respiratória',
    vidaUtilDias: 30, // 1 mês
    foto: '/images/mascara.jpg'
  },
  {
    id: '5',
    numeroCA: '13579',
    nomeEquipamento: 'Botinas de Segurança',
    descricao: 'Botinas de segurança com biqueira de aço',
    fabricante: 'StepSafe',
    categoria: 'Proteção dos Pés',
    vidaUtilDias: 365, // 1 ano
    foto: '/images/botinas.jpg'
  }
];

// Itens de estoque mockados
export const itenEstoqueMock: ItemEstoque[] = [
  {
    id: '1',
    tipoEPIId: '1', // Capacete
    empresaId: '1',
    quantidade: 25,
    quantidadeMinima: 10,
    localizacao: 'Almoxarifado A - Prateleira 1',
    lote: 'LOT001',
    dataValidade: '2026-12-31',
    status: 'disponivel',
    custoUnitario: 45.90,
    fornecedor: 'Protec Segurança',
    ativo: true,
    numeroLote: 'CAP2024001',
    dataFabricacao: '2024-01-15',
    notaFiscal: 'NF123456',
    observacoes: 'Recebido em perfeito estado',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    tipoEPIId: '2', // Luvas
    empresaId: '1',
    quantidade: 8,
    quantidadeMinima: 15,
    localizacao: 'Almoxarifado A - Prateleira 2',
    lote: 'LOT002',
    dataValidade: '2024-08-15',
    status: 'baixo_estoque',
    custoUnitario: 12.50,
    fornecedor: 'SafeHands',
    ativo: true,
    numeroLote: 'LUV2024001',
    dataFabricacao: '2024-02-01',
    notaFiscal: 'NF123457',
    observacoes: 'Estoque baixo - solicitar reposição',
    createdAt: '2024-02-05T14:30:00Z',
    updatedAt: '2024-06-15T09:20:00Z'
  },
  {
    id: '3',
    tipoEPIId: '3', // Óculos
    empresaId: '2',
    quantidade: 40,
    quantidadeMinima: 20,
    localizacao: 'Almoxarifado B - Gaveta 5',
    lote: 'LOT003',
    dataValidade: '2025-10-30',
    status: 'disponivel',
    custoUnitario: 28.75,
    fornecedor: 'VisionSafe',
    ativo: true,
    numeroLote: 'OCU2024001',
    dataFabricacao: '2024-03-10',
    notaFiscal: 'NF123458',
    observacoes: '',
    createdAt: '2024-03-15T11:45:00Z',
    updatedAt: '2024-03-15T11:45:00Z'
  },
  {
    id: '4',
    tipoEPIId: '4', // Máscara
    empresaId: '1',
    quantidade: 0,
    quantidadeMinima: 50,
    localizacao: 'Almoxarifado A - Prateleira 3',
    lote: 'LOT004',
    dataValidade: '2024-07-20',
    status: 'esgotado',
    custoUnitario: 8.90,
    fornecedor: 'BreatheSafe',
    ativo: true,
    numeroLote: 'MAS2024001',
    dataFabricacao: '2024-06-20',
    notaFiscal: 'NF123459',
    observacoes: 'Estoque esgotado - urgente reposição',
    createdAt: '2024-06-25T16:20:00Z',
    updatedAt: '2024-07-02T08:10:00Z'
  },
  {
    id: '5',
    tipoEPIId: '5', // Botinas
    empresaId: '3',
    quantidade: 15,
    quantidadeMinima: 12,
    localizacao: 'Almoxarifado C - Estante 1',
    lote: 'LOT005',
    dataValidade: '2025-05-15',
    status: 'disponivel',
    custoUnitario: 89.90,
    fornecedor: 'StepSafe',
    ativo: true,
    numeroLote: 'BOT2024001',
    dataFabricacao: '2024-05-01',
    notaFiscal: 'NF123460',
    observacoes: 'Tamanhos diversos: 38-44',
    createdAt: '2024-05-10T13:30:00Z',
    updatedAt: '2024-05-10T13:30:00Z'
  }
];

// Itens de ficha mockados
const itensFichaMock: ItemFicha[] = [
  {
    id: '1',
    fichaEpiId: '1',
    tipoEpiId: '1', // Capacete
    itemEstoqueOrigemId: '1',
    quantidade: 1,
    numeroLote: 'CAP2024001',
    dataEntrega: '2024-02-01T09:00:00Z',
    dataValidadeItem: '2026-12-31',
    status: 'entregue',
    responsavelEntrega: 'Ana Silva - Técnica de Segurança',
    observacoes: 'Treinamento realizado sobre uso correto',
    entregaId: '1',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-02-01T09:00:00Z'
  },
  {
    id: '2',
    fichaEpiId: '1',
    tipoEpiId: '2', // Luvas
    itemEstoqueOrigemId: '2',
    quantidade: 2,
    numeroLote: 'LUV2024001',
    dataEntrega: '2024-02-01T09:05:00Z',
    dataValidadeItem: '2024-08-15',
    status: 'entregue',
    responsavelEntrega: 'Ana Silva - Técnica de Segurança',
    observacoes: 'Par de reserva entregue',
    entregaId: '1',
    createdAt: '2024-02-01T09:05:00Z',
    updatedAt: '2024-02-01T09:05:00Z'
  }
];

// Function to generate additional colaboradores
function generateAdditionalColaboradores(): Colaborador[] {
  const cargos = ['Operário', 'Soldador', 'Pedreiro', 'Eletricista', 'Encanador', 'Pintor', 'Servente', 'Mecânico', 'Técnico', 'Supervisor'];
  const empresas = ['DataLife Tecnologia Ltda', 'Construção Civil ABC', 'Indústria XYZ'];
  const empresaIds = ['1', '2', '3'];
  const nomes = [
    'Roberto Silva', 'Fernanda Costa', 'Marcelo Santos', 'Juliana Oliveira', 'Paulo Ferreira',
    'Amanda Lima', 'Ricardo Alves', 'Carla Rodrigues', 'Diego Martins', 'Tatiane Pereira',
    'Gabriel Sousa', 'Larissa Castro', 'Thiago Barbosa', 'Priscila Nascimento', 'Felipe Cardoso',
    'Vanessa Araujo', 'Leonardo Dias', 'Cristina Moreira', 'André Campos', 'Simone Ribeiro',
    'Bruno Correia', 'Patrícia Gomes', 'Vinicius Freitas', 'Renata Monteiro', 'Gustavo Pinto'
  ];
  
  return nomes.map((nome, index) => {
    const empresaIndex = index % 3;
    const cargoIndex = index % cargos.length;
    const id = (6 + index).toString();
    
    return {
      id,
      nome,
      cpf: `${(100000000 + index * 111111).toString().substring(0, 11)}`,
      email: `${nome.toLowerCase().replace(' ', '.')}@email.com`,
      cargo: cargos[cargoIndex],
      empresa: empresas[empresaIndex],
      dataAdmissao: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      empresaId: empresaIds[empresaIndex],
      status: Math.random() > 0.1 ? 'ativo' : 'afastado',
      temFichaAtiva: Math.random() > 0.3
    };
  });
}

// Function to generate additional fichas
function generateAdditionalFichas(): FichaEPI[] {
  const additionalColaboradores = generateAdditionalColaboradores();
  const statusOptions = ['ativo', 'vencido', 'suspenso'];
  
  return additionalColaboradores
    .filter(col => col.temFichaAtiva)
    .map((col, index) => {
      const id = (4 + index).toString();
      const emissaoDate = new Date(col.dataAdmissao);
      const validadeDate = new Date(emissaoDate);
      validadeDate.setFullYear(validadeDate.getFullYear() + 1);
      
      // Some fichas should be expired for devolução pendente filter
      if (Math.random() > 0.7) {
        validadeDate.setFullYear(2024);
        validadeDate.setMonth(Math.floor(Math.random() * 12));
      }
      
      return {
        id,
        colaboradorId: col.id,
        empresaId: col.empresaId,
        dataEmissao: emissaoDate.toISOString().split('T')[0],
        dataValidade: validadeDate.toISOString().split('T')[0],
        status: validadeDate < new Date() ? 'vencido' : statusOptions[Math.floor(Math.random() * statusOptions.length)],
        itens: Math.random() > 0.5 ? [
          {
            id: `item-${id}-1`,
            tipoEPIId: '1',
            quantidade: Math.floor(Math.random() * 3) + 1,
            dataEntrega: emissaoDate.toISOString(),
            status: 'entregue'
          }
        ] : []
      };
    });
}

// Add additional colaboradores to existing ones
colaboradoresMock.push(...generateAdditionalColaboradores());

// Fichas EPI mockadas
export const fichasEPIMock: FichaEPI[] = [
  {
    id: '1',
    colaboradorId: '1', // João Silva
    empresaId: '1',
    dataEmissao: '2024-02-01',
    dataValidade: '2025-02-01',
    status: 'ativo',
    itens: itensFichaMock.filter(item => item.fichaEpiId === '1')
  },
  {
    id: '2',
    colaboradorId: '2', // Maria Santos
    empresaId: '2',
    dataEmissao: '2023-12-15',
    dataValidade: '2024-12-15',
    status: 'vencido',
    itens: [
      {
        id: 'item-2-1',
        tipoEPIId: '2',
        quantidade: 1,
        dataEntrega: '2023-12-15',
        status: 'entregue'
      }
    ]
  },
  {
    id: '3',
    colaboradorId: '5', // Carlos Ferreira
    empresaId: '2',
    dataEmissao: '2024-01-10',
    dataValidade: '2025-01-10',
    status: 'suspenso',
    itens: []
  },
  // Add generated fichas
  ...generateAdditionalFichas()
];

// Entregas mockadas
export const entregasMock: Entrega[] = [
  {
    id: '1',
    fichaEPIId: '1',
    dataEntrega: '2024-02-01T09:00:00Z',
    itens: [
      {
        id: '1',
        tipoEPIId: '1',
        quantidade: 1,
        dataValidade: '2026-12-31',
        status: 'entregue',
        dataEntrega: '2024-02-01T09:00:00Z'
      },
      {
        id: '2',
        tipoEPIId: '2',
        quantidade: 2,
        dataValidade: '2024-08-15',
        status: 'entregue',
        dataEntrega: '2024-02-01T09:05:00Z'
      }
    ],
    responsavel: 'Ana Silva - Técnica de Segurança',
    status: 'assinado',
    assinatura: {
      dataAssinatura: '2024-02-01T09:15:00Z',
      ip: '192.168.1.100',
      device: 'Tablet Android'
    },
    qrCode: 'QR123456789',
    linkAssinatura: 'https://sistema.datalife.com.br/assinatura/1'
  },
  {
    id: '2',
    fichaEPIId: '2',
    dataEntrega: '2024-06-15T14:30:00Z',
    itens: [
      {
        id: '3',
        tipoEPIId: '3',
        quantidade: 1,
        dataValidade: '2025-10-30',
        status: 'entregue',
        dataEntrega: '2024-06-15T14:30:00Z'
      }
    ],
    responsavel: 'Carlos Pereira - Supervisor',
    status: 'nao_assinado',
    qrCode: 'QR987654321',
    linkAssinatura: 'https://sistema.datalife.com.br/assinatura/2'
  }
];

// Notificações mockadas
export const notificacoesMock: Notificacao[] = [
  {
    id: '1',
    titulo: 'EPI Próximo ao Vencimento',
    mensagem: 'O EPI "Luvas de Proteção" do colaborador João Silva vence em 15 dias.',
    tipo: 'vencimento',
    data: '2024-07-01T08:30:00Z',
    lida: false,
    link: '/fichas/1',
    usuarioId: 'user1',
    empresaId: '1'
  },
  {
    id: '2',
    titulo: 'Estoque Baixo',
    mensagem: 'O item "Luvas de Proteção" está com estoque baixo (8 unidades restantes).',
    tipo: 'estoque_baixo',
    data: '2024-07-01T10:15:00Z',
    lida: false,
    link: '/estoque',
    usuarioId: 'user1',
    empresaId: '1'
  },
  {
    id: '3',
    titulo: 'Nova Entrega Pendente',
    mensagem: 'Há uma entrega de EPI pendente de assinatura para Maria Santos.',
    tipo: 'informacao',
    data: '2024-06-30T16:45:00Z',
    lida: true,
    link: '/entregas/2',
    usuarioId: 'user1',
    empresaId: '2'
  },
  {
    id: '4',
    titulo: 'Estoque Esgotado',
    mensagem: 'O item "Máscara PFF2" está com estoque esgotado. Reposição urgente necessária.',
    tipo: 'alerta',
    data: '2024-07-02T09:00:00Z',
    lida: false,
    link: '/estoque',
    usuarioId: 'user1',
    empresaId: '1'
  },
  {
    id: '5',
    titulo: 'Ficha EPI Vencida',
    mensagem: 'A ficha EPI do colaborador Maria Santos está vencida e precisa ser renovada.',
    tipo: 'importante',
    data: '2024-06-29T11:20:00Z',
    lida: false,
    link: '/fichas/2',
    usuarioId: 'user1',
    empresaId: '2'
  }
];

// Função para simular delay de rede
export function simulateNetworkDelay(min = 300, max = 1000): Promise<void> {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
}

// Função para simular falha ocasional de rede (10% de chance)
export function simulateNetworkError(): boolean {
  return Math.random() < 0.1; // 10% de chance de erro
}