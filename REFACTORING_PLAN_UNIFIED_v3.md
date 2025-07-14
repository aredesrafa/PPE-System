# 🎯 Plano de Refatoração Unificado DataLife EPI Frontend – v3.0

**Data**: 13/07/2025  
**Autor**: Cascade AI (consolidado a partir dos planos v1, v2 e API)  
**Versão**: 3.0 (FINAL)

> Este documento consolida, unifica e prioriza todas as ações de refatoração necessárias **do frontend _e_ da API** para tornar o projeto sustentável, performático e aderente a boas práticas de engenharia de software.

---

## 1. 📊 Resumo Executivo

| Métrica | Situação Atual | Meta v3 |
|---------|---------------|---------|
| Erros TypeScript | 73 | **0** |
| Código morto | ~15 % | **< 1 %** |
| Bundle Inicial | 3.2 MB | **< 1 MB** |
| Container/Presenter | 30 % | **100 %** |
| Endpoints redundantes | 30-40 % | **0 %** |
| Dados mockados | Presente | **Nenhum** |
| Lighthouse (perf) | 65 | **> 90** |

ROI estimado em 30 dias: build de produção funcional, performance 3×, manutenção 70 % mais fácil.

---

## 2. 🛡️ Pré-Requisitos (Gate 0)

1. **Testes de Caracterização** – Gerar snapshots Vitest/Jest dos fluxos críticos (Fichas, Notas, Estoque).
2. **Pipeline Automático** – Ativar `npm run check`, testes e build em cada PR.
3. **Checklist Semanal de Métricas** – Lighthouse, bundle-analyzer, cobertura de testes.

_Fases só começam após Gate 0 verde._

---

## 3. 🔄 Roadmap de Refatoração

| # | Fase | Duração | Risco | Impacto | Objetivo-Chave |
|---|------|---------|-------|---------|----------------|
| 1 | **Quick Wins** | 2 dias | Baixo | Alto | Build sem erros, remover lixo |
| 2 | **Stores & State** | 3-4 dias | Médio | Alto | State unificado + cache |
| 3 | **UI Pattern** | 2-3 dias | Médio | Médio | Modal→Drawer, Lazy loading |
| 4 | **Arquitetura C/P** | 7-10 dias | Alto | Alto | 100 % Container/Presenter |
| 5 | **Performance** | 3-4 dias | Baixo | Alto | < 1 MB + Lighthouse > 90 |
| 6 | **API Cleanup** | 2-3 dias | Médio | Médio | Contrato OpenAPI + –30 % endpoints |

### 3.1 Fase 1 – Quick Wins

- **Deletar arquivos não usados**: ver lista em `v2`.  
  Comando sugerido: `git rm $(cat scripts/unused_files.txt)`
- **Remover mocks externos**: `src/lib/services/mockData.ts`, instâncias em stores/adapters.
- **Eliminar fallbacks internos**: remover arrays mock/fallback embutidos em `paginatedStore.ts` e adapters (`*_adapter.ts`).
- **Corrigir 73 erros TS**: tipos faltantes em `EPIDisponivel`, `Usuario`, etc.
- **Padronizar `StatusBadge`** – manter único componente em `ui/StatusBadge.svelte`.

_Entregável_: `npm run check` sem erros.

### 3.2 Fase 2 – Stores & State

1. **Unificar PaginatedStore**: criar `createPaginatedStore<T>` em `stores/paginated.ts` e remover variantes antigas (`createAdvancedPaginatedStore`, `createSimplePaginatedStore`).
2. **Cache Service (TTL 5 min)** em `lib/services/cacheService.ts` e envolver `apiClient`.
3. **Consolidar tipos de API**: mover `ApiResponse`, `PaginatedResponse` etc. para `lib/types/api.ts` (base para tipos gerados via OpenAPI).
4. **Derived Stores Memoized** – reduzir derivações duplicadas.

_Entregável_: –40 % código em stores, redução de 3-4 chamadas duplicadas.

### 3.3 Fase 3 – UI Pattern Cleanup

