# Plano de Refatoração da API DataLife EPI (Backend for Frontend)

## Filosofia Central: Simplificar o Frontend

A API atual é robusta, mas apresenta redundâncias e oportunidades de otimização. O plano a seguir visa consolidar endpoints, remover os que não são utilizados e enriquecer as respostas para que o frontend tenha o mínimo de trabalho possível, seguindo o princípio de **Backend for Frontend (BFF)**.

---

### 1. Módulo de Fichas de EPI (`/api/fichas-epi`)

Este é o módulo mais crítico e onde a otimização trará mais benefícios.

#### **Ação: UNIFICAR Listagem de Fichas**

*   **Endpoints Afetados:**
    *   `GET /api/fichas-epi` (Básico)
    *   `GET /api/fichas-epi/list-enhanced` (Otimizado)
*   **Proposta:**
    1.  **REMOVER** o endpoint `GET /api/fichas-epi`.
    2.  **PROMOVER** `GET /api/fichas-epi/list-enhanced` para ser o novo `GET /api/fichas-epi`.
*   **Justificativa:** O endpoint `/list-enhanced` já segue a filosofia BFF, fornecendo dados pré-processados (`statusDisplay`, contadores) que simplificam a renderização no frontend. Manter dois endpoints para listar o mesmo recurso é confuso e gera código morto. A rota principal de listagem deve ser sempre a mais otimizada.

#### **Aç��o: MANTER E PROMOVER a Ficha Completa**

*   **Endpoint Afetado:** `GET /api/fichas-epi/:id/complete`
*   **Proposta:**
    1.  Tornar este o **único** endpoint utilizado pelo frontend para carregar a tela de detalhes de uma ficha.
*   **Justificativa:** Este endpoint é um exemplo perfeito de BFF. Ele retorna todos os dados necessários para a tela de detalhes (dados do colaborador, equipamentos em posse com status, histórico formatado, estatísticas) em uma **única chamada**. Isso evita que o frontend precise fazer múltiplas chamadas, melhorando drasticamente a performance.

#### **Ação: AVALIAR REDUNDÂNCIA do Histórico**

*   **Endpoint Afetado:** `GET /api/fichas-epi/:id/historico`
*   **Proposta:**
    1.  Verificar se a interface realmente precisa de uma visualização paginada e filtrada *apenas* do histórico.
    2.  Se o histórico exibido na tela de detalhes (provido pelo `/complete`) for suficiente, **REMOVER** este endpoint.
*   **Justificativa:** O endpoint `/complete` já retorna o histórico. Manter um endpoint separado para o mesmo dado só se justifica se houver uma tela específica de "Auditoria de Histórico da Ficha" com filtros complexos.

---

### 2. Módulo de Notas de Movimentação (`/api/notas-movimentacao`)

#### **Ação: UNIFICAR Listagem de Notas**

*   **Endpoints Afetados:**
    *   `GET /api/notas-movimentacao` (Básico)
    *   `GET /api/notas-movimentacao/resumo` (Otimizado)
*   **Proposta:**
    1.  **REMOVER** o endpoint `GET /api/notas-movimentacao/resumo`.
    2.  **INCORPORAR** os campos resumidos (`responsavel_nome`, `almoxarifado_nome`, `total_itens`, `valor_total`) na resposta do endpoint principal `GET /api/notas-movimentacao`.
*   **Justificativa:** A tela de listagem de notas precisa de dados resumidos para exibir em uma tabela. A API deve fornecer os dados prontos para exibição, evitando que o frontend precise fazer processamento adicional.

---

### 3. Módulo de Estoque (`/api/estoque`)

#### **Ação: MANTER E PROMOVER a Configuração Dinâmica**

*   **Endpoint Afetado:** `GET /api/estoque/configuracao-filtros`
*   **Proposta:**
    1.  Manter este endpoint como **obrigatório** para a renderização da página de estoque.
*   **Justificativa:** Este endpoint é um excelente exemplo de como a API pode guiar a UI. Ele informa ao frontend quais abas/filtros devem ser exibidos com base em uma regra de negócio do backend (`PERMITIR_ESTOQUE_NEGATIVO`), centralizando a lógica de negócio.

---

### 4. Entidades Core (Contratadas, Colaboradores, etc.)

#### **Ação: REMOVER Endpoints de Busca Específicos**

*   **Endpoints Afetados:**
    *   `GET /api/contratadas/buscar`
*   **Proposta:**
    1.  **REMOVER** o endpoint `GET /api/contratadas/buscar`.
    2.  Adicionar o parâmetro de query `?nome=` ao endpoint principal `GET /api/contratadas`.
*   **Justificativa:** Um endpoint de recurso RESTful deve suportar filtros via query parameters. Ter um endpoint separado para busca é redundante e complica a API.

#### **Ação: PADRONIZAR Formato de Resposta dos Usuários**

*   **Endpoint Afetado:** `GET /api/usuarios`
*   **Proposta:**
    1.  **ALTERAR** a resposta de `{ "items": [...], "pagination": {...} }` para o formato padrão da API: `{ "success": true, "data": [...], "pagination": {...} }`.
*   **Justificativa:** Consistência é fundamental. Todos os endpoints de listagem paginada devem retornar a mesma estrutura para evitar que o frontend precise escrever código de tratamento de caso especial.

---

### **Resumo do Plano de Ação para a API**

| Ação | Endpoint(s) | Motivo Principal |
| :--- | :--- | :--- |
| **UNIFICAR** | `GET /fichas-epi` e `GET /fichas-epi/list-enhanced` | Remover redundância e promover a rota otimizada. |
| **MANTER** | `GET /fichas-epi/:id/complete` | Endpoint BFF exemplar, evita múltiplas chamadas no frontend. |
| **REMOVER** | `GET /fichas-epi/:id/historico` | Provavelmente redundante, já que `/complete` inclui o histórico. |
| **UNIFICAR** | `GET /notas-movimentacao` e `GET /notas-movimentacao/resumo` | Fornecer dados prontos para exibição na listagem principal. |
| **REMOVER** | `GET /contratadas/buscar` | Centralizar a busca como um filtro no endpoint de listagem principal. |
| **PADRONIZAR** | `GET /api/usuarios` | Garantir que todos os endpoints retornem a mesma estrutura de dados. |
| **MANTER** | `GET /estoque/configuracao-filtros` | Manter a API guiando a lógica da UI, simplificando o frontend. |
