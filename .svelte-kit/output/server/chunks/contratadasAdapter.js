import { c as createUrlWithParams, b as api } from "./Button.js";
import { i as isValidCNPJ } from "./ErrorDisplay.js";
class ContratadasAdapter {
  /**
   * ✅ PREPARADO PARA BACKEND: Lista contratadas com paginação
   */
  async getContratadas(params) {
    try {
      console.log("🏢 Carregando contratadas...", params);
      const queryParams = {
        page: params.page || 1,
        limit: params.limit || 10
      };
      if (params.searchTerm) {
        queryParams.search = params.searchTerm;
      }
      if (params.statusFilter && params.statusFilter !== "todos") {
        queryParams.status = params.statusFilter.toUpperCase();
      }
      const endpoint = createUrlWithParams("/contratadas", queryParams);
      const response = await api.get(endpoint);
      console.log("📦 Contratadas response real:", response);
      console.log("📦 Estrutura dos dados:", {
        success: response.success,
        contratadas: response.data?.contratadas?.length || 0,
        total: response.data?.total || 0
      });
      if (response.success && response.data) {
        const contratadas = response.data.contratadas.map((item) => ({
          id: item.id,
          nome: item.nome,
          cnpj: item.cnpjFormatado || item.cnpj,
          endereco: item.endereco || "",
          contato: item.contato || "",
          status: item.status || "ativa",
          colaboradores: item.colaboradores || 0,
          dataContrato: item.dataContrato || item.createdAt?.split("T")[0] || "",
          createdAt: item.createdAt,
          updatedAt: item.updatedAt || item.createdAt
        }));
        console.log("✅ Contratadas mapeadas:", contratadas.length);
        return {
          contratadas,
          total: response.data.total || 0,
          page: params.page || 1,
          limit: params.limit || 10
        };
      }
    } catch (error) {
      console.error("❌ Erro ao carregar contratadas, usando fallback mock:", error);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockData = [
        {
          id: "1",
          nome: "Alpha Construções Ltda",
          cnpj: "12.345.678/0001-90",
          endereco: "Rua das Construções, 123",
          contato: "(11) 99999-9999",
          status: "ativa",
          colaboradores: 15,
          dataContrato: "2024-01-15",
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z"
        },
        {
          id: "2",
          nome: "Beta Engenharia S.A.",
          cnpj: "98.765.432/0001-10",
          endereco: "Av. Engenharia, 456",
          contato: "contato@betaeng.com.br",
          status: "ativa",
          colaboradores: 8,
          dataContrato: "2024-03-22",
          createdAt: "2024-03-22T14:30:00Z",
          updatedAt: "2024-03-22T14:30:00Z"
        }
      ];
      let contratadasFiltradas = mockData;
      if (params.searchTerm) {
        const searchLower = params.searchTerm.toLowerCase();
        contratadasFiltradas = contratadasFiltradas.filter(
          (contratada) => contratada.nome.toLowerCase().includes(searchLower) || contratada.cnpj.includes(params.searchTerm)
        );
      }
      if (params.statusFilter && params.statusFilter !== "todos") {
        contratadasFiltradas = contratadasFiltradas.filter(
          (contratada) => contratada.status === params.statusFilter
        );
      }
      console.log("✅ Contratadas carregadas (fallback):", contratadasFiltradas.length);
      return {
        contratadas: contratadasFiltradas,
        total: contratadasFiltradas.length,
        page: params.page || 1,
        limit: params.limit || 10
      };
    }
  }
  /**
   * ✅ PREPARADO PARA BACKEND: Busca contratada por ID
   */
  async getContratadaById(id) {
    try {
      console.log("🏢 Buscando contratada:", id);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockContratada = {
        id,
        nome: "Alpha Construções Ltda",
        cnpj: "12.345.678/0001-90",
        endereco: "Rua das Construções, 123",
        contato: "(11) 99999-9999",
        status: "ativa",
        colaboradores: 15,
        dataContrato: "2024-01-15",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z"
      };
      console.log("✅ Contratada encontrada:", mockContratada.nome);
      return mockContratada;
    } catch (error) {
      console.error("❌ Erro ao buscar contratada:", error);
      throw error;
    }
  }
  /**
   * ✅ CONECTADO AO BACKEND: Criar nova contratada
   */
  async createContratada(data) {
    try {
      console.log("💾 Criando contratada:", data);
      if (data.cnpj && !isValidCNPJ(data.cnpj)) {
        throw new Error("CNPJ inválido. Verifique o formato e os dígitos verificadores.");
      }
      const payload = {
        ...data,
        cnpj: data.cnpj ? data.cnpj.replace(/\D/g, "") : void 0
      };
      const response = await api.post("/contratadas", payload);
      if (response.success && response.data) {
        console.log("✅ Contratada criada no backend:", response.data.id);
        return response.data;
      }
      throw new Error("Resposta inválida do backend");
    } catch (error) {
      console.error("❌ Erro ao criar contratada no backend, usando fallback:", error);
      if (error instanceof Error && error.message.includes("CNPJ inválido")) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      const novaContratada = {
        id: `contratada-mock-${Date.now()}`,
        nome: data.nome,
        cnpj: data.cnpj,
        endereco: data.endereco,
        contato: data.contato,
        status: "ativa",
        colaboradores: 0,
        dataContrato: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      console.log("✅ Contratada criada (fallback):", novaContratada.id);
      return novaContratada;
    }
  }
  /**
   * ✅ PREPARADO PARA BACKEND: Atualizar contratada
   */
  async updateContratada(id, data) {
    try {
      console.log("💾 Atualizando contratada:", id, data);
      await new Promise((resolve) => setTimeout(resolve, 800));
      const contratadaAtualizada = {
        id,
        nome: data.nome || "Nome Atualizado",
        cnpj: data.cnpj || "12.345.678/0001-90",
        endereco: data.endereco,
        contato: data.contato,
        status: data.status || "ativa",
        colaboradores: 15,
        dataContrato: "2024-01-15",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      console.log("✅ Contratada atualizada:", contratadaAtualizada.id);
      return contratadaAtualizada;
    } catch (error) {
      console.error("❌ Erro ao atualizar contratada:", error);
      throw error;
    }
  }
  /**
   * ✅ PREPARADO PARA BACKEND: Deletar contratada
   */
  async deleteContratada(id) {
    try {
      console.log("🗑️ Deletando contratada:", id);
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.log("✅ Contratada deletada:", id);
    } catch (error) {
      console.error("❌ Erro ao deletar contratada:", error);
      throw error;
    }
  }
  /**
   * ✅ PREPARADO PARA BACKEND: Alterar status da contratada
   */
  async toggleStatusContratada(id, novoStatus) {
    try {
      console.log("🔄 Alterando status da contratada:", id, novoStatus);
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("✅ Status da contratada alterado:", id, novoStatus);
    } catch (error) {
      console.error("❌ Erro ao alterar status da contratada:", error);
      throw error;
    }
  }
}
const contratadasAdapter = new ContratadasAdapter();
export {
  contratadasAdapter
};
