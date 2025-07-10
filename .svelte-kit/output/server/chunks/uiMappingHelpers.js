import { b as api } from "./Button.js";
class FichaQueryAdapter {
  /**
   * Buscar ficha completa com dados pré-processados pelo backend
   * Substitui 3-5 chamadas API por uma única
   */
  async getFichaComplete(fichaId) {
    console.log(
      "📋 FichaQueryAdapter: Buscando dados da ficha via endpoints específicos:",
      fichaId
    );
    try {
      const fichaBase = await api.get(
        `/fichas-epi/${fichaId}/complete`
      );
      console.log(
        "🔍 DEBUG Colaborador ID da ficha:",
        fichaBase?.data?.ficha?.colaborador?.id
      );
      const colaboradorId = fichaBase?.data?.ficha?.colaborador?.id;
      console.log("🔍 DEBUG Colaborador ID para devoluções:", colaboradorId);
      const [entregas, devolucoes] = await Promise.all([
        api.get(`/fichas-epi/${fichaId}/entregas`),
        // Tentar múltiplas formas de buscar devoluções
        this.buscarDevolucoes(fichaId, colaboradorId)
      ]);
      console.log("✅ Dados da ficha carregados via endpoints específicos");
      console.log("🔍 DEBUG Entregas do backend:", entregas?.data?.[0]);
      console.log("🔍 DEBUG Complete response:", {
        devolucoes: fichaBase?.data?.devolucoes?.length || 0,
        devolucoesData: fichaBase?.data?.devolucoes,
        fullStructure: Object.keys(fichaBase?.data || {})
      });
      let epiLookup = {};
      try {
        const episDisponiveis = await this.getEPIsDisponiveis();
        episDisponiveis.forEach((epi) => {
          if (epi.tipoEpiId) {
            epiLookup[epi.tipoEpiId] = {
              nomeEquipamento: epi.nomeEquipamento,
              numeroCA: epi.numeroCA,
              categoria: epi.categoria
            };
          }
        });
        console.log(
          "🔍 EPI Lookup criado:",
          Object.keys(epiLookup).length,
          "tipos EPI"
        );
      } catch (error) {
        console.warn("⚠️ Erro ao criar lookup de EPIs:", error);
      }
      if (entregas && entregas.data && Array.isArray(entregas.data)) {
        fichaBase.data.entregas = entregas.data.map((entrega) => {
          console.log("🔍 DEBUG Entrega individual:", {
            id: entrega.id,
            status: entrega.status,
            itens: entrega.itens?.length || 0,
            itemSample: entrega.itens?.[0],
            itemSampleFull: JSON.stringify(entrega.itens?.[0], null, 2)
          });
          return {
            id: entrega.id,
            numero: entrega.numero || entrega.id,
            dataEntrega: entrega.dataEntrega || entrega.createdAt,
            status: entrega.status || "PENDENTE_ASSINATURA",
            statusDisplay: {
              // Verificar os valores exatos que vêm do backend
              cor: entrega.status === "ASSINADA" || entrega.status === "assinada" ? "green" : "yellow",
              label: entrega.status === "ASSINADA" || entrega.status === "assinada" ? "Assinado" : "Pendente Assinatura"
            },
            acoes: entrega.status === "ASSINADA" || entrega.status === "assinada" ? ["imprimir"] : ["assinar", "cancelar"],
            // Se não está assinada, pode assinar ou cancelar
            itens: entrega.itens?.map((item) => {
              console.log(
                "🔍 DEBUG Item raw:",
                JSON.stringify(item, null, 2)
              );
              const epiFromLookup = epiLookup[item.tipoEpiId];
              const epiData = item.estoqueItem?.tipoEpi || item.tipoEpi || item.equipamento || epiFromLookup || item;
              const estoqueData = item.estoqueItem || item;
              console.log("🔍 DEBUG EPI Data (com lookup):", epiData);
              console.log(
                "🔍 DEBUG Lookup result para",
                item.tipoEpiId,
                ":",
                epiFromLookup
              );
              return {
                id: item.id,
                nomeEquipamento: epiData?.nomeEquipamento || epiData?.nome || epiData?.nome_equipamento || "Nome não disponível",
                numeroCA: epiData?.numeroCa || epiData?.numeroCA || epiData?.numero_ca || epiData?.ca || "N/A",
                categoria: epiData?.categoriaEpi || epiData?.categoria || epiData?.category || "Não informado",
                quantidade: item.quantidade || item.quantidadeEntregue || 1,
                status: item.status
                // 🔧 FIX: Preservar status do item (incluindo "DEVOLVIDO")
              };
            }) || []
          };
        });
      }
      console.log("🔄 Carregando devoluções via endpoint oficial...");
      if (colaboradorId) {
        console.log("🔄 Buscando devoluções para colaborador:", colaboradorId);
        try {
          const devolucoes2 = await this.getDevolucoesByColaborador(colaboradorId);
          const devolucoesFormatadas = devolucoes2.map((devolucao) => ({
            id: devolucao.entregaId || devolucao.id || `dev-${Date.now()}`,
            nomeEquipamento: devolucao.tipoEpiNome || devolucao.nomeEquipamento || "Nome não disponível",
            numeroCA: devolucao.tipoEpiCodigo || devolucao.numeroCA || "N/A",
            categoria: devolucao.tipoEpiCategoria || devolucao.categoria || "Não informado",
            quantidade: 1,
            dataDevolucao: devolucao.dataDevolucao || "Data não disponível",
            motivo: devolucao.motivoDevolucao || devolucao.motivo || "Motivo não informado",
            motivoDisplay: devolucao.motivoDevolucao || devolucao.motivo || "Motivo não informado",
            condicaoItem: devolucao.condicaoItem || "BOM",
            observacoes: devolucao.observacoes || "",
            status: "processada",
            podeProcessar: false,
            podeCancelar: false,
            entregaId: devolucao.entregaId,
            numeroSerie: devolucao.numeroSerie,
            dataEntrega: devolucao.dataEntrega,
            tempoUso: devolucao.diasUso || devolucao.tempoUso || 0,
            responsavel: devolucao.responsavelNome || devolucao.responsavel || "Não informado"
          }));
          fichaBase.data.devolucoes = devolucoesFormatadas;
          console.log(
            "✅ Devoluções carregadas via endpoint oficial:",
            devolucoesFormatadas.length
          );
          if (devolucoesFormatadas.length > 0) {
            console.log(
              "🔍 Primeira devolução formatada:",
              devolucoesFormatadas[0]
            );
          }
        } catch (error) {
          console.error("❌ Erro ao carregar devoluções via endpoint:", error);
          fichaBase.data.devolucoes = [];
        }
        let itensDevolvidos = 0;
        console.log("🔍 DEBUG: Verificando itens devolvidos nas entregas...");
        console.log(
          "🔍 DEBUG: Total de entregas:",
          fichaBase.data.entregas?.length || 0
        );
        fichaBase.data.entregas?.forEach((entrega, entregaIndex) => {
          console.log(
            `🔍 DEBUG: Entrega ${entregaIndex} (${entrega.id}) tem ${entrega.itens?.length || 0} itens`
          );
          entrega.itens?.forEach((item, itemIndex) => {
            console.log(
              `🔍 DEBUG: Item ${itemIndex} - status: "${item.status}"`
            );
            if (item.status === "DEVOLVIDO") {
              itensDevolvidos++;
              console.log(
                `✅ DEBUG: Item devolvido encontrado! Total: ${itensDevolvidos}`
              );
            }
          });
        });
        console.log(
          `📋 DEBUG: Total de itens com status DEVOLVIDO: ${itensDevolvidos}`
        );
        if (itensDevolvidos > 0) {
          console.log(
            "💡 PROBLEMA IDENTIFICADO: O endpoint /api/teste-devolucoes/historico-global retorna array vazio, mas existem devoluções nos dados das entregas"
          );
          console.log(
            "💡 SOLUÇÃO: Extrair devoluções dos dados das entregas até o endpoint ser corrigido"
          );
          const devolucoesExtraidas = [];
          fichaBase.data.entregas?.forEach((entrega) => {
            entrega.itens?.forEach((item) => {
              if (item.status === "DEVOLVIDO") {
                devolucoesExtraidas.push({
                  id: `dev-${item.id}-${Date.now()}`,
                  nomeEquipamento: item.nomeEquipamento,
                  numeroCA: item.numeroCA,
                  categoria: item.categoria,
                  quantidade: item.quantidade || 1,
                  dataDevolucao: entrega.dataEntrega,
                  // Usar data da entrega como aproximação
                  motivo: "Motivo não especificado",
                  motivoDisplay: "Motivo não especificado",
                  condicaoItem: "BOM",
                  observacoes: `Item devolvido da entrega ${entrega.numero}`,
                  status: "processada",
                  podeProcessar: false,
                  podeCancelar: false,
                  entregaId: entrega.id,
                  numeroSerie: `SER-${item.id}`,
                  dataEntrega: entrega.dataEntrega,
                  tempoUso: 0,
                  // Calcular depois se necessário
                  responsavel: "Sistema"
                });
              }
            });
          });
          if (devolucoesExtraidas.length > 0) {
            if (fichaBase.data.devolucoes.length === 0) {
              fichaBase.data.devolucoes = devolucoesExtraidas;
              console.log(
                `✅ SOLUÇÃO APLICADA: ${devolucoesExtraidas.length} devoluções extraídas dos dados das entregas`
              );
            }
          }
        } else {
          console.log(
            "ℹ️ Nenhum item com status DEVOLVIDO encontrado nas entregas"
          );
        }
      } else {
        console.warn(
          "⚠️ Colaborador ID não encontrado, não é possível carregar devoluções"
        );
        fichaBase.data.devolucoes = [];
      }
      console.log(
        "📊 Dados finais - Entregas:",
        fichaBase.data.entregas?.length || 0
      );
      console.log(
        "📊 Dados finais - Devoluções:",
        fichaBase.data.devolucoes?.length || 0
      );
      return fichaBase;
    } catch (error) {
      console.error("❌ Erro ao buscar dados da ficha:", error);
      throw error;
    }
  }
  /**
   * Buscar equipamentos atualmente em posse do colaborador
   * Fallback caso o endpoint /complete não esteja disponível
   */
  async getEquipamentosEmPosse(colaboradorId) {
    console.log(
      "📦 FichaQueryAdapter: Buscando equipamentos em posse:",
      colaboradorId
    );
    try {
      const response = await api.get(
        `/fichas-epi/colaborador/${colaboradorId}/posse-atual`
      );
      console.log("✅ Equipamentos em posse carregados");
      return response;
    } catch (error) {
      console.error("❌ Erro ao buscar equipamentos em posse:", error);
      throw error;
    }
  }
  /**
   * ✅ CORRIGIDO: Listar fichas usando API documentada oficial
   * Usa endpoint /api/fichas-epi conforme documentação API v3.5
   */
  async getFichasList(params) {
    console.log("📋 FichaQueryAdapter: Listando fichas com API documentada:", params);
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.set("page", params.page.toString());
      if (params.limit) queryParams.set("limit", params.limit.toString());
      if (params.search && params.search.trim()) {
        queryParams.set("search", params.search.trim());
        console.log("🔍 Aplicando busca unificada:", params.search.trim());
      }
      if (params.status && params.status !== "todos") {
        queryParams.set("status", params.status.toUpperCase());
        console.log("🔧 Filtro status aplicado:", params.status.toUpperCase());
      }
      if (params.empresa && params.empresa !== "todas") {
        queryParams.set("empresa", params.empresa);
        console.log("🔧 Filtro empresa aplicado (por nome):", params.empresa);
      }
      if (params.cargo && params.cargo !== "todos") {
        queryParams.set("cargo", params.cargo);
        console.log("🔧 Filtro cargo aplicado:", params.cargo);
      }
      if (params.empresaFilter && params.empresaFilter !== "todas") {
        queryParams.set("empresaId", params.empresaFilter);
        console.log("🔧 Filtro empresa aplicado (empresaId):", params.empresaFilter);
      }
      if (params.vencimentoProximo || params.devolucaoPendente) {
        queryParams.set("devolucaoPendente", "true");
        console.log("🔧 Filtro devolução pendente aplicado");
      }
      if (params.searchTerm && params.searchTerm.trim()) {
        queryParams.set("search", params.searchTerm.trim());
        console.log("🔧 Busca unificada (alias) aplicada:", params.searchTerm.trim());
      }
      const endpoint = `/fichas-epi/list-enhanced${queryParams.toString() ? "?" + queryParams.toString() : ""}`;
      console.log("🌐 Endpoint enhanced documentado:", endpoint);
      console.log("🔧 Parâmetros enviados:", Object.fromEntries(queryParams.entries()));
      console.log("🔍 Debug filtros originais:", {
        search: params.search,
        empresa: params.empresa,
        cargo: params.cargo,
        empresaFilter: params.empresaFilter
      });
      const response = await api.get(endpoint);
      console.log("📥 Resposta bruta do backend:", {
        success: response.success,
        dataType: Array.isArray(response.data) ? "array" : typeof response.data,
        dataLength: Array.isArray(response.data) ? response.data.length : "N/A",
        hasPagination: !!response.pagination,
        endpointUsado: endpoint
      });
      if (params.empresa && params.empresa !== "todas" && Array.isArray(response.data)) {
        console.log("🔍 DEBUG FILTRO EMPRESA:", {
          empresaFiltrada: params.empresa,
          totalItensRetornados: response.data.length,
          primeirosItens: response.data.slice(0, 2).map((item) => ({
            id: item.id,
            colaboradorNome: item.colaborador?.nome,
            contratadaId: item.contratada?.id,
            contratadaNome: item.contratada?.nome
          }))
        });
      }
      let items = [];
      let pagination = {
        page: params.page || 1,
        limit: params.limit || 10,
        total: 0,
        totalPages: 1
      };
      if (response.success) {
        let rawItems = [];
        if (Array.isArray(response.data)) {
          rawItems = response.data;
          pagination.total = rawItems.length;
          pagination.totalPages = Math.ceil(pagination.total / pagination.limit);
        } else if (response.data && typeof response.data === "object") {
          if ("items" in response.data) {
            rawItems = response.data.items || [];
            if ("pagination" in response.data) {
              pagination = { ...pagination, ...response.data.pagination };
            }
          } else {
            console.warn("⚠️ Formato de resposta inesperado:", response.data);
            rawItems = [];
          }
        }
        if (response.pagination) {
          pagination = { ...pagination, ...response.pagination };
        }
        if (rawItems.length > 0) {
          console.log("🔍 DEBUG Estrutura completa do primeiro item:", JSON.stringify(rawItems[0], null, 2));
        }
        items = rawItems.map((item) => {
          console.log("🔧 Transformando item da API:", {
            id: item.id,
            colaboradorNome: item.colaborador?.nome,
            colaboradorCPF: item.colaborador?.cpf,
            colaboradorCPFFormatado: item.colaborador?.cpfFormatado,
            contratadaNome: item.contratada?.nome,
            colaboradorEmpresa: item.colaborador?.empresa,
            colaboradorCargo: item.colaborador?.cargo
          });
          return {
            id: item.id,
            colaborador: {
              nome: item.colaborador?.nome || "Nome não informado",
              // ✅ BACKEND ATUALIZADO: Campo CPF adicionado (preparado para quando estiver disponível)
              cpf: item.colaborador?.cpf || item.colaborador?.cpfFormatado || "CPF não disponível",
              matricula: item.colaborador?.matricula || "",
              cargo: item.colaborador?.cargo || "",
              // ✅ CORREÇÃO CRÍTICA: Mapear contratada.nome → colaborador.empresa
              empresa: item.contratada?.nome || item.colaborador?.empresa || "Empresa não informada"
            },
            contratada: item.contratada ? {
              id: item.contratada.id,
              nome: item.contratada.nome
            } : void 0,
            status: (item.status || "ativa").toLowerCase(),
            // Manter compatibilidade com ambos os formatos
            totalEpisAtivos: item.totalEpisAtivos || item.episInfo?.totalEpisComColaborador || 0,
            totalEpisVencidos: item.totalEpisVencidos || item.episInfo?.episExpirados || 0,
            episInfo: item.episInfo,
            proximoVencimento: item.proximoVencimento,
            ultimaAtualizacao: item.ultimaAtualizacao,
            devolucaoPendente: item.devolucaoPendente || false
          };
        });
        console.log("✅ Dados transformados para frontend:", {
          originalCount: rawItems.length,
          transformedCount: items.length,
          firstItemStructure: items[0] ? {
            colaboradorNome: items[0].colaborador.nome,
            colaboradorEmpresa: items[0].colaborador.empresa,
            colaboradorCargo: items[0].colaborador.cargo,
            hasContratada: !!items[0].contratada
          } : null
        });
      }
      console.log("✅ Lista de fichas processada:", {
        totalItens: items.length,
        paginaAtual: pagination.page,
        totalPaginas: pagination.totalPages,
        totalRegistros: pagination.total
      });
      return {
        items,
        pagination
      };
    } catch (error) {
      console.error("❌ Erro ao listar fichas:", error);
      throw error;
    }
  }
  /**
   * Busca simples de ficha (fallback para compatibilidade)
   */
  async getFichaById(fichaId) {
    console.log("📋 FichaQueryAdapter: Busca simples da ficha:", fichaId);
    try {
      const response = await api.get(`/fichas-epi/${fichaId}`);
      console.log("✅ Ficha simples carregada (fallback)");
      return response;
    } catch (error) {
      console.error("❌ Erro ao buscar ficha simples:", error);
      throw error;
    }
  }
  /**
   * Buscar EPIs disponíveis para entregas usando endpoint correto
   */
  async getEPIsDisponiveis() {
    console.log(
      "📦 FichaQueryAdapter: Buscando EPIs disponíveis via /estoque/itens..."
    );
    try {
      const response = await api.get("/estoque/itens");
      console.log("✅ EPIs obtidos via /estoque/itens:", response);
      console.log("✅ EPIs disponíveis - resposta raw:", response);
      console.log(
        "🔍 Estrutura completa da resposta:",
        JSON.stringify(response, null, 2)
      );
      let episData = [];
      if (response && Array.isArray(response)) {
        episData = response;
      } else if (response && response.data) {
        if (Array.isArray(response.data)) {
          episData = response.data;
        } else if (response.data.items && Array.isArray(response.data.items)) {
          episData = response.data.items;
        } else if (response.data.posicoes && Array.isArray(response.data.posicoes)) {
          episData = response.data.posicoes;
        } else if (response.data.itens && Array.isArray(response.data.itens)) {
          episData = response.data.itens;
        } else if (typeof response.data === "object") {
          const dataValues = Object.values(response.data);
          const arrayValue = dataValues.find((value) => Array.isArray(value));
          if (arrayValue) {
            episData = arrayValue;
          } else {
            console.warn(
              "⚠️ Não foi possível encontrar array nos dados:",
              response.data
            );
            episData = [];
          }
        }
      } else if (response && response.items && Array.isArray(response.items)) {
        episData = response.items;
      } else {
        console.warn("⚠️ Formato de EPIs inesperado:", response);
        console.log("🔍 Estrutura da resposta:", Object.keys(response || {}));
        episData = [];
      }
      const normalizedEpis = episData.map((item) => {
        console.log("🔍 Item original:", item);
        const epi = item.tipoEpi || item;
        const quantidadeDisponivel = item.quantidade || item.saldoDisponivel || item.quantidadeAtual || epi.quantidadeDisponivel || epi.quantidade_disponivel || 0;
        const id = item.id || item.tipoEpiId || epi.id;
        const tipoEpiId = item.tipoEpiId || epi.id || item.id;
        const nomeEquipamento = item.tipoEpiNome || epi.nomeEquipamento || epi.nome_equipamento || epi.nome || epi.equipment_name;
        const numeroCA = item.tipoEpiCodigo || epi.numeroCa || epi.numeroCA || epi.numero_ca || epi.registroCA || epi.registro_ca || epi.ca_number || epi.ca;
        if (!id || !nomeEquipamento) {
          console.warn(
            "⚠️ Item ignorado por falta de dados essenciais:",
            item
          );
          return null;
        }
        const result = {
          id,
          // ID real do item de estoque
          // Para criação de entregas, usar o ID real do item de estoque
          estoqueItemId: id,
          // ID real do item de estoque para API
          episDisponivelId: id,
          // Para compatibilidade - usar ID real
          tipoEpiId,
          // ID do tipo EPI
          // Adicionar também o almoxarifadoId para identificação completa
          posicaoEstoqueId: id,
          // ID único do item
          nomeEquipamento,
          numeroCA: numeroCA || "N/A",
          registroCA: numeroCA || "N/A",
          categoria: epi.categoria || epi.category || epi.tipo || "Não informado",
          quantidadeDisponivel,
          disponivel: quantidadeDisponivel > 0,
          // Campos adicionais úteis - /estoque/itens tem almoxarifado nested
          almoxarifado: item.almoxarifadoNome || item.almoxarifado?.nome || "Central",
          almoxarifadoId: item.almoxarifadoId || item.almoxarifado?.id,
          // Campos específicos do backend
          situacao: item.situacao,
          saldoTotal: item.saldoTotal,
          saldoReservado: item.saldoReservado
        };
        console.log("🎯 EPI processado:", {
          id: result.id,
          nome: result.nomeEquipamento,
          quantidade: result.quantidadeDisponivel,
          disponivel: result.disponivel
        });
        return result;
      }).filter(Boolean).filter((epi) => epi.disponivel && epi.quantidadeDisponivel > 0);
      console.log("✅ EPIs normalizados:", normalizedEpis.length);
      console.log("📦 Amostra de EPIs:", normalizedEpis.slice(0, 2));
      return normalizedEpis;
    } catch (error) {
      console.error("❌ Erro ao buscar EPIs disponíveis:", error);
      throw error;
    }
  }
  /**
   * Buscar usuários disponíveis (método transitório)
   */
  async getUsuarios() {
    console.log("👥 FichaQueryAdapter: Buscando usuários...");
    try {
      const response = await api.get("/usuarios");
      console.log("✅ Usuários carregados");
      if (response && Array.isArray(response)) {
        return response;
      } else if (response && response.data && Array.isArray(response.data)) {
        return response.data;
      } else if (response && response.items && Array.isArray(response.items)) {
        console.log("📊 Usuários vêm em formato paginado, extraindo items");
        return response.items;
      } else {
        console.error("❌ Formato de usuários inesperado:", response);
        throw new Error("Formato de resposta de usuários inválido");
      }
    } catch (error) {
      console.error("❌ Erro ao buscar usuários:", error);
      throw error;
    }
  }
  /**
   * Buscar devoluções usando o endpoint oficial do histórico
   * SIMPLIFICADO: Usar apenas o endpoint correto
   */
  async buscarDevolucoes(fichaId, colaboradorId) {
    console.log(
      "🔄 FichaQueryAdapter: Buscando devoluções via endpoint oficial"
    );
    try {
      if (colaboradorId && colaboradorId.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      )) {
        const devolucoes = await this.getDevolucoesByColaborador(colaboradorId);
        console.log(
          "✅ Devoluções encontradas via endpoint oficial:",
          devolucoes.length
        );
        return devolucoes;
      } else {
        console.log("⚠️ Colaborador ID inválido para UUID:", colaboradorId);
        return [];
      }
    } catch (error) {
      console.error(
        "❌ Erro ao buscar devoluções via endpoint oficial:",
        error
      );
      return [];
    }
  }
  /**
   * Buscar histórico de devoluções específico de um colaborador
   * Endpoint: GET /api/teste-devolucoes/historico-global?colaboradorId=X
   *
   * Usando o novo formato da documentação atualizada
   */
  async getDevolucoesByColaborador(colaboradorId) {
    console.log(
      "🔄 FichaQueryAdapter: Buscando devoluções do colaborador:",
      colaboradorId
    );
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(colaboradorId)) {
      console.warn("⚠️ Colaborador ID não é um UUID válido:", colaboradorId);
      return [];
    }
    try {
      const response = await api.get("/teste-devolucoes/historico-global", {
        params: {
          colaboradorId,
          limit: 100
        }
      });
      console.log("✅ Response do endpoint de devoluções:", response);
      let devolucoes = [];
      if (response && response.success && response.data) {
        if (response.data.devolucoes && Array.isArray(response.data.devolucoes)) {
          devolucoes = response.data.devolucoes;
          console.log(
            "📋 Devoluções encontradas (formato padrão):",
            devolucoes.length
          );
        } else if (Array.isArray(response.data)) {
          devolucoes = response.data;
          console.log(
            "📋 Devoluções encontradas (formato direto):",
            devolucoes.length
          );
        } else {
          console.warn(
            "⚠️ Resposta não contém devoluções no formato esperado:",
            {
              hasSuccess: !!response?.success,
              hasData: !!response?.data,
              hasDevolucoes: !!response?.data?.devolucoes,
              isDataArray: Array.isArray(response?.data),
              responseStructure: Object.keys(response || {}),
              dataStructure: Object.keys(response?.data || {})
            }
          );
        }
        if (devolucoes.length > 0) {
          console.log("📋 Estrutura da primeira devolução:", devolucoes[0]);
        }
        if (response.data.estatisticas) {
          console.log("📊 Estatísticas:", response.data.estatisticas);
        }
      } else {
        console.warn("⚠️ Resposta inválida do endpoint:", {
          hasResponse: !!response,
          hasSuccess: !!response?.success,
          hasData: !!response?.data
        });
      }
      return devolucoes;
    } catch (error) {
      console.error("❌ Erro ao buscar devoluções:", error);
      if (error.response) {
        console.error("❌ Status HTTP:", error.response.status);
        console.error("❌ Dados da resposta:", error.response.data);
        if (error.response.status === 400) {
          console.warn("⚠️ Erro de validação 400 - retornando array vazio");
          return [];
        }
      }
      throw error;
    }
  }
  /**
   * Método transitório para compatibilidade com FichasContainer
   * 🆕 ATUALIZADO: Suporte à busca unificada (CPF, nome, matrícula)
   */
  async getFichasWithColaboradores(params) {
    console.log(
      "📋 FichaQueryAdapter: Método transitório com busca unificada - getFichasWithColaboradores",
      params
    );
    const newParams = {
      page: params.page,
      limit: params.limit,
      // 🆕 BUSCA UNIFICADA: Usar searchTerm ou search
      search: params.searchTerm || params.search,
      empresa: params.empresaFilter || params.empresa,
      cargo: params.cargoFilter || params.cargo,
      status: params.statusFilter || params.status,
      vencimentoProximo: params.devolucaoPendente || params.vencimentoProximo
    };
    console.log("🔍 Parâmetros convertidos para busca unificada:", {
      search: newParams.search,
      empresa: newParams.empresa,
      cargo: newParams.cargo,
      status: newParams.status,
      page: newParams.page,
      limit: newParams.limit
    });
    try {
      const response = await this.getFichasList(newParams);
      const result = {
        fichas: response.items,
        total: response.pagination.total,
        page: response.pagination.page,
        pageSize: response.pagination.limit,
        totalPages: response.pagination.totalPages
      };
      console.log("✅ Resposta convertida para formato antigo:", {
        totalFichas: result.fichas.length,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages
      });
      return result;
    } catch (error) {
      console.error("❌ Erro no método transitório:", error);
      throw error;
    }
  }
}
const fichaQueryAdapter = new FichaQueryAdapter();
class UIMappingHelpers {
  static getEventIcon(tipo) {
    const iconMap = {
      entrega: "TruckOutline",
      devolucao: "TrashBinOutline",
      assinatura: "PenOutline",
      cancelamento: "XCircleOutline",
      criacao: "DocumentPlusOutline",
      vencimento: "ClockOutline",
      edicao: "EditOutline"
    };
    return iconMap[tipo] || "ClockOutline";
  }
  /**
   * Mapear cor semântica para classes CSS (10 linhas vs 44 linhas originais)
   */
  static getColorClasses(cor) {
    const colorMap = {
      green: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900",
      red: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900",
      yellow: "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900",
      orange: "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900",
      blue: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900",
      gray: "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800"
    };
    return colorMap[cor] || colorMap.gray;
  }
  /**
   * Mapear cor para badge color (compatível com Flowbite)
   */
  static getBadgeColor(cor) {
    const badgeColorMap = {
      green: "green",
      red: "red",
      yellow: "yellow",
      orange: "yellow",
      // Orange não existe no Flowbite, usar yellow
      blue: "blue",
      gray: "gray"
    };
    return badgeColorMap[cor] || "gray";
  }
  /**
   * Formatação de dias restantes (5 linhas vs 42 linhas originais)
   */
  static formatDaysRemaining(dias, status) {
    if (status === "vencido" || dias < 0) {
      return `${Math.abs(dias)} dias atrasado`;
    }
    if (dias === 0) {
      return "Vence hoje";
    }
    return `${dias} dias restantes`;
  }
  /**
   * Obter iniciais do nome (mantido para compatibilidade)
   */
  static getInitials(nome) {
    return nome.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  }
  /**
   * Formatação condicional de texto
   */
  static formatConditionalText(valor, fallback = "-") {
    if (valor === null || valor === void 0 || valor === "") {
      return fallback;
    }
    return String(valor);
  }
  /**
   * Mapear status para configuração visual completa
   */
  static getStatusConfig(status, cor) {
    return {
      color: this.getBadgeColor(cor),
      classes: this.getColorClasses(cor),
      text: status
    };
  }
  /**
   * Mapear tipo de evento para configuração completa
   */
  static getEventConfig(tipo, cor) {
    return {
      icon: this.getEventIcon(tipo),
      color: this.getBadgeColor(cor),
      classes: this.getColorClasses(cor)
    };
  }
}
UIMappingHelpers.getEventIcon;
UIMappingHelpers.getColorClasses;
UIMappingHelpers.getBadgeColor;
UIMappingHelpers.formatDaysRemaining;
UIMappingHelpers.getInitials;
UIMappingHelpers.formatConditionalText;
export {
  UIMappingHelpers as U,
  fichaQueryAdapter as f
};
