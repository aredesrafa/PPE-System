# 🎯 Plano de Refatoração Unificado DataLife EPI Frontend - v2.0

**Data**: 13/07/2025  
**Autor**: Hive Mind Analysis System (Revisado e Aprimorado)
**Versão**: 2.0

## 1. 📊 Resumo Executivo

### 1.1. Situação Atual
- **Build Quebrado**: **73 erros TypeScript** críticos impedem qualquer build de produção.
- **Código Inflado**: **~15% de código morto** e duplicações, totalizando mais de 3.000 linhas desnecessárias.
- **Performance Degradada**: Bundle inicial de **3.2MB**, sem otimizações como code splitting ou lazy loading.
- **Arquitetura Inconsistente**: Apenas **30% da codebase** segue o padrão Container/Presenter, gerando caos na manutenção.
- **Dependência de Mocks**: Violação da regra fundamental do projeto ao manter **dados mockados** no código-fonte.
- **Redundância de API**: **30-40% dos endpoints** da API são redundantes, não utilizados ou inconsistentes.

### 1.2. Impacto Esperado da Refatoração
- 📉 **Redução de Código > 60%**: Eliminação de ~15.000 linhas, simplificando drasticamente a codebase.
- ⚡ **Performance 3x Melhor**: Tempo de carregamento inicial drasticamente reduzido.
- 📦 **Bundle Size < 1MB**: Redução de **~70%** no tamanho do bundle, de 3.2MB para menos de 1MB.
- ✅ **Build 100% Funcional**: **0 erros TypeScript**, permitindo a implantação contínua.
- 🏗️ **Consistência Arquitetural Total**: 100% de adesão ao padrão Container/Presenter.
- 🔗 **API Simplificada**: Redução de 30% na superfície da API, com respostas padronizadas.

### 1.3. ROI Estimado
- **Curto Prazo (30 dias)**: Build de produção funcional, performance 3x melhor, código 60% menor.
- **Médio Prazo (90 dias)**: Redução de 50% nos bugs reportados, 70% mais agilidade no desenvolvimento de novas features.
- **Longo Prazo (180 dias)**: Produtividade da equipe duplicada, onboarding 3x mais rápido e manutenção simplificada.

---

## 2. 🔍 Análise Detalhada dos Problemas

*(Esta seção detalha os pontos do resumo, como os arquivos a serem deletados, exemplos de complexidade, etc., conforme o plano original)*

### 2.1. Código Morto e Duplicações
- **Arquivos para Deletar**: `FichasContainer.fixed.svelte`, `StatusBadge.temp.svelte`, `notesAdapter.ts`, `unifiedDataAdapter.ts`, `mockData.ts`, `HistoryModal.svelte`.
- **Lógica Duplicada**: 3 implementações de stores de paginação, validações de CPF/CNPJ repetidas, services sobrepostos (`estoqueItensAdapter` vs `inventoryQueryAdapter`).

### 2.2. Complexidade e Workarounds
- **Arquivos Críticos**: `types.ts` (2.699 linhas), `paginatedStore.ts` (1.137 linhas), `NotesDetailDrawer.svelte` (1.040 linhas).
- **Workarounds**: Mocks em produção, prefixos de API v1, múltiplas chamadas de API para dados que poderiam ser unificados.

### 2.3. Performance e Arquitetura
- **Bundle Size**: `types.ts` importado globalmente.
- **API Calls**: Falta de cache para dados estáticos (contratadas, tipos de EPI).
- **Padrões Mistos**: 70% dos componentes são monolíticos, misturando UI e lógica de negócio.

### 2.4. API Backend
- **Endpoints Redundantes**: `GET /api/contratadas/buscar`, `GET /api/fichas-epi/list-enhanced`.
- **Respostas Inconsistentes**: Endpoint `/usuarios` com formato de resposta diferente do padrão.

---

## 3. 📋 Plano de Execução em Fases para Agentes de IA

### 🚨 Pré-requisito: Estratégia de Testes de Segurança
Antes de iniciar a Fase 1, é crucial criar uma rede de segurança para evitar regressões.

