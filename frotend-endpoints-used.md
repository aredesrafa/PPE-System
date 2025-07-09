# Endpoints da API Utilizados pelo Frontend

Este documento lista todos os endpoints da API que são consumidos pelo frontend da aplicação DataLife EPI, com base em uma análise estática do código-fonte na branch `refactor/architectural-cleanup`.

## Autenticação e Configuração

- `GET /configuration`: Obtém configurações de negócio para a aplicação.
- `GET /health`: Verifica a saúde geral da API.
- `POST /api/health/deploy-db`: Endpoint de utilidade para implantar o banco de dados.

## Gestão de Entidades

### Contratadas

- `GET /contratadas`: Lista todas as empresas contratadas com filtros e paginação.
- `GET /contratadas/{id}`: Obtém os detalhes de uma contratada específica.
- `POST /contratadas`: Cria uma nova empresa contratada.
- `PUT /contratadas/{id}`: Atualiza os dados de uma contratada.
- `DELETE /contratadas/{id}`: Remove uma contratada (soft delete).
- `GET /contratadas/stats`: Obtém estatísticas gerais sobre as contratadas.
- `GET /contratadas/buscar`: Busca contratadas por nome ou CNPJ.

### Colaboradores

- `GET /colaboradores`: Lista todos os colaboradores com filtros e paginação.
- `GET /colaboradores/{id}`: Obtém os detalhes de um colaborador específico.
- `POST /colaboradores`: Cria um novo colaborador.
- `PUT /colaboradores/{id}`: Atualiza os dados de um colaborador.
- `DELETE /colaboradores/{id}`: Remove um colaborador (soft delete).
- `GET /contratadas/{contratadaId}/colaboradores`: Lista todos os colaboradores de uma contratada específica.

### Tipos de EPI (Catálogo)

- `GET /tipos-epi`: Lista todos os tipos de EPI com filtros e paginação.
- `GET /tipos-epi/{id}`: Obtém os detalhes de um tipo de EPI.
- `POST /tipos-epi`: Cria um novo tipo de EPI no catálogo.
- `PUT /tipos-epi/{id}`: Atualiza um tipo de EPI.
- `DELETE /tipos-epi/{id}`: Remove um tipo de EPI.
- `GET /tipos-epi/search`: Busca um tipo de EPI pelo número do CA.
- `GET /tipos-epi/mais-utilizados`: Retorna os tipos de EPI mais utilizados.

### Almoxarifados

- `GET /almoxarifados`: Lista todos os almoxarifados.
- `GET /almoxarifados/{id}`: Obtém os detalhes de um almoxarifado.
- `POST /almoxarifados`: Cria um novo almoxarifado.
- `PUT /almoxarifados/{id}`: Atualiza um almoxarifado.
- `DELETE /almoxarifados/{id}`: Remove um almoxarifado.

### Usuários

- `GET /usuarios`: Lista os usuários do sistema (usado para preencher filtros).

## Gestão de Estoque

- `GET /estoque/itens`: Lista itens em estoque com filtros e paginação.
- `GET /estoque/itens/{id}`: Obtém os detalhes de um item de estoque específico.
- `GET /estoque/itens/{itemId}/movimentacoes`: Retorna o histórico de movimentações (Kardex) de um item.
- `POST /estoque/movimentacoes`: Registra uma nova movimentação de estoque (entrada, saída, ajuste).
- `POST /estoque/ajuste-direto`: Realiza um ajuste direto na quantidade de um item.
- `POST /estoque/ajuste-direto/simular`: Simula um ajuste de estoque.
- `POST /estoque/inventario`: Processa um inventário completo com múltiplos ajustes.
- `POST /estoque/inventario/validar-divergencias`: Valida as divergências de um inventário.
- `POST /estoque/transferencias`: Registra uma transferência de itens entre almoxarifados.
- `POST /estoque/estornos`: Cria um estorno para uma movimentação de estoque.
- `GET /estoque/consolidado`: Retorna o estoque consolidado por tipo de EPI e almoxarifado.
- `GET /estoque/baixo`: Lista itens que estão com estoque baixo.
- `GET /estoque/vencendo`: Lista itens de estoque próximos da data de vencimento.
- `GET /estoque/posicao`: Gera um relatório detalhado da posição de estoque.
- `GET /estoque/resumo`: Retorna indicadores e métricas gerais do estoque.
- `GET /estoque/alertas`: Lista itens que requerem atenção (estoque baixo, crítico, etc.).
- `GET /estoque/ajustes/historico`: Retorna o histórico de ajustes de estoque.
- `GET /estoque/analise-giro`: Analisa o giro de estoque por período.

## Fichas de EPI e Entregas (Processos)

### Fichas de EPI

- `GET /fichas-epi`: Lista todas as fichas de EPI com filtros e paginação.
- `GET /fichas-epi/{id}`: Obtém os detalhes completos de uma ficha.
- `POST /fichas-epi`: Cria uma nova ficha de EPI para um colaborador.
- `POST /fichas-epi/criar-ou-ativar`: Cria uma nova ficha ou reativa uma existente.
- `PUT /fichas-epi/{id}`: Atualiza os dados de uma ficha.
- `PUT /fichas-epi/{id}/ativar`: Ativa uma ficha inativa ou suspensa.
- `PUT /fichas-epi/{id}/inativar`: Inativa uma ficha.
- `PUT /fichas-epi/{id}/suspender`: Suspende uma ficha temporariamente.
- `GET /fichas-epi/estatisticas`: Retorna estatísticas gerais sobre as fichas.