- Completar migração **Modal → Drawer** onde apropriado.
- **Lazy Loading** de rotas pesadas: usar `const Page = lazy(() => import('...'))`.
- Componentes > 300 linhas devem ser quebrados.

_Entregável_: 0 modals legacy, todos componentes < 300 linhas.

### 3.4 Fase 4 – Arquitetura Container/Presenter

1. **Mapear Features ⟶ Pastas** (`routes/**/*`): para cada, criar `ComponentContainer.svelte` (lógica) e `ComponentPresenter.svelte` (UI).
2. **Service Consolidation** – `fichaQueryAdapter`, `inventory*` etc. ➜ serviços únicos por domínio.
3. **Composables Reutilizáveis** – `usePagination`, `useFilters`, `useDebounce` em `lib/composables/`.
4. **Type-safe API Client** – `createTypedClient<OpenAPISchema>()`.

_Entregável_: 100 % componentes seguem C/P, services SRP.

### 3.5 Fase 5 – Performance

- **Split de `types.ts`** em `types/*`.  
  Vite fará code-splitting.
- **Rollup ManualChunks** em `vite.config.ts` (vendor, types).
- **Service Worker** com Workbox para assets + offline shell.
- **Strip Logs** – instalar `vite-plugin-strip` e adicionar regra ESLint `no-console` (exceto `console.error`) para remover logs em builds.
- **Analyzer** – executar `npx vite-bundle-visualizer` cada PR.

_Entregável_: bundle < 1 MB, Lighthouse perf > 90.

### 3.6 Fase 6 – API Cleanup & Sync

_Backend_
1. **Unificar** `GET /fichas-epi` & `/list-enhanced` (ficar só otimizado).  
2. **Remover** `/buscar` endpoints (usar `?nome=`).
3. **Standard Response**: `{ success, data, pagination?, message? }`.
4. **OpenAPI contract** gerado e versionado em `api/openapi.json`.

_Frontend_
1. **openapi-typescript** para gerar tipos em `lib/types/openapi.d.ts`.
2. Atualizar `apiClient` para novos endpoints.
3. Remover prefixos `v1`.

_Entregável_: –30 % endpoints, integração tipada automática.

---

## 4. 🔬 Métricas de Sucesso (Gate Final)

- [ ] `npm run check` → 0 erros
- [ ] 100 % Container/Presenter (linters + revisão)
- [ ] 0 dados mockados no código
- [ ] Build produção (`npm run build`) gera artefato implantável
- [ ] `GEMINI.md` e docs atualizados

---

## 5. 🛠️ Diretrizes de Execução para Agentes AI

1. **Execução sequencial** – não pular fases sem ✅.
2. **Commits atômicos** – `refactor(store): unify paginated store`.
3. **Testes & CI** – rodar checagens após cada commit.
4. **Documentação Viva** – atualizar README/CHANGELOG ao final de cada fase.
5. **Revisões Manuais** – solicitar revisão de um dev humano ao fim das fases 2, 4 e 6.

---

## 6. 📑 Apêndices

### 6.1 Lista de Arquivos para Remoção (Fase 1)
```
src/lib/components/containers/FichasContainer.fixed.svelte
src/lib/components/ui/StatusBadge.temp.svelte
src/lib/services/entity/notesAdapter.ts
src/lib/services/unified/unifiedDataAdapter.ts
src/lib/services/mockData.ts
src/lib/components/presenters/HistoryModal.svelte
```

### 6.2 Estrutura Recomendada pós-Refatoração
```
src/
  lib/
    composables/
    services/
    stores/
    types/
    ui/
  routes/
    fichas/
      FichasContainer.svelte
      FichasPresenter.svelte
    ...
```

### 6.3 Comandos Úteis
```bash
# Checar TS + ESLint
yarn check

# Formatar
npm run format

# Build produção
npm run build

# Analyzer
npx vite-bundle-visualizer
```

---

*Este documento substitui integralmente os planos anteriores (`v1`, `v2`, `REFACTOR_API.md`).*  