**Tarefa Única:**
1.  **Criar Testes de Caracterização (Snapshot)**: Para os componentes e fluxos mais críticos (Fichas, Notas, Estoque), gere snapshots da UI.
    - **Ferramenta Sugerida**: `vitest` com `jest-serializer-svelte`.
    - **Objetivo**: Garantir que a UI não mude inesperadamente após a refatoração de um componente.

---

### 🚀 FASE 1: Quick Wins (1-2 dias)
**Objetivo**: Limpar código morto, resolver erros críticos e desbloquear o build.
**Risco**: Baixo | **Impacto**: Alto

**Tarefas (Comandos para IA):**
1.  **Deletar arquivos não utilizados**:
    ```bash
    rm src/lib/components/containers/FichasContainer.fixed.svelte src/lib/components/ui/StatusBadge.temp.svelte src/lib/services/entity/notesAdapter.ts src/lib/services/unified/unifiedDataAdapter.ts src/lib/services/mockData.ts src/lib/components/presenters/HistoryModal.svelte
    ```
2.  **Remover todo código mock**: Execute uma busca global por `const mockData` e `createMock` e remova todas as ocorrências e seus usos.
3.  **Corrigir erros TypeScript críticos**:
    - Execute `npm run check` para listar todos os 73 erros.
    - Siga a estratégia: 1º corrija erros de import/export. 2º adicione tipos explícitos que faltam (`EPIDisponivel`, `Usuario`). 3º Use `any` como último recurso *temporário* apenas para desbloquear o build, marcando com `// TODO: Refatorar tipo`.
4.  **Padronizar `StatusBadge`**: Mantenha a implementação principal e delete a duplicata (`.temp.`).
5.  **Configurar ESLint para Prevenir Mocks**: Adicione uma regra no `.eslintrc.cjs` para proibir a declaração de variáveis com o nome `mockData`.

**Entregáveis**: ✅ Build sem erros (`npm run build` bem-sucedido), ✅ -3000 linhas de código, ✅ Testes de caracterização iniciais.

---

### 🏗️ FASE 2: Consolidação de Stores (3-4 dias)
**Objetivo**: Simplificar o gerenciamento de estado, eliminando redundância.
**Risco**: Médio | **Impacto**: Alto

**Tarefas:**
1.  **Unificar `paginatedStore`**: Refatore as 3 implementações em uma única função `createPaginatedStore<T>` genérica e robusta.
2.  **Centralizar Validações**: Crie `src/lib/utils/brazilianValidation.ts` e mova todas as lógicas de validação de CPF/CNPJ para lá.
3.  **Implementar Cache Service**: Crie `src/lib/services/core/cacheService.ts` para cachear em memória dados pouco voláteis (Contratadas, Colaboradores, Tipos de EPI) com uma estratégia de TTL (Time-to-Live).

**Entregáveis**: ✅ 1 implementação de `paginatedStore`, ✅ Cache service funcional, ✅ -40% de código nos stores.

---

### 🎨 FASE 3: Migração UI Pattern (5-7 dias)
**Objetivo**: Completar a migração Modal → Drawer e quebrar componentes gigantes.
**Risco**: Médio | **Impacto**: Médio

**Tarefas:**
1.  **Concluir Migração para Drawers**: Converta todos os `ModalPresenter` restantes em componentes `Drawer`.
2.  **Quebrar Componentes Grandes**: Refatore `NotesDetailDrawer` (1040 linhas) e `NotesFormModalPresenter` (947 linhas) em 5 e 4 componentes menores, respectivamente, cada um com uma única responsabilidade.
3.  **Implementar Lazy Loading nas Rotas**: Use `const Componente = lazy(() => import(...))` para todos os componentes pesados que não são necessários no carregamento inicial da página.

**Entregáveis**: ✅ 0 Modals legados, ✅ Nenhum componente com mais de 300 linhas, ✅ Lazy loading implementado.

---

### 🏛️ FASE 4: Arquitetura Container/Presenter (7-10 dias)
**Objetivo**: Atingir 100% de adesão ao padrão arquitetural.
**Risco**: Alto | **Impacto**: Alto

