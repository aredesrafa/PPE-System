# Análise de Discrepâncias: Backend Real vs Documento Frontend

## Resumo Executivo

Após análise detalhada do backend real (datalife-epi35/epi-backend), foram identificadas diversas discrepâncias entre a estrutura implementada e o que foi documentado/esperado pelo frontend.

## 1. ESTRUTURAS DE ENTIDADES

### 1.1 Colaborador
**Backend Real (Prisma Schema):**
```typescript
model Colaborador {
  id               String   @id @default(uuid())
  nome             String   @db.VarChar(255)
  cpf              String   @unique @db.VarChar(11)
  matricula        String?  @db.VarChar(50)
  cargo            String?  @db.VarChar(100)
  setor            String?  @db.VarChar(100)
  unidadeNegocioId String   @map("unidade_negocio_id")
  contratadaId     String?  @map("contratada_id") // NULLABLE!
  ativo            Boolean  @default(true)
  createdAt        DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
}
```

**Discrepâncias:**
- ✅ `contratadaId` é OPCIONAL (nullable) no banco, mas OBRIGATÓRIO no schema de criação
- ✅ Existe campo `unidadeNegocioId` que não estava documentado
- ✅ Não existe campo `email` no colaborador
- ✅ CPF armazenado sem formatação (11 caracteres)

### 1.2 Contratada
**Backend Real:**
```typescript
model Contratada {
  id        String   @id @default(uuid())
  nome      String   @db.VarChar(255)
  cnpj      String   @unique @db.VarChar(14) // Apenas números
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
}
```

**Discrepâncias:**
- ✅ Estrutura muito simples, apenas nome e CNPJ
- ✅ CNPJ armazenado sem formatação (14 caracteres)
- ✅ Não existem campos como endereço, telefone, email, etc.

### 1.3 Almoxarifado
**Backend Real:**
```typescript
model Almoxarifado {
  id               String   @id @default(uuid())
  unidadeNegocioId String   @map("unidade_negocio_id")
  nome             String   @db.VarChar(255)
  isPrincipal      Boolean  @default(false) @map("is_principal")
  createdAt        DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
}
```

**Discrepâncias:**
- ✅ Existe campo `isPrincipal` para identificar almoxarifado principal
- ✅ Vinculado a `UnidadeNegocio` (entidade não documentada)
- ✅ Não existe campo `codigo` ou `localizacao`

### 1.4 FichaEPI
**Backend Real:**
```typescript
model FichaEPI {
  id            String          @id @default(uuid())
  colaboradorId String          @unique @map("colaborador_id") // UNIQUE!
  dataEmissao   DateTime        @default(dbgenerated("CURRENT_DATE")) @map("data_emissao") @db.Date
  status        StatusFichaEnum @default(ATIVA)
  createdAt     DateTime        @default(now()) @map("created_at") @db.Timestamptz(6)
}
```

**Discrepâncias:**
- ✅ Um colaborador tem APENAS UMA ficha (unique constraint)
- ✅ Não há vinculação direta com tipo de EPI ou almoxarifado
- ✅ Status enum: ATIVA, INATIVA (não há SUSPENSA)

### 1.5 EstoqueItem (ItemEstoque no documento)
**Backend Real:**
```typescript
model EstoqueItem {
  id            String                 @id
  almoxarifadoId String                @map("almoxarifado_id")
  tipoEpiId     String                 @map("tipo_epi_id")
  quantidade    Int                    @default(0)
  custoUnitario Decimal?               @map("custo_unitario") @db.Decimal(12, 2)
  status        StatusEstoqueItemEnum  @default(DISPONIVEL)
  createdAt     DateTime               @default(now()) @map("created_at") @db.Timestamptz(6)
}
```

**Discrepâncias:**
- ✅ Nome real é `EstoqueItem`, não `ItemEstoque`
- ✅ Status enum: DISPONIVEL, AGUARDANDO_INSPECAO, QUARENTENA (não há SEM_ESTOQUE)
- ✅ Unique constraint em [almoxarifadoId, tipoEpiId, status]