### Entregas

- `GET /fichas-epi/{id}/entregas`: Lista todas as entregas de uma ficha específica.
- `POST /fichas-epi/{id}/entregas`: Cria uma nova entrega de EPI para uma ficha.
- `POST /fichas-epi/entregas/validar`: Valida se uma nova entrega pode ser realizada.
- `GET /fichas-epi/colaborador/{colaboradorId}/entregas`: Lista todas as entregas de um colaborador.
- `GET /fichas-epi/colaborador/{colaboradorId}/posse-atual`: Retorna os EPIs atualmente em posse de um colaborador.

### Devoluções

- `POST /fichas-epi/entregas/{entregaId}/devolucao`: Processa a devolução de itens de uma entrega.
- `POST /fichas-epi/entregas/{entregaId}/devolucao/validar`: Valida se uma devolução pode ser processada.
- `POST /fichas-epi/entregas/{entregaId}/devolucao/cancelar`: Cancela uma devolução já processada.
- `GET /fichas-epi/entregas/{entregaId}/devolucao/validar-cancelamento`: Valida se o cancelamento de uma devolução é permitido.
- `GET /fichas-epi/devolucoes/historico`: Retorna o histórico de devoluções.
- `GET /fichas-epi/devolucoes/cancelamentos/historico`: Retorna o histórico de cancelamentos de devolução.
- `POST /devolucoes/process-batch`: Processa múltiplas devoluções em lote.
- `GET /devolucoes/historico/{fichaId}`: Obtém o histórico de devoluções para uma ficha.
- `POST /devolucoes/{devolucaoId}/cancel`: Cancela uma devolução específica.

### Workflow de Entrega (Assinatura, etc.)

- `POST /entregas/{entregaId}/assinatura`: Registra a assinatura digital de uma entrega.
- `POST /entregas/{entregaId}/gerar-link-assinatura`: Gera um link externo para assinatura.
- `POST /entregas/{entregaId}/validar-assinatura`: Valida uma assinatura digital.
- `PATCH /entregas/{entregaId}/cancelar`: Cancela uma entrega pendente.
- `POST /entregas/{entregaId}/devolucao-parcial`: Processa a devolução de parte dos itens de uma entrega.
- `PATCH /entregas/{entregaId}/itens/{itemId}/perdido`: Marca um item como perdido ou danificado.
- `GET /entregas/{entregaId}/workflow-state`: Obtém o estado atual do workflow de uma entrega.
- `POST /entregas/{entregaId}/transition/{transition}`: Executa uma transição de estado manual no workflow.
- `GET /entregas/{entregaId}/workflow-history`: Retorna o histórico de transições de estado.
- `POST /entregas/{entregaId}/enviar-lembrete`: Envia um lembrete de assinatura pendente.
- `POST /entregas/{entregaId}/agendar-notificacao-devolucao`: Agenda uma notificação para a data de devolução.

## Notas de Movimentação

- `GET /notas-movimentacao/resumo`: Lista notas de movimentação com dados pré-processados.
- `GET /notas-movimentacao/rascunhos`: Lista apenas as notas em estado de rascunho.
- `GET /notas-movimentacao/{id}`: Obtém os detalhes de uma nota, incluindo seus itens.
- `POST /notas-movimentacao`: Cria uma nova nota de movimentação.
- `PUT /notas-movimentacao/{id}`: Atualiza os dados de uma nota em rascunho.
- `DELETE /notas-movimentacao/{id}`: Exclui uma nota em rascunho.
- `POST /notas-movimentacao/{id}/itens`: Adiciona um item a uma nota.
- `PUT /notas-movimentacao/{id}/itens/{tipoEpiId}`: Atualiza a quantidade de um item na nota.
- `DELETE /notas-movimentacao/{id}/itens/{itemId}`: Remove um item de uma nota.
- `POST /notas-movimentacao/{id}/concluir`: Processa uma nota, efetivando as movimentações de estoque.
- `POST /notas-movimentacao/{id}/cancelar`: Cancela uma nota, gerando estornos se necessário.
- `GET /notas-movimentacao/{id}/validar-cancelamento`: Valida se uma nota pode ser cancelada.

## Relatórios e Dashboards

- `GET /relatorios/dashboard`: Obtém os dados consolidados para o dashboard principal.
- `GET /relatorios/conformidade`: Gera o relatório de conformidade de EPIs.
- `GET /relatorios/uso-epis`: Gera o relatório de padrões de uso de EPIs.
- `GET /relatorios/movimentacoes`: Gera o relatório de movimentações de estoque.
- `GET /relatorios/saude-sistema`: Monitora o status geral e a performance da API.
- `GET /relatorios/descartes`: Gera o relatório de descarte de EPIs.
- `GET /relatorios/descartes/estatisticas`: Retorna estatísticas sobre os descartes.
- `GET /relatorios/auditoria`: Gera o relatório de auditoria de operações do sistema.
- `GET /entregas/metrics`: Retorna métricas sobre os processos de entrega.
- `GET /entregas/relatorio`: Gera um relatório de entregas por período.
- `GET /entregas/relatorio-devolucoes`: Gera um relatório de devoluções por período.