**Tarefas:**
1.  **Migrar 70% Restante**: Para cada feature (Estoque, Relatórios, etc.), separe os componentes monolíticos em `Container` (lógica, chamadas de API) e `Presenter` (UI pura, recebe dados via props).
2.  **Consolidar Services**: Unifique a lógica sobreposta entre `fichaQueryAdapter`, `inventory adapters` e `process lifecycle`.
3.  **Criar Composables Reutilizáveis**: Extraia lógicas de UI complexas e reutilizáveis para `composables`, como `usePagination` ou `useFilters`.

**Entregáveis**: ✅ 100% da codebase em Container/Presenter, ✅ Services com responsabilidades únicas.

---

### ⚡ FASE 5: Otimização de Performance (3-5 dias)
**Objetivo**: Atingir a meta de <1MB de bundle e 3x mais performance.
**Risco**: Baixo | **Impacto**: Alto

**Tarefas:**
1.  **Dividir `types.ts`**: Quebre o arquivo monolítico `types.ts` em arquivos por domínio (`types/fichas.ts`, `types/estoque.ts`, etc.) para permitir o code splitting do Vite.
2.  **Integrar Cache Service**: Use o `cacheService` criado na Fase 2 em todos os `apiClient` para as chamadas de dados estáticos.
3.  **Otimizar `vite.config.ts`**: Configure `manualChunks` no Rollup para agrupar `vendor` (svelte, flowbite) e outros módulos grandes separadamente.
4.  **Adicionar Service Worker**: Implemente um Service Worker básico para cache offline de assets estáticos.

**Entregáveis**: ✅ Bundle inicial < 1MB, ✅ Lighthouse score > 90, ✅ 70% menos chamadas de API duplicadas.

---

### 🔗 FASE 6: Sincronia com Backend e Cleanup (2-3 dias)
**Objetivo**: Simplificar a API e criar um contrato forte entre frontend e backend.
**Risco**: Médio | **Impacto**: Médio

**Tarefas:**
1.  **Definir Contrato OpenAPI**: Colabore com a equipe de backend para gerar um arquivo `openapi.json` que sirva como fonte da verdade para a API.
2.  **Gerar Tipos a Partir do Contrato**: Use uma ferramenta como `openapi-typescript` para gerar automaticamente os tipos do frontend a partir do `openapi.json`. Isso substitui a necessidade de manter `types.ts` manualmente.
3.  **Executar Cleanup da API (Backend)**: Remover endpoints duplicados e padronizar todas as respostas para o formato `{ success, data, pagination?, message? }`.
4.  **Atualizar Frontend**: Aponte todas as chamadas do `apiClient` para os endpoints corretos e simplificados.

**Entregáveis**: ✅ Tipos do frontend gerados automaticamente, ✅ -30% de endpoints na API, ✅ Frontend e Backend sincronizados por um contrato.

---

## 4. 🛠️ Execução e Métricas de Sucesso

### 4.1. Diretrizes para Agentes AI
1.  **Execução Sequencial**: Execute as fases na ordem definida. Não pule etapas.
2.  **Commits Atômicos**: Faça um commit após cada tarefa concluída com uma mensagem clara (ex: `refactor(stores): unify paginatedStore implementations`).
3.  **Verificação Contínua**: Rode `npm run check` e os testes de snapshot após cada mudança significativa.
4.  **Documentação Viva**: Ao final, execute a tarefa final:
    - **Tarefa Final**: Atualize o `GEMINI.md` com os novos padrões arquiteturais, comandos e links para a documentação da API (OpenAPI).

### 4.2. Métricas de Sucesso Finais
- [ ] **0 erros** em `npm run check`.
- [ ] **Bundle inicial < 1MB** (verificado com `npx vite-bundle-visualizer`).
- [ ] **Lighthouse Performance Score > 90**.
- [ ] **100% dos componentes** seguindo o padrão Container/Presenter.
- [ ] **0 ocorrências** de `mockData` no código.
- [ ] **Build de produção (`npm run build`) funcional e implantado**.
- [ ] **`GEMINI.md` atualizado**.