### 1.6 Entrega
**Backend Real:**
```typescript
model Entrega {
  id               String             @id
  fichaEpiId       String             @map("ficha_epi_id")
  almoxarifadoId   String             @map("almoxarifado_id")
  responsavelId    String             @map("responsavel_id")
  dataEntrega      DateTime           @default(now()) @map("data_entrega") @db.Timestamptz(6)
  status           StatusEntregaEnum  @default(PENDENTE_ASSINATURA)
  linkAssinatura   String?            @map("link_assinatura") @db.Text
  dataAssinatura   DateTime?          @map("data_assinatura") @db.Timestamptz(6)
}
```

**Discrepâncias:**
- ✅ Status enum: PENDENTE_ASSINATURA, ASSINADA, CANCELADA
- ✅ Existe campo `linkAssinatura` para assinatura digital
- ✅ `responsavelId` referencia Usuario, não Colaborador

### 1.7 MovimentacaoEstoque
**Backend Real:**
```typescript
model MovimentacaoEstoque {
  id                   String                @id @default(uuid())
  estoqueItemId        String                @map("estoque_item_id")
  responsavelId        String                @map("responsavel_id")
  tipoMovimentacao     TipoMovimentacaoEnum  @map("tipo_movimentacao")
  quantidadeMovida     Int                   @map("quantidade_movida")
  notaMovimentacaoId   String?               @map("nota_movimentacao_id")
  entregaId            String?               @map("entrega_id")
  movimentacaoOrigemId String?               @map("movimentacao_origem_id")
  dataMovimentacao     DateTime              @default(now()) @map("data_movimentacao") @db.Timestamptz(6)
}
```

**Discrepâncias:**
- ✅ Tipos de movimentação incluem ESTORNO_* para cada tipo
- ✅ Campo `movimentacaoOrigemId` para rastrear estornos
- ✅ Não existe campo `observacoes` direto na movimentação

## 2. APIS E ENDPOINTS

### 2.1 Colaboradores
**Endpoints reais:**
- POST /api/colaboradores - Criar colaborador
- GET /api/colaboradores - Listar com filtros e paginação
- GET /api/colaboradores/:id - Obter por ID

**Discrepâncias:**
- ✅ Não há endpoint PUT para atualizar colaborador
- ✅ Não há endpoint DELETE para excluir colaborador
- ✅ Filtro `semFicha` disponível para listar apenas colaboradores sem ficha

### 2.2 Contratadas
**Endpoints reais:**
- POST /api/contratadas - Criar contratada
- GET /api/contratadas - Listar com filtros
- GET /api/contratadas/estatisticas - Estatísticas gerais
- GET /api/contratadas/buscar - Buscar por nome (limitado a 10 resultados)
- GET /api/contratadas/:id - Obter por ID
- PUT /api/contratadas/:id - Atualizar contratada
- DELETE /api/contratadas/:id - Excluir contratada

**Discrepâncias:**
- ✅ Endpoint de estatísticas retorna `topContratadas` com total de colaboradores
- ✅ Endpoint de busca é separado e limitado
- ✅ Response de listagem tem estrutura diferente: `{ contratadas: [], total: number }`

### 2.3 Fichas EPI
**Endpoints reais:**
- POST /api/fichas-epi - Criar ficha
- POST /api/fichas-epi/criar-ou-ativar - Criar ou reativar ficha existente
- GET /api/fichas-epi - Listar com paginação
- GET /api/fichas-epi/estatisticas - Estatísticas por almoxarifado
- GET /api/fichas-epi/:id - Obter ficha
- PUT /api/fichas-epi/:id/ativar - Ativar ficha
- PUT /api/fichas-epi/:id/inativar - Inativar ficha
- PUT /api/fichas-epi/:id/suspender - Suspender ficha
- POST /api/fichas-epi/:id/entregas - Criar entrega
- GET /api/fichas-epi/:id/entregas - Listar entregas da ficha

**Discrepâncias:**
- ✅ Existe endpoint para criar ou ativar ficha
- ✅ Suspender ficha existe mas não está no enum de status
- ✅ Filtro `devolucaoPendente` para fichas com devolução em atraso

### 2.4 Estoque
**Endpoints reais:**
- GET /api/estoque/posicao - Relatório de posição
- GET /api/estoque/kardex/:almoxarifadoId/:tipoEpiId - Kardex do item
- GET /api/estoque/analise-giro - Análise de giro
- POST /api/estoque/ajuste-direto - Realizar ajuste
- POST /api/estoque/inventario - Executar inventário completo
- GET /api/estoque/resumo - Resumo para dashboard
- GET /api/estoque/alertas - Alertas de estoque baixo
- GET /api/estoque/itens - Listar itens com paginação
- GET /api/estoque/almoxarifados - Listar almoxarifados
- GET /api/estoque/configuracao-filtros - Config de tabs do frontend

**Discrepâncias:**
- ✅ Endpoint de configuração-filtros retorna se deve exibir tab "Sem Estoque"
- ✅ Não existe endpoint `/api/estoque/movimentacoes`
- ✅ Kardex requer almoxarifadoId E tipoEpiId na URL

### 2.5 Notas de Movimentação
**Endpoints reais:**
- POST /api/notas-movimentacao - Criar nota
- GET /api/notas-movimentacao - Listar com paginação
- GET /api/notas-movimentacao/resumo - Resumo otimizado
- GET /api/notas-movimentacao/rascunhos - Apenas rascunhos
- GET /api/notas-movimentacao/:id - Obter nota
- PUT /api/notas-movimentacao/:id - Atualizar observações
- DELETE /api/notas-movimentacao/:id - Excluir rascunho
- POST /api/notas-movimentacao/:id/itens - Adicionar item
- PUT /api/notas-movimentacao/:id/itens/:tipoEpiId - Atualizar quantidade
- DELETE /api/notas-movimentacao/:id/itens/:itemId - Remover item
- POST /api/notas-movimentacao/:id/concluir - Concluir nota
- POST /api/notas-movimentacao/:id/cancelar - Cancelar nota

**Discrepâncias:**
- ✅ Endpoint `/resumo` retorna formato otimizado para tabelas
- ✅ Tipos de nota: ENTRADA, TRANSFERENCIA, DESCARTE, ENTRADA_AJUSTE, SAIDA_AJUSTE
- ✅ Status: RASCUNHO, CONCLUIDA, CANCELADA

## 3. CONFIGURAÇÕES E ENUMS

### 3.1 Status e Enums Reais

**StatusTipoEpiEnum:**
- ATIVO
- DESCONTINUADO

**CategoriaEpiEnum:**
- PROTECAO_CABECA
- PROTECAO_OLHOS_ROSTO
- PROTECAO_OUVIDOS
- PROTECAO_MAOS_BRACCOS
- PROTECAO_PES
- PROTECAO_RESPIRATORIA
- PROTECAO_CLIMATICA
- ROUPA_APROXIMACAO

**StatusEstoqueItemEnum:**
- DISPONIVEL
- AGUARDANDO_INSPECAO
- QUARENTENA
(Não existe SEM_ESTOQUE)

**TipoNotaEnum:**
- ENTRADA
- TRANSFERENCIA
- DESCARTE
- ENTRADA_AJUSTE
- SAIDA_AJUSTE

**StatusNotaEnum:**
- RASCUNHO
- CONCLUIDA
- CANCELADA

**TipoMovimentacaoEnum:**
- ENTRADA_NOTA
- SAIDA_ENTREGA
- ENTRADA_DEVOLUCAO
- SAIDA_TRANSFERENCIA
- ENTRADA_TRANSFERENCIA
- SAIDA_DESCARTE
- AJUSTE_POSITIVO
- AJUSTE_NEGATIVO
- ESTORNO_* (para cada tipo acima)

**StatusFichaEnum:**
- ATIVA
- INATIVA
(Não existe SUSPENSA)

**StatusEntregaEnum:**
- PENDENTE_ASSINATURA
- ASSINADA
- CANCELADA

**StatusEntregaItemEnum:**
- COM_COLABORADOR
- DEVOLVIDO

## 4. ENTIDADES NÃO DOCUMENTADAS

### 4.1 Usuario
```typescript
model Usuario {
  id        String   @id @default(uuid())
  nome      String   @db.VarChar(255)
  email     String   @unique @db.VarChar(255)
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
}
```

### 4.2 UnidadeNegocio
```typescript
model UnidadeNegocio {
  id        String   @id @default(uuid())
  nome      String   @db.VarChar(255)
  codigo    String   @unique @db.VarChar(50)
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
}
```

### 4.3 TipoEPI
```typescript
model TipoEPI {
  id              String              @id
  nomeEquipamento String              @map("nome_equipamento") @db.VarChar(255)
  numeroCa        String              @unique @map("numero_ca") @db.VarChar(50)
  descricao       String?             @db.Text
  categoria       CategoriaEpiEnum    @default(PROTECAO_CABECA)
  vidaUtilDias    Int?                @map("vida_util_dias")
  status          StatusTipoEpiEnum   @default(ATIVO)
  createdAt       DateTime            @default(now()) @map("created_at") @db.Timestamptz(6)
}
```

### 4.4 Configuracao
```typescript
model Configuracao {
  chave     String  @id @db.VarChar(255)
  valor     String  @db.Text
  descricao String? @db.Text
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
}
```

## 5. DIFERENÇAS CRÍTICAS

1. **Ficha EPI é única por colaborador** - Não existe múltiplas fichas por colaborador
2. **ContratadaId é opcional** - Colaborador pode não ter contratada vinculada
3. **Não existe status SEM_ESTOQUE** - Sistema usa configuração para permitir estoque negativo
4. **UnidadeNegocio é obrigatória** - Toda entidade está vinculada a uma unidade
5. **Responsável é sempre Usuario** - Não Colaborador
6. **Assinatura digital** - Sistema prevê links de assinatura nas entregas
7. **Estorno de movimentações** - Sistema tem tipos específicos para estorno
8. **Custo unitário é opcional** - Pode não ter valor definido

## 6. RECOMENDAÇÕES

1. **Atualizar tipos no frontend** para refletir estruturas reais
2. **Remover referências a campos inexistentes** (email em colaborador, etc.)
3. **Ajustar enums** para valores reais do backend
4. **Implementar lógica de UnidadeNegocio** no frontend
5. **Adaptar fluxo de fichas** para modelo de ficha única por colaborador
6. **Revisar status de estoque** - remover SEM_ESTOQUE ou implementar via lógica
7. **Atualizar endpoints** para URLs reais documentadas

## 7. ENDPOINTS FALTANTES NO FRONTEND

Baseado na análise, estes endpoints existem no backend mas podem não estar implementados no frontend:

1. GET /api/contratadas/estatisticas
2. GET /api/contratadas/buscar
3. POST /api/fichas-epi/criar-ou-ativar
4. GET /api/fichas-epi/devolucoes/historico
5. GET /api/estoque/analise-giro
6. POST /api/estoque/inventario
7. GET /api/estoque/configuracao-filtros
8. GET /api/notas-movimentacao/resumo
9. Todos os endpoints de devolução e cancelamento de devolução

## 8. FORMATO DE RESPOSTA PADRÃO

Todas as respostas seguem o padrão:
```typescript
{
  success: boolean,
  data: T | T[] | null,
  message?: string,
  pagination?: {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    hasNext: boolean,
    hasPrev: boolean
  }
}
```

## Conclusão

As discrepâncias são significativas e requerem ajustes no frontend para alinhar com a realidade do backend. O modelo de dados é mais complexo do que o documentado, com entidades adicionais (Usuario, UnidadeNegocio) e relacionamentos diferentes do esperado.